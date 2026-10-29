"use client"

import * as React from "react"
import { cn } from "cn"
import { CheckIcon, MinusIcon } from "lucide-react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"

// Caixa de 20px com borda `control-border`; marcada em `navy-800` com o check
// da Lucide. A área de toque é de 44px mesmo sem label.
function Checkbox({
  className,
  label,
  description,
  id,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & {
  /** Texto ao lado da caixa ("Aceito pagar no balcão"). */
  label?: React.ReactNode
  /** Linha de apoio em `small` `ink-muted` abaixo do label. */
  description?: React.ReactNode
}) {
  const autoId = React.useId()
  const checkboxId = id ?? autoId
  const descriptionId = description ? `${checkboxId}-description` : undefined

  const control = (
    <CheckboxPrimitive.Root
      id={checkboxId}
      data-slot="checkbox"
      aria-describedby={props["aria-describedby"] ?? descriptionId}
      className={cn(
        // O `before` estende a área de toque de 20px para 44px.
        "group relative flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-sm border border-control-border bg-card text-on-navy transition-colors before:absolute before:-inset-3 before:content-[''] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-800 disabled:cursor-not-allowed disabled:opacity-45 aria-invalid:border-danger-ink data-[state=checked]:border-navy-800 data-[state=checked]:bg-navy-800 data-[state=indeterminate]:border-navy-800 data-[state=indeterminate]:bg-navy-800",
        !label && className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current"
      >
        <CheckIcon aria-hidden className="size-3.5 group-data-[state=indeterminate]:hidden" strokeWidth={1.5} absoluteStrokeWidth />
        <MinusIcon aria-hidden className="hidden size-3.5 group-data-[state=indeterminate]:block" strokeWidth={1.5} absoluteStrokeWidth />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )

  if (!label) return control

  // A linha inteira é o label: tocar em qualquer ponto dela alterna o controle.
  return (
    <label
      data-slot="checkbox-field"
      className={cn(
        "flex min-h-11 cursor-pointer items-start gap-3 py-3 select-none has-[:disabled]:cursor-not-allowed has-[:disabled]:[&>span]:opacity-45",
        className
      )}
    >
      {control}
      <span className="flex min-w-0 flex-1 flex-col gap-0.5 type-body text-ink">
        <span className="-mt-px">{label}</span>
        {description ? (
          <span id={descriptionId} className="type-small text-ink-muted">
            {description}
          </span>
        ) : null}
      </span>
    </label>
  )
}

export { Checkbox }
