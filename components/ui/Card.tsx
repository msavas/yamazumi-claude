'use client';

import MuiCard, { CardProps as MuiCardProps } from '@mui/material/Card';
import { forwardRef } from 'react';
import { styled } from '@mui/material/styles';

export interface CardProps extends MuiCardProps {
  /**
   * Card variant
   * - default: Standard card with shadow
   * - outlined: Card with border, no shadow
   * - elevated: Card with enhanced shadow
   */
  cardVariant?: 'default' | 'outlined' | 'elevated';
}

const StyledCard = styled(MuiCard, {
  shouldForwardProp: (prop) => prop !== 'cardVariant',
})<CardProps>(({ theme, cardVariant = 'default' }) => {
  const baseStyles = {
    borderRadius: theme.spacing(3), // 12px
    padding: theme.spacing(4), // 16px
  };

  switch (cardVariant) {
    case 'outlined':
      return {
        ...baseStyles,
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: 'none',
      };
    case 'elevated':
      return {
        ...baseStyles,
        boxShadow: theme.shadows[8],
      };
    case 'default':
    default:
      return {
        ...baseStyles,
        boxShadow: theme.shadows[2],
      };
  }
});

/**
 * Card component with shadow, padding, and border radius
 *
 * Variants:
 * - default: Standard card with shadow (2dp elevation)
 * - outlined: Card with border, no shadow
 * - elevated: Card with enhanced shadow (8dp elevation)
 *
 * Accessibility:
 * - Semantic HTML: Uses appropriate ARIA roles when needed
 * - Color contrast: Meets WCAG AA standards
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ cardVariant = 'default', children, ...props }, ref) => {
    return (
      <StyledCard ref={ref} cardVariant={cardVariant} {...props}>
        {children}
      </StyledCard>
    );
  }
);

Card.displayName = 'Card';
