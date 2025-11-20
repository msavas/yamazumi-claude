# Yamazumi

Video-based work element analysis tool for manufacturing process improvement.

## Overview

Yamazumi is a web application that enables users to upload videos of manufacturing processes, analyze work elements, and generate visual charts (Yamazumi charts) to identify waste and optimize workflows. The application uses AI-powered breakpoint detection and categorization to assist users in analyzing video content.

## Prerequisites

- **Node.js**: Version 18.0 or higher
- **npm**: Version 9.0 or higher (or yarn/pnpm equivalent)
- **Git**: For version control

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd yamazumi
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (see [Environment Setup](#environment-setup) section below)

## Development

### Start Development Server

Run the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Build for Production

Build the application for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

### Code Formatting

Format code with Prettier:

```bash
npm run format
```

## Testing

### End-to-End Tests

Run Playwright E2E tests:

```bash
npm run test:e2e
```

Additional E2E test commands:
- `npm run test:e2e:ui` - Run tests with Playwright UI
- `npm run test:e2e:headed` - Run tests in headed mode (visible browser)
- `npm run test:e2e:debug` - Run tests in debug mode
- `npm run test:e2e:report` - View test report

For more information about testing, see [tests/README.md](tests/README.md).

## Project Structure

```
yamazumi/
├── app/                    # Next.js 15 App Router pages and layouts
├── components/             # React components organized by feature
├── lib/                    # Utility libraries and helper functions
├── types/                  # TypeScript type definitions
├── store/                  # Zustand state management stores
├── hooks/                  # Custom React hooks
├── tests/                  # Test files
│   ├── unit/              # Unit tests
│   └── e2e/               # End-to-end tests
├── docs/                   # Project documentation
└── scripts/                # Utility scripts
```

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Code Quality**: ESLint 9, Prettier
- **Testing**: Playwright (E2E), Vitest (Unit - to be configured)
- **State Management**: Zustand (to be added in future stories)
- **Backend**: Supabase (to be configured in future stories)

## Environment Setup

Environment variables will be configured in future stories. See [docs/setup-secrets.md](docs/setup-secrets.md) for details when available.

## Documentation

- [Architecture Documentation](docs/architecture.md) - System architecture and design decisions
- [Product Requirements](docs/PRD.md) - Product requirements and specifications
- [Epics and Stories](docs/epics.md) - Feature breakdown and user stories
- [Test Documentation](tests/README.md) - Testing guidelines and patterns

## Contributing

This project follows a structured development workflow. See the project documentation for details on:
- Story development process
- Code review guidelines
- Testing requirements

## License

[Add license information here]

