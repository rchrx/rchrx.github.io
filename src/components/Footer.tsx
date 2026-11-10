import React, { useState, useEffect } from 'react';
import { THEME_PRESETS, applyTheme, getSavedTheme } from '../services/themeService';

export const Footer: React.FC = () => {
  const [currentHex, setCurrentHex] = useState<string>(() => getSavedTheme());

  useEffect(() => {
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ hex: string }>;
      if (customEvent.detail?.hex) {
        setCurrentHex(customEvent.detail.hex);
      }
    };
    window.addEventListener('term-theme-change', handleThemeChange);
    return () => window.removeEventListener('term-theme-change', handleThemeChange);
  }, []);

  const handleSelectTheme = (hex: string) => {
    applyTheme(hex);
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="apple-footer">
      <div className="container footer-content">
        <div className="footer-left">
          <span className="footer-name">ruchir@enterprise-arch</span>
          <span className="footer-role">Senior Software Engineer &bull; Accenture &bull; &copy; 2026</span>
        </div>

        <div className="footer-center">
          <div className="footer-theme-cluster" title="Change accent theme color">
            <span className="theme-cluster-label">accent:</span>
            <div className="theme-swatches">
              {THEME_PRESETS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`theme-swatch-dot ${currentHex.toLowerCase() === t.hex.toLowerCase() ? 'active' : ''}`}
                  style={{ backgroundColor: t.hex }}
                  title={`${t.name} (${t.hex})`}
                  onClick={() => handleSelectTheme(t.hex)}
                  aria-label={`Select ${t.name} accent`}
                />
              ))}
            </div>
            <label className="theme-custom-picker-label" title="Pick custom hex color">
              <input
                type="color"
                className="theme-color-input"
                value={currentHex}
                onChange={(e) => handleSelectTheme(e.target.value)}
                aria-label="Pick custom theme color"
              />
              <span className="theme-custom-icon" style={{ borderColor: currentHex, color: currentHex }}>#</span>
            </label>
          </div>
        </div>

        <div className="footer-right">
          <span className="footer-status-pill">
            <span className="status-dot"></span>
            <span>ALL DAEMONS OPERATIONAL</span>
          </span>
          <a
            href="#hero"
            className="return-top-link"
            title="Scroll to top"
            onClick={scrollToTop}
          >
            <span>[:top]</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
