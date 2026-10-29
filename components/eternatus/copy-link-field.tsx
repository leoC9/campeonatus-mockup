"use client"

import * as React from "react"
import { cn } from "cn"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// O link de inscrição do evento, pronto para copiar. A URL é imutável: o
// campo não recebe foco nem clique, só "Copiar" age (vira "Copiado" por 2s).
function CopyLinkField({
  url,
  active = true,
  label = "Link de inscrição",
  id,
  onCopy,
  className,
}: {
  url: string
  /** Falso quando as inscrições pelo link estão desligadas. */
  active?: boolean
  label?: string
  id?: string
  /** Chamado depois de copiar; o componente já cuida do clipboard. */
  onCopy?: (url: string) => void
  className?: string
}) {
  const autoId = React.useId()
  const inputId = id ?? autoId
  const [copied, setCopied] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  async function copy() {
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      // Sem clipboard (http, iframe sem permissão): seleciona o campo
      // para a pessoa copiar na mão.
      const input = document.getElementById(inputId) as HTMLInputElement | null
      input?.select()
    }
    setCopied(true)
    onCopy?.(url)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div data-slot="copy-link-field" className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-center justify-between gap-3">
        <Label htmlFor={inputId}>{label}</Label>
        <Badge tone={active ? "info" : "neutral"}>
          {active ? "Ativo" : "Desativado"}
        </Badge>
      </div>
      <div className="flex gap-2">
        <Input
          id={inputId}
          value={url}
          readOnly
          tabIndex={-1}
          aria-readonly
          className={cn(
            "pointer-events-none flex-1 truncate bg-neutral-soft tabular-nums",
            !active && "text-ink-muted"
          )}
        />
        <Button
          variant="secondary"
          onClick={copy}
          aria-live="polite"
          className="min-w-[108px] shrink-0"
        >
          {copied ? "Copiado" : "Copiar"}
        </Button>
      </div>
    </div>
  )
}

export { CopyLinkField }
