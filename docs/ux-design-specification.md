# Yamazumi - UX Design Specification

_Created on 2025-11-12 by Matt_  
_Generated using BMad Method - Create UX Design Workflow v1.0_

---

## Executive Summary

Yamazumi transforms difficult, error-prone stopwatch-based work element analysis into an intuitive, AI-assisted workflow that enables manufacturing teams to see waste, align on facts, and make data-driven capacity decisions. The product's power comes from making waste visible to everyone, enabling collaborative kaizen where operators can see their own work and contribute ideas alongside engineers.

**The "Holy Shit" Moment:** The product's magic isn't in individual features—it's in the collective team realization when everyone sees factory-wide opportunities together. When a CI person, industrial engineer, and operator are looking at the same Yamazumi chart, clicking through video clips, and suddenly they all see the same waste pattern—that's when they get excited and want to go work.

**Key Differentiators:**
1. **Educational Component:** Helps teams learn to "see" waste through visual feedback
2. **AI Automation:** MediaPipe-powered breakpoint detection and categorization (80% faster)
3. **Factory-Wide Visibility:** Aggregated views reveal bottlenecks and capacity potential

---

## 1. Design System Foundation

### 1.1 Design System Choice

**Approach: Material UI (MUI) + Specialized Libraries**

**Foundation: Material UI (MUI)**
- Primary component library for all standard UI components
- Provides reliability, stability, and enterprise-grade components
- Used for: Buttons, forms, inputs, navigation, dialogs, layout, typography, icons

**Custom Components (Material UI Styled):**
- **Video Timeline:** Video.js + custom React component + MUI styling
- **Yamazumi Chart:** Recharts/D3.js + custom React component + MUI styling
- **Work Element List:** Material UI List component + custom styling
- **Hierarchical Tree Selector:** Material UI TreeView component (or custom)
- **Upload Area:** Custom React component + MUI styling

**Specialized Libraries:**
- **Video.js:** Video player functionality (playback, scrubbing, controls)
- **Recharts or D3.js:** Chart rendering (stacked bar charts, Yamazumi charts)

**Rationale:**
- Maximum stability and reliability (MUI is battle-tested)
- Full control over custom components (video timeline, charts)
- No unnecessary dependencies (no shadcn/ui or Radix concerns)
- Consistent design language (everything styled to match MUI theme)
- Proven libraries for core features (Video.js, Recharts are mature)

---

## 2. Core User Experience

### 2.1 Defining Experience

**The Defining Experience:**
"The moment when users see the color-coded waste breakdown for the first time—when red/yellow/green segments appear on the timeline and in the Yamazumi chart, making waste visible and actionable."

This combines:
1. **Visual Discovery:** Seeing waste breakdown in real-time
2. **Understanding:** Connecting data to actual video moments
3. **Action:** Knowing exactly where to focus improvement efforts

**Core Experience Principles:**
- **Speed:** Fast video processing and instant visual feedback. Users see color-coded breakdown as analysis completes.
- **Guidance:** Clear visual indicators (color-coding) guide attention. Red/yellow/green segments make waste immediately visible.
- **Flexibility:** Users can adjust AI suggestions, explore details, and dive into specific work elements.
- **Feedback:** Immediate visual response. Color-coding appears on timeline and in Yamazumi chart as analysis completes.

**Desired Emotional Response:**
- **In control:** Users feel empowered to make decisions
- **Delighted and surprised:** AI reveals insights they didn't expect
- **Productive:** Getting work done faster than traditional methods

### 2.2 Work Element Definition

**Critical Definition:**
- **A work element MUST include value-added work**
- Work elements are larger chunks that contain value-added work
- Within each work element, sub-activities are categorized as:
  - **Waste (Red):** Walking, searching, waiting, idle time
  - **Non-Value-Added (Yellow):** Picking up tools/parts, positioning, preparing
  - **Value-Added (Green):** Actual transformation work (assembly, installation)

**Example:**
- "Install Bolt" is a work element (includes value-added: the actual installation)
  - Picking the bolt → Non-value-added (yellow)
  - Installing the bolt → Value-added (green) - the transformation
  - Returning tool/walking → Waste (red)

### 2.3 Chart Types

**Single Video Analysis:**
- Creates a **stacked bar chart** (one station, one cycle)
- Shows work elements with color-coded waste breakdown (red/yellow/green)
- This is NOT a full Yamazumi chart
- **Note:** Takt time line does NOT appear in single video analysis (only in factory-wide views)

**Full Yamazumi Chart:**
- Requires multiple stations
- Combines multiple stacked bar charts (one per station)
- Shows factory-wide work balance across stations
- Single video's stacked bar chart becomes one bar in the larger Yamazumi chart
- **Takt Time Line:** Appears in factory-wide views (macro and micro views only)

---

## 3. Visual Foundation

### 3.1 Color System

**Selected Theme: Professional Blue**

**Rationale:** Trustworthy, reliable, enterprise-ready - aligns perfectly with B2B manufacturing and industrial engineering context.

**Color Palette:**
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

**Interactive Visualizations:**
- Color Theme Explorer: [ux-color-themes.html](./ux-color-themes.html)

### 3.2 Typography System

**Font Families:**
- **Headings:** System font stack (San Francisco, Segoe UI, Roboto)
- **Body:** System font stack
- **Monospace:** 'SF Mono', 'Monaco', 'Consolas' (for technical data)

**Type Scale:**
- H1: 2.5rem (40px) - Page titles
- H2: 2rem (32px) - Section headers
- H3: 1.5rem (24px) - Subsection headers
- H4: 1.25rem (20px) - Card titles
- Body: 1rem (16px) - Default text
- Small: 0.875rem (14px) - Secondary text
- Tiny: 0.75rem (12px) - Labels, captions

**Font Weights:**
- 400 (regular) - Body text
- 500 (medium) - Emphasis, buttons
- 600 (semibold) - Headings, labels
- 700 (bold) - Strong emphasis

**Line Heights:**
- Body: 1.5
- Headings: 1.2

### 3.3 Spacing and Layout

**Base Unit:** 4px

**Spacing Scale:**
- 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px

**Layout Grid:**
- 12-column grid (Material UI default)

**Container Widths:**
- Desktop: max-width 1400px
- Tablet: max-width 1200px
- Mobile: full width with padding

---

## 4. Design Direction

### 4.1 Chosen Design Approach

**Selected: Direction 2 - Dense Dashboard**

**Rationale:**
- Two-column layout shows video and work elements side-by-side
- Efficient workflow: watch video and select elements simultaneously
- Information-rich: see all data at once
- Taller video player (380px) for better visibility
- Perfect for users who need to see all data at once and work quickly through multiple analyses

**Layout Pattern:**
- **Left Column (2fr):** Video player + Timeline + Chart (when toggled)
- **Right Column (1fr):** Work elements sidebar (list or chart view)

**Visual Characteristics:**
- **Layout:** Two Column
- **Density:** Dense (Information-Rich)
- **Navigation:** Top Nav
- **Visual Weight:** Information-Rich

**Interactive Mockups:**
- Design Direction Showcase: [ux-design-directions.html](./ux-design-directions.html)
- Upload Options Comparison: [ux-upload-options.html](./ux-upload-options.html)
- Chart Placement & Hierarchy Options: [ux-chart-placement-options.html](./ux-chart-placement-options.html)

---

## 5. User Journey Flows

### 5.1 Critical User Paths

**Flow 1: First-Time Video Analysis (MVP Goal: < 15 minutes)**

**Entry Point:** Direct Analysis Screen - User goes straight to analysis interface

**Step 1: Video Upload**
- Upload area directly on screen (drag-and-drop, no button)
- Large dashed border area: "Drag and drop video here" or "click to browse"
- **Step 1a: Client-Side Encryption (NEW)**
  - After file selection, encryption begins automatically
  - Show encryption progress indicator (circular spinner or percentage)
  - Display message: "Encrypting video for secure upload..."
  - Estimated time: 2-5 seconds for typical video sizes (50-500 MB)
  - Upload area shows encryption state (overlay or inline indicator)
- **Step 1b: Upload Progress**
  - After encryption completes, upload begins
  - Show upload progress indicator
- After upload completes, area transforms into video player
- Video does NOT auto-play (user clicks play)

**Step 2: AI Analysis Trigger**
- "Analyze Video" button appears after upload
- User clicks to start AI processing
- AI processes: Detects breakpoints, names work elements, categorizes sub-activities
- Results appear all at once when complete
- **AI Results Display: Ghost vs Solid States (NEW)**
  - **Ghost State (Unverified AI Results):**
    - 50% opacity (`opacity: 0.5`)
    - Dashed border (`border-style: dashed`)
    - "?" icon badge if confidence < 0.7 (low confidence indicator)
    - Applied to: Timeline segments, chart segments, work element list items
    - Source: `AI_ESTIMATE`, `isVerified: false`
  - **Solid State (Verified/User Override):**
    - 100% opacity (`opacity: 1.0`)
    - Solid border (`border-style: solid`)
    - No "?" icon
    - Applied to: All verified segments
    - Source: `USER_OVERRIDE` or `AI_ESTIMATE` with `isVerified: true`
- No progress bar (unless accurate timing available)

**Step 3: Review and Adjust (Draft & Commit Workflow)**
- AI suggestions appear simultaneously (breakpoints, names, categorization)
- All AI results display in **Ghost State** (50% opacity, dashed borders)
- User reviews all together (not step-by-step)
- **Draft & Commit Pattern (NEW):**
  - **Bulk Actions:**
    - "Accept All" button appears in toolbar/header
    - Click to verify all AI suggestions at once (converts all ghost → solid)
    - Confidence indicators (0.0 to 1.0) displayed on each AI suggestion
  - **Individual Corrections:**
    - **Click-to-Cycle:** Click any categorization segment to cycle through categories (Waste → NVA → Value → Waste)
    - **Right-Click:** Show AI reasoning tooltip (e.g., "AI Logic: Hands idle > 2s")
    - **Breakpoint Adjustment:** Drag breakpoint markers on timeline (existing behavior)
    - **Name Editing:** Click work element name to edit inline (existing behavior)
  - **Visual Feedback:**
    - User overrides immediately convert to **Solid State** (100% opacity, solid border)
    - Verified segments remain solid, unverified remain ghost
    - Changes are immediate and visible

**Step 4: View Stacked Bar Chart**
- Chart appears below video player OR replaces sidebar (toggle)
- **Decision: Chart Replaces Sidebar** - Toggle switches between list and chart in sidebar position
- Stacked bar chart shows work elements with color-coded breakdown
- Click any element to view video clip
- **Note:** Takt time line does NOT appear in single video analysis (only in factory-wide Yamazumi views)

**Step 5: Organize Hierarchically**
- After analysis, user assigns to: Station → Subassembly → Line → Section
- Organization form appears when user clicks "Organize" or "Assign to Station"
- Required user input (not automatic)
- Enables future factory-wide Yamazumi charts

**Step 6: View Factory-Wide Yamazumi (Macro/Micro Aggregation)**
- Navigate to "Yamazumi Charts" view
- **Macro View (Factory Level) - NEW:**
  - Shows aggregated data: 200 stations × 3 categories = 600 chart bars
  - Each station bar shows total Waste, NVA, Value (3 stacked segments)
  - Color-coded breakdown per station
  - Bottleneck highlighting (visual emphasis on stations with high waste)
  - **Click-to-Zoom Interaction:** Click any station bar to zoom into micro view
- **Micro View (Single Station) - NEW:**
  - Shows individual work elements for selected station
  - Detailed breakdown with all work elements visible
  - Same color-coding and interaction patterns as single video analysis
  - **Navigation:** Breadcrumb or "Back to Factory View" button to return to macro view
  - Visual transition/animation for zoom effect
  - Maintains context (which station was selected)
- **Replaced:** Hierarchical Tree Selector (removed in favor of click-to-zoom pattern)

**Detailed Flow Documentation:**
- Complete user journey flows: [ux-user-journey-flows.md](./ux-user-journey-flows.md)

---

## 6. Component Library

### 6.1 Component Strategy

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

**Custom Components (Material UI Styled):**

**1. Video Timeline Component**
- **Technology:** Video.js + custom React component + MUI styling
- **Features:** 
  - Timeline scrubbing, breakpoint markers (draggable), color-coded segments, work element labels, millisecond precision
  - **Ghost vs Solid Visual States (NEW):**
    - Ghost state segments: 50% opacity, dashed border, "?" icon if confidence < 0.7
    - Solid state segments: 100% opacity, solid border
  - **Draft & Commit Interactions (NEW):**
    - Click-to-cycle categorization on segments (Waste → NVA → Value → Waste)
    - Right-click segment for AI reasoning tooltip
    - Confidence indicators visible on hover or as badges

**2. Work Element List (Sidebar)**
- **Technology:** Material UI List component + custom styling
- **Features:** 
  - Scrollable list, inline editing for names, color-coded breakdown badges
  - Click to highlight in timeline
  - **Ghost vs Solid Visual States (NEW):**
    - Ghost state: 50% opacity, dashed border, "?" icon if confidence < 0.7
    - Solid state: 100% opacity, solid border
  - **Draft & Commit Interactions (NEW):**
    - Confidence indicators (0.0 to 1.0) on each item
    - Click-to-cycle categorization (Waste → NVA → Value → Waste)
    - Right-click for AI reasoning tooltip

**3. Stacked Bar Chart (Single Video Analysis)**
- **Technology:** Recharts or D3.js + Material UI styling
- **Features:** 
  - Horizontal bars, color-coded segments, click to view video clip, total cycle time display
  - **Note:** Takt time line does NOT appear in single video analysis view (only in factory-wide views)
  - **Ghost vs Solid Visual States (NEW):**
    - Ghost state segments: 50% opacity, dashed border, "?" icon if confidence < 0.7
    - Solid state segments: 100% opacity, solid border
  - **Draft & Commit Interactions (NEW):**
    - Click-to-cycle categorization on segments
    - Right-click segment for AI reasoning tooltip
    - Confidence indicators on hover

**4. Yamazumi Chart (Factory-Wide) - Macro/Micro Aggregation**
- **Technology:** Recharts or D3.js + Material UI styling
- **Features:** 
  - **Macro View:**
    - Multiple bars (one per station), aggregated data (200 stations × 3 categories = 600 bars)
    - Color-coded breakdown per station (Total Waste, Total NVA, Total Value)
    - Bottleneck highlighting (visual emphasis on high-waste stations)
    - **Takt Time Line:** Horizontal red dotted line showing target cycle time
      - **Appears in factory-wide Yamazumi views only** (micro view and macro view)
      - **NOT in single video analysis view**
      - Stations above line: Over takt time (bottlenecks) - need kaizen or rebalancing
      - Stations below line: Under takt time (extra capacity) - can take on more work
      - **Drag to Adjust:** Click and drag line up/down to adjust takt time value
      - **Live Update:** Seconds value updates in real-time as line is dragged
      - **Auto-Snap:** When user selects a Line, line automatically snaps to that Line's takt time value
      - Label displays takt time value (e.g., "Takt Time: 45s") and updates as line is dragged
      - **Data Model:** Takt time is a Line-level property (stored at Line level, not Station level)
    - **Click-to-Zoom:** Click any station bar to zoom into micro view
  - **Micro View:**
    - Individual work elements for selected station
    - Detailed breakdown with all work elements visible
    - **Takt Time Line:** Visible in micro view for context (same as macro view)
    - Click element to view video clip
  - **Navigation:**
    - Breadcrumb or "Back to Factory View" button
    - Smooth zoom transition animation
    - Context preservation (maintains selected station)

**5. ~~Hierarchical Tree Selector~~ (REPLACED)**
- **Status:** Removed in favor of Macro/Micro Aggregation pattern
- **Reason:** Click-to-zoom provides better performance (600 nodes vs. thousands) and clearer visualization

**6. Upload Area**
- **Technology:** Custom React component + Material UI styling
- **Features:** 
  - Drag-and-drop zone, click to browse, file validation
  - **Client-Side Encryption State (NEW):**
    - Encryption progress indicator (circular spinner or percentage)
    - Message: "Encrypting video for secure upload..."
    - Estimated time display (2-5 seconds typical)
    - Visual state overlay during encryption
  - Upload progress indicator (after encryption completes)

**Specialized Libraries:**
- **Video.js:** Video player functionality
- **Recharts or D3.js:** Chart rendering

---

## 7. Visual States & Interaction Patterns

### 7.1 Ghost vs Solid Visual States

**Purpose:** Distinguish between unverified AI suggestions and user-verified data, building trust in AI accuracy while maintaining clear visual hierarchy.

**Ghost State (Unverified AI Results):**
- **Visual Style:**
  - Opacity: 50% (`opacity: 0.5`)
  - Border: Dashed (`border-style: dashed`, 2px width)
  - Border color: Category color (red/yellow/green) at 50% opacity
  - Background: Category color at 20% opacity
- **Low Confidence Indicator:**
  - "?" icon badge appears if confidence < 0.7
  - Position: Top-right corner of segment/element
  - Tooltip on hover: "Low confidence - please verify"
- **Applied To:**
  - Timeline categorization segments
  - Chart segments (stacked bar, Yamazumi)
  - Work element list items
  - All elements with `source: 'AI_ESTIMATE'`, `isVerified: false`

**Solid State (Verified/User Override):**
- **Visual Style:**
  - Opacity: 100% (`opacity: 1.0`)
  - Border: Solid (`border-style: solid`, 2px width)
  - Border color: Category color (red/yellow/green) at full opacity
  - Background: Category color at full opacity
- **No "?" Icon:**
  - Confidence indicators may still be visible on hover, but no warning badge
- **Applied To:**
  - All user-verified segments
  - All user-overridden segments
  - Elements with `source: 'USER_OVERRIDE'` or `AI_ESTIMATE` with `isVerified: true`

**Rationale:**
- Ghost state signals "this is AI's best guess, please verify"
- Solid state signals "this is confirmed data"
- Visual distinction helps users quickly identify what needs review
- Low confidence indicator draws attention to segments requiring verification

### 7.2 Draft & Commit Workflow

**Purpose:** Enable efficient bulk verification of AI suggestions while maintaining individual correction capabilities.

**Bulk Actions:**
- **"Accept All" Button:**
  - Location: Toolbar/header above work elements or chart
  - Label: "Accept All AI Suggestions"
  - Action: Converts all ghost state segments to solid state
  - Updates: Sets `isVerified: true` for all `AI_ESTIMATE` segments
  - Visual feedback: Toast notification "All AI suggestions accepted"
  - Keyboard shortcut: `Ctrl/Cmd + A` (when focus is on review area)

**Individual Corrections:**
- **Click-to-Cycle Categorization:**
  - Click any categorization segment (timeline, chart, or list)
  - Cycles through: Waste (Red) → Non-Value-Added (Yellow) → Value-Added (Green) → Waste
  - Immediate visual update (ghost → solid on first click)
  - Updates: Sets `source: 'USER_OVERRIDE'`, `isVerified: true`
  - Visual feedback: Segment immediately converts to solid state

- **Right-Click for AI Reasoning:**
  - Right-click any ghost state segment
  - Tooltip displays: "AI Logic: [reasoning text]"
  - Example: "AI Logic: Hands idle > 2s"
  - Helps users understand why AI made the categorization
  - Builds trust and enables learning

- **Confidence Indicators:**
  - Display format: Decimal (0.0 to 1.0) or percentage (0% to 100%)
  - Location: Hover tooltip or small badge on segment
  - Color coding:
    - High (≥0.7): Green indicator
    - Medium (0.4-0.69): Yellow indicator
    - Low (<0.4): Red indicator + "?" badge
  - Helps users prioritize which segments to review first

**Breakpoint Adjustment:**
- Drag breakpoint markers on timeline (existing behavior)
- Updates work element boundaries
- Maintains ghost/solid state based on source

**Name Editing:**
- Click work element name to edit inline (existing behavior)
- Maintains ghost/solid state based on categorization source

**Rationale:**
- Bulk actions enable fast workflow for high-confidence AI results
- Individual corrections maintain precision for edge cases
- AI reasoning tooltips build user trust and understanding
- Confidence indicators help users prioritize review efforts

### 7.3 Macro/Micro Aggregation Pattern

**Purpose:** Provide factory-wide visibility with efficient performance and intuitive navigation.

**Macro View (Factory Level):**
- **Data Aggregation:**
  - Query: `SUM(duration) GROUP BY station_id, category`
  - Result: 200 stations × 3 categories = 600 chart bars
  - Each station bar shows: Total Waste, Total NVA, Total Value (3 stacked segments)
- **Visualization:**
  - Vertical stacked bar chart (traditional Yamazumi format)
  - One bar per station
  - Color-coded breakdown (red/yellow/green)
  - Bottleneck highlighting (visual emphasis on stations with high waste percentage)
  - **Takt Time Line:** Horizontal red dotted line across chart
    - Visual style: `border-top: 2px dashed #ef4444`
    - Position: Based on takt time value (e.g., 45 seconds)
    - Label: "Takt Time: 45s" displayed near line (updates in real-time as line is dragged)
    - Interpretation:
      - Stations above line: Over takt time (bottlenecks) - need kaizen or rebalancing
      - Stations below line: Under takt time (extra capacity) - can take on more work
    - **Data Model:** Takt time is a Line-level property (stored at Line level in database)
    - **Auto-Snap:** When user selects a Line, line automatically positions at that Line's takt time value
- **Interaction:**
  - **Click-to-Zoom:** Click any station bar to zoom into micro view
  - **Takt Time Drag:** Click and drag takt time line up/down to adjust value (for "what if" scenarios)
    - Seconds value updates in real-time as line is dragged
    - Visual feedback: Line follows cursor, label updates continuously
    - **Performance:** Uses drag overlay pattern - CSS overlay during drag, chart re-renders only on mouse release (ensures 60fps smoothness)
  - Hover: Show station name and total cycle time
  - Hover takt line: Tooltip "Drag to adjust takt time | Stations above this line exceed takt time"
  - Cursor changes to "grab" (open hand) when hovering over line, "grabbing" (closed hand) when dragging
  - No tree navigation required

**Micro View (Single Station):**
- **Data Detail:**
  - Fetches raw WorkElements for selected station only
  - Shows individual work elements with full breakdown
  - Same visualization patterns as single video analysis
- **Visualization:**
  - Detailed stacked bar chart or work element list
  - All work elements visible with categorization
  - **Takt Time Line:** Horizontal red dotted line visible for context
    - Same behavior as macro view (drag to adjust, auto-snap to Line's takt time)
  - Click element to view video clip (existing behavior)
- **Navigation:**
  - Breadcrumb: "Factory View > [Station Name]"
  - "Back to Factory View" button
  - Smooth zoom transition animation (300ms ease-in-out)
  - Maintains context (which station was selected)

**Rationale:**
- Macro view provides instant factory-wide overview (600 nodes vs. thousands)
- Click-to-zoom is more intuitive than tree navigation
- Performance optimized (only loads detailed data when needed)
- Clear visual hierarchy (macro → micro)

---

## 8. UX Pattern Decisions

### 8.1 Consistency Rules

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
- **Encryption Progress (NEW):** Circular spinner or percentage indicator during client-side encryption (2-5 seconds typical)

**Form Patterns:**
- **Label position:** Above input field
- **Required field indicator:** Asterisk (*) after label
- **Validation timing:** On blur (when user leaves field), real-time for inline editing
- **Error display:** Inline below input field, red text (#ef4444)
- **Help text:** Caption below input field, gray text (#64748b)

**Modal Patterns:**
- **Size variants:** Small (400px), Medium (600px), Large (1200px)
- **Dismiss behavior:** Click outside closes, Escape key closes, X button always available
- **Focus management:** Auto-focus first input field, focus trap, return focus on close
- **Stacking:** Only one modal open at a time

**Navigation Patterns:**
- **Active state:** Underline or background highlight, primary blue (#2563eb)
- **Breadcrumb usage:** Show when viewing hierarchical data, clickable to navigate up
- **Back button:** Browser back works normally, in-app back returns to previous view
- **Deep linking:** Support URLs for specific analyses, charts, stations

**Empty State Patterns:**
- **First use:** Upload area visible with clear instructions
- **No results:** "No work elements found" with suggested next action
- **Cleared content:** Show empty state with undo option (if applicable)

**Confirmation Patterns:**
- **Delete:** Always confirm with modal dialog, "Cancel" (secondary) and "Delete" (destructive/red)
- **Leave unsaved:** Warn if user tries to leave with unsaved changes
- **Irreversible actions:** Clear warning, explain consequences, require explicit confirmation

**Notification Patterns:**
- **Placement:** Top-right corner (toast notifications)
- **Duration:** Success (3s auto-dismiss), Error (manual dismiss), Info (5s auto-dismiss)
- **Stacking:** Stack vertically, max 3 visible, smooth slide-in animation

**Search Patterns:**
- **Trigger:** Manual (user types in search box)
- **Results display:** Instant results as user types (debounced), highlight matching text
- **Filters:** Available in search results view, sidebar or dropdown filters
- **No results:** "No results found" message with suggestions

**Date/Time Patterns:**
- **Format:** Relative ("2 hours ago") for recent, absolute ("Nov 12, 2025 2:30 PM") for older
- **Timezone:** User's local timezone (browser default)
- **Pickers:** Material UI DatePicker component, calendar view

---

## 9. Responsive Design & Accessibility

### 9.1 Responsive Strategy

**Target Devices:**
- **Primary:** Desktop/laptop browsers (Chrome, Firefox, Safari, Edge)
- **Secondary:** Tablets (for factory floor viewing, popularity uncertain)
- **Future:** Mobile (further down the road)

**Breakpoint Strategy:**

**Desktop (≥1024px):**
- Full two-column layout (video + sidebar)
- All features visible
- Optimal viewing experience
- Video player: 380px height

**Tablet (768px - 1023px):**
- Two-column layout maintained
- Slightly reduced spacing
- Touch-optimized interactions
- Sidebar may need scrolling
- Video player: 300px height

**Mobile (<768px):**
- Single column layout
- Video player full width
- Sidebar becomes bottom sheet or full-screen overlay
- Touch targets minimum 44px
- Simplified navigation (hamburger menu)

**Adaptation Patterns:**

**Navigation:**
- Desktop: Top navigation bar
- Tablet: Top navigation (same)
- Mobile: Hamburger menu or bottom navigation

**Video Player:**
- Desktop: 380px height, side-by-side with sidebar
- Tablet: 300px height, side-by-side maintained
- Mobile: Full width, stacked above content

**Sidebar (Work Elements):**
- Desktop: Fixed width sidebar, scrollable
- Tablet: Slightly narrower, scrollable
- Mobile: Bottom sheet or full-screen overlay

**Charts:**
- Desktop: Full sidebar width
- Tablet: Full sidebar width (may need horizontal scroll for wide charts)
- Mobile: Full width, stacked below video

**Macro/Micro Factory View:**
- Desktop: Full-width macro view, click-to-zoom to micro view
- Tablet: Full-width macro view, touch-optimized click-to-zoom
- Mobile: Full-width macro view, full-screen micro view overlay

### 9.2 Accessibility Strategy

**WCAG Compliance Target: WCAG 2.1 Level AA**

**Rationale:**
- B2B enterprise application
- May be used in team presentations
- Professional tool requiring accessibility
- Level AA is the recommended standard

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
- Keyboard shortcuts:
  - Space/Enter: Play/pause video
  - Arrow keys: Navigate timeline
  - Tab: Navigate between elements

**Screen Reader Support:**
- Semantic HTML structure
- ARIA labels for interactive elements
- Alt text for meaningful images
- Live regions for dynamic content (AI processing status)
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
- Skip links for main content

**Touch Targets:**
- Minimum 44px × 44px for mobile/tablet
- Adequate spacing between interactive elements
- Touch-friendly controls on video player

**Error Identification:**
- Clear, descriptive error messages
- Errors announced to screen readers
- Suggestions for fixing errors

**Testing Strategy:**
- **Automated:** Lighthouse accessibility audit, axe DevTools
- **Manual:** Keyboard-only navigation testing
- **Screen reader:** NVDA (Windows) or VoiceOver (Mac) testing
- **Color contrast:** WebAIM Contrast Checker

---

## 10. Implementation Guidance

### 10.1 Completion Summary

**What We Created Together:**

- **Design System:** Material UI (MUI) foundation with custom components for video timeline and Yamazumi charts
- **Visual Foundation:** Professional Blue color theme with complete typography and spacing system
- **Design Direction:** Dense Dashboard (Direction 2) - Two-column layout optimized for efficient video analysis workflow
- **User Journeys:** Complete flow for first-time video analysis with all interaction patterns defined
- **UX Patterns:** Comprehensive consistency rules for buttons, feedback, forms, modals, navigation, and more
- **Visual States:** Ghost vs Solid states for AI verification workflow with confidence indicators
- **Draft & Commit Workflow:** Bulk verification and individual correction patterns for AI results
- **Macro/Micro Aggregation:** Factory-wide views with click-to-zoom navigation pattern
- **Responsive Strategy:** Breakpoint strategy for desktop, tablet, and mobile with adaptation patterns
- **Accessibility:** WCAG 2.1 Level AA compliance requirements defined

**Architectural Refinements (v1.1):**
- Client-side encryption progress state in upload flow
- Ghost/Solid visual states for AI verification
- Draft & Commit workflow replacing inline editing
- Macro/Micro aggregation replacing hierarchical tree selector

**Key Design Decisions:**

1. **Upload:** Upload area directly on screen (drag-and-drop, no button) → **Client-side encryption progress state added**
2. **AI Analysis:** Explicit button trigger, results all at once → **Ghost vs Solid visual states for verified/unverified results**
3. **Review:** Draft & Commit workflow with bulk "Accept All" and click-to-cycle categorization (replaces inline editing)
4. **Chart Placement:** Chart replaces sidebar, toggle between list and chart views
5. **Factory View:** Macro/Micro aggregation with click-to-zoom (replaces hierarchical tree selector)
6. **Work Element Definition:** Must include value-added work, with sub-activities categorized within
7. **Chart Types:** Single video = stacked bar chart, multiple stations = full Yamazumi chart
8. **Visual States:** Ghost (50% opacity, dashed) for unverified AI results, Solid (100% opacity, solid) for verified/user overrides
9. **AI Trust Building:** Confidence indicators (0.0-1.0) and AI reasoning tooltips on right-click

**Your Deliverables:**

- **UX Design Specification:** `docs/ux-design-specification.md` (this document)
- **Interactive Color Themes:** `docs/ux-color-themes.html`
- **Design Direction Mockups:** `docs/ux-design-directions.html`
- **Upload Options Comparison:** `docs/ux-upload-options.html`
- **Chart Placement & Hierarchy Options:** `docs/ux-chart-placement-options.html`
- **User Journey Flows:** `docs/ux-user-journey-flows.md`

**What Happens Next:**

- Designers can create high-fidelity mockups from this foundation
- Developers can implement with clear UX guidance and rationale
- All your design decisions are documented with reasoning for future reference

You've made thoughtful choices through visual collaboration that will create a great user experience. Ready for design refinement and implementation!

---

## Appendix

### Related Documents

- Product Requirements: `docs/PRD.md`
- Product Brief: `docs/brief.md`
- Brainstorming: `docs/brainstorming-session-results.md`
- Technical Research: `docs/research-technical-2025-11-12.md`
- Epics Breakdown: `docs/epics.md`

### Core Interactive Deliverables

This UX Design Specification was created through visual collaboration:

- **Color Theme Visualizer**: [ux-color-themes.html](./ux-color-themes.html)
  - Interactive HTML showing all color theme options explored
  - Live UI component examples in each theme
  - Side-by-side comparison and semantic color usage

- **Design Direction Mockups**: [ux-design-directions.html](./ux-design-directions.html)
  - Interactive HTML with 6 complete design approaches
  - Full-screen mockups of key screens
  - Design philosophy and rationale for each direction
  - Shows 12 work elements to demonstrate realistic complexity

- **Upload Options Comparison**: [ux-upload-options.html](./ux-upload-options.html)
  - Side-by-side comparison of upload approaches
  - Button + Modal vs. Upload Area on Screen

- **Chart Placement & Hierarchy Options**: [ux-chart-placement-options.html](./ux-chart-placement-options.html)
  - Three options for stacked bar chart placement
  - Three options for factory hierarchy selection
  - Visual mockups for each approach

- **User Journey Flows**: [ux-user-journey-flows.md](./ux-user-journey-flows.md)
  - Complete documentation of critical user paths
  - Step-by-step flow design with interaction patterns
  - Work element definition and chart type clarifications

### Next Steps & Follow-Up Workflows

This UX Design Specification can serve as input to:

- **Wireframe Generation Workflow** - Create detailed wireframes from user flows
- **Figma Design Workflow** - Generate Figma files via MCP integration
- **Interactive Prototype Workflow** - Build clickable HTML prototypes
- **Component Showcase Workflow** - Create interactive component library
- **AI Frontend Prompt Workflow** - Generate prompts for v0, Lovable, Bolt, etc.
- **Solution Architecture Workflow** - Define technical architecture with UX context

### Version History

| Date       | Version | Changes                         | Author |
| ---------- | ------- | ------------------------------- | ------ |
| 2025-11-12 | 1.0     | Initial UX Design Specification | Matt   |
| 2025-11-12 | 1.1     | Architectural refinements: Client-side encryption progress, Ghost/Solid visual states, Draft & Commit workflow, Macro/Micro aggregation | UX Designer |

---

_This UX Design Specification was created through collaborative design facilitation, not template generation. All decisions were made with user input and are documented with rationale._
