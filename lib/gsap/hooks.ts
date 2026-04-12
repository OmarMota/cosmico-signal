'use client'
import { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import {
  fadeUpEnter,
  staggerReveal,
  sidebarItemReveal,
  sectionFadeIn,
  orbFloat,
} from './animations'

/* Register useGSAP plugin once */
if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP)
}

/** Runs fadeUpEnter on the container's direct children on mount. */
export function usePageEnter(
  containerRef: React.RefObject<Element | null>,
  options: { stagger?: number; delay?: number; selector?: string } = {}
) {
  useGSAP(
    () => {
      if (!containerRef.current) return
      const targets = options.selector
        ? containerRef.current.querySelectorAll(options.selector)
        : Array.from(containerRef.current.children)
      if (targets.length) staggerReveal(targets, { stagger: options.stagger, delay: options.delay })
    },
    { scope: containerRef, dependencies: [] }
  )
}

/** Plays sectionFadeIn every time sectionKey changes. */
export function useSectionEnter(
  ref: React.RefObject<Element | null>,
  sectionKey: string
) {
  useGSAP(
    () => {
      if (ref.current) sectionFadeIn(ref.current)
    },
    { scope: ref, dependencies: [sectionKey] }
  )
}

/** Stagger-reveals sidebar nav items on mount. */
export function useSidebarReveal(ref: React.RefObject<Element | null>) {
  useGSAP(
    () => {
      if (!ref.current) return
      const items = ref.current.querySelectorAll('[data-sidebar-item]')
      if (items.length) sidebarItemReveal(items)
    },
    { scope: ref, dependencies: [] }
  )
}

/** Floats an orb element continuously. Cleans up on unmount. */
export function useOrbFloat(
  ref: React.RefObject<Element | null>,
  options: { duration?: number; delay?: number } = {}
) {
  useGSAP(
    () => {
      if (ref.current) orbFloat(ref.current, options)
    },
    { scope: ref, dependencies: [] }
  )
}
