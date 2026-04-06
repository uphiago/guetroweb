import React from 'react';
import QuoteStepper from './QuoteStepper';

export default function FormsPage() {
  return (
    <div className="min-h-screen overflow-y-auto bg-[radial-gradient(circle_at_top_right,_rgba(34,65,145,0.16),_transparent_45%),linear-gradient(180deg,#f8f9fc_0%,#eef3ff_100%)] md:h-screen md:overflow-hidden">
      <div className="px-3 py-4 md:flex md:h-[calc(100vh-56px)] md:flex-col md:px-4 md:py-4">
        <div className="mx-auto mb-4 flex w-full max-w-4xl items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2.5 md:mb-5 md:px-6">
          <a href="/" className="text-2xl font-anta text-[var(--primary-blue)]">
            Guetro
          </a>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
          >
            Voltar ao site
          </a>
        </div>

        <div className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center md:min-h-0">
          <QuoteStepper />
        </div>
      </div>

      <footer className="border-t border-slate-200 bg-white/95 px-4 py-3 text-center text-xs text-slate-600 backdrop-blur-sm">
        <p>© {new Date().getFullYear()} Guetro Corretora de Seguros</p>
      </footer>
    </div>
  );
}
