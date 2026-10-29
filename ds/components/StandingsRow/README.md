Linha da tabela pública no celular: posição, jogador, OWR, pontos e V-E-D.

**Você fornece:** `position`, `name` (nickname), `owr` ("61,1%"), `points`, `record` ("4–0–0"), e opcionalmente `highlight` (líder), `me`, `dropped`, `oowr` e `credit`.

- Placar sempre à direita, números tabulares. OWR em 11px abaixo do nome.
- **Top 3 é celebrado pela própria `position`**: 1º com troféu sobre `gold-soft`, 2º com medalha sobre `silver-soft`, 3º sobre `bronze-soft`; a medalha fica um degrau mais escura que a linha, com filete da cor na esquerda e nome em peso 600. Do 4º em diante, só o número em `ink-muted`. `highlight` acrescenta a borda `gold` ao líder.
- `me`: linha do próprio jogador com contorno de 2px em `navy-800`, sem rótulo. Convive com a medalha do top 3.
- `dropped`: `Badge` neutral "Drop" ao lado do nome, que fica em `ink-muted`. A linha continua no lugar que os pontos dão.
- `oowr`: a linha vira expansível (Radix Collapsible). Fechada, mostra posição, nickname, pontos e V-E-D; aberta, OWR e OOWR. A linha inteira é o botão, com 44px ou mais.
- `credit` ("R$ 42,00") aparece só quando passado, abaixo do V-E-D, e **só no standings final**: na tabela ao vivo e em qualquer tela pública durante o evento, não passe `credit`.
- Cabe em 375px sem rolagem: o nickname trunca com reticências. No desktop, use `StandingsTable`.
