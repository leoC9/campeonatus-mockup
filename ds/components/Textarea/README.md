Texto longo (observações do evento, regras da casa): o desenho do `Input` com altura mínima de 96px.

**Você fornece:** os atributos nativos de `<textarea>` (`value`/`defaultValue`, `onChange`, `placeholder`, `rows`) e um nome acessível, normalmente um `Label` com `htmlFor`.

- Fundo `card`, borda `control-border`, `radius-md`; redimensiona só na vertical.
- `aria-invalid` deixa a borda em `danger-ink`; a mensagem vai num `span` ligado por `aria-describedby`.
- Diga o limite no hint quando houver ("Até 280 caracteres.").
