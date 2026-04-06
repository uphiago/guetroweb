import React, { useState } from 'react';
import { Instagram, Mail, MapPin, Check } from 'lucide-react';
import { EMAIL_PRIMARY, EMAIL_SECONDARY, PHONE_DISPLAY, whatsappUrl } from '../lib/constants';

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
      className="flex items-center gap-3 text-gray-300 transition-colors hover:text-white"
    >
      {copied
        ? <Check className="shrink-0 text-green-400" size={20} />
        : <Mail className="text-[var(--primary-blue)] shrink-0" size={20} />}
      <span>{copied ? 'E-mail copiado!' : email}</span>
    </button>
  );
}

const Footer = () => {
  return (
    <footer className="bg-[var(--primary-dark)] text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          {/* Brand */}
          <div className="max-w-md">
            <h2 className="text-3xl font-['Anta'] mb-4 text-white">Guetro</h2>
            <p className="text-gray-300 mb-6 font-['Afacad']">
              Soluções completas em seguros e benefícios, orientando famílias e empresas para decisões seguras.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/guetrosaude/" target="_blank" rel="noreferrer" className="hover:text-[var(--primary-blue)] transition-colors text-white">
                <Instagram size={24} />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-6 font-['Anta'] text-white">Contato</h3>
            <ul className="space-y-4 font-['Afacad']">
              <li className="flex items-start gap-3">
                <MapPin className="text-[var(--primary-blue)] mt-1 shrink-0" size={20} />
                <span className="text-gray-300">Atendimento em todo o Brasil</span>
              </li>
              <li className="flex items-center gap-3">
                <img src="/whatsapp.png" alt="WhatsApp" className="w-5 h-5 shrink-0" />
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <CopyEmail email={EMAIL_PRIMARY} />
              </li>
              <li>
                <CopyEmail email={EMAIL_SECONDARY} />
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col items-center gap-2 text-center text-gray-500 font-['Afacad'] text-sm md:flex-row md:justify-between">
          <p>&copy; {new Date().getFullYear()} Guetro Corretora de Seguros. CNPJ 55.054.733/0001-09</p>
          <div className="flex gap-4">
            <a href="/termos" className="hover:text-gray-300 transition-colors">Termos de Uso</a>
            <a href="/privacidade" className="hover:text-gray-300 transition-colors">Política de Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
