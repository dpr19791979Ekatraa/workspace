'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
  useMediaQuery,
} from '@mui/material';

import { getTheme } from '@/theme/index';

type ColorModeContextValue = {
  mode: 'light' | 'dark';
  toggleColorMode: () => void;
};

const ColorModeContext = createContext<ColorModeContextValue>({
  mode: 'dark',
  toggleColorMode: () => {},
});

export const useColorMode = () =>
  useContext(ColorModeContext);

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefersDarkMode = useMediaQuery(
    '(prefers-color-scheme: dark)',
  );
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const storedMode =
      window.localStorage.getItem('color-mode');

    if (storedMode === 'light' || storedMode === 'dark') {
      setMode(storedMode);
    } else {
      setMode(prefersDarkMode ? 'dark' : 'light');
    }
  }, [prefersDarkMode]);

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    window.localStorage.setItem('color-mode', mode);
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode(prevMode =>
          prevMode === 'light' ? 'dark' : 'light',
        );
      },
    }),
    [mode],
  );

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
}
