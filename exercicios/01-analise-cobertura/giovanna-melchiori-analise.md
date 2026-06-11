# Atividade 1 — Análise de Cobertura — Giovanna Melchiori

---

## 0. Identificação
- **Aluno:** Giovanna Melchiori
- **App escolhido:** Saber
- **Repo:** https://github.com/saber-notes/saber
- **Justificativa:** App de notas que uso no dia a dia — oportunidade de ver como Flutter mobile é testado na prática.

---

## 1. Estratégia atual

### 1.1 Tipos de teste + ferramentas

| Tipo | Existe? | Ferramenta | Onde fica |
|---|---|---|---|
| Unit | Sim | flutter_test | test/ |
| UI nativo mobile | Não | — | sem Espresso / XCUITest |
| E2E cross-platform | Não | — | integration_test no pubspec, sem pasta ativa |
| Snapshot | Sim | Golden tests (flutter_test) | test/ → falhas em test/failures/ |

### 1.2 CI / CD

| Workflow | Quando roda | O que testa |
|---|---|---|
| .github/workflows/tests.yml | PR + push/main | Unit, golden, lint, formatação, coverage |
| .github/workflows/android.yml | PR + push/main | Build APK (sem testes) |
| .github/workflows/ios.yml | PR + push/main | Build IPA (sem testes) |

**Observação:** CI roda em ubuntu-latest sem emulador — builds móveis compilam, mas nenhum teste executa em dispositivo real.

### 1.3 Cobertura
- [X] Badge no README → Codecov público
- [X] Workflow gera coverage → tests.yml com `flutter test --coverage` + lcov.info
- [ ] Não há cobertura pública

---

## 2. Gaps

### Gap 1: Zero testes em dispositivo/emulador móvel
- **O que falta:** Nenhum job com emulador Android (AVD) ou simulador iOS no CI.
- **Risco:** Bugs de toque, permissão e renderização nativa chegam em produção sem detecção.

### Gap 2: Golden tests cegos para renderização mobile
- **O que falta:** Goldens gerados em Linux headless, sem fontes ou DPI de Android/iOS.
- **Risco:** Regressões visuais no editor de manuscrito não são capturadas antes dos stores.

---

## 3. Melhorias propostas

### Melhoria 1: Integration test com emulador Android no CI
- Criar `integration_test/` com smoke test (abrir → criar nota → verificar save) + job com `reactivecircus/android-emulator-runner`.
- **Por que primeiro:** pubspec já tem a dependência; impacto alto, esforço médio. Cobre o gap mais crítico para mobile.

### Melhoria 2: Golden tests em macOS para renderização iOS
- Adicionar job `runs-on: macos-latest` no tests.yml reaproveitando o test.sh e as Apple fonts já baixadas.
- **Por que segundo:** infraestrutura pronta, esforço baixo, fecha o Gap 2 direto.

---

## 4. Referências
1. `.github/workflows/tests.yml` — https://github.com/saber-notes/saber/blob/main/.github/workflows/tests.yml
2. `test.sh` (Docker para golden tests) — https://github.com/saber-notes/saber/blob/main/test.sh

---

## 🎁 Bonus

### Bonus A — Matriz impacto × esforço
| Melhoria | Impacto (1-5) | Esforço (1-5) | Score (I/E) |
|---|---|---|---|
| Integration test + emulador Android | 5 | 3 | 1,67 |
| Golden tests macOS (iOS rendering) | 4 | 2 | 2,00 |

### Bonus B — Testes além do código
- **CONTRIBUTING.md descreve QA?** Sim — *"Your pull request must be covered by tests. All new and existing tests must pass."*
- **SECURITY.md / bug bounty?** Não — sem SECURITY.md nem programa de bug bounty.
- **Beta program?** Releases via App Store + F-Droid; sem TestFlight ou Firebase públicos.
- **Crash reporting?** Não — nenhum Sentry/Crashlytics no pubspec.yaml.
- **Resumo:** Cultura de testes sólida no código (TDD incentivado, Codecov), mas sem nenhuma validação em dispositivo real — principal ponto cego para um app mobile.

### Bonus C — Referência acadêmica
- Linares-Vásquez et al. (2017). *Automated Customizable Bug-Benchmark Generation for Android Testing.* ICSME — discute exatamente a dificuldade de capturar bugs específicos de plataforma mobile sem testes em dispositivo real.
