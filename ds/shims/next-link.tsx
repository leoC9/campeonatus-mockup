/* eslint-disable @typescript-eslint/no-unused-vars -- props do Next são descartadas */
import * as React from "react"

// Substitui `next/link` no bundle do DS: um <a> comum.
function Link({
  href,
  prefetch: _prefetch,
  replace: _replace,
  scroll: _scroll,
  ...props
}: Omit<React.ComponentProps<"a">, "href"> & {
  href: string
  prefetch?: boolean
  replace?: boolean
  scroll?: boolean
}) {
  return <a href={href} {...props} />
}

export default Link
