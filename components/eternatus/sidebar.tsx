import * as React from "react"
import Link from "next/link"
import { cn } from "cn"

type SidebarItem = string | { label: string; href?: string }

// Navegação lateral do backoffice em azul-marinho. 200px, altura da janela.
// Só desktop — o backoffice não tem versão de celular.
function Sidebar({
  items,
  active,
  title = "Eternacamp",
  footer,
  className,
}: {
  items: SidebarItem[]
  /** Label do item atual. */
  active?: string
  title?: string
  /** "Loja Eternatus · lojista". */
  footer?: React.ReactNode
  className?: string
}) {
  return (
    <nav
      aria-label="Backoffice"
      className={cn(
        "flex min-h-full w-[200px] shrink-0 flex-col bg-sidebar px-3 py-6 text-sidebar-foreground",
        className
      )}
    >
      <div className="px-3 pb-6 font-semibold">{title}</div>
      <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
        {items.map((item) => {
          const { label, href = "#" } =
            typeof item === "string" ? { label: item } : item
          const on = label === active
          return (
            <li key={label}>
              <Link
                href={href}
                aria-current={on ? "page" : undefined}
                className={cn(
                  "block rounded-md px-3 py-2 type-ui no-underline focus-visible:outline-2 focus-visible:outline-gold",
                  on
                    ? "bg-sidebar-accent text-on-navy"
                    : "text-on-navy-muted hover:text-on-navy"
                )}
              >
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
      {footer ? (
        <div className="mt-auto px-3 pt-6 type-caption font-normal text-on-navy-muted">
          {footer}
        </div>
      ) : null}
    </nav>
  )
}

export { Sidebar, type SidebarItem }
