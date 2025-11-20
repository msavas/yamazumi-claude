# Project Brief: Video-Based Work Element Analysis Tool

## Executive Summary

This project aims to build a video-based work element analysis application that enables industrial engineers and continuous improvement teams to analyze factory floor operations through AI-assisted video processing. The tool will replace the difficult and error-prone stopwatch method with an intuitive video scrubbing interface, automatically detect work element breakpoints using Google MediaPipe, categorize activities within each element as value-added, non-value-added, or waste, and generate digital Yamazumi charts for factory-wide capacity visibility.

**Primary Problem:** Current work breakdown methods using stopwatches are extremely difficult, time-consuming, and require precise timing that's nearly impossible to achieve consistently. Most industrial engineers and CI teams lack the training to distinguish work from waste, making it difficult to identify improvement opportunities. The process is further complicated by manual documentation, collaboration barriers, and the inability to see factory-wide patterns.

**Target Market:** Industrial engineers and continuous improvement teams in manufacturing organizations, particularly those working on assembly lines, production operations, and process improvement initiatives.

**Key Value Proposition:** Transform a difficult, manual, error-prone process into an intuitive, AI-assisted workflow that helps teams learn to "see" waste through visual feedback, align on facts through shared data visualization, and make data-driven decisions about capacity optimization and improvement opportunities.

**Critical Constraints:** This project is being built by a solo non-developer with limited budget, relying entirely on AI assistance for development. Security is paramount - video data must be protected with end-to-end encryption, and the solution must handle large video files (30 seconds to 10 minutes) efficiently.

---

## Problem Statement

### Current State and Pain Points

Industrial engineers and continuous improvement teams currently use stopwatch-based time studies to break down operations into work elements. This process is fundamentally flawed:

1. **Timing Precision is Nearly Impossible:** Operators must consistently hit the stopwatch at precise breakpoints across multiple cycles (typically 10 cycles). Missing the exact moment by even a fraction of a second compounds errors across cycles, leading to inaccurate data.

2. **Lack of Training and Knowledge:** Most industrial engineers and CI team members don't understand how to distinguish:
   - **Value-added work:** Actual transformation of materials/products (e.g., attaching a part)
   - **Non-value-added/incidental work:** Necessary but not value-adding (e.g., picking up a tool)
   - **Waste:** Eliminable activities (e.g., walking, unnecessary bending, reaching, searching, waiting)

3. **Documentation Chaos:** Work breakdowns are typically done on paper or Excel spreadsheets that become disorganized, difficult to share, and prone to errors. Collaboration is nearly impossible.

4. **Physical Limitations:** Teams often create physical Yamazumi boards (magnetic work balance charts) which are effective for visualization but extremely time-consuming to create and update, not scalable, and can't be easily shared or analyzed digitally.

5. **No Factory-Wide Visibility:** Individual time studies exist in isolation. There's no way to see bottlenecks across an entire line, compare stations, or understand capacity potential at the factory level.

6. **Difficulty Seeing Waste in Real-Time:** Even when people understand the framework, it's difficult to identify waste while watching operations in real-time. It takes practice and experience that most teams don't have.

### Impact of the Problem

- **Inefficient Operations:** Teams can't identify where waste exists, so they can't eliminate it
- **Inaccurate Capacity Planning:** Without accurate, repeatable cycle times, teams can't determine how many operators are actually needed
- **Missed Improvement Opportunities:** Waste goes unnoticed, leading to unnecessary costs and inefficiencies
- **Poor Team Alignment:** Without shared, visual data, teams can't align on facts about operations
- **Slow Kaizen Culture:** The difficulty of the process prevents teams from doing regular analysis, slowing continuous improvement

### Why Existing Solutions Fall Short

- **Stopwatch method:** Fundamentally flawed due to timing precision requirements
- **Excel/paper documentation:** Disorganized, not collaborative, error-prone
- **Physical Yamazumi boards:** Effective but not scalable, time-consuming, can't be shared digitally
- **Generic video analysis tools:** Don't understand industrial engineering frameworks (value-added vs. waste)
- **Time study software:** Often still requires manual timing, doesn't help users learn to see waste

### Urgency and Importance

Manufacturing organizations are under constant pressure to improve efficiency, reduce costs, and optimize capacity. The ability to quickly and accurately identify waste and improvement opportunities is critical for competitive advantage. Current methods are so difficult that many teams avoid doing this analysis, leading to ongoing inefficiencies that compound over time.

---

## Proposed Solution

### Core Concept

A web-based application that allows users to upload videos of factory floor operations, automatically detect work element breakpoints using AI (Google MediaPipe for hand/pose/object detection), categorize activities within each element as value-added (green), non-value-added (yellow), or waste (red), and generate interactive digital Yamazumi charts that can be aggregated across multiple stations for factory-wide visibility.

### Key Differentiators

1. **AI-Powered Breakpoint Detection:** Uses MediaPipe to detect hand movements, object interactions, and body poses to automatically suggest where work elements begin and end (when operator grasps object = start, returns to rack = end/start of next).

2. **AI Categorization Within Elements:** Unlike simple timing tools, this analyzes each work element to identify sub-activities:
   - **Waste (Red):** Walking, bending, reaching, searching, waiting, idle time
   - **Non-value-added (Yellow):** Picking up tools/parts, positioning, preparing
   - **Value-added (Green):** Actual transformation work (assembly, installation, etc.)

3. **Visual Learning Component:** Users learn to "see" waste as they use the tool through color-coded visual indicators, percentage breakdowns, and video-linked elements that show exactly what's happening.

4. **Factory-Wide Aggregation:** Multiple videos from different stations can be compiled into a complete operation view, revealing bottlenecks, capacity potential, and improvement opportunities across entire lines.

5. **Video-Linked Analysis:** Click any work element in a Yamazumi chart to see the actual video of that work happening, providing powerful context for analysis and improvement discussions.

### Why This Solution Will Succeed

- **Addresses Root Cause:** Replaces the fundamentally flawed stopwatch method with precise video analysis
- **Educational:** Helps users learn the framework through visual feedback, not just provides data
- **Scalable:** Digital solution can handle multiple stations, products, and cycles without physical limitations
- **Collaborative:** Shared digital data enables team alignment on facts
- **Actionable:** Factory-wide visibility enables strategic capacity planning and targeted improvement efforts

### High-Level Vision

Users upload videos from their phones, the AI analyzes and suggests breakpoints and categorizations, users review and adjust, and the system generates beautiful, interactive Yamazumi charts. Teams can see their entire operation, identify exactly where waste exists, calculate capacity potential, and make data-driven decisions about where to focus improvement efforts. Operators can participate in kaizen by seeing the analysis and contributing ideas.

---

## Target Users

### Primary User Segment: Industrial Engineers

**Profile:**
- Work in manufacturing organizations
- Responsible for time studies, work breakdowns, and process improvement
- Typically work on laptops
- Have domain knowledge but may lack training in waste identification
- Frustrated with current stopwatch method

**Current Behaviors:**
- Use stopwatch and Excel/paper for time studies
- Create physical Yamazumi boards for visualization
- Struggle with timing precision and documentation
- Work in isolation or with limited collaboration

**Specific Needs:**
- Faster, more accurate work breakdown process
- Better way to identify and categorize waste
- Ability to see factory-wide patterns
- Tools that help them learn and improve their skills
- Digital solution that's easy to share and collaborate on

**Goals:**
- Accurately identify improvement opportunities
- Create reliable capacity plans
- Help teams align on facts about operations
- Build kaizen culture through data-driven analysis

### Secondary User Segment: Continuous Improvement Teams

**Profile:**
- Work on difficult improvement assignments
- May have limited technical skills
- Need tools that are easy to use
- Work closely with operators and engineers

**Current Behaviors:**
- Rely on engineers for technical analysis
- Struggle with complex tools and processes
- Need to communicate findings to operators and management

**Specific Needs:**
- Simple, intuitive interface
- Visual tools that help explain findings
- Ability to involve operators in improvement discussions
- Clear, actionable insights

**Goals:**
- Identify and eliminate waste effectively
- Engage operators in kaizen activities
- Demonstrate improvement impact
- Build continuous improvement culture

---

## Goals & Success Metrics

### Business Objectives

- **Reduce Time Study Time by 80%:** Current process takes hours/days, target is to complete analysis in minutes
- **Improve Accuracy:** Achieve consistent, repeatable timing data (eliminate stopwatch precision errors)
- **Enable Factory-Wide Visibility:** Support analysis of 10+ stations simultaneously
- **Increase Analysis Frequency:** Enable teams to do regular analysis (weekly/monthly) instead of rare deep dives
- **Build Kaizen Culture:** Help teams learn to see waste and make data-driven improvements

### User Success Metrics

- **Time to Complete Analysis:** Users can break down a single cycle in under 10 minutes (vs. hours currently)
- **User Confidence:** Users report feeling confident identifying waste after using the tool
- **Adoption Rate:** 80% of target users actively use the tool within 3 months
- **Accuracy Satisfaction:** Users trust AI suggestions enough to use them (70%+ accuracy acceptable)
- **Collaboration:** Teams use shared Yamazumi charts for improvement discussions

### Key Performance Indicators (KPIs)

- **Analysis Completion Rate:** Percentage of uploaded videos that result in completed Yamazumi charts
- **AI Suggestion Acceptance Rate:** Percentage of AI-suggested breakpoints/categorizations that users accept
- **Factory Coverage:** Number of stations/lines analyzed using the tool
- **Improvement Actions Generated:** Number of kaizen activities initiated based on tool insights
- **Capacity Insights:** Percentage of users who can identify capacity potential from factory-wide views

---

## MVP Scope

### Core Features (Must Have)

1. **Video Upload & Management:**
   - Drag-and-drop video upload from phone/laptop
   - Support for common video formats (MP4, MOV from phones)
   - Organize videos by station, line, operator, product variant
   - Handle videos 30 seconds to 10 minutes in length

2. **Video Scrubbing with Breakpoint Marking:**
   - Video player with timeline scrubbing controls
   - Click, keyboard shortcut, or drag marker to mark breakpoints
   - Second-level precision (millisecond accuracy)
   - Visual timeline with breakpoint markers
   - Work element names displayed on timeline

3. **Work Element Management:**
   - Name work elements before marking breakpoints (ensures consistency)
   - List of work elements with timing data
   - Individual element times and total cycle time display
   - Support for multiple cycles (mark all breakpoints for one cycle, then move to next)
   - Identify "model cycle" or "most repeatable cycle"

4. **AI Breakpoint Detection (MediaPipe):**
   - Analyze video using MediaPipe for hand/pose/object detection
   - Suggest breakpoints based on hand movements (grasping = start, returning to rack = end)
   - User can accept/reject individual suggestions or accept all and adjust
   - Visual indicators showing suggested breakpoints

5. **AI Categorization (Priority Feature):**
   - Analyze each work element to identify sub-activities
   - Categorize as waste (red), non-value-added (yellow), or value-added (green)
   - Detect: walking, bending, reaching, searching, waiting (waste)
   - Detect: picking up tools/parts, positioning (non-value-added)
   - Detect: actual transformation work (value-added)
   - Show percentage breakdown per element with seconds
   - Color-coded visual indicators on timeline

6. **Basic Yamazumi Chart Generation:**
   - Generate work balance chart from breakpoint and categorization data
   - Visual representation showing work elements with timing
   - Color-coding for waste/non-value-added/value-added
   - Click work element to view associated video clip
   - Display total cycle time breakdown

7. **Product Variant Support:**
   - Distinguish between different products/variants
   - Create separate "jobs" for each product
   - Show comparisons side-by-side
   - Track impact of product differences on work

8. **Exception Handling:**
   - Mark exceptions/errors during cycles
   - Note issues for later analysis
   - Exclude problematic cycles from analysis

### Out of Scope for MVP

- Factory-wide aggregation across multiple stations (Phase 2)
- Mobile app (web-based only for MVP)
- Real-time video recording in app
- Advanced analytics and reporting
- User management and permissions
- Cloud storage (local processing preferred for security)
- AI learning from user corrections
- Predictive waste elimination recommendations
- Collaborative multi-user real-time editing
- Advanced export formats beyond basic data export

### MVP Success Criteria

The MVP is successful if:
1. Users can upload a video and complete a work breakdown in under 15 minutes
2. AI breakpoint detection suggests breakpoints with 70%+ accuracy (user acceptance rate)
3. AI categorization identifies waste/non-value-added/value-added with 70%+ accuracy
4. Generated Yamazumi charts are visually clear and actionable
5. Users report the tool is easier and faster than stopwatch method
6. Security: Video data is encrypted and processed securely (no leaks)
7. Tool runs smoothly on standard laptops with typical video file sizes

---

## Post-MVP Vision

### Phase 2 Features

1. **Factory-Wide Aggregation:**
   - Compile multiple videos from different stations into complete operation view
   - Identify bottlenecks across entire lines
   - Show capacity potential through waste elimination
   - Enable work element rebalancing across stations

2. **Advanced Visualization:**
   - Interactive factory floor maps with station-level data
   - Comparison views across products, operators, time periods
   - Trend analysis and improvement tracking
   - Customizable dashboard views

3. **Rock vs. Pebble Classification:**
   - Distinguish work elements that can be moved (pebbles) vs. fixed (rocks)
   - Enable rebalancing recommendations
   - Visual indicators for movable vs. fixed elements

4. **Enhanced Security & Collaboration:**
   - End-to-end encryption for all video data
   - User management and permissions
   - Shared workspaces for teams
   - Comment and annotation features

5. **Mobile App:**
   - Record videos directly in app
   - Basic analysis on mobile device
   - Sync with web application

### Long-term Vision (1-2 Years)

- **Industry-Leading AI Accuracy:** 90%+ accuracy in breakpoint detection and categorization
- **Predictive Analytics:** AI suggests specific improvements based on waste patterns
- **Integration Ecosystem:** Connect with ERP systems, MES systems, and other manufacturing software
- **Training Platform:** Built-in tutorials and certification programs for industrial engineers
- **Market Expansion:** Support for warehousing, logistics, and other operational contexts beyond manufacturing

### Expansion Opportunities

- **Consulting Services:** Offer professional services for complex implementations
- **Training & Certification:** Become the standard training platform for work analysis
- **API & Integrations:** Allow other software to integrate work analysis capabilities
- **Industry-Specific Versions:** Tailored versions for automotive, aerospace, electronics, etc.
- **Operator-Facing Tools:** Mobile apps that help operators see their own work and suggest improvements

---

## Technical Considerations

### Platform Requirements

- **Target Platforms:** Web application (browser-based), responsive design for tablets
- **Browser/OS Support:** Modern browsers (Chrome, Firefox, Safari, Edge) on Windows, macOS, Linux
- **Performance Requirements:** 
  - Handle video files 30 seconds to 10 minutes (typically 50-500 MB)
  - Process videos in reasonable time (target: under 2 minutes for 5-minute video)
  - Smooth video playback and scrubbing
  - Real-time AI analysis feedback

### Technology Preferences

- **Frontend:** Modern framework (React, Vue, or similar) for responsive UI, video player library (Video.js, Plyr, or similar), charting library (D3.js, Chart.js, or similar)
- **Backend:** Node.js or Python for API, video processing, and AI integration
- **Database:** PostgreSQL or similar for structured data (work elements, stations, products, etc.), file storage for videos (local or cloud with encryption)
- **Hosting/Infrastructure:** 
  - Prefer local processing for security (videos processed on user's machine)
  - Cloud hosting for application (if needed)
  - End-to-end encryption for all video data
  - CDN for video delivery (if cloud-based)

### Architecture Considerations

- **Repository Structure:** Monorepo or separate frontend/backend repos (to be determined based on development approach)
- **Service Architecture:** 
  - Frontend: Video player, timeline, chart visualization
  - Backend API: Video upload, processing, data management
  - AI Service: MediaPipe integration for breakpoint detection and categorization
  - Data Service: Work element storage, Yamazumi chart generation
- **Integration Requirements:**
  - Google MediaPipe for AI capabilities (hand/pose/object detection)
  - Video processing libraries for format conversion and manipulation
  - Encryption libraries for security
- **Security/Compliance:**
  - End-to-end encryption for video data
  - Secure video storage (encrypted at rest)
  - Secure transmission (HTTPS, encrypted uploads)
  - No video data leakage (critical for enterprise clients)
  - Consider local-first architecture to minimize cloud security risks

---

## Constraints & Assumptions

### Constraints

- **Budget:** Limited budget - solo developer, no external funding
- **Timeline:** No fixed deadline, but want to see progress and validate feasibility
- **Resources:** 
  - Solo non-developer relying entirely on AI assistance
  - No existing development team or technical expertise
  - Learning and building simultaneously
- **Technical:**
  - Must use off-the-shelf AI tools (MediaPipe) - can't build custom models
  - Limited ability to handle complex technical challenges independently
  - Must work within browser/JavaScript constraints for web app
  - Video file size limitations (need efficient processing)

### Key Assumptions

- MediaPipe can accurately detect hand movements, body poses, and object interactions in factory floor videos (lighting, angles, multiple people may be challenges)
- AI categorization can achieve 70%+ accuracy, which will be acceptable to users
- Users will accept AI suggestions and adjust as needed (not expect 100% accuracy)
- Video quality from phones will be sufficient for analysis (users responsible for good video)
- Industrial engineers and CI teams will adopt a new tool if it's significantly easier than current methods
- Security concerns can be addressed through encryption and local processing options
- Solo development with AI assistance is feasible for this scope
- Google MediaPipe documentation and examples will be sufficient to implement features

---

## Risks & Open Questions

### Key Risks

1. **Security Risk - Video Data Leakage:**
   - **Impact:** Enterprise clients (e.g., Ford) could have entire assembly operations exposed
   - **Mitigation:** End-to-end encryption, local processing option, secure cloud storage, comprehensive security audit

2. **AI Accuracy Risk:**
   - **Impact:** If AI suggestions are consistently wrong, users will abandon the tool
   - **Mitigation:** Start with 70% accuracy target, make it easy to adjust, gather feedback for improvement

3. **Technical Feasibility Risk:**
   - **Impact:** MediaPipe may not work well in factory floor conditions (poor lighting, angles, gloves, etc.)
   - **Mitigation:** Early prototyping and testing with real factory videos, have fallback to manual marking

4. **Solo Development Risk:**
   - **Impact:** Complex technical challenges may be insurmountable without team support
   - **Mitigation:** Start with MVP, use AI assistance extensively, consider hiring help for critical components if needed

5. **Large File Management Risk:**
   - **Impact:** Videos 30 seconds to 10 minutes could be 50-500 MB, causing performance issues
   - **Mitigation:** Efficient video processing, compression, chunked uploads, local processing option

6. **User Adoption Risk:**
   - **Impact:** If tool is too complex or doesn't provide clear value, users won't adopt
   - **Mitigation:** Focus on ease of use, clear value proposition, extensive user testing

### Open Questions

1. Can MediaPipe accurately detect movements in factory floor conditions (gloves, poor lighting, multiple people in frame)?
2. What's the best approach for video storage - local processing vs. cloud with encryption?
3. How do we handle edge cases (operator mistakes mid-cycle, multiple operators, complex movements)?
4. What's the optimal workflow for users - should they name elements first or mark breakpoints first?
5. How do we balance AI automation with user control and learning?
6. What's the best tech stack for a solo non-developer to build this?
7. Should we start with manual categorization and add AI later, or build AI from the start?
8. How do we ensure security without making the tool too complex for users?

### Areas Needing Further Research

1. **MediaPipe Capabilities:** Deep dive into MediaPipe documentation, test with sample factory videos, understand limitations
2. **Video Processing:** Research efficient video handling, compression, and processing techniques
3. **Security Architecture:** Research best practices for video encryption, secure storage, and data protection
4. **Tech Stack Selection:** Research frameworks and tools that are AI-assistance friendly for solo developers
5. **User Experience Design:** Research video analysis tool UX patterns, timeline interfaces, and chart visualization
6. **Industrial Engineering Frameworks:** Ensure accurate implementation of value-added/non-value-added/waste categorization

---

## Appendices

### A. Research Summary

**Brainstorming Session Results:**
- Comprehensive brainstorming session conducted covering:
  - First Principles Thinking (core problems and fundamentals)
  - Question Storming (workflow and feature details)
  - What If Scenarios (AI capabilities and possibilities)
  - Mind Mapping (system architecture and connections)
  - Six Thinking Hats (multiple perspectives and critical analysis)
- Key insights documented in `docs/brainstorming-session-results.md`

**MediaPipe Research:**
- Google MediaPipe provides off-the-shelf capabilities for:
  - Hand landmark detection
  - Pose landmark detection (body position, walking, bending, reaching)
  - Object detection
  - Holistic landmark detection (combines face, hands, pose)
- Documentation available at: https://ai.google.dev/edge/mediapipe/solutions/guide
- Supports web, Python, Android, iOS platforms

**Technical Feasibility:**
- MediaPipe can detect movements needed for breakpoint detection and categorization
- Accuracy target of 70% is realistic for initial version
- Local processing is possible to address security concerns
- Web-based implementation is feasible

### B. Stakeholder Input

**User Perspective (from brainstorming):**
- Industrial engineers: "Love working on their laptops", frustrated with stopwatch method
- CI teams: "Don't have a ton of skill, but have very difficult assignments"
- Operators: "Don't like being filmed unless they know they're being filmed" - need careful approach
- Operators could participate in kaizen by seeing the analysis and contributing ideas

**Developer Perspective:**
- Solo non-developer: Excited about possibilities, concerned about technical feasibility
- Relying entirely on AI assistance for development
- Want to "see what's possible" with modern AI tools
- Committed to building it properly, not using no-code solutions

### C. References

- **Google MediaPipe Documentation:** https://ai.google.dev/edge/mediapipe/solutions/guide
- **Brainstorming Session Results:** `docs/brainstorming-session-results.md`
- **BMAD-METHOD™ Framework:** Used for structured brainstorming and project planning

---

## Next Steps

### Immediate Actions

1. **Research MediaPipe Implementation:**
   - Deep dive into MediaPipe documentation
   - Test hand/pose/object detection with sample videos
   - Prototype basic breakpoint detection
   - Validate feasibility of categorization approach

2. **Design Technical Architecture:**
   - Select tech stack (frontend framework, backend, database)
   - Design data model (videos, work elements, stations, products)
   - Plan security architecture (encryption, storage, processing)
   - Design API structure

3. **Create Detailed Feature Specifications:**
   - User flows for each core feature
   - UI/UX wireframes for video player and timeline
   - Data structures for work elements and categorizations
   - AI integration specifications

4. **Security Planning:**
   - Research encryption options for video data
   - Design local vs. cloud processing architecture
   - Plan secure video storage and transmission
   - Document security requirements

5. **Start Development:**
   - Set up development environment
   - Create basic project structure
   - Implement video upload and player (foundation)
   - Begin MediaPipe integration for breakpoint detection

6. **User Testing Preparation:**
   - Identify test users (industrial engineers, CI teams)
   - Prepare sample factory floor videos for testing
   - Create testing scenarios and success criteria

### PM Handoff

This Project Brief provides the full context for the Video-Based Work Element Analysis Tool. The project is ambitious but well-scoped, with clear MVP boundaries and a realistic understanding of constraints. Key priorities are:

1. **Security First:** Video data protection is critical for enterprise adoption
2. **AI Categorization:** This is the priority feature and key differentiator
3. **User Experience:** Must be significantly easier than current stopwatch method
4. **Incremental Development:** Start with foundation (video scrubbing), add AI features, then expand

The next phase should focus on creating a comprehensive PRD that breaks down the MVP features into detailed user stories, technical specifications, and implementation plans. The PRD should maintain the security-first approach and prioritize the AI categorization feature while ensuring the foundation (video scrubbing) is solid.

