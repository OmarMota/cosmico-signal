import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class' as const,
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ─── Colors ──────────────────────────────────────────────────────────
      colors: {
        // Semantic
        background:  'var(--background)',
        foreground:  'var(--foreground)',
        border:      'var(--border)',
        input:       'var(--input)',
        ring:        'var(--ring)',

        card: {
          DEFAULT:    'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT:    'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        primary: {
          DEFAULT:    'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT:    'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT:    'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT:    'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT:    'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },

        // Brand
        signal: {
          DEFAULT: 'var(--signal)',
          light:   'var(--signal-light)',
          muted:   'var(--signal-muted)',
          border:  'var(--signal-border)',
          glow:    'var(--signal-glow)',
        },
        trajectory: {
          DEFAULT: 'var(--trajectory)',
          muted:   'var(--trajectory-muted)',
        },
        intent: {
          DEFAULT: 'var(--intent)',
          muted:   'var(--intent-muted)',
        },

        // Sidebar
        sidebar: {
          DEFAULT:    'var(--sidebar)',
          foreground: 'var(--sidebar-foreground)',
          primary: {
            DEFAULT:    'var(--sidebar-primary)',
            foreground: 'var(--sidebar-primary-foreground)',
          },
          accent: {
            DEFAULT:    'var(--sidebar-accent)',
            foreground: 'var(--sidebar-accent-foreground)',
          },
          border: 'var(--sidebar-border)',
          ring:   'var(--sidebar-ring)',
        },

        // Status
        available:   'var(--available)',
        'open-to-work': 'var(--open-to-work)',
        unavailable: 'var(--unavailable)',

        // Chart
        chart: {
          1: 'var(--chart-1)',
          2: 'var(--chart-2)',
          3: 'var(--chart-3)',
          4: 'var(--chart-4)',
          5: 'var(--chart-5)',
        },
      },

      // ─── Border Radius ────────────────────────────────────────────────────
      borderRadius: {
        sm:   'var(--radius-sm)',
        md:   'var(--radius-md)',
        lg:   'var(--radius-lg)',
        xl:   'var(--radius-xl)',
        '2xl':'var(--radius-2xl)',
        '3xl':'var(--radius-3xl)',
        '4xl':'var(--radius-4xl)',
        full: 'var(--radius-full)',
      },

      // ─── Box Shadow ───────────────────────────────────────────────────────
      boxShadow: {
        sm:         'var(--shadow-sm)',
        md:         'var(--shadow-md)',
        lg:         'var(--shadow-lg)',
        xl:         'var(--shadow-xl)',
        signal:     'var(--shadow-signal)',
        'signal-lg':'var(--shadow-signal-lg)',
        glow:       'var(--shadow-glow)',
      },

      // ─── Fonts ────────────────────────────────────────────────────────────
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },

      // ─── Font Size ────────────────────────────────────────────────────────
      fontSize: {
        xs:   ['var(--text-xs)',   { lineHeight: 'var(--leading-normal)' }],
        sm:   ['var(--text-sm)',   { lineHeight: 'var(--leading-normal)' }],
        base: ['var(--text-base)', { lineHeight: 'var(--leading-normal)' }],
        lg:   ['var(--text-lg)',   { lineHeight: 'var(--leading-snug)' }],
        xl:   ['var(--text-xl)',   { lineHeight: 'var(--leading-snug)' }],
        '2xl':['var(--text-2xl)', { lineHeight: 'var(--leading-tight)' }],
        '3xl':['var(--text-3xl)', { lineHeight: 'var(--leading-tight)' }],
        '4xl':['var(--text-4xl)', { lineHeight: 'var(--leading-none)' }],
      },

      // ─── Transitions ──────────────────────────────────────────────────────
      transitionDuration: {
        fast:   'var(--duration-fast)',
        normal: 'var(--duration-normal)',
        slow:   'var(--duration-slow)',
        enter:  'var(--duration-enter)',
        exit:   'var(--duration-exit)',
      },
      transitionTimingFunction: {
        default: 'var(--ease-default)',
        in:      'var(--ease-in)',
        out:     'var(--ease-out)',
        spring:  'var(--ease-spring)',
      },

      // ─── Keyframes & Animations ───────────────────────────────────────────
      keyframes: {
        'pulse-ring': {
          '0%':   { transform: 'scale(0.95)', opacity: '0.8' },
          '70%':  { transform: 'scale(1.1)',  opacity: '0' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: 'var(--shadow-signal)' },
          '50%':      { boxShadow: 'var(--shadow-signal-lg)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-right': {
          '0%':   { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)',    opacity: '1' },
        },
      },
      animation: {
        'pulse-ring':     'pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite',
        'glow-pulse':     'glow-pulse 3s ease-in-out infinite',
        shimmer:          'shimmer 2s linear infinite',
        'fade-up':        'fade-up 0.4s ease-out forwards',
        'fade-in':        'fade-in 0.3s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.35s ease-out forwards',
      },
    },
  },
  plugins: [],
}

export default config
