import { createTheme } from '@mui/material/styles';

// Define waste categorization colors (consistent across all themes)
export const wasteColors = {
  waste: '#ef4444', // Red - Waste activities
  nonValueAdded: '#f59e0b', // Yellow - Non-value-added activities
  valueAdded: '#10b981', // Green - Value-added activities
} as const;

// Create MUI theme with Professional Blue color scheme
export const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb', // Blue - Main actions, key elements
    },
    secondary: {
      main: '#64748b', // Slate - Supporting actions
    },
    error: {
      main: '#ef4444', // Red - Errors, waste
    },
    warning: {
      main: '#f59e0b', // Amber - Warnings, non-value-added
    },
    success: {
      main: '#10b981', // Green - Success states, value-added
    },
    info: {
      main: '#3b82f6', // Blue - Information messages
    },
    background: {
      default: '#ffffff', // White
      paper: '#f8fafc', // Light gray
    },
    text: {
      primary: '#1e293b', // Dark slate
      secondary: '#64748b', // Medium gray
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontSize: '2.5rem', // 40px
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem', // 32px
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '1.5rem', // 24px
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: '1.25rem', // 20px
      fontWeight: 600,
      lineHeight: 1.2,
    },
    body1: {
      fontSize: '1rem', // 16px
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem', // 14px
      fontWeight: 400,
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '0.75rem', // 12px
      fontWeight: 400,
      lineHeight: 1.5,
    },
  },
  spacing: 4, // Base unit: 4px (4, 8, 12, 16, 24, 32, 48, 64)
  breakpoints: {
    values: {
      xs: 0,
      sm: 768, // Mobile
      md: 1024, // Tablet
      lg: 1280, // Desktop
      xl: 1920, // Large desktop
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Disable uppercase transformation
          borderRadius: 8, // Rounded corners
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12, // Rounded corners
        },
      },
    },
  },
});
