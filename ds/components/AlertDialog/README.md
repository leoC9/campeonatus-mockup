Primitivo por trás do `ConfirmDialog`. Nas telas, use `ConfirmDialog`: ele já fixa o título em pergunta, a consequência e o verbo no botão. Monte o `AlertDialog` na mão só quando precisar de um conteúdo que o padrão não cobre.

**Você fornece:** `AlertDialog` + `AlertDialogTrigger`, `AlertDialogContent` com `AlertDialogHeader` → `AlertDialogTitle` + `AlertDialogDescription`, e `AlertDialogFooter` com `AlertDialogCancel` e `AlertDialogAction` (`onClick`).

- Não fecha ao clicar fora nem tem X: a pessoa escolhe entre cancelar e confirmar.
- `AlertDialogAction` em outline `danger-ink` com hover `danger-soft`; `AlertDialogCancel` em `secondary`. O foco inicial cai em Cancelar.
- O título diz o que vai acontecer ("Dropar rafa.nog da Liguinha #24?") e a ação repete o verbo ("Dropar jogador").
- Descrição com a consequência real: o que some, o que fica, se dá para desfazer.
