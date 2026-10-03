# StudyOS — Student Learning Platform

StudyOS is a modern, scalable study platform designed to help students **Learn → Practice → Test → Analyze → Improve**.

## Features

- **Curriculum-based lessons** with structured chapters and topics
- **AI-powered tutoring** with contextual awareness
- **Practice modes**: MCQs, Short Questions, Long Questions, Mixed Practice
- **Mock examinations** with timer, navigation, and results analysis
- **Progress tracking** with subject-wise analytics
- **Weak-topic detection** with personalized recommendations
- **Study planner** for daily/weekly scheduling
- **Bookmarks** for important lessons
- **Search** across all content
- **Dark mode** support
- **Fully responsive** design (mobile, tablet, desktop)

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS v4 |
| Routing | React Router v6 |
| Icons | Lucide React |
| Charts | Recharts |
| Animation | Framer Motion |
| Deployment | Vercel (planned) |
| Database | PostgreSQL via Supabase (planned) |
| Auth | Supabase Auth (planned) |
| AI | Provider-agnostic abstraction (mock for now) |

## Project Structure

```
src/
├── App.tsx                    # Main app with routing
├── main.tsx                   # Entry point
├── index.css                  # Global styles + design tokens
├── types/
│   └── index.ts              # TypeScript interfaces
├── data/
│   └── mock-data.ts          # Centralized mock data layer
├── lib/
│   └── ai-provider.ts        # AI provider abstraction
├── context/
│   └── AppContext.tsx         # Global state management
├── components/
│   └── layout/
│       └── AppShell.tsx       # Sidebar, header, mobile nav
└── pages/
    ├── DashboardPage.tsx      # Main dashboard
    ├── SubjectsPage.tsx       # Subject listing
    ├── SubjectDetailPage.tsx  # Chapter listing per subject
    ├── StudyPage.tsx          # Lesson viewer
    ├── PracticePage.tsx       # Practice/MCQ interface
    ├── ExamsPage.tsx          # Mock examination
    ├── ProgressPage.tsx       # Analytics dashboard
    ├── PlannerPage.tsx        # Study planner
    ├── AITutorPage.tsx        # AI tutor chat
    ├── SettingsPage.tsx       # User settings
    └── NotFoundPage.tsx       # 404 page
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Redirects to `/dashboard` |
| `/dashboard` | Main dashboard with overview |
| `/subjects` | All subjects listing |
| `/subjects/:subject` | Subject detail with chapters |
| `/study/:subject/:chapter/:topic` | Lesson viewer |
| `/practice` | Practice modes |
| `/exams` | Mock examinations |
| `/progress` | Student analytics |
| `/planner` | Study planner |
| `/ai-tutor` | AI tutor interface |
| `/settings` | User settings |

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type check
npm run typecheck
```

## Architecture Decisions

### Data Layer
Mock data is centralized in `src/data/mock-data.ts` with helper functions. This data structure maps directly to future Supabase tables:
- `profiles` → User
- `subjects` → Subject
- `chapters` → Chapter
- `topics` → Topic
- `lessons` → Lesson
- `questions` → Question
- `quiz_attempts` → QuizAttempt
- `study_sessions` → StudySession
- `progress` → Progress
- `bookmarks` → Bookmark
- `study_plans` → StudyPlan

### AI Provider Abstraction
The AI layer uses a provider interface (`src/lib/ai-provider.ts`) that can be swapped between mock and real providers (OpenAI, Anthropic, etc.) without changing the UI.

### Design Tokens
Semantic design tokens are defined in `src/index.css` using Tailwind's `@theme` directive. Colors are referenced by semantic names (e.g., `bg-surface`, `text-primary`) rather than raw values.

### Component Architecture
- Layout components are shared across all pages
- Pages are self-contained with their own sub-components
- State is managed via React Context for cross-cutting concerns
- Mock data is separated from UI components

## Current Implementation Status

### ✅ Completed (Phase A-I)
- [x] Application shell with responsive navigation
- [x] Dashboard with progress, recommendations, activity
- [x] Subject listing and detail views
- [x] Lesson viewer with topic navigation
- [x] Practice interface with MCQ support
- [x] Exam mode with timer and results
- [x] Progress analytics dashboard
- [x] Study planner
- [x] AI Tutor UI with mock responses
- [x] Settings page
- [x] Dark mode support
- [x] Mobile-responsive design
- [x] Accessibility basics

### 🔜 Planned (Phase J-M)
- [ ] Supabase integration (database)
- [ ] Authentication (Supabase Auth)
- [ ] Real AI provider integration
- [ ] File storage (Supabase Storage)
- [ ] Testing suite
- [ ] Deployment pipeline

## Future Integration Notes

### Supabase
When connecting Supabase:
1. Create tables matching the type definitions in `src/types/index.ts`
2. Replace mock data functions with Supabase queries
3. Use Supabase Realtime for live updates
4. Implement Row Level Security (RLS) policies

### AI Provider
When connecting a real AI provider:
1. Implement the `AIProvider` interface in `src/lib/ai-provider.ts`
2. Add API key to environment variables (never in source)
3. Add streaming support for better UX
4. Include student context in prompts

### Authentication
When adding authentication:
1. Set up Supabase Auth
2. Create auth context/hook
3. Add protected routes
4. Implement login/signup pages
5. Add session management

## License

Private — All rights reserved.
