const DEV_MOCK = import.meta.env.VITE_FORMS_DEV_MOCK === 'true';

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

  if (!response.ok) {
    const details = await response.text().catch(() => '');
    throw new Error(details || `api error (${response.status})`);
  }

  return response
    .json()
    .catch(() => ({ ok: true }));
}
