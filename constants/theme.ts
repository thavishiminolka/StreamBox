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
  tabBarBackground: "#0b0b0b",
  chipTextColor: "#000000",
  avatarTextColor: "#000000",
} as const;

export const LIGHT_COLORS = {
  primary: "#047857",
  secondary: "#14B8A6",
  background: "#b3b3b3ff",
  surface: "#000000",
  surfaceLight: "#938e8eff",
  white: "#000000",
  grey: "#6B7280",
  cardBackground: "#afaaaaff",
  text: "#000000",
  textSecondary: "#29292aff",
  tabBarBackground: "#afaaaaff",
  chipTextColor: "#000000",
  avatarTextColor: "#000000",
} as const;

// Default export for backward compatibility
export const COLORS = DARK_COLORS;
