Número pequeno com botões − e + (vagas, rodadas, mesas), no lugar de digitar.

**Você fornece:** `label`, `value`+`onChange` (ou `defaultValue`), `min`, `max`, `step`, e opcionalmente `hint`, `error`, `disabled`.

- Botões de 44px nas pontas e o campo no meio, encostados num grupo com borda `control-border`; números tabulares.
- Teclado numérico no celular (`inputMode="numeric"`); setas para cima/baixo mudam o valor; o valor nunca sai de `min`…`max`.
- Botão fica desabilitado no limite. Diga o limite no `hint` ("Até 32 jogadores.").
- `error` deixa a borda e a mensagem em `danger`, ligadas ao campo por `aria-describedby`.
