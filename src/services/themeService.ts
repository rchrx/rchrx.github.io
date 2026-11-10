export interface ThemePreset {
  id: string;
  name: string;
  hex: string;
  rgb: [number, number, number];
}

export const THEME_PRESETS: ThemePreset[] = [
  { id: 'matrix', name: 'Matrix Green', hex: '#00ff66', rgb: [0, 255, 102] },
  { id: 'cyan', name: 'Cyber Cyan', hex: '#00f0ff', rgb: [0, 240, 255] },
  { id: 'amber', name: 'Amber CRT', hex: '#ffb454', rgb: [255, 180, 84] },
  { id: 'purple', name: 'Neon Purple', hex: '#bd93f9', rgb: [189, 147, 249] },
  { id: 'orange', name: 'Hacker Orange', hex: '#ff6b35', rgb: [255, 107, 53] },
  { id: 'crimson', name: 'Crimson Red', hex: '#ff3366', rgb: [255, 51, 102] }
];

export const STORAGE_KEY = 'rg_theme_accent';

export function hexToRgb(hex: string): [number, number, number] | null {
  const clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    return [r, g, b];
  }
  if (clean.length === 6) {
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
      return [r, g, b];
    }
  }
  return null;
}

export function getSavedTheme(): string {
  if (typeof window === 'undefined') return '#00ff66';
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && hexToRgb(saved)) {
      return saved;
    }
  } catch {
    // localStorage may be unavailable or restricted
  }
  return '#00ff66';
}

export function applyTheme(hexInput: string): { success: boolean; name: string; hex: string } {
  let hex = hexInput.trim();
  if (!hex.startsWith('#')) {
    const preset = THEME_PRESETS.find(
      (p) => p.id.toLowerCase() === hex.toLowerCase() || p.name.toLowerCase().includes(hex.toLowerCase())
    );
    if (preset) {
      hex = preset.hex;
    } else {
      hex = `#${hex}`;
    }
  }

  const rgb = hexToRgb(hex);
  if (!rgb) {
    return { success: false, name: '', hex: '' };
  }

  // Format standard 6-digit hex
  const hex6 = `#${rgb[0].toString(16).padStart(2, '0')}${rgb[1].toString(16).padStart(2, '0')}${rgb[2].toString(16).padStart(2, '0')}`;

  const matchingPreset = THEME_PRESETS.find(
    (p) => p.hex.toLowerCase() === hex6.toLowerCase()
  );
  const name = matchingPreset ? matchingPreset.name : `Custom (${hex6})`;

  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    root.style.setProperty('--term-green', hex6);
    root.style.setProperty('--term-accent-rgb', `${rgb[0]}, ${rgb[1]}, ${rgb[2]}`);
    root.style.setProperty('--term-green-dim', `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.15)`);
    root.style.setProperty('--term-green-glow', `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.4)`);
    root.style.setProperty('--border-term', `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.22)`);
    root.style.setProperty('--border-hover', `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.6)`);
    root.style.setProperty('--win-shadow-hover', `0 16px 50px -8px rgba(0, 0, 0, 0.98), 0 0 24px -2px rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.2)`);
  }

  try {
    localStorage.setItem(STORAGE_KEY, hex6);
  } catch {
    // localStorage restricted
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('term-theme-change', {
        detail: { hex: hex6, rgb, name }
      })
    );
  }

  return { success: true, name, hex: hex6 };
}

export function initTheme(): void {
  const saved = getSavedTheme();
  applyTheme(saved);
}
