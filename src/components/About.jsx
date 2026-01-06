import React from 'react';
import { Target, BarChart3, Users2 } from 'lucide-react';

const About = () => {
    return (
        <section id="about" className="section-padding bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Text Content */}
                    <div className="lg:w-1/2">
                        <span className="text-primary-blue font-bold tracking-wider uppercase text-sm">Sobre Nós</span>
                        <h2 className="text-4xl font-anta font-bold mt-2 mb-6 text-primary-dark">
                            Transparência e Resultado: <br />
                            <span className="text-primary-blue">O Método Guetro</span>
                        </h2>

                        <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                            A <strong>Guetro Corretora de Seguros</strong> é especializada em soluções completas em seguros e benefícios, atendendo famílias e empresas em todo o Brasil.
                        </p>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Nosso atendimento é estruturado, transparente e orientado a resultado. Não entregamos apenas uma apólice, mas sim um acompanhamento contínuo antes, durante e após a contratação.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-50 p-3 rounded-lg text-primary-blue">
                                    <BarChart3 size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold font-anta text-primary-dark">Análise Técnica de Perfil</h4>
                                    <p className="text-sm text-gray-500">Avaliamos detalhadamente suas necessidades para evitar excessos ou faltas na cobertura.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-50 p-3 rounded-lg text-primary-blue">
                                    <Target size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold font-anta text-primary-dark">Comparação Estratégica</h4>
                                    <p className="text-sm text-gray-500">Confrontamos as opções do mercado para encontrar o perfeito equilíbrio entre cobertura e investimento.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-50 p-3 rounded-lg text-primary-blue">
                                    <Users2 size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold font-anta text-primary-dark">Foco em Pessoas</h4>
                                    <p className="text-sm text-gray-500">Para empresas: retenção de talentos e aumento de produtividade. Para famílias: proteção e tranquilidade.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Visual/Image Area - Using a styled placeholder pattern for now */}
                    <div className="lg:w-1/2 relative">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-900 border-8 border-white">
                            {/* Abstract decorative gradient replacing image for now */}
                            <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 to-black p-8 flex items-center justify-center relative">
                                <div className="absolute inset-0 bg-primary-blue/20 mix-blend-overlay"></div>
                                <div className="text-center z-10">
                                    <h3 className="text-5xl font-anta text-white mb-2">Guetro</h3>
                                    <span className="text-blue-300 tracking-[0.3em] text-sm uppercase">Corretora de Seguros</span>
                                </div>
                                {/* Decorative circles */}
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-blue/30 rounded-full blur-2xl"></div>
                                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                            </div>
                        </div>

                        {/* Floating Stats Card */}
                        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-gray-100 max-w-xs hidden md:block">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className={`w-10 h-10 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center text-xs font-bold text-gray-500`}>U{i}</div>
                                    ))}
                                </div>
                                <span className="font-bold text-primary-dark">+500</span>
                            </div>
                            <p className="text-sm text-gray-600">Vidas e patrimônios protegidos em todo o Brasil.</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;
