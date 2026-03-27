import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminSupabase } from "@/lib/supabase";
import { handleApiError } from "@/lib/middleware/error-handler";
import { logger, generateCorrelationId } from "@/lib/logger";
import { monitorQuery } from "@/lib/db-monitor";
import { withRetry } from "@/lib/retry";
import { DatabaseError } from "@/lib/errors";
import { EMAIL_BRANDING, BRAND } from "@/lib/brand";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(1),
  phone: z.string().optional(),
  service: z.string().min(1),
  message: z.string().min(20),
});

export async function POST(req: NextRequest) {
  const correlationId = generateCorrelationId();
  
  try {
    const startTime = Date.now();
    
    logger.info({ correlationId }, 'Contact form submission received');

    const body = await req.json();
    const data = contactSchema.parse(body);

    // 1. Persist lead to Supabase with monitoring
    const supabase = createAdminSupabase();
    
    await monitorQuery('contact_leads_insert', async () => {
      const { error: dbError } = await supabase.from("contact_leads").insert([
        {
          name: data.name,
          email: data.email,
          company: data.company,
          phone: data.phone ?? null,
          service: data.service,
          message: data.message,
          status: "new",
          created_at: new Date().toISOString(),
        },
      ]);

      if (dbError) {
        logger.error({ error: dbError, correlationId }, 'Failed to insert contact lead');
        throw new DatabaseError('Failed to save contact submission', dbError);
      }
    });

    // 2. Send notification email via Resend with retry logic
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(resendKey);

        await withRetry(
          async () => {
            await resend.emails.send({
              from: EMAIL_BRANDING.from.default,
              to: process.env.CONTACT_EMAIL ?? BRAND.contact.email,
              replyTo: data.email,
              subject: `New Lead: ${data.name} from ${data.company}`,
              html: `
                <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0F1E; color: #F8FAFC; padding: 32px; border-radius: 12px;">
                  <div style="margin-bottom: 24px;">
                    <img src="${EMAIL_BRANDING.logoUrl}" alt="${BRAND.name}" style="height: 32px;" />
                  </div>
                  <h1 style="color: #06B6D4; font-size: 24px; margin-bottom: 8px;">New Lead Inquiry</h1>
                  <p style="color: #94A3B8; margin-bottom: 24px;">You have a new contact form submission.</p>

                  <table style="width: 100%; border-collapse: collapse;">
                    ${[
                      ["Name", data.name],
                      ["Email", data.email],
                      ["Company", data.company],
                      ["Phone", data.phone ?? "—"],
                      ["Service Interest", data.service],
                    ].map(([label, value]) => `
                      <tr>
                        <td style="padding: 10px 0; color: #94A3B8; font-size: 14px; width: 120px; border-bottom: 1px solid #1F2937;">${label}</td>
                        <td style="padding: 10px 0; color: #F8FAFC; font-size: 14px; border-bottom: 1px solid #1F2937;">${value}</td>
                      </tr>
                    `).join("")}
                  </table>

                  <div style="margin-top: 24px; background: #111827; border-radius: 8px; padding: 16px; border-left: 3px solid #06B6D4;">
                    <p style="color: #94A3B8; font-size: 12px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
                    <p style="color: #F8FAFC; font-size: 14px; line-height: 1.6; margin: 0;">${data.message.replace(/\n/g, "<br/>")}</p>
                  </div>

                  <p style="color: #4B5563; font-size: 12px; margin-top: 32px; text-align: center;">
                    ${EMAIL_BRANDING.signature}
                  </p>
                </div>
              `,
            });
          },
          { maxAttempts: 3, delayMs: 1000 }
        );

        // 3. Send confirmation email to the lead
        await withRetry(
          async () => {
            await resend.emails.send({
              from: EMAIL_BRANDING.from.default,
              to: data.email,
              subject: `We've received your inquiry — ${BRAND.name}`,
              html: `
                <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0F1E; color: #F8FAFC; padding: 32px; border-radius: 12px;">
                  <h1 style="color: #06B6D4; font-size: 24px; margin-bottom: 8px;">Thanks, ${data.name}!</h1>
                  <p style="color: #94A3B8; font-size: 16px; line-height: 1.6;">
                    We've received your inquiry about <strong style="color: #F8FAFC;">${data.service}</strong> and will get back to you within 24 hours.
                  </p>
                  <p style="color: #94A3B8; font-size: 14px; line-height: 1.6; margin-top: 16px;">
                    In the meantime, feel free to explore our services or reach out directly at
                    <a href="mailto:${BRAND.contact.email}" style="color: #06B6D4;">${BRAND.contact.email}</a>.
                  </p>
                  <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #1F2937;">
                    <p style="color: #4B5563; font-size: 12px; text-align: center; margin: 0;">
                      ${EMAIL_BRANDING.signature}
                    </p>
                  </div>
                </div>
              `,
            });
          },
          { maxAttempts: 3, delayMs: 1000 }
        );

        logger.info({ correlationId }, 'Emails sent successfully');
      } catch (emailError) {
        // Log email error but don't fail the request since lead was saved
        logger.error(
          { error: emailError, correlationId },
          'Failed to send emails, but lead was saved'
        );
      }
    }

    const duration = Date.now() - startTime;
    logger.info({ correlationId, duration }, 'Contact form processed successfully');

    return NextResponse.json(
      { success: true, correlationId },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error, correlationId);
  }
}

// Made with Bob
