Tabela pública do standings no desktop; `StandingsRow` é a versão de celular.

**Você fornece:** `players` (`{position,name,record,points,owr,oowr?,credit?,dropped?}`) e opcionalmente `showCredit`, `caption` e `className`.

- Colunas fixas: #, Jogador, V–E–D, Pts, OWR. OOWR aparece quando algum jogador tem `oowr`; Crédito só com `showCredit`, e **só no standings final**.
- **Top 3 celebrado**: 1º com troféu em `gold-soft`/`gold-deep`, 2º com medalha em `silver-soft`/`silver-deep`, 3º em `bronze-soft`/`bronze-deep`. A linha inteira fica no tom soft do lugar, a medalha um degrau mais escura (deep a 18%) e um filete de 3px na esquerda; o nome em peso 600. O chip tem `aria-label` ("1º lugar") para o leitor de tela.
- Do 4º em diante, só o número em `ink-muted`. Cor nunca é o único sinal: a posição numérica está sempre no chip.
- `dropped`: nome em `ink-muted` e `Badge` neutral "Drop"; a linha fica no lugar que os pontos dão.
- Pontos em peso 600; V–E–D em `ink-muted`; tudo tabular e alinhado à direita. Sem zebra: separação por `line`, cabeçalho em eyebrow sobre `cream`.
