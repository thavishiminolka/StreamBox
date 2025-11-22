export const DARK_COLORS = {
  primary: "#4ADE80",
  secondary: "#2DD4BF",
  background: "#000000",
  surface: "#FFFFFF",
  surfaceLight: "#2A2A2A",
  white: "#FFFFFF",
  grey: "#9CA3AF",
  cardBackground: "#1F1F1F",
  text: "#FFFFFF",
  textSecondary: "#9CA3AF",
} as const;

export const LIGHT_COLORS = {
  primary: "#10B981",
  secondary: "#14B8A6",
  background: "#FFFFFF",
  surface: "#000000",
  surfaceLight: "#F3F4F6",
  white: "#000000",
  grey: "#6B7280",
  cardBackground: "#FFFFFF",
  text: "#000000",
  textSecondary: "#6B7280",
} as const;

// Default export for backward compatibility
export const COLORS = DARK_COLORS;
