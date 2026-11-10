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
import { MediumPage } from './components/MediumPage';
import { initTheme } from './services/themeService';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'medium'>(() => {
    if (window.location.hash.startsWith('#/medium')) return 'medium';
    return 'home';
  });
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);

  // Initialize saved accent theme
  useEffect(() => {
    initTheme();
  }, []);

  // Hash route listener
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash.startsWith('#/medium')) {
        setCurrentView('medium');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToHome = () => {
    window.location.hash = '#/';
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToMedium = () => {
    window.location.hash = '#/medium';
    setCurrentView('medium');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  // Scrollspy observer for active section (home view only)
  useEffect(() => {
    if (currentView !== 'home') return;

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
  }, [currentView]);

  return (
    <div className="linux-theme">
      {/* WebGL 3D Canvas Background */}
      <BackgroundCanvas />

      {/* Polybar / Tmux Top Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        currentView={currentView}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onNavigateHome={navigateToHome}
        onNavigateMedium={navigateToMedium}
      />

      {/* Main Content View Switcher */}
      <main id="main-content">
        {currentView === 'home' ? (
          <>
            <Hero onOpenTerminal={() => setIsTerminalOpen(true)} />
            <Overview />
            <Experience />
            <Architecture />
            <Skills />
            <GithubGraph />
            <Contact />
          </>
        ) : (
          <MediumPage onReturnToWorkstation={navigateToHome} />
        )}
      </main>

      {/* Tmux Footer Status Bar */}
      <Footer />

      {/* Linux Terminal CLI HUD Modal */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onNavigateMedium={navigateToMedium}
      />
    </div>
  );
};

export default App;
