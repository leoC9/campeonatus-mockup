"use client"

import * as React from "react"
import { cn } from "cn"
import { Switch as SwitchPrimitive } from "radix-ui"

// Liga/desliga: trilho `neutral-soft` com borda `control-border`, ligado em
// `navy-800`. Com `label`, vira uma linha de 44px com o texto ao lado.
function Switch({
  className,
  label,
  description,
  id,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  /** Texto ao lado do controle ("Inscrições pelo link"). */
  label?: React.ReactNode
  /** Linha de apoio em `small` `ink-muted` abaixo do label. */
  description?: React.ReactNode
}) {
  const autoId = React.useId()
  const switchId = id ?? autoId
  const descriptionId = description ? `${switchId}-description` : undefined

  const control = (
    <SwitchPrimitive.Root
      id={switchId}
      data-slot="switch"
      aria-describedby={props["aria-describedby"] ?? descriptionId}
      className={cn(
        // O `before` estende a área de toque para 44px de altura.
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-pill border border-control-border bg-neutral-soft transition-colors before:absolute before:inset-x-0 before:-inset-y-2.5 before:content-[''] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-800 disabled:cursor-not-allowed disabled:opacity-45 data-[state=checked]:border-navy-800 data-[state=checked]:bg-navy-800",
        !label && className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block size-4 translate-x-[3px] rounded-pill bg-card ring-1 ring-control-border transition-transform motion-reduce:transition-none data-[state=checked]:translate-x-[23px] data-[state=checked]:ring-navy-800"
      />
    </SwitchPrimitive.Root>
  )

  if (!label) return control

  // A linha inteira é o label: tocar em qualquer ponto dela alterna o controle.
  return (
    <label
      data-slot="switch-field"
      className={cn(
        "flex min-h-11 cursor-pointer items-start gap-3 py-2.5 select-none has-[:disabled]:cursor-not-allowed has-[:disabled]:[&>span]:opacity-45",
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

export { Switch }
