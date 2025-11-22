import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { store, useAppDispatch } from "@/store";
import { loadFavorites } from "@/store/moviesSlice";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import React, { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import InitialLayout from "./components/InitialLayout";

function Bootstrap() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("Loading favorites on app start");
    dispatch(loadFavorites());
  }, [dispatch]);
  return <InitialLayout />;
}

function ThemedApp() {
  const { colors } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Bootstrap />
    </SafeAreaView>
  );
}

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error("Missing publishable key.");
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <Provider store={store}>
        <ThemeProvider>
          <SafeAreaProvider>
            <ThemedApp />
          </SafeAreaProvider>
        </ThemeProvider>
      </Provider>
    </ClerkProvider>
  );
}
