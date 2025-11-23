import { useTheme } from "@/contexts/ThemeContext";
import { useDynamicStyles } from "@/hooks/useDynamicStyles";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Switch, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const { colors, toggleTheme, isDark } = useTheme();
  const homeStyles = useDynamicStyles();

  const deriveNameFromEmail = (email?: string | null) => {
    if (!email) return undefined;
    const local = email.split("@")[0];
    if (!local) return undefined;
    const parts = local.split(/[._-]+/).filter(Boolean);
    const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
    if (!parts.length) return cap(local);
    return parts.map(cap).join(" ");
  };
  const displayName =
    user?.firstName ||
    user?.username ||
    deriveNameFromEmail(user?.primaryEmailAddress?.emailAddress) ||
    "User";
  const avatarInitial = displayName.charAt(0).toUpperCase();

  return (
    <View style={homeStyles.container}>
      <View style={homeStyles.headerRow}>
        <View>
          <Text style={homeStyles.greeting}>Profile</Text>
        </View>
        <View style={homeStyles.avatar}>
          <Text style={homeStyles.avatarText}>{avatarInitial}</Text>
        </View>
      </View>

      <View style={{ marginTop: 24, gap: 16 }}>
        <TouchableOpacity
          style={{
            backgroundColor: colors.cardBackground,
            padding: 16,
            borderRadius: 16,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderWidth: 1,
            borderColor: colors.surfaceLight,
          }}
          onPress={toggleTheme}
          activeOpacity={0.7}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <Feather
              name={isDark ? "moon" : "sun"}
              size={20}
              color={colors.primary}
            />
            <View>
              <Text
                style={{
                  color: colors.text,
                  fontWeight: "600",
                  marginBottom: 2,
                }}
              >
                Theme
              </Text>
              <Text style={{ color: colors.textSecondary, fontSize: 12 }}>
                {isDark ? "Dark Mode" : "Light Mode"}
              </Text>
            </View>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: "#D1D5DB", true: colors.primary }}
            thumbColor="#FFFFFF"
          />
        </TouchableOpacity>

        <View
          style={{
            backgroundColor: colors.cardBackground,
            padding: 16,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: colors.surfaceLight,
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontWeight: "600",
              marginBottom: 4,
            }}
          >
            Email
          </Text>
          <Text style={{ color: colors.textSecondary }}>
            {user?.primaryEmailAddress?.emailAddress || "N/A"}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: colors.cardBackground,
            padding: 16,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: colors.surfaceLight,
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontWeight: "600",
              marginBottom: 4,
            }}
          >
            Username
          </Text>
          <Text style={{ color: colors.textSecondary }}>{displayName}</Text>
        </View>
        <TouchableOpacity
          onPress={() => signOut()}
          style={{
            backgroundColor: "#EF4444",
            paddingVertical: 14,
            paddingHorizontal: 24,
            borderRadius: 12,
            alignItems: "center",
            marginTop: 20,
          }}
          activeOpacity={0.8}
        >
          <Text
            style={{
              color: "#000000",
              fontWeight: "700",
              fontSize: 16,
            }}
          >
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
