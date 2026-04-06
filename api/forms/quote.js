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

  const allowedOrigins = parseAllowedOrigins();
  maybeSetCorsHeaders(req, res, allowedOrigins);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return methodNotAllowed(res);
  }

  const origin = req.headers.origin;
  if (allowedOrigins.length > 0 && origin && !allowedOrigins.includes(origin)) {
    return res.status(403).json({ ok: false, message: 'Forbidden origin' });
  }

  if (!process.env.N8N_WEBHOOK_URL) {
    return res.status(500).json({ ok: false, message: 'Server configuration error' });
  }

  let parsedInput;
  try {
    const body = parseJsonBody(req);
    parsedInput = REQUEST_SCHEMA.parse(body);
  } catch {
    return res.status(400).json({ ok: false, message: 'Invalid payload' });
  }

  let normalizedPhone;
  let normalizedAges;
  try {
    normalizedPhone = normalizePhone(parsedInput.phone);
    normalizedAges = normalizeAges(parsedInput.ages);
  } catch {
    return res.status(400).json({ ok: false, message: 'Invalid fields' });
  }

  if (normalizedAges.length !== parsedInput.personCount) {
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

  const timeoutMs = Number(process.env.N8N_WEBHOOK_TIMEOUT_MS || 15000);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const headers = { 'Content-Type': 'application/json' };
    if (process.env.N8N_WEBHOOK_SECRET) {
      headers['x-webhook-secret'] = process.env.N8N_WEBHOOK_SECRET;
    }

    const response = await fetch(process.env.N8N_WEBHOOK_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(n8nPayload),
      signal: controller.signal,
    });

    if (!response.ok) {
      return res.status(502).json({ ok: false, message: 'Upstream webhook error' });
    }

    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ ok: false, message: 'Webhook unavailable' });
  } finally {
    clearTimeout(timeout);
  }
}
