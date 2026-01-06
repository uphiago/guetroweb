import React from 'react';
import { Star, Instagram, Linkedin, ExternalLink } from 'lucide-react';

const reviews = [
    {
        name: "Ricardo Silva",
        text: "Atendimento excepcional! A equipe da Guetro entendeu exatamente o que minha empresa precisava. Recomendo muito o seguro saúde empresarial.",
        stars: 5,
        date: "Há 2 semanas"
    },
    {
        name: "Mariana Costa",
        text: "Fiz meu seguro de vida com eles e me senti muito segura com as explicações. Muita transparência em todo o processo. O Método Guetro faz diferença.",
        stars: 5,
        date: "Há 1 mês"
    },
    {
        name: "Empresa Tech Solutions",
        text: "A gestão de benefícios corporativos melhorou 100% depois que contratamos a Guetro. Profissionais muito qualificados.",
        stars: 5,
        date: "Há 3 meses"
    }
];

const SocialProof = () => {
    return (
        <section id="testimonials" className="section-padding bg-primary-dark text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-blue rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
            </div>

            <div className="container relative z-10 mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-anta font-bold mb-4">O que dizem nossos clientes</h2>
                    <div className="flex items-center justify-center gap-2 text-yellow-500 mb-2">
                        {[1, 2, 3, 4, 5].map((_, i) => (
                            <Star key={i} size={24} fill="currentColor" />
                        ))}
                    </div>
                    <p className="text-gray-400">Excelente avaliação no Google</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {reviews.map((review, index) => (
                        <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex gap-1 text-yellow-500">
                                    {[...Array(review.stars)].map((_, i) => (
                                        <Star key={i} size={16} fill="currentColor" />
                                    ))}
                                </div>
                                <span className="text-xs text-gray-500">{review.date}</span>
                            </div>
                            <p className="text-gray-300 mb-6 text-sm leading-relaxed italic">"{review.text}"</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white text-sm">
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-bold text-sm">{review.name}</p>
                                    <p className="text-xs text-gray-500">Cliente Verificado</p>
                                </div>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="w-5 h-5 ml-auto opacity-70" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                    <a href="#" className="btn bg-white text-primary-dark hover:bg-gray-100 flex items-center gap-2">
                        <ExternalLink size={18} />
                        Ver avaliações no Google
                    </a>
                    <div className="flex gap-4">
                        <a href="https://instagram.com" className="p-3 bg-white/10 rounded-full hover:bg-primary-blue transition-colors">
                            <Instagram size={24} />
                        </a>
                        <a href="https://linkedin.com" className="p-3 bg-white/10 rounded-full hover:bg-primary-blue transition-colors">
                            <Linkedin size={24} />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SocialProof;
