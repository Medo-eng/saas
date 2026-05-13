import { useRef } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import RemixEngine from '../components/RemixEngine';
import Features from '../components/Features';
import Footer from '../components/Footer';

export default function LandingPage() {
  const engineRef = useRef(null);

  const scrollToEngine = () => {
    document.getElementById('remix-engine')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero onScrollToEngine={scrollToEngine} />
      <RemixEngine />
      <Features />
      <Footer />
    </div>
  );
}
