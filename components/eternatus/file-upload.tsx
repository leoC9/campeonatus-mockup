"use client"

import * as React from "react"
import { cn } from "cn"
import { ImagePlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

// Imagem do evento ou logo da loja: área de soltar ou clicar, preview do
// arquivo escolhido, "Trocar" e "Remover". A restrição (tipos e tamanho)
// fica escrita; o erro aparece abaixo, em `danger`.
function FileUpload({
  label = "Imagem",
  accept = "image/png,image/jpeg",
  maxSizeMb = 2,
  src,
  fileName,
  error,
  id,
  onChange,
  className,
}: {
  label?: string
  /** Tipos aceitos, como no atributo `accept` do input. */
  accept?: string
  /** Tamanho máximo em MB; acima disso o componente avisa e não troca. */
  maxSizeMb?: number
  /** Imagem já salva, para a tela de edição. */
  src?: string
  /** Nome do arquivo já salvo, mostrado sob o preview. */
  fileName?: string
  /** Mensagem de erro vinda de fora (upload recusado pelo servidor). */
  error?: string
  id?: string
  /** `null` quando a pessoa remove a imagem. */
  onChange?: (file: File | null) => void
  className?: string
}) {
  const autoId = React.useId()
  const inputId = id ?? autoId
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [file, setFile] = React.useState<File | null>(null)
  const [localError, setLocalError] = React.useState<string>()
  const [dragging, setDragging] = React.useState(false)
  const [removed, setRemoved] = React.useState(false)

  const objectUrl = React.useMemo(
    () => (file ? URL.createObjectURL(file) : undefined),
    [file]
  )
  React.useEffect(
    () => () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    },
    [objectUrl]
  )

  const types = accept
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
  const typeLabel = types
    .map((t) => t.replace(/^image\//, "").replace("jpeg", "JPG").toUpperCase())
    .join(" ou ")
  const restriction = `${typeLabel} até ${maxSizeMb} MB`
  const message = error ?? localError
  const messageId = message ? `${inputId}-error` : undefined
  const restrictionId = `${inputId}-restriction`
  const shown = removed ? undefined : (objectUrl ?? src)

  function pick(next: File | undefined) {
    if (!next) return
    if (types.length && !types.includes(next.type)) {
      setLocalError(`Arquivo em ${next.type || "formato desconhecido"}. Envie ${restriction}.`)
      return
    }
    if (next.size > maxSizeMb * 1024 * 1024) {
      setLocalError(`Arquivo com ${(next.size / 1024 / 1024).toFixed(1)} MB. O limite é ${maxSizeMb} MB.`)
      return
    }
    setLocalError(undefined)
    setRemoved(false)
    setFile(next)
    onChange?.(next)
  }

  function remove() {
    setFile(null)
    setRemoved(true)
    setLocalError(undefined)
    if (inputRef.current) inputRef.current.value = ""
    onChange?.(null)
  }

  return (
    <div data-slot="file-upload" className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={inputId}>{label}</Label>
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={accept}
        className="peer sr-only"
        // Com imagem, o foco vai para "Trocar"; o input só recebe o arquivo.
        tabIndex={shown ? -1 : 0}
        aria-invalid={message ? true : undefined}
        aria-describedby={[restrictionId, messageId].filter(Boolean).join(" ")}
        onChange={(e) => pick(e.target.files?.[0])}
      />
      {shown ? (
        <div
          className={cn(
            "flex flex-col gap-3 rounded-lg border bg-card p-4",
            message ? "border-danger-ink" : "border-line"
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- preview local via object URL */}
          <img
            src={shown}
            alt={file?.name ?? fileName ?? "Imagem escolhida"}
            className="max-h-40 w-fit max-w-full rounded-md border border-line object-contain"
          />
          <p className="m-0 truncate type-small text-ink-muted">
            {file?.name ?? fileName}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" onClick={() => inputRef.current?.click()}>
              Trocar
            </Button>
            <Button variant="secondary" onClick={remove}>
              Remover
            </Button>
          </div>
        </div>
      ) : (
        <label
          htmlFor={inputId}
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragging(false)
            pick(e.dataTransfer.files?.[0])
          }}
          className={cn(
            "flex min-h-[140px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-card px-6 py-6 text-center transition-colors hover:bg-neutral-soft peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-navy-800 [&_svg]:size-6 [&_svg]:stroke-[1.5]",
            message ? "border-danger-ink" : "border-control-border",
            dragging && "bg-info-soft"
          )}
        >
          <ImagePlusIcon aria-hidden className="text-ink-muted" />
          <span className="type-body text-ink">
            Soltar a imagem aqui ou clicar para escolher
          </span>
          <span id={restrictionId} className="type-small text-ink-muted">
            {restriction}
          </span>
        </label>
      )}
      {shown ? (
        <span id={restrictionId} className="sr-only">
          {restriction}
        </span>
      ) : null}
      {message ? (
        <span id={messageId} role="alert" className="type-small text-danger-ink">
          {message}
        </span>
      ) : null}
    </div>
  )
}

export { FileUpload }
