'use client';

import { ReactNode } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export interface SidebarProps {
  /**
   * Sidebar content
   */
  children: ReactNode;
  /**
   * Whether the sidebar is open (for mobile)
   */
  open?: boolean;
  /**
   * Callback when sidebar should close (for mobile)
   */
  onClose?: () => void;
}

const SIDEBAR_WIDTH = 300;

/**
 * Sidebar component with responsive behavior
 *
 * Features:
 * - Fixed width sidebar for desktop (300px)
 * - Collapsible drawer for mobile
 * - Material UI Drawer component
 *
 * Responsive behavior:
 * - Desktop (≥1024px): Fixed sidebar, always visible
 * - Tablet/Mobile (<1024px): Drawer that can be opened/closed
 *
 * Accessibility:
 * - Keyboard navigation: Tab through sidebar content
 * - ARIA labels: Properly labeled navigation region
 * - Focus management: Focus trap when drawer is open
 */
export function Sidebar({ children, open = false, onClose }: SidebarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (isMobile) {
    // Mobile: Temporary drawer
    return (
      <Drawer
        variant="temporary"
        anchor="left"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: SIDEBAR_WIDTH,
          },
        }}
      >
        <Box sx={{ p: 3 }} role="navigation" aria-label="sidebar navigation">
          {children}
        </Box>
      </Drawer>
    );
  }

  // Desktop: Permanent drawer
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: SIDEBAR_WIDTH,
          boxSizing: 'border-box',
          position: 'relative',
          border: 'none',
        },
      }}
    >
      <Box sx={{ p: 3 }} role="navigation" aria-label="sidebar navigation">
        {children}
      </Box>
    </Drawer>
  );
}
