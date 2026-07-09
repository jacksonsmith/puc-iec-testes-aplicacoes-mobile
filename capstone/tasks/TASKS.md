# Tasks — Trilha Qualidade (Testes)

> Você é o **engenheiro de qualidade** do CineHub. Seu trabalho: escrever testes, **caçar bugs**,
> **identificar problemas de segurança**, medir performance e montar CI. O server (`server/`) sobe
> funcionando e o CI está verde — mas "verde" não quer dizer "correto". Há comportamento errado e
> fraquezas de segurança escondidas atrás do happy-path.

## Como funciona

1. Escolha tasks que **somem pelo menos os pontos exigidos** no `enunciado.md` da disciplina.
2. Comente na Issue pra "pegar". Branch `task/<id>-<seu-login>`, abra **PR** (1 PR = 1 task).
3. O bot comenta a nota mínima (auto-verificável: existe o teste/flow e ele roda). A **qualidade do
   relatório de bug/segurança** é avaliada no Canvas.
4. Apresente no fim (~10 min).

> Sempre rode antes de começar: `cd server && npm install && npm run seed && npm test`.

### Formato das entregas de bug/segurança
- **Teste que reproduz** o problema (em `server/src/__tests__/` ou flow Maestro), **vermelho** contra o server atual.
- **Relatório curto** em `reports/<id>.md`: o que é, como reproduz (passos/payload), impacto, severidade, e correção sugerida. (Não precisa corrigir — quem corrige é a trilha de Engenharia.)

## Catálogo

| ID | Task | Dificuldade | Pts |
|----|------|-------------|-----|
| `qa-unit-jest` | Suíte unit Jest/RNTL (≥70% num módulo) | M | 6 |
| `qa-maestro-e2e` | 5+ flows Maestro de uma jornada | M | 6 |
| `qa-sec-sqli` | Achar e reportar SQL injection | M | 6 |
| `qa-sec-jwt` | Achar e reportar falha de autenticação (JWT) | M | 6 |
| `qa-sec-idor` | Achar e reportar acesso indevido (IDOR) | M | 6 |
| `qa-sec-secret` | Achar e reportar segredo exposto | S | 3 |
| `qa-sec-enum` | Achar e reportar enumeração de usuário | S | 4 |
| `qa-bug-pagination` | Teste vermelho do bug de paginação | S | 2 |
| `qa-bug-search-empty` | Teste vermelho da busca vazia | S | 2 |
| `qa-bug-remove-favorite` | Teste vermelho do favorito removido em excesso | S | 3 |
| `qa-perf-report` | Relatório de performance (cold start/FPS/memória) | M | 5 |
| `qa-visual-ai` | Regressão visual (Applitools/screenshot, 3 viewports) | M | 5 |
| `qa-llm-testgen` | Pipeline de geração de teste via LLM | L | 7 |
| `qa-ci-pipeline` | GitHub Actions matrix + quality gate | M | 5 |
| `qa-contract-graphql` | Contract testing da API GraphQL | M | 5 |
| `qa-a11y` | Auditoria de acessibilidade | M | 5 |

---

## Detalhe das tasks

### `qa-unit-jest` — Suíte unit (M, 6 pts)
Escreva testes unitários (Jest + RNTL no app, ou Vitest no server) cobrindo um módulo de regra de negócio com **≥70% de cobertura**.
- **Entrega:** `__tests__/…`. **Aceite:** suíte verde + cobertura ≥70% no módulo escolhido.

### `qa-maestro-e2e` — Flows E2E (M, 6 pts)
Pelo menos **5 flows Maestro** cobrindo uma jornada (login → lista → detalhe → favoritar → favoritos), com `assertVisible` e ao menos um fragment reutilizável.
- **Entrega:** `flows/*.yaml`. **Aceite:** flows rodam no emulador; sem TODO; fragment usado.

### `qa-sec-sqli` — SQL injection (M, 6 pts)
Audite os endpoints de leitura. **Um deles** monta SQL de forma insegura. Demonstre que dá pra burlar o filtro **e** extrair dados de outra tabela.
- **Entrega:** teste que dispara o payload + `reports/qa-sec-sqli.md`. **Aceite:** payload comprovado (mais linhas que o normal / dado que não deveria vazar); relatório com impacto e correção.

### `qa-sec-jwt` — Falha de autenticação (M, 6 pts)
Investigue como o token é validado. É possível **se passar por outro usuário** sem saber a senha?
- **Entrega:** prova de conceito (token forjado) + `reports/qa-sec-jwt.md`. **Aceite:** PoC vira `me`/recurso de outro usuário; relatório explica a causa-raiz.

### `qa-sec-idor` — Acesso indevido (M, 6 pts)
Procure operações que devolvem ou alteram dados de **outro usuário** sem checar dono.
- **Entrega:** PoC + `reports/qa-sec-idor.md`. **Aceite:** ≥1 operação demonstrada (ler ou escrever em recurso alheio); relatório com severidade.

### `qa-sec-secret` — Segredo exposto (S, 3 pts)
Rode um scan de segredo (gitleaks/trufflehog) **ou** revise o código. Há credencial sensível versionada?
- **Entrega:** evidência (saída do scan/linha) + `reports/qa-sec-secret.md`. **Aceite:** segredo localizado + risco explicado.

### `qa-sec-enum` — Enumeração de usuário (S, 4 pts)
O login deixa descobrir quais e-mails existem? Há limite de tentativas?
- **Entrega:** evidência das respostas distintas + `reports/qa-sec-enum.md`. **Aceite:** diferença observável documentada + correção sugerida.

### `qa-bug-pagination` — Paginação (S, 2 pts)
Algo na paginação de `popularMovies` está errado quando o total não é múltiplo do tamanho da página.
- **Entrega:** teste **vermelho** que prova o erro. **Aceite:** o teste falha contra o server atual e descreve o esperado.

### `qa-bug-search-empty` — Busca vazia (S, 2 pts)
O que a busca retorna para uma query vazia/só espaços? É o que deveria?
- **Entrega:** teste vermelho. **Aceite:** demonstra retorno indevido para query vazia.

### `qa-bug-remove-favorite` — Remoção em excesso (S, 3 pts)
Dois usuários favoritam o mesmo filme; um remove. O que acontece com o outro?
- **Entrega:** teste vermelho com 2 usuários. **Aceite:** prova o efeito colateral entre usuários.

### `qa-perf-report` — Performance (M, 5 pts)
Meça cold start / FPS / memória do app (dumpsys gfxinfo, Instruments, ou Macrobenchmark) e reporte com números.
- **Entrega:** `reports/qa-perf.md` com método + métricas. **Aceite:** ≥3 métricas com como-foi-medido.

### `qa-visual-ai` — Regressão visual (M, 5 pts)
Configure baseline visual (Applitools Eyes ou screenshot do Playwright/Maestro) em **3 viewports** e provoque um diff.
- **Aceite:** baseline + 1 diff detectado documentado.

### `qa-llm-testgen` — Test gen via LLM (L, 7 pts)
Pipeline que gera testes/flows a partir de uma história (Claude API → Jest/Maestro), executa e reporta acerto.
- **Entrega:** script + `reports/qa-llm-testgen.md`. **Aceite:** pipeline roda ponta-a-ponta; reflexão sobre o problema do oráculo + custo.

### `qa-ci-pipeline` — CI (M, 5 pts)
Workflow GitHub Actions com **matrix** (ex.: iOS/Android ou Node versions) + **quality gate** (cobertura/teste bloqueia merge).
- **Aceite:** workflow verde no PR; gate reprova quando deveria.

### `qa-contract-graphql` — Contract testing (M, 5 pts)
Teste de contrato da API GraphQL (schema snapshot + asserts de tipos/campos por operação).
- **Aceite:** quebra de schema é detectada pelo teste.

### `qa-a11y` — Acessibilidade (M, 5 pts)
Auditoria de acessibilidade do app (labels, contraste, ordem de foco, touch target) com ferramenta + checklist.
- **Entrega:** `reports/qa-a11y.md`. **Aceite:** ≥5 achados com referência (WCAG/aria) + severidade.
