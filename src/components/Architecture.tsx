import React from 'react';
import { ARCHITECTURE_SHOWCASE } from '../data/portfolioData';

export const Architecture: React.FC = () => {
  return (
    <section id="architecture" className="section-padding">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-eyebrow">[ PRODUCTION SHOWCASE ]</span>
          <h2 className="section-title">Architectural Innovations</h2>
          <p className="section-subtitle">Selected production systems engineered for high scale, concurrency, and intelligence.</p>
        </div>

        <div className="architecture-grid">
          {ARCHITECTURE_SHOWCASE.map((item) => (
            <div key={item.id} className="arch-card linux-window tilt-card">
              <div className="window-titlebar">
                <div className="window-controls">
                  <span className="win-dot dot-red"></span>
                  <span className="win-dot dot-yellow"></span>
                  <span className="win-dot dot-green"></span>
                </div>
                <span className="window-path">
                  {item.path.split('/').slice(0, -1).join('/')}/<span>{item.path.split('/').pop()}</span>
                </span>
                <span className="window-meta">{item.meta}</span>
              </div>
              <div className="window-body">
                <span className="arch-category">{item.category}</span>
                <h3 className="arch-title">{item.title}</h3>
                <p className="arch-desc">{item.description}</p>
                <div className="arch-metrics-box">
                  {item.metrics.map((metric, idx) => (
                    <div key={idx} className="arch-metric">
                      <span className="metric-val">{metric.val}</span>
                      <span className="metric-lbl">{metric.lbl}</span>
                    </div>
                  ))}
                </div>
                <div className="arch-tech-list">
                  {item.tech.map((tech, idx) => (
                    <span key={idx}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
