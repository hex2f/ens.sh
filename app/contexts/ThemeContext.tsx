import React, { createContext, useEffect } from "react"

export interface IThemeContext {
  dark: boolean;
  accent: string;
  accentHue: number;
}

export const ThemeContext = createContext<IThemeContext>({
  dark: false,
  accent: '#00d1b2',
  accentHue: 0,
});

export const useTheme = () => React.useContext(ThemeContext);

export default function ThemeProvider({ children, dark, accent, accentHue }: React.PropsWithChildren<{ dark: boolean, accent: string, accentHue: number }>) {
  const [isDark, setDark] = React.useState(dark);

  useEffect(() => {
      // setDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        setDark(event.matches);
      });
      const update = (e: MediaQueryListEvent) => {
        setDark(e.matches);
      }
      const match = window.matchMedia('(prefers-color-scheme: dark)')
      match.addEventListener('change', update);
      return () => {
        match.removeEventListener('change', update);
      }
  }, [])

  return (
    <ThemeContext.Provider value={{ dark: isDark, accent, accentHue }}>
      {children}
    </ThemeContext.Provider>
  );
}