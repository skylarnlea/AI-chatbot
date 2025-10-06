export const colors = {
  // Primary Brand Colors (lime accents chosen)
  primary: '#84cc16',        // Lime 500 - main accent
  primaryHover: '#65a30d',   // Lime 600 - hover/darker
  primaryLight: '#bef264',   // Lime 300 - light accent
  secondary: '#0ea5e9',      // Cool blue for secondary accents
  accent: '#60a5fa',         // Light blue accent

  // Neutral Palette
  white: '#ffffff',
  black: '#000000',

  // Sophisticated Grays
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e6eef6',
    300: '#cddbe6',
    400: '#9fb0c2',
    500: '#6f8798',
    600: '#556a78',
    700: '#3b4a58',
    800: '#25343e',
    900: '#0f1a20',
  },

  // Dark Theme Colors
  dark: {
    bg: '#0f1a20',           // Main background (deep slate)
    surface: '#25343e',      // Cards/containers
    surfaceHover: '#3b4a58', // Hover states
    border: '#556a78',       // Borders
    text: '#f1f5f9',         // Primary text
    textMuted: '#9fb0c2',    // Secondary text
  },

  // Status Colors (greens/blues)
  success: '#10b981',       // keep nice green for success
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#0ea5e9',

  // Legacy support aliases (kept for backward compatibility)
  grayDark: '#25343e',
  grayMedium: '#3b4a58',

} as const;

// Type for color keys
export type ColorKey = keyof typeof colors;