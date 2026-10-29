import * as React from "react"
import { cn } from "cn"
import { CheckIcon } from "lucide-react"

// Etapas de um fluxo em linha (Presença · Recomendação · Início). Concluída
// em `navy-800` com check, atual com borda `navy-800`, futura em `ink-muted`.
function Stepper({
  steps,
  current,
  label = "Etapas",
  className,
}: {
  /** Rótulos curtos, de duas a cinco etapas. */
  steps: string[]
  /** Índice da etapa atual, a partir de 0. */
  current: number
  /** Nome acessível da lista. */
  label?: string
  className?: string
}) {
  return (
    <ol
      data-slot="stepper"
      aria-label={label}
      className={cn("m-0 flex list-none p-0", className)}
    >
      {steps.map((step, i) => {
        const state = i < current ? "done" : i === current ? "current" : "next"
        return (
          <li
            key={`${i}-${step}`}
            data-state={state}
            aria-current={state === "current" ? "step" : undefined}
            className={cn(
              "relative flex flex-1 flex-col items-center gap-2 px-1 text-center",
              // Linha entre esta etapa e a anterior.
              i > 0 &&
                "before:absolute before:top-3 before:right-[calc(50%+16px)] before:left-[calc(-50%+16px)] before:h-px before:content-['']",
              i > 0 && (state === "next" ? "before:bg-line" : "before:bg-navy-800")
            )}
          >
            <span
              aria-hidden
              className={cn(
                "flex size-6 items-center justify-center rounded-pill border type-caption tabular-nums [&_svg]:size-3.5",
                state === "done" && "border-navy-800 bg-navy-800 text-on-navy",
                state === "current" && "border-navy-800 bg-card text-navy-800",
                state === "next" && "border-control-border bg-card text-ink-muted"
              )}
            >
              {state === "done" ? (
                <CheckIcon strokeWidth={1.5} absoluteStrokeWidth />
              ) : (
                i + 1
              )}
            </span>
            <span
              className={cn(
                "type-small text-balance",
                state === "current" ? "font-medium text-ink" : "text-ink-muted"
              )}
            >
              {state === "done" ? <span className="sr-only">Concluída: </span> : null}
              {step}
            </span>
          </li>
        )
      })}
    </ol>
  )
}

export { Stepper }
