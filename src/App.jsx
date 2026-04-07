import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import SocialProof from './components/SocialProof';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import FormsPage from './components/forms/FormsPage';
import TermosPage from './components/TermosPage';
import PrivacidadePage from './components/PrivacidadePage';
import CookieBanner from './components/CookieBanner';

import { Analytics } from "@vercel/analytics/react"

function App() {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    let lastTrackedPath = `${window.location.pathname}${window.location.search}`;
    const trackPageView = () => {
      const nextPath = `${window.location.pathname}${window.location.search}`;
      if (nextPath === lastTrackedPath) return;
      lastTrackedPath = nextPath;

      if (typeof window.fbq === 'function') {
        window.fbq('track', 'PageView');
      }
    };

    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    const onHistoryChange = () => {
      trackPageView();
    };

    window.history.pushState = function (...args) {
      originalPushState.apply(this, args);
      window.dispatchEvent(new Event('locationchange'));
    };

    window.history.replaceState = function (...args) {
      originalReplaceState.apply(this, args);
      window.dispatchEvent(new Event('locationchange'));
    };

    window.addEventListener('popstate', onHistoryChange);
    window.addEventListener('locationchange', onHistoryChange);

    return () => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      window.removeEventListener('popstate', onHistoryChange);
      window.removeEventListener('locationchange', onHistoryChange);
    };
  }, []);

  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';

  if (currentPath === '/forms') {
    return (
      <>
        <FormsPage />
        <Analytics />
      </>
    );
  }

  if (currentPath === '/termos') {
    return <><TermosPage /><CookieBanner /><Analytics /></>;
  }

  if (currentPath === '/privacidade') {
    return <><PrivacidadePage /><CookieBanner /><Analytics /></>;
  }

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
      <CookieBanner />
      <Analytics />
    </div>
  );
}

export default App;
