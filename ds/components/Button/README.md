Botão de ação em outline, do jeito que o Eternacamp usa em todas as telas.

**Você fornece:** `children` (verbo no infinitivo: "Inscrever-se", "Confirmar inscrição"), `onClick`, e opcionalmente `variant`, `size`, `block`, `disabled`.

- `primary` — outline `navy-800` sobre `card`; a ação principal da tela. Uma por tela.
- `secondary` — outline `control-border`, texto `ink` ("Cancelar", "Importar da anterior").
- `link` — ação de linha em tabela ou cartão ("Abrir", "Standings", "Drop").
- `hero` / `hero-ghost` — só dentro de `Hero`, sobre `navy-950`: dourado para a principal, claro para a secundária.
- `block` ocupa a largura toda — use no celular para o CTA do formulário.
- `size="md"` (padrão) — 44px de altura, texto 15: a ação principal e a secundária da tela, no tamanho de toque do celular.
- `size="sm"` — 32px de altura, texto 13: ação de contexto num cabeçalho ou cartão ("Novo campeonato" ao lado do título do painel, a ação de um `Alert`). Nunca o CTA do formulário.

Não use fundo sólido nem pílula; não coloque ícone decorativo.
