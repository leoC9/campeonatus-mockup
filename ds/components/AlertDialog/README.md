Confirmação de ação destrutiva: drop de jogador, exclusão de campeonato, encerrar a rodada.

**Você fornece:** `AlertDialog` + `AlertDialogTrigger`, `AlertDialogContent` com `AlertDialogHeader` → `AlertDialogTitle` + `AlertDialogDescription`, e `AlertDialogFooter` com `AlertDialogCancel` e `AlertDialogAction` (`onClick`).

- Não fecha ao clicar fora nem tem X: a pessoa escolhe entre cancelar e confirmar.
- `AlertDialogAction` em outline `danger-ink` com hover `danger-soft`; `AlertDialogCancel` em `secondary`. O foco inicial cai em Cancelar.
- O título diz o que vai acontecer ("Dropar rafa.nog da Liguinha #24?") e a ação repete o verbo ("Dropar jogador").
- Descrição com a consequência real: o que some, o que fica, se dá para desfazer.
