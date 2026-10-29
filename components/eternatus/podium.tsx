import { cn } from "cn"
import { MedalIcon, TrophyIcon } from "lucide-react"

// Celebração do top 3 no standings: a linha inteira no tom soft do lugar e
// a medalha um degrau mais escura (deep a 18% por cima do soft), texto deep.
// Troféu no 1º e medalha no 2º e 3º. Do 4º em diante, só o número.
const PODIUM = {
  1: { chip: "bg-gold-deep/18 text-gold-deep", row: "bg-gold-soft", rail: "border-l-gold", label: "1º lugar" },
  2: { chip: "bg-silver-deep/18 text-silver-deep", row: "bg-silver-soft", rail: "border-l-silver-deep", label: "2º lugar" },
  3: { chip: "bg-bronze-deep/18 text-bronze-deep", row: "bg-bronze-soft", rail: "border-l-bronze-deep", label: "3º lugar" },
} as const

type PodiumPlace = keyof typeof PODIUM

function podium(position: number) {
  return position === 1 || position === 2 || position === 3
    ? PODIUM[position as PodiumPlace]
    : null
}

// Chip de posição: medalha para 1–3, número em `ink-muted` para o resto.
function PositionChip({ position, className }: { position: number; className?: string }) {
  const place = podium(position)
  if (!place) {
    return (
      <span className={cn("inline-flex w-7 justify-center tabular-nums text-ink-muted", className)}>
        {position}
      </span>
    )
  }
  const Icon = position === 1 ? TrophyIcon : MedalIcon
  return (
    <span
      role="img"
      aria-label={place.label}
      className={cn(
        "inline-flex h-7 min-w-7 items-center justify-center gap-1 rounded-full px-1.5 font-semibold tabular-nums",
        place.chip,
        className
      )}
    >
      <Icon aria-hidden className="size-3.5 stroke-[1.75]" />
      {position}
    </span>
  )
}

export { podium, PositionChip }
