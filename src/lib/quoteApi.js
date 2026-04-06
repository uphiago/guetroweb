const DEV_MOCK = import.meta.env.VITE_FORMS_DEV_MOCK === 'true';
const DEV_N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL;
const DEV_N8N_WEBHOOK_SECRET = import.meta.env.VITE_N8N_WEBHOOK_SECRET;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function submitQuoteRequest(payload) {
  if (DEV_MOCK) {
    await sleep(900);
    return { mocked: true, ok: true };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  const response = await fetch('/api/forms/quote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal: controller.signal,
  }).finally(() => clearTimeout(timeout));

  if (import.meta.env.DEV && response.status === 404) {
    if (!DEV_N8N_WEBHOOK_URL) {
      throw new Error(
        'API local não encontrada. Rode com vercel dev ou defina VITE_FORMS_DEV_MOCK=true.'
      );
    }

    const devHeaders = { 'Content-Type': 'application/json' };
    if (DEV_N8N_WEBHOOK_SECRET) {
      devHeaders['x-webhook-secret'] = DEV_N8N_WEBHOOK_SECRET;
    }

    const devResponse = await fetch(DEV_N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: devHeaders,
      body: JSON.stringify(payload),
    });

    if (!devResponse.ok) {
      const devDetails = await devResponse.text().catch(() => '');
      throw new Error(devDetails || `n8n dev error (${devResponse.status})`);
    }

    return { ok: true, devDirect: true };
  }

  if (!response.ok) {
    const details = await response.text().catch(() => '');
    throw new Error(details || `api error (${response.status})`);
  }

  return response
    .json()
    .catch(() => ({ ok: true }));
}
