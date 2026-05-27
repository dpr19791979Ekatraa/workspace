'use client';

import { createTheme, responsiveFontSizes, type PaletteMode, type Theme } from '@mui/material/styles';

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,

    primary: {
      main: '#FF6A00',
      dark: '#CC5200',
      light: '#FF8B33',
      contrastText: '#0B0B0B',
    },

    secondary: {
      main: '#FF9500',
      dark: '#CC7000',
      light: '#FFB347',
    },

    background: {
      default: mode === 'dark' ? '#060606' : '#F5F5F5',
      paper: mode === 'dark' ? '#101010' : '#FFFFFF',
    },

    text: {
      primary: mode === 'dark' ? '#F5F5F5' : '#191919',
      secondary: mode === 'dark' ? '#A3A3A3' : '#5A5A5A',
      disabled: mode === 'dark' ? 'rgba(245,245,245,0.6)' : 'rgba(25,25,25,0.45)',
    },

    divider: mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',

    action: {
      hover: mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
      selected: mode === 'dark' ? 'rgba(255,106,0,0.12)' : 'rgba(255,149,0,0.12)',
      active: '#FF6A00',
    },
  },

  typography: {
    fontFamily: 'Plus Jakarta Sans, Inter, sans-serif',

    h1: {
      fontSize: '2.02rem',
      fontWeight: 700,
      lineHeight: 1.15,
      letterSpacing: '-0.04em',
    },

    h2: {
      fontSize: '1.78rem',
      fontWeight: 700,
      lineHeight: 1.18,
      letterSpacing: '-0.03em',
    },

    h3: {
      fontSize: '1.45rem',
      fontWeight: 700,
      lineHeight: 1.25,
    },

    h4: {
      fontSize: '1.22rem',
      fontWeight: 650,
      lineHeight: 1.3,
    },

    h5: {
      fontSize: '1.02rem',
      fontWeight: 650,
      lineHeight: 1.35,
    },

    h6: {
      fontSize: '0.9rem',
      fontWeight: 600,
      lineHeight: 1.45,
    },

    body1: {
      fontSize: '0.9rem',
      lineHeight: 1.65,
    },

    body2: {
      fontSize: '0.82rem',
      lineHeight: 1.62,
    },

    button: {
      fontSize: '0.84rem',
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0',
    },
  },

  shape: {
    borderRadius: 18,
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          backgroundImage:
            'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.005))',
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
        }),
      },
    },

    MuiCard: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          borderRadius: 18,
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow:
            theme.palette.mode === 'dark'
              ? '0 24px 70px rgba(0,0,0,0.14)'
              : '0 10px 30px rgba(0,0,0,0.08)',
          overflow: 'hidden',
        }),
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          paddingTop: 8,
          paddingBottom: 8,
          textTransform: 'none',
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        size: 'small' as const,
        variant: 'outlined' as const,
      },
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          '& .MuiInputBase-root': {
            minHeight: 48,
          },
          '& .MuiInputLabel-root': {
            lineHeight: 1.4,
          },
        }),
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: '0.78rem',
          borderRadius: 10,
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          background: theme.palette.mode === 'dark'
            ? 'rgba(10, 10, 10, 0.88)'
            : 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(18px)',
          borderBottom: `1px solid ${theme.palette.divider}`,
          boxShadow:
            theme.palette.mode === 'dark'
              ? '0 18px 40px rgba(0,0,0,0.22)'
              : '0 10px 30px rgba(0,0,0,0.08)',
        }),
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme }: { theme: Theme }) => ({
          background: theme.palette.mode === 'dark'
            ? 'rgba(12,12,12,0.98)'
            : '#FBFBFB',
          borderRight: `1px solid ${theme.palette.divider}`,
          backdropFilter: 'blur(20px)',
        }),
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          borderRadius: 12,
          '&.Mui-selected': {
            backgroundColor:
              theme.palette.mode === 'dark'
                ? 'rgba(255,106,0,0.14)'
                : 'rgba(255,149,0,0.14)',
          },
        }),
      },
    },
  },
});

export const getTheme = (mode: PaletteMode) => {
  const theme = createTheme(getDesignTokens(mode));
  return responsiveFontSizes(theme, {
    factor: 1,
  });
};
