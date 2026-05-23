import * as React from 'react'
import { cn } from '@/lib/utils/cn'
import { Label } from './label'

interface FormFieldProps {
  label?: string
  error?: string
  hint?: string
  required?: boolean
  className?: string
  children: React.ReactNode
  id?: string
}

export function FormField({ label, error, hint, required, className, children, id }: FormFieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <Label htmlFor={id}>
          {label}
          {required && <span className="text-destructive ml-0.5">*</span>}
        </Label>
      )}
      {React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement<{ id?: string; error?: boolean }>, {
            id,
            error: !!error,
          })
        : children}
      {hint && !error && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  )
}
