import React, { useState } from 'react';

const STORAGE_KEY = 'guetro_cookie_consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(() => !localStorage.getItem(STORAGE_KEY));

  function accept() {
    localStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed bottom-0 left-0 right-0 z-[60] border-t border-slate-200 bg-white/95 px-4 py-4 shadow-2xl backdrop-blur-sm md:px-6"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm leading-relaxed text-slate-700">
          Utilizamos cookies para melhorar sua experiência e coletar dados de navegação conforme nossa{' '}
          <a href="/privacidade" className="underline underline-offset-2 hover:text-slate-900">
            Política de Privacidade
          </a>
          . Ao continuar, você concorda com esse uso.
        </p>
        <button
          onClick={accept}
          className="shrink-0 rounded-lg bg-[var(--primary-blue)] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Entendi e aceito
        </button>
      </div>
    </div>
  );
}
