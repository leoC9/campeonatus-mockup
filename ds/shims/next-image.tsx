/* eslint-disable @next/next/no-img-element, @typescript-eslint/no-unused-vars -- shim: é justamente o <img> que substitui o next/image; props do Next são descartadas */
import * as React from "react"

// Substitui `next/image` no bundle do DS: fora do Next não há otimizador,
// então vira um <img> comum com a mesma API usada nos componentes.
type StaticImage = { src: string; width: number; height: number }

function Image({
  src,
  alt,
  width,
  height,
  priority: _priority,
  ...props
}: Omit<React.ComponentProps<"img">, "src"> & {
  src: string | StaticImage
  priority?: boolean
}) {
  const img = typeof src === "string" ? { src } : src
  const h = height ?? (typeof src === "string" ? undefined : src.height)
  const w =
    width ??
    (typeof src !== "string" && h != null
      ? Math.round((src.width / src.height) * Number(h))
      : undefined)

  return <img src={img.src} alt={alt} width={w} height={h} {...props} />
}

export default Image
