# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Yamazumi is a video-based work element analysis tool for manufacturing process improvement. The application enables users to upload videos of manufacturing processes, analyze work elements with AI-powered assistance, and generate visual Yamazumi charts to identify waste and optimize workflows.

**Key Innovation:** This tool transforms stopwatch-based work element analysis into an intuitive, AI-assisted workflow that creates collaborative "holy shit" moments where teams (CI person, industrial engineer, operator) see waste together and align on data-driven improvements.

## Development Commands

### Development Server
```bash
npm run dev                # Start dev server at http://localhost:3000
npm run build              # Build for production
npm start                  # Start production server
npm run lint               # Run ESLint
```

### Testing
```bash
npm run test:e2e           # Run all Playwright E2E tests
npm run test:e2e:ui        # Run tests with Playwright UI
npm run test:e2e:headed    # Run tests in headed mode (visible browser)
npm run test:e2e:debug     # Run tests in debug mode
npm run test:e2e:report    # View test report
```

Note: Unit tests with Vitest will be configured in future stories.

## Technology Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Material UI (MUI)
- **State Management:** Zustand (to be added)
- **Backend:** Supabase (PostgreSQL, Auth, Storage)
- **Testing:** Playwright (E2E), Vitest (Unit - to be configured)
- **Video:** Video.js
- **Charts:** Recharts
- **AI/ML:** MediaPipe (@mediapipe/tasks-vision)

## Architecture Highlights

### Security-First Design

**Client-Side Encryption:**
- Videos are encrypted client-side using Web Crypto API (AES-256-GCM) before upload
- Videos never leave user's machine unencrypted (critical requirement)
- Encrypted storage in Supabase Storage
- Pre-decryption optimization: Decrypt during upload completion for instant playback

**Authentication:**
- Cookie-based server-side auth using @supabase/ssr (not client-side)
- HttpOnly cookies prevent XSS token theft
- Middleware checks auth before page renders (no flash)

### Performance Patterns

**Client-Side AI Processing (Worker-Bridge Pattern):**
- MediaPipe runs in Web Workers to keep UI responsive (60fps maintained)
- Seek-and-Process Loop for video frame extraction at 15 FPS
- Zero-copy frame transfer using Transferable Objects
- Critical: Call `bitmap.close()` after processing to free memory
- Expected performance: 2x-4x realtime (5-minute video = 2-4 minutes)

**Factory-Wide Visualization (Macro/Micro Aggregation):**
- **Macro View:** Database aggregation (`SUM(duration) GROUP BY station_id, category`) for factory-wide (200+ stations)
  - Renders 600 DOM nodes (200 stations × 3 categories) - instant
- **Micro View:** Detailed work elements only when viewing < 20 stations
  - Prevents rendering thousands of nodes
  - Click station bar to zoom into detailed view
- **Takt Time Line:** Interactive horizontal line with drag overlay pattern for 60fps dragging
  - Drag overlay during interaction (no chart re-render)
  - Update chart state on mouse release (single re-render)

### Novel Data Patterns

**Video-Linked Work Elements:**
- Work elements include `videoId`, `startTime`, `endTime` in database
- Click any element in Yamazumi chart to play associated video clip
- Zustand store coordinates between chart and video player
- Playback boundary logic uses `requestAnimationFrame` loop

**Real-Time Categorization with Draft & Commit:**
```typescript
interface CategorizationSegment {
  category: 'waste' | 'non-value-added' | 'value-added'
  startTime: number
  endTime: number
  duration: number
  source: 'AI_ESTIMATE' | 'USER_OVERRIDE'
  confidence: number  // 0.0 to 1.0
  isVerified: boolean
  aiReason?: string
}
```

**Visual States:**
- **Ghost State (Unverified AI):** 50% opacity, dashed border, "?" icon if confidence < 0.7
- **Solid State (Verified/User Override):** 100% opacity, solid border

**Interactions:**
- Click-to-cycle: Click segment to cycle through categories (Waste → NVA → Value → Waste)
- Right-click: Show AI reasoning tooltip
- "Accept All" button for bulk verification

## Project Structure

```
yamazumi/
├── middleware.ts              # Auth middleware (cookie checks)
├── app/                      # Next.js 15 App Router
│   ├── (auth)/               # Auth route group (login, signup)
│   ├── (dashboard)/          # Protected routes (dashboard, videos, yamazumi)
│   │   └── videos/[id]/analysis/  # Video analysis page
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Landing page
├── components/               # React components by feature
│   ├── ui/                   # Material UI components (wrapped)
│   ├── video/                # VideoPlayer, VideoTimeline, BreakpointMarker
│   ├── charts/               # YamazumiChart, StackedBarChart, WorkElementChart
│   ├── work-elements/        # WorkElementList, CategorizationBadge
│   ├── upload/               # VideoUploadArea
│   └── layout/               # Header, Sidebar
├── lib/                      # Utility libraries
│   ├── env.ts                # Environment validation (Zod)
│   ├── supabase/             # client.ts (browser), server.ts (@supabase/ssr)
│   ├── encryption/           # encrypt.ts, decrypt.ts (Web Crypto API)
│   ├── video/                # formatVideoTime.ts (MM:SS.mmm), parseVideoTime.ts
│   ├── mediapipe/            # breakpointDetection.ts, categorization.ts
│   ├── logging/              # logClientError.ts (with rate limiting)
│   └── utils/                # date.ts (date-fns helpers)
├── store/                    # Zustand state management
│   ├── videoStore.ts
│   ├── workElementStore.ts
│   └── authStore.ts
├── types/                    # TypeScript types
│   ├── video.ts
│   ├── workElement.ts
│   ├── station.ts
│   └── supabase.ts           # Generated from Supabase
├── hooks/                    # Custom React hooks
│   ├── useVideoPlayer.ts
│   ├── useMediaPipe.ts
│   └── useSupabase.ts
├── tests/
│   ├── unit/                 # Vitest unit tests (to be configured)
│   └── e2e/                  # Playwright E2E tests
├── docs/                     # Project documentation
│   ├── architecture.md       # Technical architecture decisions (32KB)
│   ├── PRD.md                # Product requirements (43KB)
│   ├── epics.md              # Feature breakdown (39KB)
│   └── ux-design-specification.md  # UX design spec
└── .bmad/                    # BMad Method Module workflows
    ├── core/                 # Core workflows and agents
    ├── bmm/                  # BMad Method orchestration
    └── bmb/                  # BMad Builder workflows
```

## Database Schema

**Hierarchy:** Section → Line → Subassembly → Station

**Tables:**
- `stations` - Factory hierarchy (id, name, line_id, subassembly_id, section_id, user_id)
- `videos` - Video metadata (id, user_id, station_id, filename, size, upload_date, storage_path, encrypted)
- `work_elements` - Work element data (id, video_id, name, start_time, end_time, duration)
- `categorization_segments` - Categorization data (id, work_element_id, category, start_time, end_time, duration, source, confidence, is_verified, ai_reason)
- `error_logs` - Client-side error tracking

**Indexes:**
- `station_id` on work_elements
- `line_id`, `subassembly_id`, `section_id` on stations
- `(station_id, category)` on categorization_segments (for macro aggregation)

## Naming Conventions

**Files:**
- Components: `PascalCase.tsx` (e.g., `VideoPlayer.tsx`)
- Utilities: `camelCase.ts` (e.g., `formatVideoTime.ts`)
- Hooks: `camelCase.ts` with `use` prefix (e.g., `useVideoPlayer.ts`)
- Stores: `camelCase.ts` with `Store` suffix (e.g., `videoStore.ts`)

**Code:**
- Components: `PascalCase`
- Functions: `camelCase`
- Variables: `camelCase`
- Constants: `UPPER_SNAKE_CASE`

**Database:**
- Tables: `snake_case`, plural (e.g., `work_elements`)
- Columns: `snake_case` (e.g., `station_id`, `start_time`)
- Foreign keys: `{table}_id` (e.g., `station_id`, `video_id`)

## Color Coding (Consistent Across UI)

- **Waste:** Red (#ef4444)
- **Non-value-added:** Yellow/Amber (#f59e0b)
- **Value-added:** Green (#10b981)

Applied consistently across video timeline, charts, and categorization UI.

## Date/Time Formatting

- **Calendar dates:** date-fns (user's local timezone)
- **Video time:** Custom math helper (`formatVideoTime.ts`) - MM:SS.mmm format, millisecond precision
- **Display:** Relative for recent ("2 hours ago"), absolute for older ("Nov 12, 2025 2:30 PM")

## Error Handling

**Strategy:** React Error Boundary + Material UI Snackbar

**Implementation:**
- Error Boundary catches React component errors
- Snackbar shows user-friendly error messages
- Retry option for recoverable errors
- Production: Log Bridge to Supabase with rate limiting (max 5 logs/min per user)

## Epic to Architecture Mapping

| Epic | Key Technologies | Status |
|------|-----------------|--------|
| Epic 1: Foundation & Infrastructure | Next.js 15, TypeScript, Material UI, Supabase Auth, @supabase/ssr | Planning |
| Epic 2: Secure Video Management | Supabase Storage, Web Crypto API, chunked upload | Planning |
| Epic 3: Interactive Video Analysis Workflow | Video.js, custom video time helpers, Zustand | Planning |
| Epic 4: AI-Powered Work Analysis | MediaPipe, Web Workers, Seek-and-Process Loop | Planning |
| Epic 5: Yamazumi Visualization & Insights | Recharts, Material UI, color-coded visualization | Planning |
| Epic 6: Data Management & Persistence | Supabase PostgreSQL, database aggregation queries | Planning |

## BMAD Workflows

This project uses the BMad Method Module (BMM) for AI-driven agile development:

- **Agents:** PM, Analyst, Architect, SM, DEV, TEA, UX Designer, Technical Writer
- **Workflows:** 34 workflows across 4 phases (Analysis → Planning → Solutioning → Implementation)
- **Testing:** Comprehensive testing infrastructure in `.bmad/bmm/testarch/`

**Key Commands:**
- `/bmad:bmm:workflows:dev-story` - Execute story implementation
- `/bmad:bmm:workflows:code-review` - Perform code review
- `/bmad:bmm:workflows:sprint-planning` - Generate sprint tracking
- `/bmad:bmm:workflows:implementation-readiness` - Validate PRD/Architecture/Epics alignment

See `.bmad/bmm/docs/README.md` for full documentation.

## Critical Implementation Notes

### Video Processing
- **Memory Management:** Always call `bitmap.close()` after processing frames in Web Workers
- **Smoothing Pass:** Merge categorization segments < 0.5 seconds to prevent "barcode problem"
- **Data Integrity:** Normalize segments to exactly equal work element duration
- **Pre-Decryption:** Decrypt video during upload completion for instant playback (zero delay on play)

### Authentication
- Use @supabase/ssr for server-side auth (not client-side)
- Set up middleware.ts for cookie checks before page renders
- No client-side localStorage for tokens

### Performance
- Web Workers for MediaPipe (keep UI at 60fps)
- Database aggregation for factory-wide views (not client-side)
- Macro/Micro view toggle disabled when viewing > 20 stations
- Drag overlay pattern for takt time line (no chart re-render during drag)

### Testing
- Playwright essential for video/Crypto testing (requires real browser environment)
- Test video upload, encryption, decryption flow end-to-end
- Test MediaPipe processing in Web Worker context

## Documentation

- `docs/architecture.md` - Comprehensive technical architecture (32KB)
- `docs/PRD.md` - Product requirements document (43KB)
- `docs/epics.md` - Epic and story breakdown (39KB)
- `docs/ux-design-specification.md` - UX design specification
- `tests/README.md` - Testing guidelines and patterns (when created)

## Success Metrics

**Team Transformation:**
- Teams experience shared "holy shit" moments when seeing factory-wide opportunities
- Teams align on facts through shared visualization
- Operators participate in kaizen discussions using the same data as engineers

**Process Efficiency:**
- 80% reduction in time study time (days → minutes)
- Teams complete work breakdown in under 15 minutes
- AI suggestions accepted 70%+ of the time

**Business Impact:**
- Support analysis of 200+ stations simultaneously
- Teams can see bottlenecks across entire lines
- Teams track improvement over time with before/after comparisons
