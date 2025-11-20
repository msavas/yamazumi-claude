# Yamazumi - User Journey Flows

**Created:** 2025-11-12  
**Design Direction:** Dense Dashboard (Direction 2)

---

## Critical Definitions

### Work Element Definition
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

### Chart Types
- **Single Video Analysis:** Creates a **stacked bar chart** (one station, one cycle)
  - Shows work elements with color-coded waste breakdown (red/yellow/green)
  - This is NOT a full Yamazumi chart
- **Full Yamazumi Chart:** Requires multiple stations
  - Combines multiple stacked bar charts (one per station)
  - Shows factory-wide work balance across stations
  - Single video's stacked bar chart becomes one bar in the larger Yamazumi chart

### Factory Hierarchy
Users need flexible viewing based on factory structure:
- **Small factory:** View entire line (all stations together)
- **Medium factory:** View subassembly OR main line (choose level)
- **Large factory:** View sections of main line OR entire main line (choose scope)

This requires:
- Hierarchical data model (Section → Line → Subassembly → Station)
- Flexible visualization controls (user selects what to view)
- Modular input (users organize data as they input it)

---

## Flow 1: First-Time Video Analysis (MVP Goal: < 15 minutes)

### User Goal
Complete a work breakdown analysis in under 15 minutes.

### Entry Point
**Direct Analysis Screen** - User goes straight to analysis interface (no dashboard redirect)

---

### Step 1: Video Upload

**Decision:** Upload area directly on analysis screen (Option B)

**Flow:**
1. User lands on analysis screen with Direction 2 layout (two-column: video area left, sidebar right)
2. Upload area is visible on left side where video will appear
   - Large dashed border area
   - "Drag and drop video here" or "click to browse"
   - Shows supported formats: MP4, MOV • 30s - 10min
3. User uploads video (drag-and-drop or click to browse)
4. Upload area transforms into video player
5. Video appears but does NOT auto-play - user clicks play button

**Visual:**
- Upload area: Large, prominent, clear call-to-action
- After upload: Smooth transition to video player
- Video player: Taller (380px min-height) for better visibility

**Alternative Considered:**
- Button + Modal approach (Option A) - cleaner but adds extra click

---

### Step 2: AI Analysis Trigger

**Decision:** Explicit button, results all at once, inline rename capability

**Flow:**
1. After video upload, "Analyze Video" button appears
2. User clicks button to start AI processing
3. AI processes (no progress bar needed, but if accurate timing available, can show):
   - Detects breakpoints (where work elements start/end)
   - **Names work elements automatically** (e.g., "Install Bolt", "Apply Sealant")
   - Categorizes sub-activities within each element (waste/non-value-added/value-added)
4. Results appear **all at once** when processing completes:
   - Breakpoints marked on timeline
   - Work element names listed in sidebar
   - Color-coded breakdown visible

**User Control:**
- If AI names a work element incorrectly, user can **rename it inline** (click name to edit)
- User can adjust breakpoints by dragging markers on timeline
- User can adjust categorization if needed

**Visual:**
- Button: Prominent, clear action
- Processing: Brief indicator (spinner or "Processing..." text)
- Results: Appear simultaneously for immediate review

---

### Step 3: Review and Adjust AI Suggestions

**Decision:** Review all together, edit inline

**Flow:**
1. AI suggestions appear simultaneously:
   - Breakpoints marked on timeline (blue markers)
   - Work element names listed in sidebar
   - Color-coded breakdown visible on timeline and in sidebar
2. User reviews everything together (not step-by-step)
3. User can adjust inline:
   - **Breakpoints:** Click and drag markers on timeline
   - **Work element names:** Click name in sidebar to edit inline
   - **Categorization:** Click breakdown badges to adjust (if needed)
4. Changes are immediate and visible

**Visual:**
- Timeline: Color-coded segments (red/yellow/green) with breakpoint markers
- Sidebar: List of work elements with names, times, and breakdown badges
- Inline editing: Click to edit, changes save automatically

**Interaction Pattern:**
- Click work element name → text input appears → type new name → press Enter or click away
- Drag breakpoint marker → position updates → timeline recalculates
- Click breakdown badge → dropdown or inline selector appears

---

### Step 4: View Stacked Bar Chart

**Decision:** Chart appears below video player, toggle between list and chart

**Flow:**
1. After review/adjustments, user can:
   - Click "View Chart" button, OR
   - Chart appears automatically below video player
2. Stacked bar chart displays:
   - Work elements as horizontal bars
   - Color-coded breakdown (red/yellow/green segments within each bar)
   - Total cycle time displayed
3. User can **toggle between views:**
   - **List view:** Work elements in sidebar (current analysis view)
   - **Chart view:** Stacked bar chart below video player
4. User can click any element in chart to:
   - View video clip of that work element
   - Jump to that element in the timeline

**Visual:**
- Chart appears in same column as video player (below it)
- Toggle button: "List View" / "Chart View" switches between sidebar list and chart
- Chart: Horizontal bars, color-coded segments, clickable elements

**Layout:**
- **List View:** Video (left) + Work Elements Sidebar (right)
- **Chart View:** Video (left) + Stacked Bar Chart below video (left) + Work Elements Sidebar (right, smaller)

---

### Step 5: Organize Hierarchically (After Analysis)

**Decision:** Hierarchy happens after analysis, requires user input

**Flow:**
1. After analysis is complete, user assigns this analysis to:
   - **Station name** (required)
   - **Subassembly** (optional, if applicable)
   - **Line** (optional)
   - **Section** (optional, if applicable)
2. User can organize at any time (not just immediately after analysis)
3. Organization form/modal appears when user clicks "Organize" or "Assign to Station"
4. User selects from dropdowns or types names:
   - Station: Text input or dropdown
   - Subassembly: Dropdown (if exists) or "Create new"
   - Line: Dropdown (if exists) or "Create new"
   - Section: Dropdown (if exists) or "Create new"
5. This organization enables future factory-wide Yamazumi charts

**Visual:**
- Organization button: "Organize" or "Assign to Station" in analysis view
- Form: Modal or inline form with hierarchical dropdowns
- Hierarchy display: Shows current organization (e.g., "Section A > Main Line > Subassembly 1 > Station 3")

---

### Step 6: View Factory-Wide Yamazumi (When Multiple Stations Exist)

**Decision:** Hierarchical tree selector, side-by-side comparison capability

**Flow:**
1. User navigates to "Yamazumi Charts" view
2. User selects viewing level using **hierarchical tree:**
   - Tree shows: Factory → Sections → Lines → Subassemblies → Stations
   - User can expand/collapse tree nodes
   - User selects what level to view (e.g., "Main Line" or "Section A")
3. Yamazumi chart displays:
   - Multiple stations (one bar per station)
   - Each bar shows work elements with color-coded breakdown
   - Click any element to view video clip
4. **Side-by-side comparison:**
   - User can select multiple levels/sections to compare
   - Charts appear side-by-side for comparison
   - Useful for: Before/after improvements, different lines, different time periods

**Visual:**
- Hierarchical tree: Left sidebar with expandable/collapsible nodes
- Chart area: Main content area showing selected level
- Comparison mode: Multiple charts in grid layout
- Selection: Checkboxes or multi-select for comparison

**Interaction:**
- Click tree node → Chart updates to show that level
- Select multiple nodes → Comparison view appears
- Click chart element → Video clip plays in modal or side panel

---

## Flow 2: Team Discussion (Phase 2)

### User Goal
Team reviews analysis together and identifies improvement opportunities.

### Flow:
1. Open Yamazumi chart → See factory-wide view (or selected level)
2. Click element → Play video clip
3. Discuss waste → Identify improvement opportunities
4. Document action → Record kaizen plan
5. Return later → See before/after comparison

**Note:** This flow will be detailed in Phase 2 implementation.

---

## Flow 3: Improvement Tracking (Phase 2)

### User Goal
Track improvements over time and measure impact.

### Flow:
1. View original analysis → See baseline
2. Implement kaizen → Make changes on floor
3. Record new video → Analyze improved process
4. Compare charts → See improvement impact (side-by-side)
5. Share results → Show team the win

**Note:** This flow will be detailed in Phase 2 implementation.

---

## Key Design Decisions Summary

### Upload
- ✅ Upload area directly on screen (not button + modal)
- ✅ Video does NOT auto-play (user clicks play)

### AI Analysis
- ✅ Explicit "Analyze Video" button
- ✅ No progress bar (unless accurate timing available)
- ✅ Results appear all at once
- ✅ Inline rename for work elements

### Review & Adjust
- ✅ Review all together (not step-by-step)
- ✅ Edit inline (names, breakpoints, categorization)

### Chart Viewing
- ✅ Chart appears below video player
- ✅ Toggle between list view and chart view
- ✅ Click element to view video clip

### Organization
- ✅ Hierarchy happens after analysis
- ✅ Requires user input (not automatic)
- ✅ Flexible: Station → Subassembly → Line → Section

### Factory-Wide Viewing
- ✅ Hierarchical tree selector
- ✅ Side-by-side comparison capability
- ✅ Flexible level selection (sections, lines, subassemblies)

---

## Next Steps

1. **Component Design:** Design specific components (video player, timeline, work element list, chart)
2. **Interaction Details:** Define exact interactions (click, drag, hover states)
3. **Error States:** Design error handling and edge cases
4. **Empty States:** Design first-time user experience
5. **Loading States:** Design processing and loading indicators

---

_This user journey flow document captures all collaborative design decisions made during the UX design workflow._
