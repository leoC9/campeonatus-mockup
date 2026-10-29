Linha da tabela pública no celular: posição, jogador, OWR, pontos e V-E-D.

**Você fornece:** `position`, `name` (nickname), `owr` ("61,1%"), `points`, `record` ("4–0–0"), e opcionalmente `highlight` (1º lugar), `dropped`, `oowr` e `credit`.

- Placar sempre à direita, números tabulares. Só o 1º lugar recebe borda `gold`.
- `dropped`: `Badge` neutral "Drop" ao lado do nome, que fica em `ink-muted`. A linha continua no lugar que os pontos dão.
- `oowr`: a linha vira expansível (Radix Collapsible). Fechada, mostra posição, nickname, pontos e V-E-D; aberta, OWR e OOWR. A linha inteira é o botão, com 44px ou mais.
- `credit` ("R$ 42,00") aparece só quando passado, abaixo do V-E-D, e **só no standings final**: na tabela ao vivo e em qualquer tela pública durante o evento, não passe `credit`.
- Cabe em 375px sem rolagem: o nickname trunca com reticências.
