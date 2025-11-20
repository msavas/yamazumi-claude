# Yamazumi - Epic Breakdown

**Author:** Matt
**Date:** 2025-11-12
**Project Level:** Medium Complexity - B2B SaaS Web Application
**Target Scale:** MVP: Single station, single cycle | Phase 2: 200 stations × 8 elements = 1,600 work elements

---

## Overview

This document provides the complete epic and story breakdown for Yamazumi, decomposing the requirements from the [PRD](./PRD.md) into implementable stories.

### Proposed Epic Structure

**Epic 1: Foundation & Infrastructure**
- **Goal:** Establish the technical foundation for all subsequent work
- **Scope:** Project setup, repository structure, build system, deployment pipeline, core dependencies, authentication (single user for MVP), basic UI framework
- **Why First:** Enables all other work; must be completed before any feature development

**Epic 2: Secure Video Management**
- **Goal:** Enable users to securely upload, store, and organize factory floor videos
- **Scope:** Video upload (drag-and-drop), client-side encryption (Web Crypto API, AES-256-GCM), encrypted storage (Supabase Storage), video organization (stations, metadata), video listing/management
- **Why Second:** Core capability; required before analysis features

**Epic 3: Interactive Video Analysis Workflow**
- **Goal:** Enable precise work element breakpoint marking through intuitive video interaction
- **Scope:** Video player with scrubbing, millisecond-precision timeline, breakpoint marking (click/keyboard/drag), work element naming and management, exception handling, cycle time calculation
- **Why Third:** Core user workflow; foundation for AI features

**Epic 4: AI-Powered Work Analysis**
- **Goal:** Automate breakpoint detection and waste categorization using MediaPipe
- **Scope:** MediaPipe integration, AI breakpoint detection (hand/pose detection, suggestions), AI categorization (waste/non-value-added/value-added), color-coded visualization on timeline, user acceptance/rejection of suggestions
- **Why Fourth:** Core differentiator; builds on video analysis workflow

**Epic 5: Yamazumi Visualization & Insights**
- **Goal:** Generate interactive Yamazumi charts that make waste visible and actionable
- **Scope:** Chart generation from work element data, color-coded waste breakdown (red/yellow/green), click-to-play video clips, interactive timeline, cycle time visualization, presentation-ready charts
- **Why Fifth:** Core output; transforms analysis into actionable insights

**Epic 6: Data Management & Persistence**
- **Goal:** Store and manage work element data with scalable architecture
- **Scope:** Work element data model (Station → Video → Work Elements), Supabase database integration, data persistence and retrieval, query support for future factory-wide aggregation, data model designed for Phase 2 scale
- **Why Sixth:** Supporting infrastructure; can be developed in parallel with visualization

### Sequencing Rationale

1. **Epic 1** must be first (foundation)
2. **Epic 2** enables video handling
3. **Epic 3** provides the manual workflow
4. **Epic 4** adds AI automation
5. **Epic 5** delivers the core output
6. **Epic 6** supports data needs throughout

This structure:
- Groups related capabilities cohesively
- Delivers incremental value at each step
- Enables parallel work where possible
- Aligns with MVP scope boundaries
- Supports Phase 2 expansion

---

## Epic 1: Foundation & Infrastructure

**Goal:** Establish the technical foundation for all subsequent work. This epic sets up the project structure, build system, deployment pipeline, authentication, and basic UI framework that enables all feature development.

### Story 1.1: Project Setup & Repository Structure

As a developer,
I want a properly structured Next.js project with all core dependencies configured,
So that I have a solid foundation for building the Yamazumi application.

**Acceptance Criteria:**

**Given** I am starting a new project
**When** I initialize the Next.js 15 project with TypeScript
**Then** The project structure includes:
- Next.js 15 with App Router configured
- TypeScript configuration
- ESLint and Prettier setup
- Basic folder structure (app/, components/, lib/, types/)
- Package.json with core dependencies listed
- README with setup instructions

**And** The project can be started with `npm run dev`
**And** TypeScript compilation succeeds without errors
**And** Linting passes with default configuration

**Prerequisites:** None (this is the first story)

**Technical Notes:**
- Use Next.js 15 with App Router (from technical research)
- Set up TypeScript for type safety
- Configure ESLint and Prettier for code quality
- Create folder structure that supports future features
- Document setup process in README
- Note: Architecture workflow will provide detailed technical specifications

---

### Story 1.2: Supabase Project Setup & Configuration

As a developer,
I want Supabase project configured with database and storage buckets,
So that I can store encrypted videos and work element data securely.

**Acceptance Criteria:**

**Given** I have a Supabase account
**When** I create a new Supabase project for Yamazumi
**Then** The project includes:
- PostgreSQL database initialized
- Storage bucket created for encrypted videos
- Environment variables configured (.env.local)
- Supabase client library installed and configured
- Connection tested and verified

**And** Environment variables are properly secured (not committed to git)
**And** .env.example file documents required variables
**And** Database connection can be established from the application

**Prerequisites:** Story 1.1 (project setup)

**Technical Notes:**
- Create Supabase project following security best practices
- Set up storage bucket with appropriate permissions
- Configure environment variables for local development
- Install @supabase/supabase-js package
- Create Supabase client utility in lib/supabase.ts
- Note: Database schema will be created in Epic 6

---

### Story 1.3: Authentication Setup (Single User MVP)

As a user,
I want to sign up and log in to the application,
So that I can securely access my video analysis workspace.

**Acceptance Criteria:**

**Given** I am a new user
**When** I navigate to the sign-up page
**Then** I can create an account with email and password
**And** My account is created in Supabase Auth
**And** I am redirected to the dashboard after successful sign-up

**Given** I have an existing account
**When** I navigate to the login page
**Then** I can log in with my email and password
**And** I am authenticated via Supabase Auth
**And** I am redirected to the dashboard after successful login

**Given** I am logged in
**When** I navigate to protected routes
**Then** I can access them without re-authentication
**And** If I log out, I am redirected to the login page

**Prerequisites:** Story 1.2 (Supabase setup)

**Technical Notes:**
- Use Supabase Auth for authentication
- Create sign-up page (app/signup/page.tsx)
- Create login page (app/login/page.tsx)
- Create authentication middleware/utilities
- Implement protected route logic
- Create basic dashboard page (app/dashboard/page.tsx)
- MVP scope: Single user only (no multi-user features)

---

### Story 1.4: Basic UI Framework & Design System

As a developer,
I want a basic UI framework with design tokens and reusable components,
So that I can build consistent, accessible interfaces throughout the application.

**Acceptance Criteria:**

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

**Prerequisites:** Story 1.1 (project setup)

**Technical Notes:**
- Set up Tailwind CSS or similar utility-first CSS framework
- Define design tokens (colors, typography, spacing)
- Create basic component library (Button, Input, Card, etc.)
- Implement color system: red (waste), yellow (non-value-added), green (value-added)
- Ensure high contrast for factory floor viewing
- Create layout components (Header, Sidebar, Main content area)
- Note: Full UX design will come from UX design workflow

---

### Story 1.5: Deployment Pipeline Setup

As a developer,
I want a deployment pipeline configured,
So that I can deploy the application to production reliably.

**Acceptance Criteria:**

**Given** I have code ready to deploy
**When** I push to the main branch
**Then** The application:
- Builds successfully
- Runs automated tests (if any)
- Deploys to production environment
- Environment variables are properly configured

**And** Deployment is automated (no manual steps required)
**And** Build errors are reported clearly
**And** Rollback process is documented

**Prerequisites:** Story 1.1 (project setup), Story 1.2 (Supabase setup)

**Technical Notes:**
- Set up Vercel deployment (recommended for Next.js)
- Configure environment variables in deployment platform
- Set up build and deployment scripts
- Document deployment process
- Configure custom domain (if applicable)
- Set up staging environment (optional but recommended)
- Note: This enables continuous deployment for future stories

---

## Epic 2: Secure Video Management

**Goal:** Enable users to securely upload, store, and organize factory floor videos. This epic implements the core video handling capabilities with client-side encryption to protect proprietary factory processes.

### Story 2.1: Video Upload Interface (Drag-and-Drop)

As a user,
I want to upload videos by dragging and dropping them,
So that I can quickly add factory floor videos to the system.

**Acceptance Criteria:**

**Given** I am logged in and on the video upload page
**When** I drag a video file (MP4 or MOV) onto the upload area
**Then** The file is accepted and upload begins
**And** I see upload progress (percentage and file size)
**And** The file is validated (format and size: 30 seconds to 10 minutes, 50-500 MB typical)

**Given** I try to upload an invalid file
**When** I select a file that's not MP4 or MOV, or exceeds size limits
**Then** I see a clear error message explaining what's wrong
**And** The upload is rejected

**Given** I am uploading a video
**When** The upload completes successfully
**Then** I see a success message
**And** The video appears in my video list

**Prerequisites:** Story 1.3 (authentication), Story 1.4 (UI framework)

**Technical Notes:**
- Create video upload page/component
- Implement drag-and-drop using HTML5 File API
- Validate file type (MP4, MOV)
- Validate file size (30 seconds to 10 minutes, reasonable file size limits)
- Show upload progress using Supabase Storage upload progress
- Handle upload errors gracefully
- Note: Encryption will be added in Story 2.2

---

### Story 2.2: Client-Side Video Encryption

As a user,
I want my videos encrypted before upload,
So that proprietary factory processes are protected.

**Acceptance Criteria:**

**Given** I am uploading a video
**When** I select a video file
**Then** The video is encrypted client-side using Web Crypto API (AES-256-GCM)
**And** Encryption happens before upload begins
**And** The encryption key is generated securely
**And** Only encrypted data is transmitted to the server

**Given** I have uploaded an encrypted video
**When** I download the video later
**Then** I can decrypt it using my encryption key
**And** The decrypted video plays correctly

**Prerequisites:** Story 2.1 (video upload interface)

**Technical Notes:**
- Implement Web Crypto API for client-side encryption
- Use AES-256-GCM encryption standard
- Generate encryption key securely (crypto.getRandomValues)
- Encrypt video file before upload
- Store encryption key securely (localStorage for MVP, company key approach for Phase 2)
- Implement decryption for video playback
- Note: MVP uses single key per user; Phase 2 will implement company key management

---

### Story 2.3: Encrypted Video Storage in Supabase

As a user,
I want my encrypted videos stored securely in the cloud,
So that I can access them from anywhere while maintaining security.

**Acceptance Criteria:**

**Given** I have an encrypted video ready to upload
**When** I complete the upload
**Then** The encrypted video is stored in Supabase Storage
**And** The video file is associated with my user account
**And** Only I can access my encrypted videos
**And** Video metadata (filename, size, upload date) is stored in the database
**And** The video is pre-decrypted in memory for instant playback (performance optimization)

**Given** I have uploaded a video and see the "Video Ready" screen
**When** I click "Play" to view the video
**Then** The video plays immediately without decryption delay
**And** The video was pre-decrypted in the background during upload completion

**Given** I want to view my videos
**When** I navigate to my video list
**Then** I can see all my uploaded videos with metadata
**And** I can download encrypted videos (for decryption and playback)

**Prerequisites:** Story 2.2 (client-side encryption), Story 1.2 (Supabase setup)

**Technical Notes:**
- Configure Supabase Storage bucket with proper permissions
- Upload encrypted video files to Supabase Storage
- Create video metadata table in database (id, user_id, filename, size, upload_date, storage_path)
- Implement video listing functionality
- Implement secure video download (with decryption)
- Set up Row Level Security (RLS) policies for user data isolation
- **Performance Optimization:** After upload completes, immediately decrypt the encrypted blob in background and store in memory
- Pre-decryption ensures video is playable instantly when user clicks "Play" (no 2-second decryption delay)
- Store decrypted blob in memory/cache for immediate playback
- Note: Video processing (MediaPipe) will happen client-side, not on server

---

### Story 2.4: Video Organization by Station

As a user,
I want to organize videos by station,
So that I can easily find and manage videos for specific factory locations.

**Acceptance Criteria:**

**Given** I am uploading a video
**When** I complete the upload
**Then** I can associate the video with a station (required field)
**And** I can optionally add metadata (assembly line, operator name, product variant)
**And** The video is saved with this organization information

**Given** I want to view videos
**When** I navigate to my video list
**Then** I can see videos organized by station
**And** I can filter videos by station
**And** I can see station metadata for each video

**Prerequisites:** Story 2.3 (encrypted video storage)

**Technical Notes:**
- Create station data model (id, name, assembly_line, user_id)
- Add station selection to video upload form
- Store station_id with video metadata
- Create video listing with station grouping
- Implement station filtering
- Support optional metadata fields (assembly_line, operator_name, product_variant)
- Note: Data model supports future factory-wide aggregation (Phase 2)

---

## Epic 3: Interactive Video Analysis Workflow

**Goal:** Enable precise work element breakpoint marking through intuitive video interaction. This epic implements the core manual workflow that allows users to mark breakpoints and manage work elements before AI automation is added.

### Story 3.1: Video Player with Timeline Scrubbing

As a user,
I want to play and scrub through videos with millisecond precision,
So that I can precisely identify work element breakpoints.

**Acceptance Criteria:**

**Given** I have uploaded a video
**When** I open the video for analysis
**Then** I see a video player with:
- Standard playback controls (play, pause, seek)
- Timeline scrubber with millisecond precision
- Current timestamp display (MM:SS.mmm format)
- Keyboard shortcuts for frame-by-frame navigation

**Given** I am watching a video
**When** I scrub the timeline
**Then** The video seeks to the exact position
**And** The timestamp updates in real-time
**And** Scrubbing is responsive (no lag)

**Prerequisites:** Story 2.4 (video organization), Story 2.2 (encryption/decryption for playback)

**Technical Notes:**
- Use HTML5 video element or video player library (Video.js, Plyr)
- Implement custom timeline scrubber with millisecond precision
- Add keyboard shortcuts (arrow keys for frame-by-frame, space for play/pause)
- Display current timestamp in MM:SS.mmm format
- Ensure smooth playback and scrubbing performance
- Handle video decryption for playback
- Note: Breakpoint marking will be added in Story 3.2

---

### Story 3.2: Breakpoint Marking on Timeline

As a user,
I want to mark breakpoints on the video timeline,
So that I can identify where work elements begin and end.

**Acceptance Criteria:**

**Given** I am viewing a video in the analysis interface
**When** I click on the timeline at a specific timestamp
**Then** A breakpoint marker is created at that position
**And** The marker is visually distinct on the timeline
**And** I can see the exact timestamp of the breakpoint

**Given** I have marked a breakpoint
**When** I drag the marker on the timeline
**Then** The breakpoint position updates
**And** The timestamp updates in real-time

**Given** I want to mark a breakpoint precisely
**When** I use keyboard shortcuts (e.g., 'M' key) at the current video position
**Then** A breakpoint is created at the current playback position
**And** The breakpoint is marked with second-level accuracy

**Prerequisites:** Story 3.1 (video player with scrubbing)

**Technical Notes:**
- Implement click-to-mark functionality on timeline
- Create visual breakpoint markers on timeline
- Support drag-to-adjust for breakpoint positions
- Add keyboard shortcut for marking at current position
- Store breakpoint data (timestamp, order) in component state
- Display breakpoint timestamps on timeline
- Note: Work element naming will be added in Story 3.3

---

### Story 3.3: Work Element Naming & Management

As a user,
I want to name work elements and see them organized,
So that I can maintain consistent naming and track work element data.

**Acceptance Criteria:**

**Given** I have marked breakpoints on a video
**When** I name a work element (before or after marking breakpoints)
**Then** The work element is created with that name
**And** The name is displayed on the timeline segment
**And** The work element appears in the work element list

**Given** I have multiple work elements
**When** I view the work element list
**Then** I can see:
- Work element names
- Start and end timestamps
- Duration (in seconds with milliseconds)
- Total cycle time

**Given** I want to edit a work element
**When** I click on a work element in the list
**Then** I can edit the name
**And** I can delete the work element (which removes its breakpoints)
**And** Changes are reflected immediately

**Prerequisites:** Story 3.2 (breakpoint marking)

**Technical Notes:**
- Create work element data structure (id, name, start_time, end_time, duration)
- Implement work element naming interface
- Display work elements on timeline segments
- Create work element list component
- Calculate durations from breakpoint timestamps
- Calculate total cycle time
- Support editing and deletion of work elements
- Note: Data persistence will be added in Epic 6

---

### Story 3.4: Exception Handling & Cycle Exclusion

As a user,
I want to mark exceptions and exclude problematic cycles,
So that I can maintain data integrity in my analysis.

**Acceptance Criteria:**

**Given** I am analyzing a video cycle
**When** I notice an exception (operator mistake, equipment issue, etc.)
**Then** I can mark the cycle as having an exception
**And** I can add notes explaining the exception
**And** The exception is flagged in the work element list

**Given** I have marked a cycle with exceptions
**When** I want to exclude it from analysis
**Then** I can exclude the problematic cycle
**And** The cycle is not included in cycle time calculations
**And** The exception is tracked for later review

**Given** I want to review exceptions
**When** I view the exception list
**Then** I can see all marked exceptions with notes
**And** I can filter by exception type
**And** I can include/exclude cycles from analysis

**Prerequisites:** Story 3.3 (work element management)

**Technical Notes:**
- Create exception data model (id, cycle_id, type, notes, excluded)
- Implement exception marking interface
- Add exception notes functionality
- Create exception list/view
- Implement cycle exclusion logic
- Update cycle time calculations to exclude marked cycles
- Note: This supports data integrity for accurate analysis

---

## Epic 4: AI-Powered Work Analysis

**Goal:** Automate breakpoint detection and waste categorization using MediaPipe. This epic implements the AI features that make Yamazumi a powerful differentiator, helping users identify work elements and categorize waste automatically.

### Story 4.1: MediaPipe Integration & Setup

As a developer,
I want MediaPipe integrated into the application,
So that I can use AI to analyze factory floor videos.

**Acceptance Criteria:**

**Given** I am setting up MediaPipe
**When** I install the required packages
**Then** MediaPipe tasks-vision is installed and configured
**And** MediaPipe can be imported and initialized in the browser
**And** MediaPipe models are loaded (hand detection, pose detection, object detection)

**Given** I have a video ready for analysis
**When** I initialize MediaPipe analysis
**Then** MediaPipe processes the video client-side
**And** Analysis completes without errors
**And** Processing time is reasonable (under 2 minutes for 5-minute video)

**Prerequisites:** Story 3.1 (video player), Story 1.1 (project setup)

**Technical Notes:**
- Install @mediapipe/tasks-vision package
- Set up MediaPipe initialization in browser
- Configure hand landmark detection
- Configure pose landmark detection (for walking, bending, reaching)
- Configure object detection (for tool/part interactions)
- Implement client-side video processing
- Handle MediaPipe errors gracefully
- Note: Breakpoint detection will be implemented in Story 4.2

---

### Story 4.2: AI Breakpoint Detection & Suggestions

As a user,
I want AI to suggest work element breakpoints,
So that I can mark breakpoints faster and more accurately.

**Acceptance Criteria:**

**Given** I have a video loaded in the analysis interface
**When** I click "Analyze with AI"
**Then** MediaPipe analyzes the video for hand movements and object interactions
**And** AI suggests breakpoints based on detected patterns (grasping = start, returning to rack = end)
**And** Suggested breakpoints appear on the timeline with visual indicators
**And** Processing completes in reasonable time (under 2 minutes for 5-minute video)

**Given** I see AI-suggested breakpoints
**When** I review the suggestions
**Then** I can accept individual breakpoints
**And** I can reject individual breakpoints
**And** I can accept all suggestions and adjust positions
**And** I can see confidence scores for suggestions (optional)

**Given** I accept AI suggestions
**When** Breakpoints are added to the timeline
**Then** They work exactly like manually marked breakpoints
**And** I can adjust their positions
**And** I can name work elements for them

**Prerequisites:** Story 4.1 (MediaPipe integration), Story 3.2 (breakpoint marking)

**Technical Notes:**
- Implement MediaPipe hand detection to identify grasping movements
- Detect object interactions (picking up, putting down)
- Analyze patterns to suggest breakpoint locations
- Display suggested breakpoints on timeline (different visual style from confirmed breakpoints)
- Implement accept/reject functionality for individual suggestions
- Implement "accept all" functionality
- Store accepted breakpoints in work element data structure
- Target: 70%+ accuracy (user acceptance rate)
- Note: User can always manually adjust or override AI suggestions

---

### Story 4.3: AI Categorization - Waste Detection

As a user,
I want AI to categorize activities within work elements as waste,
So that I can quickly identify eliminable activities.

**Acceptance Criteria:**

**Given** I have work elements marked on a video
**When** I click "Categorize with AI"
**Then** MediaPipe analyzes each work element for waste activities
**And** AI detects: walking, bending, reaching, searching, waiting, idle time
**And** Waste activities are identified with timestamps within each work element
**And** Waste percentage and seconds are calculated per element

**Given** I see AI waste categorization
**When** I review the results
**Then** Waste is color-coded red on the timeline
**And** I can see waste breakdown (percentage and seconds) per element
**And** I can manually adjust categorization if needed
**And** I can override AI suggestions

**Prerequisites:** Story 4.2 (AI breakpoint detection), Story 3.3 (work element management)

**Technical Notes:**
- Use MediaPipe pose detection to identify: walking (body movement), bending (pose angle), reaching (arm extension)
- Detect idle time and waiting (lack of movement)
- Detect searching (repetitive hand movements without object interaction)
- Calculate waste time within each work element
- Display waste as red color-coding on timeline
- Show waste percentage and seconds per element
- Target: 70%+ accuracy (user acceptance rate)
- Note: Categorization will be expanded in Story 4.4 (non-value-added and value-added)

---

### Story 4.4: AI Categorization - Complete Waste Breakdown

As a user,
I want AI to categorize all activities (waste, non-value-added, value-added),
So that I can see the complete waste breakdown for each work element.

**Acceptance Criteria:**

**Given** I have work elements with waste detected
**When** AI completes full categorization
**Then** Each work element shows:
- Waste (red): walking, bending, reaching, searching, waiting
- Non-value-added (yellow): picking up tools/parts, positioning, preparing
- Value-added (green): actual transformation work (assembly, installation)

**Given** I view the categorization results
**When** I look at the timeline
**Then** I see color-coded segments (red/yellow/green) within each work element
**And** I can see percentage breakdown per category
**And** I can see seconds for each category per element

**Given** I want to adjust categorization
**When** I click on a categorized segment
**Then** I can change the category (waste/non-value-added/value-added)
**And** I can add notes explaining the categorization
**And** Changes are reflected immediately in the breakdown

**Prerequisites:** Story 4.3 (waste detection)

**Technical Notes:**
- Extend MediaPipe analysis to detect non-value-added activities (tool/part pickup, positioning)
- Detect value-added activities (actual transformation work - assembly, installation)
- Implement three-category color-coding system (red/yellow/green)
- Calculate percentage and seconds for each category per element
- Display color-coded breakdown on timeline
- Support manual adjustment of categorization
- Store categorization data with work elements
- Target: 70%+ accuracy overall (user acceptance rate)
- Note: This is the priority feature that makes Yamazumi special

---

## Epic 5: Yamazumi Visualization & Insights

**Goal:** Generate interactive Yamazumi charts that make waste visible and actionable. This epic creates the core output that transforms analysis data into visual insights that enable team collaboration and kaizen.

### Story 5.1: Basic Yamazumi Chart Generation

As a user,
I want to generate a Yamazumi chart from my work element data,
So that I can visualize work balance and identify opportunities.

**Acceptance Criteria:**

**Given** I have completed work element analysis with categorization
**When** I click "Generate Yamazumi Chart"
**Then** A work balance chart is generated showing:
- Horizontal bar chart with work elements
- Each element shows total time
- Elements are ordered sequentially
- Total cycle time is displayed
- Chart is visually clear and professional

**Given** I view the Yamazumi chart
**When** I examine the chart
**Then** I can see:
- Work element names
- Individual element times
- Total cycle time
- Chart matches standard Yamazumi format (industrial engineers expect this)

**Prerequisites:** Story 4.4 (complete categorization), Story 3.3 (work element data)

**Technical Notes:**
- Use charting library (D3.js, Chart.js, or Recharts)
- Generate horizontal bar chart from work element data
- Display work elements in sequential order
- Show element names and times
- Calculate and display total cycle time
- Ensure chart is presentation-ready (suitable for team meetings)
- Note: Color-coding will be added in Story 5.2

---

### Story 5.2: Color-Coded Waste Breakdown in Chart

As a user,
I want to see color-coded waste breakdown in the Yamazumi chart,
So that I can immediately identify waste opportunities.

**Acceptance Criteria:**

**Given** I have work elements with waste categorization
**When** I generate the Yamazumi chart
**Then** Each work element bar shows color-coded segments:
- Red segments for waste
- Yellow segments for non-value-added
- Green segments for value-added
- Segments are proportional to time

**Given** I view the color-coded chart
**When** I examine each element
**Then** I can see:
- Percentage breakdown per category (displayed on hover or in legend)
- Seconds for each category per element
- Visual waste indicators are prominent and clear

**Given** I want to understand the breakdown
**When** I hover over a work element
**Then** I see detailed breakdown tooltip:
- Waste: X seconds (Y%)
- Non-value-added: X seconds (Y%)
- Value-added: X seconds (Y%)

**Prerequisites:** Story 5.1 (basic chart generation), Story 4.4 (complete categorization)

**Technical Notes:**
- Extend chart to show stacked segments (red/yellow/green) within each bar
- Calculate segment proportions based on categorization data
- Display percentage and seconds for each category
- Add hover tooltips with detailed breakdown
- Ensure color-coding is consistent with timeline (red/yellow/green)
- Make waste (red) visually prominent
- Note: This is an MVP requirement - color-coding is critical for the product's value

---

### Story 5.3: Click-to-Play Video Clips from Chart

As a user,
I want to click work elements in the Yamazumi chart to see video clips,
So that I can understand the context of each work element.

**Acceptance Criteria:**

**Given** I am viewing a Yamazumi chart
**When** I click on a work element in the chart
**Then** The video player opens showing that work element
**And** The video plays the segment from start_time to end_time of that element
**And** The video is positioned at the correct timestamp

**Given** I am watching a video clip from the chart
**When** The clip finishes playing
**Then** I can replay the clip
**And** I can return to the full chart view
**And** I can click another element to view its clip

**Prerequisites:** Story 5.2 (color-coded chart), Story 3.1 (video player)

**Technical Notes:**
- Implement click handlers on chart elements
- Link work element IDs to video timestamps
- Open video player with correct start/end times
- Play video segment for selected work element
- Support navigation back to chart
- Support clicking multiple elements in sequence
- Note: This enables the "click element → see video" magic moment

---

### Story 5.4: Interactive Timeline in Chart View

As a user,
I want to see an interactive timeline in the chart view,
So that I can understand the sequence and timing of work elements.

**Acceptance Criteria:**

**Given** I am viewing a Yamazumi chart
**When** I look at the chart
**Then** I see an interactive timeline showing:
- Work elements in sequence
- Color-coded segments (red/yellow/green) within each element
- Timestamps for element boundaries
- Current playback position (if video is playing)

**Given** I interact with the timeline
**When** I click on the timeline
**Then** The video seeks to that position
**And** The corresponding work element is highlighted
**And** I can scrub through the timeline to see different elements

**Prerequisites:** Story 5.3 (click-to-play), Story 3.1 (video player)

**Technical Notes:**
- Create interactive timeline component for chart view
- Display work elements with color-coded segments
- Show timestamps and element boundaries
- Implement click-to-seek functionality
- Sync timeline with video playback
- Highlight active work element during playback
- Note: This provides context for the chart visualization

---

## Epic 6: Data Management & Persistence

**Goal:** Store and manage work element data with scalable architecture. This epic implements the data layer that supports all features and enables future factory-wide aggregation.

### Story 6.1: Work Element Data Model Design

As a developer,
I want a well-designed data model for work elements,
So that I can store and query work element data efficiently.

**Acceptance Criteria:**

**Given** I am designing the data model
**When** I create the database schema
**Then** The schema includes:
- Stations table (id, name, assembly_line, user_id)
- Videos table (id, user_id, station_id, filename, size, upload_date, storage_path, encrypted)
- Work Elements table (id, video_id, name, start_time, end_time, duration)
- Categorizations table (id, work_element_id, category, start_time, end_time, duration)
- Exceptions table (id, video_id, cycle_id, type, notes, excluded)

**Given** I have the data model
**When** I examine the relationships
**Then** The hierarchy is clear: Station → Video → Work Elements → Categorizations
**And** Foreign keys are properly defined
**And** Indexes are created for common queries (video_id, station_id, user_id)

**Prerequisites:** Story 1.2 (Supabase setup)

**Technical Notes:**
- Design database schema in Supabase
- Create tables with proper relationships and foreign keys
- Add indexes for performance (video_id, station_id, user_id)
- Design for future factory-wide aggregation (Phase 2)
- Ensure work elements are queryable across stations
- Use proper data types (timestamps, decimals for durations)
- Note: Schema must support Phase 2 scale (200 stations × 8 elements = 1,600 elements)

---

### Story 6.2: Work Element Data Persistence

As a user,
I want my work element data saved automatically,
So that I don't lose my analysis work.

**Acceptance Criteria:**

**Given** I am analyzing a video and marking work elements
**When** I create or modify work elements
**Then** Data is saved to the database automatically
**And** I see a save indicator (saving/saved)
**And** Data persists when I refresh the page

**Given** I have saved work element data
**When** I return to the analysis later
**Then** All my work elements are loaded from the database
**And** Breakpoints are restored on the timeline
**And** Categorizations are restored with color-coding

**Given** I want to delete work element data
**When** I delete a work element
**Then** The data is removed from the database
**And** Associated categorizations are also removed
**And** The UI updates immediately

**Prerequisites:** Story 6.1 (data model), Story 3.3 (work element management)

**Technical Notes:**
- Implement auto-save functionality for work elements
- Create API functions for CRUD operations (create, read, update, delete)
- Save work elements to Supabase database
- Load work elements when opening video analysis
- Implement optimistic UI updates
- Handle save errors gracefully
- Add save status indicators
- Note: This ensures data persistence across sessions

---

### Story 6.3: Categorization Data Persistence

As a user,
I want my categorization data saved,
So that my waste analysis is preserved.

**Acceptance Criteria:**

**Given** I have categorized work elements (waste/non-value-added/value-added)
**When** Categorization is complete
**Then** Categorization data is saved to the database
**And** Data includes: category type, start_time, end_time, duration per segment
**And** Data is linked to work elements

**Given** I have saved categorization data
**When** I return to the analysis later
**Then** Categorizations are loaded from the database
**And** Color-coding is restored on timeline
**And** Waste breakdown percentages are recalculated

**Given** I modify categorization
**When** I adjust category assignments
**Then** Changes are saved automatically
**And** Chart updates to reflect new categorization

**Prerequisites:** Story 6.2 (work element persistence), Story 4.4 (complete categorization)

**Technical Notes:**
- Save categorization segments to database
- Link categorizations to work elements
- Store category type, timestamps, and duration
- Load categorizations when loading work elements
- Recalculate waste breakdown from saved data
- Support updating and deleting categorizations
- Note: This preserves the complete analysis including waste breakdown

---

### Story 6.4: Query Support for Factory-Wide Aggregation (Phase 2 Ready)

As a developer,
I want query functions that support future factory-wide aggregation,
So that Phase 2 features can be built on this foundation.

**Acceptance Criteria:**

**Given** I have work element data from multiple stations
**When** I query work elements
**Then** I can:
- Query by station_id
- Query by video_id
- Query by user_id
- Query across multiple stations (for Phase 2)
- Get aggregated data (total cycle time, waste percentages)

**Given** I have the query functions
**When** Phase 2 development begins
**Then** Factory-wide aggregation can be implemented
**And** Cross-station queries work efficiently
**And** Data model supports 1,600+ work elements

**Prerequisites:** Story 6.1 (data model), Story 6.2 (work element persistence)

**Technical Notes:**
- Create query functions for work elements
- Support filtering by station, video, user
- Create aggregation functions (sum, average, etc.)
- Optimize queries with proper indexes
- Design for cross-station queries (Phase 2)
- Test query performance with large datasets
- Document query patterns for Phase 2
- Note: This prepares the data layer for factory-wide views (Phase 2)

---

## Summary

This epic breakdown decomposes the Yamazumi PRD into 6 epics and 24 stories, each sized for single-session completion by a development agent. Stories are vertically sliced, sequentially ordered, and include clear BDD acceptance criteria.

**Epic Sequencing:**
1. Foundation & Infrastructure (5 stories) - Must be first
2. Secure Video Management (4 stories) - Enables video handling
3. Interactive Video Analysis Workflow (4 stories) - Core manual workflow
4. AI-Powered Work Analysis (4 stories) - Core differentiator
5. Yamazumi Visualization & Insights (4 stories) - Core output
6. Data Management & Persistence (4 stories) - Supporting infrastructure

**Key Characteristics:**
- All stories are vertically sliced (complete functionality)
- No forward dependencies (stories build on previous ones)
- BDD acceptance criteria for clarity
- Technical notes guide implementation
- MVP scope clearly defined
- Phase 2 expansion points identified

**Next Steps:**
- Architecture workflow will provide detailed technical specifications
- UX design workflow will create detailed user experience designs
- Individual stories can be implemented using the `create-story` workflow

---

_For implementation: Use the `create-story` workflow to generate individual story implementation plans from this epic breakdown._

