import { COLORS } from "@/constants/theme";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 32; // padding adjustments

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  header: {
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.surface,
    letterSpacing: 0.5,
  },
  subGreeting: {
    fontSize: 13,
    color: COLORS.grey,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: COLORS.background,
    fontWeight: "700",
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 40,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  poster: {
    width: 90,
    height: 135,
    borderRadius: 10,
    backgroundColor: "#111",
  },
  cardBody: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.surface,
    marginBottom: 6,
  },
  overview: {
    fontSize: 12,
    lineHeight: 16,
    color: COLORS.grey,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    gap: 8,
  },
  chip: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
  },
  chipText: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.background,
    letterSpacing: 0.5,
  },
  statusUpcoming: {
    backgroundColor: "#6366F1",
  },
  statusPopular: {
    backgroundColor: "#F59E0B",
  },
  statusActive: {
    backgroundColor: "#10B981",
  },
  loadingText: {
    color: COLORS.grey,
    textAlign: "center",
    marginTop: 40,
  },
  errorText: {
    color: "#ef4444",
    textAlign: "center",
    marginTop: 40,
  },
  emptyText: {
    color: COLORS.grey,
    textAlign: "center",
    marginTop: 40,
  },
});
