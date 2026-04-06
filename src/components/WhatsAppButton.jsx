import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { whatsappUrl } from '../lib/constants';

const WhatsAppButton = () => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [footerVisible, setFooterVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowTooltip(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const footer = document.querySelector('footer');
        if (!footer) return;
        const observer = new IntersectionObserver(
            ([entry]) => setFooterVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );
        observer.observe(footer);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            className={`fixed bottom-6 right-4 z-50 flex flex-col items-end transition-all duration-300 md:right-6 ${
                footerVisible ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100 translate-y-0'
            }`}
        >
            {/* Tooltip Popup */}
            <div
                className={`mb-4 mr-2 bg-white text-primary-dark px-4 py-3 rounded-lg shadow-xl relative transition-all duration-500 ease-out transform ${showTooltip ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'} animate-bounce-subtle`}
            >
                <div className="text-base font-bold flex items-center justify-between gap-4">
                    <span>Faça uma cotação grátis! 👋</span>
                    <button onClick={() => setShowTooltip(false)} className="text-gray-400 hover:text-gray-600">
                        <X size={16} />
                    </button>
                </div>
                <div className="absolute bottom-0 right-6 translate-y-1/2 rotate-45 w-4 h-4 bg-white shadow-sm -z-10"></div>
            </div>

            <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-300 hover:scale-110 flex items-center justify-center"
                onMouseEnter={() => setShowTooltip(true)}
            >
                <img src="/whatsapp.png" alt="WhatsApp" className="w-16 h-16 drop-shadow-xl" />
            </a>
        </div>
    );
};

export default WhatsAppButton;
