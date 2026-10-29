Barra do CTA das telas públicas: fixa no rodapé do celular, estática no fluxo a partir de 768px.

**Você fornece:** o `Button block` em `children` e, opcionalmente, `hint` ("R$ 25,00 no balcão · 18 de 24 vagas").

- No celular: `cream` com borda `line` em cima, 16px de margem lateral e a área segura do aparelho (`safe-area-inset-bottom`) somada ao padding.
- O componente já rende um espaçador do tamanho da barra, para o fim do conteúdo não ficar escondido.
- No desktop a barra perde fundo e borda e vira uma linha normal da página; o botão pode deixar de ser `block`.
- Uma barra por tela, com uma ação. Hint com números em tabular.
