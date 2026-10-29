import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { cn } from "cn"

import { Badge, badgeVariants } from "@/components/ui/badge"

import { Eyebrow } from "./eyebrow"

// Cabeçalho de tela do backoffice: eyebrow, título h1, status em Badge,
// metadados separados por ponto médio e as ações da tela à direita.
function PageHeader({
  eyebrow,
  title,
  status,
  statusTone = "info",
  meta,
  children,
  className,
}: {
  /** "Campeonatos · Liguinha". */
  eyebrow?: string
  title: React.ReactNode
  /** "Rodada 3 de 4". */
  status?: string
  statusTone?: VariantProps<typeof badgeVariants>["tone"]
  /** ["Standard", "Suíço 4 · Bo3", "18 jogadores"] — vira "a · b · c". */
  meta?: string[]
  /** Ações da tela, em `Button`. */
  children?: React.ReactNode
  className?: string
}) {
  return (
    <header
      data-slot="page-header"
      className={cn(
        "flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-6",
        className
      )}
    >
      <div className="flex min-w-0 flex-col gap-2">
        {eyebrow ? <Eyebrow tone="muted">{eyebrow}</Eyebrow> : null}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h1 className="m-0 type-h1 text-balance text-ink">{title}</h1>
          {status ? <Badge tone={statusTone}>{status}</Badge> : null}
        </div>
        {meta?.length ? (
          <p className="m-0 type-small text-ink-muted tabular-nums">
            {meta.map((item, i) => (
              <React.Fragment key={`${i}-${item}`}>
                {i > 0 ? <span aria-hidden> · </span> : null}
                <span>{item}</span>
              </React.Fragment>
            ))}
          </p>
        ) : null}
      </div>
      {children ? (
        <div className="flex shrink-0 flex-wrap gap-3 md:justify-end">
          {children}
        </div>
      ) : null}
    </header>
  )
}

export { PageHeader }
