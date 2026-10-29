"use client"

import * as React from "react"
import { cn } from "cn"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

function format(total: number) {
  const s = Math.max(0, Math.round(total))
  const mm = String(Math.floor(s / 60)).padStart(2, "0")
  const ss = String(s % 60).padStart(2, "0")
  return `${mm}:${ss}`
}

// Relógio da rodada no backoffice: mm:ss grande em algarismos tabulares e
// as ações do balcão. Só exibe: quem conta o tempo é a tela, pelas callbacks.
// Com `durationSeconds` em 0, mostra "Tempo esgotado" em `danger`.
function RoundTimer({
  durationSeconds,
  running = false,
  label = "Tempo da rodada",
  onStart,
  onPause,
  onChange,
  onAdjust,
  className,
}: {
  /** Segundos restantes. */
  durationSeconds: number
  running?: boolean
  /** Nome acessível do relógio ("Rodada 3 · tempo"). */
  label?: string
  onStart?: () => void
  onPause?: () => void
  /** Recebe o novo total depois de −1 min / +1 min. */
  onChange?: (seconds: number) => void
  /** "Ajustar": a tela abre o diálogo com o tempo exato. */
  onAdjust?: () => void
  className?: string
}) {
  const over = durationSeconds <= 0

  return (
    <div
      data-slot="round-timer"
      className={cn(
        "flex flex-col gap-4 rounded-lg border border-line bg-card p-4 md:p-6",
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-3">
        <p
          role="timer"
          aria-label={label}
          className={cn(
            "m-0 type-display tabular-nums",
            over ? "text-danger-ink" : "text-ink"
          )}
        >
          {format(durationSeconds)}
        </p>
        <div role="status" className="type-caption">
          {over ? (
            <Badge tone="danger">Tempo esgotado</Badge>
          ) : (
            <Badge tone={running ? "info" : "neutral"}>
              {running ? "Em andamento" : "Pausado"}
            </Badge>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 md:flex md:flex-wrap">
        {running ? (
          <Button onClick={onPause} className="col-span-2 md:col-span-1">
            Pausar
          </Button>
        ) : (
          <Button onClick={onStart} disabled={over} className="col-span-2 md:col-span-1">
            Iniciar
          </Button>
        )}
        <Button
          variant="secondary"
          aria-label="Tirar 1 minuto"
          disabled={over}
          onClick={() => onChange?.(Math.max(0, durationSeconds - 60))}
          className="tabular-nums"
        >
          −1 min
        </Button>
        <Button
          variant="secondary"
          aria-label="Somar 1 minuto"
          onClick={() => onChange?.(durationSeconds + 60)}
          className="tabular-nums"
        >
          +1 min
        </Button>
        <Button variant="secondary" onClick={onAdjust} className="col-span-2 md:col-span-1">
          Ajustar
        </Button>
      </div>
    </div>
  )
}

export { RoundTimer }
