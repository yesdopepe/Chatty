import { Stack } from "expo-router";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useCallback } from "react";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as SecureStore from "expo-secure-store";
import { PaperProvider } from "react-native-paper";
import { useAuthStore } from "../store/auth";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const setToken = useAuthStore((state) => state.setToken);

  const initializeApp = useCallback(async () => {
    try {
      // Check for existing token on app launch
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        setToken(token);
      }
    } catch (error) {
      console.error("Error initializing app:", error);
    } finally {
      await SplashScreen.hideAsync();
    }
  }, [setToken]);

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  return (
    <GluestackUIProvider mode="light">
      <PaperProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(app)" />
        </Stack>
      </PaperProvider>
    </GluestackUIProvider>
  );
}
