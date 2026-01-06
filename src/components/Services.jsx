import React from 'react';
import { HeartPulse, Shield, Briefcase, Users, Plus, CheckCircle2 } from 'lucide-react';

const services = [
    {
        icon: <HeartPulse size={32} />,
        title: "Seguro Saúde",
        description: "Planos de saúde completos para garantir o bem-estar da sua família ou equipe com ampla rede credenciada.",
        features: ["Rede Nacional", "Coparticipação Flexível", "Reembolso"]
    },
    {
        icon: <Shield size={32} />,
        title: "Seguro de Vida",
        description: "Proteção financeira essencial para quem você ama. Tranquilidade e segurança para o futuro.",
        features: ["Indenização Rápida", "Cobertura de Acidentes", "Assistência Funeral"]
    },
    {
        icon: <Briefcase size={32} />,
        title: "Seguro Empresarial",
        description: "Soluções customizadas para proteger o patrimônio, operações e responsabilidades do seu negócio.",
        features: ["Responsabilidade Civil", "Patrimonial", "Riscos Diversos"]
    },
    {
        icon: <Users size={32} />,
        title: "Benefícios Corporativos",
        description: "Estratégias para retenção de talentos e aumento de produtividade através de pacotes de benefícios atraentes.",
        features: ["Vale Refeição/Alimentação", "Odontológico", "Previdência Privada"]
    }
];

const Services = () => {
    return (
        <section id="services" className="bg-background-light section-padding">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-primary-blue font-bold tracking-wider uppercase text-sm">O que oferecemos</span>
                    <h2 className="text-4xl font-anta font-bold mt-2 text-primary-dark">Soluções Completas</h2>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        Trabalhamos com as principais operadoras do mercado para oferecer a melhor relação entre cobertura e investimento.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-card hover:shadow-xl transition-all duration-300 group border border-transparent hover:border-primary-blue/10">
                            <div className="w-16 h-16 bg-blue-50 text-primary-blue rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-blue group-hover:text-white transition-colors duration-300">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold font-anta text-primary-dark mb-3">{service.title}</h3>
                            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                                {service.description}
                            </p>
                            <ul className="space-y-2">
                                {service.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center text-sm text-gray-500">
                                        <CheckCircle2 size={14} className="text-green-500 mr-2" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
