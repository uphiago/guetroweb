const DEFAULT_COMPLETE_REGISTRATION_VALUE = 1;
const DEFAULT_CURRENCY = 'BRL';

function resolveCompleteRegistrationValue() {
  const raw = import.meta.env.VITE_META_COMPLETE_REGISTRATION_VALUE;
  const parsed = Number(raw);

  if (Number.isFinite(parsed) && parsed > 0) {
    return parsed;
  }

  return DEFAULT_COMPLETE_REGISTRATION_VALUE;
}

function resolveCurrency() {
  const raw = String(import.meta.env.VITE_META_COMPLETE_REGISTRATION_CURRENCY || '').trim().toUpperCase();
  return raw || DEFAULT_CURRENCY;
}

export function trackCompleteRegistration(eventData = {}) {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') {
    return;
  }

  window.fbq('track', 'CompleteRegistration', {
    value: resolveCompleteRegistrationValue(),
    currency: resolveCurrency(),
    ...eventData,
  });
}

