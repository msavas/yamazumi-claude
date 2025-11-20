# Yamazumi Design System

_Created: 2025-11-20_
_Last Updated: 2025-11-20_

---

## Overview

This design system provides a comprehensive set of design tokens, components, and guidelines for building consistent, accessible interfaces in the Yamazumi application. Built on Material UI (MUI), it ensures professional appearance, high contrast for factory floor viewing, and WCAG AA accessibility compliance.

---

## Color Palette

### Professional Blue Theme

```typescript
// Primary colors
primary: '#2563eb'      // Blue - Main actions, key elements
secondary: '#64748b'    // Slate - Supporting actions
accent: '#0ea5e9'       // Sky Blue - Highlights, emphasis

// Semantic colors
success: '#10b981'      // Green - Success states
warning: '#f59e0b'      // Amber - Warnings
error: '#ef4444'        // Red - Errors
info: '#3b82f6'         // Blue - Information
```

### Waste Categorization Colors

**Critical:** These colors must remain consistent across all themes and components.

```typescript
waste: '#ef4444'           // Red - Waste activities
nonValueAdded: '#f59e0b'   // Yellow - Non-value-added activities
valueAdded: '#10b981'      // Green - Value-added activities
```

**Usage Guidelines:**
- **Red (#ef4444):** Eliminable waste activities (walking, searching, waiting, idle time)
- **Yellow (#f59e0b):** Necessary but non-value-adding work (picking up tools, positioning, preparing)
- **Green (#10b981):** Actual transformation work (assembly, installation)

### Neutral Colors

```typescript
background: '#ffffff'      // White - Page background
surface: '#f8fafc'        // Light gray - Card/surface background
border: '#e2e8f0'         // Light border
textPrimary: '#1e293b'    // Dark slate - Primary text
textSecondary: '#64748b'  // Medium gray - Secondary text
```

---

## Typography

### Font Families

```typescript
// Headings and body text
fontFamily: [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
]

// Monospace (for technical data)
monospaceFontFamily: [
  '"SF Mono"',
  'Monaco',
  'Consolas',
  '"Courier New"',
  'monospace',
]
```

### Type Scale

| Element | Size | Weight | Line Height | Usage |
|---------|------|--------|-------------|-------|
| H1 | 2.5rem (40px) | 600 (semibold) | 1.2 | Page titles |
| H2 | 2rem (32px) | 600 (semibold) | 1.2 | Section headers |
| H3 | 1.5rem (24px) | 600 (semibold) | 1.2 | Subsection headers |
| H4 | 1.25rem (20px) | 600 (semibold) | 1.2 | Card titles |
| Body1 | 1rem (16px) | 400 (regular) | 1.5 | Default text |
| Body2 | 0.875rem (14px) | 400 (regular) | 1.5 | Secondary text |
| Caption | 0.75rem (12px) | 400 (regular) | 1.5 | Labels, captions |

### Usage Example

```tsx
import Typography from '@mui/material/Typography';

function Example() {
  return (
    <>
      <Typography variant="h1">Page Title</Typography>
      <Typography variant="h2">Section Header</Typography>
      <Typography variant="body1">Default body text</Typography>
      <Typography variant="caption">Small caption text</Typography>
    </>
  );
}
```

---

## Spacing Scale

**Base Unit:** 4px

The spacing scale uses a 4px base unit, accessible via `theme.spacing()`:

```typescript
theme.spacing(1)  // 4px
theme.spacing(2)  // 8px
theme.spacing(3)  // 12px
theme.spacing(4)  // 16px
theme.spacing(6)  // 24px
theme.spacing(8)  // 32px
theme.spacing(12) // 48px
theme.spacing(16) // 64px
```

**Usage Guidelines:**
- **4px (1):** Tight spacing between related elements
- **8px (2):** Default spacing for compact layouts
- **12px (3):** Spacing between form fields
- **16px (4):** Standard padding for cards and containers
- **24px (6):** Spacing between sections
- **32px (8):** Large spacing for visual separation
- **48px (12):** Extra large spacing
- **64px (16):** Maximum spacing for major sections

---

## Breakpoints

| Breakpoint | Min Width | Usage |
|------------|-----------|-------|
| xs | 0px | Extra small (mobile portrait) |
| sm | 768px | Small (mobile landscape, small tablet) |
| md | 1024px | Medium (tablet, small desktop) |
| lg | 1280px | Large (desktop) |
| xl | 1920px | Extra large (large desktop) |

**Responsive Strategy:**
- **Desktop (≥1024px):** Full two-column layout, all features visible
- **Tablet (768px-1023px):** Two-column maintained, reduced spacing
- **Mobile (<768px):** Single column, simplified navigation

---

## Components

### Button

#### Variants

- **Primary:** Main actions (contained, blue background, white text)
- **Secondary:** Alternative actions (outlined, blue border, blue text)
- **Tertiary:** Less important actions (text button, blue text, no border)
- **Destructive:** Delete, remove, clear actions (contained, red background, white text)

#### Usage

```tsx
import { Button } from '@/components/ui';

function Example() {
  return (
    <>
      <Button variant="primary">Save</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="tertiary">Skip</Button>
      <Button variant="destructive">Delete</Button>
    </>
  );
}
```

#### Accessibility

- ✓ Keyboard navigation: Tab to focus, Enter/Space to activate
- ✓ Focus indicators: 2px outline in primary blue (#2563eb)
- ✓ ARIA labels: Supports `aria-label` and `aria-describedby`
- ✓ Color contrast: Meets WCAG AA standards (4.5:1 minimum)

---

### Input

#### Features

- Text input with label
- Help text support
- Error states with accessible announcements
- Required field indicator (asterisk)

#### Usage

```tsx
import { Input } from '@/components/ui';

function Example() {
  return (
    <>
      <Input
        label="Email"
        type="email"
        required
        helpText="Enter your work email address"
      />
      <Input
        label="Password"
        type="password"
        error
        helperText="Password must be at least 8 characters"
      />
    </>
  );
}
```

#### Accessibility

- ✓ Proper label associations: Uses `for`/`id` attributes automatically
- ✓ Error announcements: Error messages announced to screen readers via `aria-describedby`
- ✓ Required field indicator: Asterisk (*) after label
- ✓ Help text: Accessible to screen readers

---

### Card

#### Variants

- **default:** Standard card with shadow (2dp elevation)
- **outlined:** Card with border, no shadow
- **elevated:** Card with enhanced shadow (8dp elevation)

#### Usage

```tsx
import { Card } from '@/components/ui';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function Example() {
  return (
    <>
      <Card cardVariant="default">
        <CardContent>
          <Typography variant="h4">Standard Card</Typography>
          <Typography variant="body1">Card with shadow</Typography>
        </CardContent>
      </Card>

      <Card cardVariant="outlined">
        <CardContent>
          <Typography variant="h4">Outlined Card</Typography>
          <Typography variant="body1">Card with border</Typography>
        </CardContent>
      </Card>

      <Card cardVariant="elevated">
        <CardContent>
          <Typography variant="h4">Elevated Card</Typography>
          <Typography variant="body1">Card with enhanced shadow</Typography>
        </CardContent>
      </Card>
    </>
  );
}
```

---

### Layout Components

#### Header

Top navigation bar with responsive behavior.

**Features:**
- Logo placeholder
- Navigation menu items
- Hamburger menu for mobile

**Usage:**

```tsx
import { Header } from '@/components/layout';

function App() {
  return <Header />;
}
```

---

#### Sidebar

Sidebar with responsive drawer behavior.

**Features:**
- Fixed width (300px) for desktop
- Collapsible drawer for mobile
- Proper ARIA labels

**Usage:**

```tsx
import { Sidebar } from '@/components/layout';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Sidebar
      open={sidebarOpen}
      onClose={() => setSidebarOpen(false)}
    >
      <nav>Navigation content</nav>
    </Sidebar>
  );
}
```

---

#### MainContent

Content area with proper padding and max-width.

**Features:**
- Responsive padding
- Configurable max-width
- Semantic HTML (`<main>`)

**Usage:**

```tsx
import { MainContent } from '@/components/layout';

function App() {
  return (
    <MainContent maxWidth="xl">
      <h1>Page Content</h1>
    </MainContent>
  );
}
```

---

## Accessibility Guidelines

### WCAG 2.1 Level AA Compliance

All components meet WCAG 2.1 Level AA standards.

#### Color Contrast

| Element Type | Minimum Ratio | Standard |
|--------------|---------------|----------|
| Normal text | 4.5:1 | WCAG AA |
| Large text (18pt+) | 3:1 | WCAG AA |
| Interactive elements | 3:1 | WCAG AA |

**Testing:** Use WebAIM Contrast Checker or browser DevTools

#### Keyboard Navigation

- All interactive elements accessible via keyboard
- Logical tab order
- Visible focus indicators (2px outline, #2563eb color)
- Keyboard shortcuts documented

**Keys:**
- **Tab:** Navigate forward
- **Shift+Tab:** Navigate backward
- **Enter/Space:** Activate buttons/links
- **Escape:** Close modals/drawers

#### Screen Reader Support

- Semantic HTML structure (`<nav>`, `<main>`, `<header>`)
- ARIA labels for interactive elements
- Alt text for meaningful images
- Descriptive labels for all form inputs
- Error messages clearly associated with fields

#### Focus Management

- Visible focus indicators on all interactive elements
- Focus trap in modals
- Return focus to trigger element when modal closes

#### Touch Targets

- Minimum 44px × 44px for mobile/tablet
- Adequate spacing between interactive elements (8px minimum)

---

## Implementation Notes

### Theme Setup

The MUI theme is configured in `lib/theme.ts` and applied globally via `components/ThemeRegistry.tsx`.

To use the theme in components:

```tsx
import { useTheme } from '@mui/material/styles';

function Component() {
  const theme = useTheme();

  return (
    <div style={{
      color: theme.palette.primary.main,
      padding: theme.spacing(4)
    }}>
      Content
    </div>
  );
}
```

### Waste Colors

To use waste categorization colors:

```tsx
import { wasteColors } from '@/lib/theme';

function WorkElement({ category }: { category: 'waste' | 'nonValueAdded' | 'valueAdded' }) {
  return (
    <div style={{ backgroundColor: wasteColors[category] }}>
      {category}
    </div>
  );
}
```

---

## References

- [Material UI Documentation](https://mui.com/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [UX Design Specification](./ux-design-specification.md)
- [Architecture Documentation](./architecture.md)

---

_This design system is a living document and will be updated as new components and patterns are added._
