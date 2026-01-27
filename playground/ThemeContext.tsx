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

// Travers preset - profesjonell, moderne look
export const traversPreset: ThemeConfig = {
  primary: "51 53% 10%",
  primaryForeground: "84 20% 95%",
  secondary: "215 20% 95%",
  secondaryForeground: "0 0% 0%",
  accent: "60 33% 94%",
  accentForeground: "0 0% 0%",

  background: "0 0% 100%",
  foreground: "222 47% 11%",
  card: "0 0% 100%",
  cardForeground: "222 47% 11%",
  popover: "0 0% 100%",
  popoverForeground: "222 47% 11%",

  muted: "215 20% 95%",
  mutedForeground: "215 16% 47%",
  border: "42 18% 89%",
  input: "214 32% 91%",
  ring: "38 66% 23%",

  destructive: "0 100% 95%",
  destructiveForeground: "353 46% 14%",

  radius: "0.75rem",
};

// Travers Dark preset - varm, mørk variant
export const darkPreset: ThemeConfig = {
  primary: "45 60% 55%",
  primaryForeground: "40 10% 8%",
  secondary: "40 10% 18%",
  secondaryForeground: "45 20% 95%",
  accent: "38 50% 40%",
  accentForeground: "45 20% 95%",

  background: "40 10% 8%",
  foreground: "45 20% 95%",
  card: "40 10% 12%",
  cardForeground: "45 20% 95%",
  popover: "40 10% 12%",
  popoverForeground: "45 20% 95%",

  muted: "40 10% 18%",
  mutedForeground: "40 15% 55%",
  border: "40 15% 20%",
  input: "40 15% 20%",
  ring: "45 60% 55%",

  destructive: "0 70% 45%",
  destructiveForeground: "45 20% 95%",

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
