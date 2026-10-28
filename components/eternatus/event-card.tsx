import * as React from "react"
import { type VariantProps } from "class-variance-authority"

import { Badge, badgeVariants } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Eyebrow } from "./eyebrow"

// Cartão de evento da vitrine: data, status, nome, formato e ação.
// Rodapé: "R$ 25,00 · 18/24" à esquerda, <Button variant="link"> à direita.
// Evento fechado: status neutral "Em breve" e ação "Avise-me".
function EventCard({
  when,
  title,
  meta,
  status,
  statusTone = "info",
  children,
  className,
}: {
  /** Eyebrow: "Quinta · 19h30". */
  when: string
  title: string
  /** "Standard · Suíço 4 · Bo3". */
  meta: string
  status?: string
  statusTone?: VariantProps<typeof badgeVariants>["tone"]
  children?: React.ReactNode
  className?: string
}) {
  return (
    <Card asChild className={className}>
      <article>
        <CardHeader>
          <Eyebrow>{when}</Eyebrow>
          {status ? <Badge tone={statusTone}>{status}</Badge> : null}
        </CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{meta}</CardDescription>
        {children ? <CardFooter>{children}</CardFooter> : null}
      </article>
    </Card>
  )
}

export { EventCard }
