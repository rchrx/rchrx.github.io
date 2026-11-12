import React, { useState, useEffect } from 'react';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Overview } from './components/Overview';
import { Experience } from './components/Experience';
import { Architecture } from './components/Architecture';
import { Skills } from './components/Skills';
import { GithubGraph } from './components/GithubGraph';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { TerminalModal } from './components/TerminalModal';
import { initTheme } from './services/themeService';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);

  // Initialize saved accent theme
  useEffect(() => {
    initTheme();
  }, []);

  // Global hotkeys (`~` or `Cmd+K`)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        const activeEl = document.activeElement;
        if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
          return;
        }
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Scrollspy observer for active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset + 140;
      const sectionIds = ['overview', 'experience', 'architecture', 'skills', 'github', 'contact'];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(id);
            return;
          }
        }
      }

      if (window.pageYOffset < 200) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="linux-theme">
      {/* WebGL 3D Canvas Background */}
      <BackgroundCanvas />

      {/* Polybar / Tmux Top Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Main Content */}
      <main id="main-content">
        <Hero onOpenTerminal={() => setIsTerminalOpen(true)} />
        <Overview />
        <Experience />
        <Architecture />
        <Skills />
        <GithubGraph />
        <Contact />
      </main>

      {/* Tmux Footer Status Bar */}
      <Footer />

      {/* Linux Terminal CLI HUD Modal */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </div>
  );
};

export default App;
