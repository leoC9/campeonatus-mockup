import * as React from "react"
import { cn } from "cn"

import { Eyebrow } from "./eyebrow"

// Seção de documento: eyebrow `maroon` + régua `line` à direita, título `h2`,
// parágrafo `ink-muted` de até 620px.
function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string
  title: React.ReactNode
  description?: React.ReactNode
  className?: string
}) {
  return (
    <header className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center gap-3">
        <Eyebrow className="shrink-0">{eyebrow}</Eyebrow>
        <span aria-hidden className="h-px flex-1 bg-line" />
      </div>
      <h2 className="m-0 type-h2 text-balance text-ink">{title}</h2>
      {description ? (
        <p className="m-0 max-w-[620px] text-pretty text-ink-muted">{description}</p>
      ) : null}
    </header>
  )
}

export { SectionHeading }
