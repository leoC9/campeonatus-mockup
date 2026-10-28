"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Toggle as TogglePrimitive } from "radix-ui"

// Opção selecionável: selecionado em `info-soft` com texto `info-ink`.
const toggleVariants = cva(
  "inline-flex h-9 cursor-pointer items-center justify-center gap-1 px-3 text-[14px] whitespace-nowrap text-ink transition-colors outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-navy-800 disabled:pointer-events-none disabled:opacity-45 data-[state=on]:bg-info-soft data-[state=on]:font-medium data-[state=on]:text-info-ink [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-transparent hover:bg-neutral-soft",
        outline:
          "rounded-md border border-control-border bg-card hover:bg-neutral-soft",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Toggle({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
