import React, { useState, useEffect } from 'react';
import { SYSTEM_INFO } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
  onOpenTerminal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onOpenTerminal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [time, setTime] = useState('00:00:00');
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  });

  // Internet connectivity listener
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Telemetry clock ticker
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      setTime(`${h}:${m}:${s}`);
    };

    updateClock();
    const clockTimer = setInterval(updateClock, 1000);

    return () => {
      clearInterval(clockTimer);
    };
  }, []);

  const homeNavItems = [
    { id: 'overview', label: '[1:overview]' },
    { id: 'experience', label: '[2:experience]' },
    { id: 'architecture', label: '[3:architecture]' },
    { id: 'skills', label: '[4:skills]' },
    { id: 'github', label: '[5:github]' },
    { id: 'contact', label: '[6:contact]' }
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="navbar-wrapper">
      <nav className="navbar" id="navbar">
        <a 
          href="#hero" 
          className="nav-brand" 
          aria-label="Ruchir Gupta Workstation"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <span className="brand-monogram">RG</span>
          <span className="brand-title">
            ruchir@arch-server
            <span>:~</span>
          </span>
        </a>

        {/* Polybar Workspaces */}
        <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`} id="nav-links">
          {homeNavItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href={SYSTEM_INFO.mediumUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link text-cyan"
            title="Open Medium Profile in new tab"
            onClick={() => setMobileMenuOpen(false)}
          >
            [medium]
          </a>
          <a
            href={SYSTEM_INFO.vscoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link text-cyan"
            title="Open VSCO Profile in new tab"
            onClick={() => setMobileMenuOpen(false)}
          >
            [vsco]
          </a>
        </div>

        {/* Telemetry & Action Cluster */}
        <div className="nav-actions">
          <span className="poly-telemetry">
            <span className={`status-dot ${isOnline ? '' : 'dot-offline'}`}></span>
            <span id="poly-net" className={isOnline ? 'text-green' : 'text-red'}>
              {isOnline ? 'NET: ONLINE' : 'NET: OFFLINE'}
            </span>
            <span id="poly-clock">{time}</span>
          </span>

          {/* Terminal Launcher */}
          <button
            className="nav-pill-btn"
            id="open-terminal-btn"
            title="Open Terminal (~ or Cmd+K)"
            onClick={onOpenTerminal}
          >
            <span>$ zsh</span>
            <kbd className="kbd-subtle">~</kbd>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className={`mobile-toggle ${mobileMenuOpen ? 'active' : ''}`}
            id="mobile-toggle"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </header>
  );
};
