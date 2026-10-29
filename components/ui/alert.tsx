import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// Aviso em linha, no par fundo/texto do status. Sempre com palavra: o tom
// sozinho não diz nada. Sem tom de sucesso: confirmação usa `info` com um
// ícone de check.
const alertVariants = cva(
  "relative flex w-full gap-3 rounded-lg border p-4 text-pretty [&>svg]:mt-0.5 [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:stroke-[1.5]",
  {
    variants: {
      tone: {
        // Confirmação, próximo passo, informação do evento.
        info: "border-info-ink/20 bg-info-soft text-info-ink",
        // Atenção: late reg, prazo apertado.
        warn: "border-gold-deep/20 bg-gold-soft text-gold-deep",
        // Erro ou pendência que trava: falta reportar, inscrição recusada.
        danger: "border-danger-ink/20 bg-danger-soft text-danger-ink",
        // Nota sem urgência: evento fechado, regra da casa.
        neutral: "border-neutral-ink/20 bg-neutral-soft text-neutral-ink",
      },
    },
    defaultVariants: { tone: "info" },
  }
)

function Alert({
  className,
  tone = "info",
  title,
  icon,
  action,
  children,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof alertVariants> & {
    /** Uma linha, em peso 500 ("Inscrição confirmada"). */
    title?: React.ReactNode
    /** Ícone de traço da Lucide, opcional. */
    icon?: React.ReactNode
    /** Ação opcional, em `Button variant="link"` ou `size="sm"`. */
    action?: React.ReactNode
  }) {
  return (
    <div
      data-slot="alert"
      data-tone={tone}
      role={tone === "danger" ? "alert" : "status"}
      className={cn(alertVariants({ tone }), className)}
      {...props}
    >
      {icon}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        {title ? (
          <p data-slot="alert-title" className="m-0 type-body font-medium">
            {title}
          </p>
        ) : null}
        {children ? (
          <div data-slot="alert-description" className="type-small text-current">
            {children}
          </div>
        ) : null}
        {action ? (
          <div data-slot="alert-action" className="mt-1 flex flex-wrap gap-2 [&_[data-slot=button]]:text-current">
            {action}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export { Alert, alertVariants }
