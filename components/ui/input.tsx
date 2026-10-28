import * as React from "react"
import { cn } from "cn"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-md border border-control-border bg-card px-3 type-body text-ink transition-colors placeholder:text-ink-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-800 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45 aria-invalid:border-danger-ink",
        className
      )}
      {...props}
    />
  )
}

export { Input }
