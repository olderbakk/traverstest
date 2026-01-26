import React, { useState, useEffect } from "react";
import { Input, Label, Popover, PopoverContent, PopoverTrigger } from "@/components/ui";

interface ColorPickerProps {
  label: string;
  value: string; // HSL format: "217 91% 60%"
  onChange: (value: string) => void;
}

function hslStringToHex(hsl: string): string {
  const parts = hsl.split(" ").map((p) => parseFloat(p));
  if (parts.length !== 3) return "#3b82f6";

  const h = parts[0];
  const s = parts[1] / 100;
  const l = parts[2] / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  const toHex = (n: number) => {
    const hex = Math.round((n + m) * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hexToHslString(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "0 0% 0%";

  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  const [hexValue, setHexValue] = useState(() => hslStringToHex(value));
  const [hslInput, setHslInput] = useState(value);

  useEffect(() => {
    setHexValue(hslStringToHex(value));
    setHslInput(value);
  }, [value]);

  const handleHexChange = (hex: string) => {
    setHexValue(hex);
    const hsl = hexToHslString(hex);
    setHslInput(hsl);
    onChange(hsl);
  };

  const handleHslInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setHslInput(newValue);
    // Validate HSL format and update
    const parts = newValue.split(" ");
    if (parts.length === 3) {
      onChange(newValue);
      setHexValue(hslStringToHex(newValue));
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex h-10 w-full items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <div
              className="h-5 w-5 rounded border"
              style={{ backgroundColor: `hsl(${value})` }}
            />
            <span className="flex-1 text-left text-xs text-muted-foreground truncate">
              {value}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-64 space-y-3">
          <div className="space-y-2">
            <Label className="text-xs">Velg farge</Label>
            <input
              type="color"
              value={hexValue}
              onChange={(e) => handleHexChange(e.target.value)}
              className="h-32 w-full cursor-pointer rounded border-0"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">HSL verdier</Label>
            <Input
              type="text"
              value={hslInput}
              onChange={handleHslInputChange}
              placeholder="217 91% 60%"
              className="text-xs"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">HEX</Label>
            <Input
              type="text"
              value={hexValue}
              onChange={(e) => handleHexChange(e.target.value)}
              placeholder="#3b82f6"
              className="text-xs"
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
