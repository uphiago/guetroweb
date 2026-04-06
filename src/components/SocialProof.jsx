import React, { useEffect } from 'react';
import { whatsappUrl } from '../lib/constants';

const SocialProof = () => {

    // Load Elfsight script
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://static.elfsight.com/platform/platform.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            // Cleanup if component unmounts
            const existingScript = document.querySelector('script[src="https://static.elfsight.com/platform/platform.js"]');
            if (existingScript) {
                existingScript.remove();
            }
        };
    }, []);

    return (
        <section id="testimonials" className="section-padding bg-primary-dark text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-blue rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
            </div>

            <div className="container relative z-10 mx-auto px-6 text-center">

                {/* Section Title */}
                <h2 className="text-4xl font-anta font-bold mb-8">O que dizem nossos clientes</h2>

                {/* Elfsight Google Reviews Widget */}
                <div className="mb-12">
                    <div className="elfsight-app-14b19535-ba22-4c83-940b-5c8b0843f401" data-elfsight-app-lazy></div>
                </div>

                {/* WhatsApp CTA */}
                <div className="flex justify-center">
                    <a
                        href={whatsappUrl()}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-4 bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-5 rounded-full shadow-lg shadow-green-900/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group"
                    >
                        <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" className="shrink-0">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                        <span className="text-xl font-bold font-afacad">Fale Conosco Agora</span>
                    </a>
                </div>

            </div>
        </section>
    );
};

export default SocialProof;
