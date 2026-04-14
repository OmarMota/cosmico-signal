import gsap from 'gsap'

/* =========================================
   Cosmico Signal — GSAP animation utilities
   All durations / easings aligned with
   figma_design_token.json animation tokens
   ========================================= */

// ── Entrance animations ──────────────────────────────────────────────────────

/** Fade up from y+20, opacity 0 → 1. Returns tween so caller can chain. */
export function fadeUpEnter(
  targets: gsap.TweenTarget,
  options: { delay?: number; duration?: number; stagger?: number } = {}
) {
  return gsap.fromTo(
    targets,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: options.duration ?? 0.5,
      delay: options.delay ?? 0,
      stagger: options.stagger ?? 0,
      ease: 'power2.out',
      clearProps: 'transform',
    }
  )
}

/** Scale from 0.92 + fade in. */
export function scaleIn(
  targets: gsap.TweenTarget,
  options: { delay?: number; duration?: number; stagger?: number } = {}
) {
  return gsap.fromTo(
    targets,
    { opacity: 0, scale: 0.92 },
    {
      opacity: 1,
      scale: 1,
      duration: options.duration ?? 0.4,
      delay: options.delay ?? 0,
      stagger: options.stagger ?? 0.08,
      ease: 'back.out(1.4)',
      clearProps: 'transform',
    }
  )
}

/** Simple fade in, no movement. */
export function fadeIn(
  targets: gsap.TweenTarget,
  options: { delay?: number; duration?: number } = {}
) {
  return gsap.fromTo(
    targets,
    { opacity: 0 },
    { opacity: 1, duration: options.duration ?? 0.3, delay: options.delay ?? 0, ease: 'power1.out' }
  )
}

// ── Stagger reveals ──────────────────────────────────────────────────────────

/** Stagger reveal children of a container. */
export function staggerReveal(
  children: gsap.TweenTarget,
  options: { delay?: number; stagger?: number } = {}
) {
  return gsap.fromTo(
    children,
    { opacity: 0, y: 16 },
    {
      opacity: 1,
      y: 0,
      duration: 0.4,
      delay: options.delay ?? 0,
      stagger: options.stagger ?? 0.07,
      ease: 'power2.out',
      clearProps: 'transform',
    }
  )
}

// ── Step / page transitions ──────────────────────────────────────────────────

/** Slide the outgoing step card to the left and fade out. */
export function slideStepOut(el: Element, onComplete?: () => void) {
  return gsap.to(el, {
    opacity: 0,
    x: -28,
    duration: 0.25,
    ease: 'power2.in',
    onComplete,
  })
}

/** Slide the incoming step card from right to center. */
export function slideStepIn(el: Element) {
  return gsap.fromTo(
    el,
    { opacity: 0, x: 28 },
    { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out', clearProps: 'transform' }
  )
}

/** Slide the outgoing step card to the right (back navigation). */
export function slideStepOutBack(el: Element, onComplete?: () => void) {
  return gsap.to(el, {
    opacity: 0,
    x: 28,
    duration: 0.25,
    ease: 'power2.in',
    onComplete,
  })
}

/** Slide the incoming step card from left (back navigation). */
export function slideStepInBack(el: Element) {
  return gsap.fromTo(
    el,
    { opacity: 0, x: -28 },
    { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out', clearProps: 'transform' }
  )
}

// ── Profile section swap ─────────────────────────────────────────────────────

/** Fade out current profile section content. */
export function sectionFadeOut(el: Element, onComplete?: () => void) {
  return gsap.to(el, {
    opacity: 0,
    y: 8,
    duration: 0.2,
    ease: 'power1.in',
    onComplete,
  })
}

/** Fade in new profile section content. */
export function sectionFadeIn(el: Element) {
  return gsap.fromTo(
    el,
    { opacity: 0, y: 12 },
    { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out', clearProps: 'transform' }
  )
}

// ── Sidebar nav ──────────────────────────────────────────────────────────────

/** Stagger reveal sidebar items on mount. */
export function sidebarItemReveal(items: gsap.TweenTarget) {
  return gsap.fromTo(
    items,
    { opacity: 0, x: -12 },
    { opacity: 1, x: 0, duration: 0.35, stagger: 0.06, ease: 'power2.out', clearProps: 'transform' }
  )
}

// ── Ambient / continuous ─────────────────────────────────────────────────────

/** Gentle floating animation for background orbs. Returns the tween for cleanup. */
export function orbFloat(el: Element, options: { duration?: number; delay?: number } = {}) {
  return gsap.to(el, {
    x: '+=30',
    y: '-=20',
    duration: options.duration ?? 8,
    delay: options.delay ?? 0,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  })
}

/** Pulsing box-shadow glow for CTA buttons / active indicators. */
export function glowPulse(el: Element) {
  return gsap.to(el, {
    boxShadow: '0 0 30px hsla(263, 70%, 62%, 0.40), 0 0 60px hsla(263, 70%, 62%, 0.15)',
    duration: 1.5,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  })
}

/** Height reveal for conditionally shown fields (VAT, city input, etc.). */
export function heightReveal(el: Element, targetHeight: number) {
  return gsap.fromTo(
    el,
    { height: 0, opacity: 0, overflow: 'hidden' },
    { height: targetHeight, opacity: 1, duration: 0.35, ease: 'power2.out' }
  )
}

export function heightHide(el: Element, onComplete?: () => void) {
  return gsap.to(el, {
    height: 0,
    opacity: 0,
    duration: 0.25,
    ease: 'power2.in',
    overflow: 'hidden',
    onComplete,
  })
}

// ── SVG draw ─────────────────────────────────────────────────────────────────

/** Animate SVG path draw (for success checkmark). Requires DrawSVGPlugin or dashoffset trick. */
export function drawCheckmark(path: SVGPathElement) {
  const length = path.getTotalLength()
  gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
  return gsap.to(path, {
    strokeDashoffset: 0,
    duration: 0.6,
    ease: 'power2.out',
    delay: 0.1,
  })
}

// ── Success sequence ─────────────────────────────────────────────────────────

/** Plays the onboarding completion success animation. */
export function playSuccessSequence(
  cardEl: Element,
  successEl: Element,
  onDone?: () => void
) {
  const tl = gsap.timeline({ onComplete: onDone })
  tl.to(cardEl, { scale: 1.03, duration: 0.15, ease: 'power2.out' })
    .to(cardEl, { scale: 0, opacity: 0, duration: 0.3, ease: 'back.in(1.8)' })
    .fromTo(successEl, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.6)' })
  return tl
}
