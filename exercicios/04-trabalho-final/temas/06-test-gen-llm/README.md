# Tema 6 — Test Generation com LLM

**Trilha:** 🧠 IA aplicada a testes mobile

## O que é

Usar IA (tipo Claude) pra escrever testes automaticamente a partir de uma descrição em português
do que o app deve fazer.

## Como executar

1. Escreva 5-10 user stories curtas do CineFav em português (ex.: "Como usuário, quero buscar um
   filme e ver o resultado na lista").
2. Monte um prompt estruturado (few-shot: dê 1-2 exemplos de user story → flow Maestro YAML antes
   de pedir o novo) — ver conteúdo da Aula 6 sobre prompt engineering.
3. **Se não tiver acesso à API paga da Claude:** use Claude Code (chat/agêntico) via MCP com
   Maestro em vez de chamada de API direta — mesmo resultado, sem custo por token.
   Ver [Maestro MCP + Claude](https://verygood.ventures/blog/maestro-mcp-claude-mobile-ui-test-automation/).
4. Gere o flow, **rode de verdade** (não aceite sem rodar), corrija manualmente o que a IA errou.
5. **Meça a taxa de acerto:** de N flows gerados, quantos rodaram sem edição? Quantos precisaram
   de ajuste pequeno vs reescrita quase total?

## O que entregar

- Repo com os prompts usados + os flows gerados (antes e depois da correção manual, se houve).
- Tabela/planilha com a taxa de acerto medida (não estimada de olho).
- README explicando o pipeline (user story → prompt → flow → validação).
- Relatório: catalogar os erros mais comuns da IA (alucinação de seletor? erro de sintaxe YAML?
  step faltando?) — isso é o insight que vale nota, não só "funcionou".
  Formato/entrega: usar o template obrigatório [`template-relatorio.md`](../../template-relatorio.md) — ver "Entrega" no enunciado principal.

## Fontes

- [Maestro MCP + Claude: AI-Powered Mobile UI Test Automation](https://verygood.ventures/blog/maestro-mcp-claude-mobile-ui-test-automation/)
- [Claude Code for React & React Native — Cars24 Engineering Blog](https://medium.com/cars24/claude-code-for-react-react-native-workflows-that-actually-move-the-needle-33b8bb410b14)
- [Maestro MCP Server — docs oficiais](https://docs.maestro.dev/get-started/maestro-mcp)
