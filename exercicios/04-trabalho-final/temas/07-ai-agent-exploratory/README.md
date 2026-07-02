# Tema 7 — AI Agent para Exploratory Mobile

**Trilha:** 🧠 IA aplicada a testes mobile · *(stack trocada de AppAgent/DroidBot — ver enunciado.md)*

## O que é

Soltar um agente de IA pra explorar sozinho o app, tipo um usuário curioso sem roteiro, e reportar
os bugs que acha por conta própria — diferente do tema 6 (que gera 1 teste específico a partir de
uma descrição), aqui é exploração livre, sem saber de antemão o que vai encontrar.

## Como executar

**Caminho principal — Claude Code + Maestro MCP (ferramenta oficial, mantida):**

1. Configurar o servidor MCP do Maestro — ver [docs.maestro.dev/get-started/maestro-mcp](https://docs.maestro.dev/get-started/maestro-mcp).
2. Abrir emulador com o CineFav instalado.
3. Pedir pro Claude Code, em linguagem natural: *"Explore esse app, navegue por todas as telas,
   teste os formulários e botões, e reporte qualquer comportamento estranho ou bug que encontrar."*
4. Deixar rodar (app de ~10-15 telas deve varrer em poucos minutos) e catalogar os achados
   reportados.
5. Pra cada achado, **verificar manualmente** se é bug real ou alucinação/falso-positivo do
   agente — isso é parte do trabalho, não pular essa etapa.

**Bônus (desafio de pesquisa, opcional) — AppAgent ou DroidBot:**
São código acadêmico (papers de 2023), setup pode ser instável (dependências Python específicas,
pode não instalar limpo). Se topar tentar: documentar as dificuldades reais de instalação já vale
como contribuição pro relatório — não é esperado "plug and play".
- [AppAgent — Zhang et al. 2023, arXiv:2312.13771](https://arxiv.org/abs/2312.13771)
- DroidBot: `python -m droidbot -a app.apk -o output -policy llm`

## O que entregar

- Repo/relatório com o log da sessão de exploração (prompt usado + o que o agente fez + achados).
- Lista de bugs/achados, cada um marcado como **confirmado** (reproduziu manualmente) ou
  **descartado** (falso positivo, com explicação do porquê).
- Relatório: comparar com exploração manual — a IA achou algo que um humano não acharia fácil?
  Ou o oposto, deixou passar algo óbvio?

## Fontes

- [Maestro MCP | Agentic UI Testing for Mobile Apps](https://maestro.dev/mcp)
- [Maestro MCP + Claude: AI-Powered Mobile UI Test Automation](https://verygood.ventures/blog/maestro-mcp-claude-mobile-ui-test-automation/)
- [Stop Manual Testing! How Claude Code + Maestro MCP Disrupt App Dev](https://medium.com/@tentenco/stop-manual-testing-how-claude-code-maestro-mcp-disrupt-app-dev-dfd1a2d6425c)
- [AppAgent: Multimodal Agents as Smartphone Users (arXiv)](https://arxiv.org/abs/2312.13771)
