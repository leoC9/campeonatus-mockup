import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

// Status sempre em par fundo/texto e sempre com palavra.
const badgeVariants = cva(
  "inline-flex h-[22px] w-fit shrink-0 items-center gap-1 rounded-sm px-2 type-caption whitespace-nowrap [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      tone: {
        // Abertas, Inscrições abertas, Finalizado, Rodada 3 de 4, Link.
        info: "bg-info-soft text-info-ink",
        // Últimas vagas, Falta reportar, pendências.
        danger: "bg-danger-soft text-danger-ink",
        // Em breve, Balcão, chips de formato.
        neutral: "bg-neutral-soft text-neutral-ink",
        // Late reg.
        warn: "bg-gold-soft text-gold-deep",
        // Inscrições (estado ainda não iniciado na lista do backoffice).
        outline: "bg-card text-neutral-ink inset-ring inset-ring-control-border",
      },
    },
    defaultVariants: {
      tone: "neutral",
    },
  }
)

function Badge({
  className,
  tone = "neutral",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-tone={tone}
      className={cn(badgeVariants({ tone }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
