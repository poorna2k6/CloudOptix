import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase';
import { logger } from '@/lib/logger';

interface HealthCheck {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  checks: {
    database: 'healthy' | 'unhealthy' | 'unknown';
    auth: 'healthy' | 'unhealthy' | 'unknown';
  };
  version: string;
  uptime: number;
}

/**
 * Health check endpoint for monitoring and load balancers
 * GET /api/health
 */
export async function GET() {
  const startTime = Date.now();
  
  const checks: HealthCheck = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    checks: {
      database: 'unknown',
      auth: 'unknown',
    },
    version: process.env.npm_package_version || '0.1.0',
    uptime: process.uptime(),
  };

  try {
    // Check database connection
    const supabase = await createServerSupabase();
    const { error: dbError } = await supabase
      .from('user_profiles')
      .select('id')
      .limit(1);
    
    checks.checks.database = dbError ? 'unhealthy' : 'healthy';

    if (dbError) {
      logger.warn({ error: dbError }, 'Database health check failed');
    }

    // Check auth service
    const { error: authError } = await supabase.auth.getSession();
    checks.checks.auth = authError ? 'unhealthy' : 'healthy';

    if (authError) {
      logger.warn({ error: authError }, 'Auth health check failed');
    }

    // Determine overall status
    const unhealthyChecks = Object.values(checks.checks).filter(
      (status) => status === 'unhealthy'
    );
    
    if (unhealthyChecks.length > 0) {
      checks.status = unhealthyChecks.length === Object.keys(checks.checks).length 
        ? 'unhealthy' 
        : 'degraded';
    }

    const duration = Date.now() - startTime;
    logger.info({ checks, duration }, 'Health check completed');

    const statusCode = checks.status === 'healthy' ? 200 : 503;
    
    return NextResponse.json(checks, { 
      status: statusCode,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    logger.error({ error }, 'Health check failed with exception');
    
    checks.status = 'unhealthy';
    checks.checks.database = 'unhealthy';
    checks.checks.auth = 'unhealthy';
    
    return NextResponse.json(checks, { 
      status: 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  }
}

// Made with Bob
