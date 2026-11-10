import React from 'react';
import { EXPERIENCES } from '../data/portfolioData';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="section-padding">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-eyebrow">[ CAREER MILESTONES ]</span>
          <h2 className="section-title">Professional Experience</h2>
          <p className="section-subtitle">Verified production engineering history across enterprise product pipelines.</p>
        </div>

        <div className="experience-stack">
          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="experience-card linux-window tilt-card">
              <div className="window-titlebar">
                <div className="window-controls">
                  <span className="win-dot dot-red"></span>
                  <span className="win-dot dot-yellow"></span>
                  <span className="win-dot dot-green"></span>
                </div>
                <span className="window-path">
                  {exp.path.split('/').slice(0, -1).join('/')}/<span>{exp.path.split('/').pop()}</span>
                </span>
                <span className="window-meta">{exp.pid}</span>
              </div>
              <div className="window-body">
                <div className="exp-header-row">
                  <div>
                    {exp.isActive && <span className="exp-pill-current">Active Role</span>}
                    <h3 className="exp-title">{exp.title}</h3>
                    <h4 className="exp-company">{exp.company}</h4>
                  </div>
                  <div className="exp-timeframe">
                    <span>{exp.timeframe}</span>
                  </div>
                </div>

                <p className="exp-lead">{exp.lead}</p>

                <div className="exp-highlights-list">
                  {exp.highlights.map((highlight, idx) => (
                    <div key={idx} className="highlight-item">
                      <span className="highlight-dot">&gt;</span>
                      <div className="highlight-text">
                        <strong>{highlight.title} </strong>
                        <span dangerouslySetInnerHTML={{ __html: highlight.text }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="exp-tags-row">
                  {exp.tags.map((tag, idx) => (
                    <span key={idx}>{tag}</span>
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
