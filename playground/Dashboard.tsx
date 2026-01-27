import React, { useState } from "react";
import { useTheme, traversPreset, darkPreset, ThemeConfig } from "./ThemeContext";
import { ColorPicker } from "./components/ColorPicker";
import { ComponentShowcase } from "./components/ComponentShowcase";
import { Copy, Check, Download, Palette, Eye, Sun, Moon } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Separator,
  Input,
  Label,
} from "@/components/ui";

export function Dashboard() {
  const { theme, updateThemeValue, applyPreset, exportTheme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const handleCopyCSS = async () => {
    const css = exportTheme();
    await navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCSS = () => {
    const css = exportTheme();
    const blob = new Blob([css], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "theme.css";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleToggleDark = () => {
    if (isDark) {
      applyPreset(traversPreset);
    } else {
      applyPreset(darkPreset);
    }
    setIsDark(!isDark);
  };

  const colorGroups = [
    {
      title: "Primærfarger",
      description: "Hovedfargene for merkevaren din",
      colors: [
        { key: "primary" as keyof ThemeConfig, label: "Primary" },
        { key: "primaryForeground" as keyof ThemeConfig, label: "Primary tekst" },
      ],
    },
    {
      title: "Sekundærfarger",
      description: "Støttefarger for UI-elementer",
      colors: [
        { key: "secondary" as keyof ThemeConfig, label: "Secondary" },
        { key: "secondaryForeground" as keyof ThemeConfig, label: "Secondary tekst" },
        { key: "accent" as keyof ThemeConfig, label: "Accent" },
        { key: "accentForeground" as keyof ThemeConfig, label: "Accent tekst" },
      ],
    },
    {
      title: "Bakgrunn",
      description: "Bakgrunnsfarger for ulike nivåer",
      colors: [
        { key: "background" as keyof ThemeConfig, label: "Background" },
        { key: "foreground" as keyof ThemeConfig, label: "Foreground" },
        { key: "card" as keyof ThemeConfig, label: "Card" },
        { key: "cardForeground" as keyof ThemeConfig, label: "Card tekst" },
        { key: "muted" as keyof ThemeConfig, label: "Muted" },
        { key: "mutedForeground" as keyof ThemeConfig, label: "Muted tekst" },
      ],
    },
    {
      title: "Grensesnitt",
      description: "Borders, inputs og fokus-indikatorer",
      colors: [
        { key: "border" as keyof ThemeConfig, label: "Border" },
        { key: "input" as keyof ThemeConfig, label: "Input" },
        { key: "ring" as keyof ThemeConfig, label: "Ring (fokus)" },
      ],
    },
    {
      title: "Semantiske farger",
      description: "Farger for feedback og tilstander",
      colors: [
        { key: "destructive" as keyof ThemeConfig, label: "Destructive" },
        { key: "destructiveForeground" as keyof ThemeConfig, label: "Destructive tekst" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              T
            </div>
            <div>
              <h1 className="text-lg font-semibold">Travers UI</h1>
              <p className="text-xs text-muted-foreground">Theme Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleToggleDark}>
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="sm" onClick={handleCopyCSS}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span className="ml-2">{copied ? "Kopiert!" : "Kopier CSS"}</span>
            </Button>
            <Button size="sm" onClick={handleDownloadCSS}>
              <Download className="h-4 w-4" />
              <span className="ml-2">Last ned</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="colors" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="colors" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Farger
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Forhåndsvisning
            </TabsTrigger>
            <TabsTrigger value="export">Eksporter</TabsTrigger>
          </TabsList>

          {/* Colors Tab */}
          <TabsContent value="colors" className="space-y-6">
            {/* Presets */}
            <Card>
              <CardHeader>
                <CardTitle>Forhåndsinnstillinger</CardTitle>
                <CardDescription>Velg en forhåndsdefinert fargepalett som utgangspunkt</CardDescription>
              </CardHeader>
              <CardContent className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    applyPreset(traversPreset);
                    setIsDark(false);
                  }}
                  className="flex-1"
                >
                  <div className="mr-2 h-4 w-4 rounded-full bg-[hsl(51,53%,10%)]" />
                  Travers Light
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    applyPreset(darkPreset);
                    setIsDark(true);
                  }}
                  className="flex-1"
                >
                  <div className="mr-2 h-4 w-4 rounded-full bg-[hsl(45,60%,55%)]" />
                  Travers Dark
                </Button>
              </CardContent>
            </Card>

            {/* Border Radius */}
            <Card>
              <CardHeader>
                <CardTitle>Border Radius</CardTitle>
                <CardDescription>Juster avrundingen på komponentene</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Input
                    type="text"
                    value={theme.radius}
                    onChange={(e) => updateThemeValue("radius", e.target.value)}
                    className="w-32"
                  />
                  <div className="flex gap-2">
                    {["0", "0.25rem", "0.5rem", "0.75rem", "1rem", "1.5rem"].map((r) => (
                      <Button
                        key={r}
                        variant={theme.radius === r ? "default" : "outline"}
                        size="sm"
                        onClick={() => updateThemeValue("radius", r)}
                      >
                        {r === "0" ? "Ingen" : r}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Color Groups */}
            {colorGroups.map((group) => (
              <Card key={group.title}>
                <CardHeader>
                  <CardTitle>{group.title}</CardTitle>
                  <CardDescription>{group.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {group.colors.map((color) => (
                      <ColorPicker
                        key={color.key}
                        label={color.label}
                        value={theme[color.key]}
                        onChange={(value) => updateThemeValue(color.key, value)}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Preview Tab */}
          <TabsContent value="preview">
            <ComponentShowcase />
          </TabsContent>

          {/* Export Tab */}
          <TabsContent value="export">
            <Card>
              <CardHeader>
                <CardTitle>Eksporter tema</CardTitle>
                <CardDescription>
                  Kopier CSS-variablene og lim dem inn i din globals.css fil
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="rounded-lg bg-muted p-4 text-sm overflow-auto max-h-96">
                    <code>{exportTheme()}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute right-2 top-2"
                    onClick={handleCopyCSS}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
