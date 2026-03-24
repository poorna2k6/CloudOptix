import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminSupabase } from "@/lib/supabase";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(1),
  phone: z.string().optional(),
  service: z.string().min(1),
  message: z.string().min(20),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = contactSchema.parse(body);

    // 1. Persist lead to Supabase
    const supabase = createAdminSupabase();
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
      console.error("[Contact API] Supabase error:", dbError.message);
      // Don't fail the request if DB write fails — still send email
    }

    // 2. Send notification email via Resend
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);

      await resend.emails.send({
        from: "CloudOptix <noreply@cloudoptix.com>",
        to: process.env.CONTACT_EMAIL ?? "hello@cloudoptix.com",
        replyTo: data.email,
        subject: `New Lead: ${data.name} from ${data.company}`,
        html: `
          <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0F1E; color: #F8FAFC; padding: 32px; border-radius: 12px;">
            <div style="margin-bottom: 24px;">
              <img src="https://cloudoptix.com/logo.png" alt="CloudOptix" style="height: 32px;" />
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
              CloudOptix — Clarity Before Cloud. Value After.
            </p>
          </div>
        `,
      });

      // 3. Send confirmation email to the lead
      await resend.emails.send({
        from: "CloudOptix <noreply@cloudoptix.com>",
        to: data.email,
        subject: "We've received your inquiry — CloudOptix",
        html: `
          <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0F1E; color: #F8FAFC; padding: 32px; border-radius: 12px;">
            <h1 style="color: #06B6D4; font-size: 24px; margin-bottom: 8px;">Thanks, ${data.name}!</h1>
            <p style="color: #94A3B8; font-size: 16px; line-height: 1.6;">
              We've received your inquiry about <strong style="color: #F8FAFC;">${data.service}</strong> and will get back to you within 24 hours.
            </p>
            <p style="color: #94A3B8; font-size: 14px; line-height: 1.6; margin-top: 16px;">
              In the meantime, feel free to explore our services or reach out directly at
              <a href="mailto:hello@cloudoptix.com" style="color: #06B6D4;">hello@cloudoptix.com</a>.
            </p>
            <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #1F2937;">
              <p style="color: #4B5563; font-size: 12px; text-align: center; margin: 0;">
                CloudOptix — Clarity Before Cloud. Value After.
              </p>
            </div>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid form data", details: err.flatten() },
        { status: 422 }
      );
    }
    console.error("[Contact API] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
