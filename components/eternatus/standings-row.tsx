import { cn } from "cn"

// Linha da tabela pública no celular: posição, jogador, OWR, pontos e V-E-D.
// Só o 1º lugar recebe borda `gold`. Nenhum valor em reais.
function StandingsRow({
  position,
  name,
  owr,
  points,
  record,
  highlight = false,
  className,
}: {
  position: number
  /** Nickname do jogador. */
  name: string
  /** "61,1%". */
  owr: string
  points: number
  /** "4–0–0". */
  record: string
  highlight?: boolean
  className?: string
}) {
  return (
    <div
      data-slot="standings-row"
      className={cn(
        "grid grid-cols-[24px_1fr_auto] items-center gap-3 rounded-lg border bg-card px-4 py-3 tabular-nums",
        highlight ? "border-gold" : "border-line",
        className
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
        <span className="truncate text-ink">{name}</span>
        <span className="type-caption font-normal text-ink-muted">
          OWR {owr}
        </span>
      </span>
      <span className="flex flex-col items-end">
        <span className="font-semibold text-ink">{points} pts</span>
        <span className="type-caption font-normal text-ink-muted">
          {record}
        </span>
      </span>
    </div>
  )
}

export { StandingsRow }
