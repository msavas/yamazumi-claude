'use client';

import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { forwardRef } from 'react';

export interface ButtonProps extends Omit<MuiButtonProps, 'variant' | 'color'> {
  /**
   * Button variant
   * - primary: Main actions (contained, blue background)
   * - secondary: Alternative actions (outlined, blue border)
   * - tertiary: Less important actions (text button)
   * - destructive: Delete, remove, clear actions (red)
   */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive';
}

/**
 * Button component with accessible keyboard navigation and focus indicators
 *
 * Accessibility features:
 * - Keyboard navigation: Tab to focus, Enter/Space to activate
 * - Focus indicators: Visible 2px outline in primary blue (#2563eb)
 * - ARIA labels: Supports aria-label and aria-describedby
 * - Color contrast: Meets WCAG AA standards (4.5:1 minimum)
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', children, ...props }, ref) => {
    let muiVariant: MuiButtonProps['variant'] = 'contained';
    let muiColor: MuiButtonProps['color'] = 'primary';

    switch (variant) {
      case 'primary':
        muiVariant = 'contained';
        muiColor = 'primary';
        break;
      case 'secondary':
        muiVariant = 'outlined';
        muiColor = 'primary';
        break;
      case 'tertiary':
        muiVariant = 'text';
        muiColor = 'primary';
        break;
      case 'destructive':
        muiVariant = 'contained';
        muiColor = 'error';
        break;
    }

    return (
      <MuiButton ref={ref} variant={muiVariant} color={muiColor} {...props}>
        {children}
      </MuiButton>
    );
  }
);

Button.displayName = 'Button';
