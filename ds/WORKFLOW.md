# Design System — como o repo e o artifact conversam

Este repo é a fonte da verdade do DS **Eternatus Card House**. O artifact de
Design System no claude.ai é gerado daqui e fica somente leitura:

- DS (artifact): https://claude.ai/code/artifact/83624133-8752-4305-a3d1-efef319a8d42
- Componentes: `components/eternatus` (identidade) e `components/ui` (primitivos shadcn/Radix)
- Tokens: `app/globals.css` (valores usados pelo código) e `ds/tokens.json` (os mesmos valores, com notas de uso)

```
tela (artifact Design) ──rascunho──▶ repo (.tsx) ──ds:build──▶ DS (artifact) ──▶ telas
                                         ▲
                                fonte da verdade
```

## O que fica em `ds/`

| Caminho | O que é |
|---|---|
| `README.md` | O livro da marca: tom de voz, cor, tipografia, layout. |
| `tokens.json` | Tokens no formato do artifact. O build falha se divergir do `globals.css`. |
| `entry.ts` | Tudo que o bundle expõe em `window.Eternatus`. |
| `components/<Nome>/README.md` | Regras de uso. A 1ª frase é o resumo do componente. |
| `components/<Nome>/preview.html` | O preview ao vivo. Linha 1: `<!-- @dsCard group="…" height=N -->`. |
| `components/Cover/preview.html` | A capa do DS. |
| `assets/<Grupo>/README.md` | Notas dos assets. As imagens ficam no asset store do artifact. |
| `shims/` | Troca `next/image` e `next/link` por `<img>` e `<a>` no bundle. |

## Comandos

```bash
npm run ds:build   # gera ds-dist/project (bundle.js, bundle.css, index.d.ts, tokens…)
npm run ds:check   # renderiza cada preview com React 18 e salva prints em ds-dist/check/
```

`ds-dist/` não é versionado.

## Promover um componente novo

O componente pode nascer como rascunho numa tela, mas só existe depois de
entrar aqui.

1. Crie o `.tsx` em `components/eternatus` (ou `components/ui` para um primitivo),
   no padrão shadcn: `cn`, `cva` para variantes, Radix para comportamento,
   só tokens da marca nas classes.
2. Exporte em `components/eternatus/index.ts` (ou em `ds/entry.ts`, se for de `ui/`).
3. Crie `ds/components/<Nome>/README.md` e `preview.html` (copie de um vizinho).
4. Confira no app (`npm run dev`), depois `npm run ds:build && npm run ds:check`.
5. Abra um PR. Depois do merge, sincronize (abaixo).

Cuidados para o componente funcionar dentro do artifact:

- O canvas fornece **React 18**: nada de recursos só do 19 (`use()`, `ref` como prop comum, Actions).
- Nada de `next/*` além de `next/image` e `next/link` (que têm shim).
- Classes Tailwind só dentro de `components/`: o CSS do bundle é gerado varrendo essa pasta.

## Sincronizar o artifact

Numa sessão do Claude Code neste repo, na `main` atualizada, peça
**"sincroniza o DS"**. O Claude:

1. roda `ds:build` e `ds:check`;
2. lê a versão publicada do artifact e compara com `ds-dist/project`;
3. publica só os arquivos que mudaram e, por último, o índice
   (`design-system.json`) com `lastChange` dizendo o commit.

Telas já existentes guardam uma cópia do DS: depois de sincronizar, use
"atualizar DS" em cada tela que deve receber a mudança.
