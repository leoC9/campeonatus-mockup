"use client"

import * as React from "react"
import { cn } from "cn"
import { MinusIcon, PlusIcon } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Número pequeno com botões − e + de 44px (vagas, rodadas, mesas).
// Label e hint como no TextField; o valor nunca sai de `min`…`max`.
function NumberField({
  label,
  hint,
  error,
  id,
  value,
  defaultValue = 0,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
  onChange,
  disabled,
  className,
}: {
  label: string
  /** "Até 32 jogadores por rodada." */
  hint?: string
  /** Mensagem de erro; deixa a borda e o texto em `danger`. */
  error?: string
  id?: string
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  onChange?: (value: number) => void
  disabled?: boolean
  className?: string
}) {
  const autoId = React.useId()
  const inputId = id ?? autoId
  const hintId = hint ? `${inputId}-hint` : undefined
  const errorId = error ? `${inputId}-error` : undefined
  const [inner, setInner] = React.useState(defaultValue)
  const current = value ?? inner
  // Enquanto a pessoa digita, o campo mostra o rascunho; fora disso, o valor.
  const [draft, setDraft] = React.useState<string | null>(null)
  const text = draft ?? String(current)

  function commit(next: number) {
    const clamped = Math.min(max, Math.max(min, next))
    setInner(clamped)
    setDraft(null)
    if (clamped !== current) onChange?.(clamped)
  }

  const buttonClass =
    "inline-flex size-11 shrink-0 cursor-pointer items-center justify-center bg-card text-ink transition-colors hover:bg-neutral-soft focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-navy-800 disabled:pointer-events-none disabled:opacity-45 [&_svg]:size-4 [&_svg]:stroke-[1.5]"

  return (
    <div data-slot="number-field" className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={inputId}>{label}</Label>
      <div
        className={cn(
          "inline-flex w-fit overflow-hidden rounded-md border bg-card",
          error ? "border-danger-ink" : "border-control-border",
          disabled && "opacity-45"
        )}
      >
        <button
          type="button"
          aria-label="Diminuir"
          tabIndex={-1}
          disabled={disabled || current <= min}
          onClick={() => commit(current - step)}
          className={buttonClass}
        >
          <MinusIcon aria-hidden />
        </button>
        <Input
          id={inputId}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          role="spinbutton"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={current}
          aria-invalid={error ? true : undefined}
          aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
          value={text}
          disabled={disabled}
          onChange={(e) => setDraft(e.target.value.replace(/[^\d-]/g, ""))}
          onBlur={() => {
            const parsed = parseInt(text, 10)
            commit(Number.isNaN(parsed) ? current : parsed)
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowUp") {
              e.preventDefault()
              commit(current + step)
            } else if (e.key === "ArrowDown") {
              e.preventDefault()
              commit(current - step)
            } else if (e.key === "Enter") {
              const parsed = parseInt(text, 10)
              commit(Number.isNaN(parsed) ? current : parsed)
            }
          }}
          className={cn(
            "w-16 rounded-none border-x border-y-0 text-center tabular-nums focus-visible:-outline-offset-2 disabled:opacity-100",
            error ? "border-x-danger-ink" : "border-x-line"
          )}
        />
        <button
          type="button"
          aria-label="Aumentar"
          tabIndex={-1}
          disabled={disabled || current >= max}
          onClick={() => commit(current + step)}
          className={buttonClass}
        >
          <PlusIcon aria-hidden />
        </button>
      </div>
      {hint ? (
        <span id={hintId} className="type-small text-ink-muted">
          {hint}
        </span>
      ) : null}
      {error ? (
        <span id={errorId} className="type-small text-danger-ink">
          {error}
        </span>
      ) : null}
    </div>
  )
}

export { NumberField }
