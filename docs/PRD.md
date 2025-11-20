# Yamazumi - Product Requirements Document

**Author:** Matt
**Date:** 2025-11-12
**Version:** 1.0

---

## Executive Summary

Yamazumi transforms the difficult, error-prone stopwatch-based work element analysis into an intuitive, AI-assisted workflow that enables manufacturing teams to see waste, align on facts, and make data-driven capacity decisions. The tool replaces manual timing with precise video analysis, automatically detects work element breakpoints using Google MediaPipe, categorizes activities as value-added/non-value-added/waste, and generates interactive digital Yamazumi charts for factory-wide visibility.

**The Magic:** This isn't just a tool for individual analysis—it's a catalyst for team transformation. The moment of delight happens when the entire team (CI person, industrial engineer, and operator) sees the opportunity together on screen and collectively realizes "holy shit, we can actually do something about this." That shared "aha" moment creates excitement, alignment, and immediate action. The product's power comes from making waste visible to everyone, enabling collaborative kaizen where operators can see their own work and contribute ideas alongside engineers.

### What Makes This Special

**The Team "Holy Shit" Moment:** The product's magic isn't in individual features—it's in the collective team realization when everyone sees factory-wide opportunities together. When a CI person, industrial engineer, and operator are looking at the same Yamazumi chart, clicking through video clips, and suddenly they all see the same waste pattern—that's when they get excited and want to go work. It's the moment of shared understanding that transforms analysis into action.

**Three Pillars of Differentiation:**
1. **Educational Component:** Helps teams learn to "see" waste through visual feedback, not just provides data
2. **AI Automation:** MediaPipe-powered breakpoint detection and categorization that makes analysis 80% faster
3. **Factory-Wide Visibility:** Aggregated views across stations reveal bottlenecks and capacity potential that individual studies can't show

**The Hero is the Team:** Unlike tools built for individual analysts, Yamazumi is designed for collaborative kaizen. The CI person, industrial engineer, and operator are all heroes—each bringing different perspectives to the same shared data visualization.

---

## Project Classification

**Technical Type:** Web Application (SaaS B2B)
**Domain:** Manufacturing / Industrial Engineering
**Complexity:** Medium (Domain-specific knowledge required, but not highly regulated like healthcare/finance)

**Project Classification Details:**

This is a specialized B2B SaaS web application targeting manufacturing organizations. The domain requires understanding of industrial engineering frameworks (value-added vs. waste categorization, Yamazumi charts, work element analysis), but doesn't have the extreme regulatory complexity of healthcare or finance. The technical complexity is moderate—video processing, AI integration, and real-time visualization are challenging but achievable with modern tools.

**Key Characteristics:**
- **Target Users:** Industrial engineers, CI teams, and operators (multi-role collaboration)
- **Deployment:** Web-based, accessible from laptops and tablets
- **Data Sensitivity:** High (factory floor videos may contain proprietary processes)
- **Scale:** Multi-tenant SaaS supporting multiple manufacturing organizations
- **Integration Needs:** Potential future integration with ERP/MES systems

---

## Success Criteria

Success for Yamazumi means teams don't just analyze—they improve, measure, and prove value. The product succeeds when teams experience the full improvement cycle: see opportunity → take action → measure impact → celebrate results.

### Team Transformation Metrics

**The "Holy Shit" Moment:**
- Teams experience that shared realization when they see factory-wide opportunities together
- Teams get excited and immediately want to go work (not just analyze)
- Operators can see their own work and contribute ideas alongside engineers
- Teams align on facts through shared visualization (eliminate "that's not what I saw" debates)

**Collaborative Kaizen:**
- 100 teams actively using it for weekly kaizen sessions (not just one-time analysis)
- Teams report feeling confident identifying waste after using the tool
- Operators participate in improvement discussions using the same data as engineers
- Zero data loss during critical analysis sessions (trust is paramount)

### Performance Improvement Visibility

**The Improvement Loop:**
Success means teams can close the loop from analysis to action to measurement:

1. **See the Opportunity:** Team identifies waste through Yamazumi analysis
2. **Take Action:** Team goes to the floor and implements kaizen improvements
3. **Measure Impact:** Team returns to tool and records: "We shaved X seconds off this element, rebalanced work between stations"
4. **Prove Value:** Tool shows before/after comparison with business performance metrics

**Specific Capabilities:**
- Teams can track improvement over time: "This element was 45 seconds, now it's 32 seconds after kaizen"
- Teams can show rebalancing results: "We moved this work element from Station A to Station B, reducing bottleneck"
- Teams can see business performance impact: "We eliminated 120 seconds of waste, increasing line capacity by 15%"
- Teams can compare before/after Yamazumi charts side-by-side
- Teams can document what changed and why (kaizen notes linked to improvements)

### Process Efficiency Metrics

**Time Savings:**
- Teams complete work breakdown in under 15 minutes (vs. hours/days with stopwatch)
- 80% reduction in time study time (from days to minutes)
- AI suggestions accepted 70%+ of the time (reducing manual work)

**Accuracy & Trust:**
- Consistent, repeatable timing data (eliminate stopwatch precision errors)
- Users trust AI suggestions enough to use them (70%+ accuracy acceptable)
- Teams can identify capacity potential from factory-wide views

### Business Impact Metrics

**Factory-Wide Visibility:**
- Support analysis of 10+ stations simultaneously
- Teams can see bottlenecks across entire lines
- Teams can calculate capacity potential through waste elimination
- Teams make data-driven decisions about where to focus improvement efforts

**Kaizen Culture:**
- Teams do regular analysis (weekly/monthly) instead of rare deep dives
- Teams initiate improvement actions based on tool insights
- Teams can demonstrate improvement impact to management
- Operators engage in continuous improvement (not just engineers)

### Success Looks Like

**3 Months:**
- Teams are using the tool regularly (not just one-time)
- Teams report the tool is easier and faster than stopwatch method
- Teams have completed at least one improvement cycle: analysis → action → measurement
- Teams can show before/after improvements in the tool

**6 Months:**
- Teams are doing weekly/monthly analysis (not just quarterly)
- Teams have multiple improvement cycles documented with measurable results
- Teams are using factory-wide views to identify cross-station opportunities
- Operators are participating in kaizen discussions using the tool

**12 Months:**
- Teams can't imagine going back to stopwatch method
- Teams have measurable business performance improvements documented in the tool
- Teams are using the tool to plan capacity and make strategic decisions
- The tool has become central to the team's continuous improvement culture

---

## Product Scope

### MVP - Minimum Viable Product

**Core Principle:** Prove the magic works—single station, single cycle, single product, but with full AI categorization and visual learning.

**Must-Have Features:**

1. **Video Upload & Management:**
   - Drag-and-drop video upload from phone/laptop
   - Support common video formats (MP4, MOV from phones)
   - Handle videos 30 seconds to 10 minutes in length (typically 50-500 MB)
   - Basic organization: name/label videos by station

2. **Video Scrubbing with Breakpoint Marking:**
   - Video player with timeline scrubbing controls
   - Click, keyboard shortcut, or drag marker to mark breakpoints
   - Millisecond precision (second-level accuracy)
   - Visual timeline with breakpoint markers
   - Work element names displayed on timeline

3. **Work Element Management (Single Cycle):**
   - Name work elements before marking breakpoints (ensures consistency)
   - List of work elements with timing data
   - Individual element times and total cycle time display
   - Support for single cycle per video (multiple cycles → Phase 2)

4. **AI Breakpoint Detection (MediaPipe):**
   - Analyze video using MediaPipe for hand/pose/object detection
   - Suggest breakpoints based on hand movements (grasping = start, returning to rack = end)
   - User can accept/reject individual suggestions or accept all and adjust
   - Visual indicators showing suggested breakpoints on timeline

5. **AI Categorization with Color-Coded Waste Breakdown (MVP Priority):**
   - Analyze each work element to identify sub-activities
   - Categorize as waste (red), non-value-added (yellow), or value-added (green)
   - Detect: walking, bending, reaching, searching, waiting (waste)
   - Detect: picking up tools/parts, positioning (non-value-added)
   - Detect: actual transformation work (value-added)
   - Show percentage breakdown per element with seconds
   - **Color-coded visual indicators on timeline (MVP requirement)**
   - **Color-coded breakdown in Yamazumi chart (MVP requirement)**

6. **Basic Yamazumi Chart Generation with Waste Visualization:**
   - Generate work balance chart from breakpoint and categorization data
   - Visual representation showing work elements with timing
   - **Color-coding for waste (red), non-value-added (yellow), value-added (green)**
   - Click work element to view associated video clip
   - Display total cycle time breakdown
   - Show waste percentage and seconds per element

7. **Exception Handling:**
   - Mark exceptions/errors during cycle
   - Note issues for later analysis
   - Exclude problematic cycles from analysis

**MVP Scope Boundaries:**
- ✅ Single cycle per video (multiple cycles → Phase 2)
- ✅ Single product variant (product comparison → Phase 2)
- ✅ Single station analysis (factory-wide aggregation → Phase 2)
- ✅ Color-coded waste breakdown (MVP requirement)
- ✅ Basic improvement notes (full tracking → Phase 2)

**MVP Success Criteria:**
1. Users can upload a video and complete a work breakdown in under 15 minutes
2. AI breakpoint detection suggests breakpoints with 70%+ accuracy (user acceptance rate)
3. AI categorization identifies waste/non-value-added/value-added with 70%+ accuracy
4. Generated Yamazumi charts show color-coded waste breakdown clearly
5. Users report the tool is easier and faster than stopwatch method
6. Security: Video data is encrypted and processed securely (no leaks)
7. Tool runs smoothly on standard laptops with typical video file sizes

### Growth Features (Post-MVP - Phase 2)

**Core Principle:** Enable the full improvement loop and factory-wide visibility.

1. **Multiple Cycles Support:**
   - Mark all breakpoints for multiple cycles in same video
   - Identify "model cycle" or "most repeatable cycle"
   - Compare cycle times across cycles
   - Calculate average, min, max cycle times

2. **Product Variant Support:**
   - Distinguish between different products/variants
   - Create separate "jobs" for each product
   - Show comparisons side-by-side
   - Track impact of product differences on work

3. **Factory-Wide Aggregation:**
   - Compile multiple videos from different stations into complete operation view
   - Identify bottlenecks across entire lines
   - Show capacity potential through waste elimination
   - Enable work element rebalancing across stations
   - Interactive factory floor maps with station-level data

4. **Improvement Tracking & Before/After Comparisons:**
   - Record improvement actions: "We shaved X seconds off this element"
   - Document rebalancing: "We moved this work element from Station A to Station B"
   - Compare before/after Yamazumi charts side-by-side
   - Track improvement over time with historical data
   - Link kaizen notes to specific improvements
   - Show business performance impact: "Eliminated 120 seconds of waste, increased capacity by 15%"

5. **Enhanced Visualization:**
   - Comparison views across products, operators, time periods
   - Trend analysis and improvement tracking
   - Customizable dashboard views
   - Rock vs. Pebble classification (movable vs. fixed elements)

6. **Enhanced Security & Collaboration:**
   - End-to-end encryption for all video data
   - User management and permissions
   - Shared workspaces for teams
   - Comment and annotation features

### Vision (Future - 1-2 Years)

**Core Principle:** Industry-leading platform for continuous improvement culture.

1. **Mobile App:**
   - Record videos directly in app
   - Basic analysis on mobile device
   - Sync with web application

2. **Advanced Analytics:**
   - Predictive analytics: AI suggests specific improvements based on waste patterns
   - Industry benchmarking and best practices
   - Automated improvement recommendations

3. **Integration Ecosystem:**
   - Connect with ERP systems
   - Connect with MES systems
   - API for other software integrations

4. **Training Platform:**
   - Built-in tutorials and certification programs for industrial engineers
   - Interactive learning modules on waste identification
   - Best practices library

5. **Market Expansion:**
   - Support for warehousing and logistics contexts
   - Support for other operational contexts beyond manufacturing
   - Industry-specific versions (automotive, aerospace, electronics)

6. **Advanced AI:**
   - 90%+ accuracy in breakpoint detection and categorization
   - AI learning from user corrections
   - Custom model training per organization

7. **Operator-Facing Tools:**
   - Mobile apps that help operators see their own work
   - Operator self-analysis capabilities
   - Gamification of improvement suggestions

---

## Domain-Specific Requirements

**Manufacturing/Industrial Engineering Context:**

This domain requires understanding of Lean/Kaizen frameworks, but doesn't have extreme regulatory complexity. Key considerations:

- **Industry Standards:** Value-added/non-value-added/waste categorization (Lean framework)
- **Safety:** Video recording on factory floors requires operator consent and awareness
- **Data Sensitivity:** Factory floor videos may contain proprietary processes (security critical)
- **Operator Privacy:** Being filmed requires careful approach - operators should know they're being filmed and see the results

**Domain-Driven Requirements:**
- Accurate implementation of industrial engineering frameworks (work element analysis, Yamazumi charts)
- Support for standard manufacturing terminology (stations, lines, operators, cycles)
- Visual learning component to help teams understand waste identification
- Collaborative approach that includes operators in improvement discussions

---

## SaaS B2B Project-Specific Requirements

### Organization Structure

**Hierarchy:** Company → Site (optional) → Team → Users

**MVP Scope:**
- ✅ Single user (no multi-user in MVP)
- ✅ Basic organization structure in data model (prepare for Phase 2)
- ❌ Multi-user authentication → Phase 2
- ❌ Role-based permissions → Phase 2
- ❌ Team sharing → Phase 2

**Phase 2:**
- Multi-user support with authentication
- Team-based video sharing (videos shared within team)
- Role-based permissions (CI person, industrial engineer, operator roles)
- Company → Site → Team hierarchy

### Data Model Architecture

**Hierarchical Structure:**
```
Factory
  └── Assembly Line
      └── Station
          └── Operator
              └── Job (video analysis)
                  └── Work Elements (8 average per station)
                      └── Sub-activities (waste/non-value-added/value-added)
```

**Factory-Wide Scale (Phase 2):**
- 200 stations × 8 work elements = 1,600 work elements
- Drag-and-drop rebalancing across entire factory
- Click any element → see video clip of that work element

**MVP Data Model:**
- ✅ Station → Video → Work Elements structure
- ✅ Work elements linked to video timestamps
- ✅ Click element → play video clip
- ✅ Basic data model that supports future factory-wide aggregation
- ❌ Factory-wide aggregation → Phase 2
- ❌ Drag-and-drop rebalancing → Phase 2

**Critical MVP Requirement:**
- Data model must be designed from day one to support factory-wide aggregation (even if feature comes in Phase 2)
- Work elements must be queryable and linkable across stations
- Video clips must be accessible by work element ID

### Video Storage & Sharing

**MVP:**
- ✅ Videos belong to stations (data model)
- ✅ Videos stored in Supabase Storage
- ✅ Single user can access their own videos
- ❌ Team sharing → Phase 2
- ❌ Cross-station video access → Phase 2

**Phase 2:**
- Videos shared within team
- Any team member can click Yamazumi element → see video
- Factory-wide video access for aggregation views

### Security & Encryption

**Recommendation: Encryption in MVP (Simplified)**

**Why MVP:**
- Videos contain proprietary factory processes (security is critical from day one)
- Client-side encryption is already part of the tech stack (Web Crypto API)
- Company key approach is straightforward to implement
- Builds trust with early users (especially enterprise prospects)

**MVP Encryption Approach:**
- ✅ Client-side encryption before upload (Web Crypto API)
- ✅ Company key approach (simplified: single key per user for MVP, becomes company key in Phase 2)
- ✅ Encrypted storage in Supabase Storage
- ✅ Videos processed locally (MediaPipe in browser)
- ❌ Multi-company key management → Phase 2
- ❌ Key rotation → Phase 2

**Phase 2:**
- Full company key management
- Team-based key sharing
- Key rotation and management UI

### Video Processing Architecture

**Decision (from technical research):** Client-side processing with cloud storage

**MVP:**
- ✅ MediaPipe runs in browser (client-side)
- ✅ Videos processed locally on user's machine
- ✅ Analysis data (work elements, timings) uploaded to Supabase database
- ✅ Encrypted video files uploaded to Supabase Storage
- ✅ No server-side video processing

**Benefits:**
- Maximum security (videos never leave user's machine unencrypted)
- Zero processing costs
- Privacy compliance
- Works offline for analysis (upload happens after)

### Authentication & User Management

**MVP:**
- ✅ Single user (email/password authentication)
- ✅ Basic Supabase Auth
- ❌ Multi-user → Phase 2
- ❌ SSO → Phase 2
- ❌ Role-based access → Phase 2

**Phase 2:**
- Multi-user support
- Team invitations
- Role-based permissions (CI person, industrial engineer, operator)
- SSO options for enterprise

---

## Functional Requirements

Functional requirements are organized by capability, not technology. Each requirement connects to user value and includes acceptance criteria.

### FR1: Video Upload & Management

**Capability:** Users can upload and organize videos of factory floor operations.

**Requirements:**
1. **Video Upload:**
   - Drag-and-drop video upload from phone/laptop
   - Support common video formats: MP4, MOV (from phones)
   - Handle videos 30 seconds to 10 minutes in length (typically 50-500 MB)
   - Show upload progress and file size validation
   - Client-side encryption before upload (Web Crypto API)

2. **Video Organization:**
   - Associate video with station (required)
   - Optional: Associate with assembly line, operator name, product variant
   - Basic video metadata: filename, upload date, duration, file size
   - List of uploaded videos with thumbnail preview

**Acceptance Criteria:**
- User can upload video from phone (MP4/MOV format)
- Video uploads successfully for files 30 seconds to 10 minutes
- Video is encrypted client-side before upload
- Video is associated with a station in the data model
- User can see list of their uploaded videos

**Domain Constraints:**
- Videos must be encrypted (proprietary factory processes)
- Video quality must be sufficient for MediaPipe analysis

### FR2: Video Playback & Scrubbing

**Capability:** Users can play videos and precisely mark work element breakpoints.

**Requirements:**
1. **Video Player:**
   - Standard video player controls (play, pause, seek)
   - Timeline scrubbing with millisecond precision
   - Keyboard shortcuts for precise navigation (frame-by-frame)
   - Display current timestamp (MM:SS.mmm format)

2. **Breakpoint Marking:**
   - Click on timeline to mark breakpoint
   - Keyboard shortcut to mark breakpoint at current position
   - Drag marker to adjust breakpoint position
   - Visual markers on timeline showing all breakpoints
   - Work element names displayed on timeline segments

3. **Work Element Naming:**
   - Name work element before or after marking breakpoints
   - Ensure consistent naming across breakpoints
   - List of work elements with timing data
   - Edit/delete work elements and breakpoints

**Acceptance Criteria:**
- User can scrub video with millisecond precision
- User can mark breakpoints with second-level accuracy
- User can name work elements and see them on timeline
- User can see individual element times and total cycle time
- User can adjust breakpoint positions after marking

**Domain Constraints:**
- Breakpoints must be precise enough for accurate timing (millisecond level)
- Work element names must be consistent (naming before marking helps)

### FR3: AI-Powered Breakpoint Detection

**Capability:** AI suggests work element breakpoints based on hand movements and object interactions.

**Requirements:**
1. **MediaPipe Analysis:**
   - Analyze video using MediaPipe for hand/pose/object detection
   - Detect hand movements: grasping objects, returning to rack
   - Detect body poses: walking, bending, reaching
   - Process video client-side in browser

2. **Breakpoint Suggestions:**
   - Suggest breakpoints based on detected hand movements
   - Visual indicators on timeline showing suggested breakpoints
   - User can accept/reject individual suggestions
   - User can accept all suggestions and adjust as needed
   - Show confidence score for each suggestion (optional)

**Acceptance Criteria:**
- AI analyzes video and suggests breakpoints with 70%+ accuracy
- User can see suggested breakpoints on timeline
- User can accept/reject suggestions individually
- User can accept all and adjust positions
- Processing completes in reasonable time (under 2 minutes for 5-minute video)

**Domain Constraints:**
- AI must work in factory floor conditions (lighting, angles, gloves)
- Accuracy target: 70%+ (user will adjust as needed)
- Must work client-side for security

### FR4: AI-Powered Categorization (Priority Feature)

**Capability:** AI categorizes activities within each work element as value-added, non-value-added, or waste.

**Requirements:**
1. **Activity Detection:**
   - Analyze each work element to identify sub-activities
   - Detect waste: walking, bending, reaching, searching, waiting, idle time
   - Detect non-value-added: picking up tools/parts, positioning, preparing
   - Detect value-added: actual transformation work (assembly, installation)

2. **Categorization & Visualization:**
   - Categorize each sub-activity within work element
   - Show percentage breakdown per element: waste (red), non-value-added (yellow), value-added (green)
   - Show seconds for each category per element
   - Color-coded visual indicators on timeline
   - Color-coded breakdown in Yamazumi chart

3. **User Adjustment:**
   - User can manually adjust categorization
   - User can override AI suggestions
   - User can add notes explaining categorization

**Acceptance Criteria:**
- AI categorizes activities with 70%+ accuracy
- Color-coded breakdown visible on timeline (red/yellow/green)
- Color-coded breakdown visible in Yamazumi chart
- User can see percentage and seconds for each category
- User can adjust categorization manually

**Domain Constraints:**
- Must accurately distinguish value-added vs. waste (core differentiator)
- Visual learning component critical (helps users learn to see waste)
- Accuracy target: 70%+ (user will adjust as needed)

### FR5: Yamazumi Chart Generation

**Capability:** Generate interactive work balance charts showing work elements with timing and waste breakdown.

**Requirements:**
1. **Chart Generation:**
   - Generate work balance chart from breakpoint and categorization data
   - Visual representation: horizontal bar chart showing work elements
   - Each element shows total time and color-coded breakdown
   - Display total cycle time
   - Show waste percentage and seconds per element

2. **Interactivity:**
   - Click work element to view associated video clip
   - Hover to see detailed breakdown (waste/non-value-added/value-added seconds)
   - Zoom/pan for detailed view
   - Export chart as image (optional)

3. **Visual Design:**
   - Color-coding: waste (red), non-value-added (yellow), value-added (green)
   - Clear labels: element names, times, percentages
   - Professional appearance suitable for team presentations

**Acceptance Criteria:**
- Chart generates automatically from work element data
- Color-coded breakdown visible (red/yellow/green)
- User can click element to play video clip
- Chart shows total cycle time and waste breakdown
- Chart is visually clear and actionable

**Domain Constraints:**
- Must match standard Yamazumi chart format (industrial engineers expect this)
- Must be suitable for team presentations and kaizen discussions

### FR6: Work Element Data Management

**Capability:** Store and manage work element data with proper data model structure.

**Requirements:**
1. **Data Structure:**
   - Station → Video → Work Elements hierarchy
   - Work elements linked to video timestamps (start/end times)
   - Work elements include: name, timing, categorization breakdown
   - Data model supports future factory-wide aggregation

2. **Data Persistence:**
   - Save work element data to Supabase database
   - Link work elements to video file (encrypted in Supabase Storage)
   - Query work elements by station, video, or element ID
   - Support for future cross-station queries

3. **Data Access:**
   - Retrieve work elements for video playback
   - Retrieve work elements for Yamazumi chart generation
   - Link video clips to work element IDs (for click-to-play)

**Acceptance Criteria:**
- Work element data saved to database
- Work elements linked to video timestamps
- Data model supports querying by station/video/element
- Data model designed for future factory-wide aggregation

**Domain Constraints:**
- Data model must scale to 200 stations × 8 elements = 1,600 elements (Phase 2)
- Work elements must be queryable across stations (for factory-wide views)

### FR7: Exception Handling

**Capability:** Users can mark and handle exceptions/errors during cycle analysis.

**Requirements:**
1. **Exception Marking:**
   - Mark exceptions/errors during cycle (e.g., operator mistake, equipment issue)
   - Add notes explaining the exception
   - Exclude problematic cycles from analysis
   - Flag cycles for review

2. **Exception Management:**
   - List of exceptions with notes
   - Filter/export exception data
   - Review exceptions before finalizing analysis

**Acceptance Criteria:**
- User can mark exceptions during cycle analysis
- User can add notes explaining exceptions
- User can exclude problematic cycles from analysis
- Exceptions are tracked and can be reviewed

**Domain Constraints:**
- Exceptions are common in real factory operations
- Must preserve data integrity (don't mix good and bad cycles)

---

## Non-Functional Requirements

Non-functional requirements focus on what matters for THIS product. Only document NFRs that have specific, measurable criteria relevant to the use case.

### NFR1: Performance

**Why It Matters:** Video processing and UI responsiveness directly impact user experience. Slow processing frustrates users and reduces trust in the tool.

**Requirements:**
1. **Video Processing:**
   - Process 5-minute video in under 2 minutes (MediaPipe analysis)
   - AI breakpoint detection completes in reasonable time
   - AI categorization completes in reasonable time
   - Processing happens client-side (no server wait times)

2. **UI Responsiveness:**
   - Video playback smooth (60 FPS when possible)
   - Timeline scrubbing responsive (no lag)
   - Chart generation instant (pre-rendered data)
   - Page load time under 3 seconds

3. **Video Playback:**
   - Smooth playback for videos 30 seconds to 10 minutes
   - Efficient video streaming (chunked loading)
   - No buffering issues for typical video sizes (50-500 MB)

**Acceptance Criteria:**
- 5-minute video processes in under 2 minutes
- Video playback is smooth with no stuttering
- Timeline scrubbing is responsive (no noticeable lag)
- Chart generation is instant after data is ready

**Measurement:**
- Video processing time: < 2 minutes for 5-minute video
- UI response time: < 100ms for user interactions
- Page load time: < 3 seconds

### NFR2: Security

**Why It Matters:** Factory floor videos contain proprietary processes. Security breaches could expose entire assembly operations (e.g., Ford). Security is critical for enterprise adoption.

**Requirements:**
1. **Video Encryption:**
   - Client-side encryption before upload (Web Crypto API)
   - AES-256-GCM encryption standard
   - Company key approach (simplified for MVP: single key per user)
   - Encrypted storage in Supabase Storage
   - Videos never leave user's machine unencrypted

2. **Data Protection:**
   - Encrypted video files at rest
   - Encrypted data transmission (HTTPS)
   - Secure authentication (Supabase Auth)
   - No video data leakage (critical requirement)

3. **Processing Security:**
   - Videos processed locally (MediaPipe in browser)
   - No server-side video processing
   - Analysis data (work elements) can be uploaded (not sensitive)

**Acceptance Criteria:**
- Videos encrypted client-side before upload
- Encrypted videos stored in Supabase Storage
- Videos processed locally (no server processing)
- No unencrypted video data transmitted
- Authentication required for all access

**Measurement:**
- Encryption: AES-256-GCM standard
- Zero unencrypted video data in transit or at rest
- Security audit: No video data leakage

### NFR3: Scalability

**Why It Matters:** Data model must support factory-wide aggregation (Phase 2): 200 stations × 8 elements = 1,600 work elements. Must be designed from day one.

**Requirements:**
1. **Data Model:**
   - Designed for factory-wide aggregation from MVP
   - Work elements queryable across stations
   - Efficient queries for large datasets (1,600+ elements)
   - Database indexes for performance

2. **Storage:**
   - Support multiple videos per station
   - Support multiple stations per factory
   - Efficient video storage (compression, chunking)
   - Scalable storage architecture (Supabase Storage)

3. **Performance at Scale:**
   - Chart generation works with 1,600+ work elements
   - Factory-wide views load in reasonable time
   - Database queries optimized for cross-station access

**Acceptance Criteria:**
- Data model supports querying 1,600+ work elements
- Factory-wide aggregation queries complete in < 5 seconds
- Chart generation works with large datasets
- Storage scales to multiple factories/companies

**Measurement:**
- Query performance: < 5 seconds for factory-wide aggregation
- Chart generation: < 2 seconds for 1,600 elements
- Storage: Supports unlimited videos (within Supabase limits)

### NFR4: Usability

**Why It Matters:** Target users (industrial engineers, CI teams) may have limited technical skills. Tool must be significantly easier than stopwatch method.

**Requirements:**
1. **Intuitive Interface:**
   - Clear, simple navigation
   - Obvious actions (upload, mark breakpoints, view chart)
   - Minimal learning curve
   - Helpful tooltips and guidance

2. **Visual Feedback:**
   - Clear visual indicators (breakpoints, suggestions, categorization)
   - Color-coding consistent throughout (red/yellow/green)
   - Immediate feedback on user actions
   - Error messages are clear and actionable

3. **Workflow Efficiency:**
   - Complete work breakdown in under 15 minutes (vs. hours with stopwatch)
   - Minimal clicks to complete common tasks
   - Keyboard shortcuts for power users
   - Mobile-friendly for tablet use

**Acceptance Criteria:**
- New users can complete first analysis in under 15 minutes
- Interface is intuitive (no training required)
- Visual feedback is clear and consistent
- Tool is easier than stopwatch method (user-reported)

**Measurement:**
- Time to first analysis: < 15 minutes
- User satisfaction: > 80% report "easier than stopwatch"
- Learning curve: No training required

### NFR5: Browser Compatibility

**Why It Matters:** Users work on laptops with various browsers. Must work on standard enterprise setups.

**Requirements:**
1. **Supported Browsers:**
   - Chrome (latest 2 versions)
   - Firefox (latest 2 versions)
   - Safari (latest 2 versions)
   - Edge (latest 2 versions)

2. **Browser Features:**
   - Web Crypto API support (for encryption)
   - MediaPipe WebAssembly support
   - Video playback support (HTML5 video)
   - IndexedDB support (for local storage)

3. **Graceful Degradation:**
   - Clear error messages for unsupported browsers
   - Fallback options where possible
   - Feature detection before use

**Acceptance Criteria:**
- Works on Chrome, Firefox, Safari, Edge (latest 2 versions)
- Encryption works on all supported browsers
- MediaPipe processing works on all supported browsers
- Clear error messages for unsupported browsers

**Measurement:**
- Browser compatibility: 95%+ of target users' browsers supported
- Feature detection: All critical features checked before use

### NFR6: Accessibility

**Why It Matters:** Tool may be used in team presentations and kaizen discussions. Charts must be readable and accessible.

**Requirements:**
1. **Visual Accessibility:**
   - Color-coding not the only indicator (also use patterns/labels)
   - Sufficient color contrast (WCAG AA minimum)
   - Readable text sizes
   - Clear labels and legends

2. **Keyboard Navigation:**
   - All features accessible via keyboard
   - Logical tab order
   - Keyboard shortcuts for common actions

3. **Screen Reader Support:**
   - Semantic HTML structure
   - Alt text for images/charts
   - ARIA labels where needed

**Acceptance Criteria:**
- Color-coding supplemented with patterns/labels
   - WCAG AA contrast ratios met
   - Keyboard navigation works for all features
   - Screen reader compatible (basic support)

**Measurement:**
- Color contrast: WCAG AA standards
- Keyboard navigation: 100% of features accessible
- Screen reader: Basic compatibility (not full WCAG AAA)

---

## User Experience Principles

**Core Principle:** The UI should reinforce the team "holy shit" moment through clear, visual, collaborative design. The interface should make waste visible to everyone and enable shared understanding.

### Visual Personality

**Design Approach:**
- **Professional but approachable:** Industrial engineering tool that doesn't feel intimidating
- **Data-forward:** Charts and visualizations are the hero, not decorative UI
- **Color-coded throughout:** Consistent red/yellow/green (waste/non-value-added/value-added) across all views
- **Clean and focused:** Minimal chrome, maximum content visibility

**Visual Style:**
- Modern, clean interface (not cluttered)
- High contrast for factory floor viewing (may be viewed on tablets in bright environments)
- Professional color palette with clear waste indicators
- Charts are presentation-ready (suitable for team meetings)

### Key Interaction Patterns

**1. Video Analysis Workflow:**
- **Upload → Analyze → Review → Chart:** Clear linear progression
- **Visual timeline is central:** Breakpoints and categorization visible at a glance
- **One-click actions:** Mark breakpoint, accept suggestion, view video clip
- **Immediate feedback:** See results of actions instantly

**2. Collaborative Viewing:**
- **Shared visualization:** Multiple people can look at same chart (even in MVP, single user can share screen)
- **Click-to-play:** Intuitive interaction (click element → see video)
- **Clear labeling:** Everyone understands what they're looking at
- **Presentation mode:** Charts suitable for team discussions

**3. Learning Through Use:**
- **Visual feedback:** Color-coding helps users learn to see waste
- **Percentage breakdowns:** Quantify what users are seeing
- **Video-linked elements:** Connect abstract data to concrete actions
- **Progressive disclosure:** Show details on demand, not all at once

### Critical User Flows

**Flow 1: First-Time Analysis (MVP Goal: < 15 minutes)**
1. Upload video → See video in player
2. Click "Analyze" → AI suggests breakpoints
3. Review suggestions → Accept/adjust breakpoints
4. AI categorizes → Review color-coded breakdown
5. View Yamazumi chart → See complete analysis
6. Click elements → Watch video clips

**Flow 2: Team Discussion (Phase 2)**
1. Open Yamazumi chart → See factory-wide view
2. Click element → Play video clip
3. Discuss waste → Identify improvement opportunities
4. Document action → Record kaizen plan
5. Return later → See before/after comparison

**Flow 3: Improvement Tracking (Phase 2)**
1. View original analysis → See baseline
2. Implement kaizen → Make changes on floor
3. Record new video → Analyze improved process
4. Compare charts → See improvement impact
5. Share results → Show team the win

### Design Principles

**1. Make Waste Visible:**
- Color-coding is prominent and consistent
- Percentages and seconds are clearly displayed
- Visual indicators on timeline show waste at a glance
- Charts highlight waste opportunities

**2. Enable Shared Understanding:**
- Charts are self-explanatory (minimal legend needed)
- Video clips provide context for any element
- Labels and terminology are clear to all team members
- Presentation-ready visuals for team meetings

**3. Support Learning:**
- Visual feedback reinforces waste identification
- Tooltips explain concepts (value-added vs. waste)
- Examples and guidance help users understand
- Progressive complexity (start simple, reveal details)

**4. Facilitate Action:**
- Clear next steps after analysis
- Easy to identify improvement opportunities
- Simple to document actions and results
- Visual proof of improvement impact

---

## Implementation Planning

### Epic Breakdown Required

Requirements must be decomposed into epics and bite-sized stories (200k context limit).

**Next Step:** Run `workflow create-epics-and-stories` to create the implementation breakdown.

### Technology Stack (from Technical Research)

**Primary Stack:**
1. **AI/ML:** MediaPipe (JavaScript/Web) - `@mediapipe/tasks-vision`
2. **Frontend:** Next.js 15 - React-based full-stack framework
3. **Backend:** Supabase - PostgreSQL database, authentication, storage
4. **Video Processing:** Client-side (browser) with MediaPipe
5. **Video Storage:** Supabase Storage with client-side encryption
6. **Security:** Web Crypto API (AES-256-GCM) with company key approach

**Rationale:**
- Security: Client-side encryption maintains high security while enabling team access
- Cost: $0-25/month fits within $5k prototype budget
- Beginner-friendly: Excellent documentation and AI assistance support
- Functionality: Enables all required features including factory-wide aggregation

---

## References

### Input Documents

- **Product Brief:** `docs/brief.md` - Comprehensive product vision and requirements
- **Technical Research:** `docs/research-technical-2025-11-12.md` - Technology stack evaluation and recommendations
- **Brainstorming Results:** `docs/brainstorming-session-results.md` - Initial ideation and feature exploration

### External References

- **Google MediaPipe Documentation:** https://ai.google.dev/edge/mediapipe/solutions/guide
- **Next.js Documentation:** https://nextjs.org/docs
- **Supabase Documentation:** https://supabase.com/docs
- **Web Crypto API:** https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API

### Domain Knowledge

- **Lean Manufacturing Frameworks:** Value-added/non-value-added/waste categorization
- **Industrial Engineering:** Work element analysis, Yamazumi charts, time studies
- **Kaizen Methodology:** Continuous improvement, team-based problem solving

---

## Next Steps

1. **Epic & Story Breakdown** (Required)
   - Run: `workflow create-epics-and-stories` to decompose requirements into implementable stories
   - Break down functional requirements into development tasks
   - Prioritize MVP features for implementation

2. **UX Design** (Recommended)
   - Run: `workflow create-ux-design` for detailed user experience design
   - Create wireframes for key user flows
   - Design visual system (color-coding, typography, components)

3. **Architecture** (Recommended)
   - Run: `workflow create-architecture` for technical architecture decisions
   - Design data model for factory-wide aggregation
   - Plan security architecture and encryption implementation
   - Define API structure and integration points

---

## Product Magic Summary

**The Team "Holy Shit" Moment:** Yamazumi's magic isn't in individual features—it's in the collective team realization when everyone sees factory-wide opportunities together. When a CI person, industrial engineer, and operator are looking at the same Yamazumi chart, clicking through video clips, and suddenly they all see the same waste pattern—that's when they get excited and want to go work. It's the moment of shared understanding that transforms analysis into action.

**The Improvement Loop:** Success means teams can close the loop from analysis to action to measurement. Teams see the opportunity, take action on the floor, return to measure impact ("We shaved X seconds off this element"), and prove value with before/after comparisons. The tool becomes central to their continuous improvement culture.

**Three Pillars:**
1. **Educational Component:** Helps teams learn to "see" waste through visual feedback
2. **AI Automation:** MediaPipe-powered breakpoint detection and categorization (80% faster)
3. **Factory-Wide Visibility:** Aggregated views reveal bottlenecks and capacity potential

**The Hero is the Team:** Unlike tools built for individual analysts, Yamazumi is designed for collaborative kaizen. The CI person, industrial engineer, and operator are all heroes—each bringing different perspectives to the same shared data visualization.

---

_Created through collaborative discovery between Matt and AI facilitator (PM Agent)._

_This PRD captures the essence of Yamazumi - transforming difficult, error-prone work element analysis into an intuitive, AI-assisted workflow that enables manufacturing teams to see waste, align on facts, and make data-driven capacity decisions. The product's power comes from making waste visible to everyone, enabling collaborative kaizen where operators can see their own work and contribute ideas alongside engineers._

