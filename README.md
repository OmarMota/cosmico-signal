# Cosmico Signal

**Cosmico Signal** is a professional reputation and career intelligence platform for freelancers, contractors, and independent knowledge workers. It tracks, scores, and visualises your professional signal — a composite measure of reliability, performance, responsiveness, peer feedback, and growth — and uses it to surface personalised career trajectory predictions, learning recommendations, and matched opportunities.

---

## What It Does

Most platforms show you what you've done. Cosmico Signal shows you who you're becoming.

| Feature | Description |
|---|---|
| **Signal Score** | A composite 0–100 score across five dimensions, updated weekly from real activity events |
| **Signal Dimensions** | Reliability, Performance, Responsiveness, Feedback, Growth — each tracked independently |
| **Trajectory Engine** | Detects your current career phase (Establishing → Building → Specializing → Leading → Pioneering) and predicts next roles |
| **Learning Feed** | Curated content recommendations aligned to your weakest signal dimensions and declared goals |
| **Opportunities** | Matched roles and projects ranked by fit score against your signal profile and trajectory |
| **Profile & Availability** | Fully editable professional profile with real-time availability signalling |
| **Onboarding** | Multi-step guided setup that captures your role, specialisations, experience, and growth trajectory |

---

## Tech Stack

### Framework & Runtime
- **Next.js 16** (App Router, Turbopack) — server components, nested layouts, route groups
- **React 19** — with `use()` for async params in detail pages
- **TypeScript** — strict throughout

### UI & Styling
- **Tailwind CSS v4** — utility-first, with `@theme inline` tokens
- **shadcn/ui** — Lyra preset (`rounded-none`, neutral oklch scale)
- **Radix UI** — headless primitives for all interactive components
- **Framer Motion** — page transitions, stagger animations, animated numbers
- **GSAP** — section reveal animations on the profile editor
- **Recharts** — signal timeline area charts
- **Lucide React** — icon set

### State & Data
- **Zustand** — client-side stores for signal, trajectory, profile, intent, auth, and onboarding
- **Supabase** — authentication (magic link + OAuth), database, server-side client via `@supabase/ssr`
- **React Hook Form + Zod** — form validation across onboarding and profile sections

### Core Algorithms (`lib/algorithms/`)
- **`signal-scorer.ts`** — maps signal events to dimensions using source-credibility multipliers, computes weekly aggregates and composite score
- **`trajectory-detector.ts`** — role graph traversal to predict next positions, detects patterns (plateau, acceleration, decline), assigns career phase
- **`learning-recommender.ts`** — ranks content by signal gap, trajectory alignment, and declared intent
- **`intent-inferrer.ts`** — infers career intent from profile and signal data

---

## Project Structure

```
cosmico-signal-app/
├── app/
│   ├── (auth)/              # Login & signup pages
│   ├── (onboarding)/        # Multi-step onboarding flow
│   ├── (platform)/          # Authenticated app shell
│   │   ├── dashboard/       # Signal score hero + next steps + dimensions
│   │   ├── learn/           # Learning feed + content detail
│   │   ├── opportunities/   # Matched opportunities + fit breakdown
│   │   ├── profile/         # Profile viewer + signal radar
│   │   └── trajectory/      # Career arc + role predictions
│   └── api/                 # Route handlers
│       ├── signals/         # Signal events + weekly aggregates
│       ├── trajectory/      # Trajectory snapshot + detection
│       ├── learning/        # Content recommendations
│       ├── opportunities/   # Opportunity matching
│       ├── profile/         # Profile CRUD
│       ├── intent/          # Intent management + inference
│       └── onboarding/      # Onboarding completion
├── components/
│   ├── signal/              # SignalPulse, SignalRadar, SignalTimeline, SignalDimensionCard
│   ├── trajectory/          # TrajectoryArc (canvas), TrajectoryPhaseCard, RoleEvolutionMap
│   ├── dashboard/           # NextStepsPanel
│   ├── learning/            # ContentCard
│   ├── opportunities/       # OpportunityCard
│   ├── profile/             # ProfileHeader, SkillConstellation, AvailabilityToggle
│   │   └── sections/        # SectionAbout, SectionBasics, SectionExperiences, SectionSpecialties
│   ├── onboarding/          # OnboardingShell
│   ├── shared/              # GlowCard, SidebarNav, AnimatedNumber, LoadingSkeleton
│   └── ui/                  # shadcn component library
├── lib/
│   ├── algorithms/          # Signal scoring, trajectory detection, recommendations, intent inference
│   ├── stores/              # Zustand stores (signal, trajectory, profile, intent, auth, onboarding)
│   ├── types/               # TypeScript interfaces for all domain entities
│   ├── supabase/            # Client + server Supabase instances
│   ├── design-system/       # Design tokens (colors, spacing, typography, shadows)
│   ├── gsap/                # Animation hooks and timeline helpers
│   └── utils/               # cn(), score formatters, animation variants
└── public/                  # Static assets
```

---

## Signal Model

The Signal Score is composed of five weighted dimensions:

| Dimension | Weight | What it measures |
|---|---|---|
| **Reliability** | 30% | Consistent delivery, on-time rates, follow-through |
| **Performance** | 25% | Quality and impact of completed work |
| **Responsiveness** | 20% | Communication speed and quality |
| **Feedback** | 15% | Client and peer ratings |
| **Growth** | 10% | Learning activity, skill demonstrations, mentoring |

Each signal event carries a source credibility multiplier:

| Source | Multiplier |
|---|---|
| Client | 1.2× |
| Peer | 1.1× |
| Platform / Mentor / System | 1.0× |
| Self | 0.7× |

---

## Career Trajectory Phases

| Phase | Description |
|---|---|
| **Establishing** | Building foundations, early signal accumulation |
| **Building** | Growing consistently across dimensions |
| **Specializing** | Deepening expertise in a specific direction |
| **Leading** | Taking ownership, mentoring, high-impact delivery |
| **Pioneering** | Defining new approaches, elite signal across all dimensions |

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+
- A Supabase project (for auth and database)

### Installation

```bash
git clone https://github.com/OmarMota/cosmico-signal.git
cd cosmico-signal-app
pnpm install
```

### Environment Variables

Create a `.env.local` file at the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Run

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
pnpm build
pnpm start
```

---

## Design System

The UI uses the **shadcn Lyra preset** (`b38Tv0N96`):

- **Colors**: Neutral oklch scale — no brand hues, adapts cleanly to dark and light mode
- **Radius**: `rounded-none` throughout (sharp, structured aesthetic)
- **Primary**: Near-black in light mode / near-white in dark mode
- **Dark mode default**: `color-scheme: dark` applied at the HTML root
- **Tokens**: Defined in `lib/design-system/tokens.ts` and `app/globals.css`
- **Charts**: Neutral oklch grays for all data visualisations (dimension bars, trajectory arc, fit gauges)

---

## API Routes

| Route | Method | Description |
|---|---|---|
| `/api/signals` | GET / POST | Fetch signal events / log a new event |
| `/api/signals/aggregate` | GET | Weekly signal aggregates for timeline |
| `/api/trajectory` | GET | Latest trajectory snapshot |
| `/api/trajectory/detect` | POST | Run trajectory detection algorithm |
| `/api/learning/recommendations` | GET | Personalised content recommendations |
| `/api/opportunities` | GET | Matched opportunities sorted by fit score |
| `/api/profile` | GET / PATCH | Read / update user profile |
| `/api/intent` | GET / POST | Declared career intents |
| `/api/intent/infer` | POST | Infer intent from profile + signal data |
| `/api/onboarding` | POST | Complete onboarding and create initial profile |
| `/api/auth/callback` | GET | Supabase OAuth callback handler |

---

## License

Private — Cosmico © 2025. All rights reserved.
