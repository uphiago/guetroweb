import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import SocialProof from './components/SocialProof';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <div className="min-h-screen bg-background text-text-color font-sans">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <SocialProof />
      </main>
      <div id="contact">
        <Footer />
      </div>
      <WhatsAppButton />
      <Analytics />
    </div>
  );
}

export default App;
