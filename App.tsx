
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen selection:bg-purple-500/30">
      <Navbar />
      
      <main>
        <Hero />
        <Services />
        <Projects />
        <ContactForm />
      </main>

      <Footer />
      
      {/* Background blobs for aesthetic depth */}
      <div className="fixed top-0 -left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 -right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />
    </div>
  );
};

export default App;
