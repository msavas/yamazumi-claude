import { Theme } from '@mui/material/styles';

// Extend MUI theme types if needed
declare module '@mui/material/styles' {
  interface Theme {
    // Add custom theme properties here if needed in the future
  }
  interface ThemeOptions {
    // Add custom theme options here if needed in the future
  }
}

// Waste categorization color types
export type WasteCategory = 'waste' | 'nonValueAdded' | 'valueAdded';

export interface WasteColors {
  waste: string;
  nonValueAdded: string;
  valueAdded: string;
}

// Export theme type for use throughout the app
export type { Theme };
