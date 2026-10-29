O padrão de confirmação do produto: toda ação que não volta passa por esta janela.

**Você fornece:** `trigger` (um `Button`), `action` (verbo no infinitivo mais o objeto: "dropar rafa.nog da Liguinha #24"), `consequence`, `confirmLabel` (repete o verbo: "Dropar jogador") e `onConfirm`. Opcionais: `cancelLabel` ("Cancelar"), `open`/`onOpenChange`, `defaultOpen`.

- **Título fixo em pergunta:** "Tem certeza que quer <action>?". Não escreva o título na mão; passe só a ação.
- **Descrição é a consequência real:** o que some, o que fica, se dá para desfazer. Nunca "Esta ação não pode ser desfeita" sozinho.
- **Confirmar repete o verbo** ("Dropar jogador", "Excluir campeonato", "Encerrar rodada") em outline `danger-ink`. Cancelar em `secondary`, à esquerda no desktop e embaixo no celular.
- Monta o `AlertDialog`: não fecha ao clicar fora, sem X, foco inicial em Cancelar.
- Use para drop, exclusão, encerrar rodada, fechar inscrições, zerar o relógio. Para formulário em janela (editar inscrição, ajustar o tempo), use `Dialog`; o título vira o verbo no infinitivo mais o objeto ("Ajustar o tempo da rodada").
