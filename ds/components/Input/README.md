Campo de texto puro: fundo `card`, borda `control-border`, `radius-md`, 44px de altura.

**Você fornece:** os atributos nativos de `<input>` (`value`/`defaultValue`, `onChange`, `type`, `placeholder`) e um nome acessível.

- Em formulário, prefira `TextField`, que já traz label e hint ligados ao campo.
- Use sozinho só quando o rótulo está em outro lugar (busca em cabeçalho de tabela), sempre com `aria-label`.
- `aria-invalid` deixa a borda em `danger-ink`.
