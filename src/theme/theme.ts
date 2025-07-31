'use client';

import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#00d4aa', // Vert blockchain
            light: '#4dffdb',
            dark: '#00a37a',
            contrastText: '#000',
        },
        secondary: {
            main: '#ff6b35', // Orange pour les actions
            light: '#ff9a6b',
            dark: '#cc4a1a',
            contrastText: '#fff',
        },
        background: {
            default: '#0a0a0a',
            paper: '#1a1a1a',
        },
        text: {
            primary: '#ffffff',
            secondary: '#b0b0b0',
        },
        success: {
            main: '#00d4aa',
            light: '#4dffdb',
            dark: '#00a37a',
        },
        warning: {
            main: '#ff9800',
            light: '#ffb74d',
            dark: '#f57c00',
        },
        error: {
            main: '#f44336',
            light: '#e57373',
            dark: '#d32f2f',
        },
        info: {
            main: '#2196f3',
            light: '#64b5f6',
            dark: '#1976d2',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
            letterSpacing: '-0.01em',
        },
        h3: {
            fontSize: '1.5rem',
            fontWeight: 600,
        },
        h4: {
            fontSize: '1.25rem',
            fontWeight: 500,
        },
        h5: {
            fontSize: '1.125rem',
            fontWeight: 500,
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 500,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.5,
        },
        button: {
            textTransform: 'none',
            fontWeight: 500,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #333',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '10px 24px',
                    fontWeight: 500,
                },
                contained: {
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: '#2a2a2a',
                        '& fieldset': {
                            borderColor: '#444',
                        },
                        '&:hover fieldset': {
                            borderColor: '#666',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#00d4aa',
                        },
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    backgroundColor: '#2a2a2a',
                    border: '1px solid #444',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #333',
                },
            },
        },
    },
});
