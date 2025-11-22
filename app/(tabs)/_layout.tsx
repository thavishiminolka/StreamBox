import { useTheme } from "@/contexts/ThemeContext";
import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.grey,
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontSize: 11, marginBottom: 2 },
        tabBarStyle: {
          backgroundColor: colors.tabBarBackground,
          borderTopWidth: 0,
          height: 56,
          paddingBottom: 6,
        },
        tabBarIcon: ({ color, size }) => {
          let icon: keyof typeof Feather.glyphMap = "home";
          if (route.name === "home") icon = "home";
          else if (route.name === "favorites") icon = "heart";
          else if (route.name === "profile") icon = "user";
          return <Feather name={icon} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="favorites" options={{ title: "Favorites" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
