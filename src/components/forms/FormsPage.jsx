import React, { useState } from 'react';
import { Mail, MapPin, Check } from 'lucide-react';
import QuoteStepper from './QuoteStepper';
import WhatsAppButton from '../WhatsAppButton';
import { EMAIL_PRIMARY, PHONE_DISPLAY, whatsappUrl } from '../../lib/constants';

function CopyEmail({ email }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={handleCopy}
      title="Clique para copiar o e-mail"
      className="inline-flex items-center gap-1.5 transition-colors hover:text-slate-800"
    >
      {copied ? <Check size={14} className="text-green-600" /> : <Mail size={14} />}
      <span>{copied ? 'E-mail copiado!' : email}</span>
    </button>
  );
}

export default function FormsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_top_right,_rgba(34,65,145,0.16),_transparent_45%),linear-gradient(180deg,#f8f9fc_0%,#eef3ff_100%)] md:h-screen md:overflow-hidden" style={{ '--dvh': '100dvh' }}>
      {/* Content area */}
      <div className="flex flex-1 flex-col px-3 py-4 md:min-h-0 md:px-4 md:py-5">
        {/* Header */}
        <div className="mx-auto mb-3 flex w-full max-w-4xl shrink-0 items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2.5 md:mb-4 md:px-6">
          <a href="/" className="font-anta text-2xl text-[var(--primary-blue)]">
            Guetro
          </a>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
          >
            Voltar ao site
          </a>
        </div>

        {/* Form */}
        <div className="mx-auto w-full max-w-4xl pb-4 md:min-h-0 md:flex-1 md:pb-0">
          <QuoteStepper />
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/95 px-4 py-4 text-slate-700 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 text-[0.95rem] md:flex-row md:items-start md:justify-between">
          <div className="text-center md:text-left">
            <p className="font-semibold text-slate-800">Guetro Corretora de Seguros</p>
            <p className="inline-flex items-center gap-1">
              <MapPin size={13} />
              Atendimento em todo o Brasil
            </p>
          </div>

          <div className="flex flex-col items-center gap-1 md:items-end">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-slate-800"
            >
              <img src="/whatsapp.png" alt="WhatsApp" className="h-4 w-4" />
              <span>{PHONE_DISPLAY}</span>
            </a>
            <CopyEmail email={EMAIL_PRIMARY} />
          </div>
        </div>

        <div className="mx-auto mt-2 flex w-full max-w-6xl flex-col items-center gap-1.5 text-[0.85rem] text-slate-600 md:flex-row md:justify-between">
          <span>© {new Date().getFullYear()} Guetro Corretora de Seguros · CNPJ 55.054.733/0001-09</span>
          <div className="flex gap-3">
            <a href="/termos" className="transition-colors hover:text-slate-800">Termos de Uso</a>
            <a href="/privacidade" className="transition-colors hover:text-slate-800">Política de Privacidade</a>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
}
