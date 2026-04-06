const PHONE_RAW = import.meta.env.VITE_CONTACT_PHONE || '11989155668';
const PHONE_FULL = `55${PHONE_RAW}`;

export const PHONE = PHONE_RAW;

export const PHONE_DISPLAY = (() => {
  const d = PHONE_RAW.replace(/\D/g, '');
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return d;
})();

export const EMAIL_PRIMARY =
  import.meta.env.VITE_CONTACT_EMAIL_PRIMARY || 'guetroseguros@gmail.com';

export const EMAIL_SECONDARY =
  import.meta.env.VITE_CONTACT_EMAIL_SECONDARY || 'diorande.contro@guetro.com.br';

export function whatsappUrl(text = 'Olá%2C+gostaria+de+mais+informações.') {
  return `https://api.whatsapp.com/send/?phone=${PHONE_FULL}&text=${text}&type=phone_number&app_absent=0`;
}
