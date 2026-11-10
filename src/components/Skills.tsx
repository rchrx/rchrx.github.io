import React, { useState } from 'react';
import { SKILLS_DATA } from '../data/portfolioData';

type FilterType = 'all' | 'backend' | 'ai' | 'frontend' | 'devops';

export const Skills: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('all');

  const filters: { id: FilterType; label: string }[] = [
    { id: 'all', label: '[all]' },
    { id: 'backend', label: '[backend]' },
    { id: 'ai', label: '[ai/llm]' },
    { id: 'frontend', label: '[frontend]' },
    { id: 'devops', label: '[cloud/devops]' }
  ];

  const handleFilterClick = (newFilter: FilterType) => {
    setFilter(newFilter);
  };

  const visibleSkills = SKILLS_DATA.filter((skill) => {
    if (filter === 'all') return true;
    return skill.category === filter;
  });

  return (
    <section id="skills" className="section-padding">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-eyebrow">[ PROFICIENCY MATRIX ]</span>
          <h2 className="section-title">Technical Capabilities</h2>
          <p className="section-subtitle">Core technologies and frameworks mastered across 5+ years of production engineering.</p>
        </div>

        {/* Filter Tabs */}
        <div className="filter-pills-bar">
          {filters.map((f) => (
            <button
              key={f.id}
              className={`filter-pill ${filter === f.id ? 'active' : ''}`}
              onClick={() => handleFilterClick(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="skills-clean-grid" id="skills-grid">
          {visibleSkills.map((skill) => (
            <div
              key={skill.name}
              className="skill-tile"
              data-category={skill.category}
              style={{
                animation: 'fadeScaleIn 0.3s ease-out forwards'
              }}
            >
              <div className="skill-head">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-badge">{skill.badge}</span>
              </div>
              <div className="skill-meter">
                <span style={{ width: `${skill.level}%` }}></span>
              </div>
              <div className="skill-experience">{skill.experience}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
