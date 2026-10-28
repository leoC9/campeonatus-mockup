import * as React from "react"
import { cn } from "cn"

import { Eyebrow } from "./eyebrow"

// O campo escuro do topo do site — o único das telas públicas. Fica logo
// abaixo do cabeçalho claro com o logo; nunca coloque o logo aqui dentro.
// `children`: botões `hero` e `hero-ghost`.
function Hero({
  eyebrow,
  title,
  lede,
  children,
  className,
}: {
  eyebrow?: string
  title: React.ReactNode
  lede?: React.ReactNode
  children?: React.ReactNode
  className?: string
}) {
  return (
    <section
      className={cn("bg-navy-950 px-6 py-12 text-on-navy", className)}
    >
      <div className="mx-auto flex max-w-[1120px] flex-col gap-3">
        {eyebrow ? <Eyebrow tone="gold">{eyebrow}</Eyebrow> : null}
        <h1 className="m-0 max-w-[620px] type-hero-mobile text-balance md:type-hero">
          {title}
        </h1>
        {lede ? (
          <p className="m-0 max-w-[520px] type-lede text-pretty text-on-navy-muted">
            {lede}
          </p>
        ) : null}
        {children ? (
          // No celular, botões lado a lado com largura igual.
          <div className="mt-3 grid auto-cols-fr grid-flow-col gap-3 md:flex md:flex-wrap">
            {children}
          </div>
        ) : null}
      </div>
    </section>
  )
}

export { Hero }
