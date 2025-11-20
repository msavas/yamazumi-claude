'use client';

import TextField, { TextFieldProps } from '@mui/material/TextField';
import { forwardRef } from 'react';

export interface InputProps extends Omit<TextFieldProps, 'variant'> {
  /**
   * Help text displayed below the input field
   */
  helpText?: string;
}

/**
 * Input component with accessible label associations and error handling
 *
 * Accessibility features:
 * - Proper label associations: Uses for/id attributes automatically
 * - Error announcements: Error messages announced to screen readers via aria-describedby
 * - Required field indicator: Asterisk (*) after label when required
 * - Help text: Accessible to screen readers via aria-describedby
 * - Color contrast: Error messages meet WCAG AA standards
 */
export const Input = forwardRef<HTMLDivElement, InputProps>(
  ({ helpText, helperText, ...props }, ref) => {
    return (
      <TextField
        ref={ref}
        variant="outlined"
        fullWidth
        helperText={helperText || helpText}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
