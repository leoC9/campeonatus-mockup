import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// Sobretítulo em caixa alta, sempre acima de um título.
// `maroon` no claro, `gold` no escuro, `muted` em cabeçalho de tabela/painel.
const eyebrowVariants = cva("m-0 type-eyebrow", {
  variants: {
    tone: {
      maroon: "text-maroon",
      gold: "text-gold",
      muted: "text-ink-muted",
    },
  },
  defaultVariants: { tone: "maroon" },
})

function Eyebrow({
  className,
  tone,
  ...props
}: React.ComponentProps<"p"> & VariantProps<typeof eyebrowVariants>) {
  return (
    <p
      data-slot="eyebrow"
      className={cn(eyebrowVariants({ tone }), className)}
      {...props}
    />
  )
}

export { Eyebrow, eyebrowVariants }
