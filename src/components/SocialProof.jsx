import React from 'react';
import { Star, ExternalLink } from 'lucide-react';

const SocialProof = () => {
    const googleMapsUrl = "https://www.google.com/maps/place/Guetro/@-14.4095261,-51.31668,4z/data=!4m16!1m9!3m8!1s0x47d193daf0c76131:0x76cf08d5826259b0!2sGuetro!8m2!3d-14.4095262!4d-51.31668!9m1!1b1!16s%2Fg%2F11yv2k1xcz!3m5!1s0x47d193daf0c76131:0x76cf08d5826259b0!8m2!3d-14.4095262!4d-51.31668!16s%2Fg%2F11yv2k1xcz?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D";
    const whatsappUrl = "https://api.whatsapp.com/send/?phone=5511911700112&text=Olá%2C+gostaria+de+mais+informações.&type=phone_number&app_absent=0";

    return (
        <section id="testimonials" className="section-padding bg-primary-dark text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-blue rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
            </div>

            <div className="container relative z-10 mx-auto px-6 text-center">

                {/* Google Rating Block */}
                <div className="mb-12">
                    <h2 className="text-4xl font-anta font-bold mb-6">O que dizem nossos clientes</h2>

                    <a
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block group hover:scale-105 transition-transform duration-300"
                    >
                        <div className="flex items-center justify-center gap-2 text-yellow-400 mb-3">
                            {[1, 2, 3, 4, 5].map((_, i) => (
                                <Star key={i} size={32} fill="currentColor" className="drop-shadow-lg" />
                            ))}
                        </div>
                        <div className="flex items-center justify-center gap-2 text-gray-300 group-hover:text-white transition-colors">
                            <span className="text-xl font-medium">Excelente avaliação no Google</span>
                            <ExternalLink size={18} />
                        </div>
                        <p className="text-sm text-gray-500 mt-2 group-hover:text-blue-300 transition-colors">Clique para ver os depoimentos reais</p>
                    </a>
                </div>

                {/* WhatsApp CTA */}
                <div className="flex justify-center">
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-4 bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-5 rounded-full shadow-lg shadow-green-900/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group"
                    >
                        <img src="/whatsapp.png" alt="WhatsApp" className="w-8 h-8 brightness-0 invert" />
                        <span className="text-xl font-bold font-afacad">Fale Conosco Agora</span>
                    </a>
                </div>

            </div>
        </section>
    );
};

export default SocialProof;
