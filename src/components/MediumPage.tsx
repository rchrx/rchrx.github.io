import React, { useState, useEffect } from 'react';
import { SYSTEM_INFO } from '../data/portfolioData';
import { MediumArticle } from '../types/portfolio';

interface MediumPageProps {
  onReturnToWorkstation: () => void;
}

export const MediumPage: React.FC<MediumPageProps> = ({ onReturnToWorkstation }) => {
  const [articles, setArticles] = useState<MediumArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMediumArticles = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@rchrx`
      );

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const data = await res.json();

      if (data.status === 'ok' && Array.isArray(data.items)) {
        interface FeedItem {
          guid: string;
          title: string;
          link: string;
          pubDate: string;
          description: string;
          categories?: string[];
          author?: string;
          thumbnail?: string;
        }

        const parsedArticles: MediumArticle[] = data.items.map((item: FeedItem, idx: number) => {
          // Strip HTML tags from description to generate a clean excerpt
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = item.description || '';
          const plainText = (tempDiv.textContent || tempDiv.innerText || '').trim();
          const excerpt = plainText.length > 200 ? plainText.slice(0, 197) + '...' : plainText;

          // Compute estimated reading time based on word count
          const words = plainText.split(/\s+/).filter(Boolean).length;
          const readMin = Math.max(1, Math.ceil(words / 200));

          const pubDateObj = new Date(item.pubDate);
          const dateStr = !isNaN(pubDateObj.getTime())
            ? pubDateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            : 'Recent';

          const slug = item.title
            ? item.title.toLowerCase().replace(/[^a-z0-9]+/g, '_').slice(0, 24) + '.md'
            : `article_${idx + 1}.md`;

          return {
            id: item.guid || `medium-${idx}`,
            title: item.title,
            filename: slug,
            excerpt: excerpt || 'Read the full story on Medium.',
            url: item.link,
            publishedAt: dateStr,
            readTime: `${readMin} min read`,
            tags: item.categories && item.categories.length > 0 ? item.categories : ['Medium'],
            author: item.author || 'Ruchir Gupta'
          };
        });

        // Only store articles that were returned from the feed
        setArticles(parsedArticles);
      } else {
        setArticles([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to connect to Medium feed');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMediumArticles();
  }, []);

  return (
    <div className="medium-page-view">
      <section className="medium-hero-section section-padding">
        <div className="container">

          {/* Breadcrumb Navigation & Status */}
          <div className="medium-nav-header">
            <button
              className="term-back-btn"
              onClick={onReturnToWorkstation}
              title="Return to main workstation"
            >
              <span>&larr; [return to workstation]</span>
            </button>

            <span className="medium-feed-status">
              <span className="status-dot"></span>
              <span>
                {loading
                  ? 'SYNCING MEDIUM RSS...'
                  : `ORIGIN: @rchrx • ${articles.length} POSTED`}
              </span>
            </span>
          </div>

          {/* CLI Prompt Line */}
          <div className="hero-prompt-line" style={{ marginTop: '24px' }}>
            <span className="usr">{SYSTEM_INFO.user}</span>
            <span className="at">@</span>
            <span className="host">{SYSTEM_INFO.host}</span>:
            <span className="path">~/publications</span>$ <span className="cmd">curl -s "https://medium.com/feed/@rchrx"</span>
          </div>

          {/* Headline */}
          <h1 className="hero-title">
            Medium Publications.<br />
            <span className="text-green">Articles posted by @rchrx.</span>
            <span className="cursor"></span>
          </h1>

          <p className="hero-description" style={{ maxWidth: '820px', marginBottom: '28px' }}>
            Live articles authored and published on Medium. Stories published on <a href={SYSTEM_INFO.mediumUrl} target="_blank" rel="noopener noreferrer" className="text-cyan">medium.com/@rchrx</a> are synchronized directly via the Medium RSS daemon.
          </p>

          {/* Meta Information Bar */}
          <div className="medium-meta-bar">
            <span>[POSTED ARTICLES: {articles.length}]</span>
            <span>FEED: MEDIUM.COM/FEED/@RCHRX</span>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="linux-window">
              <div className="window-titlebar">
                <div className="window-controls">
                  <span className="win-dot dot-red"></span>
                  <span className="win-dot dot-yellow"></span>
                  <span className="win-dot dot-green"></span>
                </div>
                <span className="window-path">~/daemons/<span>rss_fetcher.sh</span></span>
                <span className="window-meta">STATUS: POLLING</span>
              </div>
              <div className="window-body text-center" style={{ padding: '48px 24px' }}>
                <span className="text-cyan font-mono" style={{ fontSize: '0.95rem' }}>
                  [POLLING MEDIUM RSS FEED FOR @rchrx...]
                </span>
                <p className="text-secondary" style={{ marginTop: '8px', fontSize: '0.85rem' }}>
                  Connecting to api.rss2json.com &bull; querying stories
                </p>
              </div>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="linux-window" style={{ borderColor: 'var(--term-red)' }}>
              <div className="window-titlebar">
                <div className="window-controls">
                  <span className="win-dot dot-red"></span>
                  <span className="win-dot dot-yellow"></span>
                  <span className="win-dot dot-green"></span>
                </div>
                <span className="window-path">~/errors/<span>feed_timeout.err</span></span>
                <span className="window-meta">ERR_NETWORK</span>
              </div>
              <div className="window-body text-center" style={{ padding: '36px 20px' }}>
                <p className="text-red font-mono" style={{ marginBottom: '12px' }}>
                  {error}
                </p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button className="term-btn-primary" onClick={fetchMediumArticles}>
                    <span>$ retry_sync</span>
                  </button>
                  <a
                    href={SYSTEM_INFO.mediumUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="term-btn-secondary"
                  >
                    <span>./view_on_medium.sh</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Zero Published Stories State */}
          {!loading && !error && articles.length === 0 && (
            <div className="linux-window">
              <div className="window-titlebar">
                <div className="window-controls">
                  <span className="win-dot dot-red"></span>
                  <span className="win-dot dot-yellow"></span>
                  <span className="win-dot dot-green"></span>
                </div>
                <span className="window-path">~/medium/<span>feed_status.sh</span></span>
                <span className="window-meta">PID: 2048 &bull; SYNCED</span>
              </div>
              <div className="window-body text-center" style={{ padding: '56px 24px' }}>
                <div style={{ maxWidth: '640px', margin: '0 auto' }}>
                  <span className="text-amber font-mono" style={{ fontSize: '1rem', display: 'block', marginBottom: '10px' }}>
                    [ZERO ARTICLES POSTED YET ON @rchrx]
                  </span>
                  <p className="text-secondary" style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '24px' }}>
                    No published stories were found on <a href={SYSTEM_INFO.mediumUrl} target="_blank" rel="noopener noreferrer" className="text-cyan">medium.com/@rchrx</a>. Once you publish a story on Medium, it will automatically sync and be displayed right here.
                  </p>

                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button className="term-btn-primary" onClick={fetchMediumArticles}>
                      <span>$ refresh_feed</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Render User's Posted Articles */}
          {!loading && articles.length > 0 && (
            <div className="medium-articles-grid">
              {articles.map((article) => (
                <div key={article.id} className="medium-card linux-window tilt-card">
                  <div className="window-titlebar">
                    <div className="window-controls">
                      <span className="win-dot dot-red"></span>
                      <span className="win-dot dot-yellow"></span>
                      <span className="win-dot dot-green"></span>
                    </div>
                    <span className="window-path">
                      ~/medium/<span>{article.filename}</span>
                    </span>
                    <span className="window-meta">{article.readTime}</span>
                  </div>

                  <div className="window-body medium-card-body">
                    <div className="medium-card-meta-row">
                      <span className="medium-category-tag">MEDIUM STORY</span>
                      <span className="medium-date">{article.publishedAt}</span>
                    </div>

                    <h3 className="medium-card-title">
                      <a href={article.url} target="_blank" rel="noopener noreferrer">
                        {article.title}
                      </a>
                    </h3>

                    <p className="medium-card-excerpt">{article.excerpt}</p>

                    {article.tags && article.tags.length > 0 && (
                      <div className="medium-card-tags">
                        {article.tags.map((tag, idx) => (
                          <span key={idx} className="medium-tag-pill">{tag}</span>
                        ))}
                      </div>
                    )}

                    <div className="medium-card-footer">
                      <span className="text-secondary" style={{ fontSize: '0.75rem' }}>
                        By {article.author}
                      </span>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="medium-read-link"
                      >
                        <span>Read on Medium</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Medium Profile Direct Link Box */}
          <div className="medium-profile-box linux-window" style={{ marginTop: '48px' }}>
            <div className="window-titlebar">
              <div className="window-controls">
                <span className="win-dot dot-red"></span>
                <span className="win-dot dot-yellow"></span>
                <span className="win-dot dot-green"></span>
              </div>
              <span className="window-path">~/net/<span>medium_profile.sh</span></span>
              <span className="window-meta">HOST: MEDIUM.COM/@RCHRX</span>
            </div>
            <div className="window-body medium-profile-body">
              <div className="profile-text-cluster">
                <h3 className="medium-profile-title">Medium Profile &bull; @rchrx</h3>
                <p className="medium-profile-sub">
                  Visit the Medium profile directly to follow, read upcoming technical posts, and engage with articles.
                </p>
              </div>

              <div className="profile-cta-cluster">
                <a
                  href={SYSTEM_INFO.mediumUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="term-btn-primary"
                >
                  <span>./open_profile.sh</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
