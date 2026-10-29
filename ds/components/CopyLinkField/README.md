O link de inscrição do evento, pronto para copiar, com o estado do link ao lado.

**Você fornece:** `url`, `active` e opcionalmente `label`, `onCopy`.

- URL somente leitura, truncada com reticências; clicar no campo seleciona tudo.
- `Badge` `info` "Ativo" ou `neutral` "Desativado" (`active={false}` deixa a URL em `ink-muted`).
- "Copiar" em `secondary` com 44px; vira "Copiado" por 2 segundos e volta. Lido por leitor de tela (`aria-live`).
- Sem clipboard disponível, o componente seleciona o texto para a pessoa copiar na mão.
