# Architecture

## Executive Summary

Yamazumi is a video-based work element analysis tool built with Next.js 15, Supabase, and MediaPipe. The architecture prioritizes security (client-side encryption), performance (Web Workers for AI processing), and scalability (database aggregation for factory-wide views). The system processes videos entirely in the browser, uses cookie-based authentication, and provides real-time AI-powered categorization with user verification capabilities.

## Project Initialization

First implementation story should execute:
```bash
npx create-next-app@latest yamazumi --typescript --tailwind --app --eslint
```

This establishes the base architecture with these decisions:
- Next.js 15 with App Router
- TypeScript enabled
- Tailwind CSS configured
- ESLint configured
- Project structure (app/, components/, lib/, types/)

## Decision Summary

| Category | Decision | Version | Affects Epics | Rationale |
| -------- | -------- | ------- | ------------- | --------- |
| Frontend Framework | Next.js 15 | Latest stable | All | Full-stack framework, excellent AI assistance support, App Router for modern routing |
| Language | TypeScript | Latest stable | All | Type safety, better developer experience, catches errors early |
| UI Component Library | Material UI (MUI) | Latest stable | Epic 1, 3, 5 | Enterprise-ready, matches UX spec, built-in accessibility, stable |
| Styling | Tailwind CSS | Latest stable | All | Utility classes for custom styling alongside MUI |
| Video Player | Video.js | Latest stable | Epic 3 | Battle-tested, supports custom timeline, millisecond precision |
| Chart Library | Recharts | Latest stable | Epic 5 | React-friendly, handles stacked bar charts, good performance |
| State Management | Zustand | Latest stable | All | Lightweight, simple API, good performance, beginner-friendly |
| Backend/Database | Supabase | Latest stable | All | PostgreSQL, Auth, Storage all-in-one, excellent docs |
| API Client | @supabase/supabase-js | Latest stable | All | Official client, TypeScript support, handles auth/storage/database |
| Authentication | @supabase/ssr | Latest stable | Epic 1 | Cookie-based server-side auth, works with Next.js 15 App Router |
| AI/ML Framework | MediaPipe | Latest stable | Epic 4 | Pre-built solutions, browser support, Web Workers compatible |
| Encryption | Web Crypto API | Native | Epic 2 | Client-side encryption, AES-256-GCM, no dependencies |
| Date/Time Library | date-fns | Latest stable | All | Lightweight, modular, good TypeScript support |
| Testing (Unit) | Vitest | Latest stable | All | Faster than Jest, better ESM support, works with Next.js 15 |
| Testing (E2E) | Playwright | Latest stable | All | Essential for video/Crypto testing, real browser environment |
| Environment Validation | Zod | Latest stable | Epic 1 | Type-safe env validation, catches config errors early |
| File Upload | Supabase Storage | Latest stable | Epic 2 | Chunked upload, encrypted storage, integrated with backend |
| Error Handling | React Error Boundary + MUI Snackbar | Latest stable | All | Catches React errors, user-friendly notifications |
| Logging | Console (dev) + Log Bridge (prod) | Latest stable | All | Simple dev logging, production error tracking with rate limiting |

## Project Structure

```
yamazumi/
├── middleware.ts                  # Auth middleware (checks cookies before page renders)
├── app/                          # Next.js 15 App Router
│   ├── (auth)/                   # Auth route group
│   │   ├── login/
│   │   └── signup/
│   ├── (dashboard)/              # Protected route group
│   │   ├── dashboard/
│   │   ├── videos/
│   │   │   ├── [id]/
│   │   │   │   └── analysis/    # Video analysis page
│   │   │   └── upload/
│   │   ├── yamazumi/            # Factory-wide charts
│   │   └── layout.tsx           # Protected layout with auth
│   ├── api/                      # API routes (if needed)
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home/landing page
│
├── components/                   # React components
│   ├── ui/                       # Material UI components (wrapped)
│   ├── video/                    # Video player components
│   │   ├── VideoPlayer.tsx
│   │   ├── VideoTimeline.tsx
│   │   └── BreakpointMarker.tsx
│   ├── charts/                   # Chart components
│   │   ├── YamazumiChart.tsx
│   │   ├── StackedBarChart.tsx
│   │   └── WorkElementChart.tsx
│   ├── work-elements/            # Work element components
│   │   ├── WorkElementList.tsx
│   │   ├── WorkElementItem.tsx
│   │   └── CategorizationBadge.tsx
│   ├── upload/                   # Upload components
│   │   └── VideoUploadArea.tsx
│   └── layout/                   # Layout components
│       ├── Header.tsx
│       └── Sidebar.tsx
│
├── lib/                          # Utility libraries
│   ├── env.ts                    # Environment variable validation (Zod)
│   ├── supabase/                 # Supabase client setup
│   │   ├── client.ts             # Browser client
│   │   └── server.ts             # Server client (@supabase/ssr)
│   ├── encryption/               # Web Crypto API helpers
│   │   ├── encrypt.ts
│   │   └── decrypt.ts
│   ├── video/                    # Video time helpers (custom math)
│   │   ├── formatVideoTime.ts
│   │   └── parseVideoTime.ts
│   ├── mediapipe/                # MediaPipe integration
│   │   ├── breakpointDetection.ts
│   │   └── categorization.ts
│   ├── logging/                  # Log bridge
│   │   └── logClientError.ts     # With rate limiting
│   └── utils/                    # General utilities
│       └── date.ts               # date-fns helpers
│
├── store/                        # Zustand state management
│   ├── videoStore.ts
│   ├── workElementStore.ts
│   └── authStore.ts
│
├── types/                        # TypeScript types
│   ├── video.ts
│   ├── workElement.ts
│   ├── station.ts
│   └── supabase.ts               # Generated from Supabase
│
├── hooks/                        # Custom React hooks
│   ├── useVideoPlayer.ts
│   ├── useMediaPipe.ts
│   └── useSupabase.ts
│
├── public/                       # Static assets
│   └── mediapipe/                # MediaPipe models (if needed)
│
├── tests/                        # Test files
│   ├── unit/                     # Vitest unit tests
│   │   └── lib/
│   │       └── video/
│   │           └── formatVideoTime.test.ts
│   └── e2e/                      # Playwright E2E tests
│       ├── login.spec.ts
│       └── upload.spec.ts
│
├── .env.local                    # Environment variables (not committed)
├── .env.local.example            # Example env file (committed)
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── vitest.config.ts              # Vitest configuration
├── playwright.config.ts          # Playwright configuration
└── package.json
```

## Epic to Architecture Mapping

| Epic | Architecture Components | Key Technologies |
|------|------------------------|------------------|
| Epic 1: Foundation & Infrastructure | `app/`, `components/ui/`, `lib/supabase/`, `lib/env.ts`, `store/authStore.ts`, `middleware.ts` | Next.js 15, TypeScript, Material UI, Supabase Auth, @supabase/ssr |
| Epic 2: Secure Video Management | `components/upload/`, `lib/encryption/`, `lib/supabase/` | Supabase Storage, Web Crypto API, chunked upload |
| Epic 3: Interactive Video Analysis Workflow | `components/video/`, `lib/video/`, `store/videoStore.ts` | Video.js, custom video time helpers, Zustand |
| Epic 4: AI-Powered Work Analysis | `lib/mediapipe/`, `hooks/useMediaPipe.ts`, Web Workers | MediaPipe, Web Workers, Seek-and-Process Loop |
| Epic 5: Yamazumi Visualization & Insights | `components/charts/`, `components/work-elements/` | Recharts, Material UI, color-coded visualization |
| Epic 6: Data Management & Persistence | `lib/supabase/`, `types/`, `store/workElementStore.ts` | Supabase PostgreSQL, database aggregation queries |

## Technology Stack Details

### Core Technologies

**Frontend:**
- Next.js 15 (App Router) - Full-stack React framework
- TypeScript - Type safety and better developer experience
- Material UI (MUI) - Enterprise-ready component library
- Tailwind CSS - Utility-first CSS for custom styling
- Zustand - Lightweight state management

**Backend:**
- Supabase - PostgreSQL database, authentication, storage
- @supabase/ssr - Cookie-based server-side authentication for Next.js 15

**AI/ML:**
- MediaPipe (@mediapipe/tasks-vision) - Hand/pose/object detection
- Web Workers - Isolated AI processing to keep UI responsive

**Video:**
- Video.js - Video player with custom timeline support
- HTML5 Video Element - Hidden element for AI frame extraction

**Charts:**
- Recharts - React-friendly charting library for Yamazumi charts

**Security:**
- Web Crypto API - Client-side encryption (AES-256-GCM)
- HttpOnly Cookies - Secure session management

**Testing:**
- Vitest - Unit testing (faster, better ESM support)
- Playwright - E2E testing (essential for video/Crypto)

**Utilities:**
- date-fns - Date formatting (calendar time)
- Custom math helpers - Video time formatting (MM:SS.mmm)
- Zod - Environment variable validation

### Integration Points

**Supabase Integration:**
- Database: PostgreSQL for work elements, stations, videos
- Authentication: @supabase/ssr for cookie-based auth
- Storage: Supabase Storage for encrypted video files
- Client: @supabase/supabase-js for browser, @supabase/ssr for server

**MediaPipe Integration:**
- Web Workers: AI processing in background thread
- Main Thread: Frame extraction and UI updates
- Transferable Objects: Zero-copy frame transfer

**Video.js Integration:**
- Custom Timeline: Breakpoint markers, color-coded segments
- Playback Control: Seek-and-process loop for AI analysis
- Segment Playback: Play specific work element segments

## Novel Pattern Designs

### Pattern 1: Secure Video Upload with Client-Side Encryption

**Purpose:** Enable secure video upload with client-side encryption, providing user feedback during the encryption process.

**Upload Flow:**
1. User selects/drops video file → File validation (format, size)
2. **Encryption Phase:** Client-side encryption using Web Crypto API (AES-256-GCM)
   - Show "Encrypting..." progress state
   - Display encryption progress (percentage or spinner)
   - Estimated time: 2-5 seconds for typical video sizes (50-500 MB)
3. **Upload Phase:** Upload encrypted video to Supabase Storage
   - Show upload progress (percentage and file size)
   - Chunked upload for large files
4. **Video Ready Phase:** Save video metadata to database + Pre-decrypt video in background
   - Save metadata to database
   - **Performance Optimization:** Immediately decrypt the encrypted blob in memory (background)
   - Store decrypted blob ready for playback
   - Video is playable instantly when user clicks "Play" (no decryption delay)

**User Feedback Requirements:**
- **Encryption State:** "Encrypting video for secure upload..." with progress indicator
- **Upload State:** Standard upload progress (percentage, file size, speed)
- **Video Ready State:** "Video ready!" - video is immediately playable (pre-decrypted)
- **Error Handling:** Clear error messages for encryption or upload failures

**Technical Implementation:**
- Encryption happens in main thread (Web Crypto API)
- Upload happens after encryption completes
- **Pre-Decryption:** After upload completes, immediately decrypt the encrypted blob in background
- Store decrypted blob in memory/cache for instant playback
- Progress callbacks for both encryption and upload phases
- **Critical:** Pre-decryption must complete before showing "Video Ready" screen to ensure zero delay on play

**Performance Consideration:**
- Pre-decryption during upload completion eliminates user-perceived delay
- User clicks "Play" → Video plays instantly (decrypted blob already in memory)
- Without pre-decryption: User clicks "Play" → 2-second decryption delay → Video plays
- This optimization significantly improves perceived performance and user experience

**Affects:** Epic 2 (Secure Video Management)

---

### Pattern 2: Video-Linked Work Elements

**Purpose:** Enable clicking any work element in a Yamazumi chart to play the associated video clip.

**Components:**
- Chart component emits: `{ workElementId, videoId, startTime, endTime }`
- Video player component receives event and plays segment
- Zustand store coordinates between chart and player

**State Management:**
```typescript
videoStore: {
  currentVideo: Video | null
  currentSegment: { startTime, endTime } | null
  isLoadingVideo: boolean  // Loading state for decryption
  playbackBoundary: { startTime, endTime } | null  // Segment boundaries
  playSegment: (workElementId) => void
}
```

**Implementation:**
- Work elements include `videoId`, `startTime`, `endTime` in database
- Chart components use work element data to render clickable elements
- Click handler calls `videoStore.playSegment(workElementId)`
- Video player subscribes to store and responds to segment changes
- Playback boundary logic: Check `currentTime` in `requestAnimationFrame` loop, pause/loop at boundary

**Affects:** Epic 3 (Video Analysis), Epic 5 (Visualization)

---

### Pattern 3: Client-Side AI Video Processing Pipeline (Worker-Bridge)

**Purpose:** Process videos entirely in the browser using MediaPipe in a Web Worker, keeping the UI responsive during heavy AI processing.

**Architecture:**
- **Main Thread:** UI, Video Player, File Decryption, Frame Extraction
- **Worker Thread:** MediaPipe WASM module, AI inference, coordinate detection
- **Transferable Objects:** Zero-copy frame transfer using `postMessage`

**Processing Flow:**
1. Decrypt Video Blob → Create HTMLVideoElement (Hidden)
2. Seek-and-Process Loop:
   - `video.currentTime = timestamp`
   - Wait for `seeked` event
   - `createImageBitmap(video)` → Get Frame
   - `worker.postMessage(bitmap, [bitmap])` // Zero-copy transfer
   - `timestamp += 0.066` (15fps step)
   - Repeat until end
3. Worker processes frames with MediaPipe
4. **CRITICAL:** Worker calls `bitmap.close()` after processing to free memory
5. Main thread receives results, updates progress, batches final update

**Frame Sampling:** 15 FPS target (process every 0.066 seconds, skip frames)

**Performance:** 2x-4x realtime (5-minute video = 2-4 minutes), UI stays at 60fps

**Affects:** Epic 4 (AI-Powered Work Analysis)

---

### Pattern 4: Real-Time Categorization with Visual Feedback + Draft & Commit

**Purpose:** Categorize activities within work elements and provide immediate color-coded visual feedback with user verification capabilities.

**Data Model:**
```typescript
interface CategorizationSegment {
  category: 'waste' | 'non-value-added' | 'value-added'
  startTime: number
  endTime: number
  duration: number
  source: 'AI_ESTIMATE' | 'USER_OVERRIDE'
  confidence: number  // 0.0 to 1.0
  isVerified: boolean
  aiReason?: string  // Optional: "AI Logic: Hands idle > 2s"
}
```

**Processing:**
1. Analyze MediaPipe landmarks for activity patterns
2. Calculate confidence scores (0.0 to 1.0)
3. **Smoothing Pass:** Merge segments < 0.5 seconds into neighbors (prevents barcode problem)
4. Calculate time segments
5. **Data Integrity Check:** Normalize segments to exactly equal work element duration
6. Return with `source='AI_ESTIMATE'`, `isVerified=false`

**Visual Feedback:**
- **Ghost State (Unverified AI Results):**
  - 50% opacity
  - Dashed border (`border-style: dashed`)
  - "?" icon if confidence < 0.7 (low confidence indicator)
  - Source: `AI_ESTIMATE`, `isVerified: false`
  
- **Solid State (Verified/User Override):**
  - 100% opacity
  - Solid border (`border-style: solid`)
  - No "?" icon
  - Source: `USER_OVERRIDE` or `AI_ESTIMATE` with `isVerified: true`

**Interaction:**
- **Click-to-Cycle:** Click segment to cycle through categories (Waste → NVA → Value → Waste)
- **Right-Click:** Show AI reasoning tooltip for power users ("AI Logic: Hands idle > 2s")
- **Bulk Actions:** "Accept All" button to verify all AI suggestions at once
- **Confidence Indicators:** Display confidence score (0.0 to 1.0) on AI suggestions

**UX Requirements:**
- Define ghost (dashed) vs solid visual styles clearly
- Add "Accept All" button for bulk verification
- Display confidence indicators on AI suggestions
- Replace inline editing concept with Draft & Commit workflow

**Affects:** Epic 4 (AI-Powered Work Analysis), Epic 5 (Visualization)

---

### Pattern 5: Factory-Wide Aggregation with Macro/Micro Views

**Purpose:** Aggregate work elements from multiple stations into factory-wide views with flexible hierarchical organization.

**Hierarchy:** Section → Line → Subassembly → Station

**Macro vs. Micro Aggregation:**
- **Macro View (Factory Level):**
  - Query: `SUM(duration) GROUP BY station_id, category`
  - Result: Each station has 3 blocks (Total Waste, Total NVA, Total Value)
  - DOM Nodes: 200 stations × 3 blocks = 600 nodes (instant rendering)
- **Micro View (Zoomed/Single Station):**
  - User clicks station bar
  - Fetch raw WorkElements for just that station
  - Show detailed view with individual work elements

**Visualization:**
- Factory-wide Yamazumi chart with multiple stations side-by-side
- Color-coded breakdown per station
- Bottleneck highlighting
- Capacity potential visualization
- **View Toggle:** Waste/NVA/Value (Aggregated) vs Work Elements (Detailed)
- **Takt Time Line:** Horizontal red dotted line across chart showing target cycle time

**Performance Constraint - View Toggle:**
- **Work Elements View:** Only available when viewing < 20 stations (e.g., single Line/Section)
  - Reason: Prevents rendering thousands of DOM nodes (200 stations × ~6 work elements = 1,200+ nodes)
  - Use case: Detailed rebalancing analysis within a focused area
- **Aggregated View:** Required when viewing factory-wide (200 stations)
  - Reason: Maintains performance (200 stations × 3 categories = 600 nodes)
  - Use case: Factory-wide bottleneck identification
- **Auto-Switch Behavior:** If user is in Work Elements view and zooms out to factory level, automatically switch to Aggregated view
- **Toggle State:** Disable/hide toggle when viewing factory-wide, enable when viewing < 20 stations

**Interaction Pattern:**
- **Click-to-Zoom:** Click any station bar in macro view → Zoom to micro view for that station
- **Visual Transition:** Smooth animation/transition when zooming
- **Navigation:** Breadcrumb or back button to return to macro view
- **Context Preservation:** Maintains which station was selected
- **View Toggle:** Switch between Aggregated and Work Elements views (when < 20 stations visible)

**Takt Time Visualization:**
- **Purpose:** Show target cycle time to identify bottlenecks and capacity opportunities
- **Visual Style:** Horizontal red dotted line across the chart
- **Position:** Based on takt time value (e.g., 45 seconds = line at 45s height)
- **Label:** Display takt time value (e.g., "Takt Time: 45s") near the line
- **Appears in Factory-Wide Yamazumi Views:**
  - Micro view (single station detail)
  - Macro view (factory-wide)
  - **NOT in single video analysis view** (removed - doesn't work well in that context)
- **Interpretation:**
  - Stations/work elements above line: Over takt time (bottlenecks) - need kaizen or rebalancing
  - Stations/work elements below line: Under takt time (extra capacity) - can take on more work
- **Interaction:** 
  - **Drag to Adjust:** Click and drag line up/down to adjust takt time value
  - **Live Update:** Seconds value updates in real-time as line is dragged
  - **Snap to Line Takt Time:** When user selects a Line, line automatically snaps to that Line's takt time value
  - Tooltip on hover: "Drag to adjust takt time | Stations above this line exceed takt time"
- **Performance Optimization - Drag Overlay Pattern:**
  - **Problem:** Dragging across 200 stations (600 DOM nodes) causes re-renders on every mouse move → jumpy/laggy
  - **Solution:** Use drag overlay pattern for smooth 60fps interaction
  - **Implementation:**
    1. **During Drag:** Show simple CSS overlay line (`position: absolute`) that follows mouse cursor
    2. **No Chart Re-render:** Overlay is independent of chart component (no Recharts re-render)
    3. **On Mouse Release:** Update chart state with new takt time value (single re-render)
    4. **Visual Feedback:** Overlay line and label update in real-time during drag
  - **Result:** Smooth 60fps drag interaction, chart only re-renders once on release
- **Data Model:**
  - **Takt Time is a Line-level property** (not Station-level)
  - Stored in database at Line level: `Line.takt_time` (seconds)
  - When user selects "Main Line A", takt time line automatically positions at that Line's takt time
  - Can be calculated dynamically based on demand: `takt_time = available_production_time / customer_demand`
  - Dragging the line allows "what if" scenarios without changing stored Line.takt_time value

**UX Requirements:**
- Replace tree selector with macro/micro aggregation visualization
- Define click-to-zoom interaction on chart bars
- Provide clear visual feedback during zoom transitions
- Implement view toggle with performance constraints (disabled at factory level)
- Show tooltip/explanation when toggle is disabled
- Add takt time line visualization with interactive adjustment capability

**Affects:** Epic 6 (Data Management), Epic 5 (Visualization) - Phase 2

## Implementation Patterns

These patterns ensure consistent implementation across all AI agents:

### Naming Conventions

**Files:**
- Components: `PascalCase.tsx` (e.g., `VideoPlayer.tsx`)
- Utilities: `camelCase.ts` (e.g., `formatVideoTime.ts`)
- Hooks: `camelCase.ts` with `use` prefix (e.g., `useVideoPlayer.ts`)
- Stores: `camelCase.ts` with `Store` suffix (e.g., `videoStore.ts`)

**Components:** `PascalCase` (e.g., `VideoPlayer`, `YamazumiChart`)

**Functions:** `camelCase` (e.g., `formatVideoTime`, `handleVideoClick`)

**Variables:** `camelCase` (e.g., `currentVideo`, `workElements`)

**Constants:** `UPPER_SNAKE_CASE` (e.g., `MAX_UPLOAD_SIZE`, `FRAME_INTERVAL`)

**Database:**
- Tables: `snake_case`, plural (e.g., `work_elements`)
- Columns: `snake_case` (e.g., `station_id`, `start_time`)
- Foreign keys: `{table}_id` (e.g., `station_id`, `video_id`)

### Code Organization

**Components:** Organized by feature in folders (e.g., `components/video/`, `components/charts/`)

**Tests:** Co-located with source files (unit), separate directory (E2E)

**Imports:** External libraries → Internal utilities → Types

### Error Handling

**Strategy:** React Error Boundary + Material UI Snackbar

**Implementation:**
- Error Boundary catches React component errors
- Snackbar shows user-friendly error messages
- Retry option for recoverable errors
- Log errors to Supabase via Log Bridge (production)

### Logging Strategy

**Development:** Console logging (`console.log`, `console.error`)

**Production:**
- Log Bridge to Supabase with rate limiting (max 5 logs/min per user)
- Structured JSON format for errors
- Throttle/debounce to prevent spam

**Error Storage:** `error_logs` table in Supabase

## Consistency Rules

### Naming Conventions

See Implementation Patterns section above.

### Code Organization

- Components by feature
- Tests co-located (unit) or separate (E2E)
- Imports: External → Internal → Types

### Error Handling

React Error Boundary + Material UI Snackbar for user-facing errors. Log Bridge for production error tracking.

### Logging Strategy

Console (dev) + Log Bridge to Supabase (prod) with rate limiting. Structured JSON format.

### Date/Time Formatting

- Calendar dates: date-fns (user's local timezone)
- Video time: Custom math helper (MM:SS.mmm format, no Date objects)
- Display: Relative for recent ("2 hours ago"), absolute for older ("Nov 12, 2025 2:30 PM")

### Color Coding

- Waste: Red (#ef4444)
- Non-value-added: Yellow/Amber (#f59e0b)
- Value-added: Green (#10b981)
- Consistent across timeline, charts, and UI

## Data Architecture

### Database Schema

**Tables:**
- `stations` - Factory hierarchy (id, name, line_id, subassembly_id, section_id, user_id)
- `videos` - Video metadata (id, user_id, station_id, filename, size, upload_date, storage_path, encrypted)
- `work_elements` - Work element data (id, video_id, name, start_time, end_time, duration)
- `categorization_segments` - Categorization data (id, work_element_id, category, start_time, end_time, duration, source, confidence, is_verified, ai_reason)
- `error_logs` - Client-side error tracking (id, user_id, error_message, stack_trace, timestamp)

**Relationships:**
- Station → Video → Work Elements → Categorization Segments
- Foreign keys: `station_id`, `video_id`, `work_element_id`

**Indexes:**
- `station_id` on work_elements
- `line_id`, `subassembly_id`, `section_id` on stations
- `(station_id, category)` on categorization_segments (for macro aggregation)

### Data Models

```typescript
interface Station {
  id: string
  name: string
  lineId: string
  subassemblyId: string | null
  sectionId: string | null
  userId: string
}

interface Video {
  id: string
  userId: string
  stationId: string
  filename: string
  size: number
  uploadDate: Date
  storagePath: string
  encrypted: boolean
}

interface WorkElement {
  id: string
  videoId: string
  name: string
  startTime: number
  endTime: number
  duration: number
  categorizations: CategorizationSegment[]
}

interface CategorizationSegment {
  id: string
  workElementId: string
  category: 'waste' | 'non-value-added' | 'value-added'
  startTime: number
  endTime: number
  duration: number
  source: 'AI_ESTIMATE' | 'USER_OVERRIDE'
  confidence: number
  isVerified: boolean
  aiReason?: string
}
```

## API Contracts

**API Response Format:** Direct Supabase responses (no wrapper)

**Error Format:** Supabase error format for API errors, structured objects for client errors

**Authentication:** Cookie-based (@supabase/ssr), HttpOnly cookies

**File Upload:** Supabase Storage with chunked upload, client-side encryption before upload

## Security Architecture

**Video Encryption:**
- Client-side encryption before upload (Web Crypto API, AES-256-GCM)
- Encrypted storage in Supabase Storage
- Videos never leave user's machine unencrypted

**Authentication:**
- Cookie-based server-side auth (@supabase/ssr)
- HttpOnly cookies prevent XSS token theft
- Server checks cookies before page renders (middleware.ts)

**Data Protection:**
- Encrypted video files at rest
- Encrypted data transmission (HTTPS)
- Secure authentication (Supabase Auth)
- No video data leakage (critical requirement)

**Processing Security:**
- Videos processed locally (MediaPipe in browser)
- No server-side video processing
- Analysis data (work elements) uploaded (not sensitive)

## Performance Considerations

**Video Processing:**
- 2x-4x realtime (5-minute video = 2-4 minutes)
- Web Workers keep UI responsive (60fps maintained)
- Frame sampling: 15 FPS target (skip frames)
- Memory cleanup: `bitmap.close()` after processing

**Database Queries:**
- Macro aggregation: < 500ms for 200 stations
- Micro queries: < 100ms for single station
- Proper indexes on hierarchy fields

**Chart Rendering:**
- Macro view: 600 nodes (200 stations × 3 categories) - instant
- Micro view: 24 nodes (8 elements × 3 segments) - instant
- Recharts handles large datasets efficiently

**UI Responsiveness:**
- 60fps maintained during AI processing
- Progress bars for long operations
- Batch updates prevent multiple re-renders

## Deployment Architecture

**Hosting:** Vercel (recommended for Next.js) or any Node.js hosting

**Database:** Supabase (managed PostgreSQL)

**Storage:** Supabase Storage (encrypted video files)

**Environment Variables:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Validated with Zod in `lib/env.ts`

**Deployment Process:**
- Push to main branch → Automated build and deploy
- Environment variables configured in deployment platform
- Build errors reported clearly

## Development Environment

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn
- Git
- Supabase account

### Setup Commands

```bash
# Initialize project
npx create-next-app@latest yamazumi --typescript --tailwind --app --eslint

# Install dependencies
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
npm install video.js @videojs/themes
npm install recharts
npm install zustand
npm install @supabase/supabase-js @supabase/ssr
npm install @mediapipe/tasks-vision
npm install date-fns
npm install zod

# Development dependencies
npm install -D vitest @vitest/ui
npm install -D @testing-library/react @testing-library/jest-dom
npm install -D playwright @playwright/test

# Setup environment
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials

# Run development server
npm run dev

# Run tests
npm run test        # Vitest unit tests
npm run test:e2e    # Playwright E2E tests
```

## Architecture Decision Records (ADRs)

### ADR-001: Next.js 15 with App Router

**Status:** Accepted

**Context:** Need full-stack framework with excellent AI assistance support and modern routing.

**Decision:** Use Next.js 15 with App Router for frontend and API routes.

**Consequences:**
- **Positive:** Full-stack framework, excellent docs, App Router for modern routing
- **Negative:** Requires understanding of Server Components and App Router patterns

---

### ADR-002: Material UI + Tailwind CSS Hybrid

**Status:** Accepted

**Context:** UX spec specifies Material UI, but Next.js starter includes Tailwind.

**Decision:** Use Material UI as primary component library, Tailwind for utility classes.

**Consequences:**
- **Positive:** Matches UX spec, enterprise-ready components, utility classes for custom styling
- **Negative:** Two styling systems (manageable with clear separation)

---

### ADR-003: Cookie-Based Server-Side Authentication

**Status:** Accepted

**Context:** Next.js 15 App Router works best with server-side auth, client-side auth causes flash.

**Decision:** Use @supabase/ssr for cookie-based server-side authentication.

**Consequences:**
- **Positive:** No flash, instant page loads, HttpOnly cookies prevent XSS
- **Negative:** Requires middleware setup (simple)

---

### ADR-004: Web Workers for AI Processing

**Status:** Accepted

**Context:** MediaPipe processing is CPU-intensive and can block main thread.

**Decision:** Process videos in Web Worker using MediaPipe, keep UI responsive.

**Consequences:**
- **Positive:** UI stays at 60fps during processing, no blocking
- **Negative:** More complex setup (worth it for performance)

---

### ADR-005: Macro vs. Micro Aggregation

**Status:** Accepted

**Context:** Rendering 4,800+ SVG nodes (200 stations × 8 elements × 3 segments) causes lag.

**Decision:** Two-level aggregation - Macro (database aggregation) for factory view, Micro (detailed) on zoom.

**Consequences:**
- **Positive:** Instant rendering at factory level (600 nodes), detailed on demand
- **Negative:** Requires two query patterns (manageable)

---

### ADR-006: Draft & Commit Workflow for Categorization

**Status:** Accepted

**Context:** Users need to verify/correct AI suggestions, build trust in AI accuracy.

**Decision:** Track provenance (AI_ESTIMATE vs USER_OVERRIDE), ghost state for unverified, click-to-cycle for rapid correction.

**Consequences:**
- **Positive:** User trust, data quality, fast correction workflow
- **Negative:** More complex data model (worth it for user trust)

---

_Generated by BMAD Decision Architecture Workflow v1.3.2_  
_Date: 2025-11-12_  
_For: Matt_

