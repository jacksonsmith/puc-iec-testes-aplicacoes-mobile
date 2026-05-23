# Guia de Investigação — como descobrir cada coisa no repo GitHub

> Manual de auditor de QA mobile. Você abre o repo no GitHub e segue os passos abaixo. Cada pergunta do template tem **onde olhar** e **o que procurar**.

> ⚠️ **Para esta oferta (versão simplificada):** foque nas **seções 1-3** (tipos de teste, ferramentas, CI). Seções 4-8 são úteis e cobrem material de bonus do template. **Não precisa fazer tudo.**

---

## 1. Que tipos de teste existem?

### Onde olhar

| Tipo de teste | Como detectar |
|---|---|
| **Unit tests** | Pasta `**/test/`, `**/__tests__/`, `*Tests.swift`, `*Test.kt`, `*.test.ts` |
| **Instrumented / UI tests Android** | Pasta `androidTest/`, arquivos com `@RunWith(AndroidJUnit4)` |
| **UI tests iOS** | Pasta `*UITests/`, arquivos `*UITests.swift` |
| **E2E cross-platform** | Pasta `.maestro/`, `__e2e__/`, arquivos `.yml` ou `.yaml` com flows |
| **Snapshot/visual** | Pasta `__snapshots__/`, `ReferenceImages*/`, libs como `jest-image-snapshot`, `Paparazzi`, `FBSnapshotTestCase` |
| **Performance** | Workflows com nome `benchmark`, `perf`, libs como `Macrobenchmark`, `Flashlight`, `XCTPerformanceMetric` |
| **Accessibility** | `AccessibilityChecks` (Espresso), `XCTest a11y audit`, `jest-axe` |
| **Security/SAST** | `.github/workflows/codeql.yml`, `snyk.yml`, `mobsf.yml` |

### Como contar

No GitHub, vá em **Search this repository** (`/`) e digite:
- `XCTestCase` → conta arquivos com unit tests iOS
- `androidTest` → pasta de instrumented tests Android
- `extends:Suite` → suites JUnit
- `.maestro` → flows Maestro
- `describe(` ou `it(` → unit tests JS/TS

> **Não precisa contar 1 por 1.** Estimativa de ordem de grandeza basta (`~50`, `~200`, `>1000`).

---

## 2. Que ferramentas/frameworks usam?

### Onde olhar

**Android (Kotlin):**
- `app/build.gradle` ou `build.gradle.kts` — procure por dependências `testImplementation` e `androidTestImplementation`
  - Exemplos: `junit:junit`, `org.mockito:mockito-core`, `io.mockk:mockk`, `org.robolectric:robolectric`, `androidx.test.espresso:espresso-core`, `app.cash.turbine:turbine`

**iOS (Swift):**
- `Project.xcodeproj` ou `Project.swift` (Tuist) ou `Package.swift`
- Procure imports nos arquivos de teste: `import XCTest`, `import Quick`, `import Nimble`, `import Cuckoo`
- Test Plans em `Test Plans/` ou `*.xctestplan`

**React Native:**
- `package.json` → seção `devDependencies` e `dependencies`
  - `jest`, `@testing-library/react-native`, `detox`, `@perf-profiler/flashlight`, `jest-axe`
- Scripts `test`, `e2e`, `test:coverage`

### Atalho

Pra cada app, abra o arquivo principal e dê `Cmd+F` por: `test`, `mock`, `spy`, `assert`. Quase tudo aparece.

---

## 3. Tem CI configurado? Quais workflows?

### Onde olhar

Pasta `.github/workflows/` no root do repo. **Cada `.yml` é um workflow** (pipeline rodando em algum evento).

Abra cada arquivo e responda:
- **Quando roda?** (`on: push`, `on: pull_request`, `on: schedule` nightly)
- **O que testa?** (procure `run:` com `gradle test`, `xcodebuild test`, `pnpm test`, `maestro test`)
- **Onde roda?** (`runs-on: ubuntu-latest` / `macos-latest` / `android-large-runner`)
- **Quais OS / API levels?** (procure `matrix:` com versões)

### Sinais de maturidade

- ✅ **PR check** (workflow em `on: pull_request`) = bom, bloqueia merge
- ✅ **Matrix Android API / iOS** = testa múltiplas plataformas
- ⚠️ **Só nightly** = roda 1x por dia, não bloqueia PR (pode mascarar regressões)
- ⚠️ **Build sem testes** = só compila, não valida comportamento
- ❌ **Sem `.github/workflows/`** = sem CI (red flag)

---

## 4. Tem cobertura declarada?

### Onde olhar

1. **README do repo** — procure badges (img.shields.io) tipo `coverage`, `codecov`, `coveralls`
2. **`.github/workflows/*.yml`** — procure `codecov-action`, `coveralls-github-action`, `--coverage`
3. **`build.gradle` / `package.json`** — procure `jacoco`, `kover`, `nyc`, `c8`, `jest --coverage`

### Variações

- ✅ Badge no README com % → cobertura **pública**
- ⚠️ Script `test:coverage` no `package.json` mas **não invocado no CI** → cobertura **só local**, ninguém vê
- ❌ Sem nenhuma menção → **sem cobertura medida**

---

## 5. Que aspectos NÃO são testados (gaps)?

Liste o que **NÃO viu** no repo. Cada ausência é um gap.

### Checklist de gaps comuns em mobile

- [ ] **Accessibility** — TalkBack/VoiceOver não tem teste? Risco: pessoas com deficiência não usam.
- [ ] **Performance regression** — sem benchmark em PR? Risco: regressões de FPS/cold start passam batido.
- [ ] **Visual regression** — sem snapshot tests? Risco: layout quebra em algum device e ninguém percebe.
- [ ] **Security** — sem SAST (CodeQL, Snyk)? Risco: vulnerabilidades introduzidas em deps.
- [ ] **Push / deep links / sensors / câmera** — testes assumem fluxo "ideal"? Risco: features que dependem de OS/hardware falham em prod.
- [ ] **Internacionalização / RTL** — só testa em English? Risco: layout quebra em árabe/hebraico/idiomas longos (alemão).
- [ ] **Modo offline / conectividade ruim** — só testa com WiFi perfeito? Risco: app trava em metrô/avião.
- [ ] **Fragmentação Android** — só testa em 1 device? Risco: bug específico de fabricante (Samsung One UI, Xiaomi MIUI).

> **Você não tem que listar todos.** Escolha 3-5 gaps **mais relevantes pro app específico** que você está auditando.

---

## 6. Como propor melhorias com priorização?

### Matriz impacto × esforço

Pra cada gap, atribua nota 1-5 em:
- **Impacto**: quanto melhora a qualidade do app?
- **Esforço**: quanto trabalho dá pra implementar?

Top 3 melhorias = maior `impacto / esforço`.

Exemplo:

| Gap | Impacto | Esforço | Score | Prioridade |
|---|---|---|---|---|
| Sem accessibility tests | 5 | 2 | 2.5 | 🥇 Alta |
| Sem CI Maestro em PR | 4 | 2 | 2.0 | 🥈 Média |
| Sem benchmark performance | 4 | 4 | 1.0 | 🥉 Baixa |

**Justificativa por escolha:** "Accessibility tem score 5 porque atinge 15% dos usuários (WHO 2023)…" — fundamenta com **dado ou referência**, não opinião.

---

## 7. Testes ALÉM do código (manual, beta, comunidade)

Knott (2014) defende que **40% da pirâmide mobile é manual/exploratório**. Olhar só `.github/workflows/` perde isso. Investigue também:

### Onde olhar evidências de teste manual/estratégico

| Sinal | Onde olhar |
|---|---|
| **Processo QA documentado** | `CONTRIBUTING.md`, `docs/`, `wiki/`, `TESTING.md` |
| **Charters / SBTM** (Session-Based Test Management) | Issues com labels `qa`, `exploratory`, sessões timeboxed |
| **Beta testing program** | README menciona TestFlight, Firebase App Distribution, Play Store Internal Track |
| **Bug bash / bug bounty** | `SECURITY.md`, programa público de bug bounty |
| **Issues abertas** | Aba **Issues** do GitHub — quem reporta, como é triado, label distribution |
| **Real device farm** | README/CI menciona BrowserStack, LambdaTest, Firebase Test Lab, Sauce Labs |
| **Reviews da loja** | Play Store / App Store reviews — sinal de feedback usuário real |
| **Crash reporting** | Menção a Sentry, Crashlytics, Bugsnag (telemetria de produção = "teste em produção") |

### Como detectar (passo a passo)

1. **Abrir `CONTRIBUTING.md`** → procurar seção tipo "How to test", "QA process", "Reviewing PRs"
2. **Abrir aba Issues** → filtrar por label `bug`, `qa`, `test`, `flaky` — ver volume e como são triados
3. **Procurar pasta `docs/`** → muitos repos têm wiki interna com test plans
4. **Abrir Play/App Store** → instala o app, lê reviews recentes — feedback "isso quebrou", "lento", "crash" indica testes manuais que faltam
5. **Procurar mention de cloud farm** em `.github/workflows/` (`firebase-test-lab`, `browserstack`)

### Sinais de **maturidade** em testing strategy

- ✅ **CONTRIBUTING.md descreve teste manual** antes de PR merge
- ✅ **Beta program ativo** (TestFlight build atualizado, Play Internal Track)
- ✅ **Issues bem triadas** (labels, milestones, response time razoável)
- ✅ **Bug bounty / SECURITY.md** com processo claro
- ⚠️ **CI verde mas reviews da loja cheias de crash** = teste automatizado não captura realidade
- ❌ **Sem CONTRIBUTING / SECURITY / docs/** = depende de tribal knowledge

### Exemplo prático

App pode ter:
- ✅ 80% cobertura unit
- ✅ Maestro E2E rodando em PR
- ❌ Zero menção a accessibility manual / beta testing / exploratory charters

→ Conclusão: **estratégia automatizada madura, manual ausente** — gap real.

---

## 8. Referências (≥3, ≥1 acadêmica)

### O que é fonte acadêmica

- ✅ Paper peer-reviewed (ICSME, ICSE, ESEM, IEEE TSE)
- ✅ Livro técnico de editora reconhecida (Pearson, O'Reilly, Manning, Addison-Wesley)
- ⚠️ Blog de engenharia de grande empresa (Airbnb, Google Testing, Spotify) — vale como **complementar**, não como acadêmica
- ❌ Stack Overflow, Reddit, Medium pessoal — não conta

### Refs sugeridas (estão em `material-de-apoio/aula-01/`)

| Ref | Tipo |
|---|---|
| Fowler (2018) *Practical Test Pyramid* | Industry |
| Knott (2014) *Mobile Test Pyramid* | Industry |
| Knott (2018) *3 Steps Mobile Testing Strategy* | Industry |
| **Linares-Vásquez et al. (2017) ICSME** | **Acadêmica ✅** |
| Google Testing Blog (2010, 2015) | Industry |
| ISTQB Foundation Level v4 | Padrão técnico |

> Use Linares-Vásquez como sua fonte acadêmica obrigatória. Os outros como complementares.

---

## Checklist final antes de entregar

- [ ] Escolhi 1 dos 3 apps (ou justifiquei escolha de outro)
- [ ] Cliquei na pasta `.github/workflows/` e listei o que vi
- [ ] Cliquei na pasta de testes principal e estimei tamanho
- [ ] Abri `build.gradle` / `package.json` e identifiquei libs
- [ ] Listei 3-5 gaps **com risco associado**
- [ ] Top 3 melhorias com matriz impacto × esforço
- [ ] 3 refs, sendo ≥1 acadêmica (Linares-Vásquez serve)
- [ ] Entreguei via GitHub + colei link no Canvas
