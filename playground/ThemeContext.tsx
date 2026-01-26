import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface ThemeConfig {
  // Brand colors
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;

  // Backgrounds
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;

  // UI colors
  muted: string;
  mutedForeground: string;
  border: string;
  input: string;
  ring: string;

  // Semantic colors
  destructive: string;
  destructiveForeground: string;

  // Shape
  radius: string;
}

const defaultTheme: ThemeConfig = {
  // Travers-inspirert fargepalett
  primary: "221 83% 53%",
  primaryForeground: "210 40% 98%",
  secondary: "210 40% 96%",
  secondaryForeground: "222 47% 11%",
  accent: "210 40% 96%",
  accentForeground: "222 47% 11%",

  background: "0 0% 100%",
  foreground: "222 47% 11%",
  card: "0 0% 100%",
  cardForeground: "222 47% 11%",
  popover: "0 0% 100%",
  popoverForeground: "222 47% 11%",

  muted: "210 40% 96%",
  mutedForeground: "215 16% 47%",
  border: "214 32% 91%",
  input: "214 32% 91%",
  ring: "221 83% 53%",

  destructive: "0 84% 60%",
  destructiveForeground: "210 40% 98%",

  radius: "0.5rem",
};

// Travers preset - profesjonell, moderne look
export const traversPreset: ThemeConfig = {
  primary: "217 91% 60%",
  primaryForeground: "210 40% 98%",
  secondary: "215 20% 95%",
  secondaryForeground: "222 47% 11%",
  accent: "262 83% 58%",
  accentForeground: "210 40% 98%",

  background: "0 0% 100%",
  foreground: "222 47% 11%",
  card: "0 0% 100%",
  cardForeground: "222 47% 11%",
  popover: "0 0% 100%",
  popoverForeground: "222 47% 11%",

  muted: "215 20% 95%",
  mutedForeground: "215 16% 47%",
  border: "214 32% 91%",
  input: "214 32% 91%",
  ring: "217 91% 60%",

  destructive: "0 84% 60%",
  destructiveForeground: "210 40% 98%",

  radius: "0.75rem",
};

// Moderne mørk preset
export const darkPreset: ThemeConfig = {
  primary: "217 91% 60%",
  primaryForeground: "222 47% 11%",
  secondary: "217 33% 17%",
  secondaryForeground: "210 40% 98%",
  accent: "262 83% 58%",
  accentForeground: "210 40% 98%",

  background: "222 47% 11%",
  foreground: "210 40% 98%",
  card: "217 33% 17%",
  cardForeground: "210 40% 98%",
  popover: "217 33% 17%",
  popoverForeground: "210 40% 98%",

  muted: "217 33% 17%",
  mutedForeground: "215 20% 65%",
  border: "217 33% 25%",
  input: "217 33% 25%",
  ring: "217 91% 60%",

  destructive: "0 62% 50%",
  destructiveForeground: "210 40% 98%",

  radius: "0.75rem",
};

interface ThemeContextType {
  theme: ThemeConfig;
  setTheme: (theme: ThemeConfig) => void;
  updateThemeValue: <K extends keyof ThemeConfig>(key: K, value: ThemeConfig[K]) => void;
  applyPreset: (preset: ThemeConfig) => void;
  exportTheme: () => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function hslToCSS(key: string, value: string): string {
  return `--${key}: ${value};`;
}

function themeToCSS(theme: ThemeConfig): string {
  const mappings: Record<keyof ThemeConfig, string> = {
    primary: "primary",
    primaryForeground: "primary-foreground",
    secondary: "secondary",
    secondaryForeground: "secondary-foreground",
    accent: "accent",
    accentForeground: "accent-foreground",
    background: "background",
    foreground: "foreground",
    card: "card",
    cardForeground: "card-foreground",
    popover: "popover",
    popoverForeground: "popover-foreground",
    muted: "muted",
    mutedForeground: "muted-foreground",
    border: "border",
    input: "input",
    ring: "ring",
    destructive: "destructive",
    destructiveForeground: "destructive-foreground",
    radius: "radius",
  };

  return Object.entries(theme)
    .map(([key, value]) => `  --${mappings[key as keyof ThemeConfig]}: ${value};`)
    .join("\n");
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeConfig>(traversPreset);

  useEffect(() => {
    const root = document.documentElement;

    const mappings: Record<keyof ThemeConfig, string> = {
      primary: "--primary",
      primaryForeground: "--primary-foreground",
      secondary: "--secondary",
      secondaryForeground: "--secondary-foreground",
      accent: "--accent",
      accentForeground: "--accent-foreground",
      background: "--background",
      foreground: "--foreground",
      card: "--card",
      cardForeground: "--card-foreground",
      popover: "--popover",
      popoverForeground: "--popover-foreground",
      muted: "--muted",
      mutedForeground: "--muted-foreground",
      border: "--border",
      input: "--input",
      ring: "--ring",
      destructive: "--destructive",
      destructiveForeground: "--destructive-foreground",
      radius: "--radius",
    };

    Object.entries(theme).forEach(([key, value]) => {
      root.style.setProperty(mappings[key as keyof ThemeConfig], value);
    });
  }, [theme]);

  const updateThemeValue = <K extends keyof ThemeConfig>(key: K, value: ThemeConfig[K]) => {
    setTheme((prev) => ({ ...prev, [key]: value }));
  };

  const applyPreset = (preset: ThemeConfig) => {
    setTheme(preset);
  };

  const exportTheme = () => {
    return `@layer base {
  :root {
${themeToCSS(theme)}
  }
}`;
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, updateThemeValue, applyPreset, exportTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
