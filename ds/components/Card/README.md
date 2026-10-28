Cartão `card` sobre `cream`: borda `line`, `radius-lg` e no máximo `shadow-card`.

**Você fornece:** o conteúdo, montado com as partes `CardHeader` (eyebrow à esquerda, badge à direita), `CardTitle` (`h3`), `CardDescription` (`small` `ink-muted`), `CardContent` e `CardFooter` (régua `line` acima, preço/vagas à esquerda e ação à direita).

- Padding `space-4` no celular e `space-5` no desktop — já vem no componente.
- `asChild` troca o elemento raiz (por exemplo, `<article>`), como o `EventCard` faz.
- Para evento da vitrine use `EventCard`; `Card` é a base para os demais cartões.
