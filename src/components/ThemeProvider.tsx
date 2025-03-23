
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";
type FontSize = "normal" | "large" | "larger";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  reducedMotion: boolean;
  setReducedMotion: (reduced: boolean) => void;
  highContrast: boolean;
  setHighContrast: (contrast: boolean) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  accentColor: "blue",
  setAccentColor: () => null,
  fontSize: "normal",
  setFontSize: () => null,
  reducedMotion: false,
  setReducedMotion: () => null,
  highContrast: false,
  setHighContrast: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );
  
  const [accentColor, setAccentColor] = useState<string>(
    () => localStorage.getItem("ui-accent") || "blue"
  );

  const [fontSize, setFontSize] = useState<FontSize>(
    () => (localStorage.getItem("ui-font-size") as FontSize) || "normal"
  );

  const [reducedMotion, setReducedMotion] = useState<boolean>(
    () => localStorage.getItem("ui-reduced-motion") === "true"
  );

  const [highContrast, setHighContrast] = useState<boolean>(
    () => localStorage.getItem("ui-high-contrast") === "true"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    
    root.classList.remove("light", "dark");
    
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      
      root.classList.add(systemTheme);
      return;
    }
    
    root.classList.add(theme);
  }, [theme]);
  
  useEffect(() => {
    localStorage.setItem("ui-accent", accentColor);
    const root = window.document.documentElement;
    
    // Remove any existing accent classes
    root.classList.forEach(className => {
      if (className.startsWith('accent-')) {
        root.classList.remove(className);
      }
    });
    
    // Add the new accent class
    root.classList.add(`accent-${accentColor}`);
  }, [accentColor]);

  useEffect(() => {
    localStorage.setItem("ui-font-size", fontSize);
    const root = window.document.documentElement;
    
    // Remove any existing font size classes
    root.classList.forEach(className => {
      if (className.startsWith('text-size-')) {
        root.classList.remove(className);
      }
    });
    
    // Add the new font size class
    root.classList.add(`text-size-${fontSize}`);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem("ui-reduced-motion", reducedMotion.toString());
    const root = window.document.documentElement;
    
    if (reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }
  }, [reducedMotion]);

  useEffect(() => {
    localStorage.setItem("ui-high-contrast", highContrast.toString());
    const root = window.document.documentElement;
    
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
  }, [highContrast]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
    accentColor,
    setAccentColor: (color: string) => {
      setAccentColor(color);
    },
    fontSize,
    setFontSize: (size: FontSize) => {
      setFontSize(size);
    },
    reducedMotion,
    setReducedMotion: (reduced: boolean) => {
      setReducedMotion(reduced);
    },
    highContrast,
    setHighContrast: (contrast: boolean) => {
      setHighContrast(contrast);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  
  return context;
};
