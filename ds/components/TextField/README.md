Campo de texto com label acima, como no formulário de inscrição por link.

**Você fornece:** `label`, `value`/`defaultValue`, `onChange`, e opcionalmente `hint`, `error`, `placeholder`, `type`, `id`.

- Label em `small` `ink-muted`, sem asterisco; o formulário já diz quantos campos são.
- `hint` explica o porquê do campo ("Usado para o seu histórico na liga.").
- `error` põe a borda do campo em `danger-ink` e a mensagem abaixo, em `small` `danger-ink`, ligada ao campo por `aria-invalid` e `aria-describedby`. A mensagem diz o que fazer ("POPID com 7 dígitos.").
- Formulários públicos pedem no máximo três campos: nome, nickname, POPID.
