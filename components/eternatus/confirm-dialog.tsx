"use client"

import * as React from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// O padrão de confirmação do produto, para qualquer ação que não volta.
// Título sempre a pergunta "Tem certeza que quer <ação>?", descrição com a
// consequência real e o botão repetindo o verbo. Monta o AlertDialog por
// baixo: não fecha ao clicar fora, sem X, foco inicial em Cancelar.
function ConfirmDialog({
  trigger,
  action,
  consequence,
  confirmLabel,
  cancelLabel = "Cancelar",
  onConfirm,
  open,
  defaultOpen,
  onOpenChange,
}: {
  /** O que abre a janela, normalmente um `Button` (`asChild`). */
  trigger?: React.ReactNode
  /** Verbo no infinitivo mais o objeto: "dropar rafa.nog da Liguinha #24". */
  action: string
  /** O que some, o que fica, se dá para desfazer. */
  consequence: React.ReactNode
  /** Repete o verbo: "Dropar jogador". */
  confirmLabel: string
  cancelLabel?: string
  onConfirm?: () => void
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  return (
    <AlertDialog open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger ? <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger> : null}
      <AlertDialogContent data-slot="confirm-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza que quer {action}?</AlertDialogTitle>
          <AlertDialogDescription>{consequence}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>{confirmLabel}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { ConfirmDialog }
