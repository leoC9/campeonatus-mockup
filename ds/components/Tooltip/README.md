Dica curta ao passar o mouse ou focar: o que significa OWR, o que faz um botão só com ícone.

**Você fornece:** `Tooltip` em volta de `TooltipTrigger asChild` (o controle) e `TooltipContent` com o texto.

- Conteúdo em `navy-800` com texto `on-navy` em caption 12, `radius-md` e `shadow-panel`; seta da mesma cor.
- Uma frase, até 260px de largura. Sem título, sem ação, sem link.
- Só complementa: a informação precisa existir em outro lugar, porque no celular o tooltip não aparece.
- O gatilho precisa ser focável; o tooltip abre no foco do teclado. No app (React 19) use `TooltipTrigger asChild` com `Button`. No canvas do DS (React 18) o `Button` não repassa `ref`, e o tooltip não se posiciona: ali use `TooltipTrigger` direto, com `className`, ou um elemento nativo.
