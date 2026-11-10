import React from 'react';
import { SYSTEM_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenTerminal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal }) => {
  const scrollToExperience = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('experience');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero-section">
      <div className="container hero-container">
        <div className="hero-content">

          {/* CLI Command Line Prompt */}
          <div className="hero-prompt-line">
            <span className="usr">{SYSTEM_INFO.user}</span>
            <span className="at">@</span>
            <span className="host">{SYSTEM_INFO.host}</span>:
            <span className="path">~</span>$ <span className="cmd">./init_engineer.sh --profile=production</span>
          </div>

          {/* Display Headline */}
          <h1 className="hero-title">
            Engineered for scale.<br />
            <span className="text-green">Executed in kernel space.</span>
            <span className="cursor"></span>
          </h1>

          {/* Editorial Subheading */}
          <p className="hero-description">
            I am <strong className="text-white">Ruchir Gupta</strong>, Senior Software Engineer at <span className="text-cyan">{SYSTEM_INFO.company}</span> with <span className="text-green">{SYSTEM_INFO.uptime}</span>. Architecting high-throughput distributed microservices, low-latency WebSocket pipelines, and automated enterprise AI workflows.
          </p>

          {/* Hero Call-to-Action Group */}
          <div className="hero-cta-group">
            <a
              href="#experience"
              className="term-btn-primary"
              onClick={scrollToExperience}
            >
              <span>./view_experience.sh</span>
            </a>

            <button
              className="term-btn-secondary"
              id="hero-terminal-trigger"
              onClick={onOpenTerminal}
            >
              <span>$ open_terminal --cli</span>
            </button>

            <div className="social-cluster">
              <a
                href={SYSTEM_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                title="LinkedIn Socket"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href={SYSTEM_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                title="GitHub Repository"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Subtle 3D Interaction Hint */}
          <div className="interactive-hint">
            <span className="hint-dot"></span>
            <span>[3D MATRIX]: Drag in viewport to rotate holographic cyber tesseract</span>
          </div>

        </div>

        {/* Linux Neofetch System HUD Window */}
        <div className="hero-stats-panel linux-window neofetch-window tilt-card">
          <div className="window-titlebar">
            <div className="window-controls">
              <span className="win-dot dot-red"></span>
              <span className="win-dot dot-yellow"></span>
              <span className="win-dot dot-green"></span>
            </div>
            <span className="window-path">~/system/<span>neofetch.sh</span></span>
            <span className="window-meta">bash &bull; 80x24</span>
          </div>
          <div className="window-body neofetch-content">
            <div className="neofetch-header">
              <span className="brand-monogram">RG</span>
              <div>
                <div className="neofetch-title">{SYSTEM_INFO.user}@{SYSTEM_INFO.host}</div>
                <div className="neofetch-sub">{SYSTEM_INFO.company} &bull; Senior Software Engineer</div>
              </div>
            </div>
            <div className="neofetch-grid">
              <div className="spec-row">
                <span className="spec-label">OS:</span>
                <span className="spec-value">{SYSTEM_INFO.os}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Host:</span>
                <span className="spec-value">{SYSTEM_INFO.node}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Kernel:</span>
                <span className="spec-value">{SYSTEM_INFO.kernel}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Uptime:</span>
                <span className="spec-value text-green">{SYSTEM_INFO.uptime}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Concurrency:</span>
                <span className="spec-value text-cyan">{SYSTEM_INFO.concurrency}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">QA Overhead:</span>
                <span className="spec-value text-green">{SYSTEM_INFO.qaOverhead}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Response:</span>
                <span className="spec-value text-cyan">{SYSTEM_INFO.response}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Stack:</span>
                <span className="spec-value">{SYSTEM_INFO.stack}</span>
              </div>
            </div>
            <div className="color-blocks">
              <span className="c-block b-black"></span>
              <span className="c-block b-red"></span>
              <span className="c-block b-green"></span>
              <span className="c-block b-yellow"></span>
              <span className="c-block b-blue"></span>
              <span className="c-block b-magenta"></span>
              <span className="c-block b-cyan"></span>
              <span className="c-block b-white"></span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
