"use client"

import * as React from "react"
import { cn } from "cn"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Campo de texto com label acima, como no formulário de inscrição por link.
// `hint` explica o porquê do campo ("Usado para o seu histórico na liga.");
// `error` põe a borda e a mensagem em `danger`, ligadas ao campo.
function TextField({
  label,
  hint,
  error,
  id,
  className,
  ...props
}: Omit<React.ComponentProps<"input">, "id"> & {
  label: string
  hint?: string
  /** "POPID com 7 dígitos." */
  error?: string
  id?: string
}) {
  const autoId = React.useId()
  const inputId = id ?? autoId
  const hintId = hint ? `${inputId}-hint` : undefined
  const errorId = error ? `${inputId}-error` : undefined

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={inputId}>{label}</Label>
      <Input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
        {...props}
      />
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

export { TextField }
