import * as React from "react"
import { cn } from "cn"

// Lugar vazio dito com palavras: título h3, texto `ink-muted` e, se houver
// um próximo passo, uma ação. Ícone de traço da Lucide, opcional.
function EmptyState({
  icon,
  title,
  description,
  children,
  className,
}: {
  /** Ícone de traço (Lucide), 24px, sem preenchimento. */
  icon?: React.ReactNode
  /** "Nenhum campeonato por aqui". */
  title: React.ReactNode
  /** "Crie o primeiro para abrir as inscrições." */
  description?: React.ReactNode
  /** Ação opcional, em `Button`. */
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div
      data-slot="empty-state"
      className={cn(
        "flex flex-col items-center gap-3 rounded-lg border border-dashed border-control-border bg-card px-6 py-12 text-center",
        className
      )}
    >
      {icon ? (
        <span
          aria-hidden
          className="flex size-10 items-center justify-center rounded-md bg-neutral-soft text-ink-muted [&_svg]:size-6 [&_svg]:stroke-[1.5]"
        >
          {icon}
        </span>
      ) : null}
      <h3 className="m-0 type-h3 text-balance text-ink">{title}</h3>
      {description ? (
        <p className="m-0 max-w-[420px] type-body text-pretty text-ink-muted">
          {description}
        </p>
      ) : null}
      {children ? <div className="mt-2 flex flex-wrap justify-center gap-3">{children}</div> : null}
    </div>
  )
}

export { EmptyState }
