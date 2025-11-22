import { COLORS } from "@/constants/theme";
import { homeStyles } from "@/styles/home.styles";
import { useAuth, useUser } from "@clerk/clerk-expo";
import React from "react";
import { Text, View } from "react-native";

export default function Profile() {
  const { user } = useUser();
  const { signOut } = useAuth();

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
        <View
          style={{ backgroundColor: "#111", padding: 16, borderRadius: 16 }}
        >
          <Text
            style={{
              color: COLORS.surface,
              fontWeight: "600",
              marginBottom: 4,
            }}
          >
            Email
          </Text>
          <Text style={{ color: COLORS.grey }}>
            {user?.primaryEmailAddress?.emailAddress || "N/A"}
          </Text>
        </View>
        <View
          style={{ backgroundColor: "#111", padding: 16, borderRadius: 16 }}
        >
          <Text
            style={{
              color: COLORS.surface,
              fontWeight: "600",
              marginBottom: 4,
            }}
          >
            Username
          </Text>
          <Text style={{ color: COLORS.grey }}>{displayName}</Text>
        </View>
        <Text
          onPress={() => signOut()}
          style={{
            color: COLORS.primary,
            fontWeight: "700",
            textAlign: "center",
            marginTop: 20,
          }}
        >
          Sign Out
        </Text>
      </View>
    </View>
  );
}
