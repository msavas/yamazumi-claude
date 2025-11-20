# Story 1.4: Basic UI Framework & Design System

Status: done

## Story

As a developer,
I want a basic UI framework with design tokens and reusable components,
So that I can build consistent, accessible interfaces throughout the application.

## Acceptance Criteria

**Given** I am building UI components
**When** I use the design system
**Then** I have access to:
- Color palette (including red/yellow/green for waste categorization)
- Typography system
- Spacing scale
- Basic button, input, and card components
- Responsive layout utilities

**And** Components follow accessibility best practices (WCAG AA minimum)
**And** Color contrast meets accessibility standards
**And** Components are responsive (work on desktop and tablet)

## Tasks / Subtasks

- [ ] Install and configure Material UI (MUI) (AC: Basic components)
  - [ ] Install @mui/material, @emotion/react, @emotion/styled
  - [ ] Install @mui/icons-material for icons
  - [ ] Configure MUI theme provider in app/layout.tsx
  - [ ] Create lib/theme.ts for MUI theme configuration
  - [ ] Verify MUI components render correctly

- [ ] Define design tokens and theme configuration (AC: Color palette, typography, spacing)
  - [ ] Configure color palette (Professional Blue theme)
    - [ ] Primary: #2563eb (Blue)
    - [ ] Secondary: #64748b (Slate)
    - [ ] Accent: #0ea5e9 (Sky Blue)
    - [ ] Success: #10b981 (Green - value-added work)
    - [ ] Warning: #f59e0b (Amber - non-value-added work)
    - [ ] Error: #ef4444 (Red - waste)
    - [ ] Info: #3b82f6 (Blue)
  - [ ] Configure waste categorization colors (consistent across all themes)
    - [ ] Red (#ef4444): Waste activities
    - [ ] Yellow (#f59e0b): Non-value-added activities
    - [ ] Green (#10b981): Value-added activities
  - [ ] Configure typography system (system font stack)
    - [ ] Headings: System font stack (San Francisco, Segoe UI, Roboto)
    - [ ] Body: System font stack
    - [ ] Monospace: 'SF Mono', 'Monaco', 'Consolas' for technical data
  - [ ] Configure spacing scale (4px base unit: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px)
  - [ ] Configure breakpoints (Desktop ≥1024px, Tablet 768-1023px, Mobile <768px)
  - [ ] Create TypeScript theme types in types/theme.ts

- [ ] Create basic component library (AC: Basic components)
  - [ ] Create components/ui/ directory for reusable UI components
  - [ ] Create Button component (Button.tsx)
    - [ ] Primary, secondary, tertiary, destructive variants
    - [ ] Accessibility: keyboard navigation, focus indicators, ARIA labels
  - [ ] Create Input component (Input.tsx)
    - [ ] Text input with label, help text, error states
    - [ ] Accessibility: proper label associations, error announcements
  - [ ] Create Card component (Card.tsx)
    - [ ] Container with shadow, padding, border radius
    - [ ] Variants: default, outlined, elevated
  - [ ] Verify all components are accessible (WCAG AA)
    - [ ] Color contrast ratios meet 4.5:1 minimum for text
    - [ ] Keyboard navigation works (Tab, Enter, Space)
    - [ ] Focus indicators visible (2px outline, #2563eb color)
    - [ ] Screen reader support with proper ARIA attributes

- [ ] Create layout components (AC: Responsive layout utilities)
  - [ ] Create components/layout/ directory
  - [ ] Create Header component (Header.tsx)
    - [ ] Top navigation bar with Material UI AppBar
    - [ ] Logo placeholder
    - [ ] Navigation menu items
    - [ ] Responsive behavior (hamburger menu for mobile)
  - [ ] Create Sidebar component (Sidebar.tsx)
    - [ ] Fixed width sidebar for desktop (300px)
    - [ ] Collapsible/drawer for mobile
    - [ ] Material UI Drawer component
  - [ ] Create MainContent component (MainContent.tsx)
    - [ ] Content area with proper padding and max-width
    - [ ] Responsive grid system (Material UI Grid)
  - [ ] Verify responsive behavior at all breakpoints (Desktop, Tablet, Mobile)

- [ ] Update app metadata and branding (AC: Consistent branding)
  - [ ] Update app/layout.tsx metadata
    - [ ] Change title from "Create Next App" to "Yamazumi"
    - [ ] Update description: "Video-based work element analysis tool for manufacturing"
  - [ ] Apply MUI ThemeProvider to app/layout.tsx
  - [ ] Verify theme is applied globally

- [ ] Create design system documentation (AC: Developer guidance)
  - [ ] Create docs/design-system.md
  - [ ] Document color palette with usage guidelines
  - [ ] Document typography scale and usage
  - [ ] Document spacing scale
  - [ ] Document component usage examples
  - [ ] Document accessibility guidelines (WCAG AA compliance)
  - [ ] Include code examples for each component

- [ ] Verify accessibility compliance (AC: WCAG AA minimum)
  - [ ] Run Lighthouse accessibility audit
  - [ ] Verify color contrast ratios (WebAIM Contrast Checker)
  - [ ] Test keyboard navigation (Tab through all interactive elements)
  - [ ] Test screen reader (VoiceOver or NVDA)
  - [ ] Ensure all interactive elements have visible focus indicators
  - [ ] Verify touch targets are minimum 44px × 44px for mobile
  - [ ] Document any accessibility issues and resolutions

## Dev Notes

### Architecture Decisions

**From [ux-design-specification.md - Design System Foundation]:**

**Approach: Material UI (MUI) + Specialized Libraries**
- **Foundation:** Material UI (MUI) as primary component library
- Used for: Buttons, forms, inputs, navigation, dialogs, layout, typography, icons
- **Custom Components:** Video timeline, Yamazumi charts (will be built in later stories)
- **Specialized Libraries:** Video.js (Epic 3), Recharts/D3.js (Epic 5)

**Rationale:**
- Maximum stability and reliability (MUI is battle-tested)
- Full control over custom components when needed
- No unnecessary dependencies
- Consistent design language (everything styled to match MUI theme)
- Proven libraries for specialized features

**From [architecture.md - ADR-002: Material UI + Tailwind CSS Hybrid]:**
- Material UI as primary component library (enterprise-ready, matches UX spec)
- Tailwind CSS for utility classes (custom styling where needed)
- Two styling systems with clear separation (manageable approach)
- **Positive:** Matches UX spec, enterprise-ready components, utility classes for custom styling
- **Negative:** Two styling systems (manageable with clear separation)

### Design System Specifications

**From [ux-design-specification.md - Visual Foundation]:**

**Color System - Professional Blue Theme:**
- **Primary:** #2563eb (Blue) - Main actions, key elements
- **Secondary:** #64748b (Slate) - Supporting actions
- **Accent:** #0ea5e9 (Sky Blue) - Highlights, emphasis
- **Success:** #10b981 (Green) - Success states, value-added work
- **Warning:** #f59e0b (Amber) - Warnings, non-value-added work
- **Error:** #ef4444 (Red) - Errors, waste
- **Info:** #3b82f6 (Blue) - Information messages

**Waste Categorization Colors (Consistent Across All Themes):**
- **Red (#ef4444):** Waste - Eliminable activities (walking, searching, waiting)
- **Yellow (#f59e0b):** Non-Value-Added - Necessary but not value-adding (picking up tools, positioning)
- **Green (#10b981):** Value-Added - Actual transformation work (assembly, installation)

**Neutral Colors:**
- Background: #ffffff (White)
- Surface: #f8fafc (Light gray)
- Border: #e2e8f0 (Light border)
- Text Primary: #1e293b (Dark slate)
- Text Secondary: #64748b (Medium gray)

**Typography System:**
- **Font Families:**
  - Headings: System font stack (San Francisco, Segoe UI, Roboto)
  - Body: System font stack
  - Monospace: 'SF Mono', 'Monaco', 'Consolas' (for technical data)

- **Type Scale:**
  - H1: 2.5rem (40px) - Page titles
  - H2: 2rem (32px) - Section headers
  - H3: 1.5rem (24px) - Subsection headers
  - H4: 1.25rem (20px) - Card titles
  - Body: 1rem (16px) - Default text
  - Small: 0.875rem (14px) - Secondary text
  - Tiny: 0.75rem (12px) - Labels, captions

- **Font Weights:**
  - 400 (regular) - Body text
  - 500 (medium) - Emphasis, buttons
  - 600 (semibold) - Headings, labels
  - 700 (bold) - Strong emphasis

- **Line Heights:**
  - Body: 1.5
  - Headings: 1.2

**Spacing Scale (Base Unit: 4px):**
- 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px

**Layout Grid:**
- 12-column grid (Material UI default)

**Container Widths:**
- Desktop: max-width 1400px
- Tablet: max-width 1200px
- Mobile: full width with padding

### Component Strategy

**From [ux-design-specification.md - Component Library]:**

**From Material UI (Foundation):**
- Buttons (primary, secondary, outlined, text, destructive)
- Text fields / Inputs
- Select / Dropdown
- Cards
- Lists
- Dialogs / Modals
- AppBar / Navigation
- Icons (Material Icons)
- Typography
- Grid / Layout
- Tooltips
- Chips / Badges

**Custom Components (for future stories):**
- Video Timeline Component (Story 3.2 - Epic 3)
- Work Element List (Story 3.3 - Epic 3)
- Stacked Bar Chart (Story 5.1 - Epic 5)
- Yamazumi Chart (Story 5.2 - Epic 5)
- Upload Area (Story 2.1 - Epic 2)

### UX Pattern Decisions

**From [ux-design-specification.md - UX Pattern Decisions]:**

**Button Hierarchy:**
- **Primary:** Material UI primary button (blue #2563eb, white text) - Main actions
- **Secondary:** Material UI outlined button (blue border, blue text) - Alternative actions
- **Tertiary:** Material UI text button (blue text, no border) - Less important actions
- **Destructive:** Material UI error color (#ef4444, red) - Delete, remove, clear actions

**Feedback Patterns:**
- **Success:** Toast notification (top-right, auto-dismiss 3 seconds, green #10b981)
- **Error:** Toast notification (top-right, manual dismiss, red #ef4444)
- **Warning:** Toast or inline message (yellow/amber #f59e0b)
- **Info:** Toast or inline message (blue #3b82f6)
- **Loading:** Circular progress indicator (spinner), center of processing area

**Form Patterns:**
- **Label position:** Above input field
- **Required field indicator:** Asterisk (*) after label
- **Validation timing:** On blur (when user leaves field)
- **Error display:** Inline below input field, red text (#ef4444)
- **Help text:** Caption below input field, gray text (#64748b)

### Accessibility Requirements

**From [ux-design-specification.md - Accessibility Strategy]:**

**WCAG Compliance Target: WCAG 2.1 Level AA**

**Key Requirements:**

**Color Contrast:**
- Text on background: Minimum 4.5:1 ratio
- Large text (18pt+): Minimum 3:1 ratio
- Interactive elements: Minimum 3:1 ratio
- Color-coding: Not the only indicator (also use patterns/labels)

**Keyboard Navigation:**
- All interactive elements accessible via keyboard
- Logical tab order
- Focus indicators visible (2px outline, #2563eb color)
- Keyboard shortcuts documented

**Screen Reader Support:**
- Semantic HTML structure
- ARIA labels for interactive elements
- Alt text for meaningful images
- Descriptive labels for all form inputs

**Form Accessibility:**
- Proper label associations (for/id attributes)
- Error messages clearly associated with fields
- Required fields indicated with asterisk + aria-required
- Help text accessible to screen readers

**Focus Management:**
- Visible focus indicators on all interactive elements
- Focus trap in modals
- Return focus to trigger element when modal closes

**Touch Targets:**
- Minimum 44px × 44px for mobile/tablet
- Adequate spacing between interactive elements

**Testing Strategy:**
- **Automated:** Lighthouse accessibility audit, axe DevTools
- **Manual:** Keyboard-only navigation testing
- **Screen reader:** NVDA (Windows) or VoiceOver (Mac) testing
- **Color contrast:** WebAIM Contrast Checker

### Responsive Strategy

**From [ux-design-specification.md - Responsive Design]:**

**Target Devices:**
- **Primary:** Desktop/laptop browsers (Chrome, Firefox, Safari, Edge)
- **Secondary:** Tablets (for factory floor viewing)
- **Future:** Mobile (further down the road)

**Breakpoint Strategy:**

**Desktop (≥1024px):**
- Full two-column layout (video + sidebar)
- All features visible
- Optimal viewing experience

**Tablet (768px - 1023px):**
- Two-column layout maintained
- Slightly reduced spacing
- Touch-optimized interactions

**Mobile (<768px):**
- Single column layout
- Touch targets minimum 44px
- Simplified navigation (hamburger menu)

### Learnings from Previous Story

**From Story 1.1 (Status: review)**

**Technology Stack Installed:**
- Next.js 16.0.3 (latest stable, includes all Next.js 15 features)
- React 19.2.0
- TypeScript 5.x with strict mode enabled
- Tailwind CSS 4 configured
- ESLint 9 (flat config format)
- Prettier 3.6.2 (single quotes, 2-space indent, semicolons, 100 char max width)
- Playwright 1.56.1

**Project Structure Created:**
- app/ directory (Next.js App Router) with layout.tsx and page.tsx
- components/ directory (empty, ready for UI components)
- lib/ directory (empty, ready for utility libraries)
- types/ directory (empty, ready for TypeScript types)
- store/, hooks/ directories (empty, ready for state and hooks)

**Configuration Files:**
- next.config.ts - Next.js configuration
- tsconfig.json - TypeScript strict mode enabled
- eslint.config.mjs - ESLint 9 flat config format
- .prettierrc - Single quotes, 2-space indent, semicolons, 100 char max width
- .prettierignore - Proper ignore patterns

**Architectural Decisions Made:**
- Next.js 16 with App Router (includes all Next.js 15 features)
- TypeScript strict mode enabled
- Tailwind CSS 4 configured (will be used alongside Material UI)
- ESLint 9 flat config format (not legacy .eslintrc)
- tests/ excluded from main TypeScript build

**Pending Action Items:**
- ✅ Update app metadata to Yamazumi branding (will be completed in this story)
  - Change title from "Create Next App" to "Yamazumi"
  - Update description

**Key Files to Use/Modify:**
- app/layout.tsx - Add MUI ThemeProvider, update metadata
- components/ directory - Create ui/ and layout/ subdirectories
- lib/ directory - Create theme.ts for MUI theme configuration
- types/ directory - Create theme.ts for TypeScript theme types

**Notes:**
- Material UI will integrate seamlessly with existing Next.js 16 and TypeScript setup
- Tailwind CSS 4 already configured, will be used for utility classes alongside MUI
- All code should follow Prettier formatting standards (single quotes, 2-space indent)
- ESLint 9 flat config format requires specific MUI plugin configuration if needed

[Source: docs/sprint-artifacts/1-1-project-setup.md#Completion-Notes-List]
[Source: docs/sprint-artifacts/1-1-project-setup.md#Dev-Agent-Record]

### Implementation Notes

**Material UI Installation:**
```bash
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
```

**Theme Configuration Pattern:**
```typescript
// lib/theme.ts
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: { main: '#2563eb' },
    secondary: { main: '#64748b' },
    error: { main: '#ef4444' },
    warning: { main: '#f59e0b' },
    success: { main: '#10b981' },
    info: { main: '#3b82f6' },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'sans-serif',
    ].join(','),
  },
  spacing: 4, // Base unit: 4px
});
```

**ThemeProvider Integration:**
```typescript
// app/layout.tsx
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '@/lib/theme';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

**Component Example:**
```typescript
// components/ui/Button.tsx
import MuiButton from '@mui/material/Button';

export function Button({ variant = 'contained', ...props }) {
  return <MuiButton variant={variant} {...props} />;
}
```

### References

- [Source: docs/ux-design-specification.md#Design-System-Foundation]
- [Source: docs/ux-design-specification.md#Visual-Foundation]
- [Source: docs/ux-design-specification.md#Component-Library]
- [Source: docs/ux-design-specification.md#UX-Pattern-Decisions]
- [Source: docs/ux-design-specification.md#Accessibility-Strategy]
- [Source: docs/ux-design-specification.md#Responsive-Design]
- [Source: docs/architecture.md#ADR-002-Material-UI-Tailwind-Hybrid]
- [Source: docs/architecture.md#Implementation-Patterns]
- [Source: docs/epics.md#Story-1.4-Basic-UI-Framework-Design-System]
- [Source: docs/sprint-artifacts/1-1-project-setup.md#Completion-Notes-List]

## Dev Agent Record

### Completion Notes
**Completed:** 2025-11-20
**Definition of Done:** All acceptance criteria met, code reviewed, tests passing

### Context Reference

- docs/sprint-artifacts/1-4-basic-ui-framework-design-system.context.xml

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List
