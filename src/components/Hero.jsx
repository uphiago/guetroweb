import React from 'react';
import { ArrowRight, HeartPulse, TrendingUp, ShieldCheck, CheckCircle2 } from 'lucide-react';

const Hero = () => {
    return (
        <section id="home" className="relative pt-24 pb-16 lg:pt-36 lg:pb-24 bg-primary-dark text-white overflow-hidden">

            {/* Background with Grid */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-grid-white bg-[size:50px_50px] opacity-[0.03]"></div>
                {/* Spotlight */}
                <div className="absolute top-0 right-0 w-1/2 h-[600px] bg-primary-blue opacity-10 blur-[150px] rounded-full pointer-events-none"></div>
            </div>

            <div className="container relative z-10 mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

                    {/* Left Column: Text & CTA */}
                    <div className="lg:w-1/2 text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-blue-300 text-xs font-bold uppercase tracking-wider mb-8">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                            <span>Corretora Especializada</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-anta leading-[1.1] mb-6">
                            <span className="text-white block">O Seguro que sua</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white block">
                                empresa e família precisa
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl leading-relaxed">
                            Planos de saúde, Seguro de vida e benefícios corporativos, como ajudamos empresas e famílias com o <strong>método Guetro</strong>.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="#contact"
                                className="inline-flex items-center justify-center px-8 py-4 bg-primary-blue text-white font-bold rounded-lg transition-all duration-300 hover:bg-blue-600 hover:-translate-y-1 shadow-lg shadow-blue-900/30"
                            >
                                Fazer Cotação
                            </a>
                            <a
                                href="#about"
                                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-white/10 text-white font-medium rounded-lg hover:bg-white/5 transition-all duration-300 group"
                            >
                                Como Funciona <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>

                        <div className="mt-10 flex items-center gap-6 text-sm text-gray-400 font-afacad">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={16} className="text-green-500" />
                                <span>Atendimento Nacional</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={16} className="text-green-500" />
                                <span>Suporte Contínuo</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Animated Visuals */}
                    <div className="lg:w-1/2 relative h-[500px] w-full flex items-center justify-center perspective-[1000px]">

                        {/* Card 1: Health (Top Right) */}
                        <div className="absolute top-2 md:top-6 right-0 md:right-10 w-64 bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-2xl animate-float will-change-transform" style={{ animationDelay: '0s' }}>
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-red-500/20 rounded-xl text-red-400">
                                    <HeartPulse size={24} />
                                </div>
                                <div className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full font-bold">Ativo</div>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Saúde Premium</h3>
                                <p className="text-xs text-gray-400">Rede credenciada completa</p>
                            </div>
                        </div>

                        {/* Card 2: Business (Bottom Right) */}
                        <div className="absolute bottom-8 right-4 md:right-16 w-60 bg-[#1a1a1a] border border-white/10 p-5 rounded-2xl shadow-2xl z-20 animate-float will-change-transform" style={{ animationDelay: '2s' }}>
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                                    <TrendingUp size={20} />
                                </div>
                                <span className="text-green-400 text-sm font-bold">+25% Econ.</span>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-base font-bold text-gray-200">Gestão Eficiente</h3>
                                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-blue-500 w-3/4 h-full"></div>
                                </div>
                            </div>
                        </div>

                        {/* Card 3: Family/Protection (Left Center - Main Focus) */}
                        {/* Card 3: Family/Protection (Left Center - Main Focus) */}
                        <div className="absolute top-[52%] left-0 md:left-10 -translate-y-1/2 z-30">
                            <div className="w-72 bg-gradient-to-br from-primary-blue to-blue-900 border border-white/20 p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-float will-change-transform" style={{ animationDelay: '4s' }}>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                        <ShieldCheck size={28} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-white">Proteção Total</h3>
                                        <p className="text-blue-200 text-xs uppercase tracking-wide">Apólice Confirmada</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm text-blue-100/80">
                                        <span>Cobertura</span>
                                        <span>100%</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-blue-100/80">
                                        <span>Carência</span>
                                        <span>Zero</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 to-transparent blur-3xl -z-10"></div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
