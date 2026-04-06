import React from 'react';
import QuoteStepper from './QuoteStepper';
import Footer from '../Footer';

export default function FormsPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(34,65,145,0.16),_transparent_45%),linear-gradient(180deg,#f8f9fc_0%,#eef3ff_100%)]">
      <div className="px-4 py-10 md:py-14">
        <div className="mx-auto mb-8 flex w-full max-w-4xl items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 md:px-6">
          <a href="/" className="text-2xl font-anta text-[var(--primary-blue)]">
            Guetro
          </a>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
          >
            Voltar ao site
          </a>
        </div>

        <div className="mx-auto flex w-full max-w-6xl items-center justify-center">
          <QuoteStepper />
        </div>
      </div>

      <Footer />
    </div>
  );
}
