'use client';

import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme } from '@/theme/theme';

interface ThemeProviderProps {
    children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    return (
        <MuiThemeProvider theme={darkTheme}>
            <CssBaseline />
            {children}
        </MuiThemeProvider>
    );
}
