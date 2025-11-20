# UX Design Refinement Request

**Date:** 2025-11-12  
**From:** Architect (Winston)  
**To:** UX Designer  
**Subject:** Architectural Changes Requiring UX Specification Updates

---

## Overview

During the solutioning gate check, we identified several architectural decisions that impact user experience and require updates to the UX design specification. These changes are based on finalized technical patterns that differ from the original UX spec assumptions.

**Status:** Ready for implementation, but UX refinements needed to align with architectural reality.

---

## Required UX Refinements

### 1. Upload Flow: Client-Side Encryption Progress State

**Original UX Spec:**  
Drag & Drop → Upload Progress

**Architectural Reality:**  
Drag & Drop → **Client-Side Encryption** → Upload Progress

**Required UX Refinement:**
- Add "Encrypting..." progress state between file selection and upload
- Show encryption progress indicator (percentage or spinner)
- Display message: "Encrypting video for secure upload..."
- Estimated time: Encryption typically takes 2-5 seconds for typical video sizes (50-500 MB)

**Rationale:**  
Videos are encrypted client-side using Web Crypto API (AES-256-GCM) before upload. This is a critical security requirement for protecting proprietary factory processes. Users need visual feedback during this step.

**Location in UX Spec:**  
Update Section 4 (Design Direction) - Upload Flow, and any upload component specifications.

---

### 2. AI Results Display: Ghost vs Solid Visual States

**Original UX Spec:**  
"Results appear all at once"

**Architectural Reality:**  
Draft & Commit workflow with `source: 'AI_ESTIMATE'` vs `'USER_OVERRIDE'` and `isVerified: boolean` states

**Required UX Refinement:**
- **Ghost State (Unverified AI Results):**
  - 50% opacity
  - Dashed border
  - "?" icon if confidence < 0.7 (low confidence indicator)
  - Visual style: `border-style: dashed`, `opacity: 0.5`
  
- **Solid State (Verified/User Override):**
  - 100% opacity
  - Solid border
  - No "?" icon
  - Visual style: `border-style: solid`, `opacity: 1.0`

**Rationale:**  
The Draft & Commit pattern tracks AI suggestions separately from user-verified data. Visual distinction helps users understand what's verified vs. unverified, building trust in AI accuracy.

**Location in UX Spec:**  
Update Section 4 (Design Direction) - AI Categorization Results, and timeline/chart visualization specifications.

---

### 3. Correction Workflow: Draft & Commit Pattern

**Original UX Spec:**  
"Inline editing"

**Architectural Reality:**  
Draft & Commit workflow with bulk actions

**Required UX Refinement:**
- Replace inline editing concept with Draft & Commit pattern
- Add "Accept All" button for bulk verification of AI suggestions
- Add confidence indicators (0.0 to 1.0) displayed on AI suggestions
- Click-to-Cycle interaction: Click segment to cycle through categories (Waste → NVA → Value → Waste)
- Right-Click: Show AI reasoning tooltip ("AI Logic: Hands idle > 2s")
- Visual distinction between AI_ESTIMATE (ghost) and USER_OVERRIDE (solid) states

**Rationale:**  
The Draft & Commit pattern improves data quality and user trust. Users can verify AI suggestions in bulk after reviewing a few, rather than editing each one individually.

**Location in UX Spec:**  
Update Section 4 (Design Direction) - Correction/Editing Workflow, and interaction patterns.

---

### 4. Factory View: Macro/Micro Aggregation with Click-to-Zoom

**Original UX Spec:**  
"Hierarchical Tree Selector" (Material UI TreeView component)

**Architectural Reality:**  
Macro/Micro Aggregation pattern with click-to-zoom interaction

**Required UX Refinement:**
- Replace tree selector with macro/micro aggregation visualization
- **Macro View (Factory Level):**
  - Shows aggregated data: 200 stations × 3 categories = 600 chart bars
  - Each station bar shows total Waste, NVA, Value (3 stacked segments)
  - Click station bar to zoom into micro view
  
- **Micro View (Single Station):**
  - Shows individual work elements for selected station
  - Detailed breakdown with all work elements visible
  - Click to return to macro view

- **Click-to-Zoom Interaction:**
  - Click any station bar in macro view → Zoom to micro view for that station
  - Visual transition/animation for zoom effect
  - Breadcrumb or back button to return to macro view
  - Maintains context (which station was selected)

**Rationale:**  
Macro/Micro aggregation provides better performance (600 nodes vs. thousands) and clearer visualization. Click-to-zoom is more intuitive than tree navigation for factory-wide views.

**Location in UX Spec:**  
Update Section 4 (Design Direction) - Factory-Wide View, and replace tree selector references with macro/micro aggregation pattern.

---

## Implementation Priority

**High Priority (Blocking Implementation):**
1. Upload encryption progress state (Epic 2 - Story 2.2)
2. Ghost vs Solid visual states (Epic 4 - Story 4.4)
3. Draft & Commit workflow interactions (Epic 4 - Story 4.4)

**Medium Priority (Phase 2 Feature):**
4. Factory view macro/micro aggregation (Epic 5 - Phase 2)

---

## Reference Documents

- **Architecture Document:** `docs/architecture.md`
  - Pattern 2: Client-Side AI Video Processing Pipeline (lines 244-271)
  - Pattern 3: Real-Time Categorization with Visual Feedback + Draft & Commit (lines 274-310)
  - Pattern 4: Factory-Wide Aggregation (lines 313-336)
  - ADR-006: Draft & Commit Workflow (lines 680-691)

- **Current UX Spec:** `docs/ux-design-specification.md`

---

## Questions or Clarifications Needed?

Please review these architectural patterns and let me know if you need:
- Additional technical details about any pattern
- Clarification on interaction behaviors
- Design system guidance for new visual states
- Examples or mockups for any of these patterns

Once UX refinements are complete, we can proceed to implementation with full alignment between architecture and UX.

---

**Next Steps:**
1. UX Designer reviews and updates UX specification
2. Architect reviews updated UX spec for alignment
3. Proceed to implementation (sprint-planning)

---

_This refinement request ensures UX design aligns with finalized architectural decisions before implementation begins._

