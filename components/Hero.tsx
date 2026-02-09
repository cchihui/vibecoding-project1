
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full glass-card text-xs font-semibold text-purple-400 mb-8 tracking-widest uppercase">
          Available for Freelance Projects
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
          Building the next generation of <br />
          <span className="gradient-text">Scalable Web Apps</span>
        </h1>
        <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl mb-10 leading-relaxed">
          I'm a Senior Full-Stack Developer specializing in high-performance React applications and seamless AI integrations. I transform complex problems into elegant, user-centric solutions.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <a href="#projects" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition-all shadow-lg shadow-purple-500/20 text-center">
            View My Work
          </a>
          <a href="#contact" className="w-full sm:w-auto px-8 py-4 rounded-xl glass-card text-white font-bold hover:bg-white/10 transition-all text-center">
            Let's Talk
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
