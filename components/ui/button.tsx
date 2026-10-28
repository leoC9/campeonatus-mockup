import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

// Botões em outline, cantos radius-md, nunca pílula nem fundo sólido.
const buttonVariants = cva(
  "group/button inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md border font-medium whitespace-nowrap transition-colors select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-800 disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:stroke-[1.5]",
  {
    variants: {
      variant: {
        // A ação principal da tela. Uma por tela.
        primary: "border-navy-800 bg-card text-navy-800 hover:bg-info-soft",
        // "Cancelar", "Importar da anterior".
        secondary:
          "border-control-border bg-card text-ink hover:bg-neutral-soft",
        // Ação de linha em tabela ou cartão ("Abrir", "Standings", "Drop").
        link: "h-auto! border-transparent bg-transparent px-1! text-info-ink underline-offset-3 hover:underline",
        // Só dentro de Hero, sobre navy-950.
        hero: "border-gold bg-transparent text-gold hover:bg-gold/12 focus-visible:outline-gold",
        "hero-ghost":
          "border-on-navy-muted bg-transparent text-on-navy hover:bg-on-navy/8 focus-visible:outline-gold",
      },
      size: {
        md: "h-11 px-6 type-body font-medium",
        sm: "h-8 px-3 type-small font-medium",
      },
      block: {
        true: "flex w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      block: false,
    },
  }
)

function Button({
  className,
  variant = "primary",
  size = "md",
  block = false,
  asChild = false,
  type = "button",
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      type={asChild ? undefined : type}
      className={cn(buttonVariants({ variant, size, block, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
