"use client"

import * as React from "react"
import { cn } from "cn"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Campo de texto com label acima, como no formulário de inscrição por link.
// `hint` explica o porquê do campo ("Usado para o seu histórico na liga.").
function TextField({
  label,
  hint,
  id,
  className,
  ...props
}: Omit<React.ComponentProps<"input">, "id"> & {
  label: string
  hint?: string
  id?: string
}) {
  const autoId = React.useId()
  const inputId = id ?? autoId
  const hintId = hint ? `${inputId}-hint` : undefined

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={inputId}>{label}</Label>
      <Input id={inputId} aria-describedby={hintId} {...props} />
      {hint ? (
        <span id={hintId} className="type-small text-ink-muted">
          {hint}
        </span>
      ) : null}
    </div>
  )
}

export { TextField }
