import { cn } from "cn"

import { Progress } from "@/components/ui/progress"

import { Eyebrow } from "./eyebrow"

// Cartão de progresso da rodada no backoffice. Ao lado, um cartão irmão lista
// o que falta em <Badge tone="danger">.
function ProgressCard({
  label,
  value,
  total,
  caption,
  className,
}: {
  /** "Progresso da rodada". */
  label: string
  value: number
  total: number
  /** "de 9 mesas reportadas". */
  caption: string
  className?: string
}) {
  return (
    <div
      data-slot="progress-card"
      className={cn(
        "flex flex-col gap-2 rounded-lg border border-line bg-card px-4 pt-4 pb-6",
        className
      )}
    >
      <Eyebrow tone="muted">{label}</Eyebrow>
      <p className="m-0 type-ui text-ink-muted">
        <b className="type-stat text-ink">{value}</b> {caption}
      </p>
      <Progress
        className="mt-2"
        value={value}
        max={total}
        aria-label={label}
      />
    </div>
  )
}

export { ProgressCard }
