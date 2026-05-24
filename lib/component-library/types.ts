import type { ReactNode } from 'react'

export type TokenCategory =
  | 'color'
  | 'spacing'
  | 'radius'
  | 'shadow'
  | 'typography'
  | 'animation'
  | 'z-index'

export interface InToken {
  token: string
  usage: string
  category: TokenCategory
  description?: string
}

export interface OutOfToken {
  property: string
  category: TokenCategory
  note: string
  suggestion?: string
}

export type Knob =
  | { name: string; type: 'select'; options: string[]; defaultValue: string; label?: string }
  | { name: string; type: 'boolean'; defaultValue: boolean; label?: string }
  | { name: string; type: 'text'; defaultValue: string; label?: string }

export interface ComponentVariation {
  name: string
  description: string
}

export interface ComponentStory {
  id: string
  name: string
  description?: string
  render: (props: Record<string, unknown>) => ReactNode
  defaultProps: Record<string, unknown>
}

export interface ComponentMeta {
  id: string
  name: string
  category: 'ui' | 'shared' | 'signal' | 'profile' | 'trajectory' | 'opportunities' | 'onboarding' | 'loading'
  filePath: string
  description: string
  guidelines: string[]
  variations: ComponentVariation[]
  behavior: string[]
  knobs: Knob[]
  stories: ComponentStory[]
  tokenAudit: {
    inToken: InToken[]
    outOfToken: OutOfToken[]
  }
  codeSnippet: {
    react: string
    html: string
    css: string
  }
}
