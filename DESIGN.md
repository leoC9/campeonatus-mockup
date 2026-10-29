# DESIGN.md — Eternacamp (Eternatus Card House)

> Brief de design do projeto. O livro da marca completo (tom de voz, cor, controles, layout) está em
> [`ds/README.md`](ds/README.md); os valores que o código usa estão em `app/globals.css`.
> Ordem de leitura: tokens no código → este arquivo → `ds/README.md`.

## 1. Product truth
- **Usuários:** lojista de TCG no balcão (backoffice, desktop) e jogadores da loja (vitrine, inscrição e standings, no celular).
- **Propósito:** a loja roda campeonatos (Liguinha, GLC, pré-release) e mantém a base de jogadores sem planilha.
- **Restrições:** logo colorido só sobre `cream`/`paper`; português do Brasil com o vocabulário da mesa (Standings, Bo3, OWR, drop); telas públicas mobile-first, backoffice só desktop.
- **Sucesso:** jogador se inscreve em três campos; lojista reporta a rodada sem procurar nada.
- **Conteúdo real:** nomes de eventos, formatos e preços da loja. Nada de métrica ou depoimento inventado.

## 2. Design Read e superfícies
Lendo assim: o sistema do Eternacamp para lojistas e jogadores de TCG, linguagem de balcão de loja (creme quente, azul-marinho de estrutura, bordô e dourado do logo), em Next 16, Tailwind v4 e shadcn/Radix.

| Superfície | Tipo | V | M | D |
|---|---|---|---|---|
| Backoffice (campeonatos, rodadas, jogadores) | operate | 3 | 2 | 7 |
| Vitrine pública (eventos, inscrição, standings) | operate | 4 | 2 | 5 |
| Site da loja (hero, próximos eventos) | persuade | 5 | 3 | 4 |

## 3. Direção visual e proibições
- Bordas antes de sombra; cantos suaves, nunca pílula em botão.
- Botões sempre em outline; nenhum fundo sólido.
- O único campo escuro das telas públicas é o `Hero`.
- **Exceção ao catálogo, com motivo:** o eyebrow acima do título é padrão da marca porque carrega dado (data e hora do evento, nome da liga, rótulo de painel), nunca enfeite como "NOVO" ou "INTRODUCING".
- **Exceção ao catálogo, com motivo:** uma família só (a fonte Inter) em todo o sistema; o contraste vem de peso e tamanho. É superfície de operação, densa, onde uma display com personalidade atrapalharia a leitura.

## 4. Tokens de cor

```design-tokens
fonts: Inter
colors: #e7e3d8, #f7f4ed, #fcfbf8, #dedad0, #8f8a7c, #141d3e, #1d2a56, #2b3a6e, #424773, #1c2344, #5b5f70, #7c2934, #c8903a, #8a5d17, #f3e6cc, #5c6270, #e6e8ec, #7d4a2a, #efdfd3, #b9bfd6, #d9e1ee, #2f3f75, #f5d0d8, #8a2436, #eae9e5, #5f5e5a
radii: 0, 6px, 8px, 12px, 16px, 999px
```

O `npm run ds:build` falha se este bloco divergir de `ds/tokens.json`. Papéis e notas de uso de cada cor estão em `ds/tokens.json` e em `ds/README.md` (seção Cor). Contraste conferido: todo par de texto passa AA; o mais justo é `gold-deep` sobre `gold-soft` (4.65:1).

## 5. Tipografia
- Família: a fonte Inter, pesos 400, 500 e 600.
- Escala (`type-*` no `globals.css`): eyebrow 11 · caption 12 · small 13 · ui 14 · body 15 · lede 17 · h3 18 · h2 24 · h1 30 · hero 40 · display 48 · stat 32.
- Nenhum `text-[Npx]` solto nos componentes: tamanho novo entra como estilo na escala.
- Títulos com `text-balance`; ledes e descrições com `text-pretty`.

## 6. Espaço e layout
- Escala de 4px: `space-1` a `space-8` (4 · 8 · 12 · 16 · 24 · 32 · 48 · 64).
- Conteúdo até 1120px; texto até 620px.

## 7. Componentes
- Raio por papel: badge `radius-sm` 6 · botão e input `radius-md` 8 · cartão `radius-lg` 12 · janela `radius-xl` 16.
- Sombra só `shadow-card` (cartão) e `shadow-panel` (o que flutua).
- Alvo de toque: 44px nos controles das telas públicas (botão `md`, input, segmentos abaixo de `md`).
- Kit: shadcn sobre Radix, em `components/ui`; identidade em `components/eternatus`.

## 8. Movimento
Só troca de cor em hover e foco (`transition-colors`), e a barra de progresso; tudo com `motion-reduce`.

## 9. Imagem e conteúdo
Sem ilustração nem foto de banco. O logo é o único asset da marca. Voz em `ds/README.md`.

## 10. Faça / Não faça
| Faça | Não faça |
|---|---|
| Status em `Badge` com palavra | Cor sozinha dizendo o estado |
| Valores em reais só onde o jogador paga | Crédito ou valor na tabela pública |
| Um botão `primary` por tela | Emoji em botão, badge ou lista |

## 11. Decision log
- **2026-10-28 · Estilo `ui` (14px/20px) na escala.** Tabela, sidebar, toggle e cartão de progresso usavam `text-[14px]` solto, fora da escala. Virou o estilo `type-ui`, documentado em `ds/tokens.json`. Botões passaram a usar `type-body`/`type-small` em vez de 15px/13px soltos.
- **2026-10-28 · Segmentos com 44px no celular.** `Toggle`/`Segmented` tinham 36px, abaixo do alvo de toque, nos filtros da vitrine pública. Ficam 44px abaixo de `md` e 36px no desktop.
- **2026-10-28 · Quebra de linha.** Títulos do `Hero`, `SectionHeading` e `CardTitle` com `text-balance`; textos de apoio com `text-pretty`. O hero deixava "quinta-feira." sozinho na 2ª linha.

## 12. Referências
- DS publicado: https://claude.ai/code/artifact/83624133-8752-4305-a3d1-efef319a8d42
- Fluxo repo → artifact: [`ds/WORKFLOW.md`](ds/WORKFLOW.md)
