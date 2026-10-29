Janela modal sobre a tela: conteúdo `card` com `radius-xl` e `shadow-panel`, título em h3 e ações à direita.

**Você fornece:** `Dialog` (com `open`/`onOpenChange` ou `defaultOpen`), `DialogTrigger` (`asChild` num `Button`), `DialogContent` com `DialogHeader` → `DialogTitle` + `DialogDescription`, o conteúdo e `DialogFooter` com os `Button`.

- Overlay em `navy-950` a 50%; o conteúdo tem 480px no máximo e 16px de margem no celular.
- O botão de fechar (X da Lucide, 44px) fica no canto; `showCloseButton={false}` quando o rodapé já resolve a saída.
- Rodapé: ações à direita no desktop, empilhadas no celular com a principal por último (em cima).
- Título sempre presente: é o nome acessível da janela. Para confirmação destrutiva, use `AlertDialog`.
