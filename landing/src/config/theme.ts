// src/config/theme.ts
export const theme = {
  colors: {
    primary:       '#2563EB',   // blue-600  — buttons, links, active states
    primaryDark:   '#1D4ED8',   // blue-700  — hover states
    primaryLight:  '#DBEAFE',   // blue-100  — soft backgrounds
    accent:        '#F59E0B',   // amber-500 — highlights, badges, emergency
    accentDark:    '#D97706',   // amber-600
    surface:       '#FFFFFF',
    background:    '#F8FAFC',   // slate-50
    text:          '#0F172A',   // slate-900
    textSecondary: '#64748B',   // slate-500
    border:        '#E2E8F0',   // slate-200
    success:       '#10B981',   // emerald-500
    danger:        '#EF4444',   // red-500
    customerBrand: '#2563EB',   // customer CTA uses primary blue
    providerBrand: '#7C3AED',   // violet-600 for provider CTA
    // Botanical / domestic warm tokens from SMARTSERVE-THEME-AND-COLOR-SYSTEM.md
    ivoryBase:     '#FAF7F0',
    ivorySurface:  '#F2EDE1',
    forestGreen:   '#2F5233',
    warmInk:       '#1F2A1E',
    sageGreen:     '#7A9E6E',
    warmGold:      '#C9A15A',
  },
  fonts: {
    heading: "'Inter', system-ui, sans-serif",
    body:    "'Inter', system-ui, sans-serif",
    mono:    "'JetBrains Mono', monospace",
  },
  radius: {
    sm: '6px',
    md: '12px',
    lg: '20px',
    full: '9999px',
  },
} as const;
