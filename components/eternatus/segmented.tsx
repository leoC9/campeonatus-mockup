"use client"

import * as React from "react"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

type SegmentedOption = string | { value: string; label: string }

// Grupo de opções encostadas para filtrar ou escolher um valor (até seis).
// Filtros: Em andamento · Agendados · Finalizados. Partida: Melhor de 1 · Melhor de 3.
function Segmented({
  options,
  label,
  value,
  defaultValue,
  onChange,
  className,
}: {
  options: SegmentedOption[]
  /** Nome acessível do grupo. */
  label: string
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  className?: string
}) {
  const items = options.map((o) =>
    typeof o === "string" ? { value: o, label: o } : o
  )
  const [inner, setInner] = React.useState(defaultValue ?? items[0]?.value)
  const current = value ?? inner

  return (
    <ToggleGroup
      type="single"
      aria-label={label}
      value={current}
      // Radix emite "" ao clicar no item já selecionado; o segmento nunca fica vazio.
      onValueChange={(v) => {
        if (!v) return
        setInner(v)
        onChange?.(v)
      }}
      className={className}
    >
      {items.map((item) => (
        <ToggleGroupItem key={item.value} value={item.value}>
          {item.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

export { Segmented, type SegmentedOption }
