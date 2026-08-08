import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { URL } from 'url';

// ==========================================
// 1. ENVIRONMENT VARIABLES & STARTUP VALIDATION
// ==========================================
export interface SecurityConfig {
  publicDomain: string;
  csrfSecret: string;
  rateLimitWindowMs: number;
  rateLimitMaxRequests: number;
  isProduction: boolean;
}

export function getSecurityConfig(): SecurityConfig {
  return {
    publicDomain: process.env.PUBLIC_DOMAIN || 'vyzorax.com',
    csrfSecret: process.env.CSRF_SECRET || 'vyzorax_secure_csrf_secret_key_2026',
    rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10),
    rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '30', 10),
    isProduction: process.env.NODE_ENV === 'production',
  };
}

// ==========================================
// 2. ERROR LOGGING & MASKING
// ==========================================
export function securityLog(level: 'info' | 'warn' | 'error', message: string, meta?: Record<string, any>) {
  const timestamp = new Date().toISOString();
  const sanitizedMeta = meta ? redactSensitiveData(meta) : '';
  console[level](`[Vyzorax Security ${level.toUpperCase()}] [${timestamp}] ${message}`, sanitizedMeta ? JSON.stringify(sanitizedMeta) : '');
}

function redactSensitiveData(obj: Record<string, any>): Record<string, any> {
  const redacted = { ...obj };
  const sensitiveKeys = ['password', 'token', 'secret', 'key', 'auth', 'cookie', 'csrf'];
  
  for (const key of Object.keys(redacted)) {
    if (sensitiveKeys.some((s) => key.toLowerCase().includes(s))) {
      redacted[key] = '***REDACTED***';
    } else if (typeof redacted[key] === 'object' && redacted[key] !== null) {
      redacted[key] = redactSensitiveData(redacted[key]);
    }
  }
  return redacted;
}

// ==========================================
// 3. RATE LIMITING (Sliding Window In-Memory)
// ==========================================
interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Periodic store cleanup every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitStore.entries()) {
    const validTimestamps = record.timestamps.filter((ts) => now - ts < 900000);
    if (validTimestamps.length === 0) {
      rateLimitStore.delete(ip);
    } else {
      record.timestamps = validTimestamps;
    }
  }
}, 300000);

export function createRateLimiter(windowMs: number = 60000, maxRequests: number = 30) {
  return (req: Request, res: Response, next: NextFunction) => {
    const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.ip || '127.0.0.1';
    const key = `${req.path}:${clientIp}`;
    const now = Date.now();

    let record = rateLimitStore.get(key);
    if (!record) {
      record = { timestamps: [] };
      rateLimitStore.set(key, record);
    }

    // Filter out timestamps outside the current window
    record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs);

    const remaining = Math.max(0, maxRequests - record.timestamps.length - 1);
    const resetTime = Math.ceil(windowMs / 1000);

    res.setHeader('X-RateLimit-Limit', maxRequests);
    res.setHeader('X-RateLimit-Remaining', remaining);
    res.setHeader('X-RateLimit-Reset', resetTime);

    if (record.timestamps.length >= maxRequests) {
      res.setHeader('Retry-After', resetTime);
      securityLog('warn', `Rate limit exceeded for IP: ${clientIp} on path: ${req.path}`);
      return res.status(429).json({
        success: false,
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          title: 'Too Many Requests',
          message: 'Rate limit exceeded. Please wait a minute before submitting another request.',
        },
      });
    }

    record.timestamps.push(now);
    next();
  };
}

// ==========================================
// 4. CSRF TOKEN PROTECTION & ORIGIN VALIDATION
// ==========================================
const csrfTokens = new Map<string, number>();

// Clean up expired CSRF tokens every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [token, expiry] of csrfTokens.entries()) {
    if (now > expiry) {
      csrfTokens.delete(token);
    }
  }
}, 600000);

export function generateCsrfToken(): string {
  const token = crypto.randomBytes(32).toString('hex');
  // Token valid for 2 hours
  csrfTokens.set(token, Date.now() + 2 * 60 * 60 * 1000);
  return token;
}

export function csrfProtectionHandler(req: Request, res: Response, next: NextFunction) {
  // Only enforce CSRF on state-changing methods: POST, PUT, DELETE, PATCH
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }

  // 1. Origin / Referer Validation
  const origin = req.headers['origin'] || req.headers['referer'];
  const host = req.headers['host'];
  const config = getSecurityConfig();

  if (origin) {
    try {
      const originUrl = new URL(origin as string);
      const isLocalhost = originUrl.hostname === 'localhost' || originUrl.hostname === '127.0.0.1';
      const isDomainMatch = originUrl.hostname.endsWith(config.publicDomain) || (host && originUrl.host === host);
      const isCloudRun = originUrl.hostname.includes('run.app') || originUrl.hostname.includes('ais-');

      if (!isLocalhost && !isDomainMatch && !isCloudRun) {
        securityLog('warn', `CSRF Origin check failed: origin=${origin}, host=${host}`);
        return res.status(403).json({
          success: false,
          error: {
            code: 'CSRF_ORIGIN_INVALID',
            title: 'Forbidden',
            message: 'Cross-Site request origin verification failed.',
          },
        });
      }
    } catch {
      // Invalid URL in origin header
      securityLog('warn', `CSRF Invalid origin header: ${origin}`);
      return res.status(400).json({
        success: false,
        error: {
          code: 'CSRF_ORIGIN_MALFORMED',
          title: 'Bad Request',
          message: 'Malformed origin header.',
        },
      });
    }
  }

  // 2. CSRF Token Validation
  const clientToken = (req.headers['x-csrf-token'] as string) || (req.body && req.body._csrf);
  
  if (!clientToken || !csrfTokens.has(clientToken)) {
    securityLog('warn', `CSRF Token validation failed for IP: ${req.ip}`);
    return res.status(403).json({
      success: false,
      error: {
        code: 'CSRF_TOKEN_INVALID',
        title: 'Invalid CSRF Token',
        message: 'Security validation token is missing or expired. Please refresh the page.',
      },
    });
  }

  next();
}

// ==========================================
// 5. SECURITY HEADERS & CONTENT SECURITY POLICY
// ==========================================
export function securityHeadersMiddleware(req: Request, res: Response, next: NextFunction) {
  const config = getSecurityConfig();
  const domain = config.publicDomain;

  // Content Security Policy (CSP)
  const cspDirectives = [
    "default-src 'self' https:;",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://www.googletagservices.com https://adservice.google.com https://tpc.googlesyndication.com;",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
    "font-src 'self' https://fonts.gstatic.com data:;",
    "img-src 'self' data: blob: https:;",
    "media-src 'self' blob: https:;",
    "connect-src 'self' https:;",
    "frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com;",
    "object-src 'none';",
    "base-uri 'self';",
    "form-action 'self';",
    "frame-ancestors 'self' https: http:;",
  ].join(' ');

  res.setHeader('Content-Security-Policy', cspDirectives);
  res.setHeader('X-Content-Type-Options', 'nosniff');
  // Note: X-Frame-Options is intentionally omitted/relaxed to allow the application preview inside AI Studio container iframe
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=()');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
  res.setHeader('X-Download-Options', 'noopen');
  res.setHeader('Server', 'Vyzorax-Security-Shield');

  next();
}

// ==========================================
// 6. XSS INPUT SANITIZATION & PROTOCOL CHECK
// ==========================================
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    // Strip null bytes and non-printable control characters
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Strip HTML script/iframe tags
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    // Replace dangerous javascript/data protocols if present at start
    .replace(/^javascript:/i, '')
    .replace(/^data:text\/html/i, '')
    .trim();
}

export function xssSanitizerMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.body && typeof req.body === 'object') {
    for (const key of Object.keys(req.body)) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = sanitizeString(req.body[key]);
      }
    }
  }

  if (req.query && typeof req.query === 'object') {
    for (const key of Object.keys(req.query)) {
      if (typeof req.query[key] === 'string') {
        req.query[key] = sanitizeString(req.query[key] as string);
      }
    }
  }

  next();
}

// ==========================================
// 7. SSRF (Server-Side Request Forgery) PROTECTION
// ==========================================
export function isSsrfSafeUrl(targetUrl: string): boolean {
  try {
    const parsed = new URL(targetUrl);

    // Only allow HTTP/HTTPS
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return false;
    }

    const hostname = parsed.hostname.toLowerCase();

    // Block localhost, loopbacks, and private IP ranges
    const blockedHosts = ['localhost', '127.0.0.1', '0.0.0.0', '::1', '169.254.169.254'];
    if (blockedHosts.includes(hostname)) {
      return false;
    }

    // Block private RFC 1918 IPv4 networks
    if (
      /^10\./.test(hostname) ||
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(hostname) ||
      /^192\.168\./.test(hostname) ||
      /\.local$/i.test(hostname) ||
      /\.internal$/i.test(hostname)
    ) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

// ==========================================
// 8. BOT DETECTION & HONEYPOT PROTECTION
// ==========================================
const KNOWN_BOT_USER_AGENTS = [
  'sqlmap',
  'nikto',
  'masscan',
  'zgrab',
  'nmap',
  'dirbuster',
  'gobuster',
  'w3af',
  'acunetix',
  'havij',
];

export function botDetectionMiddleware(req: Request, res: Response, next: NextFunction) {
  const userAgent = (req.headers['user-agent'] || '').toLowerCase();

  // 1. Reject known malicious security scanning tools
  if (KNOWN_BOT_USER_AGENTS.some((bot) => userAgent.includes(bot))) {
    securityLog('warn', `Blocked malicious bot scan attempt: User-Agent=${userAgent}, IP=${req.ip}`);
    return res.status(403).json({
      success: false,
      error: {
        code: 'BOT_TRAFFIC_BLOCKED',
        title: 'Access Denied',
        message: 'Automated scan detected.',
      },
    });
  }

  // 2. Honeypot Field Check on POST requests
  if (req.method === 'POST' && req.body) {
    if (req.body.website_hp || req.body.bot_trap) {
      securityLog('warn', `Honeypot field triggered by client IP: ${req.ip}`);
      return res.status(403).json({
        success: false,
        error: {
          code: 'HONEYPOT_TRIGGERED',
          title: 'Access Denied',
          message: 'Automated submission trapped.',
        },
      });
    }
  }

  next();
}

// ==========================================
// 9. API PAYLOAD VALIDATION
// ==========================================
export function validateInstagramExtractPayload(req: Request, res: Response, next: NextFunction) {
  const { url } = req.body || {};

  if (!url || typeof url !== 'string') {
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_PAYLOAD',
        title: 'Invalid Request',
        message: 'Missing or malformed "url" string parameter in request body.',
      },
    });
  }

  if (url.length > 2048) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'URL_TOO_LONG',
        title: 'URL Too Long',
        message: 'The submitted Instagram URL exceeds maximum allowable length of 2048 characters.',
      },
    });
  }

  const sanitizedUrl = sanitizeString(url);

  if (!sanitizedUrl.startsWith('https://') || !sanitizedUrl.includes('instagram.com')) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_INSTAGRAM_URL',
        title: 'Invalid Instagram Link',
        message: 'Please enter a valid Instagram link starting with https://www.instagram.com/',
      },
    });
  }

  req.body.url = sanitizedUrl;
  next();
}
