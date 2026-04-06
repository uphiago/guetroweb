import { z } from 'zod';

const MODALITY_CODES = ['pf', 'adesao', 'pj', 'mei'];

const REQUEST_SCHEMA = z.object({
  name: z.string().trim().min(3).max(120),
  email: z.string().trim().email().max(180),
  phone: z.string().trim().min(10).max(30),
  modality: z.string().trim().min(2).max(80),
  modalityCode: z.enum(MODALITY_CODES),
  personCount: z.coerce.number().int().min(1).max(50),
  ages: z.array(z.union([z.string(), z.number()])).min(1).max(50),
  acceptedTerms: z.boolean().optional(),
});

function normalizePhone(rawPhone) {
  const digits = String(rawPhone).replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 11) {
    throw new Error('Telefone inválido');
  }
  return digits;
}

function normalizeAges(rawAges) {
  return rawAges.map((value) => {
    const age = Number(value);
    if (!Number.isInteger(age) || age < 0 || age > 110) {
      throw new Error('Idades inválidas');
    }
    return age;
  });
}

function parseAllowedOrigins() {
  return (process.env.FORMS_ALLOWED_ORIGINS || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseJsonBody(req) {
  if (!req.body) return {};
  if (typeof req.body === 'string') return JSON.parse(req.body);
  return req.body;
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return null;
}

function setResponseHeaders(res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
}

function getRequestId(req) {
  const headerRequestId = req.headers['x-request-id'];
  if (typeof headerRequestId === 'string' && headerRequestId.length > 0) {
    return headerRequestId;
  }
  const vercelId = req.headers['x-vercel-id'];
  if (typeof vercelId === 'string' && vercelId.length > 0) {
    return vercelId;
  }
  return `quote_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function log(level, event, meta = {}) {
  const payload = {
    timestamp: new Date().toISOString(),
    level,
    event,
    ...meta,
  };
  if (level === 'error') {
    console.error(JSON.stringify(payload));
    return;
  }
  console.log(JSON.stringify(payload));
}

function getWebhookConfig() {
  return {
    url:
      process.env.N8N_WEBHOOK_URL ||
      process.env.VITE_N8N_WEBHOOK_URL ||
      process.env.VITE_FORMS_WEBHOOK_URL,
    secret:
      process.env.N8N_WEBHOOK_SECRET ||
      process.env.VITE_N8N_WEBHOOK_SECRET ||
      process.env.VITE_FORMS_WEBHOOK_TOKEN,
    timeoutMs: Number(process.env.N8N_WEBHOOK_TIMEOUT_MS || 15000),
  };
}

function maybeSetCorsHeaders(req, res, allowedOrigins) {
  const origin = req.headers.origin;
  if (!origin) return;
  if (!allowedOrigins.includes(origin)) return;
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function methodNotAllowed(res) {
  res.setHeader('Allow', 'POST, OPTIONS');
  return res.status(405).json({ ok: false, message: 'Method not allowed' });
}

export default async function handler(req, res) {
  setResponseHeaders(res);

  const requestId = getRequestId(req);
  const allowedOrigins = parseAllowedOrigins();
  maybeSetCorsHeaders(req, res, allowedOrigins);
  const origin = req.headers.origin || null;

  log('info', 'forms.quote.request.received', {
    requestId,
    method: req.method,
    origin,
    path: '/api/forms/quote',
  });

  if (req.method === 'OPTIONS') {
    log('info', 'forms.quote.request.options', { requestId });
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    log('error', 'forms.quote.request.method_not_allowed', {
      requestId,
      method: req.method,
    });
    return methodNotAllowed(res);
  }

  if (allowedOrigins.length > 0 && origin && !allowedOrigins.includes(origin)) {
    log('error', 'forms.quote.request.forbidden_origin', {
      requestId,
      origin,
      allowedOrigins,
    });
    return res.status(403).json({ ok: false, message: 'Forbidden origin' });
  }

  const webhook = getWebhookConfig();
  if (!webhook.url) {
    log('error', 'forms.quote.config.missing_webhook_url', {
      requestId,
      hasN8NWebhookUrl: Boolean(process.env.N8N_WEBHOOK_URL),
      hasLegacyViteWebhookUrl: Boolean(process.env.VITE_N8N_WEBHOOK_URL),
    });
    return res.status(500).json({
      ok: false,
      message: 'Server configuration error',
      code: 'CONFIG_MISSING_WEBHOOK_URL',
      requestId,
    });
  }

  let parsedInput;
  try {
    const body = parseJsonBody(req);
    parsedInput = REQUEST_SCHEMA.parse(body);
  } catch {
    log('error', 'forms.quote.validation.invalid_payload', { requestId });
    return res.status(400).json({ ok: false, message: 'Invalid payload' });
  }

  let normalizedPhone;
  let normalizedAges;
  try {
    normalizedPhone = normalizePhone(parsedInput.phone);
    normalizedAges = normalizeAges(parsedInput.ages);
  } catch {
    log('error', 'forms.quote.validation.invalid_fields', { requestId });
    return res.status(400).json({ ok: false, message: 'Invalid fields' });
  }

  if (normalizedAges.length !== parsedInput.personCount) {
    log('error', 'forms.quote.validation.ages_count_mismatch', {
      requestId,
      personCount: parsedInput.personCount,
      agesCount: normalizedAges.length,
    });
    return res.status(400).json({ ok: false, message: 'Ages count mismatch' });
  }

  const n8nPayload = {
    source: 'guetro-web-forms',
    formType: 'quote',
    createdAt: new Date().toISOString(),
    lead: {
      name: parsedInput.name,
      email: parsedInput.email,
      phone: normalizedPhone,
      acceptedTerms: Boolean(parsedInput.acceptedTerms),
    },
    quote: {
      modality: parsedInput.modality,
      modalityCode: parsedInput.modalityCode,
      personCount: parsedInput.personCount,
      ages: normalizedAges,
    },
    meta: {
      origin: origin || null,
      userAgent: req.headers['user-agent'] || null,
      ip: getClientIp(req),
      country: req.headers['x-vercel-ip-country'] || null,
      city: req.headers['x-vercel-ip-city'] || null,
    },
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), webhook.timeoutMs);

  try {
    const headers = { 'Content-Type': 'application/json' };
    if (webhook.secret) {
      headers['x-webhook-secret'] = webhook.secret;
    }

    const response = await fetch(webhook.url, {
      method: 'POST',
      headers,
      body: JSON.stringify(n8nPayload),
      signal: controller.signal,
    });

    if (!response.ok) {
      const upstreamText = await response.text().catch(() => '');
      log('error', 'forms.quote.upstream.error_response', {
        requestId,
        status: response.status,
        statusText: response.statusText,
        bodyPreview: upstreamText.slice(0, 500),
      });
      return res.status(502).json({
        ok: false,
        message: 'Upstream webhook error',
        code: 'UPSTREAM_ERROR',
        requestId,
      });
    }

    log('info', 'forms.quote.upstream.success', { requestId, status: response.status });
    return res.status(200).json({ ok: true, requestId });
  } catch (error) {
    log('error', 'forms.quote.upstream.request_failed', {
      requestId,
      name: error instanceof Error ? error.name : 'UnknownError',
      message: error instanceof Error ? error.message : String(error),
    });
    return res.status(502).json({
      ok: false,
      message: 'Webhook unavailable',
      code: 'UPSTREAM_UNAVAILABLE',
      requestId,
    });
  } finally {
    clearTimeout(timeout);
  }
}
