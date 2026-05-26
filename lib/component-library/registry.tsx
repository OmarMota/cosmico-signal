'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertTitle, AlertDescription, AlertAction } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { GlowCard } from '@/components/shared/GlowCard'
import { AnimatedNumber } from '@/components/shared/AnimatedNumber'
import { Skeleton, CardSkeleton, DashboardSkeleton } from '@/components/shared/LoadingSkeleton'
import { SignalPulse } from '@/components/signal/SignalPulse'
import { SignalRadar } from '@/components/signal/SignalRadar'
import { SignalTimeline } from '@/components/signal/SignalTimeline'
import { SignalDimensionCard } from '@/components/signal/SignalDimensionCard'
import { SkillConstellation } from '@/components/profile/SkillConstellation'
import { AvailabilityToggle } from '@/components/profile/AvailabilityToggle'
import { ProfileHeader } from '@/components/profile/ProfileHeader'
import { TrajectoryPhaseCard } from '@/components/trajectory/TrajectoryPhaseCard'
import { OpportunityCard } from '@/components/opportunities/OpportunityCard'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader,
  AlertDialogTitle, AlertDialogDescription, AlertDialogFooter,
  AlertDialogAction, AlertDialogCancel, AlertDialogMedia,
} from '@/components/ui/alert-dialog'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter,
} from '@/components/ui/dialog'
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut,
  DropdownMenuGroup, DropdownMenuCheckboxItem, DropdownMenuSub,
  DropdownMenuSubTrigger, DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu'
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
  SelectGroup, SelectLabel, SelectSeparator,
} from '@/components/ui/select'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip'
import { Slider } from '@/components/ui/slider'
import { Kbd, KbdGroup } from '@/components/ui/kbd'
import { Spinner } from '@/components/ui/spinner'
import { Skeleton as UiSkeleton } from '@/components/ui/skeleton'
import { Label } from '@/components/ui/label'
import {
  Table, TableHeader, TableBody, TableFooter as TableFoot,
  TableHead, TableRow, TableCell, TableCaption,
} from '@/components/ui/table'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Popover, PopoverTrigger, PopoverContent, PopoverHeader,
  PopoverTitle, PopoverDescription,
} from '@/components/ui/popover'
import {
  Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle,
  SheetDescription, SheetFooter,
} from '@/components/ui/sheet'
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbPage, BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  Pagination, PaginationContent, PaginationItem, PaginationLink,
  PaginationNext, PaginationPrevious, PaginationEllipsis,
} from '@/components/ui/pagination'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import {
  Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyMedia,
} from '@/components/ui/empty'
import {
  Item, ItemMedia, ItemContent, ItemActions, ItemGroup,
  ItemTitle, ItemDescription,
} from '@/components/ui/item'
import {
  Field, FieldLabel, FieldDescription, FieldError, FieldGroup,
  FieldSet, FieldContent, FieldTitle, FieldLegend,
} from '@/components/ui/field'
import { ButtonGroup, ButtonGroupText, ButtonGroupSeparator } from '@/components/ui/button-group'
import {
  InputGroup, InputGroupAddon, InputGroupButton,
  InputGroupText as InputGroupTxt, InputGroupInput,
} from '@/components/ui/input-group'
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { FormField } from '@/components/ui/form-field'
import type { ComponentMeta, ChangelogEntry } from './types'

// ─── Mock data ──────────────────────────────────────────────────────────────

const MOCK_SIGNAL_PROFILE = {
  user_id: 'demo',
  reliability: 78,
  performance: 82,
  responsiveness: 71,
  feedback: 85,
  growth: 74,
  composite_score: 78,
  score_trend: 'rising' as const,
  last_computed: new Date().toISOString(),
}

const MOCK_AGGREGATES = [
  { id: '1', user_id: 'demo', week_start: '2026-03-31', composite_score: 58, reliability: 60, performance: 55, responsiveness: 56, feedback: 62, growth: 57, event_count: 10, computed_at: '' },
  { id: '2', user_id: 'demo', week_start: '2026-04-07', composite_score: 63, reliability: 65, performance: 60, responsiveness: 62, feedback: 67, growth: 62, event_count: 13, computed_at: '' },
  { id: '3', user_id: 'demo', week_start: '2026-04-14', composite_score: 68, reliability: 70, performance: 66, responsiveness: 67, feedback: 73, growth: 66, event_count: 15, computed_at: '' },
  { id: '4', user_id: 'demo', week_start: '2026-04-21', composite_score: 72, reliability: 74, performance: 70, responsiveness: 71, feedback: 77, growth: 70, event_count: 17, computed_at: '' },
  { id: '5', user_id: 'demo', week_start: '2026-04-28', composite_score: 75, reliability: 77, performance: 73, responsiveness: 74, feedback: 80, growth: 73, event_count: 19, computed_at: '' },
  { id: '6', user_id: 'demo', week_start: '2026-05-05', composite_score: 78, reliability: 80, performance: 76, responsiveness: 77, feedback: 83, growth: 76, event_count: 21, computed_at: '' },
]

const MOCK_PROFILE = {
  id: 'demo',
  display_name: 'Alex Rivera',
  primary_role: 'Senior Product Engineer',
  availability: 'available' as const,
  hourly_rate_min: 90,
  hourly_rate_max: 130,
  currency: 'USD',
  location: 'Barcelona, Spain',
  hours_per_week: 40,
  headline: 'Full-stack engineer focused on product UX and system design. 8 years building across fintech and SaaS.',
}

const MOCK_SKILLS = [
  { id: '1', name: 'TypeScript', category: 'technical' as const, proficiency: 5, is_primary: true },
  { id: '2', name: 'React', category: 'technical' as const, proficiency: 5, is_primary: true },
  { id: '3', name: 'Node.js', category: 'technical' as const, proficiency: 4, is_primary: true },
  { id: '4', name: 'PostgreSQL', category: 'technical' as const, proficiency: 4, is_primary: false },
  { id: '5', name: 'System Design', category: 'technical' as const, proficiency: 4, is_primary: false },
  { id: '6', name: 'Next.js', category: 'tool' as const, proficiency: 5, is_primary: true },
  { id: '7', name: 'Figma', category: 'tool' as const, proficiency: 3, is_primary: false },
  { id: '8', name: 'Leadership', category: 'soft' as const, proficiency: 4, is_primary: false },
  { id: '9', name: 'Communication', category: 'soft' as const, proficiency: 5, is_primary: false },
  { id: '10', name: 'GraphQL', category: 'technical' as const, proficiency: 3, is_primary: false },
  { id: '11', name: 'Docker', category: 'tool' as const, proficiency: 3, is_primary: false },
  { id: '12', name: 'Rust', category: 'technical' as const, proficiency: 2, is_primary: false },
]

const MOCK_TRAJECTORY = {
  user_id: 'demo',
  current_phase: 'growth' as const,
  growth_velocity: 0.35,
  role_predictions: [
    { role: 'Staff Engineer', timeframe_months: 14, confidence: 0.72 },
    { role: 'Engineering Lead', timeframe_months: 20, confidence: 0.54 },
  ],
}

const MOCK_OPPORTUNITY = {
  id: 'demo-001',
  title: 'Senior Product Engineer',
  company_name: 'Meridian Labs',
  opportunity_type: 'full_time' as const,
  remote_policy: 'remote' as const,
  rate_min: 140000,
  rate_max: 185000,
  currency: 'USD',
  required_skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'System Design'],
  fit: {
    fit_score: 84,
    skill_match: 80,
    breakdown: { matching_skills: ['React', 'TypeScript', 'Node.js'] },
  },
}

// ─── Wrapper components for stateful stories ─────────────────────────────────

function AvailabilityStory() {
  const [val, setVal] = React.useState<'available' | 'open' | 'unavailable'>('available')
  return <AvailabilityToggle value={val} onChange={setVal} />
}

function SwitchStory({ size }: { size?: 'sm' | 'default' }) {
  const [checked, setChecked] = React.useState(false)
  return <Switch size={size} checked={checked} onCheckedChange={setChecked} />
}

// ─── Button ────────────────────────────────────────────────────────────────

const buttonMeta: ComponentMeta = {
  id: 'ui-button',
  name: 'Button',
  category: 'ui',
  filePath: 'components/ui/button.tsx',
  description:
    'The primary interactive element across the UI system. Built with CVA variants, Radix Slot for composition, and accessible focus/disabled states. All variants share a base of rounded-none, text-xs, font-medium.',
  guidelines: [
    'Use "default" for the primary action — limit to one per visual section.',
    'Use "outline" or "ghost" for secondary or tertiary actions.',
    'Use "destructive" only for irreversible or high-risk operations.',
    'Keep label text short and action-oriented — verb + noun pattern.',
    'Icon-only sizes work when the context makes the action unambiguous.',
    'Never hide disabled buttons — show them to communicate unavailability.',
    'Use asChild to wrap navigational elements (links) without breaking semantics.',
  ],
  variations: [
    { name: 'default', description: 'Primary action. Solid bg-primary fill with primary-foreground text.' },
    { name: 'outline', description: 'Secondary action. Border-only until hover, then bg-muted.' },
    { name: 'secondary', description: 'Alternative secondary. bg-secondary fill.' },
    { name: 'ghost', description: 'Subtle. No background until hover/focus.' },
    { name: 'destructive', description: 'Dangerous actions. bg-destructive/10 tint with text-destructive.' },
    { name: 'link', description: 'Text link appearance. Underline on hover.' },
  ],
  behavior: [
    'Hover: background opacity shift via Tailwind opacity modifiers.',
    'Active (click): translate-y-px simulates a physical press — not token-driven.',
    'Focus-visible: 1px ring using --ring CSS variable at 50% opacity.',
    'Disabled: pointer-events-none + opacity-50 (not aria-disabled).',
    'aria-invalid: destructive border + ring — used in form validation contexts.',
    'asChild: swaps root to Radix Slot, enabling full element composition.',
  ],
  knobs: [
    {
      name: 'variant',
      type: 'select',
      options: ['default', 'outline', 'secondary', 'ghost', 'destructive', 'link'],
      defaultValue: 'default',
    },
    {
      name: 'size',
      type: 'select',
      options: ['xs', 'sm', 'default', 'lg', 'icon'],
      defaultValue: 'default',
    },
    { name: 'disabled', type: 'boolean', defaultValue: false },
    { name: 'label', type: 'text', defaultValue: 'Click me' },
  ],
  stories: [
    {
      id: 'interactive',
      name: 'Interactive',
      description: 'Adjust knobs to explore variants and sizes',
      render: (p) => (
        <Button
          variant={p.variant as 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive' | 'link'}
          size={p.size as 'default' | 'xs' | 'sm' | 'lg' | 'icon'}
          disabled={p.disabled as boolean}
        >
          {p.label as string}
        </Button>
      ),
      defaultProps: { variant: 'default', size: 'default', disabled: false, label: 'Click me' },
    },
    {
      id: 'all-variants',
      name: 'All Variants',
      description: 'All six variants at default size',
      render: () => (
        <div className="flex flex-wrap gap-3 items-center">
          {(
            ['default', 'outline', 'secondary', 'ghost', 'destructive', 'link'] as const
          ).map((v) => (
            <Button key={v} variant={v}>
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </Button>
          ))}
        </div>
      ),
      defaultProps: {},
    },
    {
      id: 'all-sizes',
      name: 'All Sizes',
      render: () => (
        <div className="flex flex-wrap gap-3 items-center">
          {(['xs', 'sm', 'default', 'lg'] as const).map((s) => (
            <Button key={s} size={s}>
              {s === 'default' ? 'Default' : `Size ${s}`}
            </Button>
          ))}
        </div>
      ),
      defaultProps: {},
    },
    {
      id: 'disabled-states',
      name: 'Disabled',
      render: () => (
        <div className="flex flex-wrap gap-3 items-center">
          {(['default', 'outline', 'ghost', 'destructive'] as const).map((v) => (
            <Button key={v} variant={v} disabled>
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </Button>
          ))}
        </div>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--primary', usage: 'bg-primary', category: 'color', description: 'Default variant background' },
      { token: '--primary-foreground', usage: 'text-primary-foreground', category: 'color', description: 'Default variant text' },
      { token: '--secondary', usage: 'bg-secondary', category: 'color', description: 'Secondary variant background' },
      { token: '--secondary-foreground', usage: 'text-secondary-foreground', category: 'color', description: 'Secondary variant text' },
      { token: '--muted', usage: 'hover:bg-muted', category: 'color', description: 'Ghost and outline hover state' },
      { token: '--destructive', usage: 'bg-destructive/10, text-destructive', category: 'color', description: 'Destructive variant fill and text' },
      { token: '--border', usage: 'border-border', category: 'color', description: 'Outline variant border color' },
      { token: '--ring', usage: 'focus-visible:ring-ring/50', category: 'color', description: 'Focus ring color' },
    ],
    outOfToken: [
      {
        property: 'translate-y-px',
        category: 'spacing',
        note: 'Hardcoded 1px active press — no spacing token at this scale',
        suggestion: 'Define --press-offset or --space-px token',
      },
      {
        property: 'h-8 / h-6 / h-7 / h-9',
        category: 'spacing',
        note: 'Size heights use Tailwind scale defaults, not componentSizes tokens',
        suggestion: 'Map to componentSizes.button.sm/md/lg heights in tokens.ts',
      },
      {
        property: 'text-xs (base class)',
        category: 'typography',
        note: 'Base font size is hardcoded in the CVA base string',
        suggestion: 'Replace with typography.scale.xs token from tokens.ts',
      },
    ],
  },
  codeSnippet: {
    react: `import { Button } from '@/components/ui/button'

// Primary action
<Button>Save Changes</Button>

// Variants
<Button variant="outline">Cancel</Button>
<Button variant="ghost">More options</Button>
<Button variant="destructive">Delete account</Button>

// Sizes
<Button size="sm">Compact</Button>
<Button size="lg">Prominent</Button>

// Composition — render as link without losing button styles
<Button asChild>
  <a href="/settings">Go to Settings</a>
</Button>`,
    html: `<!-- Semantic button elements -->
<button type="button" data-slot="button" data-variant="default">
  Save Changes
</button>

<button type="button" data-slot="button" data-variant="outline">
  Cancel
</button>

<!-- Disabled state -->
<button type="button" disabled data-slot="button">
  Unavailable
</button>`,
    css: `/* Design tokens consumed by Button */
:root {
  --primary:              oklch(0.205 0 0);
  --primary-foreground:   oklch(0.985 0 0);
  --secondary:            oklch(0.97 0 0);
  --muted:                oklch(0.97 0 0);
  --destructive:          oklch(0.577 0.245 27.325);
  --border:               oklch(0.922 0 0);
  --ring:                 oklch(0.708 0 0);

  /* Transition — not yet token-driven in component */
  --duration-normal: 200ms;
  --ease-default:    cubic-bezier(0.4, 0, 0.2, 1);
}`,
  },
  changelog: [
    {
      date: '2026-05-22T11:26:33+02:00',
      description: 'Replaced custom Cosmico variant styles with Lyra preset (shadcn b38Tv0N96). Applied rounded-none across all size variants. Removed btn-signal and btn-ghost CSS classes.',
      reason: 'Design system reset to neutral oklch palette — brand signal/violet colors retired.',
      author: 'OmarMota',
    },
    {
      date: '2026-05-24T02:05:52+02:00',
      description: 'Added to component library registry with full tokenAudit, knobs, stories, and code snippets.',
      reason: 'In-app component library launched at /library.',
      author: 'OmarMota',
    },
  ],
}

// ─── Badge ─────────────────────────────────────────────────────────────────

const badgeMeta: ComponentMeta = {
  id: 'ui-badge',
  name: 'Badge',
  category: 'ui',
  filePath: 'components/ui/badge.tsx',
  description:
    'Compact status label or tag. Fixed h-5 height with overflow hidden. Supports all semantic color variants, icon slots, and asChild composition. Built with CVA like Button.',
  guidelines: [
    'Use "default" for active or positive status.',
    'Use "secondary" for neutral or less prominent tags.',
    'Use "destructive" for error states or critical warnings.',
    'Use "outline" for subtle categorization without strong emphasis.',
    'Keep text to 1–3 words. Overflow is hidden at h-5.',
    'Use asChild to make badges interactive (links, buttons) without breaking their styles.',
    'Icons are auto-sized to 12px via [&>svg]:size-3 — pass icons as direct children.',
  ],
  variations: [
    { name: 'default', description: 'Primary status. Solid bg-primary.' },
    { name: 'secondary', description: 'Neutral status. bg-secondary fill.' },
    { name: 'destructive', description: 'Error or warning. bg-destructive/10 tint.' },
    { name: 'outline', description: 'Subtle. Border-only, no fill.' },
    { name: 'ghost', description: 'Background appears only on hover.' },
    { name: 'link', description: 'Text link style with underline on hover.' },
  ],
  behavior: [
    'Fixed h-5 height — text longer than badge width is clipped by overflow:hidden.',
    'Icons auto-size to 12px via [&>svg]:size-3! (important override).',
    'aria-invalid: adds destructive ring for use inside form validation.',
    'asChild: swaps root element via Radix Slot for full composition.',
    'Transition: all — matches Button pattern for consistent interaction feel.',
  ],
  knobs: [
    {
      name: 'variant',
      type: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'],
      defaultValue: 'default',
    },
    { name: 'label', type: 'text', defaultValue: 'Badge' },
  ],
  stories: [
    {
      id: 'interactive',
      name: 'Interactive',
      render: (p) => (
        <Badge
          variant={
            p.variant as 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'
          }
        >
          {p.label as string}
        </Badge>
      ),
      defaultProps: { variant: 'default', label: 'Badge' },
    },
    {
      id: 'all-variants',
      name: 'All Variants',
      render: () => (
        <div className="flex flex-wrap gap-2 items-center">
          {(
            ['default', 'secondary', 'destructive', 'outline', 'ghost'] as const
          ).map((v) => (
            <Badge key={v} variant={v}>
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </Badge>
          ))}
        </div>
      ),
      defaultProps: {},
    },
    {
      id: 'status-labels',
      name: 'Status Labels',
      description: 'Typical real-world usage',
      render: () => (
        <div className="flex flex-wrap gap-2 items-center">
          <Badge variant="default">Active</Badge>
          <Badge variant="secondary">Draft</Badge>
          <Badge variant="outline">Pending</Badge>
          <Badge variant="destructive">Error</Badge>
          <Badge variant="ghost">Archived</Badge>
        </div>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--primary', usage: 'bg-primary', category: 'color', description: 'Default variant background' },
      { token: '--primary-foreground', usage: 'text-primary-foreground', category: 'color', description: 'Default variant text' },
      { token: '--secondary', usage: 'bg-secondary', category: 'color', description: 'Secondary variant background' },
      { token: '--secondary-foreground', usage: 'text-secondary-foreground', category: 'color', description: 'Secondary variant text' },
      { token: '--destructive', usage: 'bg-destructive/10', category: 'color', description: 'Destructive tint' },
      { token: '--border', usage: 'border-border', category: 'color', description: 'Outline variant border' },
      { token: '--muted', usage: 'hover:bg-muted', category: 'color', description: 'Ghost hover background' },
      { token: '--ring', usage: 'focus-visible:ring-ring/50', category: 'color', description: 'Focus ring' },
    ],
    outOfToken: [
      {
        property: 'h-5',
        category: 'spacing',
        note: 'Fixed 1.25rem height is hardcoded, not from a component size token',
        suggestion: 'Define componentSizes.badge.height in tokens.ts',
      },
      {
        property: 'px-2 py-0.5',
        category: 'spacing',
        note: 'Internal padding uses Tailwind defaults, not --space tokens',
        suggestion: 'Map to --space-2 and --space-0.5 if defined',
      },
    ],
  },
  codeSnippet: {
    react: `import { Badge } from '@/components/ui/badge'

// Status
<Badge>Active</Badge>
<Badge variant="secondary">Draft</Badge>
<Badge variant="outline">Pending</Badge>
<Badge variant="destructive">Error</Badge>

// As interactive link
<Badge asChild variant="outline">
  <a href="/status">View Status</a>
</Badge>`,
    html: `<span data-slot="badge" data-variant="default">Active</span>
<span data-slot="badge" data-variant="secondary">Draft</span>
<span data-slot="badge" data-variant="outline">Pending</span>
<span data-slot="badge" data-variant="destructive">Error</span>`,
    css: `/* Tokens consumed by Badge */
:root {
  --primary:   oklch(0.205 0 0);
  --secondary: oklch(0.97 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border:    oklch(0.922 0 0);
  --muted:     oklch(0.97 0 0);
}

[data-slot="badge"] {
  display: inline-flex;
  height: 1.25rem;       /* h-5 — not from token */
  align-items: center;
  border-radius: 0;       /* rounded-none */
  font-size: 0.75rem;
  font-weight: 500;
  overflow: hidden;
}`,
  },
  changelog: [
    {
      date: '2026-05-22T11:26:33+02:00',
      description: 'Replaced signal/violet Cosmico variant with shadcn Lyra preset. Added ghost and link variants. Removed text-gradient-signal class.',
      reason: 'Design system reset — all brand-specific badge colors retired in favour of neutral oklch scale.',
      author: 'OmarMota',
    },
    {
      date: '2026-05-24T02:05:52+02:00',
      description: 'Added to component library registry with five documented variants and tokenAudit.',
      reason: 'In-app component library launched at /library.',
      author: 'OmarMota',
    },
  ],
}

// ─── Card ──────────────────────────────────────────────────────────────────

const cardMeta: ComponentMeta = {
  id: 'ui-card',
  name: 'Card',
  category: 'ui',
  filePath: 'components/ui/card.tsx',
  description:
    'Container with semantic sub-components (Header, Title, Description, Content, Footer, Action). Uses ring-1 on foreground/10 instead of a border for subtle depth without harsh outlines.',
  guidelines: [
    'Always use semantic sub-components — never nest raw divs directly inside Card.',
    'Place the primary action in CardAction (top-right grid slot), secondary in CardFooter.',
    'Use size="sm" for dense contexts like sidebars, lists, and notification panels.',
    'Images as first/last children get rounded-none automatically.',
    'Do not override CardDescription color unless a specific status is being communicated.',
    'CardFooter adds its own border-t — do not manually add a separator above it.',
  ],
  variations: [
    { name: 'default', description: 'Standard: gap-4, py-4, px-4. Full-width card.' },
    { name: 'sm', description: 'Compact: gap-2, py-3, px-3. For dense information layouts.' },
  ],
  behavior: [
    'ring-foreground/10 (not border-border) gives depth without harsh outlines.',
    'CardFooter self-activates border-t via has-data-[slot=card-footer] selector on parent.',
    '@container/card-header in CardHeader enables responsive sub-layouts.',
    'group/card allows descendants to use group-data- selectors for size-aware styles.',
  ],
  knobs: [
    { name: 'size', type: 'select', options: ['default', 'sm'], defaultValue: 'default' },
    { name: 'showDescription', type: 'boolean', defaultValue: true },
    { name: 'showFooter', type: 'boolean', defaultValue: true },
  ],
  stories: [
    {
      id: 'interactive',
      name: 'Interactive',
      render: (p) => (
        <Card size={p.size as 'default' | 'sm'} className="w-80">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            {(p.showDescription as boolean) && (
              <CardDescription>Supporting description for this card.</CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Card body content area. Any element can go here — forms, lists, charts, media.
            </p>
          </CardContent>
          {(p.showFooter as boolean) && (
            <CardFooter className="gap-2">
              <Button size="sm" variant="outline">
                Cancel
              </Button>
              <Button size="sm" className="ml-auto">
                Save
              </Button>
            </CardFooter>
          )}
        </Card>
      ),
      defaultProps: { size: 'default', showDescription: true, showFooter: true },
    },
    {
      id: 'minimal',
      name: 'Content Only',
      description: 'Card with no header or footer',
      render: () => (
        <Card className="w-72">
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Minimal card — content slot only. Useful for widget containers.
            </p>
          </CardContent>
        </Card>
      ),
      defaultProps: {},
    },
    {
      id: 'sm-size',
      name: 'Compact (sm)',
      render: () => (
        <div className="flex gap-3">
          {[1, 2, 3].map((n) => (
            <Card key={n} size="sm" className="w-40">
              <CardHeader>
                <CardTitle>Item {n}</CardTitle>
                <CardDescription>Brief label</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--card', usage: 'bg-card', category: 'color', description: 'Card background' },
      { token: '--card-foreground', usage: 'text-card-foreground', category: 'color', description: 'Card text' },
      { token: '--muted-foreground', usage: 'text-muted-foreground', category: 'color', description: 'Description text' },
      { token: '--foreground', usage: 'ring-foreground/10', category: 'color', description: 'Subtle ring depth' },
      { token: '--border', usage: 'border-t (CardFooter)', category: 'color', description: 'Footer divider' },
    ],
    outOfToken: [
      {
        property: 'py-4 / py-3',
        category: 'spacing',
        note: 'Card vertical padding uses Tailwind defaults, not --space tokens',
        suggestion: 'Map to --space-4 and --space-3',
      },
      {
        property: 'gap-4 / gap-2',
        category: 'spacing',
        note: 'Internal gap uses Tailwind scale, not spacing tokens',
        suggestion: 'Map to --space-4 and --space-2 from tokens.ts',
      },
      {
        property: 'text-xs/relaxed',
        category: 'typography',
        note: 'Base font size + line-height hardcoded in CVA base string',
        suggestion: 'Use typography.scale.xs + typography.leading.relaxed tokens',
      },
    ],
  },
  codeSnippet: {
    react: `import {
  Card, CardHeader, CardTitle, CardDescription,
  CardContent, CardFooter, CardAction
} from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Supporting text</CardDescription>
    <CardAction>
      {/* Optional top-right action */}
    </CardAction>
  </CardHeader>
  <CardContent>
    {/* Main content */}
  </CardContent>
  <CardFooter>
    <Button variant="outline">Cancel</Button>
    <Button className="ml-auto">Save</Button>
  </CardFooter>
</Card>

{/* Compact variant */}
<Card size="sm">...</Card>`,
    html: `<div data-slot="card" data-size="default">
  <div data-slot="card-header">
    <div data-slot="card-title">Title</div>
    <div data-slot="card-description">Description</div>
  </div>
  <div data-slot="card-content">
    <!-- content -->
  </div>
  <div data-slot="card-footer">
    <!-- actions -->
  </div>
</div>`,
    css: `/* Tokens consumed by Card */
:root {
  --card:             oklch(1 0 0);
  --card-foreground:  oklch(0.145 0 0);
  --foreground:       oklch(0.145 0 0);
  --border:           oklch(0.922 0 0);
  --muted-foreground: oklch(0.556 0 0);
}

[data-slot="card"] {
  background: oklch(var(--card));
  color: oklch(var(--card-foreground));
  border-radius: 0;
  /* ring-1 = thin box-shadow, not a border */
  box-shadow: 0 0 0 1px oklch(var(--foreground) / 0.1);
}`,
  },
}

// ─── GlowCard ──────────────────────────────────────────────────────────────

const glowCardMeta: ComponentMeta = {
  id: 'shared-glow-card',
  name: 'GlowCard',
  category: 'shared',
  filePath: 'components/shared/GlowCard.tsx',
  description:
    'Cosmico-specific card wrapper with three visual variants and optional hover/glow effects. Thin layer over a plain div — not built on the Card component. Accepts ref for animation.',
  guidelines: [
    'Use "default" for general content containers.',
    'Use "primary" to draw visual attention to key sections.',
    'Use "muted" for secondary or recessed content areas.',
    'Enable hover={true} on clickable or expandable cards.',
    'Enable glow={true} sparingly — only for featured or spotlighted content.',
    'Prefer GlowCard over Card when Cosmico-specific visual language is needed.',
    'All className overrides are fully composable — use them freely.',
  ],
  variations: [
    { name: 'default', description: 'border-border. Neutral container, no background modifier.' },
    { name: 'primary', description: 'border-primary/20. Draws attention to key content.' },
    { name: 'muted', description: 'border-border + bg-muted/20. Recedes visually.' },
  ],
  behavior: [
    'hover prop: adds transition-all duration-200 and a darker border on hover.',
    'glow prop: applies shadow-md (generic, not the signal shadow tokens).',
    'forwardRef: exposes ref for Framer Motion and IntersectionObserver use cases.',
    'All variant styles are plain Tailwind strings — no runtime style computation.',
  ],
  knobs: [
    { name: 'variant', type: 'select', options: ['default', 'primary', 'muted'], defaultValue: 'default' },
    { name: 'hover', type: 'boolean', defaultValue: false },
    { name: 'glow', type: 'boolean', defaultValue: false },
  ],
  stories: [
    {
      id: 'interactive',
      name: 'Interactive',
      render: (p) => (
        <GlowCard
          variant={p.variant as 'default' | 'primary' | 'muted'}
          hover={p.hover as boolean}
          glow={p.glow as boolean}
          className="p-6 w-64"
        >
          <p className="text-sm font-medium">Card Title</p>
          <p className="text-xs text-muted-foreground mt-1">
            Card description text. Toggle knobs to preview states.
          </p>
        </GlowCard>
      ),
      defaultProps: { variant: 'default', hover: false, glow: false },
    },
    {
      id: 'all-variants',
      name: 'All Variants',
      render: () => (
        <div className="flex flex-wrap gap-4">
          {(['default', 'primary', 'muted'] as const).map((v) => (
            <GlowCard key={v} variant={v} className="p-4 w-40">
              <p className="text-xs font-medium capitalize">{v}</p>
              <p className="text-xs text-muted-foreground mt-1">Variant preview</p>
            </GlowCard>
          ))}
        </div>
      ),
      defaultProps: {},
    },
    {
      id: 'hover-states',
      name: 'Hover States',
      description: 'All variants with hover enabled',
      render: () => (
        <div className="flex flex-wrap gap-4">
          {(['default', 'primary', 'muted'] as const).map((v) => (
            <GlowCard key={v} variant={v} hover className="p-4 w-40 cursor-pointer">
              <p className="text-xs font-medium capitalize">{v}</p>
              <p className="text-xs text-muted-foreground mt-1">Hover me</p>
            </GlowCard>
          ))}
        </div>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--border', usage: 'border-border', category: 'color', description: 'Default and muted variant border' },
      { token: '--primary', usage: 'border-primary/20, hover:border-primary/40', category: 'color', description: 'Primary variant border (resting and hover)' },
      { token: '--muted', usage: 'bg-muted/20', category: 'color', description: 'Muted variant background tint' },
      { token: '--card', usage: 'bg-card', category: 'color', description: 'Base card background' },
      { token: '--shadow-md', usage: 'shadow-md (glow prop)', category: 'shadow', description: 'Glow effect shadow' },
    ],
    outOfToken: [
      {
        property: 'duration-200',
        category: 'animation',
        note: 'Uses Tailwind default 200ms, not --duration-normal CSS token',
        suggestion: 'Use duration-[var(--duration-normal)] to stay on token',
      },
      {
        property: 'border (1px implicit)',
        category: 'spacing',
        note: 'Border width is not token-driven',
        suggestion: 'Could define --border-width token if width needs to vary',
      },
    ],
  },
  codeSnippet: {
    react: `import { GlowCard } from '@/components/shared/GlowCard'

// Default container
<GlowCard className="p-6">
  Content here
</GlowCard>

// Interactive card
<GlowCard variant="primary" hover>
  Hover to see border shift
</GlowCard>

// Featured spotlight card
<GlowCard variant="primary" hover glow>
  Featured content
</GlowCard>

// Forwarded ref (for animations)
const ref = useRef<HTMLDivElement>(null)
<GlowCard ref={ref} variant="muted" className="p-4">
  Ref-enabled
</GlowCard>`,
    html: `<div class="glow-card" data-variant="default">
  Content here
</div>

<div class="glow-card" data-variant="primary" data-hover="true">
  Hover me
</div>`,
    css: `/* Tokens consumed by GlowCard */
:root {
  --border:  oklch(0.922 0 0);
  --card:    oklch(1 0 0);
  --primary: oklch(0.205 0 0);
  --muted:   oklch(0.97 0 0);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.glow-card {
  border-radius: 0;
  border: 1px solid oklch(var(--border));
  background: oklch(var(--card));
}
.glow-card[data-variant="primary"] {
  border-color: oklch(var(--primary) / 0.2);
}
.glow-card[data-variant="muted"] {
  background: oklch(var(--muted) / 0.2);
}`,
  },
}

// ─── SignalPulse ────────────────────────────────────────────────────────────

const signalPulseMeta: ComponentMeta = {
  id: 'signal-pulse',
  name: 'SignalPulse',
  category: 'signal',
  filePath: 'components/signal/SignalPulse.tsx',
  description:
    'Animated orb displaying a signal score (0–100) with concentric pulsing rings. Framer Motion springs animate score changes smoothly. Pulse rate and glow intensity are both derived from score value.',
  guidelines: [
    'Always provide a numeric score between 0 and 100.',
    'Use size="lg" for hero displays (profile, onboarding reveal).',
    'Use size="md" for dashboard widgets and card-level contexts.',
    'Use size="sm" for compact inline indicators — score and label are hidden at sm.',
    'trend affects the directional arrow color only, not animation speed.',
    'Do not place in constrained overflow:hidden containers — rings extend beyond the orb.',
    'Do not animate score prop faster than ~500ms — the spring handles interpolation.',
  ],
  variations: [
    { name: 'sm', description: '80px orb. Score and label hidden. Outer rings: 96/112px.' },
    { name: 'md', description: '120px orb. Score and label visible. Rings: 144/168px.' },
    { name: 'lg', description: '160px orb. Full: score + label + trend arrow. Rings: 192/224px.' },
  ],
  behavior: [
    'springScore (stiffness:60, damping:20) interpolates score prop changes smoothly.',
    'glowOpacity: maps springScore [0,100] → [0.06, 0.25] for intensity scaling.',
    'pulseDuration: 3 - (score/100 * 1.5)s — higher scores produce faster pulses.',
    'Outer ring animates: scale [1→1.12→1], opacity [0.3→0→0.3], continuous.',
    'Middle ring: same pattern at 80% duration, 0.2s phase offset.',
    'Core orb boxShadow animates between low/high values in sync with pulse.',
  ],
  knobs: [
    {
      name: 'score',
      type: 'select',
      options: ['10', '30', '55', '75', '92'],
      defaultValue: '75',
      label: 'Score',
    },
    {
      name: 'trend',
      type: 'select',
      options: ['rising', 'stable', 'falling'],
      defaultValue: 'stable',
    },
    { name: 'size', type: 'select', options: ['sm', 'md', 'lg'], defaultValue: 'lg' },
  ],
  stories: [
    {
      id: 'interactive',
      name: 'Interactive',
      description: 'Change score, trend, and size via knobs',
      render: (p) => (
        <SignalPulse
          score={parseInt(p.score as string)}
          trend={p.trend as 'rising' | 'stable' | 'falling'}
          size={p.size as 'sm' | 'md' | 'lg'}
        />
      ),
      defaultProps: { score: '75', trend: 'stable', size: 'lg' },
    },
    {
      id: 'all-sizes',
      name: 'All Sizes',
      render: () => (
        <div className="flex items-end gap-10">
          {(['sm', 'md', 'lg'] as const).map((s) => (
            <div key={s} className="flex flex-col items-center gap-3">
              <SignalPulse score={75} size={s} />
              <span className="text-xs text-muted-foreground">size=&quot;{s}&quot;</span>
            </div>
          ))}
        </div>
      ),
      defaultProps: {},
    },
    {
      id: 'score-range',
      name: 'Score Range',
      description: 'Pulse rate and glow intensity vary with score',
      render: () => (
        <div className="flex items-end gap-8">
          {[
            { score: 20, label: 'Emerging' },
            { score: 55, label: 'Developing' },
            { score: 92, label: 'Elite' },
          ].map(({ score, label }) => (
            <div key={score} className="flex flex-col items-center gap-3">
              <SignalPulse score={score} size="md" />
              <span className="text-xs text-muted-foreground">
                {label} ({score})
              </span>
            </div>
          ))}
        </div>
      ),
      defaultProps: {},
    },
    {
      id: 'trend-states',
      name: 'Trend States',
      render: () => (
        <div className="flex items-end gap-10">
          {(['rising', 'stable', 'falling'] as const).map((t) => (
            <div key={t} className="flex flex-col items-center gap-3">
              <SignalPulse score={75} trend={t} size="md" />
              <span className="text-xs text-muted-foreground capitalize">{t}</span>
            </div>
          ))}
        </div>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--border', usage: 'border-border/40, border-border/60', category: 'color', description: 'Pulse ring borders at two opacities' },
      { token: '--foreground', usage: 'bg-foreground (glow backdrop), text-foreground (score numeral)', category: 'color', description: 'Glow blur layer and animated score number' },
      { token: '--card', usage: 'bg-card', category: 'color', description: 'Core orb background' },
      { token: '--muted-foreground', usage: 'text-muted-foreground', category: 'color', description: 'Score label text (getScoreLabel) at size lg' },
    ],
    outOfToken: [
      {
        property: 'rgba(0,0,0,0.15) boxShadow',
        category: 'shadow',
        note: 'Hardcoded RGBA shadow — not using --shadow-signal or shadow tokens',
        suggestion: 'Replace with var(--shadow-signal) or var(--shadow-md)',
      },
      {
        property: 'rgba(255,255,255,0.06) inset',
        category: 'color',
        note: 'Hardcoded white inset highlight not represented in token system',
        suggestion: 'Define --surface-highlight token for glass-like inner edge',
      },
      {
        property: '#34d399 / #f87171 / #94a3b8',
        category: 'color',
        note: 'Trend arrow colors are hardcoded hex values — not design tokens',
        suggestion: 'Use --available / --destructive / --muted-foreground CSS vars',
      },
      {
        property: 'stiffness:60, damping:20',
        category: 'animation',
        note: 'Framer Motion spring values are hardcoded, not from animation tokens',
        suggestion: 'Define spring presets in animation token section of tokens.ts',
      },
      {
        property: 'filter: blur(20px / 10px)',
        category: 'shadow',
        note: 'Glow blur amount hardcoded per size variant',
        suggestion: 'Define --glow-blur-lg and --glow-blur-md tokens',
      },
    ],
  },
  codeSnippet: {
    react: `import { SignalPulse } from '@/components/signal/SignalPulse'

// Hero display (profile page, onboarding reveal)
<SignalPulse score={85} trend="rising" size="lg" />

// Dashboard widget
<SignalPulse score={65} trend="stable" size="md" />

// Compact indicator (no score label shown)
<SignalPulse score={45} size="sm" />

// Animate score change — spring handles interpolation
const [score, setScore] = useState(0)
// ... later:
setScore(85) // animates smoothly via useSpring`,
    html: `<!-- SignalPulse requires JavaScript (Framer Motion) -->
<!-- No native HTML equivalent -->
<div class="signal-pulse" style="width: 224px; height: 224px;">
  <div class="ring ring--outer"></div>
  <div class="ring ring--middle"></div>
  <div class="glow-backdrop"></div>
  <div class="core-orb">
    <span class="score">85</span>
    <span class="label">Strong</span>
    <span class="trend rising">↑</span>
  </div>
</div>`,
    css: `/* Tokens consumed by SignalPulse */
:root {
  --border:     oklch(0.922 0 0);
  --card:       oklch(1 0 0);
  --foreground: oklch(0.145 0 0);

  /* NOT currently token-driven (see Token Audit): */
  /* Trend colors: #34d399, #f87171, #94a3b8 */
  /* Glow: rgba(0,0,0,0.15), blur(20px)       */
  /* Spring: stiffness 60, damping 20          */
}

.core-orb {

  background: oklch(var(--card));
  border: 1px solid oklch(var(--border));
  border-radius: 9999px;
}`,
  },
  changelog: [
    {
      date: '2026-04-13T00:17:43+02:00',
      description: 'Initial implementation — animated orb with concentric rings, Framer Motion spring score interpolation, size variants sm/md/lg.',
      reason: 'Core signal score visualisation for profile and onboarding pages.',
      author: 'OmarMota',
    },
    {
      date: '2026-05-24T02:05:52+02:00',
      description: 'Added to component library registry. Documented tokenAudit (5 out-of-token hardcoded values identified: rgba shadows, hex trend colors, spring parameters, blur values).',
      reason: 'In-app component library launched at /library.',
      author: 'OmarMota',
    },
    {
      date: '2026-05-24T10:00:00+02:00',
      description: 'Fixed tokenAudit — added missing --muted-foreground (score label) and clarified --foreground usage (glow backdrop + score numeral).',
      reason: 'Token audit verification pass: inToken entries were incomplete.',
      author: 'OmarMota',
    },
  ],
}

// ─── Input ─────────────────────────────────────────────────────────────────

const inputMeta: ComponentMeta = {
  id: 'ui-input',
  name: 'Input',
  category: 'ui',
  filePath: 'components/ui/input.tsx',
  description:
    'Single-line text input. h-8 fixed height, transparent background. Inherits full form validation states (aria-invalid) and file input support. No CVA — all variants applied via Tailwind directly.',
  guidelines: [
    'Always pair with a Label for accessibility.',
    'Use aria-invalid for form validation — it triggers the red border + ring automatically.',
    'Use placeholder sparingly — it disappears on typing and is not a substitute for a label.',
    'Use type="search", "email", "password" etc for semantic meaning and mobile keyboards.',
    'File inputs are styled inline — use the file: pseudo-class utilities if needed.',
  ],
  variations: [
    { name: 'default', description: 'Transparent background, border-input, h-8.' },
    { name: 'disabled', description: 'bg-input/50, pointer-events-none, opacity-50.' },
    { name: 'invalid', description: 'aria-invalid: border-destructive + destructive ring.' },
    { name: 'file', description: 'type="file" — inline-flex file button styled via file: prefix.' },
  ],
  behavior: [
    'Focus-visible: border-ring + ring-1 ring-ring/50.',
    'Disabled: bg-input/50 background and opacity-50.',
    'aria-invalid: border-destructive + ring-destructive/20.',
    'Dark mode: bg-input/30 resting, bg-input/80 when disabled.',
    'placeholder: uses text-muted-foreground — no override needed.',
  ],
  knobs: [
    { name: 'type', type: 'select', options: ['text', 'email', 'password', 'search', 'number'], defaultValue: 'text' },
    { name: 'placeholder', type: 'text', defaultValue: 'Enter value...' },
    { name: 'disabled', type: 'boolean', defaultValue: false },
  ],
  stories: [
    {
      id: 'interactive',
      name: 'Interactive',
      render: (p) => (
        <Input
          type={p.type as string}
          placeholder={p.placeholder as string}
          disabled={p.disabled as boolean}
          className="w-64"
        />
      ),
      defaultProps: { type: 'text', placeholder: 'Enter value...', disabled: false },
    },
    {
      id: 'states',
      name: 'All States',
      render: () => (
        <div className="flex flex-col gap-3 w-64">
          <Input placeholder="Default state" />
          <Input placeholder="Disabled" disabled />
          <Input placeholder="Invalid" aria-invalid />
          <Input type="password" placeholder="Password" />
        </div>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--input', usage: 'border-input, dark:bg-input/30', category: 'color', description: 'Border and dark-mode background' },
      { token: '--ring', usage: 'focus-visible:border-ring, focus-visible:ring-ring/50', category: 'color', description: 'Focus border + ring' },
      { token: '--destructive', usage: 'aria-invalid:border-destructive', category: 'color', description: 'Invalid state border' },
      { token: '--muted-foreground', usage: 'placeholder:text-muted-foreground', category: 'color', description: 'Placeholder text' },
    ],
    outOfToken: [
      { property: 'h-8', category: 'spacing', note: 'Fixed height uses Tailwind default, not componentSizes.input token', suggestion: 'Map to componentSizes.input.md.height in tokens.ts' },
      { property: 'px-2.5 py-1', category: 'spacing', note: 'Padding uses Tailwind defaults', suggestion: 'Map to componentSizes.input.md.px token' },
      { property: 'text-xs', category: 'typography', note: 'Font size hardcoded in base class', suggestion: 'Use typography.scale.xs token' },
    ],
  },
  codeSnippet: {
    react: `import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// Always pair with Label
<div className="flex flex-col gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>

// Disabled
<Input disabled placeholder="Not editable" />

// Invalid (form validation)
<Input aria-invalid placeholder="Invalid value" />`,
    html: `<input
  data-slot="input"
  type="text"
  placeholder="Enter value..."
/>`,
    css: `:root {
  --input:            oklch(0.922 0 0);
  --ring:             oklch(0.708 0 0);
  --destructive:      oklch(0.577 0.245 27.325);
  --muted-foreground: oklch(0.556 0 0);
}

[data-slot="input"] {
  height: 2rem; /* h-8 — not token-driven */
  border: 1px solid oklch(var(--input));
  background: transparent;
  font-size: 0.75rem;
}`,
  },
}

// ─── Textarea ───────────────────────────────────────────────────────────────

const textareaMeta: ComponentMeta = {
  id: 'ui-textarea',
  name: 'Textarea',
  category: 'ui',
  filePath: 'components/ui/textarea.tsx',
  description:
    'Multi-line text input. min-h-16 instead of fixed height. Shares the same focus, disabled, and aria-invalid token usage as Input. Field sizing is automatic via the field-sizing-content utility where supported.',
  guidelines: [
    'Always pair with a Label for accessibility.',
    'Do not set a fixed height — use rows or min-h-* utilities for sizing.',
    'Use aria-invalid for form validation like Input.',
    'Avoid placeholder as a label substitute — it disappears on typing.',
  ],
  variations: [
    { name: 'default', description: 'min-h-16, full-width, auto-sizing.' },
    { name: 'disabled', description: 'opacity-50, cursor-not-allowed, pointer-events-none.' },
    { name: 'invalid', description: 'aria-invalid: destructive border + ring.' },
  ],
  behavior: [
    'Focus-visible: border-ring + ring-1 ring-ring/50.',
    'Disabled: opacity-50 + cursor-not-allowed.',
    'field-sizing-content auto-grows with content in supporting browsers.',
    'Resize is not locked — users can resize vertically.',
  ],
  knobs: [
    { name: 'placeholder', type: 'text', defaultValue: 'Type something...' },
    { name: 'rows', type: 'select', options: ['2', '3', '4', '6'], defaultValue: '3' },
    { name: 'disabled', type: 'boolean', defaultValue: false },
  ],
  stories: [
    {
      id: 'interactive',
      name: 'Interactive',
      render: (p) => (
        <Textarea
          placeholder={p.placeholder as string}
          rows={parseInt(p.rows as string)}
          disabled={p.disabled as boolean}
          className="w-72"
        />
      ),
      defaultProps: { placeholder: 'Type something...', rows: '3', disabled: false },
    },
    {
      id: 'states',
      name: 'All States',
      render: () => (
        <div className="flex flex-col gap-3 w-72">
          <Textarea placeholder="Default" rows={2} />
          <Textarea placeholder="Disabled" disabled rows={2} />
          <Textarea placeholder="Invalid" aria-invalid rows={2} />
        </div>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--input', usage: 'border-input', category: 'color', description: 'Border color' },
      { token: '--ring', usage: 'focus-visible:border-ring, ring-ring/50', category: 'color', description: 'Focus ring' },
      { token: '--destructive', usage: 'aria-invalid:border-destructive', category: 'color', description: 'Invalid state' },
      { token: '--muted-foreground', usage: 'placeholder:text-muted-foreground', category: 'color', description: 'Placeholder' },
    ],
    outOfToken: [
      { property: 'min-h-16', category: 'spacing', note: 'Minimum height uses Tailwind default (4rem)', suggestion: 'Define componentSizes.textarea.minHeight token' },
      { property: 'px-3 py-2', category: 'spacing', note: 'Padding uses Tailwind defaults', suggestion: 'Map to --space-3 and --space-2' },
    ],
  },
  codeSnippet: {
    react: `import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

<div className="flex flex-col gap-1.5">
  <Label htmlFor="bio">Bio</Label>
  <Textarea id="bio" placeholder="Tell us about yourself..." rows={4} />
</div>`,
    html: `<textarea data-slot="textarea" placeholder="Type something..." rows="3"></textarea>`,
    css: `:root {
  --input:       oklch(0.922 0 0);
  --ring:        oklch(0.708 0 0);
  --destructive: oklch(0.577 0.245 27.325);
}
[data-slot="textarea"] {
  min-height: 4rem; /* not token-driven */
  border: 1px solid oklch(var(--input));
  background: transparent;
}`,
  },
}

// ─── Switch ──────────────────────────────────────────────────────────────────

const switchMeta: ComponentMeta = {
  id: 'ui-switch',
  name: 'Switch',
  category: 'ui',
  filePath: 'components/ui/switch.tsx',
  description:
    'Toggle switch built on Radix Switch. Two sizes (default / sm). Uses data-checked and data-unchecked for all visual states — no className conditionals needed. Thumb slides via translateX.',
  guidelines: [
    'Always pair with a visible label — the switch itself has no text.',
    'Use size="sm" inside dense forms or sidebars.',
    'Control with checked + onCheckedChange — never rely on internal state.',
    'Communicate the current state with adjacent text (On/Off, Enabled/Disabled).',
  ],
  variations: [
    { name: 'default', description: 'h-[18.4px] w-[32px]. Standard size.' },
    { name: 'sm', description: 'h-[14px] w-[24px]. For compact contexts.' },
  ],
  behavior: [
    'data-checked: bg-primary thumb.',
    'data-unchecked: bg-input track, bg-foreground/dark thumb.',
    'Thumb translates 100%-2px on check — pixel-precise, not token-driven.',
    'Focus-visible: border-ring + ring-1 ring-ring/50.',
    'after:absolute after:-inset-x-3 extends touch target without affecting layout.',
  ],
  knobs: [
    { name: 'size', type: 'select', options: ['default', 'sm'], defaultValue: 'default' },
  ],
  stories: [
    {
      id: 'interactive',
      name: 'Interactive',
      render: (p) => <SwitchStory size={p.size as 'sm' | 'default'} />,
      defaultProps: { size: 'default' },
    },
    {
      id: 'all-sizes',
      name: 'Both Sizes',
      render: () => (
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <SwitchStory />
            <span className="text-xs text-muted-foreground">Default</span>
          </div>
          <div className="flex items-center gap-2">
            <SwitchStory size="sm" />
            <span className="text-xs text-muted-foreground">Small</span>
          </div>
        </div>
      ),
      defaultProps: {},
    },
    {
      id: 'states',
      name: 'Fixed States',
      render: () => (
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Switch checked={false} />
            <span className="text-xs text-muted-foreground">Off</span>
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={true} />
            <span className="text-xs text-muted-foreground">On</span>
          </div>
          <div className="flex items-center gap-2">
            <Switch disabled />
            <span className="text-xs text-muted-foreground">Disabled</span>
          </div>
        </div>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--primary', usage: 'data-checked:bg-primary', category: 'color', description: 'Track when checked' },
      { token: '--input', usage: 'data-unchecked:bg-input', category: 'color', description: 'Track when unchecked' },
      { token: '--background', usage: 'bg-background (thumb)', category: 'color', description: 'Thumb color in light mode' },
      { token: '--ring', usage: 'focus-visible:border-ring, ring-ring/50', category: 'color', description: 'Focus ring' },
    ],
    outOfToken: [
      { property: 'translate-x calc(100%-2px)', category: 'spacing', note: 'Thumb offset is hardcoded, not a spacing token', suggestion: 'Define --switch-thumb-offset token' },
      { property: 'h-[18.4px] w-[32px]', category: 'spacing', note: 'Exact dimensions are hardcoded, not from component size tokens', suggestion: 'Add componentSizes.switch to tokens.ts' },
      { property: 'after:-inset-x-3 after:-inset-y-2', category: 'spacing', note: 'Touch target expansion uses Tailwind defaults', suggestion: 'Could define --touch-inset token' },
    ],
  },
  codeSnippet: {
    react: `import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

const [enabled, setEnabled] = useState(false)

<div className="flex items-center gap-2">
  <Switch
    id="notifications"
    checked={enabled}
    onCheckedChange={setEnabled}
  />
  <Label htmlFor="notifications">
    {enabled ? 'Enabled' : 'Disabled'}
  </Label>
</div>`,
    html: `<button role="switch" aria-checked="false" data-slot="switch" data-size="default">
  <span data-slot="switch-thumb"></span>
</button>`,
    css: `:root {
  --primary:    oklch(0.205 0 0);
  --input:      oklch(0.922 0 0);
  --background: oklch(1 0 0);
  --ring:       oklch(0.708 0 0);
}
/* Thumb translate — not token-driven */
[data-slot="switch"][data-checked] [data-slot="switch-thumb"] {
  transform: translateX(calc(100% - 2px));
}`,
  },
}

// ─── Tabs ────────────────────────────────────────────────────────────────────

const tabsMeta: ComponentMeta = {
  id: 'ui-tabs',
  name: 'Tabs',
  category: 'ui',
  filePath: 'components/ui/tabs.tsx',
  description:
    'Navigation tabs built on Radix Tabs. Two visual styles: "default" (pill inside bg-muted container) and "line" (underline indicator). Supports horizontal and vertical orientations via the orientation prop.',
  guidelines: [
    'Use "default" variant for most contexts — pill tabs are the primary pattern.',
    'Use "line" variant only when tabs are inline within a content flow, not for primary navigation.',
    'Keep tab labels to 1–3 words.',
    'Vertical orientation (orientation="vertical") works with line variant for sidebar navigation.',
    'Do not mix orientations within the same TabsList.',
  ],
  variations: [
    { name: 'default (horizontal)', description: 'Pill tabs in bg-muted container. Default pattern.' },
    { name: 'line (horizontal)', description: 'Underline indicator tabs. No background container.' },
    { name: 'vertical', description: 'Stacked tabs with right-side line indicator.' },
  ],
  behavior: [
    'data-active: bg-background + text-foreground for default; underline via ::after for line.',
    'Focus-visible: border-ring + ring-[3px] ring-ring/50.',
    'group/tabs propagates orientation via data-horizontal/vertical to all children.',
    'Trigger has extended touch target via after:absolute pseudo-element.',
  ],
  knobs: [
    { name: 'variant', type: 'select', options: ['default', 'line'], defaultValue: 'default' },
  ],
  stories: [
    {
      id: 'default',
      name: 'Default',
      render: (p) => (
        <Tabs defaultValue="overview" className="w-80">
          <TabsList variant={p.variant as 'default' | 'line'}>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="signal">Signal</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-3 p-3 border border-border">
            <p className="text-xs text-muted-foreground">Overview content panel.</p>
          </TabsContent>
          <TabsContent value="signal" className="mt-3 p-3 border border-border">
            <p className="text-xs text-muted-foreground">Signal content panel.</p>
          </TabsContent>
          <TabsContent value="history" className="mt-3 p-3 border border-border">
            <p className="text-xs text-muted-foreground">History content panel.</p>
          </TabsContent>
        </Tabs>
      ),
      defaultProps: { variant: 'default' },
    },
    {
      id: 'both-variants',
      name: 'Both Variants',
      render: () => (
        <div className="flex flex-col gap-6 w-80">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2">Default</p>
            <Tabs defaultValue="a">
              <TabsList><TabsTrigger value="a">Overview</TabsTrigger><TabsTrigger value="b">Signal</TabsTrigger><TabsTrigger value="c">History</TabsTrigger></TabsList>
            </Tabs>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2">Line</p>
            <Tabs defaultValue="a">
              <TabsList variant="line"><TabsTrigger value="a">Overview</TabsTrigger><TabsTrigger value="b">Signal</TabsTrigger><TabsTrigger value="c">History</TabsTrigger></TabsList>
            </Tabs>
          </div>
        </div>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--muted', usage: 'bg-muted (TabsList default)', category: 'color', description: 'Container background for default variant' },
      { token: '--background', usage: 'data-active:bg-background', category: 'color', description: 'Active pill background' },
      { token: '--foreground', usage: 'data-active:text-foreground, after:bg-foreground', category: 'color', description: 'Active tab text and underline indicator' },
      { token: '--ring', usage: 'focus-visible:border-ring, ring-ring/50', category: 'color', description: 'Focus ring' },
      { token: '--muted-foreground', usage: 'text-muted-foreground', category: 'color', description: 'Inactive tab text' },
    ],
    outOfToken: [
      { property: 'h-[calc(100%-1px)]', category: 'spacing', note: 'Trigger height subtracts 1px — pixel math not in tokens', suggestion: 'Could define --tabs-trigger-height offset token' },
      { property: 'p-[3px]', category: 'spacing', note: 'TabsList inner padding is a hardcoded 3px', suggestion: 'Define --tabs-list-padding token' },
      { property: 'after:h-0.5 / after:w-0.5', category: 'spacing', note: 'Line indicator thickness is hardcoded', suggestion: 'Define --tabs-indicator-thickness token' },
    ],
  },
  codeSnippet: {
    react: `import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

// Default variant
<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="signal">Signal</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content</TabsContent>
  <TabsContent value="signal">Signal content</TabsContent>
</Tabs>

// Line variant
<Tabs defaultValue="docs">
  <TabsList variant="line">
    <TabsTrigger value="docs">Docs</TabsTrigger>
    <TabsTrigger value="code">Code</TabsTrigger>
  </TabsList>
</Tabs>`,
    html: `<div data-slot="tabs" data-orientation="horizontal">
  <div data-slot="tabs-list" data-variant="default">
    <button data-slot="tabs-trigger" data-active>Overview</button>
    <button data-slot="tabs-trigger">Signal</button>
  </div>
  <div data-slot="tabs-content">Content</div>
</div>`,
    css: `:root {
  --muted:            oklch(0.97 0 0);
  --background:       oklch(1 0 0);
  --foreground:       oklch(0.145 0 0);
  --muted-foreground: oklch(0.556 0 0);
}`,
  },
}

// ─── Avatar ──────────────────────────────────────────────────────────────────

const avatarMeta: ComponentMeta = {
  id: 'ui-avatar',
  name: 'Avatar',
  category: 'ui',
  filePath: 'components/ui/avatar.tsx',
  description:
    'User avatar with image, initials fallback, badge slot, and group layout. Built on Radix Avatar. Three sizes (sm / default / lg). AvatarGroup overlaps avatars with negative margin and ring separation.',
  guidelines: [
    'Always provide an AvatarFallback — it shows initials if the image fails to load.',
    'Use AvatarBadge for online status or notification count indicators.',
    'AvatarGroup stacks avatars with -space-x-2 — add AvatarGroupCount for overflow.',
    'Do not use Avatar for non-person content — use an icon or illustration instead.',
    'Keep initials to 1–2 characters maximum.',
  ],
  variations: [
    { name: 'sm', description: '24px (size-6). For dense lists and inline contexts.' },
    { name: 'default', description: '32px (size-8). Standard size.' },
    { name: 'lg', description: '40px (size-10). For profile headers and cards.' },
  ],
  behavior: [
    'after:absolute after:inset-0 adds border overlay via mix-blend-darken (light) / mix-blend-lighten (dark).',
    'AvatarFallback renders when image src fails or has not loaded.',
    'AvatarBadge is absolutely positioned at bottom-right with ring-2 ring-background.',
    'AvatarGroup uses CSS negative margin (-space-x-2) for overlap.',
  ],
  knobs: [
    { name: 'size', type: 'select', options: ['sm', 'default', 'lg'], defaultValue: 'default' },
    { name: 'showBadge', type: 'boolean', defaultValue: false },
  ],
  stories: [
    {
      id: 'interactive',
      name: 'Interactive',
      render: (p) => (
        <Avatar size={p.size as 'sm' | 'default' | 'lg'}>
          <AvatarImage src="https://api.dicebear.com/9.x/initials/svg?seed=AR" alt="AR" />
          <AvatarFallback>AR</AvatarFallback>
          {(p.showBadge as boolean) && (
            <span className="absolute right-0 bottom-0 z-10 inline-flex h-2.5 w-2.5 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-background" />
          )}
        </Avatar>
      ),
      defaultProps: { size: 'default', showBadge: false },
    },
    {
      id: 'all-sizes',
      name: 'All Sizes',
      render: () => (
        <div className="flex items-center gap-4">
          {(['sm', 'default', 'lg'] as const).map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <Avatar size={s}>
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
              <span className="text-[10px] text-muted-foreground">{s}</span>
            </div>
          ))}
        </div>
      ),
      defaultProps: {},
    },
    {
      id: 'group',
      name: 'Avatar Group',
      render: () => (
        <AvatarGroup>
          {['AR', 'JD', 'MK', 'SL'].map((init) => (
            <Avatar key={init}>
              <AvatarFallback>{init}</AvatarFallback>
            </Avatar>
          ))}
          <AvatarGroupCount>+8</AvatarGroupCount>
        </AvatarGroup>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--muted', usage: 'bg-muted (fallback)', category: 'color', description: 'Fallback background' },
      { token: '--muted-foreground', usage: 'text-muted-foreground', category: 'color', description: 'Fallback text' },
      { token: '--primary', usage: 'bg-primary (badge)', category: 'color', description: 'Badge background' },
      { token: '--primary-foreground', usage: 'text-primary-foreground (badge)', category: 'color', description: 'Badge text' },
      { token: '--background', usage: 'ring-background (badge ring)', category: 'color', description: 'Badge ring separation' },
      { token: '--border', usage: 'after:border-border', category: 'color', description: 'Border overlay on image' },
    ],
    outOfToken: [
      { property: 'size-8 / size-6 / size-10', category: 'spacing', note: 'Avatar dimensions use Tailwind defaults, not component size tokens', suggestion: 'Define componentSizes.avatar in tokens.ts' },
      { property: '-space-x-2', category: 'spacing', note: 'AvatarGroup overlap uses Tailwind default', suggestion: 'Define --avatar-group-overlap token' },
    ],
  },
  codeSnippet: {
    react: `import { Avatar, AvatarImage, AvatarFallback, AvatarGroup, AvatarGroupCount } from '@/components/ui/avatar'

// Single avatar
<Avatar size="lg">
  <AvatarImage src="/avatar.jpg" alt="Alex Rivera" />
  <AvatarFallback>AR</AvatarFallback>
</Avatar>

// Group
<AvatarGroup>
  <Avatar><AvatarFallback>JD</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>MK</AvatarFallback></Avatar>
  <AvatarGroupCount>+5</AvatarGroupCount>
</AvatarGroup>`,
    html: `<span data-slot="avatar" data-size="default">
  <img data-slot="avatar-image" src="..." alt="..." />
  <span data-slot="avatar-fallback">AR</span>
</span>`,
    css: `:root {
  --muted:            oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --background:       oklch(1 0 0);
}
[data-slot="avatar"] {
  width: 2rem; height: 2rem; /* size-8 — not token-driven */
  border-radius: 9999px;
}`,
  },
}

// ─── Progress ────────────────────────────────────────────────────────────────

const progressMeta: ComponentMeta = {
  id: 'ui-progress',
  name: 'Progress',
  category: 'ui',
  filePath: 'components/ui/progress.tsx',
  description:
    'Horizontal progress bar built on Radix Progress. h-1 height, bg-muted track, bg-primary indicator. Animates via CSS transition on translateX. No CVA — a single fixed style.',
  guidelines: [
    'Pass value as a number between 0 and 100.',
    'Always provide an accessible label via aria-label or a visible caption.',
    'For animated score bars, prefer Framer Motion animate on width — see SignalDimensionCard.',
    'Do not stack multiple Progress bars in a single card without labels.',
  ],
  variations: [
    { name: 'default', description: 'h-1, full-width, bg-muted track + bg-primary indicator.' },
  ],
  behavior: [
    'Indicator uses transform: translateX(-{100-value}%) — slides from left.',
    'transition-all on indicator provides smooth value changes.',
    'overflow-x-hidden on root clips overshoot when value > 100.',
  ],
  knobs: [
    { name: 'value', type: 'select', options: ['0', '25', '50', '75', '100'], defaultValue: '65' },
  ],
  stories: [
    {
      id: 'interactive',
      name: 'Interactive',
      render: (p) => <Progress value={parseInt(p.value as string)} className="w-64" />,
      defaultProps: { value: '65' },
    },
    {
      id: 'values',
      name: 'Value Range',
      render: () => (
        <div className="flex flex-col gap-3 w-64">
          {[0, 25, 50, 75, 100].map((v) => (
            <div key={v} className="flex items-center gap-3">
              <Progress value={v} className="flex-1" />
              <span className="text-xs text-muted-foreground w-8 text-right">{v}%</span>
            </div>
          ))}
        </div>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--muted', usage: 'bg-muted (track)', category: 'color', description: 'Track background' },
      { token: '--primary', usage: 'bg-primary (indicator)', category: 'color', description: 'Filled indicator color' },
    ],
    outOfToken: [
      { property: 'h-1', category: 'spacing', note: 'Track height is hardcoded (0.25rem), not from a token', suggestion: 'Define --progress-height token' },
      { property: 'translateX(-{100-value}%)', category: 'animation', note: 'Indicator animation is CSS transform, not Framer Motion', suggestion: 'Consistent if you want all score bars to use Framer Motion (see SignalDimensionCard)' },
    ],
  },
  codeSnippet: {
    react: `import { Progress } from '@/components/ui/progress'

<Progress value={75} />
<Progress value={42} className="w-48" />`,
    html: `<div data-slot="progress" role="progressbar" aria-valuenow="75">
  <div data-slot="progress-indicator" style="transform: translateX(-25%)"></div>
</div>`,
    css: `:root {
  --muted:   oklch(0.97 0 0);
  --primary: oklch(0.205 0 0);
}
[data-slot="progress"] {
  height: 0.25rem; /* h-1 — not token-driven */
  background: oklch(var(--muted));
}
[data-slot="progress-indicator"] {
  background: oklch(var(--primary));
  transition: transform 150ms ease;
}`,
  },
}

// ─── Alert ───────────────────────────────────────────────────────────────────

const alertMeta: ComponentMeta = {
  id: 'ui-alert',
  name: 'Alert',
  category: 'ui',
  filePath: 'components/ui/alert.tsx',
  description:
    'Inline alert message with title, description, and optional action. Two variants: "default" (card-colored) and "destructive" (red text). Supports a leading icon via SVG as direct child.',
  guidelines: [
    'Use "default" for informational messages, tips, and confirmations.',
    'Use "destructive" for errors, warnings, and critical states.',
    'Always include AlertTitle for screen reader context.',
    'AlertAction creates an absolutely-positioned button slot at top-right — do not add your own.',
    'Keep AlertDescription to 1–2 sentences. For longer content, use a modal or callout.',
  ],
  variations: [
    { name: 'default', description: 'bg-card text. For info, tips, notices.' },
    { name: 'destructive', description: 'text-destructive. For errors and warnings.' },
  ],
  behavior: [
    'SVG as direct child activates grid-cols-[auto_1fr] layout — icon auto-aligns.',
    'AlertDescription spans the full description row when icon is present.',
    'AlertAction positions absolutely at top-right; parent gets pr-18 when present.',
    'role="alert" is always set — screen readers announce changes automatically.',
  ],
  knobs: [
    { name: 'variant', type: 'select', options: ['default', 'destructive'], defaultValue: 'default' },
    { name: 'showAction', type: 'boolean', defaultValue: false },
  ],
  stories: [
    {
      id: 'interactive',
      name: 'Interactive',
      render: (p) => (
        <Alert variant={p.variant as 'default' | 'destructive'} className="w-80">
          <AlertTitle>{p.variant === 'destructive' ? 'Something went wrong' : 'Heads up'}</AlertTitle>
          <AlertDescription>
            {p.variant === 'destructive'
              ? 'Your signal score could not be updated. Please try again.'
              : 'Signal scores update every Monday at 00:00 UTC.'}
          </AlertDescription>
          {(p.showAction as boolean) && (
            <AlertAction>
              <Button size="xs" variant="ghost">Dismiss</Button>
            </AlertAction>
          )}
        </Alert>
      ),
      defaultProps: { variant: 'default', showAction: false },
    },
    {
      id: 'both-variants',
      name: 'Both Variants',
      render: () => (
        <div className="flex flex-col gap-3 w-80">
          <Alert>
            <AlertTitle>Heads up</AlertTitle>
            <AlertDescription>Signal scores update every Monday at 00:00 UTC.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription>Your signal score could not be updated.</AlertDescription>
          </Alert>
        </div>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--card', usage: 'bg-card', category: 'color', description: 'Default variant background' },
      { token: '--card-foreground', usage: 'text-card-foreground', category: 'color', description: 'Default variant text' },
      { token: '--destructive', usage: 'text-destructive', category: 'color', description: 'Destructive variant text' },
      { token: '--border', usage: 'border', category: 'color', description: 'Alert border' },
    ],
    outOfToken: [
      { property: 'px-2.5 py-2', category: 'spacing', note: 'Alert padding uses Tailwind defaults', suggestion: 'Map to --space-2.5 and --space-2' },
      { property: 'pr-18', category: 'spacing', note: 'Action slot right padding is hardcoded', suggestion: 'Define --alert-action-offset token' },
    ],
  },
  codeSnippet: {
    react: `import { Alert, AlertTitle, AlertDescription, AlertAction } from '@/components/ui/alert'

// Informational
<Alert>
  <AlertTitle>Heads up</AlertTitle>
  <AlertDescription>
    Signal scores update every Monday at 00:00 UTC.
  </AlertDescription>
</Alert>

// Error with dismiss action
<Alert variant="destructive">
  <AlertTitle>Something went wrong</AlertTitle>
  <AlertDescription>Your score could not be updated.</AlertDescription>
  <AlertAction>
    <Button size="xs" variant="ghost">Dismiss</Button>
  </AlertAction>
</Alert>`,
    html: `<div data-slot="alert" role="alert" data-variant="default">
  <div data-slot="alert-title">Heads up</div>
  <div data-slot="alert-description">Score updates every Monday.</div>
</div>`,
    css: `:root {
  --card:            oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --destructive:     oklch(0.577 0.245 27.325);
  --border:          oklch(0.922 0 0);
}`,
  },
}

// ─── Separator ───────────────────────────────────────────────────────────────

const separatorMeta: ComponentMeta = {
  id: 'ui-separator',
  name: 'Separator',
  category: 'ui',
  filePath: 'components/ui/separator.tsx',
  description:
    'Thin divider line built on Radix Separator. Horizontal (1px tall, full width) or vertical (1px wide, self-stretch). Always decorative by default — semantic separators need decorative={false}.',
  guidelines: [
    'Use to separate related content groups — not as a full-width divider between sections.',
    'Vertical separators require a fixed height or flex-stretch context.',
    'decorative={true} (default) hides from accessibility tree — use decorative={false} for semantic separators.',
  ],
  variations: [
    { name: 'horizontal', description: 'h-px, full-width. Default orientation.' },
    { name: 'vertical', description: 'w-px, self-stretch. Requires a flex parent with height.' },
  ],
  behavior: [
    'data-horizontal: h-px w-full.',
    'data-vertical: w-px self-stretch.',
    'bg-border is the only styling — no shadow or gradient.',
  ],
  knobs: [
    { name: 'orientation', type: 'select', options: ['horizontal', 'vertical'], defaultValue: 'horizontal' },
  ],
  stories: [
    {
      id: 'horizontal',
      name: 'Horizontal',
      render: () => (
        <div className="w-64 space-y-3">
          <p className="text-xs text-foreground">Above section</p>
          <Separator />
          <p className="text-xs text-foreground">Below section</p>
        </div>
      ),
      defaultProps: {},
    },
    {
      id: 'vertical',
      name: 'Vertical',
      render: () => (
        <div className="flex items-center h-8 gap-3">
          <span className="text-xs text-foreground">Left</span>
          <Separator orientation="vertical" />
          <span className="text-xs text-foreground">Right</span>
        </div>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--border', usage: 'bg-border', category: 'color', description: 'Separator color' },
    ],
    outOfToken: [
      { property: 'h-px / w-px', category: 'spacing', note: '1px thickness is hardcoded, not from a token', suggestion: 'Define --separator-thickness token' },
    ],
  },
  codeSnippet: {
    react: `import { Separator } from '@/components/ui/separator'

// Horizontal (default)
<Separator />

// Vertical — needs flex parent with height
<div className="flex items-center h-8 gap-3">
  <span>Left</span>
  <Separator orientation="vertical" />
  <span>Right</span>
</div>`,
    html: `<div data-slot="separator" role="none" data-orientation="horizontal"></div>`,
    css: `:root { --border: oklch(0.922 0 0); }
[data-slot="separator"] {
  background: oklch(var(--border));
}
[data-slot="separator"][data-orientation="horizontal"] {
  height: 1px; width: 100%;
}
[data-slot="separator"][data-orientation="vertical"] {
  width: 1px; align-self: stretch;
}`,
  },
}

// ─── AnimatedNumber ──────────────────────────────────────────────────────────

const animatedNumberMeta: ComponentMeta = {
  id: 'shared-animated-number',
  name: 'AnimatedNumber',
  category: 'shared',
  filePath: 'components/shared/AnimatedNumber.tsx',
  description:
    'Framer Motion counter that animates from its previous value to a new one. Uses a custom cubic-bezier easing and a Framer animate() call (not a spring). Supports prefix, suffix, and decimal places.',
  guidelines: [
    'Use for numeric scores, stats, and KPIs that change on user action or data refresh.',
    'Do not use for text — value must be a number.',
    'Keep duration short (≤1s) for feedback. Default 0.8s is appropriate for score reveals.',
    'pair with a label or unit adjacent — the component renders only the number.',
  ],
  variations: [
    { name: 'integer', description: 'decimals=0 (default). Rounds to nearest integer.' },
    { name: 'decimal', description: 'decimals=1 or 2. Shows floating-point values.' },
    { name: 'with prefix/suffix', description: 'prefix="$" / suffix="%" for formatted values.' },
  ],
  behavior: [
    'Framer animate() tween from prevValue to value using [0.22, 1, 0.36, 1] cubic-bezier.',
    'motionValue drives a motion.span — no DOM re-renders on every animation frame.',
    'useTransform converts motionValue to formatted string via toFixed or Math.round.',
    'prevValue ref remembers last value for smooth re-animations on rapid updates.',
  ],
  knobs: [
    { name: 'value', type: 'select', options: ['0', '25', '42', '75', '92', '100'], defaultValue: '75' },
    { name: 'duration', type: 'select', options: ['0.4', '0.8', '1.2'], defaultValue: '0.8' },
    { name: 'suffix', type: 'text', defaultValue: '' },
  ],
  stories: [
    {
      id: 'interactive',
      name: 'Interactive',
      render: (p) => (
        <AnimatedNumber
          value={parseInt(p.value as string)}
          duration={parseFloat(p.duration as string)}
          suffix={p.suffix as string}
          className="text-4xl font-bold text-foreground"
        />
      ),
      defaultProps: { value: '75', duration: '0.8', suffix: '' },
    },
    {
      id: 'in-context',
      name: 'In Context',
      description: 'As used inside SignalPulse and SignalDimensionCard',
      render: () => (
        <div className="flex items-center gap-8">
          <div className="text-center">
            <AnimatedNumber value={84} className="text-3xl font-bold text-foreground" />
            <p className="text-xs text-muted-foreground mt-1">Signal Score</p>
          </div>
          <div className="text-center">
            <AnimatedNumber value={78} suffix="/100" className="text-2xl font-bold text-foreground" />
            <p className="text-xs text-muted-foreground mt-1">Reliability</p>
          </div>
          <div className="text-center">
            <AnimatedNumber value={12500} prefix="$" className="text-xl font-semibold text-foreground" />
            <p className="text-xs text-muted-foreground mt-1">Monthly rate</p>
          </div>
        </div>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [],
    outOfToken: [
      { property: '[0.22, 1, 0.36, 1] easing', category: 'animation', note: 'Custom cubic-bezier not defined in animation tokens', suggestion: 'Add easing.decelerate to animation tokens in tokens.ts' },
      { property: 'duration=0.8 default', category: 'animation', note: 'Default duration is a hardcoded prop default, not --duration-slow', suggestion: 'Default to animation.duration.slow token value' },
    ],
  },
  codeSnippet: {
    react: `import { AnimatedNumber } from '@/components/shared/AnimatedNumber'

// Basic score
<AnimatedNumber value={score} className="text-3xl font-bold" />

// With suffix
<AnimatedNumber value={78} suffix="/100" className="text-xl font-bold" />

// With prefix and decimals
<AnimatedNumber value={12.5} prefix="$" suffix="k" decimals={1} />

// Custom duration (seconds)
<AnimatedNumber value={score} duration={1.2} />`,
    html: `<!-- AnimatedNumber is motion-driven — no HTML equivalent -->
<span class="animated-number">75</span>`,
    css: `/* No design tokens consumed — purely motion-driven.
   Easing and duration are hardcoded in the component.

   Suggestion: define in tokens.ts:
   animation.easing.decelerate = 'cubic-bezier(0.22, 1, 0.36, 1)'
*/`,
  },
}

// ─── Skeleton ────────────────────────────────────────────────────────────────

const skeletonMeta: ComponentMeta = {
  id: 'shared-skeleton',
  name: 'Skeleton',
  category: 'shared',
  filePath: 'components/shared/LoadingSkeleton.tsx',
  description:
    'Animated loading placeholder. Base Skeleton is a generic div with animate-pulse and bg-muted/50. Exports DashboardSkeleton and CardSkeleton as pre-composed layouts for specific loading states.',
  guidelines: [
    'Match Skeleton dimensions to the content that will replace them.',
    'Use DashboardSkeleton for full-page loading states, not individual cards.',
    'Use CardSkeleton for individual card-level loading within grids or lists.',
    'Do not add extra styling — Skeleton is purely a shape placeholder.',
    'Avoid animating Skeleton entrance — it should appear immediately.',
  ],
  variations: [
    { name: 'Skeleton', description: 'Generic base. Apply h-*, w-*, className freely.' },
    { name: 'CardSkeleton', description: 'Pre-composed: title line + large value + thin bar.' },
    { name: 'DashboardSkeleton', description: 'Full dashboard layout: header + 3 cards + chart + 2 halves.' },
  ],
  behavior: [
    'animate-pulse: Tailwind CSS animation at 2s duration, linear, infinite.',
    'bg-muted/50: 50% opacity of the muted token — lighter than the base.',
    'rounded-md on Skeleton base (not rounded-none) — intentional for skeletons vs sharp UI.',
    'DashboardSkeleton and CardSkeleton use rounded-none to match card conventions.',
  ],
  knobs: [],
  stories: [
    {
      id: 'generic',
      name: 'Generic',
      description: 'Base Skeleton with custom dimensions',
      render: () => (
        <div className="flex flex-col gap-2 w-64">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-2 w-3/4" />
        </div>
      ),
      defaultProps: {},
    },
    {
      id: 'card-skeleton',
      name: 'CardSkeleton',
      render: () => <CardSkeleton />,
      defaultProps: {},
    },
    {
      id: 'dashboard-skeleton',
      name: 'DashboardSkeleton',
      render: () => (
        <div className="w-full max-w-md">
          <DashboardSkeleton />
        </div>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--muted', usage: 'bg-muted/50', category: 'color', description: 'Skeleton fill at 50% opacity' },
    ],
    outOfToken: [
      { property: 'animate-pulse (2s linear infinite)', category: 'animation', note: 'Pulse animation uses Tailwind default — not --duration-slow or a custom keyframe token', suggestion: 'Define a @keyframes pulse with --duration-slow' },
      { property: 'rounded-md (base Skeleton)', category: 'radius', note: 'Skeleton uses rounded-md while all UI components use rounded-none', suggestion: 'Consider rounded-none for consistency, or document the intentional deviation' },
    ],
  },
  codeSnippet: {
    react: `import { Skeleton, CardSkeleton, DashboardSkeleton } from '@/components/shared/LoadingSkeleton'

// Generic loading placeholder
<Skeleton className="h-4 w-48" />
<Skeleton className="h-8 w-24" />

// Card-level loading
{isLoading ? <CardSkeleton /> : <MyCard data={data} />}

// Full dashboard loading
{isLoading ? <DashboardSkeleton /> : <Dashboard />}`,
    html: `<div class="skeleton"><!-- loading --></div>`,
    css: `:root { --muted: oklch(0.97 0 0); }
.skeleton {
  background: oklch(var(--muted) / 0.5);
  border-radius: 0.375rem; /* rounded-md — deviates from rounded-none convention */
  animation: pulse 2s linear infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}`,
  },
}

// ─── SignalRadar ──────────────────────────────────────────────────────────────

const signalRadarMeta: ComponentMeta = {
  id: 'signal-radar',
  name: 'SignalRadar',
  category: 'signal',
  filePath: 'components/signal/SignalRadar.tsx',
  description:
    'Recharts RadarChart showing all five signal dimensions: Reliability, Performance, Responsiveness, Feedback, Growth. Optional cohort average overlay (dashed ring). Fixed 240px height, full-width responsive.',
  guidelines: [
    'Always pass a full SignalProfile object with all five dimensions populated.',
    'Use showCohort={true} only in competitive or benchmarking contexts.',
    'Do not place inside a flex container without explicit height — ResponsiveContainer needs a parent with height.',
    'Do not use for single-dimension display — use SignalDimensionCard instead.',
  ],
  variations: [
    { name: 'default', description: 'User score only. Single filled polygon.' },
    { name: 'with cohort', description: 'Dashed cohort overlay + user score polygon.' },
  ],
  behavior: [
    'ResponsiveContainer: width=100%, height=240 — parent must provide width.',
    'PolarGrid: polygon type, rgba(148,163,184,0.15) stroke — hardcoded.',
    'Radar fill: rgba(148,163,184,0.15), stroke rgba(148,163,184,0.8) — hardcoded hex.',
    'Cohort Radar: dashed stroke, rgba(148,163,184,0.05) fill — not token-driven.',
  ],
  knobs: [
    { name: 'showCohort', type: 'boolean', defaultValue: false },
  ],
  stories: [
    {
      id: 'interactive',
      name: 'Interactive',
      render: (p) => (
        <div className="w-72">
          <SignalRadar profile={MOCK_SIGNAL_PROFILE} showCohort={p.showCohort as boolean} />
        </div>
      ),
      defaultProps: { showCohort: false },
    },
    {
      id: 'with-cohort',
      name: 'With Cohort',
      render: () => (
        <div className="w-72">
          <SignalRadar profile={MOCK_SIGNAL_PROFILE} showCohort={true} />
        </div>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [],
    outOfToken: [
      { property: 'rgba(148,163,184,...)', category: 'color', note: 'All chart colors are hardcoded RGBA — none use CSS tokens', suggestion: 'Define --signal-chart-stroke and --signal-chart-fill tokens using slate-400 equivalent' },
      { property: 'rgba(148,163,184,0.15) grid stroke', category: 'color', note: 'Grid lines use hardcoded opacity value', suggestion: 'Use --border with opacity modifier: oklch(var(--border) / 0.15)' },
      { property: 'height=240', category: 'spacing', note: 'Fixed chart height is hardcoded', suggestion: 'Accept optional height prop or define --chart-height-md token' },
      { property: 'margin top/right/bottom/left', category: 'spacing', note: 'Chart margins are hardcoded pixel values', suggestion: 'Could map to spacing tokens if chart margins need to be consistent' },
    ],
  },
  codeSnippet: {
    react: `import { SignalRadar } from '@/components/signal/SignalRadar'

// User signal only
<SignalRadar profile={signalProfile} />

// With cohort comparison
<SignalRadar profile={signalProfile} showCohort />

// SignalProfile shape:
// {
//   reliability: number,
//   performance: number,
//   responsiveness: number,
//   feedback: number,
//   growth: number,
//   composite_score: number,
//   score_trend: 'rising' | 'stable' | 'falling',
// }`,
    html: `<!-- SignalRadar requires Recharts (SVG) — no native HTML equivalent -->
<svg class="signal-radar" viewBox="0 0 300 240">
  <!-- Polar grid, angle axes, filled polygon -->
</svg>`,
    css: `/* No design tokens consumed — all colors are hardcoded RGBA.
   See Token Audit for specific values and suggestions. */`,
  },
}

// ─── SignalTimeline ───────────────────────────────────────────────────────────

const signalTimelineMeta: ComponentMeta = {
  id: 'signal-timeline',
  name: 'SignalTimeline',
  category: 'signal',
  filePath: 'components/signal/SignalTimeline.tsx',
  description:
    'Recharts AreaChart displaying composite signal score over time. Optional per-dimension overlays. Custom tooltip using design tokens. height prop controls the chart height (default 200px).',
  guidelines: [
    'Pass at least 4 weeks of aggregates for a meaningful trend line.',
    'Use showDimensions={true} only when the user specifically wants per-dimension breakdown.',
    'Wrap in a container with explicit width — ResponsiveContainer is 100% width.',
    'Sort aggregates by week_start before passing — the component sorts internally, but pre-sorting is cleaner.',
  ],
  variations: [
    { name: 'composite only', description: 'Single area showing composite score. Default.' },
    { name: 'with dimensions', description: 'Composite + 3 dimension lines (reliability, performance, growth).' },
  ],
  behavior: [
    'CustomTooltip uses border-border, bg-card, text-muted-foreground — token-aligned.',
    'CartesianGrid: rgba(148,163,184,0.08) stroke — hardcoded.',
    'Composite area fill: linearGradient from rgba(148,163,184,0.25) to 0.02 — not token-driven.',
    'activeDot: r=4, hardcoded color.',
  ],
  knobs: [
    { name: 'showDimensions', type: 'boolean', defaultValue: false },
    { name: 'height', type: 'select', options: ['160', '200', '260'], defaultValue: '200' },
  ],
  stories: [
    {
      id: 'interactive',
      name: 'Interactive',
      render: (p) => (
        <div className="w-full max-w-md">
          <SignalTimeline
            aggregates={MOCK_AGGREGATES as any}
            showDimensions={p.showDimensions as boolean}
            height={parseInt(p.height as string)}
          />
        </div>
      ),
      defaultProps: { showDimensions: false, height: '200' },
    },
    {
      id: 'with-dimensions',
      name: 'With Dimensions',
      render: () => (
        <div className="w-full max-w-md">
          <SignalTimeline aggregates={MOCK_AGGREGATES as any} showDimensions={true} height={220} />
        </div>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--border', usage: 'border-border (tooltip)', category: 'color', description: 'Tooltip border' },
      { token: '--card', usage: 'bg-card (tooltip)', category: 'color', description: 'Tooltip background' },
      { token: '--muted-foreground', usage: 'text-muted-foreground (tooltip label)', category: 'color', description: 'Tooltip date label' },
      { token: '--foreground', usage: 'text-foreground (tooltip value)', category: 'color', description: 'Tooltip score value' },
    ],
    outOfToken: [
      { property: 'rgba(148,163,184,...)', category: 'color', note: 'All chart line/fill colors hardcoded RGBA', suggestion: 'Define --signal-chart-stroke token' },
      { property: '#94a3b8 / #64748b / #cbd5e1', category: 'color', note: 'Dimension line colors are hardcoded hex', suggestion: 'Use slate-400/600/300 equivalents as CSS tokens per dimension' },
      { property: 'rgba(148,163,184,0.25→0.02)', category: 'color', note: 'Gradient stops are hardcoded — not using shadow or muted tokens', suggestion: 'Define --signal-area-fill-start and --signal-area-fill-end tokens' },
    ],
  },
  codeSnippet: {
    react: `import { SignalTimeline } from '@/components/signal/SignalTimeline'

// Basic timeline
<SignalTimeline aggregates={weeklyAggregates} />

// With dimension breakdown + custom height
<SignalTimeline aggregates={weeklyAggregates} showDimensions height={260} />

// SignalAggregate shape per week:
// { week_start: 'YYYY-MM-DD', composite_score, reliability,
//   performance, responsiveness, feedback, growth }`,
    html: `<!-- SignalTimeline requires Recharts (SVG) — no native HTML equivalent -->`,
    css: `/* Only tooltip uses tokens — all chart colors are hardcoded.
   --border, --card, --muted-foreground, --foreground used in tooltip.
   See Token Audit for full list of hardcoded values. */`,
  },
}

// ─── SignalDimensionCard ──────────────────────────────────────────────────────

const signalDimensionCardMeta: ComponentMeta = {
  id: 'signal-dimension-card',
  name: 'SignalDimensionCard',
  category: 'signal',
  filePath: 'components/signal/SignalDimensionCard.tsx',
  description:
    'Individual signal dimension card with animated score counter, Framer Motion progress bar, and trend indicator. One card per dimension (reliability, performance, responsiveness, feedback, growth).',
  guidelines: [
    'Always use one of the five valid SignalDimension values.',
    'Render in a grid — typically 2 or 3 columns, or a 5-column strip.',
    'Do not override the progress bar color — it derives from DIMENSION_COLORS constant.',
    'trend prop affects only the arrow icon and its color — not animation speed.',
  ],
  variations: [
    { name: 'reliability', description: 'Default dimension. Label from DIMENSION_LABELS constant.' },
    { name: 'performance', description: 'Same layout. Color from DIMENSION_COLORS.' },
    { name: 'responsiveness', description: 'Longer label — ensure container is wide enough.' },
    { name: 'feedback', description: 'Standard layout.' },
    { name: 'growth', description: 'Standard layout.' },
  ],
  behavior: [
    'Framer animate({width: `${score}%`}): Framer progress bar, not Radix Progress.',
    'AnimatedNumber: score counter with spring-like cubic-bezier easing.',
    'motion.div: initial={opacity:0, y:8} → animate={opacity:1, y:0}, duration 0.3s.',
    'Trend icon colors: emerald-400 (rising), red-400 (falling), slate-500 (stable) — hardcoded.',
  ],
  knobs: [
    { name: 'dimension', type: 'select', options: ['reliability', 'performance', 'responsiveness', 'feedback', 'growth'], defaultValue: 'reliability' },
    { name: 'score', type: 'select', options: ['20', '45', '65', '78', '92'], defaultValue: '78' },
    { name: 'trend', type: 'select', options: ['rising', 'stable', 'falling'], defaultValue: 'stable' },
  ],
  stories: [
    {
      id: 'interactive',
      name: 'Interactive',
      render: (p) => (
        <SignalDimensionCard
          dimension={p.dimension as any}
          score={parseInt(p.score as string)}
          trend={p.trend as any}
          className="w-48"
        />
      ),
      defaultProps: { dimension: 'reliability', score: '78', trend: 'stable' },
    },
    {
      id: 'all-dimensions',
      name: 'All Dimensions',
      description: 'Five dimensions from a sample signal profile',
      render: () => (
        <div className="grid grid-cols-2 gap-3 w-80">
          {(
            [
              { d: 'reliability', s: MOCK_SIGNAL_PROFILE.reliability, t: 'rising' },
              { d: 'performance', s: MOCK_SIGNAL_PROFILE.performance, t: 'stable' },
              { d: 'responsiveness', s: MOCK_SIGNAL_PROFILE.responsiveness, t: 'stable' },
              { d: 'feedback', s: MOCK_SIGNAL_PROFILE.feedback, t: 'rising' },
              { d: 'growth', s: MOCK_SIGNAL_PROFILE.growth, t: 'falling' },
            ] as const
          ).map(({ d, s, t }) => (
            <SignalDimensionCard key={d} dimension={d} score={s} trend={t} />
          ))}
        </div>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--border', usage: 'border-border', category: 'color', description: 'Card border' },
      { token: '--card', usage: 'bg-card', category: 'color', description: 'Card background' },
      { token: '--muted-foreground', usage: 'text-muted-foreground', category: 'color', description: 'Dimension label and /100 text' },
      { token: '--foreground', usage: 'text-foreground', category: 'color', description: 'Score number' },
      { token: '--muted', usage: 'bg-muted/50 (track)', category: 'color', description: 'Progress bar track' },
    ],
    outOfToken: [
      { property: 'DIMENSION_COLORS (hardcoded per dimension)', category: 'color', note: 'Dimension bar colors are not CSS tokens — defined as a static object', suggestion: 'Define --signal-reliability, --signal-performance etc. as CSS vars' },
      { property: 'text-emerald-400 / text-red-400 / text-slate-500', category: 'color', note: 'Trend icon colors are hardcoded Tailwind classes', suggestion: 'Use --available / --destructive / --muted-foreground tokens' },
      { property: '[0.22, 1, 0.36, 1] easing', category: 'animation', note: 'Framer Motion bar easing is a hardcoded cubic-bezier', suggestion: 'Add easing.decelerate to animation tokens' },
      { property: 'duration: 0.3 / 0.8', category: 'animation', note: 'Entry and bar animation durations are hardcoded', suggestion: 'Use animation.duration.fast and .slow tokens' },
    ],
  },
  codeSnippet: {
    react: `import { SignalDimensionCard } from '@/components/signal/SignalDimensionCard'

// Single dimension
<SignalDimensionCard dimension="reliability" score={78} trend="rising" />

// Grid of all dimensions
<div className="grid grid-cols-2 gap-3">
  <SignalDimensionCard dimension="reliability"    score={signalProfile.reliability}    trend="rising" />
  <SignalDimensionCard dimension="performance"    score={signalProfile.performance}    trend="stable" />
  <SignalDimensionCard dimension="responsiveness" score={signalProfile.responsiveness} />
  <SignalDimensionCard dimension="feedback"       score={signalProfile.feedback} />
  <SignalDimensionCard dimension="growth"         score={signalProfile.growth}         trend="falling" />
</div>`,
    html: `<!-- SignalDimensionCard is motion-driven — no static HTML equivalent -->`,
    css: `:root {
  --card:             oklch(1 0 0);
  --border:           oklch(0.922 0 0);
  --foreground:       oklch(0.145 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --muted:            oklch(0.97 0 0);
  /* DIMENSION_COLORS not token-driven — hardcoded in signal.types.ts */
}`,
  },
}

// ─── SkillConstellation ───────────────────────────────────────────────────────

const skillConstellationMeta: ComponentMeta = {
  id: 'profile-skill-constellation',
  name: 'SkillConstellation',
  category: 'profile',
  filePath: 'components/profile/SkillConstellation.tsx',
  description:
    'Animated tag cloud for skill display. Font size and opacity scale with proficiency (1–5). Primary skills are sorted first and displayed with a middle-dot suffix. Entry animations staggered by index.',
  guidelines: [
    'Pass all skills at once — sorting and sizing are handled internally.',
    'Primary skills (is_primary=true) are automatically sorted first.',
    'Proficiency 5 is full-size, full-opacity. Proficiency 1 is smallest and most transparent.',
    'Do not add click handlers without extending the component — it is read-only.',
    'Works best with 5–15 skills — too many skills make the cloud dense.',
  ],
  variations: [
    { name: 'proficiency 5 (primary)', description: 'text-sm, opacity-100, border-border, bg-muted/10.' },
    { name: 'proficiency 4', description: 'text-sm, opacity-85, border-border/50, bg-muted/30.' },
    { name: 'proficiency 3', description: 'text-xs, opacity-70.' },
    { name: 'proficiency 1–2', description: 'text-xs, opacity-40–55. Most receded.' },
  ],
  behavior: [
    'Sorted: primary skills first, then by proficiency desc.',
    'Stagger: each skill animates with delay i*0.03s — visible on first mount.',
    'motion.div: initial={opacity:0, scale:0.85} → animate={opacity:1, scale:1}.',
    'rounded-full: intentional pill shape — differs from rounded-none convention.',
  ],
  knobs: [],
  stories: [
    {
      id: 'full-set',
      name: 'Full Skill Set',
      render: () => (
        <div className="w-80">
          <SkillConstellation skills={MOCK_SKILLS as any} />
        </div>
      ),
      defaultProps: {},
    },
    {
      id: 'sparse',
      name: 'Sparse Set',
      description: 'Fewer skills — more breathing room',
      render: () => (
        <div className="w-72">
          <SkillConstellation skills={MOCK_SKILLS.slice(0, 5) as any} />
        </div>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--border', usage: 'border-border, border-border/50', category: 'color', description: 'Primary and secondary skill borders' },
      { token: '--muted', usage: 'bg-muted/10, bg-muted/30', category: 'color', description: 'Primary and secondary skill backgrounds' },
      { token: '--foreground', usage: 'text-foreground', category: 'color', description: 'Primary skill text' },
      { token: '--muted-foreground', usage: 'text-muted-foreground', category: 'color', description: 'Secondary skill text and dot' },
    ],
    outOfToken: [
      { property: 'rounded-full', category: 'radius', note: 'Skill pills use rounded-full, not rounded-none convention', suggestion: 'Intentional design choice — document as allowed deviation for pill-shaped tags' },
      { property: 'opacity-40/55/70/85/100', category: 'color', note: 'Proficiency opacity steps are hardcoded arrays', suggestion: 'Could define CSS custom properties per proficiency level: --proficiency-1-opacity' },
      { property: 'stagger delay i*0.03s', category: 'animation', note: 'Stagger delay is hardcoded per-item', suggestion: 'Define --stagger-base token for consistent stagger timing' },
    ],
  },
  codeSnippet: {
    react: `import { SkillConstellation } from '@/components/profile/SkillConstellation'

<SkillConstellation skills={profile.skills} />

// Skill shape:
// {
//   id: string,
//   name: string,
//   category: 'technical' | 'soft' | 'domain' | 'tool',
//   proficiency: 1 | 2 | 3 | 4 | 5,
//   is_primary?: boolean,
// }`,
    html: `<!-- SkillConstellation renders as a flex-wrap div of animated pills -->
<div class="skill-constellation">
  <div class="skill skill--primary skill--proficiency-5">TypeScript ·</div>
  <div class="skill skill--proficiency-3">Docker</div>
</div>`,
    css: `:root {
  --border:           oklch(0.922 0 0);
  --muted:            oklch(0.97 0 0);
  --foreground:       oklch(0.145 0 0);
  --muted-foreground: oklch(0.556 0 0);
}
/* Opacity levels are hardcoded per proficiency — not token-driven */
.skill--proficiency-5 { opacity: 1; }
.skill--proficiency-1 { opacity: 0.4; }`,
  },
}

// ─── AvailabilityToggle ───────────────────────────────────────────────────────

const availabilityToggleMeta: ComponentMeta = {
  id: 'profile-availability-toggle',
  name: 'AvailabilityToggle',
  category: 'profile',
  filePath: 'components/profile/AvailabilityToggle.tsx',
  description:
    'Compact button that cycles through three availability states: available → open_to_work → unavailable. GSAP bounce animation on the status dot on each cycle. Controlled via value + onChange.',
  guidelines: [
    'Always control externally — value + onChange props required.',
    'Connect onChange to the profile store to persist changes.',
    'Place in profile header or settings — this is a high-visibility affordance.',
    'Do not disable the button — if the user cannot change availability, hide it entirely.',
  ],
  variations: [
    { name: 'available', description: 'Green dot + "Available". hsl(142,71%,45%).' },
    { name: 'open', description: 'Amber dot + "Open to Work". hsl(38,92%,50%).' },
    { name: 'unavailable', description: 'Grey dot + "Unavailable". text-muted-foreground.' },
  ],
  behavior: [
    'Click cycles: available → open → unavailable → available (modulo 3).',
    'GSAP fromTo on dotRef: scale 1.5 → 1, opacity 0.5 → 1, duration 0.3s, back.out(2) easing.',
    'Dot uses inline HSL colors — not CSS tokens.',
    'button uses bg-card hover:bg-muted/30 — token-aligned.',
  ],
  knobs: [],
  stories: [
    {
      id: 'interactive',
      name: 'Interactive',
      description: 'Click the button to cycle through states',
      render: () => <AvailabilityStory />,
      defaultProps: {},
    },
    {
      id: 'all-states',
      name: 'All States (fixed)',
      render: () => (
        <div className="flex flex-col gap-2">
          <AvailabilityToggle value="available" onChange={() => {}} />
          <AvailabilityToggle value="open" onChange={() => {}} />
          <AvailabilityToggle value="unavailable" onChange={() => {}} />
        </div>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--card', usage: 'bg-card', category: 'color', description: 'Button background' },
      { token: '--border', usage: 'border-border', category: 'color', description: 'Button border' },
      { token: '--muted', usage: 'hover:bg-muted/30', category: 'color', description: 'Hover state' },
      { token: '--muted-foreground', usage: 'text-muted-foreground (unavailable)', category: 'color', description: 'Unavailable state text and dot' },
    ],
    outOfToken: [
      { property: 'hsl(142,71%,45%) (available)', category: 'color', note: 'Hardcoded HSL, not using --available token', suggestion: 'Replace with hsl(var(--available))' },
      { property: 'hsl(38,92%,50%) (open)', category: 'color', note: 'Hardcoded HSL, not using --open-to-work token', suggestion: 'Replace with hsl(var(--open-to-work))' },
      { property: 'GSAP back.out(2)', category: 'animation', note: 'GSAP easing not defined in animation tokens', suggestion: 'Define animation.easing.bounce or use --ease-spring token' },
      { property: 'shadow-[0_0_12px_hsla(...)]', category: 'shadow', note: 'Dot glow uses hardcoded HSL shadow, not shadow tokens', suggestion: 'Use --shadow-glow or define --available-glow token' },
    ],
  },
  codeSnippet: {
    react: `import { AvailabilityToggle } from '@/components/profile/AvailabilityToggle'
import { useProfileStore } from '@/lib/stores/profile.store'

const { profile, updateAvailability } = useProfileStore()

<AvailabilityToggle
  value={profile.availability}
  onChange={updateAvailability}
/>`,
    html: `<button class="availability-toggle" data-status="available">
  <span class="availability-dot available"></span>
  <span class="availability-label">Available</span>
</button>`,
    css: `:root {
  --card:             oklch(1 0 0);
  --border:           oklch(0.922 0 0);
  --muted:            oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  /* Status colors — not used, but should be: */
  --available:   hsl(142, 71%, 42%);
  --open-to-work: hsl(38, 92%, 48%);
  --unavailable:  hsl(0, 0%, 55%);
}`,
  },
}

// ─── ProfileHeader ────────────────────────────────────────────────────────────

const profileHeaderMeta: ComponentMeta = {
  id: 'profile-header',
  name: 'ProfileHeader',
  category: 'profile',
  filePath: 'components/profile/ProfileHeader.tsx',
  description:
    'Composite profile header: SignalPulse orb on the left, name/role/badges on the right. Framer Motion entry animations on name, role, and badge row. All profile metadata displayed as Badge variants.',
  guidelines: [
    'Pass signalProfile={null} to show a placeholder circle instead of the pulse orb.',
    'Rate is shown only if hourly_rate_min or hourly_rate_max is provided.',
    'Location and hours are optional — omit them from the profile if not applicable.',
    'Headline appears below the badge row — keep to 1–2 sentences.',
    'Component is read-only — wrap AvailabilityToggle separately for editing.',
  ],
  variations: [
    { name: 'with signal', description: 'SignalPulse orb (md size) with score and trend.' },
    { name: 'without signal', description: 'Circular placeholder div when signalProfile is null.' },
  ],
  behavior: [
    'motion.h1: initial={opacity:0, y:4} → animate with 0.05s delay offset per row.',
    'Availability badge: inline HSL color from AVAILABILITY_COLORS with glow shadow.',
    'Rate badge: formatted by formatRate() utility (min–max + currency symbol).',
    'Responsive: flex-col on mobile, flex-row sm:.',
  ],
  knobs: [
    { name: 'showSignal', type: 'boolean', defaultValue: true },
    { name: 'trend', type: 'select', options: ['rising', 'stable', 'falling'], defaultValue: 'rising' },
  ],
  stories: [
    {
      id: 'interactive',
      name: 'Interactive',
      render: (p) => (
        <div className="w-full max-w-lg p-6 border border-border bg-card">
          <ProfileHeader
            profile={MOCK_PROFILE as any}
            signalProfile={
              (p.showSignal as boolean)
                ? { ...MOCK_SIGNAL_PROFILE, score_trend: p.trend as any }
                : null
            }
          />
        </div>
      ),
      defaultProps: { showSignal: true, trend: 'rising' },
    },
    {
      id: 'without-signal',
      name: 'No Signal Data',
      render: () => (
        <div className="w-full max-w-lg p-6 border border-border bg-card">
          <ProfileHeader profile={MOCK_PROFILE as any} signalProfile={null} />
        </div>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--foreground', usage: 'text-foreground (name)', category: 'color', description: 'Name heading' },
      { token: '--muted-foreground', usage: 'text-muted-foreground (role, headline)', category: 'color', description: 'Role and headline text' },
      { token: '--border', usage: 'border-border/50 (placeholder)', category: 'color', description: 'Placeholder circle border' },
      { token: '--muted', usage: 'bg-muted/30 (placeholder)', category: 'color', description: 'Placeholder circle background' },
    ],
    outOfToken: [
      { property: 'AVAILABILITY_COLORS (HSL)', category: 'color', note: 'Availability dot color uses hardcoded HSL, not CSS token', suggestion: 'Replace with var(--available) / var(--open-to-work) / var(--unavailable)' },
      { property: 'boxShadow: 0 0 4px {color}', category: 'shadow', note: 'Status dot glow is inline hardcoded shadow', suggestion: 'Use CSS variable for glow: var(--shadow-glow)' },
      { property: 'y:4 animation', category: 'animation', note: 'Entry Y offset is hardcoded 4px, not a token', suggestion: 'Define --entry-y-offset token' },
    ],
  },
  codeSnippet: {
    react: `import { ProfileHeader } from '@/components/profile/ProfileHeader'

// Full profile with signal data
<ProfileHeader
  profile={userProfile}
  signalProfile={signalProfile}
/>

// Without signal (loading or unscored user)
<ProfileHeader
  profile={userProfile}
  signalProfile={null}
/>`,
    html: `<div class="profile-header">
  <!-- SignalPulse or placeholder circle -->
  <div class="signal-orb">...</div>
  <!-- Info block -->
  <div class="profile-info">
    <h1>Alex Rivera</h1>
    <p class="role">Senior Product Engineer</p>
    <div class="badge-row">...</div>
    <p class="headline">...</p>
  </div>
</div>`,
    css: `:root {
  --foreground:       oklch(0.145 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --muted:            oklch(0.97 0 0);
  --border:           oklch(0.922 0 0);
  /* Availability colors consumed via AVAILABILITY_COLORS (not tokenized): */
  --available:    hsl(142, 71%, 42%);
  --open-to-work: hsl(38, 92%, 48%);
  --unavailable:  hsl(0, 0%, 55%);
}`,
  },
}

// ─── TrajectoryPhaseCard ──────────────────────────────────────────────────────

const trajectoryPhaseCardMeta: ComponentMeta = {
  id: 'trajectory-phase-card',
  name: 'TrajectoryPhaseCard',
  category: 'trajectory',
  filePath: 'components/trajectory/TrajectoryPhaseCard.tsx',
  description:
    'Card displaying the user\'s current career trajectory phase, growth velocity label, phase progress dots with connector lines, and the top predicted next role with a confidence bar.',
  guidelines: [
    'Always pass a full TrajectorySnapshot with current_phase and growth_velocity.',
    'role_predictions is optional — the prediction block only renders if present.',
    'Do not show this card without real trajectory data — the velocity and phase are meaningless when mocked.',
    'Place in a sidebar or dedicated trajectory page — it is too dense for the main dashboard.',
  ],
  variations: [
    { name: 'with prediction', description: 'Shows next role prediction with confidence bar.' },
    { name: 'without prediction', description: 'No prediction block — phase + velocity only.' },
  ],
  behavior: [
    'Framer entry: initial={opacity:0, y:8} → animate={opacity:1, y:0}.',
    'Phase dots: pulse animation on current phase dot (scale 1→1.3→1, 2s loop).',
    'Velocity label: Accelerating (>0.3), Growing (>0.1), Steady (≥−0.1), Declining (<−0.1).',
    'Confidence bar: Framer animate({width: `${confidence*100}%`}).',
  ],
  knobs: [
    { name: 'phase', type: 'select', options: ['emerging', 'growth', 'established', 'expert'], defaultValue: 'growth' },
    { name: 'velocity', type: 'select', options: ['0.4', '0.2', '0.0', '-0.2'], defaultValue: '0.35' },
  ],
  stories: [
    {
      id: 'interactive',
      name: 'Interactive',
      render: (p) => (
        <TrajectoryPhaseCard
          snapshot={{
            ...MOCK_TRAJECTORY,
            current_phase: p.phase as any,
            growth_velocity: parseFloat(p.velocity as string),
          } as any}
          className="w-80"
        />
      ),
      defaultProps: { phase: 'growth', velocity: '0.35' },
    },
    {
      id: 'all-phases',
      name: 'Velocity Labels',
      description: 'Same phase, different velocity labels',
      render: () => (
        <div className="grid grid-cols-2 gap-3">
          {[
            { v: 0.4, label: 'Accelerating' },
            { v: 0.2, label: 'Growing' },
            { v: 0.0, label: 'Steady' },
            { v: -0.2, label: 'Declining' },
          ].map(({ v, label }) => (
            <TrajectoryPhaseCard
              key={label}
              snapshot={{ ...MOCK_TRAJECTORY, growth_velocity: v, role_predictions: [] } as any}
            />
          ))}
        </div>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--border', usage: 'border-border', category: 'color', description: 'Card and prediction block border' },
      { token: '--card', usage: 'bg-card', category: 'color', description: 'Card background' },
      { token: '--muted', usage: 'bg-muted/10 (prediction bg)', category: 'color', description: 'Prediction block background' },
      { token: '--muted-foreground', usage: 'text-muted-foreground', category: 'color', description: 'Labels and secondary text' },
      { token: '--foreground', usage: 'text-foreground', category: 'color', description: 'Primary values and phase name' },
      { token: '--muted-foreground', usage: 'bg-muted-foreground/50 (confidence bar)', category: 'color', description: 'Confidence bar fill' },
    ],
    outOfToken: [
      { property: 'text-emerald-400 / text-red-400', category: 'color', note: 'Velocity colors are hardcoded Tailwind classes', suggestion: 'Use --available and --destructive tokens' },
      { property: 'PHASE_COLORS (hardcoded per phase)', category: 'color', note: 'Phase dot colors defined as static object in trajectory.types', suggestion: 'Define CSS vars per phase: --phase-emerging, --phase-growth, etc.' },
      { property: 'oklch(0.35 0 0) (inactive dots)', category: 'color', note: 'Inactive dot color is a hardcoded OKLCH value', suggestion: 'Use --muted or --muted-foreground token at opacity' },
    ],
  },
  codeSnippet: {
    react: `import { TrajectoryPhaseCard } from '@/components/trajectory/TrajectoryPhaseCard'

<TrajectoryPhaseCard snapshot={trajectorySnapshot} />

// TrajectorySnapshot shape:
// {
//   current_phase: 'emerging' | 'growth' | 'established' | 'expert',
//   growth_velocity: number,          // −1 to 1, positive = growing
//   role_predictions?: Array<{
//     role: string,
//     timeframe_months: number,
//     confidence: number,             // 0–1
//   }>
// }`,
    html: `<!-- TrajectoryPhaseCard requires JavaScript (Framer Motion) -->`,
    css: `:root {
  --card:             oklch(1 0 0);
  --border:           oklch(0.922 0 0);
  --foreground:       oklch(0.145 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --muted:            oklch(0.97 0 0);
  /* Phase colors — not tokenized. PHASE_COLORS in trajectory.types.ts */
}`,
  },
}

// ─── OpportunityCard ──────────────────────────────────────────────────────────

const opportunityCardMeta: ComponentMeta = {
  id: 'opportunities-opportunity-card',
  name: 'OpportunityCard',
  category: 'opportunities',
  filePath: 'components/opportunities/OpportunityCard.tsx',
  description:
    'Opportunity listing card with title, company, badge metadata, skill match tags (highlighted if matching), fit score pill, and animated fit bar. Wrapped in next/link — clicking navigates to /opportunities/{id}.',
  guidelines: [
    'Always pass an index prop for staggered entry animations — defaults to 0.',
    'Fit score and skill highlights are optional — they render only when fit data is present.',
    'Highlight matching_skills by ensuring they match required_skills strings exactly.',
    'The card is a link — do not nest other interactive elements (buttons) inside it.',
    'Show max 5 skills with slice(0,5) — the component does this internally.',
  ],
  variations: [
    { name: 'with fit data', description: 'Shows FitScorePill, skill highlights, and fit bar.' },
    { name: 'without fit data', description: 'Title, company, type and rate badges only.' },
  ],
  behavior: [
    'Framer entry: initial={opacity:0, y:8} → animate, delay=index*0.06.',
    'whileHover: y:−2 for subtle lift.',
    'FitScorePill: emerald (≥75), neutral (≥55), amber (≥35), muted (<35).',
    'Fit bar: Framer animate({width: `${fit_score}%`}), duration 0.8s.',
    'Arrow icon: group-hover:translate-x-0.5 transition.',
  ],
  knobs: [
    { name: 'showFit', type: 'boolean', defaultValue: true },
  ],
  stories: [
    {
      id: 'interactive',
      name: 'Interactive',
      render: (p) => (
        <div className="w-80">
          <OpportunityCard
            opportunity={(p.showFit as boolean) ? MOCK_OPPORTUNITY as any : { ...MOCK_OPPORTUNITY, fit: undefined } as any}
            index={0}
          />
        </div>
      ),
      defaultProps: { showFit: true },
    },
    {
      id: 'fit-scores',
      name: 'Fit Score Range',
      description: 'Shows how FitScorePill and bar change with score',
      render: () => (
        <div className="w-80 flex flex-col gap-3">
          {[
            { score: 82, label: 'Strong' },
            { score: 61, label: 'Good' },
            { score: 42, label: 'Partial' },
            { score: 22, label: 'Weak' },
          ].map(({ score, label }) => (
            <OpportunityCard
              key={score}
              opportunity={{ ...MOCK_OPPORTUNITY, title: `${label} Fit — Score ${score}`, fit: { fit_score: score, skill_match: score - 5, breakdown: { matching_skills: ['React'] } } } as any}
              index={0}
            />
          ))}
        </div>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--border', usage: 'border-border, border-border/40', category: 'color', description: 'Card border and fit bar separator' },
      { token: '--card', usage: 'bg-card', category: 'color', description: 'Card background' },
      { token: '--muted', usage: 'hover:bg-muted/30, bg-muted/40', category: 'color', description: 'Hover state and skill tag backgrounds' },
      { token: '--foreground', usage: 'text-foreground, bg-foreground/50 (bar)', category: 'color', description: 'Title, score, and fit bar fill' },
      { token: '--muted-foreground', usage: 'text-muted-foreground', category: 'color', description: 'Company name, secondary text, weak fit' },
    ],
    outOfToken: [
      { property: 'text-emerald-600/400', category: 'color', note: 'Strong fit color hardcoded — not using --available token', suggestion: 'Use text-[hsl(var(--available))]' },
      { property: 'text-amber-600/400', category: 'color', note: 'Partial fit color is hardcoded', suggestion: 'Define --signal-partial token' },
      { property: 'border-emerald-500/30 bg-emerald-500/10', category: 'color', note: 'FitScorePill borders/backgrounds are hardcoded', suggestion: 'Tokenize fit score thresholds and their colors' },
      { property: 'delay=index*0.06', category: 'animation', note: 'Stagger delay is hardcoded', suggestion: 'Define --stagger-base token' },
    ],
  },
  codeSnippet: {
    react: `import { OpportunityCard } from '@/components/opportunities/OpportunityCard'

// In a list with stagger
{opportunities.map((opp, i) => (
  <OpportunityCard key={opp.id} opportunity={opp} index={i} />
))}

// OpportunityWithFit shape:
// {
//   id, title, company_name?,
//   opportunity_type: 'full_time' | 'contract' | 'part_time',
//   remote_policy: 'remote' | 'hybrid' | 'onsite',
//   rate_min?, rate_max?, currency?,
//   required_skills: string[],
//   fit?: {
//     fit_score: number,
//     skill_match: number,
//     breakdown: { matching_skills: string[] }
//   }
// }`,
    html: `<a href="/opportunities/..." class="opportunity-card">
  <div class="header">
    <div class="title-block">...</div>
    <div class="fit-score-pill">84 — Strong</div>
  </div>
  <div class="badges">...</div>
  <div class="skills">...</div>
  <div class="fit-bar">...</div>
</a>`,
    css: `:root {
  --card:             oklch(1 0 0);
  --border:           oklch(0.922 0 0);
  --muted:            oklch(0.97 0 0);
  --foreground:       oklch(0.145 0 0);
  --muted-foreground: oklch(0.556 0 0);
  /* Fit score colors not tokenized — hardcoded emerald/amber/neutral */
}`,
  },
}

// ─── Accordion ───────────────────────────────────────────────────────────────

const accordionMeta: ComponentMeta = {
  id: 'ui-accordion',
  name: 'Accordion',
  category: 'ui',
  filePath: 'components/ui/accordion.tsx',
  description:
    'Vertically stacked collapsible sections built on Radix Accordion. Supports single and multiple open items. Trigger includes a rotate-180 ChevronDown icon on open.',
  guidelines: [
    'Use type="single" when only one section should be open at a time (default).',
    'Use type="multiple" for independent expandable sections.',
    'Keep trigger labels short and scannable — they act as section headings.',
    'Use collapsible={true} with type="single" so the open item can be closed.',
    'Do not nest Accordions — use Collapsible for simpler expand/collapse patterns.',
  ],
  variations: [
    { name: 'single', description: 'Only one item open at a time. Default pattern.' },
    { name: 'multiple', description: 'Multiple items can be open simultaneously.' },
  ],
  behavior: [
    'ChevronDown icon rotates 180° when item is open via data-open selector.',
    'Content animates open/closed via data-open:animate-in / data-closed:animate-out.',
    'Focus-visible: ring on AccordionTrigger.',
    'AccordionContent uses overflow-hidden + max-height animation.',
  ],
  knobs: [],
  stories: [
    {
      id: 'default',
      name: 'Default',
      render: () => (
        <Accordion type="single" collapsible className="w-80">
          <AccordionItem value="skills">
            <AccordionTrigger>Skills & Expertise</AccordionTrigger>
            <AccordionContent>
              <p className="text-xs text-muted-foreground">Manage your technical and soft skill inventory here.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="signal">
            <AccordionTrigger>Signal Breakdown</AccordionTrigger>
            <AccordionContent>
              <p className="text-xs text-muted-foreground">Detailed view of reliability, performance, and growth dimensions.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="history">
            <AccordionTrigger>Work History</AccordionTrigger>
            <AccordionContent>
              <p className="text-xs text-muted-foreground">Your recorded engagements and verified outcomes.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--border', usage: 'border-b (AccordionItem)', category: 'color', description: 'Item divider' },
      { token: '--foreground', usage: 'text-foreground', category: 'color', description: 'Trigger text' },
      { token: '--muted-foreground', usage: 'text-muted-foreground (content)', category: 'color', description: 'Content text' },
    ],
    outOfToken: [
      { property: 'rotate-180', category: 'animation', note: 'Icon rotation is a fixed Tailwind class, not an animation token', suggestion: 'Define --accordion-icon-rotate token' },
    ],
  },
  codeSnippet: {
    react: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section Title</AccordionTrigger>
    <AccordionContent>Section content goes here.</AccordionContent>
  </AccordionItem>
</Accordion>

// Multiple open items
<Accordion type="multiple">
  <AccordionItem value="a"><AccordionTrigger>A</AccordionTrigger><AccordionContent>...</AccordionContent></AccordionItem>
  <AccordionItem value="b"><AccordionTrigger>B</AccordionTrigger><AccordionContent>...</AccordionContent></AccordionItem>
</Accordion>`,
    html: `<div data-slot="accordion">
  <div data-slot="accordion-item">
    <button data-slot="accordion-trigger" aria-expanded="false">Section Title</button>
    <div data-slot="accordion-content" hidden>Content</div>
  </div>
</div>`,
    css: `:root { --border: oklch(0.922 0 0); }`,
  },
}

// ─── AlertDialog ─────────────────────────────────────────────────────────────

const alertDialogMeta: ComponentMeta = {
  id: 'ui-alert-dialog',
  name: 'AlertDialog',
  category: 'ui',
  filePath: 'components/ui/alert-dialog.tsx',
  description:
    'Blocking confirmation modal for destructive or irreversible actions. Built on Radix AlertDialog. Unlike Dialog, it traps focus and requires an explicit user decision — Cancel or Confirm.',
  guidelines: [
    'Use only for irreversible actions (delete, revoke, submit).',
    'AlertDialogAction should be variant="destructive" when the action is dangerous.',
    'Keep title and description concise — one sentence each.',
    'AlertDialogCancel always cancels — do not use it for secondary actions.',
    'Never auto-open an AlertDialog — it must be user-triggered.',
  ],
  variations: [
    { name: 'default', description: 'Standard confirmation with cancel + action buttons.' },
    { name: 'with media', description: 'Optional AlertDialogMedia slot above header for illustrative content.' },
  ],
  behavior: [
    'Blocks background interaction — pointer-events-none on overlay.',
    'Focus is trapped within the dialog until dismissed.',
    'Escape key triggers AlertDialogCancel.',
    'Overlay animates fade-in/out; content slides in from bottom.',
  ],
  knobs: [],
  stories: [
    {
      id: 'default',
      name: 'Default',
      render: () => (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">Delete Account</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. Your profile, signal history, and opportunities will be permanently deleted.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Delete Account</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--background', usage: 'bg-background (content)', category: 'color', description: 'Dialog background' },
      { token: '--foreground', usage: 'text-foreground', category: 'color', description: 'Title text' },
      { token: '--muted-foreground', usage: 'text-muted-foreground', category: 'color', description: 'Description text' },
      { token: '--border', usage: 'border-border', category: 'color', description: 'Dialog border' },
    ],
    outOfToken: [
      { property: 'bg-black/80 (overlay)', category: 'color', note: 'Overlay darkness is hardcoded, not a token', suggestion: 'Define --overlay-backdrop token' },
    ],
  },
  codeSnippet: {
    react: `import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent,
  AlertDialogHeader, AlertDialogTitle, AlertDialogDescription,
  AlertDialogFooter, AlertDialogAction, AlertDialogCancel
} from '@/components/ui/alert-dialog'

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Confirm</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
    html: `<button aria-haspopup="dialog">Delete</button>
<div role="alertdialog" aria-modal="true">
  <h2>Are you sure?</h2>
  <p>This cannot be undone.</p>
  <button>Cancel</button>
  <button>Confirm</button>
</div>`,
    css: `:root { --background: oklch(1 0 0); --border: oklch(0.922 0 0); }`,
  },
}

// ─── Checkbox ────────────────────────────────────────────────────────────────

const checkboxMeta: ComponentMeta = {
  id: 'ui-checkbox',
  name: 'Checkbox',
  category: 'ui',
  filePath: 'components/ui/checkbox.tsx',
  description:
    'Accessible checkbox built on Radix Checkbox. 16px square, rounded-none. Shows a CheckIcon when checked, a MinusIcon when indeterminate. Always pair with a Label.',
  guidelines: [
    'Always pair with a Label — do not use placeholder text as a label.',
    'Use indeterminate state for "select all" controls when sub-items are mixed.',
    'Wrap multiple checkboxes in a FieldSet with FieldLegend for grouping.',
    'Controlled: use checked + onCheckedChange. Uncontrolled: use defaultChecked.',
  ],
  variations: [
    { name: 'unchecked', description: 'Empty. border-input background.' },
    { name: 'checked', description: 'Filled bg-primary with white CheckIcon.' },
    { name: 'indeterminate', description: 'bg-primary with MinusIcon.' },
  ],
  behavior: [
    'data-checked: bg-primary border-primary text-primary-foreground.',
    'data-indeterminate: bg-primary with MinusIcon.',
    'Focus-visible: ring-ring/50.',
    'Disabled: opacity-50, pointer-events-none.',
  ],
  knobs: [
    { name: 'disabled', type: 'boolean', defaultValue: false },
  ],
  stories: [
    {
      id: 'default',
      name: 'States',
      render: () => (
        <div className="flex flex-col gap-3">
          {[
            { id: 'c1', label: 'Unchecked' },
            { id: 'c2', label: 'Checked', defaultChecked: true },
            { id: 'c3', label: 'Disabled', disabled: true },
          ].map(({ id, label, ...props }) => (
            <div key={id} className="flex items-center gap-2">
              <Checkbox id={id} {...props} />
              <Label htmlFor={id}>{label}</Label>
            </div>
          ))}
        </div>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--primary', usage: 'data-checked:bg-primary', category: 'color', description: 'Checked fill' },
      { token: '--primary-foreground', usage: 'text-primary-foreground', category: 'color', description: 'Check icon color' },
      { token: '--input', usage: 'border-input', category: 'color', description: 'Unchecked border' },
      { token: '--ring', usage: 'focus-visible:ring-ring/50', category: 'color', description: 'Focus ring' },
    ],
    outOfToken: [
      { property: 'size-4', category: 'spacing', note: '16px size is hardcoded, not from componentSizes token', suggestion: 'Define componentSizes.checkbox token' },
    ],
  },
  codeSnippet: {
    react: `import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

<div className="flex items-center gap-2">
  <Checkbox id="agree" onCheckedChange={(v) => console.log(v)} />
  <Label htmlFor="agree">I agree to the terms</Label>
</div>

// Controlled
<Checkbox checked={isChecked} onCheckedChange={setIsChecked} />

// Indeterminate
<Checkbox checked="indeterminate" />`,
    html: `<button role="checkbox" aria-checked="false" data-slot="checkbox"></button>`,
    css: `:root { --primary: oklch(0.205 0 0); --input: oklch(0.922 0 0); }`,
  },
}

// ─── Dialog ──────────────────────────────────────────────────────────────────

const dialogMeta: ComponentMeta = {
  id: 'ui-dialog',
  name: 'Dialog',
  category: 'ui',
  filePath: 'components/ui/dialog.tsx',
  description:
    'Modal dialog built on Radix Dialog. Use for focused tasks that require user attention without navigating away. Includes header, footer, and optional close button. Use AlertDialog for destructive confirmations.',
  guidelines: [
    'Use Dialog for forms, detail views, and multi-step flows.',
    'Use AlertDialog for irreversible actions — Dialog dismiss is too easy.',
    'Keep dialog width under 600px. Use className to control max-w.',
    'DialogFooter should contain the primary action (right) and cancel (left).',
    'Include a DialogTitle for accessibility — use sr-only if visually hidden.',
  ],
  variations: [
    { name: 'default', description: 'Standard modal with overlay.' },
  ],
  behavior: [
    'Overlay: bg-black/50, backdrop-blur-sm.',
    'Content: slides in from top, fades out on close.',
    'Close button top-right: absolutely positioned X icon.',
    'Escape key and overlay click both close the dialog.',
  ],
  knobs: [],
  stories: [
    {
      id: 'default',
      name: 'Default',
      render: () => (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">Edit Profile</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>Update your display name and headline.</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3 py-2">
              <Input placeholder="Display name" />
              <Textarea placeholder="Professional headline..." rows={2} />
            </div>
            <DialogFooter>
              <Button variant="outline" size="sm">Cancel</Button>
              <Button size="sm">Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--background', usage: 'bg-background', category: 'color', description: 'Dialog surface' },
      { token: '--border', usage: 'border (implicit via ring)', category: 'color', description: 'Dialog outline' },
      { token: '--foreground', usage: 'text-foreground', category: 'color', description: 'Title' },
      { token: '--muted-foreground', usage: 'text-muted-foreground', category: 'color', description: 'Description' },
    ],
    outOfToken: [
      { property: 'bg-black/50 (overlay)', category: 'color', note: 'Overlay uses hardcoded opacity, not a token', suggestion: 'Define --overlay-bg token' },
    ],
  },
  codeSnippet: {
    react: `import {
  Dialog, DialogTrigger, DialogContent,
  DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from '@/components/ui/dialog'

<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description here.</DialogDescription>
    </DialogHeader>
    {/* form content */}
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    html: `<div role="dialog" aria-modal="true" data-slot="dialog-content">
  <div data-slot="dialog-header">
    <h2 data-slot="dialog-title">Title</h2>
  </div>
</div>`,
    css: `:root { --background: oklch(1 0 0); }`,
  },
}

// ─── DropdownMenu ─────────────────────────────────────────────────────────────

const dropdownMenuMeta: ComponentMeta = {
  id: 'ui-dropdown-menu',
  name: 'DropdownMenu',
  category: 'ui',
  filePath: 'components/ui/dropdown-menu.tsx',
  description:
    'Context menu built on Radix DropdownMenu. Supports items, labels, separators, checkboxes, radio groups, and submenus. Renders in a Portal for safe z-index stacking.',
  guidelines: [
    'Trigger should be a button (use asChild with Button component).',
    'Keep item labels short — 1–4 words.',
    'Use DropdownMenuSeparator to group related actions.',
    'Use DropdownMenuCheckboxItem / RadioItem for stateful menu options.',
    'Show keyboard shortcuts with DropdownMenuShortcut — right-aligned.',
    'Use DropdownMenuSub for nested actions — limit to one level of nesting.',
  ],
  variations: [
    { name: 'items', description: 'Basic list of clickable actions.' },
    { name: 'with labels & separators', description: 'Grouped actions with section labels.' },
    { name: 'checkbox items', description: 'Toggle-state items inside the menu.' },
    { name: 'sub menu', description: 'Nested submenu via DropdownMenuSub.' },
  ],
  behavior: [
    'Opens on trigger click, closes on item select or Escape.',
    'Arrow keys navigate items; Enter/Space activates.',
    'Content appears at sideOffset=4 from trigger.',
    'Portal renders outside the DOM tree for proper z-index.',
  ],
  knobs: [],
  stories: [
    {
      id: 'default',
      name: 'Default',
      render: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">Actions</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>Profile</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit Profile</DropdownMenuItem>
            <DropdownMenuItem>View Signal</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--popover', usage: 'bg-popover', category: 'color', description: 'Menu background' },
      { token: '--popover-foreground', usage: 'text-popover-foreground', category: 'color', description: 'Menu text' },
      { token: '--muted', usage: 'hover:bg-muted', category: 'color', description: 'Item hover' },
      { token: '--foreground', usage: 'ring-foreground/10', category: 'color', description: 'Subtle border via ring' },
      { token: '--destructive', usage: 'text-destructive (destructive items)', category: 'color', description: 'Danger action color' },
    ],
    outOfToken: [
      { property: 'sideOffset=4', category: 'spacing', note: 'Offset from trigger is hardcoded', suggestion: 'Define --menu-offset spacing token' },
    ],
  },
  codeSnippet: {
    react: `import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuShortcut
} from '@/components/ui/dropdown-menu'

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Options</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      Settings <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem className="text-destructive">Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    html: `<div role="menu" data-slot="dropdown-menu-content">
  <div role="menuitem" data-slot="dropdown-menu-item">Settings</div>
</div>`,
    css: `:root { --popover: oklch(1 0 0); --muted: oklch(0.97 0 0); }`,
  },
}

// ─── Select ──────────────────────────────────────────────────────────────────

const selectMeta: ComponentMeta = {
  id: 'ui-select',
  name: 'Select',
  category: 'ui',
  filePath: 'components/ui/select.tsx',
  description:
    'Accessible select dropdown built on Radix Select. Shows selected value in trigger, opens a styled floating list with search support. Use NativeSelect for simpler single-value dropdowns without the custom UI.',
  guidelines: [
    'Always pair with a Label for accessibility.',
    'Use placeholder via SelectValue placeholder prop.',
    'Group related options with SelectGroup and SelectLabel.',
    'Use NativeSelect when mobile performance matters — Radix Select uses a custom portal.',
    'Keep option labels concise — they appear in the trigger after selection.',
  ],
  variations: [
    { name: 'default', description: 'Custom Radix dropdown with styled list.' },
    { name: 'with groups', description: 'Options grouped by SelectGroup and SelectLabel.' },
  ],
  behavior: [
    'SelectTrigger shows SelectValue placeholder until an option is selected.',
    'ChevronDown icon rotates when open.',
    'Keyboard: arrow keys navigate, Enter selects, Escape closes.',
    'ScrollUpButton / ScrollDownButton appear when list overflows.',
  ],
  knobs: [],
  stories: [
    {
      id: 'default',
      name: 'Default',
      render: () => (
        <div className="flex flex-col gap-1.5 w-48">
          <Label>Availability</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select status..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="open">Open to work</SelectItem>
              <SelectItem value="unavailable">Unavailable</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--background', usage: 'bg-background (content)', category: 'color', description: 'Dropdown panel background' },
      { token: '--input', usage: 'border-input (trigger)', category: 'color', description: 'Trigger border' },
      { token: '--muted', usage: 'hover:bg-muted', category: 'color', description: 'Item hover' },
      { token: '--primary', usage: 'data-selected:bg-primary/10', category: 'color', description: 'Selected item highlight' },
      { token: '--ring', usage: 'focus-visible:ring-ring/50', category: 'color', description: 'Trigger focus ring' },
    ],
    outOfToken: [
      { property: 'sideOffset=4', category: 'spacing', note: 'Dropdown offset hardcoded', suggestion: 'Define --select-offset token' },
    ],
  },
  codeSnippet: {
    react: `import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'

<div className="flex flex-col gap-1.5">
  <Label>Role</Label>
  <Select onValueChange={(v) => console.log(v)}>
    <SelectTrigger>
      <SelectValue placeholder="Choose a role..." />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="engineer">Engineer</SelectItem>
      <SelectItem value="designer">Designer</SelectItem>
      <SelectItem value="pm">Product Manager</SelectItem>
    </SelectContent>
  </Select>
</div>`,
    html: `<button role="combobox" aria-expanded="false" data-slot="select-trigger">
  <span>Choose a role...</span>
</button>`,
    css: `:root { --background: oklch(1 0 0); --input: oklch(0.922 0 0); }`,
  },
}

// ─── Tooltip ─────────────────────────────────────────────────────────────────

const tooltipMeta: ComponentMeta = {
  id: 'ui-tooltip',
  name: 'Tooltip',
  category: 'ui',
  filePath: 'components/ui/tooltip.tsx',
  description:
    'Non-interactive hover label built on Radix Tooltip. Shows on hover/focus after a short delay. Wrap the root app in TooltipProvider once — do not nest providers. Use for icon-only button labels and dense UI explanations.',
  guidelines: [
    'Wrap your app root in <TooltipProvider> once — not per tooltip.',
    'Only put text in tooltips — no buttons, links, or interactive content.',
    'Use for icon-only buttons where the label would be too long inline.',
    'Do not use tooltips for required information — they are not accessible on mobile.',
    'Prefer side="bottom" for toolbar icons, side="right" for sidebar items.',
  ],
  variations: [
    { name: 'default', description: 'Appears above trigger by default.' },
    { name: 'with Kbd', description: 'Keyboard shortcut displayed inside tooltip content.' },
  ],
  behavior: [
    'Default delay: 200ms open, 0ms close.',
    'TooltipContent renders in a Portal for proper stacking.',
    'Focus-visible on trigger also opens tooltip.',
    'Kbd components auto-invert inside tooltip-content via in-data-[slot=tooltip-content] selector.',
  ],
  knobs: [],
  stories: [
    {
      id: 'default',
      name: 'Default',
      render: () => (
        <TooltipProvider>
          <div className="flex items-center gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon"><span className="text-base">⚙</span></Button>
              </TooltipTrigger>
              <TooltipContent>Settings</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon"><span className="text-base">↗</span></Button>
              </TooltipTrigger>
              <TooltipContent>
                <span>Share profile</span>
                <Kbd className="ml-1.5">⌘K</Kbd>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--popover', usage: 'bg-popover', category: 'color', description: 'Tooltip background' },
      { token: '--popover-foreground', usage: 'text-popover-foreground', category: 'color', description: 'Tooltip text' },
    ],
    outOfToken: [
      { property: 'delayDuration=200', category: 'animation', note: 'Open delay hardcoded in TooltipProvider', suggestion: 'Define --tooltip-delay token' },
      { property: 'sideOffset=4', category: 'spacing', note: 'Offset from trigger is hardcoded', suggestion: 'Define --tooltip-offset token' },
    ],
  },
  codeSnippet: {
    react: `// 1. Wrap app root once
import { TooltipProvider } from '@/components/ui/tooltip'
<TooltipProvider><App /></TooltipProvider>

// 2. Use per tooltip
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'

<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="ghost" size="icon"><Icon /></Button>
  </TooltipTrigger>
  <TooltipContent>Delete item</TooltipContent>
</Tooltip>`,
    html: `<div role="tooltip" data-slot="tooltip-content">Settings</div>`,
    css: `:root { --popover: oklch(1 0 0); --popover-foreground: oklch(0.145 0 0); }`,
  },
}

// ─── Slider ───────────────────────────────────────────────────────────────────

const sliderMeta: ComponentMeta = {
  id: 'ui-slider',
  name: 'Slider',
  category: 'ui',
  filePath: 'components/ui/slider.tsx',
  description:
    'Range input built on Radix Slider. 4px track, 16px thumb. Supports single value and range (two thumbs). Full keyboard control with arrow keys. Use for numeric ranges like hourly rate, score thresholds, or experience years.',
  guidelines: [
    'Always show the current value numerically near the slider — the position alone is not readable.',
    'Use min, max, step props for all bounded ranges.',
    'For rate ranges, use two thumbs: value={[min, max]} onValueChange={([a,b]) => ...}.',
    'Pair with a Label for accessibility.',
    'Avoid for precise numeric entry — use Input type="number" instead.',
  ],
  variations: [
    { name: 'single', description: 'One thumb, single value.' },
    { name: 'range', description: 'Two thumbs, min/max value pair.' },
  ],
  behavior: [
    'Arrow keys: ±step. Shift+Arrow: ±10×step.',
    'Thumb: focus-visible ring-ring/50.',
    'Track fill (range) uses bg-primary.',
    'Track unfilled uses bg-input.',
  ],
  knobs: [],
  stories: [
    {
      id: 'default',
      name: 'Single Value',
      render: () => (
        <div className="w-64 flex flex-col gap-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <Label>Score threshold</Label>
            <span>65</span>
          </div>
          <Slider defaultValue={[65]} min={0} max={100} step={1} />
        </div>
      ),
      defaultProps: {},
    },
    {
      id: 'range',
      name: 'Range',
      render: () => (
        <div className="w-64 flex flex-col gap-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <Label>Rate range</Label>
            <span>$90 – $140/hr</span>
          </div>
          <Slider defaultValue={[90, 140]} min={50} max={300} step={10} />
        </div>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--primary', usage: 'bg-primary (range fill, thumb)', category: 'color', description: 'Active track and thumb' },
      { token: '--input', usage: 'bg-input (track)', category: 'color', description: 'Inactive track' },
      { token: '--ring', usage: 'focus-visible:ring-ring/50', category: 'color', description: 'Thumb focus ring' },
      { token: '--background', usage: 'bg-background (thumb center)', category: 'color', description: 'Thumb inner color' },
    ],
    outOfToken: [
      { property: 'h-1 track / size-4 thumb', category: 'spacing', note: 'Hardcoded dimensions, not from component size tokens', suggestion: 'Define componentSizes.slider in tokens.ts' },
    ],
  },
  codeSnippet: {
    react: `import { Slider } from '@/components/ui/slider'

// Single value
const [score, setScore] = useState([65])
<Slider value={score} onValueChange={setScore} min={0} max={100} step={1} />

// Range (two thumbs)
const [range, setRange] = useState([90, 140])
<Slider value={range} onValueChange={setRange} min={50} max={300} step={10} />`,
    html: `<span role="slider" aria-valuemin="0" aria-valuemax="100" aria-valuenow="65" data-slot="slider-thumb"></span>`,
    css: `:root { --primary: oklch(0.205 0 0); --input: oklch(0.922 0 0); }`,
  },
}

// ─── Kbd ─────────────────────────────────────────────────────────────────────

const kbdMeta: ComponentMeta = {
  id: 'ui-kbd',
  name: 'Kbd',
  category: 'ui',
  filePath: 'components/ui/kbd.tsx',
  description:
    'Keyboard shortcut display. Uses the semantic <kbd> element. h-5 with bg-muted background. Auto-inverts inside Tooltip content via in-data-[slot=tooltip-content] selector. KbdGroup wraps multiple keys in a sequence.',
  guidelines: [
    'Use for displaying keyboard shortcuts inline or in tooltips.',
    'Use KbdGroup to group modifier + key sequences (⌘ + K).',
    'Keep content to a single key or symbol — use KbdGroup for combos.',
    'Inside Tooltip, Kbd auto-styles itself — no class override needed.',
  ],
  variations: [
    { name: 'single', description: 'Single key: ⌘, K, Enter, ⇧.' },
    { name: 'group', description: 'KbdGroup wrapping multiple Kbd elements.' },
  ],
  behavior: [
    'Inside tooltip-content: bg changes to bg-background/20 for contrast.',
    'SVG children auto-size to 12px via [&_svg:not([class*=size-])]:size-3.',
    'select-none prevents accidental text selection.',
  ],
  knobs: [],
  stories: [
    {
      id: 'default',
      name: 'Keys & Groups',
      render: () => (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
            <Kbd>Enter</Kbd>
            <Kbd>⇧</Kbd>
          </div>
          <div className="flex items-center gap-3">
            <KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup>
            <KbdGroup><Kbd>⌘</Kbd><Kbd>⇧</Kbd><Kbd>P</Kbd></KbdGroup>
          </div>
        </div>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--muted', usage: 'bg-muted', category: 'color', description: 'Key background' },
      { token: '--muted-foreground', usage: 'text-muted-foreground', category: 'color', description: 'Key text' },
    ],
    outOfToken: [
      { property: 'h-5 min-w-5', category: 'spacing', note: 'Fixed size not from token', suggestion: 'Define componentSizes.kbd token' },
    ],
  },
  codeSnippet: {
    react: `import { Kbd, KbdGroup } from '@/components/ui/kbd'

// Single key
<Kbd>⌘</Kbd>

// Key sequence
<KbdGroup>
  <Kbd>⌘</Kbd>
  <Kbd>K</Kbd>
</KbdGroup>

// Inside Tooltip (auto-inverts)
<TooltipContent>
  Search <Kbd className="ml-1.5">⌘K</Kbd>
</TooltipContent>`,
    html: `<kbd data-slot="kbd">⌘</kbd>`,
    css: `:root { --muted: oklch(0.97 0 0); --muted-foreground: oklch(0.556 0 0); }`,
  },
}

// ─── Spinner ──────────────────────────────────────────────────────────────────

const spinnerMeta: ComponentMeta = {
  id: 'ui-spinner',
  name: 'Spinner',
  category: 'ui',
  filePath: 'components/ui/spinner.tsx',
  description:
    'Loading indicator using Lucide Loader2Icon with animate-spin. size-4 by default. Passes all SVG props through — use className to override size and color. Provides role="status" and aria-label="Loading" for accessibility.',
  guidelines: [
    'Use for async operations with unknown duration (data loading, form submit).',
    'Show alongside text: <Spinner /> Loading… — do not use alone in context.',
    'Override size with className="size-5" or "size-6" — do not set width/height directly.',
    'For page-level loading use LoadingScreen, not Spinner.',
    'Pair with aria-live="polite" on a container for screen reader announcements.',
  ],
  variations: [
    { name: 'default', description: 'size-4 (16px). Inline loading indicator.' },
    { name: 'large', description: 'className="size-6" for button or card loading states.' },
  ],
  behavior: [
    'animate-spin: Tailwind CSS keyframe, 1s linear infinite.',
    'role="status" + aria-label="Loading" — accessible by default.',
    'Inherits text color from parent.',
  ],
  knobs: [],
  stories: [
    {
      id: 'default',
      name: 'Sizes & Colors',
      render: () => (
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Spinner />
            <span className="text-xs text-muted-foreground">Default (size-4)</span>
          </div>
          <div className="flex items-center gap-2">
            <Spinner className="size-5 text-primary" />
            <span className="text-xs text-muted-foreground">size-5, primary</span>
          </div>
          <div className="flex items-center gap-2">
            <Spinner className="size-6 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">size-6, muted</span>
          </div>
        </div>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [],
    outOfToken: [
      { property: 'size-4', category: 'spacing', note: 'Default size is hardcoded in component', suggestion: 'Accept size prop or define componentSizes.spinner token' },
      { property: 'animate-spin', category: 'animation', note: 'Uses Tailwind default 1s linear spin, not a custom animation token', suggestion: 'Define --duration-spin token' },
    ],
  },
  codeSnippet: {
    react: `import { Spinner } from '@/components/ui/spinner'

// Inline
<Button disabled>
  <Spinner /> Saving...
</Button>

// Custom size + color
<Spinner className="size-6 text-primary" />

// Accessible container
<div aria-live="polite" aria-busy={isLoading}>
  {isLoading && <Spinner />}
</div>`,
    html: `<svg role="status" aria-label="Loading" class="size-4 animate-spin lucide lucide-loader-2"></svg>`,
    css: `/* animate-spin: Tailwind keyframe (1s linear infinite) */`,
  },
}

// ─── Label ────────────────────────────────────────────────────────────────────

const labelMeta: ComponentMeta = {
  id: 'ui-label',
  name: 'Label',
  category: 'ui',
  filePath: 'components/ui/label.tsx',
  description:
    'Accessible form label built on Radix Label. Always use with form inputs via htmlFor. Automatically dims when the associated control is disabled via group-data-[disabled] or peer-disabled. text-xs font-medium.',
  guidelines: [
    'Always use htmlFor matching the input id — do not wrap the input in Label without htmlFor.',
    'Keep label text concise — one noun phrase, no punctuation.',
    'For required fields, add an asterisk or "(required)" text inside the Label.',
    'Do not use as a heading substitute — use h2/h3 for section titles.',
  ],
  variations: [
    { name: 'default', description: 'text-xs font-medium, inherits color from context.' },
    { name: 'disabled', description: 'opacity-50 when peer control is disabled.' },
  ],
  behavior: [
    'peer-disabled:opacity-50 dims automatically when input is disabled.',
    'cursor-pointer by default.',
    'group-data-[disabled=true]:opacity-50 for form groups.',
  ],
  knobs: [],
  stories: [
    {
      id: 'default',
      name: 'With Inputs',
      render: () => (
        <div className="flex flex-col gap-4 w-56">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email-demo">Email address</Label>
            <Input id="email-demo" type="email" placeholder="you@example.com" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="disabled-demo">Disabled field</Label>
            <Input id="disabled-demo" disabled placeholder="Not editable" />
          </div>
        </div>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--foreground', usage: 'text-foreground (inherited)', category: 'color', description: 'Label text' },
    ],
    outOfToken: [
      { property: 'text-xs', category: 'typography', note: 'Font size hardcoded, not from typography token', suggestion: 'Use typography.scale.xs token' },
    ],
  },
  codeSnippet: {
    react: `import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

<div className="flex flex-col gap-1.5">
  <Label htmlFor="name">Display Name</Label>
  <Input id="name" placeholder="Alex Rivera" />
</div>

// Required marker
<Label htmlFor="rate">
  Hourly Rate <span className="text-destructive ml-0.5">*</span>
</Label>`,
    html: `<label data-slot="label" for="input-id">Field Label</label>`,
    css: `[data-slot="label"] { font-size: 0.75rem; font-weight: 500; }`,
  },
}

// ─── Table ────────────────────────────────────────────────────────────────────

const tableMeta: ComponentMeta = {
  id: 'ui-table',
  name: 'Table',
  category: 'ui',
  filePath: 'components/ui/table.tsx',
  description:
    'Semantic HTML table with styled sub-components. Wrapped in a scroll container for overflow. text-xs throughout. TableHead uses text-muted-foreground; TableCell uses text-foreground. Last column right-aligns via [&:has([role=checkbox])]:pr-0.',
  guidelines: [
    'Use for tabular data with column headers — not for layout.',
    'Wrap in a fixed-height container with overflow-auto for large datasets.',
    'Use TableCaption for screen reader context.',
    'Align numeric columns right via className="text-right".',
    'Sort indicators belong in TableHead — not TableCell.',
  ],
  variations: [
    { name: 'default', description: 'Full-width table with header, body, and footer.' },
    { name: 'compact', description: 'Smaller row padding via className overrides.' },
  ],
  behavior: [
    'Table is wrapped in a relative w-full overflow-auto div.',
    'TableRow hover: bg-muted/50.',
    'TableRow data-selected: bg-muted.',
    'TableHead: h-10, text-left, text-muted-foreground.',
  ],
  knobs: [],
  stories: [
    {
      id: 'default',
      name: 'Default',
      render: () => (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { name: 'Alex Rivera', role: 'Engineer', score: 82 },
              { name: 'Sam Chen', role: 'Designer', score: 74 },
              { name: 'Jordan Kim', role: 'PM', score: 91 },
            ].map((row) => (
              <TableRow key={row.name}>
                <TableCell className="font-medium">{row.name}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell className="text-right">{row.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--border', usage: 'border-b (TableRow)', category: 'color', description: 'Row divider' },
      { token: '--muted', usage: 'hover:bg-muted/50, data-selected:bg-muted', category: 'color', description: 'Row hover and selected state' },
      { token: '--muted-foreground', usage: 'text-muted-foreground (TableHead)', category: 'color', description: 'Header text' },
    ],
    outOfToken: [
      { property: 'h-10 (head) / h-12 (cell)', category: 'spacing', note: 'Row heights hardcoded', suggestion: 'Define componentSizes.table.row.height tokens' },
      { property: 'px-4', category: 'spacing', note: 'Cell padding uses Tailwind default', suggestion: 'Map to --space-4 token' },
    ],
  },
  codeSnippet: {
    react: `import {
  Table, TableHeader, TableBody, TableRow,
  TableHead, TableCell, TableCaption
} from '@/components/ui/table'

<Table>
  <TableCaption>Recent engagements</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Client</TableHead>
      <TableHead className="text-right">Score</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {rows.map((r) => (
      <TableRow key={r.id}>
        <TableCell>{r.client}</TableCell>
        <TableCell className="text-right">{r.score}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`,
    html: `<div class="overflow-auto">
  <table data-slot="table">
    <thead data-slot="table-header">
      <tr data-slot="table-row">
        <th data-slot="table-head">Name</th>
      </tr>
    </thead>
    <tbody data-slot="table-body">
      <tr data-slot="table-row">
        <td data-slot="table-cell">Alex Rivera</td>
      </tr>
    </tbody>
  </table>
</div>`,
    css: `:root { --border: oklch(0.922 0 0); --muted: oklch(0.97 0 0); }`,
  },
}

// ─── Toggle ───────────────────────────────────────────────────────────────────

const toggleMeta: ComponentMeta = {
  id: 'ui-toggle',
  name: 'Toggle',
  category: 'ui',
  filePath: 'components/ui/toggle.tsx',
  description:
    'Single on/off button built on Radix Toggle. Pressed state uses data-state="on". Three variants (default, outline, ghost) and three sizes. Use for formatting controls, filter chips, or feature flags.',
  guidelines: [
    'Use Toggle for binary on/off state — one toggle per concept.',
    'Use ToggleGroup for mutually exclusive or multi-select grouped options.',
    'Always provide aria-label when the toggle has no visible text.',
    'Use variant="outline" for toggles inside forms or toolbars.',
  ],
  variations: [
    { name: 'default', description: 'No background until pressed.' },
    { name: 'outline', description: 'border-input resting, bg-muted on press.' },
  ],
  behavior: [
    'data-state="on": bg-muted text-foreground.',
    'Focus-visible: ring-ring/50.',
    'Disabled: opacity-50, pointer-events-none.',
  ],
  knobs: [
    { name: 'variant', type: 'select', options: ['default', 'outline'], defaultValue: 'default' },
    { name: 'size', type: 'select', options: ['sm', 'default', 'lg'], defaultValue: 'default' },
  ],
  stories: [
    {
      id: 'default',
      name: 'Variants',
      render: () => (
        <div className="flex items-center gap-3">
          {(['default', 'outline'] as const).map((v) => (
            <Toggle key={v} variant={v}>
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </Toggle>
          ))}
        </div>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--accent', usage: 'data-[state=on]:bg-accent', category: 'color', description: 'Pressed background' },
      { token: '--accent-foreground', usage: 'data-[state=on]:text-accent-foreground', category: 'color', description: 'Pressed text' },
      { token: '--ring', usage: 'focus-visible:ring-ring/50', category: 'color', description: 'Focus ring' },
    ],
    outOfToken: [],
  },
  codeSnippet: {
    react: `import { Toggle } from '@/components/ui/toggle'

const [bold, setBold] = useState(false)

<Toggle
  pressed={bold}
  onPressedChange={setBold}
  aria-label="Toggle bold"
>
  B
</Toggle>`,
    html: `<button role="button" data-state="on" data-slot="toggle" aria-pressed="true">B</button>`,
    css: `:root { --accent: oklch(0.97 0 0); --accent-foreground: oklch(0.21 0 0); }`,
  },
}

// ─── ToggleGroup ──────────────────────────────────────────────────────────────

const toggleGroupMeta: ComponentMeta = {
  id: 'ui-toggle-group',
  name: 'ToggleGroup',
  category: 'ui',
  filePath: 'components/ui/toggle-group.tsx',
  description:
    'Group of Toggle buttons with shared state. type="single" for mutually exclusive selection; type="multiple" for multi-select. Built on Radix ToggleGroup — manages keyboard navigation across items.',
  guidelines: [
    'Use type="single" for mutually exclusive options (view mode, sort order).',
    'Use type="multiple" for filter combinations (tags, skills).',
    'Keep labels short — 1–2 words per item.',
    'Provide aria-label on the ToggleGroup root describing the group.',
  ],
  variations: [
    { name: 'single', description: 'Only one item active at a time.' },
    { name: 'multiple', description: 'Multiple items can be active simultaneously.' },
  ],
  behavior: [
    'Arrow keys navigate between items.',
    'Each ToggleGroupItem inherits variant/size from parent ToggleGroup context.',
    'data-state="on" on active items.',
  ],
  knobs: [],
  stories: [
    {
      id: 'default',
      name: 'Single Select',
      render: () => (
        <ToggleGroup type="single" defaultValue="month" aria-label="View period">
          <ToggleGroupItem value="week">Week</ToggleGroupItem>
          <ToggleGroupItem value="month">Month</ToggleGroupItem>
          <ToggleGroupItem value="quarter">Quarter</ToggleGroupItem>
        </ToggleGroup>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--accent', usage: 'data-[state=on]:bg-accent (via Toggle)', category: 'color', description: 'Active item background' },
    ],
    outOfToken: [],
  },
  codeSnippet: {
    react: `import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

// Single select
<ToggleGroup type="single" value={view} onValueChange={setView}>
  <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
  <ToggleGroupItem value="list">List</ToggleGroupItem>
</ToggleGroup>

// Multi-select
<ToggleGroup type="multiple" value={filters} onValueChange={setFilters}>
  <ToggleGroupItem value="remote">Remote</ToggleGroupItem>
  <ToggleGroupItem value="fulltime">Full-time</ToggleGroupItem>
</ToggleGroup>`,
    html: `<div role="group" data-slot="toggle-group">
  <button role="button" data-state="on">Grid</button>
  <button role="button" data-state="off">List</button>
</div>`,
    css: `:root { --accent: oklch(0.97 0 0); }`,
  },
}

// ─── RadioGroup ───────────────────────────────────────────────────────────────

const radioGroupMeta: ComponentMeta = {
  id: 'ui-radio-group',
  name: 'RadioGroup',
  category: 'ui',
  filePath: 'components/ui/radio-group.tsx',
  description:
    'Accessible radio button group built on Radix RadioGroup. RadioGroupItem shows a filled circle when selected. Always wrap in a FieldSet with FieldLegend for proper semantics. Use for mutually exclusive options (availability status, role type, etc.).',
  guidelines: [
    'Always provide a visible group label via FieldLegend or aria-label on RadioGroup.',
    'Always pair each RadioGroupItem with a Label using the same htmlFor/id.',
    'Use when 2–6 options are present — more than 6 should use Select instead.',
    'Controlled: use value + onValueChange.',
  ],
  variations: [
    { name: 'default', description: 'Vertical list of radio + label pairs.' },
    { name: 'horizontal', description: 'className="flex-row" on RadioGroup.' },
  ],
  behavior: [
    'data-state="checked": bg-primary fill circle.',
    'Arrow keys navigate within group.',
    'Focus-visible: ring-ring/50 on RadioGroupItem.',
    'Disabled: opacity-50, pointer-events-none.',
  ],
  knobs: [],
  stories: [
    {
      id: 'default',
      name: 'Availability',
      render: () => (
        <RadioGroup defaultValue="available" className="gap-2">
          {[
            { value: 'available', label: 'Available now' },
            { value: 'open', label: 'Open to work' },
            { value: 'unavailable', label: 'Unavailable' },
          ].map(({ value, label }) => (
            <div key={value} className="flex items-center gap-2">
              <RadioGroupItem value={value} id={`rg-${value}`} />
              <Label htmlFor={`rg-${value}`}>{label}</Label>
            </div>
          ))}
        </RadioGroup>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--primary', usage: 'data-[state=checked]:text-primary (fill circle)', category: 'color', description: 'Selected state fill' },
      { token: '--border', usage: 'border-input', category: 'color', description: 'Unchecked border' },
      { token: '--ring', usage: 'focus-visible:ring-ring/50', category: 'color', description: 'Focus ring' },
    ],
    outOfToken: [
      { property: 'size-4 / size-2', category: 'spacing', note: 'Outer and inner circle sizes hardcoded', suggestion: 'Define componentSizes.radio token' },
    ],
  },
  codeSnippet: {
    react: `import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

<RadioGroup value={availability} onValueChange={setAvailability}>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="available" id="avail" />
    <Label htmlFor="avail">Available now</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="open" id="open" />
    <Label htmlFor="open">Open to work</Label>
  </div>
</RadioGroup>`,
    html: `<div role="radiogroup" data-slot="radio-group">
  <button role="radio" aria-checked="true" data-slot="radio-group-item"></button>
</div>`,
    css: `:root { --primary: oklch(0.205 0 0); --border: oklch(0.922 0 0); }`,
  },
}

// ─── Popover ──────────────────────────────────────────────────────────────────

const popoverMeta: ComponentMeta = {
  id: 'ui-popover',
  name: 'Popover',
  category: 'ui',
  filePath: 'components/ui/popover.tsx',
  description:
    'Floating non-modal panel built on Radix Popover. Use for inline editors, date pickers, filter panels, and contextual tools. Unlike Dialog, it does not block background interaction and can be dismissed by clicking outside.',
  guidelines: [
    'Use for inline contextual actions — not for alerts or confirmations.',
    'Keep content width within 320px (default w-72) unless the content requires more.',
    'Include a PopoverHeader with title when the popover purpose is not obvious.',
    'Popover is dismissible by clicking outside — do not put required decision content in it.',
  ],
  variations: [
    { name: 'default', description: 'Plain floating panel, no header.' },
    { name: 'with header', description: 'PopoverHeader with PopoverTitle and description.' },
  ],
  behavior: [
    'Renders in Portal — z-50 by default.',
    'Dismisses on outside click and Escape.',
    'Animates: zoom-in-95 on open, zoom-out-95 on close.',
    'sideOffset=4 from trigger.',
  ],
  knobs: [],
  stories: [
    {
      id: 'default',
      name: 'Filter Panel',
      render: () => (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">Filters</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>Filter results</PopoverTitle>
              <PopoverDescription>Narrow by role type and location.</PopoverDescription>
            </PopoverHeader>
            <div className="flex flex-col gap-2 pt-1">
              <div className="flex items-center gap-2">
                <Checkbox id="pop-remote" />
                <Label htmlFor="pop-remote">Remote only</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="pop-full" />
                <Label htmlFor="pop-full">Full-time only</Label>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--popover', usage: 'bg-popover', category: 'color', description: 'Panel background' },
      { token: '--popover-foreground', usage: 'text-popover-foreground', category: 'color', description: 'Panel text' },
      { token: '--foreground', usage: 'ring-foreground/10', category: 'color', description: 'Subtle border shadow' },
    ],
    outOfToken: [
      { property: 'shadow-md', category: 'shadow', note: 'Uses Tailwind shadow-md, not a token', suggestion: 'Define --shadow-popover token' },
    ],
  },
  codeSnippet: {
    react: `import {
  Popover, PopoverTrigger, PopoverContent,
  PopoverHeader, PopoverTitle, PopoverDescription
} from '@/components/ui/popover'

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Title</PopoverTitle>
    </PopoverHeader>
    {/* content */}
  </PopoverContent>
</Popover>`,
    html: `<div data-slot="popover-content" role="dialog">Content</div>`,
    css: `:root { --popover: oklch(1 0 0); --popover-foreground: oklch(0.145 0 0); }`,
  },
}

// ─── Sheet ────────────────────────────────────────────────────────────────────

const sheetMeta: ComponentMeta = {
  id: 'ui-sheet',
  name: 'Sheet',
  category: 'ui',
  filePath: 'components/ui/sheet.tsx',
  description:
    'Slide-in panel built on Radix Dialog. Slides from top, right, bottom, or left. Use for settings panels, filters, navigation drawers, and detail sidebars. Full-height by default when side="right" or "left".',
  guidelines: [
    'Use side="right" for detail panels and forms (the primary pattern).',
    'Use side="left" for navigation drawers.',
    'Include SheetHeader with SheetTitle for accessibility.',
    'Use SheetFooter for action buttons — primary right, cancel left.',
    'Avoid nesting dialogs inside Sheets — use a Popover or Collapsible instead.',
  ],
  variations: [
    { name: 'right', description: 'Slides from the right. Default for detail panels.' },
    { name: 'left', description: 'Slides from the left. For navigation drawers.' },
    { name: 'bottom', description: 'Slides from the bottom. For mobile-style action sheets.' },
  ],
  behavior: [
    'Overlay: bg-black/50, blocks background interaction.',
    'Slide animation: data-[side=right]:slide-in-from-right-full etc.',
    'Close button: top-right X icon.',
    'Escape and overlay click both close.',
  ],
  knobs: [
    { name: 'side', type: 'select', options: ['right', 'left', 'bottom', 'top'], defaultValue: 'right' },
  ],
  stories: [
    {
      id: 'default',
      name: 'Right Panel',
      render: () => (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm">Open Settings</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Profile Settings</SheetTitle>
              <SheetDescription>Manage your public profile and preferences.</SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label>Display Name</Label>
                  <Input placeholder="Alex Rivera" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Headline</Label>
                  <Textarea placeholder="Full-stack engineer..." rows={2} />
                </div>
              </div>
            </div>
            <SheetFooter>
              <Button size="sm">Save Changes</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--background', usage: 'bg-background', category: 'color', description: 'Sheet panel background' },
      { token: '--border', usage: 'border (edge line)', category: 'color', description: 'Sheet border on open edge' },
      { token: '--foreground', usage: 'text-foreground', category: 'color', description: 'Title text' },
    ],
    outOfToken: [
      { property: 'w-3/4 max-w-sm/lg', category: 'spacing', note: 'Width is hardcoded per side, not a token', suggestion: 'Define --sheet-width-sm/lg tokens' },
    ],
  },
  codeSnippet: {
    react: `import {
  Sheet, SheetTrigger, SheetContent, SheetHeader,
  SheetTitle, SheetDescription, SheetFooter
} from '@/components/ui/sheet'

<Sheet>
  <SheetTrigger asChild>
    <Button>Open Panel</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Settings</SheetTitle>
    </SheetHeader>
    {/* content */}
    <SheetFooter>
      <Button>Save</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>`,
    html: `<div role="dialog" data-slot="sheet-content" data-side="right">
  <div data-slot="sheet-header">
    <h2 data-slot="sheet-title">Settings</h2>
  </div>
</div>`,
    css: `:root { --background: oklch(1 0 0); --border: oklch(0.922 0 0); }`,
  },
}

// ─── Breadcrumb ───────────────────────────────────────────────────────────────

const breadcrumbMeta: ComponentMeta = {
  id: 'ui-breadcrumb',
  name: 'Breadcrumb',
  category: 'ui',
  filePath: 'components/ui/breadcrumb.tsx',
  description:
    'Navigation trail showing the current page location. Built with semantic <nav aria-label="breadcrumb">. Supports links, current page (BreadcrumbPage), separator, and ellipsis for collapsed paths.',
  guidelines: [
    'The last item should be BreadcrumbPage (not a link) — it indicates current location.',
    'Use BreadcrumbEllipsis to collapse deep paths — expand on interaction.',
    'Separators render automatically via BreadcrumbSeparator.',
    'Keep breadcrumb to 3–4 levels max in the UI.',
  ],
  variations: [
    { name: 'default', description: 'Full path with links and separator.' },
    { name: 'collapsed', description: 'BreadcrumbEllipsis hides middle items.' },
  ],
  behavior: [
    'BreadcrumbLink: text-muted-foreground, hover:text-foreground transition.',
    'BreadcrumbPage: text-foreground, aria-current="page".',
    'BreadcrumbSeparator: text-muted-foreground ChevronRight icon.',
  ],
  knobs: [],
  stories: [
    {
      id: 'default',
      name: 'Default',
      render: () => (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Profile</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Signal History</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--muted-foreground', usage: 'text-muted-foreground (links, separator)', category: 'color', description: 'Link and separator color' },
      { token: '--foreground', usage: 'hover:text-foreground, BreadcrumbPage', category: 'color', description: 'Active link hover and current page' },
    ],
    outOfToken: [],
  },
  codeSnippet: {
    react: `import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem,
  BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Current</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
    html: `<nav aria-label="breadcrumb" data-slot="breadcrumb">
  <ol data-slot="breadcrumb-list">
    <li data-slot="breadcrumb-item">
      <a data-slot="breadcrumb-link" href="/">Home</a>
    </li>
    <li role="presentation" data-slot="breadcrumb-separator">›</li>
    <li data-slot="breadcrumb-item">
      <span data-slot="breadcrumb-page" aria-current="page">Current</span>
    </li>
  </ol>
</nav>`,
    css: `:root { --muted-foreground: oklch(0.556 0 0); --foreground: oklch(0.145 0 0); }`,
  },
}

// ─── Pagination ───────────────────────────────────────────────────────────────

const paginationMeta: ComponentMeta = {
  id: 'ui-pagination',
  name: 'Pagination',
  category: 'ui',
  filePath: 'components/ui/pagination.tsx',
  description:
    'Page navigation control with Previous, Next, numbered pages, and ellipsis for large ranges. Built with semantic <nav aria-label="pagination">. Each link is an anchor — wrap with your router Link using asChild.',
  guidelines: [
    'Show current page with aria-current="page" on PaginationLink.',
    'Use PaginationEllipsis to indicate skipped page ranges.',
    'Always include PaginationPrevious and PaginationNext for full keyboard navigation.',
    'Use asChild on PaginationLink to render next/link for client-side routing.',
  ],
  variations: [
    { name: 'default', description: 'Prev, page numbers, ellipsis, Next.' },
  ],
  behavior: [
    'PaginationPrevious/Next: gap-1 with arrow icon.',
    'PaginationLink: size="icon" button style.',
    'PaginationEllipsis: MoreHorizontalIcon, aria-hidden.',
  ],
  knobs: [],
  stories: [
    {
      id: 'default',
      name: 'Default',
      render: () => (
        <Pagination>
          <PaginationContent>
            <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
            <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
            <PaginationItem><PaginationEllipsis /></PaginationItem>
            <PaginationItem><PaginationLink href="#">8</PaginationLink></PaginationItem>
            <PaginationItem><PaginationNext href="#" /></PaginationItem>
          </PaginationContent>
        </Pagination>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--muted-foreground', usage: 'text-muted-foreground (inactive links)', category: 'color', description: 'Non-active page text' },
      { token: '--foreground', usage: 'text-foreground (active, via button)', category: 'color', description: 'Current page text' },
      { token: '--muted', usage: 'hover:bg-muted', category: 'color', description: 'Link hover state' },
    ],
    outOfToken: [],
  },
  codeSnippet: {
    react: `import {
  Pagination, PaginationContent, PaginationItem,
  PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis
} from '@/components/ui/pagination'

<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationPrevious href="/page/1" /></PaginationItem>
    <PaginationItem><PaginationLink href="/page/1">1</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink href="/page/2" isActive>2</PaginationLink></PaginationItem>
    <PaginationItem><PaginationEllipsis /></PaginationItem>
    <PaginationItem><PaginationNext href="/page/3" /></PaginationItem>
  </PaginationContent>
</Pagination>`,
    html: `<nav aria-label="pagination" data-slot="pagination">
  <ul data-slot="pagination-content">
    <li><a data-slot="pagination-link" aria-current="page">2</a></li>
  </ul>
</nav>`,
    css: `:root { --muted: oklch(0.97 0 0); --muted-foreground: oklch(0.556 0 0); }`,
  },
}

// ─── ScrollArea ───────────────────────────────────────────────────────────────

const scrollAreaMeta: ComponentMeta = {
  id: 'ui-scroll-area',
  name: 'ScrollArea',
  category: 'ui',
  filePath: 'components/ui/scroll-area.tsx',
  description:
    'Custom-styled scrollable container built on Radix ScrollArea. Hides native scrollbar and shows a thin themed scrollbar on hover. Use when native scrollbars would break the visual design.',
  guidelines: [
    'Always set a fixed height on the ScrollArea container — it does not auto-size.',
    'Use orientation="horizontal" for horizontal scrolling lists.',
    'Do not use inside overflow:hidden containers — the scrollbar track will be clipped.',
    'Prefer native overflow-auto for non-design-critical contexts — ScrollArea adds DOM overhead.',
  ],
  variations: [
    { name: 'vertical', description: 'Default. Vertical scroll with right-side track.' },
    { name: 'horizontal', description: 'orientation="horizontal". Bottom track.' },
  ],
  behavior: [
    'Scrollbar appears on hover/interaction, hides when idle.',
    'ScrollBar uses bg-border/60 thumb.',
    'Track is bg-transparent.',
    'Full keyboard scroll support.',
  ],
  knobs: [],
  stories: [
    {
      id: 'default',
      name: 'Vertical List',
      render: () => (
        <ScrollArea className="h-48 w-64 border border-border">
          <div className="p-3 flex flex-col gap-2">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="text-xs px-2 py-1.5 rounded-none bg-muted/50">
                Item {i + 1}
              </div>
            ))}
          </div>
        </ScrollArea>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--border', usage: 'bg-border/60 (scrollbar thumb)', category: 'color', description: 'Scrollbar thumb color' },
    ],
    outOfToken: [
      { property: 'scrollbar width (2.5px)', category: 'spacing', note: 'Scrollbar thickness is hardcoded', suggestion: 'Define --scrollbar-width token' },
    ],
  },
  codeSnippet: {
    react: `import { ScrollArea } from '@/components/ui/scroll-area'

// Vertical (always set a height)
<ScrollArea className="h-64">
  {items.map((item) => <div key={item.id}>{item.name}</div>)}
</ScrollArea>

// Horizontal
<ScrollArea orientation="horizontal" className="w-full">
  <div className="flex gap-2">
    {cards.map((c) => <Card key={c.id} className="w-48 shrink-0" />)}
  </div>
</ScrollArea>`,
    html: `<div data-slot="scroll-area" style="overflow:hidden; position:relative;">
  <div data-slot="scroll-area-viewport"><!-- content --></div>
  <div data-slot="scroll-area-scrollbar" data-orientation="vertical"></div>
</div>`,
    css: `:root { --border: oklch(0.922 0 0); }`,
  },
}

// ─── Collapsible ──────────────────────────────────────────────────────────────

const collapsibleMeta: ComponentMeta = {
  id: 'ui-collapsible',
  name: 'Collapsible',
  category: 'ui',
  filePath: 'components/ui/collapsible.tsx',
  description:
    'Simple show/hide wrapper built on Radix Collapsible. Lower-level than Accordion — no visual chrome, no chevron animation built in. Use when you need a custom toggle UI or a single expandable section without the Accordion container.',
  guidelines: [
    'Use Accordion when you have multiple sections with the same visual pattern.',
    'Use Collapsible for one-off expand/collapse with a custom trigger.',
    'CollapsibleTrigger must be a button for accessibility — use asChild with Button.',
    'CollapsibleContent automatically handles open/closed animation.',
  ],
  variations: [
    { name: 'default', description: 'Plain Radix primitive — no built-in styles.' },
  ],
  behavior: [
    'data-state="open" / "closed" on root and content for CSS targeting.',
    'CollapsibleContent animates via tailwind data-closed:animate-out.',
    'open prop + onOpenChange for controlled use.',
  ],
  knobs: [],
  stories: [
    {
      id: 'default',
      name: 'Expandable Section',
      render: () => (
        <Collapsible className="w-72">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium">Advanced Filters</p>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">Show</Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="mt-2 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Checkbox id="col-remote" />
              <Label htmlFor="col-remote">Remote only</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="col-verified" />
              <Label htmlFor="col-verified">Verified companies only</Label>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [],
    outOfToken: [],
  },
  codeSnippet: {
    react: `import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'

const [open, setOpen] = useState(false)

<Collapsible open={open} onOpenChange={setOpen}>
  <CollapsibleTrigger asChild>
    <Button variant="ghost" size="sm">{open ? 'Hide' : 'Show'} details</Button>
  </CollapsibleTrigger>
  <CollapsibleContent>
    <p>Expanded content here.</p>
  </CollapsibleContent>
</Collapsible>`,
    html: `<div data-slot="collapsible" data-state="open">
  <button data-slot="collapsible-trigger" aria-expanded="true">Toggle</button>
  <div data-slot="collapsible-content">Content</div>
</div>`,
    css: `/* No tokens — style children directly */`,
  },
}

// ─── Empty ────────────────────────────────────────────────────────────────────

const emptyMeta: ComponentMeta = {
  id: 'ui-empty',
  name: 'Empty',
  category: 'ui',
  filePath: 'components/ui/empty.tsx',
  description:
    'Empty state container for zero-result and first-use contexts. Centered flex column with dashed border. Composed of EmptyHeader, EmptyMedia (icon or illustration), EmptyTitle, EmptyDescription, and EmptyContent (action buttons).',
  guidelines: [
    'Always include an EmptyTitle — one sentence saying what is missing.',
    'Include an EmptyContent with a primary action button where applicable.',
    'Use EmptyMedia variant="icon" for a standard muted icon indicator.',
    'Keep EmptyDescription to one sentence — explain why or what to do next.',
    'Use inside a min-h container so it fills the available space.',
  ],
  variations: [
    { name: 'default', description: 'Dashed border, centered content.' },
    { name: 'with icon', description: 'EmptyMedia variant="icon" for muted icon box.' },
  ],
  behavior: [
    'Dashed border-dashed border (default).',
    'text-balance on root for responsive centering.',
    'EmptyMedia icon variant: size-8 muted bg square.',
  ],
  knobs: [],
  stories: [
    {
      id: 'default',
      name: 'No Results',
      render: () => (
        <Empty className="min-h-48 max-w-sm">
          <EmptyHeader>
            <EmptyTitle>No opportunities found</EmptyTitle>
            <EmptyDescription>
              Try adjusting your filters or check back later.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button size="sm" variant="outline">Clear filters</Button>
          </EmptyContent>
        </Empty>
      ),
      defaultProps: {},
    },
    {
      id: 'with-icon',
      name: 'With Icon',
      render: () => (
        <Empty className="min-h-48 max-w-sm">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <span className="text-base">📭</span>
            </EmptyMedia>
            <EmptyTitle>No signals recorded yet</EmptyTitle>
            <EmptyDescription>
              Complete your first engagement to start building your signal history.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button size="sm">Get started</Button>
          </EmptyContent>
        </Empty>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--border', usage: 'border-dashed border', category: 'color', description: 'Dashed outer border' },
      { token: '--muted', usage: 'bg-muted (icon variant)', category: 'color', description: 'Icon media background' },
      { token: '--foreground', usage: 'text-foreground (icon variant)', category: 'color', description: 'Icon color' },
      { token: '--muted-foreground', usage: 'text-muted-foreground (description)', category: 'color', description: 'Description text' },
    ],
    outOfToken: [
      { property: 'p-6 gap-4', category: 'spacing', note: 'Internal padding hardcoded', suggestion: 'Map to --space-6 / --space-4 tokens' },
    ],
  },
  codeSnippet: {
    react: `import {
  Empty, EmptyHeader, EmptyMedia, EmptyTitle,
  EmptyDescription, EmptyContent
} from '@/components/ui/empty'

<Empty className="min-h-64">
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <InboxIcon />
    </EmptyMedia>
    <EmptyTitle>Nothing here yet</EmptyTitle>
    <EmptyDescription>Create your first item to get started.</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button size="sm">Create item</Button>
  </EmptyContent>
</Empty>`,
    html: `<div data-slot="empty">
  <div data-slot="empty-header">
    <div data-slot="empty-icon" data-variant="icon"><!-- icon --></div>
    <div data-slot="empty-title">Nothing here yet</div>
    <div data-slot="empty-description">Create an item to get started.</div>
  </div>
</div>`,
    css: `:root { --border: oklch(0.922 0 0); --muted: oklch(0.97 0 0); }`,
  },
}

// ─── Item ─────────────────────────────────────────────────────────────────────

const itemMeta: ComponentMeta = {
  id: 'ui-item',
  name: 'Item',
  category: 'ui',
  filePath: 'components/ui/item.tsx',
  description:
    'Flexible list row component with media, content, and actions slots. Three variants (default/outline/muted) and three sizes (default/sm/xs). Composes with ItemGroup for lists. Supports asChild for link/button rendering.',
  guidelines: [
    'Use ItemGroup to wrap multiple Items — handles gap and role="list".',
    'Use ItemMedia variant="icon" for icon columns, variant="image" for avatars.',
    'Use ItemActions for trailing action buttons (icon-only).',
    'Use asChild on Item to render as a link without losing styles.',
    'Use size="xs" inside DropdownMenuContent for menu-style rows.',
  ],
  variations: [
    { name: 'default', description: 'Transparent border. Plain row.' },
    { name: 'outline', description: 'border-border. Card-like row.' },
    { name: 'muted', description: 'bg-muted/50 fill. Recessed row.' },
  ],
  behavior: [
    'ItemGroup adjusts gap based on child data-size attribute.',
    'ItemMedia image variant: size-10 square, overflow-hidden.',
    'ItemDescription: line-clamp-2, text-muted-foreground.',
    'ItemTitle: line-clamp-1 with underline-offset-4.',
  ],
  knobs: [
    { name: 'variant', type: 'select', options: ['default', 'outline', 'muted'], defaultValue: 'default' },
    { name: 'size', type: 'select', options: ['default', 'sm', 'xs'], defaultValue: 'default' },
  ],
  stories: [
    {
      id: 'default',
      name: 'Profile List',
      render: () => (
        <ItemGroup className="w-72">
          {[
            { name: 'Alex Rivera', role: 'Engineer', score: 82 },
            { name: 'Sam Chen', role: 'Designer', score: 74 },
            { name: 'Jordan Kim', role: 'PM', score: 91 },
          ].map((person) => (
            <Item key={person.name} variant="outline">
              <ItemMedia variant="image">
                <div className="size-10 bg-muted flex items-center justify-center text-xs font-medium">
                  {person.name.split(' ').map(n => n[0]).join('')}
                </div>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{person.name}</ItemTitle>
                <ItemDescription>{person.role}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Badge variant="secondary">{person.score}</Badge>
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--border', usage: 'border (outline variant)', category: 'color', description: 'Outline variant border' },
      { token: '--muted', usage: 'bg-muted/50 (muted variant)', category: 'color', description: 'Muted variant background' },
      { token: '--muted-foreground', usage: 'text-muted-foreground (description)', category: 'color', description: 'Description text' },
      { token: '--ring', usage: 'focus-visible:border-ring', category: 'color', description: 'Focus border' },
    ],
    outOfToken: [
      { property: 'px-3 py-2.5', category: 'spacing', note: 'Default padding uses Tailwind scale', suggestion: 'Map to --item-px and --item-py tokens' },
    ],
  },
  codeSnippet: {
    react: `import { Item, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions, ItemGroup } from '@/components/ui/item'

<ItemGroup>
  <Item variant="outline">
    <ItemMedia variant="image">
      <img src={user.avatar} alt={user.name} />
    </ItemMedia>
    <ItemContent>
      <ItemTitle>{user.name}</ItemTitle>
      <ItemDescription>{user.role}</ItemDescription>
    </ItemContent>
    <ItemActions>
      <Button variant="ghost" size="icon"><MoreHorizontalIcon /></Button>
    </ItemActions>
  </Item>
</ItemGroup>`,
    html: `<div role="list" data-slot="item-group">
  <div data-slot="item" data-variant="outline">
    <div data-slot="item-media" data-variant="image"><!-- avatar --></div>
    <div data-slot="item-content">
      <div data-slot="item-title">Name</div>
      <p data-slot="item-description">Role</p>
    </div>
  </div>
</div>`,
    css: `:root { --border: oklch(0.922 0 0); --muted: oklch(0.97 0 0); }`,
  },
}

// ─── Field ────────────────────────────────────────────────────────────────────

const fieldMeta: ComponentMeta = {
  id: 'ui-field',
  name: 'Field',
  category: 'ui',
  filePath: 'components/ui/field.tsx',
  description:
    'Form field wrapper system with label, description, error, and grouping. Supports vertical, horizontal, and responsive orientations. Use FieldGroup for multiple related fields. Use FieldSet + FieldLegend for radio/checkbox groups.',
  guidelines: [
    'Use FieldLabel instead of bare Label for proper disabled-state inheritance.',
    'Use FieldError with errors prop for react-hook-form integration.',
    'Use orientation="horizontal" for settings-style label-left, control-right rows.',
    'Use orientation="responsive" for forms that stack on mobile, align on desktop.',
    'FieldGroup with @container handles responsive layout automatically.',
  ],
  variations: [
    { name: 'vertical', description: 'Default. Label above input.' },
    { name: 'horizontal', description: 'Label left, input right.' },
    { name: 'responsive', description: 'Stacks on mobile, horizontal on desktop (@md).' },
  ],
  behavior: [
    'data-[invalid=true] on Field: text-destructive propagates to FieldLabel.',
    'group-data-[disabled=true]/field:opacity-50 on FieldLabel.',
    'FieldError renders role="alert" for screen reader announcements.',
    'FieldGroup uses @container/field-group for responsive layout queries.',
  ],
  knobs: [
    { name: 'orientation', type: 'select', options: ['vertical', 'horizontal', 'responsive'], defaultValue: 'vertical' },
  ],
  stories: [
    {
      id: 'default',
      name: 'Form Fields',
      render: () => (
        <FieldGroup className="w-72">
          <Field orientation="vertical">
            <FieldLabel htmlFor="f-name">Display Name</FieldLabel>
            <Input id="f-name" placeholder="Alex Rivera" />
            <FieldDescription>Shown on your public profile.</FieldDescription>
          </Field>
          <Field orientation="vertical">
            <FieldLabel htmlFor="f-rate">Hourly Rate</FieldLabel>
            <Input id="f-rate" type="number" placeholder="90" />
            <FieldError>Rate must be between $30 and $500.</FieldError>
          </Field>
        </FieldGroup>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--destructive', usage: 'text-destructive (data-invalid, FieldError)', category: 'color', description: 'Error state text' },
      { token: '--muted-foreground', usage: 'text-muted-foreground (FieldDescription)', category: 'color', description: 'Helper text' },
    ],
    outOfToken: [
      { property: 'gap-2 / gap-5', category: 'spacing', note: 'Field and FieldGroup gap uses Tailwind defaults', suggestion: 'Define --field-gap and --field-group-gap tokens' },
    ],
  },
  codeSnippet: {
    react: `import { Field, FieldLabel, FieldDescription, FieldError, FieldGroup } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

// Basic vertical field
<Field>
  <FieldLabel htmlFor="email">Email</FieldLabel>
  <Input id="email" type="email" />
  <FieldDescription>We'll never share your email.</FieldDescription>
</Field>

// With react-hook-form errors
<Field data-invalid={!!errors.email}>
  <FieldLabel htmlFor="email">Email</FieldLabel>
  <Input id="email" {...register('email')} />
  <FieldError errors={[errors.email]} />
</Field>

// Horizontal orientation
<FieldGroup>
  <Field orientation="horizontal">
    <FieldLabel htmlFor="notify">Email Notifications</FieldLabel>
    <Switch id="notify" />
  </Field>
</FieldGroup>`,
    html: `<div role="group" data-slot="field" data-orientation="vertical">
  <label data-slot="field-label">Email</label>
  <input type="email" />
  <p data-slot="field-description">Helper text.</p>
</div>`,
    css: `:root { --destructive: oklch(0.577 0.245 27.325); --muted-foreground: oklch(0.556 0 0); }`,
  },
}

// ─── ButtonGroup ─────────────────────────────────────────────────────────────

const buttonGroupMeta: ComponentMeta = {
  id: 'ui-button-group',
  name: 'ButtonGroup',
  category: 'ui',
  filePath: 'components/ui/button-group.tsx',
  description:
    'Groups adjacent buttons or inputs into a single connected unit by removing inner borders and radius. Supports horizontal (default) and vertical orientation. ButtonGroupText adds a muted label addon. ButtonGroupSeparator inserts a visible divider.',
  guidelines: [
    'All children must be Button, Input, or Select — mixed types are supported.',
    'Use orientation="vertical" for stacked action groups.',
    'ButtonGroupText is for non-interactive labels (prefix/suffix indicators).',
    'Do not mix primary and ghost buttons in the same group — it creates ambiguity.',
  ],
  variations: [
    { name: 'horizontal', description: 'Default. Side-by-side with shared borders.' },
    { name: 'vertical', description: 'Stacked with shared top/bottom borders.' },
  ],
  behavior: [
    'Inner borders removed via CSS :not(:first-child) border-l-0 selectors.',
    'rounded-none on all children.',
    'ButtonGroupSeparator: thin bg-input line between items.',
  ],
  knobs: [],
  stories: [
    {
      id: 'default',
      name: 'Button Group',
      render: () => (
        <div className="flex flex-col gap-4">
          <ButtonGroup>
            <Button variant="outline" size="sm">Previous</Button>
            <ButtonGroupText>Page 2</ButtonGroupText>
            <Button variant="outline" size="sm">Next</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button size="sm">Save</Button>
            <ButtonGroupSeparator />
            <Button size="sm" variant="outline">Options</Button>
          </ButtonGroup>
        </div>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--muted', usage: 'bg-muted (ButtonGroupText)', category: 'color', description: 'Addon background' },
      { token: '--input', usage: 'bg-input (ButtonGroupSeparator)', category: 'color', description: 'Separator color' },
      { token: '--border', usage: 'border (ButtonGroupText)', category: 'color', description: 'Addon border' },
    ],
    outOfToken: [],
  },
  codeSnippet: {
    react: `import { ButtonGroup, ButtonGroupText, ButtonGroupSeparator } from '@/components/ui/button-group'
import { Button } from '@/components/ui/button'

// Labeled group
<ButtonGroup>
  <ButtonGroupText>https://</ButtonGroupText>
  <Input placeholder="yoursite.com" />
</ButtonGroup>

// Split button
<ButtonGroup>
  <Button>Publish</Button>
  <ButtonGroupSeparator />
  <Button size="icon" variant="default"><ChevronDownIcon /></Button>
</ButtonGroup>`,
    html: `<div role="group" data-slot="button-group" data-orientation="horizontal">
  <button data-slot="button">Save</button>
  <div data-slot="button-group-separator"></div>
  <button data-slot="button">Options</button>
</div>`,
    css: `:root { --muted: oklch(0.97 0 0); --input: oklch(0.922 0 0); }`,
  },
}

// ─── InputGroup ───────────────────────────────────────────────────────────────

const inputGroupMeta: ComponentMeta = {
  id: 'ui-input-group',
  name: 'InputGroup',
  category: 'ui',
  filePath: 'components/ui/input-group.tsx',
  description:
    'Wraps an input with prefix/suffix addons (text, icons, or buttons). InputGroupAddon is a non-interactive label. InputGroupButton holds a button. InputGroupInput/InputGroupTextarea are the actual field slots.',
  guidelines: [
    'Use for URL inputs, currency fields, search with icon, and unit suffixes.',
    'InputGroupAddon should be text or a static icon — not interactive.',
    'InputGroupButton holds a Button — use for search submit or copy.',
    'Avoid more than one addon on each side — it creates visual clutter.',
  ],
  variations: [
    { name: 'prefix addon', description: 'InputGroupAddon before the input.' },
    { name: 'suffix button', description: 'InputGroupButton after the input.' },
    { name: 'icon prefix', description: 'Icon inside InputGroupAddon.' },
  ],
  behavior: [
    'Joins children with shared border via CSS group selectors.',
    'Inherits rounded-none from design system.',
    'Focus state propagates from InputGroupInput to the wrapper via :has(:focus-visible).',
  ],
  knobs: [],
  stories: [
    {
      id: 'default',
      name: 'With Addons',
      render: () => (
        <div className="flex flex-col gap-3 w-64">
          <InputGroup>
            <InputGroupAddon>https://</InputGroupAddon>
            <InputGroupInput placeholder="yoursite.com" />
          </InputGroup>
          <InputGroup>
            <InputGroupInput placeholder="Amount" type="number" />
            <InputGroupAddon>USD/hr</InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupInput placeholder="Search..." />
            <InputGroupButton>
              <Button size="sm">Search</Button>
            </InputGroupButton>
          </InputGroup>
        </div>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--muted', usage: 'bg-muted (InputGroupAddon)', category: 'color', description: 'Addon background' },
      { token: '--input', usage: 'border-input', category: 'color', description: 'Group border' },
      { token: '--muted-foreground', usage: 'text-muted-foreground (addon text)', category: 'color', description: 'Addon label text' },
    ],
    outOfToken: [],
  },
  codeSnippet: {
    react: `import {
  InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput
} from '@/components/ui/input-group'

// Currency field
<InputGroup>
  <InputGroupAddon>$</InputGroupAddon>
  <InputGroupInput type="number" placeholder="90" />
  <InputGroupAddon>USD</InputGroupAddon>
</InputGroup>

// Search with button
<InputGroup>
  <InputGroupInput placeholder="Search opportunities..." />
  <InputGroupButton>
    <Button size="sm">Search</Button>
  </InputGroupButton>
</InputGroup>`,
    html: `<div data-slot="input-group">
  <div data-slot="input-group-addon">$</div>
  <input data-slot="input-group-input" />
</div>`,
    css: `:root { --muted: oklch(0.97 0 0); --input: oklch(0.922 0 0); }`,
  },
}

// ─── HoverCard ────────────────────────────────────────────────────────────────

const hoverCardMeta: ComponentMeta = {
  id: 'ui-hover-card',
  name: 'HoverCard',
  category: 'ui',
  filePath: 'components/ui/hover-card.tsx',
  description:
    'Floating card that appears on trigger hover, built on Radix HoverCard. Use for rich link previews, user profile previews, and contextual info that supplements without requiring a click. Not for interactive content — use Popover for that.',
  guidelines: [
    'Trigger should be a link or text element — use asChild.',
    'HoverCard is display-only — do not put buttons or interactive elements inside.',
    'Use for link previews, user cards, and skill definitions.',
    'Default open/close delay: 700ms/300ms — do not reduce below 300ms to avoid accidental triggers.',
  ],
  variations: [
    { name: 'default', description: 'Floating card on hover with w-80 default width.' },
  ],
  behavior: [
    'Opens on hover after 700ms delay, closes after 300ms.',
    'Renders in Portal for z-index safety.',
    'Animates zoom-in/fade-in on open, zoom-out/fade-out on close.',
  ],
  knobs: [],
  stories: [
    {
      id: 'default',
      name: 'User Preview',
      render: () => (
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link" size="sm" className="px-0">@alexrivera</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-72">
            <div className="flex gap-3">
              <div className="size-10 bg-muted flex items-center justify-center text-xs font-medium shrink-0">AR</div>
              <div className="flex flex-col gap-1">
                <p className="text-xs font-medium">Alex Rivera</p>
                <p className="text-xs text-muted-foreground">Senior Product Engineer · Signal 82</p>
                <p className="text-xs text-muted-foreground mt-1">Full-stack engineer focused on product UX. Based in Barcelona.</p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--popover', usage: 'bg-popover', category: 'color', description: 'Card background' },
      { token: '--popover-foreground', usage: 'text-popover-foreground', category: 'color', description: 'Card text' },
      { token: '--foreground', usage: 'ring-foreground/10', category: 'color', description: 'Subtle border' },
    ],
    outOfToken: [
      { property: 'openDelay=700 closeDelay=300', category: 'animation', note: 'Hover delays are hardcoded in HoverCardProvider', suggestion: 'Define --hover-card-open-delay / --close-delay tokens' },
    ],
  },
  codeSnippet: {
    react: `import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card'

<HoverCard>
  <HoverCardTrigger asChild>
    <a href="/profile/alex">@alexrivera</a>
  </HoverCardTrigger>
  <HoverCardContent>
    <div className="flex gap-3">
      <Avatar><AvatarFallback>AR</AvatarFallback></Avatar>
      <div>
        <p className="text-xs font-medium">Alex Rivera</p>
        <p className="text-xs text-muted-foreground">Signal 82 · Available</p>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`,
    html: `<div data-slot="hover-card-content" role="tooltip">
  <!-- preview content -->
</div>`,
    css: `:root { --popover: oklch(1 0 0); --popover-foreground: oklch(0.145 0 0); }`,
  },
}

// ─── NativeSelect ─────────────────────────────────────────────────────────────

const nativeSelectMeta: ComponentMeta = {
  id: 'ui-native-select',
  name: 'NativeSelect',
  category: 'ui',
  filePath: 'components/ui/native-select.tsx',
  description:
    'Styled native <select> element. Lighter than Radix Select — no portal, no custom list, better mobile performance. Use when the number of options is large (20+) or native OS behavior is preferred.',
  guidelines: [
    'Prefer NativeSelect for large option sets (countries, timezones, 20+ items).',
    'Prefer Radix Select for short lists (2–15 items) where custom styling is needed.',
    'Always provide a default disabled option as a placeholder: <option value="" disabled>Select...</option>.',
    'Pair with Label for accessibility.',
  ],
  variations: [
    { name: 'default', description: 'h-8 (32px). Standard size.' },
    { name: 'sm', description: 'h-7 (28px). For dense forms.' },
  ],
  behavior: [
    'ChevronDownIcon positioned absolutely — pointer-events-none.',
    'appearance-none removes native OS arrow.',
    'aria-invalid: border-destructive + ring-destructive/20.',
    'Dark mode: bg-input/30 resting.',
  ],
  knobs: [
    { name: 'size', type: 'select', options: ['default', 'sm'], defaultValue: 'default' },
  ],
  stories: [
    {
      id: 'default',
      name: 'Default',
      render: () => (
        <div className="flex flex-col gap-1.5 w-48">
          <Label>Country</Label>
          <NativeSelect defaultValue="">
            <NativeSelectOption value="" disabled>Select country...</NativeSelectOption>
            <NativeSelectOption value="us">United States</NativeSelectOption>
            <NativeSelectOption value="es">Spain</NativeSelectOption>
            <NativeSelectOption value="de">Germany</NativeSelectOption>
          </NativeSelect>
        </div>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--input', usage: 'border-input', category: 'color', description: 'Select border' },
      { token: '--ring', usage: 'focus-visible:ring-ring/50', category: 'color', description: 'Focus ring' },
      { token: '--destructive', usage: 'aria-invalid:border-destructive', category: 'color', description: 'Error state border' },
      { token: '--muted-foreground', usage: 'text-muted-foreground (icon)', category: 'color', description: 'Chevron icon color' },
    ],
    outOfToken: [
      { property: 'h-8 / h-7', category: 'spacing', note: 'Height hardcoded per size', suggestion: 'Define componentSizes.nativeSelect token' },
    ],
  },
  codeSnippet: {
    react: `import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Label } from '@/components/ui/label'

<div className="flex flex-col gap-1.5">
  <Label htmlFor="timezone">Timezone</Label>
  <NativeSelect id="timezone" defaultValue="">
    <NativeSelectOption value="" disabled>Select timezone...</NativeSelectOption>
    {timezones.map((tz) => (
      <NativeSelectOption key={tz.value} value={tz.value}>{tz.label}</NativeSelectOption>
    ))}
  </NativeSelect>
</div>`,
    html: `<div data-slot="native-select-wrapper">
  <select data-slot="native-select"></select>
  <svg data-slot="native-select-icon" aria-hidden="true"></svg>
</div>`,
    css: `:root { --input: oklch(0.922 0 0); --ring: oklch(0.708 0 0); }`,
  },
}

// ─── AspectRatio ──────────────────────────────────────────────────────────────

const aspectRatioMeta: ComponentMeta = {
  id: 'ui-aspect-ratio',
  name: 'AspectRatio',
  category: 'ui',
  filePath: 'components/ui/aspect-ratio.tsx',
  description:
    'Maintains a fixed width/height ratio for child content. Built on Radix AspectRatio. Use for images, videos, and embed containers that must not distort. ratio prop defaults to 1 (square) — pass 16/9, 4/3, etc.',
  guidelines: [
    'Always set a width on the AspectRatio container — the height is derived from the ratio.',
    'Use for images where both dimensions matter: thumbnails, avatars, video embeds.',
    'Do not use for text content — use a Card or a fixed-height container instead.',
    'object-cover on the child image prevents distortion inside the ratio box.',
  ],
  variations: [
    { name: '1:1', description: 'ratio={1} — square. For avatars and thumbnails.' },
    { name: '16:9', description: 'ratio={16/9} — widescreen. For video embeds.' },
    { name: '4:3', description: 'ratio={4/3} — classic. For cards and previews.' },
  ],
  behavior: [
    'Sets padding-bottom: (1/ratio)*100% on a position:relative wrapper.',
    'Child is absolutely positioned to fill the box.',
    'Overflow is hidden on the wrapper.',
  ],
  knobs: [],
  stories: [
    {
      id: 'default',
      name: 'Image Ratios',
      render: () => (
        <div className="flex gap-4 items-start">
          {[
            { ratio: 1, label: '1:1' },
            { ratio: 16 / 9, label: '16:9' },
            { ratio: 4 / 3, label: '4:3' },
          ].map(({ ratio, label }) => (
            <div key={label} className="flex flex-col gap-1 w-28">
              <AspectRatio ratio={ratio} className="bg-muted border border-border">
                <div className="size-full flex items-center justify-center text-[10px] text-muted-foreground">{label}</div>
              </AspectRatio>
              <p className="text-[10px] text-muted-foreground text-center">{label}</p>
            </div>
          ))}
        </div>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [],
    outOfToken: [],
  },
  codeSnippet: {
    react: `import { AspectRatio } from '@/components/ui/aspect-ratio'

// 16:9 video thumbnail
<AspectRatio ratio={16 / 9} className="w-full max-w-sm bg-muted">
  <img
    src={thumbnail}
    alt="Video thumbnail"
    className="size-full object-cover"
  />
</AspectRatio>

// Square profile photo
<AspectRatio ratio={1} className="w-20">
  <img src={avatar} alt={name} className="size-full object-cover" />
</AspectRatio>`,
    html: `<div data-slot="aspect-ratio" style="position:relative; padding-bottom:56.25%;">
  <img style="position:absolute; inset:0; width:100%; height:100%; object-fit:cover;" />
</div>`,
    css: `/* Ratio is set via padding-bottom on the wrapper — no CSS tokens */`,
  },
}

// ─── FormField ────────────────────────────────────────────────────────────────

const formFieldMeta: ComponentMeta = {
  id: 'ui-form-field',
  name: 'FormField',
  category: 'ui',
  filePath: 'components/ui/form-field.tsx',
  description:
    'Lightweight form field wrapper that combines Label, hint text, and error message in a single component. Simpler than the Field/FieldGroup system — use when react-hook-form integration is not needed and a basic label+input+error pattern suffices.',
  guidelines: [
    'Use FormField for simple forms without complex layout requirements.',
    'Use Field + FieldGroup for settings pages, horizontal layouts, or react-hook-form.',
    'The error prop shows in red and replaces the hint — only one shows at a time.',
    'Pass required={true} to show a red asterisk next to the label.',
    'Pass id matching the input id for proper label association.',
  ],
  variations: [
    { name: 'with label + hint', description: 'Label above, hint text below.' },
    { name: 'with error', description: 'Error replaces hint. Red text.' },
    { name: 'required', description: 'Asterisk after label text.' },
  ],
  behavior: [
    'React.cloneElement injects id and error prop into direct child.',
    'error prop replaces hint — mutually exclusive display.',
    'Label htmlFor links to id prop.',
  ],
  knobs: [],
  stories: [
    {
      id: 'default',
      name: 'Field States',
      render: () => (
        <div className="flex flex-col gap-4 w-64">
          <FormField label="Display Name" hint="Shown on your public profile." id="ff-name">
            <Input placeholder="Alex Rivera" />
          </FormField>
          <FormField label="Hourly Rate" required error="Rate must be at least $30." id="ff-rate">
            <Input type="number" placeholder="90" aria-invalid />
          </FormField>
          <FormField label="Bio" id="ff-bio">
            <Textarea placeholder="Tell us about yourself..." rows={2} />
          </FormField>
        </div>
      ),
      defaultProps: {},
    },
  ],
  tokenAudit: {
    inToken: [
      { token: '--destructive', usage: 'text-destructive (error, asterisk)', category: 'color', description: 'Error state and required indicator' },
      { token: '--muted-foreground', usage: 'text-muted-foreground (hint)', category: 'color', description: 'Hint text' },
    ],
    outOfToken: [
      { property: 'gap-1.5', category: 'spacing', note: 'Field gap hardcoded', suggestion: 'Map to --space-1.5 token' },
    ],
  },
  codeSnippet: {
    react: `import { FormField } from '@/components/ui/form-field'
import { Input } from '@/components/ui/input'

// With hint
<FormField label="Email" hint="Work email preferred." id="email">
  <Input type="email" placeholder="you@company.com" />
</FormField>

// With error
<FormField label="Rate" required error="Must be at least $30." id="rate">
  <Input type="number" aria-invalid />
</FormField>`,
    html: `<div class="flex flex-col gap-1.5">
  <label for="email">Email <span class="text-destructive">*</span></label>
  <input id="email" type="email" />
  <p class="text-xs text-destructive">Error message here.</p>
</div>`,
    css: `:root { --destructive: oklch(0.577 0.245 27.325); --muted-foreground: oklch(0.556 0 0); }`,
  },
}

// ─── Registry export ────────────────────────────────────────────────────────

export const registry: ComponentMeta[] = [
  // ── UI primitives ──────────────────────────────────────────────────────────
  buttonMeta,
  buttonGroupMeta,
  badgeMeta,
  cardMeta,
  inputMeta,
  inputGroupMeta,
  textareaMeta,
  labelMeta,
  formFieldMeta,
  fieldMeta,
  checkboxMeta,
  radioGroupMeta,
  switchMeta,
  sliderMeta,
  selectMeta,
  nativeSelectMeta,
  tabsMeta,
  toggleMeta,
  toggleGroupMeta,
  accordionMeta,
  collapsibleMeta,
  tableMeta,
  avatarMeta,
  kbdMeta,
  spinnerMeta,
  // ── Overlays & floating ────────────────────────────────────────────────────
  alertDialogMeta,
  dialogMeta,
  sheetMeta,
  popoverMeta,
  tooltipMeta,
  hoverCardMeta,
  dropdownMenuMeta,
  // ── Navigation ────────────────────────────────────────────────────────────
  breadcrumbMeta,
  paginationMeta,
  // ── Layout utilities ──────────────────────────────────────────────────────
  scrollAreaMeta,
  aspectRatioMeta,
  emptyMeta,
  itemMeta,
  // ── Progress & feedback ───────────────────────────────────────────────────
  progressMeta,
  alertMeta,
  separatorMeta,
  // ── Shared / Cosmico-specific ─────────────────────────────────────────────
  glowCardMeta,
  animatedNumberMeta,
  skeletonMeta,
  // ── Signal ────────────────────────────────────────────────────────────────
  signalPulseMeta,
  signalRadarMeta,
  signalTimelineMeta,
  signalDimensionCardMeta,
  // ── Profile ───────────────────────────────────────────────────────────────
  skillConstellationMeta,
  availabilityToggleMeta,
  profileHeaderMeta,
  // ── Trajectory & opportunities ────────────────────────────────────────────
  trajectoryPhaseCardMeta,
  opportunityCardMeta,
]
