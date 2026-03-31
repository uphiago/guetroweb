import React from 'react';
import { Instagram, Linkedin, Mail, MapPin } from 'lucide-react';

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
                            <a href="https://www.linkedin.com/in/dimicontro/" target="_blank" rel="noreferrer" className="hover:text-[var(--primary-blue)] transition-colors text-white">
                                <Linkedin size={24} />
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
                                
                                    href="https://api.whatsapp.com/send/?phone=5511989155668&text=Olá%2C+gostaria+de+mais+informações.&type=phone_number&app_absent=0"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    (11) 98915-5668
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="text-[var(--primary-blue)] shrink-0" size={20} />
                                <a href="mailto:diorande.contro@guetro.com.br" className="text-gray-300 hover:text-white transition-colors">
                                    diorande.contro@guetro.com.br
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 pt-8 flex text-center justify-center text-gray-500 font-['Afacad'] text-sm">
                    <p>&copy; {new Date().getFullYear()} Guetro Corretora de Seguros.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
