import React, { useState, useEffect } from 'react';
import { SYSTEM_INFO } from '../data/portfolioData';
import { getSavedTheme } from '../services/themeService';

export const GithubGraph: React.FC = () => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [themeHex, setThemeHex] = useState<string>(() => getSavedTheme());

  useEffect(() => {
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ hex: string }>;
      if (customEvent.detail?.hex) {
        setThemeHex(customEvent.detail.hex);
      }
    };
    window.addEventListener('term-theme-change', handleThemeChange);
    return () => window.removeEventListener('term-theme-change', handleThemeChange);
  }, []);

  const cleanHex = themeHex.replace('#', '') || '00ff66';

  return (
    <section id="github" className="section-padding github-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-eyebrow">[ OPEN SOURCE TELEMETRY ]</span>
          <h2 className="section-title">GitHub Activity Matrix</h2>
          <p className="section-subtitle">
            Continuous delivery pipeline, open source telemetry, and code frequency metrics tracked live.
          </p>
        </div>

        <div className="linux-window github-window tilt-card">
          {/* Window Titlebar */}
          <div className="window-titlebar">
            <div className="window-controls">
              <span className="win-dot dot-red"></span>
              <span className="win-dot dot-yellow"></span>
              <span className="win-dot dot-green"></span>
            </div>
            <span className="window-path">
              ~/telemetry/<span>github_activity.sh</span>
            </span>
            <span className="window-meta">PID: 4096 &bull; GIT DAEMON</span>
          </div>

          <div className="window-body github-body">
            {/* CLI Prompt Header */}
            <div className="github-prompt-header">
              <div className="github-prompt-text">
                <span className="text-green">{SYSTEM_INFO.user}@{SYSTEM_INFO.host}</span>:
                <span className="text-amber">~/git</span>$ <span className="text-white">git log --graph --contributions=year</span>
              </div>
              <span className="github-sync-pill">
                <span className="status-dot"></span>
                <span>ORIGIN: GITHUB/RCHRX</span>
              </span>
            </div>

            {/* Telemetry Metric Cards */}
            <div className="github-telemetry-metrics">
              <div className="github-metric-card">
                <span className="github-metric-val">@rchrx</span>
                <span className="github-metric-lbl">Target Handle</span>
              </div>
              <div className="github-metric-card">
                <span className="github-metric-val text-green">Production Main</span>
                <span className="github-metric-lbl">Primary Branch</span>
              </div>
              <div className="github-metric-card">
                <span className="github-metric-val text-cyan">GitHub Actions</span>
                <span className="github-metric-lbl">CI/CD Automation</span>
              </div>
              <div className="github-metric-card">
                <span className="github-metric-val text-amber">Active Sync</span>
                <span className="github-metric-lbl">Repository Daemon</span>
              </div>
            </div>

            {/* Dynamic GitHub Contribution Graph */}
            <div className="github-chart-container">
              <div className="github-chart-wrapper">
                {!imgError ? (
                  <img
                    key={cleanHex}
                    src={`https://ghchart.rshah.org/${cleanHex}/rchrx`}
                    alt="Ruchir Gupta's (@rchrx) GitHub Contribution Chart"
                    className="github-chart-img"
                    onLoad={() => setImgLoaded(true)}
                    onError={() => setImgError(true)}
                    style={{ opacity: imgLoaded ? 1 : 0.6, transition: 'opacity 0.4s ease' }}
                  />
                ) : (
                  // Fallback Mock Contribution Grid if network or image service is blocked
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(52, 1fr)',
                      gap: '3px',
                      padding: '16px 0',
                      width: '100%',
                      maxWidth: '860px'
                    }}
                  >
                    {Array.from({ length: 52 * 7 }).map((_, i) => {
                      const rand = Math.sin(i * 12.3) * 0.5 + 0.5;
                      const bg =
                        rand > 0.8
                          ? 'var(--term-green)'
                          : rand > 0.6
                          ? 'rgba(var(--term-accent-rgb), 0.6)'
                          : rand > 0.4
                          ? 'rgba(var(--term-accent-rgb), 0.3)'
                          : '#12161f';
                      return (
                        <div
                          key={i}
                          style={{
                            width: '100%',
                            paddingBottom: '100%',
                            background: bg,
                            borderRadius: '2px'
                          }}
                        />
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Chart Legend */}
              <div className="github-chart-legend">
                <span>Less</span>
                <div className="legend-cells">
                  <span className="legend-cell" style={{ background: '#12161f' }}></span>
                  <span className="legend-cell" style={{ background: 'rgba(var(--term-accent-rgb), 0.25)' }}></span>
                  <span className="legend-cell" style={{ background: 'rgba(var(--term-accent-rgb), 0.5)' }}></span>
                  <span className="legend-cell" style={{ background: 'rgba(var(--term-accent-rgb), 0.75)' }}></span>
                  <span className="legend-cell" style={{ background: 'var(--term-green)' }}></span>
                </div>
                <span>More</span>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="github-actions-row">
              <div className="github-btn-cluster">
                <a
                  href={SYSTEM_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="term-btn-primary"
                >
                  <span>./view_github_profile.sh</span>
                </a>
              </div>

              <div className="titlebar-hint">
                <span>Telemetries synced directly from GitHub API</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
