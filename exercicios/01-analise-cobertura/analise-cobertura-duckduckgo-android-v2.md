# Atividade 1 — Análise de Cobertura — 

---

## 0. Identificação

- **App escolhido:** DuckDuckGo Android
- **Repo:** https://github.com/duckduckgo/Android
- **Justificativa de escolha:** App de privacidade com arquitetura multi-módulo em Kotlin cujos módulos de segurança (VPN, tracker-blocking, malicious-site-protection) exigem cobertura rigorosa para garantir as promessas de privacidade feitas ao usuário.

---

## 1. Estratégia atual

### 1.1 Tipos de teste + ferramentas

| Tipo                          | Existe?   | Ferramenta                                              | Onde fica                                      |
| ----------------------------- | --------- | ------------------------------------------------------- | ---------------------------------------------- |
| Unit                          | Sim       | JUnit 4/5 + Mockito-Kotlin + Turbine + Robolectric      | `*/src/test/` em cada módulo                   |
| UI nativo                     | Sim       | Espresso + AndroidJUnit Runner + MockWebServer          | `*/src/androidTest/` + `app/androidTest/`      |
| E2E cross-platform            | Sim       | Maestro CLI / Maestro Cloud                             | `.maestro/` na raiz                            |
| Outros (perf)                 | Sim       | Android Macrobenchmark (Gradle Profiling)               | `build-benchmarks/` + `traces/`                |
| Outros (lint/estático)        | Sim       | Android Lint + Spotless (ktfmt)                         | `lint-rules/` + `lint-baseline.xml`            |
| Outros (a11y)                 | Não       | —                                                       | —                                              |
| Outros (snapshot/screenshot)  | Não       | —                                                       | —                                              |


### 1.2 CI / CD

| Workflow                        | Quando roda               | O que testa                                                  |
| ------------------------------- | ------------------------- | ------------------------------------------------------------ |
| `ci-checks.yml`                 | PR (synchronize / ready)  | Unit tests + Lint + Spotless — gate obrigatório              |
| `build-debug-apk.yml`           | PR                        | Compilação debug (smoke build)                               |
| `nightly-orchestrator.yml`      | Nightly (agendado)        | Testes instrumentados pesados + benchmarks                   |
| `release_tests.yml`             | Ad-hoc / release candidate| E2E Maestro Cloud sobre APK de release                       |
| `build-fdroid-apk.yml`          | Push `develop` + PRs      | Build sabor F-Droid (sem Google Play Services)               |
| `release_orchestrator.yml`      | Manual / tag              | Pipeline completo de release (build + sign + deploy)         |
| `release_upload_internal.yml`   | Pós-release orchestrator  | Upload Internal track + Firebase App Distribution            |


### 1.3 Cobertura

- [ ] Badge no README → —
- [ ] Workflow gera coverage → nenhum step de JaCoCo/Kover identificado nos workflows públicos
- [x] Não há cobertura pública

---

## 2. Gaps (2)

### Gap 1: Ausência de testes de acessibilidade (a11y)

- **O que falta:** Nenhuma suíte de testes automatizados de acessibilidade foi encontrada.
- **Risco:** Regressões silenciosas em contraste, tamanho de toque e rótulos de conteúdo podem tornar o app inacessível para usuários com deficiência visual ou motora sem que nenhum pipeline detecte — violando diretrizes WCAG.

### Gap 2: Testes E2E (Maestro) não bloqueiam merge em PR

- **O que falta:** Os testes Maestro de release são executados apenas sob demanda (`release_tests.yml` ad-hoc) ou nightly, sem um gate automático em cada PR para fluxos críticos como busca, navegação privada, bloqueio de tracker e VPN.
- **Risco:** Uma mudança que quebra o fluxo principal de navegação pode ser mergeada e integrada, só sendo detectada horas depois no nightly — aumentando o custo de reversão e podendo chegar ao release candidate já com defeito.

---

## 3. Melhorias propostas (1-2)

### Melhoria 1: Adicionar testes de acessibilidade automatizados no CI

- **O que implementar:** Habilitar `AccessibilityChecks.enable()` nos testes Espresso existentes (uma linha por módulo de UI) e adicionar passo no `ci-checks.yml` cobrindo ao menos onboarding, busca e configurações de privacidade.
- **Por que primeiro:** Custo praticamente zero (Espresso já está presente, não requer nova ferramenta), impacto alto — cobre requisito legal crescente (European Accessibility Act 2025) e protege usuários que dependem do DuckDuckGo justamente por confiança no produto.

### Melhoria 2 (opcional): Promover smoke E2E para gate de PR

- **O que implementar:** Criar subconjunto de flows Maestro com tag `@SmokeTest` (busca básica, aba privada, verificar tracker bloqueado) e incluí-los no workflow de PR via Maestro Cloud ou emulador hosted; tempo esperado < 5 min.
- **Por que depois:** Requer decisão sobre orçamento de CI e paralelismo no Maestro Cloud, mas entrega o maior retorno em prevenção de regressão de produto antes que o código chegue ao usuário.

---

## 4. Referências

1. Cohn, M. (2009). *Succeeding with Agile: Software Development Using Scrum*. Addison-Wesley — origem do modelo da pirâmide de testes, que fundamenta a análise de proporção entre unit/UI/E2E apresentada neste relatório.
2. Google. *Android Testing Fundamentals*. developer.android.com/training/testing — documentação oficial que descreve boas práticas de Espresso, Robolectric, AccessibilityChecks e Android Test Orchestrator, base para identificação dos gaps e ferramentas descritas na seção 1.
