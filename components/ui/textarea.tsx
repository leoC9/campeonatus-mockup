import * as React from "react"
import { cn } from "cn"

// Texto longo (observações do evento, regras da liga): mesmo desenho do Input,
// altura mínima de 96px e redimensionável só na vertical.
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "min-h-24 w-full min-w-0 resize-y rounded-md border border-control-border bg-card px-3 py-2.5 type-body text-ink transition-colors placeholder:text-ink-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-800 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45 aria-invalid:border-danger-ink",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
