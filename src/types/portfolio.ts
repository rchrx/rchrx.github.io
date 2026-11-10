export interface BentoCard {
  id: string;
  tag: string;
  title: string;
  description: string;
  path: string;
  meta: string;
  span2?: boolean;
  pills: string[];
}

export interface HighlightItem {
  title: string;
  text: string;
}

export interface ExperienceItem {
  id: string;
  path: string;
  pid: string;
  isActive?: boolean;
  title: string;
  company: string;
  timeframe: string;
  lead: string;
  highlights: HighlightItem[];
  tags: string[];
}

export interface ArchitectureItem {
  id: string;
  path: string;
  meta: string;
  category: string;
  title: string;
  description: string;
  metrics: {
    val: string;
    lbl: string;
  }[];
  tech: string[];
}

export interface SkillItem {
  name: string;
  category: 'backend' | 'ai' | 'frontend' | 'devops';
  badge: 'Advanced' | 'Production' | 'Proficient';
  level: number; // percentage 0-100
  experience: string;
}

export interface TerminalCommandOutput {
  id: string;
  cmd?: string;
  content: string; // HTML string or plain text
  isPrompt?: boolean;
}

export interface MediumArticle {
  id: string;
  title: string;
  filename: string;
  excerpt: string;
  url: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  thumbnail?: string;
  author?: string;
}
