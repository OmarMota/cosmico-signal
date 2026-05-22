/**
 * Cosmico Signal — Design Tokens
 *
 * Single source of truth for all design decisions.
 * CSS variables are defined in globals.css and mapped here as TS constants.
 * Use these constants in CVA variants and component styles.
 */

// ─── Color Tokens ──────────────────────────────────────────────────────────

export const colors = {
  // Brand
  signal:          'hsl(var(--signal))',
  signalLight:     'hsl(var(--signal-light))',
  signalMuted:     'var(--signal-muted)',
  signalBorder:    'var(--signal-border)',
  signalGlow:      'var(--signal-glow)',
  trajectory:      'hsl(var(--trajectory))',
  trajectoryMuted: 'var(--trajectory-muted)',
  intent:          'hsl(var(--intent))',
  intentMuted:     'var(--intent-muted)',

  // Semantic
  background:           'hsl(var(--background))',
  foreground:           'hsl(var(--foreground))',
  card:                 'hsl(var(--card))',
  cardForeground:       'hsl(var(--card-foreground))',
  popover:              'hsl(var(--popover))',
  popoverForeground:    'hsl(var(--popover-foreground))',
  primary:              'hsl(var(--primary))',
  primaryForeground:    'hsl(var(--primary-foreground))',
  secondary:            'hsl(var(--secondary))',
  secondaryForeground:  'hsl(var(--secondary-foreground))',
  muted:                'hsl(var(--muted))',
  mutedForeground:      'hsl(var(--muted-foreground))',
  accent:               'hsl(var(--accent))',
  accentForeground:     'hsl(var(--accent-foreground))',
  destructive:          'hsl(var(--destructive))',
  destructiveForeground:'hsl(var(--destructive-foreground))',
  border:               'hsl(var(--border))',
  input:                'hsl(var(--input))',
  ring:                 'hsl(var(--ring))',

  // Status
  available:   'hsl(var(--available))',
  openToWork:  'hsl(var(--open-to-work))',
  unavailable: 'hsl(var(--unavailable))',
} as const

// ─── Typography ────────────────────────────────────────────────────────────

export const typography = {
  fontSans: 'var(--font-geist-sans)',
  fontMono: 'var(--font-geist-mono)',

  scale: {
    xs:   'var(--text-xs)',
    sm:   'var(--text-sm)',
    base: 'var(--text-base)',
    lg:   'var(--text-lg)',
    xl:   'var(--text-xl)',
    '2xl':'var(--text-2xl)',
    '3xl':'var(--text-3xl)',
    '4xl':'var(--text-4xl)',
  },

  weight: {
    normal:   'var(--weight-normal)',
    medium:   'var(--weight-medium)',
    semibold: 'var(--weight-semibold)',
    bold:     'var(--weight-bold)',
  },

  leading: {
    none:    'var(--leading-none)',
    tight:   'var(--leading-tight)',
    snug:    'var(--leading-snug)',
    normal:  'var(--leading-normal)',
    relaxed: 'var(--leading-relaxed)',
  },

  tracking: {
    tight:   'var(--tracking-tight)',
    normal:  'var(--tracking-normal)',
    wide:    'var(--tracking-wide)',
    wider:   'var(--tracking-wider)',
    widest:  'var(--tracking-widest)',
  },
} as const

// ─── Spacing ───────────────────────────────────────────────────────────────

export const spacing = {
  0:  'var(--space-0)',
  1:  'var(--space-1)',
  2:  'var(--space-2)',
  3:  'var(--space-3)',
  4:  'var(--space-4)',
  5:  'var(--space-5)',
  6:  'var(--space-6)',
  8:  'var(--space-8)',
  10: 'var(--space-10)',
  12: 'var(--space-12)',
  16: 'var(--space-16)',
  20: 'var(--space-20)',
  24: 'var(--space-24)',
} as const

// ─── Border Radius ─────────────────────────────────────────────────────────

export const radius = {
  sm:   'var(--radius-sm)',
  md:   'var(--radius-md)',
  lg:   'var(--radius-lg)',
  xl:   'var(--radius-xl)',
  '2xl':'var(--radius-2xl)',
  full: 'var(--radius-full)',
} as const

// ─── Shadows ───────────────────────────────────────────────────────────────

export const shadows = {
  sm:       'var(--shadow-sm)',
  md:       'var(--shadow-md)',
  lg:       'var(--shadow-lg)',
  xl:       'var(--shadow-xl)',
  signal:   'var(--shadow-signal)',
  signalLg: 'var(--shadow-signal-lg)',
  glow:     'var(--shadow-glow)',
} as const

// ─── Animation ─────────────────────────────────────────────────────────────

export const animation = {
  duration: {
    fast:   'var(--duration-fast)',
    normal: 'var(--duration-normal)',
    slow:   'var(--duration-slow)',
    enter:  'var(--duration-enter)',
    exit:   'var(--duration-exit)',
  },
  easing: {
    default: 'var(--ease-default)',
    in:      'var(--ease-in)',
    out:     'var(--ease-out)',
    spring:  'var(--ease-spring)',
  },
} as const

// ─── Z-Index ───────────────────────────────────────────────────────────────

export const zIndex = {
  base:     'var(--z-base)',
  raised:   'var(--z-raised)',
  dropdown: 'var(--z-dropdown)',
  sticky:   'var(--z-sticky)',
  overlay:  'var(--z-overlay)',
  modal:    'var(--z-modal)',
  toast:    'var(--z-toast)',
  tooltip:  'var(--z-tooltip)',
  loading:  'var(--z-loading)',
} as const

// ─── Breakpoints ───────────────────────────────────────────────────────────

export const breakpoints = {
  sm:  '640px',
  md:  '768px',
  lg:  '1024px',
  xl:  '1280px',
  '2xl': '1536px',
} as const

// ─── Component Size Tokens ─────────────────────────────────────────────────

export const componentSizes = {
  button: {
    sm:  { height: '2rem',  px: '0.75rem', text: typography.scale.xs },
    md:  { height: '2.5rem',px: '1rem',    text: typography.scale.sm },
    lg:  { height: '3rem',  px: '1.5rem',  text: typography.scale.base },
    xl:  { height: '3.5rem',px: '2rem',    text: typography.scale.lg },
    icon:{ height: '2.5rem',width: '2.5rem' },
  },
  input: {
    sm:  { height: '2rem',  px: '0.625rem', text: typography.scale.xs },
    md:  { height: '2.5rem',px: '0.75rem',  text: typography.scale.sm },
    lg:  { height: '3rem',  px: '1rem',     text: typography.scale.base },
  },
} as const

// ─── Signal Score Thresholds ───────────────────────────────────────────────

export const signalThresholds = {
  low:    { min: 0,  max: 39,  label: 'Emerging',    color: 'text-amber-400' },
  mid:    { min: 40, max: 69,  label: 'Developing',  color: 'text-violet-400' },
  high:   { min: 70, max: 89,  label: 'Strong',      color: 'text-violet-300' },
  peak:   { min: 90, max: 100, label: 'Elite',       color: 'text-white' },
} as const
