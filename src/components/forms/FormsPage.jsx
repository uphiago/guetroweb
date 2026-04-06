import React, { useState } from 'react';
import { Mail, MapPin, Check } from 'lucide-react';
import QuoteStepper from './QuoteStepper';
import WhatsAppButton from '../WhatsAppButton';

const EMAIL = 'diorande.contro@guetro.com.br';

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
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
      <span>{copied ? 'E-mail copiado!' : EMAIL}</span>
    </button>
  );
}

export default function FormsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_top_right,_rgba(34,65,145,0.16),_transparent_45%),linear-gradient(180deg,#f8f9fc_0%,#eef3ff_100%)]">
      {/* Content area */}
      <div className="flex flex-1 flex-col px-3 py-4 md:px-4 md:py-6">
        {/* Header */}
        <div className="mx-auto mb-4 flex w-full max-w-4xl items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2.5 md:mb-6 md:px-6">
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

        {/* Form centered */}
        <div className="mx-auto flex w-full max-w-6xl flex-1 items-start justify-center pb-6 md:items-center md:pb-8">
          <QuoteStepper />
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/95 px-4 py-4 text-slate-700 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 text-[0.95rem] md:flex-row md:items-center md:justify-between">
          <div className="text-center md:text-left">
            <p className="font-semibold text-slate-800">Guetro Corretora de Seguros</p>
            <p className="inline-flex items-center gap-1">
              <MapPin size={13} />
              Atendimento em todo o Brasil
            </p>
          </div>

          <div className="flex flex-col items-center gap-1 md:items-end">
            <a
              href="https://api.whatsapp.com/send/?phone=5511989155668&text=Olá%2C+gostaria+de+mais+informações.&type=phone_number&app_absent=0"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-slate-800"
            >
              <img src="/whatsapp.png" alt="WhatsApp" className="h-4 w-4" />
              <span>(11) 98915-5668</span>
            </a>
            <CopyEmail />
          </div>
        </div>

        <div className="mx-auto mt-2 flex w-full max-w-6xl flex-col items-center gap-1.5 text-[0.85rem] text-slate-600 md:flex-row md:justify-between">
          <span>© {new Date().getFullYear()} Guetro Corretora de Seguros</span>
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
