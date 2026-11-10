import React from 'react';
import { SYSTEM_INFO } from '../data/portfolioData';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="section-padding">
      <div className="container">
        <div className="contact-keynote-card linux-window tilt-card">
          <div className="window-titlebar">
            <div className="window-controls">
              <span className="win-dot dot-red"></span>
              <span className="win-dot dot-yellow"></span>
              <span className="win-dot dot-green"></span>
            </div>
            <span className="window-path">~/net/<span>connect_sockets.sh</span></span>
            <span className="window-meta">PORT: 443 &bull; ESTABLISHED</span>
          </div>

          <div className="contact-grid">
            <div className="contact-info">
              <span className="section-eyebrow">[ INITIATE SOCKET HANDSHAKE ]</span>
              <h2 className="contact-headline">Let's build something extraordinary.</h2>
              <p className="contact-body">
                Open to senior engineering roles, distributed architecture consulting, and high-impact AI initiatives. Whether you have an engineering challenge or an exciting team opportunity, my inbox is always listening.
              </p>

              <div className="contact-links-list">
                <a
                  href={SYSTEM_INFO.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link-item"
                >
                  <div className="link-icon">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="link-title">linkedin.com/in/rchrx</div>
                    <div className="link-url">Professional Network</div>
                  </div>
                </a>

                <a
                  href={SYSTEM_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link-item"
                >
                  <div className="link-icon">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="link-title">github.com/rchrx</div>
                    <div className="link-url">Open Source Repositories</div>
                  </div>
                </a>

                <a
                  href={SYSTEM_INFO.resumeFile}
                  download="RuchirGupta-SoftwareEngineer.pdf"
                  className="contact-link-item"
                >
                  <div className="link-icon">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </div>
                  <div>
                    <div className="link-title">RuchirGupta-SoftwareEngineer.pdf</div>
                    <div className="link-url">Download PDF Resume</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="contact-actions-panel">
              <span className="status-indicator-clean">
                <span className="status-dot"></span>
                <span>STATUS: AVAILABLE_FOR_ROLES</span>
              </span>

              <h3 className="action-card-title">Production Ready.</h3>
              <p className="action-card-sub">Immediate access to verified metrics, system designs, and distributed infrastructure references.</p>

              <div className="action-buttons-group">
                <a
                  href={SYSTEM_INFO.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="term-btn-primary full-width"
                >
                  <span>./connect_linkedin.sh</span>
                </a>

                <a
                  href={SYSTEM_INFO.resumeFile}
                  download="RuchirGupta-SoftwareEngineer.pdf"
                  className="term-btn-secondary full-width"
                >
                  <span>$ wget RuchirGupta.pdf</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
