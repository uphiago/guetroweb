import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import QuoteStepper from './QuoteStepper';
import WhatsAppButton from '../WhatsAppButton';

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

      <footer className="border-t border-slate-200 bg-white/95 px-4 py-3 text-slate-600 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 text-xs md:flex-row md:items-center md:justify-between">
          <div className="text-center md:text-left">
            <p className="font-semibold text-slate-700">Guetro Corretora de Seguros</p>
            <p>Atendimento em todo o Brasil</p>
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
            <a
              href="mailto:diorande.contro@guetro.com.br"
              className="inline-flex items-center gap-1.5 hover:text-slate-800"
            >
              <Mail size={14} />
              <span>diorande.contro@guetro.com.br</span>
            </a>
          </div>
        </div>

        <div className="mx-auto mt-2 flex w-full max-w-6xl items-center justify-center gap-1 text-[11px] text-slate-500 md:justify-start">
          <MapPin size={13} />
          <span>© {new Date().getFullYear()} Guetro Corretora de Seguros</span>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
}
