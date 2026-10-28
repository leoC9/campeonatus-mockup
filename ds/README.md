Sistema visual da Eternatus Card House e do Eternacamp — o site da loja, a inscrição por link, a tabela pública e o backoffice do balcão. Creme quente como chão, azul-marinho como estrutura, bordô e dourado como acentos tirados do próprio logo.

## Marca

- Use `assets/Logos/eternatus-logo.png` (fundo transparente) em toda tela. A marca aparece **sempre colorida sobre `cream` ou `paper`**; nunca sobre `navy-950`, nunca recolorida, nunca em uma cor só.
- No topo do site e do celular, o logo mede 32–40px de altura; em login e cabeçalho de tabela pública, 48–56px; na capa de uma proposta, até 72px.
- O campo escuro fica só para o hero. O cabeçalho que carrega o logo é sempre claro, acima do hero.
- `eternatus-logo-original.png` é o arquivo enviado, com fundo branco: guarde como fonte, não use sobre creme.

## Tom de voz

- Português do Brasil, direto e de balcão: fala com o jogador por "você", frases curtas, sem ponto de exclamação.
  - "Sem senha e sem conta. Três campos e você entra na lista do lojista."
  - "Você é o 19º inscrito da Liguinha #24. Chegue até 19h15 para o pagamento no balcão."
- Vocabulário do jogo como a mesa fala: Liguinha, Standings, Bo3, Suíço 4, OWR, drop, late reg, POPID. Não traduza termos de torneio.
- Botões com verbo no infinitivo e sem ícone decorativo: "Inscrever-se", "Confirmar inscrição", "Ver tabela do evento". "Avise-me" para evento ainda fechado.
- Metadados separados por ponto médio: `Standard · Suíço 4 · Bo3 · R$ 25,00`. Datas em eyebrow: `QUINTA · 19H30`, `QUINTA, 18/09 · 19H30`.
- Valores em reais só onde o jogador paga (inscrição). A tabela pública mostra só o resultado esportivo, nunca crédito.
- Sem emoji.

## Cor

- Chão: `paper` para a página, `cream` para a tela, `card` para o que se destaca dentro dela (cartão, input, linha de standings).
- Texto em `ink`; apoio, metadados e cabeçalhos de tabela em `ink-muted`.
- `maroon` é o acento de identidade no claro: eyebrows, régua de seção, ponto da legenda Público. Não use em botões nem em blocos grandes.
- `gold` só sobre o escuro (hero, botão outline do hero, destaque do 1º lugar dentro de cartão). Sobre claro, dourado em texto é `gold-deep`.
- Estrutura escura: `navy-950` no hero, `navy-800` na sidebar do backoffice e no botão principal, `navy-700` no item ativo, `navy-600` na barra de progresso.
- Status sempre em par fundo/texto e sempre com palavra: `info-soft`/`info-ink` (Abertas, Finalizado, Rodada 3 de 4, Link), `danger-soft`/`danger-ink` (Últimas vagas, Falta reportar), `neutral-soft`/`neutral-ink` (Em breve, Balcão), `gold-soft`/`gold-deep` (Late reg).

## Tipografia

- Uma família: Inter (`--font-sans`), carregada do Google Fonts. Pesos 400, 500 e 600.
- Escala: `eyebrow` 11 · `caption` 12 · `small` 13 · `ui` 14 (tabela, sidebar, controles do backoffice) · `body` 15 · `lede` 17 · `h3` 18 · `h2` 24 · `h1` 30 · `hero` 40 · `display` 48. Tamanho fora dela entra primeiro como estilo novo.
- Títulos em peso 500 com tracking levemente negativo (`display`, `hero`, `h1`, `h2`); só `h3` vai a 600.
- `eyebrow` em caixa alta com tracking largo, sempre acima de um título.
- Números de tabela, pontos, OWR e contadores usam `font-variant-numeric: tabular-nums`.

## Espaço, forma e profundidade

- Escala de 4px: `space-1` a `space-8`. Cartão usa `space-4` no celular e `space-5` no desktop; painéis do backoffice `space-6`.
- Cantos suaves, nunca pílula em botão: `radius-md` para botões e inputs, `radius-lg` para cartões, `radius-xl` para janelas, `radius-sm` para badges.
- Bordas antes de sombra: cartões com borda `line` e, no máximo, `shadow-card`. `shadow-panel` só para o que flutua sobre `paper`.
- Tabelas sem zebra: linhas separadas por `line`, cabeçalho em `eyebrow` `ink-muted`.

## Controles

- Botão principal: outline `navy-800` de 1px com texto `navy-800` sobre `card`. No hero, outline `gold` com texto `gold` (principal) e outline `on-navy-muted` com texto `on-navy` (secundário).
- Inputs: fundo `card`, borda `control-border`, `radius-md`, 44px de altura, label `small` `ink-muted` acima.
- Foco: anel sólido de 2px `navy-800` com 2px de folga — 12.6:1 sobre `cream`; no hero, `gold`.
- Segmentos (Em andamento · Agendados · Finalizados) e escolhas de rodada/partida são grupos de botões encostados, borda `control-border`, selecionado em `info-soft`.

## Layout

- Telas públicas são mobile-first; o desktop é a mesma tela em largura maior (até 1120px). O backoffice é só desktop: sidebar `navy-800` de 200px + conteúdo em `cream`.
- Seções de documento: eyebrow `maroon` + régua `line` à direita, título `h2`, parágrafo `ink-muted` de até 620px.

## Iconografia

- Quase sem ícones: o sistema fala com palavras e badges. Onde há ícone (menu, check de confirmação, voltar), use traço fino de 1.5px em `ink` ou `info-ink`, sem preenchimento. Não há conjunto de ícones da marca; um conjunto de traço como Lucide é a substituição mais próxima.
