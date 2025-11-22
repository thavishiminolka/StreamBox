// styles/auth.styles.ts
import { useTheme } from "@/contexts/ThemeContext";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const useAuthStyles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContainer: {
      flexGrow: 1,
      paddingHorizontal: 24,
      paddingBottom: 40,
    },
    brandSection: {
      alignItems: "center",
      marginTop: 56,
      marginBottom: 24,
    },
    logoContainer: {
      width: 60,
      height: 60,
      borderRadius: 18,
      backgroundColor: "rgba(74, 222, 128, 0.15)",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
    },
    appName: {
      fontSize: 42,
      fontWeight: "700",
      fontFamily: "JetBrainsMono-Medium",
      color: colors.primary,
      letterSpacing: 0.5,
      marginBottom: 8,
    },
    tagline: {
      fontSize: 15,
      color: colors.grey,
      letterSpacing: 1,
      textTransform: "none",
    },
    illustrationContainer: {
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 24,
      marginBottom: 32,
    },
    illustration: {
      width: width * 0.75,
      height: width * 0.75,
      maxHeight: 280,
    },
    loginSection: {
      alignItems: "center",
      width: "100%",
      marginTop: 8,
    },
    googleButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.white,
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 14,
      marginBottom: 0,
      width: "100%",
      maxWidth: 300,
      borderWidth: 1,
      borderColor: "#e5e7eb",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 5,
    },
    googleIconContainer: {
      width: 24,
      height: 24,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    googleButtonText: {
      fontSize: 16,
      fontWeight: "600",
      color: "#1A1A1A",
    },
    termsText: {
      textAlign: "center",
      fontSize: 12,
      color: colors.grey,
      maxWidth: 280,
    },
    formContainer: {
      width: "100%",
      maxWidth: 320,
      gap: 12,
      marginTop: 8,
    },
    inputLabel: {
      fontSize: 13,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 4,
    },
    input: {
      backgroundColor: colors.cardBackground,
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: 14,
      fontSize: 14,
      color: colors.text,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    errorText: {
      color: "#ff5252",
      fontSize: 12,
      marginTop: 4,
      marginLeft: 4,
    },
    primaryButton: {
      backgroundColor: colors.primary,
      paddingVertical: 16,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 4,
    },
    primaryButtonDisabled: {
      opacity: 0.5,
    },
    primaryButtonText: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.chipTextColor,
    },
    linkRow: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 16,
    },
    linkText: {
      color: colors.primary,
      fontWeight: "600",
      marginLeft: 4,
    },
    codeInput: {
      letterSpacing: 8,
      textAlign: "center",
    },
    dividerText: {
      fontSize: 12,
      color: colors.grey,
      textAlign: "center",
      marginVertical: 12,
    },
    verifyWrapper: {
      flex: 1,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 24,
    },
    verifyBrandAdjust: {
      marginTop: 32,
      marginBottom: 16,
    },
    verifyFormContainer: {
      width: "100%",
      maxWidth: 320,
      gap: 14,
    },
  });
};
