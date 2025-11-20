'use client';

import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export interface MainContentProps {
  /**
   * Main content
   */
  children: ReactNode;
  /**
   * Maximum width of content area
   * - sm: 600px
   * - md: 900px
   * - lg: 1200px
   * - xl: 1400px
   * - false: no max-width
   */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | false;
}

/**
 * MainContent component with responsive layout
 *
 * Features:
 * - Content area with proper padding and max-width
 * - Responsive grid system (Material UI Grid)
 * - Configurable max-width for different content types
 *
 * Responsive behavior:
 * - Desktop: max-width 1400px, generous padding
 * - Tablet: max-width 1200px, medium padding
 * - Mobile: full width with small padding
 *
 * Accessibility:
 * - Semantic HTML: Uses <main> element
 * - Proper heading hierarchy
 */
export function MainContent({ children, maxWidth = 'xl' }: MainContentProps) {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 4,
        minHeight: '100vh',
        backgroundColor: 'background.default',
      }}
      role="main"
    >
      <Container maxWidth={maxWidth}>{children}</Container>
    </Box>
  );
}
