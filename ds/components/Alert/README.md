Aviso em linha, no par fundo/texto do status, sempre com palavra.

**Você fornece:** `tone`, `title`, o texto em `children`, e opcionalmente `icon` (traço da Lucide) e `action` (`Button variant="link"` ou `size="sm"`).

- `info` — confirmação, próximo passo, aviso do evento. Confirmação usa `info` com o ícone de check: não há tom de sucesso nem verde no sistema.
- `warn` (`gold-soft`/`gold-deep`) — atenção: late reg, prazo apertado.
- `danger` — erro ou pendência que trava: falta reportar, inscrição recusada. Tem `role="alert"`.
- `neutral` — nota sem urgência: evento fechado, regra da casa.
- Título em `body` peso 500, texto em `small`; a borda é o próprio tom a 20%.
