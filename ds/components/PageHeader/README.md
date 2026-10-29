Cabeçalho de tela do backoffice: eyebrow, título h1, status em `Badge`, metadados com ponto médio e as ações à direita.

**Você fornece:** `title`, e opcionalmente `eyebrow` ("Campeonatos"), `status` + `statusTone`, `meta` (lista de strings) e as ações em `children` (`Button`).

- Título em `h1`; eyebrow em `ink-muted`, porque aqui ele é rótulo de painel, não data de evento.
- `meta` vira "Standard · Suíço 4 · Bo3 · 18 jogadores" em `small` `ink-muted`, números tabulares.
- Um `primary` por tela: a segunda ação é `secondary`. No celular as ações descem para baixo do título.
- Para seção dentro da tela, use `SectionHeading`; para a vitrine pública, `Hero`.
