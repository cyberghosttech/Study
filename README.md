# StudyOS — Student Learning Platform

StudyOS is a modern, scalable study platform designed to help students **Learn → Practice → Test → Analyze → Improve**.

## Features

### Core Learning
- **Curriculum-based lessons** with structured chapters and topics
- **AI-powered tutoring** with contextual awareness
- **Smart Text** — AI-generated topic summaries
- **Scan & Solve** — Photo-based problem solving (UI ready)
- **Bookmarks** for important lessons
- **Custom Subjects** — Create your own subjects with custom icons and colors
- **Document Management** — Upload PDFs, notes, books, images, audio, video, and links to each subject
- **Document Viewer** — View PDFs, images, notes, and play audio/video directly in the app

### Practice & Testing
- **MCQs** with instant feedback and explanations
- **Flashcards** with flip animation and mastery tracking
- **True/False** quick-fire challenges
- **Short & Long Questions** practice
- **Mixed Practice** mode
- **Weak Topics** focus mode
- **Mock examinations** with timer, navigation, and results analysis
- **Exam Prep** — Set exam date + materials → auto-generated study plan

### Gamification & Motivation
- **Daily Streaks** — Track consecutive study days
- **Badges & Achievements** — Unlock milestones
- **Brain Games** — Logic puzzles, number sequences, quick math
- **XP System** — Earn points for learning

### Analytics & Progress
- **Mastery Tracking** — Per-topic mastery with visual rings
- **Knowledge Gaps** — Identify weak areas with trend indicators
- **Progress dashboard** with subject-wise analytics
- **Weak-topic detection** with personalized recommendations
- **Study planner** for daily/weekly scheduling

### UX
- **Search** across all content
- **Dark mode** support
- **Fully responsive** design (mobile, tablet, desktop)
- **Accessibility** — Keyboard navigation, ARIA labels, semantic HTML

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
│   ├── layout/
│   │   └── AppShell.tsx       # Sidebar, header, mobile nav
│   └── modals/
│       ├── AddSubjectModal.tsx    # Create custom subjects
│       └── AddDocumentModal.tsx   # Upload documents to subjects
└── pages/
    ├── DashboardPage.tsx      # Main dashboard
    ├── SubjectsPage.tsx       # Subject listing + add subject
    ├── SubjectDetailPage.tsx  # Chapters (mock) or Documents (custom)
    ├── StudyPage.tsx          # Lesson viewer
    ├── PracticePage.tsx       # Practice/MCQ interface
    ├── FlashcardsPage.tsx     # Flashcard study mode
    ├── TrueFalsePage.tsx      # True/False challenges
    ├── BrainGamesPage.tsx     # Brain training games
    ├── ExamsPage.tsx          # Mock examination
    ├── ExamPrepPage.tsx       # Exam prep with auto study plan
    ├── MasteryPage.tsx        # Topic mastery tracking
    ├── ProgressPage.tsx       # Analytics + badges + streaks
    ├── PlannerPage.tsx        # Study planner
    ├── AITutorPage.tsx        # AI tutor chat
    ├── SettingsPage.tsx       # User settings
    └── NotFoundPage.tsx       # 404 page
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Redirects to `/dashboard` |
| `/dashboard` | Main dashboard with streaks, badges, quick actions |
| `/subjects` | All subjects listing (mock + user-created) with add subject |
| `/subjects/:subject` | Subject detail: chapters (mock) or documents (custom) |
| `/study/:subject/:chapter/:topic` | Lesson viewer |
| `/flashcards` | Flashcard decks with flip cards |
| `/practice` | Practice modes (MCQs, short, long, mixed) |
| `/true-false` | True/False quick challenges |
| `/exams` | Mock examinations |
| `/exam-prep` | Exam prep setup with auto study plan |
| `/mastery` | Topic-level mastery tracking |
| `/brain-games` | Brain games for study breaks |
| `/progress` | Student analytics with badges & streaks |
| `/planner` | Study planner |
| `/ai-tutor` | AI tutor with scan & voice input |
| `/settings` | User settings |

### Subject Detail Behavior
- **Mock subjects** (Computer Science, Mathematics, etc.): Show chapters and lessons
- **User-created subjects**: Show documents and resources with upload capability

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
- `user_subjects` → UserSubject (user-created subjects)
- `study_documents` → StudyDocument (uploaded documents)

### User-Created Content
Users can create custom subjects and upload documents:
- **Custom Subjects**: Created via modal with name, emoji icon, color, and description
- **Documents**: Supports PDF, notes (text), books, links, images, audio, and video
- **File Storage**: Files are stored as base64 in localStorage (demo mode)
- **Persistence**: User-created content persists across sessions via localStorage
- **Future**: Will migrate to Supabase Storage for file uploads

### Document Types
| Type | Description | Storage |
|------|-------------|---------|
| PDF | PDF documents | File upload (base64) |
| Notes | Text-based notes | Text content |
| Book | Books/textbooks | File upload (base64) |
| Link | External URLs | URL string |
| Image | Image files | File upload (base64) |
| Audio | Audio files | File upload (base64) |
| Video | Video files | File upload (base64) |

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

### ✅ Completed (Phase A-N)
- [x] Application shell with responsive navigation
- [x] Dashboard with streaks, badges, quick actions, recommendations
- [x] Subject listing and detail views
- [x] Lesson viewer with topic navigation
- [x] Practice interface with MCQ support
- [x] Flashcards with flip animation and mastery tracking
- [x] True/False quick challenges
- [x] Brain Games (number sequences, quick math)
- [x] Exam mode with timer and results
- [x] Exam Prep (set date + materials → auto plan)
- [x] Mastery tracking with visual rings and trends
- [x] Knowledge Gaps detection
- [x] Progress analytics with badges & streaks
- [x] Study planner
- [x] AI Tutor with scan & voice input UI
- [x] Smart Text AI summaries
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
