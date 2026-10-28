import * as React from "react"
import { cn } from "cn"

import { Logo } from "./logo"

// Cabeçalho claro que carrega o logo, sempre acima do hero.
function SiteHeader({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <header
      className={cn(
        "border-b border-line bg-cream px-6 py-3 md:px-8",
        className
      )}
    >
      <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-4">
        <Logo height={36} priority />
        {children ? (
          <nav className="flex items-center gap-4">{children}</nav>
        ) : null}
      </div>
    </header>
  )
}

export { SiteHeader }
