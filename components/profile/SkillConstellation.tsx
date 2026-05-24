'use client'
import { motion } from 'framer-motion'
import type { Skill } from '@/lib/types/profile.types'
import { cn } from '@/lib/utils/cn'

interface SkillConstellationProps {
  skills: Skill[]
}

const PROFICIENCY_SIZE = ['text-xs', 'text-xs', 'text-sm', 'text-sm', 'text-base']
const PROFICIENCY_OPACITY = ['opacity-40', 'opacity-55', 'opacity-70', 'opacity-85', 'opacity-100']

export function SkillConstellation({ skills }: SkillConstellationProps) {
  const sorted = [...skills].sort((a, b) => {
    if (a.is_primary !== b.is_primary) return a.is_primary ? -1 : 1
    return (b.proficiency ?? 3) - (a.proficiency ?? 3)
  })

  return (
    <div className="flex flex-wrap gap-2">
      {sorted.map((skill, i) => {
        const profIdx = Math.min((skill.proficiency ?? 3) - 1, 4)
        return (
          <motion.div
            key={skill.id}
            className={cn(
              'rounded-full px-3 py-1 border transition-all cursor-default',
              PROFICIENCY_SIZE[profIdx],
              PROFICIENCY_OPACITY[profIdx],
              skill.is_primary
                ? 'border-border bg-muted/10 text-foreground'
                : 'border-border/50 bg-muted/30 text-muted-foreground hover:border-border'
            )}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03, duration: 0.25 }}
            title={`Proficiency: ${skill.proficiency}/5`}
          >
            {skill.name}
            {skill.is_primary && (
              <span className="ml-1 text-muted-foreground">·</span>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
