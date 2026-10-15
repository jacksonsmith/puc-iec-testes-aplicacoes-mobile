# Atividade 1 — Análise de Cobertura — Caio Buzinaro Stabile

## 0. Identificação

**Aluno:** Caio Buzinaro Stabile
**App escolhido:** Bluesky social-app
**Repo:** https://github.com/bluesky-social/social-app
**Justificativa de escolha:** App de rede social ativo com 43 milhões de usuários, funciona simultaneamente em iOS, Android e Web com React Native — contexto multiplataforma de alto risco e fluxos críticos (publicação, moderação, DMs, autenticação descentralizada via AT Protocol).

---

## 1. Estratégia atual

### 1.1 Tipos de teste + ferramentas

| Tipo | Existe? | Ferramenta | Onde fica |
|------|---------|------------|-----------|
| Unit | Sim | Jest | `src/**/__tests__/` |
| UI nativo (Android/iOS) |Não|-—-|-—-----|
| E2E cross-platform | Parcial* | Expo (script presente, sem CI) | script `e2e:start` em `package.json` |
| Snapshot / visual | Não | — | — |
| Performance | Sim | Flashlight | `.perf/`, scripts `perf:test:measure` / `perf:test:results` |
| Acessibilidade | Não |------|-----------|
| Security / SAST| Não |-----|-----------|
| Lint / Type check | Sim | ESLint + TypeScript | CI (`yarn lint`, `yarn typecheck`) |

*Infraestrutura E2E parcialmente presente: `testID` props nos componentes (`Feeds.tsx`, etc.) e script `e2e:start`, mas sem workflow de CI que o execute.

**Tamanho estimado da suite de testes:** busca por `describe(` e `it(` no repo indica dezenas de arquivos de teste unitário — ordem de grandeza ~50-100 casos. Sem cobertura numérica pública.

**Dependências de teste identificadas no `package.json`:**
- `jest` — runner de testes
- `@testing-library/jest-native` — removida em PR #9820 (sinal de redução da camada de componentes)
- `@perf-profiler/flashlight` — testes de performance
- Sem `detox`, `@testing-library/react-native` atual, `jest-axe` ou similar

### 1.2 CI / CD

| Workflow | Quando roda | O que testa |
|---|---|---|
| `lint.yml` | PR + push na `main` | ESLint — bloqueia merge |
| `test.yml` (unit + typecheck) | PR + push na `main` | Jest + TypeScript — bloqueia merge |
| `intl` (internacionalização) | Nightly (cron) | Extração e compilação de traduções |
| `perf` (Flashlight) | Manual / nightly | CPU, FPS, memória no Android |
| EAS Build | Push / tag | Gera builds iOS e Android via Expo Application Services |
| `bundle-size.yml` | PR | Monitora tamanho do bundle JS (PR #9647) |

**Observação geral:** Lint e testes unitários rodam em PR e bloqueiam merge — boa prática. No entanto, não há matrix de Android API levels ou versões de iOS. Os testes E2E **não bloqueiam nenhum PR** — pull requests podem ser mergeados sem validação de fluxo real no dispositivo.

### 1.3 Cobertura

- Badge no README: — (não há)
- Workflow gera coverage: não identificado no CI
- ✅ Não há cobertura pública

---

## 2. Gaps

**Gap 1: E2E não automatizado em PRs**
O que falta: Nenhum workflow de CI executa testes de fluxo completo em pull requests, apesar de `testID` props nos componentes e script `e2e:start` já existirem no repo.
Risco: Regressões em fluxos críticos (publicar post, curtir, responder, DMs) podem ser mergeadas silenciosamente e chegar a 43 milhões de usuários antes de qualquer detecção automatizada.

**Gap 2: Sem testes automatizados de acessibilidade**
O que falta: Nenhuma verificação automatizada de acessibilidade no CI, apesar do código usar `accessibilityRole`, `accessibilityLabel` e `accessibilityHint` nos componentes.
Risco: Issues como contraste insuficiente (issue #6321, falha WCAG AA 4.5:1 em botões de novo post e chat) e toasts inacessíveis para leitores de tela (issue #6322) chegam em produção sem barreira, afetando usuários com deficiência visual ou motora.

**Gap 3: Comportamento offline não testado**
O que falta: Nenhum teste cobre o estado de conectividade ruim ou ausente — confirmado pela issue #8359 aberta em maio de 2025, onde o usuário é deslogado ao abrir o app em modo avião.
Risco: Usuários em metrô, avião ou com conexão instável são deslogados ou perdem sessão sem que o time perceba em ambiente de CI (que sempre roda com conectividade plena).

**Gap 4: Sem SAST / verificação de segurança automatizada**
O que falta: Não existe workflow de análise estática de segurança (CodeQL, Snyk ou similar) — política de segurança do projeto é apenas por e-mail (`security@bsky.app`, conforme README).
Risco: Vulnerabilidades introduzidas em dependências ou no código podem passar batidas em todas as camadas de CI antes de atingir produção, num app que lida com autenticação descentralizada e dados de identidade (DID/AT Protocol).

**Gap 5: Sem matrix de plataformas no CI**
O que falta: Os workflows de teste rodam apenas em `ubuntu-latest`, sem matrix de versões Android (API 26, 30, 34) ou iOS (16, 17, 18).
Risco: Bugs específicos de fabricante (Samsung One UI, Xiaomi MIUI) ou de versão de OS passam batidos em CI e são reportados apenas por usuários em produção.

---

## 3. Melhorias propostas

**Melhoria 1: E2E mínimo em PRs com Maestro**
O que implementar: Criar `.github/workflows/e2e.yml` disparado em PRs que execute cenários Maestro cobrindo: autenticação, publicar post, curtir, responder e navegar entre abas. Usar EAS Build para gerar APK de teste no próprio pipeline.
Por que primeiro: Cobre o risco de maior impacto (regressão em fluxo crítico) com esforço médio, aproveitando infraestrutura já presente no repo (`testID` nos componentes, script `e2e:start`). Score impacto/esforço mais alto da lista.

**Melhoria 2: Lint de acessibilidade com eslint-plugin-react-native-a11y**
O que implementar: Adicionar `eslint-plugin-react-native-a11y` ao `.eslintrc` com regras para `accessibilityLabel` obrigatório em elementos interativos, integrando ao workflow de lint já existente.
Por que segundo: Esforço mínimo (plugin de lint, zero infraestrutura nova) e previne acúmulo progressivo de débito técnico de acessibilidade — issues #6321 e #6322 já estão abertas sem resolução.

**Melhoria 3: CodeQL no CI para SAST**
O que implementar: Adicionar workflow `codeql.yml` usando GitHub's CodeQL Action para análise estática de segurança em PRs e push na `main`.
Por que terceiro: Esforço baixo (GitHub oferece CodeQL gratuito para repos públicos), impacto alto para um app que gerencia autenticação descentralizada e tokens de identidade de 43M de usuários.

---

## 4. Referências

1. **Linares-Vásquez, M. et al. (2017)**. "Continuous, Evolutionary and Large-Scale: A New Perspective for Automated Mobile App Testing." IEEE ICSME 2017 — fundamenta a necessidade de E2E contínuo integrado ao pipeline e discute lacunas comuns em cobertura de testes mobile. *(Referência acadêmica)*

2. **Fowler, M. (2018)**. "Practical Test Pyramid." martinfowler.com — fundamenta a distribuição de tipos de teste e o papel do E2E na pirâmide, embasando o Gap 1 e a Melhoria 1. https://martinfowler.com/articles/practical-test-pyramid.html

3. **W3C — WCAG 2.1, critério 1.4.3 (Contrast Minimum, 2018)** — define contraste mínimo de 4.5:1 para texto normal, fundamentando o risco do Gap 2 e a Melhoria 2. https://www.w3.org/TR/WCAG21/

---

## 🎁 Bonus

### Bonus A — Matriz impacto × esforço

| Melhoria | Impacto (1-5) | Esforço (1-5) | Score (I/E) | Prioridade |
|---|---|---|---|---|
| E2E mínimo em PRs (Maestro) | 5 | 3 | 1,67 | 🥇 Alta |
| Lint de acessibilidade (eslint-plugin-react-native-a11y) | 3 | 1 | 3,00 | 🥈 Alta |
| CodeQL SAST | 4 | 1 | 4,00 | 🥇 Alta |

### Bonus B — Testes além do código

- **CONTRIBUTING.md descreve QA?** Não — o arquivo foca em contribuição de código, sem mencionar processo de QA ou testes antes de merge.
- **SECURITY.md / bug bounty?** Sem SECURITY.md dedicado. Política de segurança por e-mail: `security@bsky.app` (mencionado no README — "the entire team will respond promptly").
- **Beta program ativo?** Sim — EAS Build com perfil de distribuição interna referenciado em `docs/build.md`. iOS via TestFlight (mencionado em PR #9856: "Add --what-to-test to iOS submissions").
- **Crash reporting?** Sim — Sentry confirmado em `docs/build.md` (`SENTRY_AUTH_TOKEN`) e Bitdrift (`EXPO_PUBLIC_BITDRIFT_API_KEY`). Ambos opcionais para contribuidores externos, mas ativos na build oficial.
- **Resumo qualitativo:** Pipeline de build e lint maduro para um time pequeno (29 pessoas), mas estratégia de testes funcionais (E2E, acessibilidade, offline, segurança) é incipiente para o tamanho e criticidade do produto.

### Bonus C — Referência acadêmica adicional

**Moran, K. et al. (2018)**. "Automated Reporting of GUI Design Violations for Mobile Apps." IEEE/ACM ICSE 2018 — discute detecção automatizada de violações de UI/acessibilidade em apps mobile, complementando a proposta da Melhoria 2 com embasamento acadêmico sobre ferramentas de lint de interface.
