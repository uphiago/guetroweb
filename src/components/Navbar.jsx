import React, { useState } from 'react';
import { Menu, X, ShieldCheck } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="fixed w-full bg-white shadow-md z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    {/* Using text logo based on branding */}
                    <a href="#" className="text-3xl font-bold font-['Anta'] text-[var(--primary-blue)]">
                        Guetro
                    </a>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    <a href="#about" className="font-medium hover:text-[var(--primary-blue)] transition-colors">Sobre</a>
                    <a href="#services" className="font-medium hover:text-[var(--primary-blue)] transition-colors">Serviços</a>
                    <a href="#method" className="font-medium hover:text-[var(--primary-blue)] transition-colors">Método Guetro</a>
                    <a href="#testimonials" className="font-medium hover:text-[var(--primary-blue)] transition-colors">Depoimentos</a>
                    <a href="#contact" className="btn btn-primary">
                        Fale Conosco
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-gray-700 hover:text-[var(--primary-blue)]">
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 py-4 absolute w-full shadow-lg">
                    <div className="flex flex-col space-y-4 px-6">
                        <a onClick={toggleMenu} href="#about" className="font-medium hover:text-[var(--primary-blue)]">Sobre</a>
                        <a onClick={toggleMenu} href="#services" className="font-medium hover:text-[var(--primary-blue)]">Serviços</a>
                        <a onClick={toggleMenu} href="#method" className="font-medium hover:text-[var(--primary-blue)]">Método Guetro</a>
                        <a onClick={toggleMenu} href="#testimonials" className="font-medium hover:text-[var(--primary-blue)]">Depoimentos</a>
                        <a onClick={toggleMenu} href="#contact" className="btn btn-primary w-full text-center">
                            Fale Conosco
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
