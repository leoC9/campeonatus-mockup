Relógio da rodada no backoffice: mm:ss grande, Iniciar/Pausar, −1 min, +1 min e Ajustar.

**Você fornece:** `durationSeconds` (o que falta), `running`, e as callbacks `onStart`, `onPause`, `onChange(seconds)`, `onAdjust`.

- Só exibe: quem conta o tempo e guarda o estado é a tela. ±1 min chama `onChange` com o novo total; "Ajustar" chama `onAdjust` para a tela abrir um `Dialog` com o tempo exato.
- Display em `display` 48px com algarismos tabulares; `Badge` ao lado diz "Em andamento" ou "Pausado".
- Em 0, o display fica `danger-ink` e a `Badge` diz "Tempo esgotado"; Iniciar e −1 min desabilitam.
- Botões de 44px: a ação principal em `primary`, as outras em `secondary`.
