Abas encostadas, no desenho do `Segmented`, para trocar o conteúdo de uma tela (Rodadas · Standings · Jogadores).

**Você fornece:** `Tabs` (`defaultValue` ou `value`+`onValueChange`), `TabsList` com `TabsTrigger value` e um `TabsContent value` para cada aba.

- Aba ativa em `info-soft`/`info-ink` e peso 500; borda `control-border` no grupo, divisórias `line`.
- 44px de altura no celular, 36px no desktop. Até cinco abas; a lista rola na horizontal se faltar espaço.
- Setas do teclado trocam de aba; o conteúdo recebe o foco com Tab.
- Diferença para `Segmented`: `Segmented` filtra ou escolhe um valor; `Tabs` mostra outro conteúdo.
