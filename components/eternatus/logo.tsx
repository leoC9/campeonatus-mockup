import Image from "next/image"
import { cn } from "cn"

import logo from "@/public/brand/eternatus-logo.png"

// Sempre colorido sobre `cream` ou `paper`; nunca sobre navy, nunca recolorido.
// Altura: 32–40px no topo, 48–56px em login/tabela pública, até 72px em capa.
function Logo({
  height = 36,
  className,
  priority,
}: {
  height?: number
  className?: string
  priority?: boolean
}) {
  const h = Math.max(32, height)

  // A altura vai também no style: o reset do Tailwind (img { height: auto })
  // venceria o atributo e o logo sairia no tamanho do arquivo.
  return (
    <Image
      src={logo}
      alt="Eternatus Card House"
      height={h}
      priority={priority}
      style={{ height: h }}
      className={cn("w-auto", className)}
    />
  )
}

export { Logo }
