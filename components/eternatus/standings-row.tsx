"use client"

import * as React from "react"
import { cn } from "cn"
import { ChevronDownIcon } from "lucide-react"
import { Collapsible as CollapsiblePrimitive } from "radix-ui"

import { Badge } from "@/components/ui/badge"

// Linha da tabela pública no celular: posição, jogador, OWR, pontos e V-E-D.
// Só o 1º lugar recebe borda `gold`. `credit` só no standings final.
// Com `oowr`, a linha expande (Radix Collapsible) para mostrar OWR e OOWR.
function StandingsRow({
  position,
  name,
  owr,
  oowr,
  points,
  record,
  credit,
  highlight = false,
  dropped = false,
  className,
}: {
  position: number
  /** Nickname do jogador. */
  name: string
  /** "61,1%". */
  owr: string
  /** "54,2%". Quando vem, OWR e OOWR ficam numa área expansível. */
  oowr?: string
  points: number
  /** "4–0–0". */
  record: string
  /** "R$ 42,00". Só no standings final; nunca na tabela ao vivo. */
  credit?: string
  highlight?: boolean
  /** Jogador que deu drop: Badge "Drop" e nome em `ink-muted`. */
  dropped?: boolean
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  const expandable = oowr != null

  const summary = (
    <div
      className={cn(
        "grid w-full items-center gap-3 px-4 py-3 text-left tabular-nums",
        expandable ? "grid-cols-[24px_1fr_auto_16px]" : "grid-cols-[24px_1fr_auto]"
      )}
    >
      <span
        className={cn(
          highlight ? "font-semibold text-gold-deep" : "text-ink-muted"
        )}
      >
        {position}
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="flex min-w-0 items-center gap-2">
          <span className={cn("truncate", dropped ? "text-ink-muted" : "text-ink")}>
            {name}
          </span>
          {dropped ? <Badge tone="neutral">Drop</Badge> : null}
        </span>
        {!expandable ? (
          <span className="type-caption font-normal text-ink-muted">
            OWR {owr}
          </span>
        ) : null}
      </span>
      <span className="flex flex-col items-end">
        <span className="font-semibold text-ink">{points} pts</span>
        <span className="type-caption font-normal text-ink-muted">{record}</span>
        {credit ? (
          <span className="type-caption font-normal text-ink">Crédito {credit}</span>
        ) : null}
      </span>
      {expandable ? (
        <ChevronDownIcon
          aria-hidden
          className={cn(
            "size-4 stroke-[1.5] text-ink-muted transition-transform motion-reduce:transition-none",
            open && "rotate-180"
          )}
        />
      ) : null}
    </div>
  )

  const frame = cn(
    "rounded-lg border bg-card",
    highlight ? "border-gold" : "border-line",
    className
  )

  if (!expandable) {
    return (
      <div data-slot="standings-row" className={frame}>
        {summary}
      </div>
    )
  }

  return (
    <CollapsiblePrimitive.Root
      data-slot="standings-row"
      open={open}
      onOpenChange={setOpen}
      className={frame}
    >
      <CollapsiblePrimitive.Trigger
        className="flex w-full cursor-pointer rounded-lg bg-transparent p-0 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-800"
        aria-label={`${name}: ver desempates`}
      >
        {summary}
      </CollapsiblePrimitive.Trigger>
      <CollapsiblePrimitive.Content className="border-t border-line px-4 py-3 tabular-nums">
        <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 type-small">
          <dt className="text-ink-muted">OWR</dt>
          <dd className="m-0 text-ink">{owr}</dd>
          <dt className="text-ink-muted">OOWR</dt>
          <dd className="m-0 text-ink">{oowr}</dd>
        </dl>
      </CollapsiblePrimitive.Content>
    </CollapsiblePrimitive.Root>
  )
}

export { StandingsRow }
