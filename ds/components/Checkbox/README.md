Caixa de 20px para marcar um item ou aceitar uma condição antes de salvar.

**Você fornece:** `checked`+`onCheckedChange` (ou `defaultChecked`), `label` e opcionalmente `description`, `disabled`, `aria-invalid`.

- Borda `control-border` sobre `card`; marcada, `navy-800` com o check da Lucide em `on-navy`.
- A área de toque é de 44px mesmo sem label (o alvo invisível cresce ao redor da caixa).
- Com `label`, o texto inteiro é clicável; sem label, passe `aria-label`.
- `checked="indeterminate"` para "selecionar todos" com parte da lista marcada.
