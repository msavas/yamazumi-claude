'use client';

import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const navigationItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Videos', href: '/videos' },
  { label: 'Analysis', href: '/analysis' },
  { label: 'Yamazumi Charts', href: '/yamazumi' },
];

/**
 * Header component with responsive navigation
 *
 * Features:
 * - Top navigation bar with Material UI AppBar
 * - Logo placeholder
 * - Navigation menu items
 * - Responsive behavior: full menu on desktop, hamburger menu on mobile
 *
 * Accessibility:
 * - Keyboard navigation: Tab through menu items, Enter to activate
 * - ARIA labels: Menu button labeled for screen readers
 * - Focus indicators: Visible focus states on all interactive elements
 */
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <AppBar position="static" elevation={1}>
        <Toolbar>
          {/* Logo */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 0, fontWeight: 700 }}>
            Yamazumi
          </Typography>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: 'flex', ml: 4 }}>
              {navigationItems.map((item) => (
                <Button
                  key={item.label}
                  color="inherit"
                  href={item.href}
                  sx={{ mx: 1 }}
                  aria-label={`Navigate to ${item.label}`}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton
                color="inherit"
                aria-label="open navigation menu"
                edge="end"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      {isMobile && (
        <Drawer
          anchor="right"
          open={mobileMenuOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
        >
          <Box sx={{ width: 250 }} role="navigation" aria-label="mobile navigation">
            <List>
              {navigationItems.map((item) => (
                <ListItem key={item.label} disablePadding>
                  <ListItemButton
                    component="a"
                    href={item.href}
                    onClick={handleDrawerToggle}
                    aria-label={`Navigate to ${item.label}`}
                  >
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      )}
    </>
  );
}
