// context/themeProvider.tsx
import React from "react";
import { useColorScheme } from "react-native";
import {DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider, type Theme,} from "@react-navigation/native";

const GOLD = "#FFD700";
const BLACK = "#000000";
const SILVER = "#C0C0C0";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const base = isDark ? DarkTheme : DefaultTheme;

  //  Theme includes fonts; by spreading base we keep fonts intact
  const navTheme: Theme = {
    ...base,
    colors: {
      ...base.colors,
      primary: GOLD,
      background: isDark ? "#000000" : "#FFFFFF",
      card: GOLD,
      text: BLACK,
      border: isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.2)",
      notification: SILVER,
    },
  };

  return <NavigationThemeProvider value={navTheme}>{children}</NavigationThemeProvider>;
}
