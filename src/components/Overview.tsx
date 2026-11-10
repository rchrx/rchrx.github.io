import React from 'react';
import { BENTO_CARDS } from '../data/portfolioData';

export const Overview: React.FC = () => {
  return (
    <section id="overview" className="section-padding">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-eyebrow">[ SYSTEM ARCHITECTURE ]</span>
          <h2 className="section-title">Built with precision. Tested for scale.</h2>
          <p className="section-subtitle">
            Every system is engineered for massive concurrent throughput with zero compromise on reliability or telemetry observability.
          </p>
        </div>

        <div className="bento-grid">
          {BENTO_CARDS.map((card) => (
            <div
              key={card.id}
              className={`bento-card ${card.span2 ? 'bento-span-2' : ''} linux-window tilt-card`}
            >
              <div className="window-titlebar">
                <div className="window-controls">
                  <span className="win-dot dot-red"></span>
                  <span className="win-dot dot-yellow"></span>
                  <span className="win-dot dot-green"></span>
                </div>
                <span className="window-path">
                  {card.path.split('/').slice(0, -1).join('/')}/<span>{card.path.split('/').pop()}</span>
                </span>
                <span className="window-meta">{card.meta}</span>
              </div>
              <div className="bento-inner">
                <span className="bento-tag">{card.tag}</span>
                <h3 className="bento-title">{card.title}</h3>
                <p className="bento-description">{card.description}</p>
                <div className="bento-pills">
                  {card.pills.map((pill, i) => (
                    <span key={i}>{pill}</span>
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
