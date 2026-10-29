Imagem do evento ou logo da loja: soltar ou clicar para escolher, preview, "Trocar" e "Remover".

**Você fornece:** `onChange(file | null)`, e opcionalmente `label`, `accept`, `maxSizeMb`, `src` + `fileName` (imagem já salva), `error`.

- Área tracejada `control-border` sobre `card`, 140px; ao arrastar por cima, fundo `info-soft`.
- A restrição fica escrita ("PNG ou JPG até 2 MB"). Tipo ou tamanho fora disso: o componente não troca a imagem e mostra o erro em `danger`.
- Com imagem: preview até 160px de altura, nome do arquivo e as ações em `secondary` de 44px.
- `error` vinda da tela (servidor recusou) usa o mesmo lugar. O `<input type="file">` fica acessível por teclado.
