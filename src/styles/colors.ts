export const colors = {
  // Primary Brand Color
  orange: '#ed7c31',
  orangeHover: '#d96a20',
  
  // Core Colors
  white: '#ffffff',
  black: '#000000',
  
  // Portal Grays (from No.1 Portal screenshot)
  grayDark: '#1f2937',    // Dark sidebar/backgrounds
  grayMedium: '#374151',  // Medium cards/containers
  
} as const;

// Type for color keys
export type ColorKey = keyof typeof colors;