// app/_layout.tsx
import { Stack, Redirect } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ThemeProvider from "@/context/themeProvider";
import "@/global.css";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function RootNav() {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return null;

  return (
    <GestureHandlerRootView className="flex-1 bg-black dark">
      <Stack screenOptions={{ headerShown: false }}>

        <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      {isLoggedIn ? (
        <Redirect href="/(authenticated)/memos" />
      ) : (
        <Redirect href="/(auth)/login" />
      )}
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <RootNav />
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
