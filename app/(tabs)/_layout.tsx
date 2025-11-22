import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.grey,
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontSize: 11, marginBottom: 2 },
        tabBarStyle: {
          backgroundColor: "#0b0b0b",
          borderTopWidth: 0,
          height: 56,
          paddingBottom: 6,
        },
        tabBarIcon: ({ color, size }) => {
          let icon: keyof typeof Ionicons.glyphMap = "home";
          if (route.name === "home") icon = "home";
          else if (route.name === "favorites") icon = "heart";
          else if (route.name === "profile") icon = "person";
          return <Ionicons name={icon} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="favorites" options={{ title: "Favorites" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
