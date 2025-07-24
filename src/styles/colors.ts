export const colors = {
  // Primary Brand Colors (inspired by your icon)
  primary: '#ed7c31',        // Main orange
  primaryHover: '#d96a20',   // Darker orange for hover
  primaryLight: '#f59e6b',   // Lighter orange for accents
  secondary: '#8b4513',      // Deep brown from your gradient
  accent: '#fbbf24',         // Golden accent for highlights
  
  // Neutral Palette
  white: '#ffffff',
  black: '#000000',
  
  // Sophisticated Grays
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  
  // Dark Theme Colors
  dark: {
    bg: '#0f172a',           // Main background
    surface: '#1e293b',      // Cards/containers
    surfaceHover: '#334155', // Hover states
    border: '#475569',       // Borders
    text: '#f1f5f9',         // Primary text
    textMuted: '#94a3b8',    // Secondary text
  },
  
  // Status Colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  
  // Legacy support (will be removed)
  orange: '#ed7c31',
  orangeHover: '#d96a20',
  grayDark: '#1e293b',
  grayMedium: '#334155',
  
} as const;

// Type for color keys
export type ColorKey = keyof typeof colors;