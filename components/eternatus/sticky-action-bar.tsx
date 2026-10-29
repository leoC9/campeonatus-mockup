import * as React from "react"
import { cn } from "cn"

// Barra do CTA das telas públicas. No celular fica fixa no rodapé, acima da
// área segura do aparelho; a partir de 768px entra no fluxo da página.
// `children`: um `Button block`. O espaçador evita que a barra cubra o fim
// do conteúdo.
function StickyActionBar({
  hint,
  children,
  className,
}: {
  /** Linha curta acima do botão ("R$ 25,00 no balcão · 18 de 24 vagas"). */
  hint?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <>
      <div
        aria-hidden
        data-slot="sticky-action-bar-spacer"
        className={cn(
          "md:hidden",
          hint
            ? "h-[calc(90px+env(safe-area-inset-bottom))]"
            : "h-[calc(68px+env(safe-area-inset-bottom))]"
        )}
      />
      <div
        data-slot="sticky-action-bar"
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 flex flex-col gap-1 border-t border-line bg-cream px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] md:static md:z-auto md:border-0 md:bg-transparent md:p-0",
          className
        )}
      >
        {hint ? (
          <p className="m-0 type-small text-ink-muted tabular-nums">{hint}</p>
        ) : null}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {children}
        </div>
      </div>
    </>
  )
}

export { StickyActionBar }
