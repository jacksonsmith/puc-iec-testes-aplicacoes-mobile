# Recursos práticos (blog/tutorial/YouTube) — perspectiva React Native

Complementa os papers acadêmicos deste diretório. Os artigos científicos tendem a ser genéricos
(Android nativo, "mobile" em geral); aqui é conteúdo **hands-on, RN-first**, um por tema do
trabalho final. Curado, não é lista bruta de busca — só o que é específico de RN e recente.

> Achado interessante: 2 dos melhores tutoriais de Maestro+RN são do **próprio prof**
> (medium.com/@3jacksonsmith) — já é referência real no assunto, pode citar sem problema.

## 🤖 Automação & Arquitetura

**Tema 1 — Automação Mobile E2E (Maestro)**
- [E2E Testing React Native with Maestro: A Practical Guide](https://dev.to/peakiqofficial/e2e-testing-react-native-with-maestro-a-practical-guide-1g79) (DEV Community)
- [End-to-End Testing in React Native with Maestro — Part 2](https://medium.com/@3jacksonsmith/end-to-end-testing-in-react-native-with-maestro-a-comprehensive-guide-part-2-e32045e5a9ad) (Medium, **Jackson Smith**)
- [Native E2E testing with Expo, React-Native and Maestro](https://medium.com/lingvano/native-e2e-testing-with-maestro-and-expo-14e9e9b0f0fe) (Lingvano)
- [docs.maestro.dev — React Native support](https://docs.maestro.dev/platform-support/react-native) (doc oficial)
- YouTube: [Test Your Entire React Native App with Maestro](https://www.youtube.com/watch?v=YTT346cHcVg) (2024) · [End-to-End Testing tutorial in React Native with Maestro](https://www.youtube.com/watch?v=4X9I-TeQE9s) (2025) · [React Native UI Testing Without the Pain — Maestro Studio](https://www.youtube.com/watch?v=kN8fuEPf20A)

**Tema 2 — Arquitetura de Suíte (Robot/Screenplay)**
- [Mastering Detox for React Native: E2E Testing WebView Logins with Robot Pattern](https://medium.com/@3jacksonsmith/mastering-detox-for-react-native-step-by-step-guide-to-e2e-testing-webview-logins-with-robot-97f7a9898a17) (Medium, **Jackson Smith** — nota: é sobre Detox, adaptar pra Maestro)
- [Screenplay Pattern — Serenity/JS handbook](https://serenity-js.org/handbook/design/screenplay-pattern/) (doc oficial, não é RN-specific mas é a referência canônica)
- [A Journey to Better Automation with the Screenplay Pattern](https://applitools.com/blog/better-automation-screenplay-pattern/) (Applitools blog)

**Tema 9 — Contract Testing (Pact)**
- [Implementing a Consumer-Driven Contract for a React App with Pact and Jest](https://reflectoring.io/pact-react-consumer/) (mais completo, React web mas Jest é o mesmo runner do RN)
- [Stop Breaking My API: A Practical Guide to Contract Testing with Pact](https://medium.com/@mohsenny/stop-breaking-my-api-a-practical-guide-to-contract-testing-with-pact-33858d113386)
- [Getting started with Pact and Consumer Driven Contract Testing](https://dev.to/nevnet99/getting-started-with-pact-and-consumer-driven-contract-testing-with-react-1adl)

## 🧠 IA aplicada a testes

**Tema 5 — Visual AI**
- [Screenshot Testing Storybook for React Native with Applitools](https://medium.com/@gytis.vinclovas/screenshot-testing-storybook-for-react-native-with-applitools-47ce2e4ad0d2) (Medium — o mais RN-specific que existe)
- [wix-incubator/rnsst — React Native Storybook Screenshot Tests with Applitools](https://github.com/wix-incubator/rnsst) (repo real, Wix)
- Nota: cobertura RN de Applitools é limitada — a maioria do material deles é React web, avisar o grupo que vai adaptar.

**Tema 6 — Test Generation com LLM**
- [Maestro MCP + Claude: AI-Powered Mobile UI Test Automation](https://verygood.ventures/blog/maestro-mcp-claude-mobile-ui-test-automation/) (Very Good Ventures — RN shop conhecida)
- [Claude Code for React & React Native: Workflows That Actually Move the Needle](https://medium.com/cars24/claude-code-for-react-react-native-workflows-that-actually-move-the-needle-33b8bb410b14) (Cars24 Engineering Blog — caso real de empresa)
- [Stop Manual Testing! How Claude Code + Maestro MCP Disrupt App Dev](https://medium.com/@tentenco/stop-manual-testing-how-claude-code-maestro-mcp-disrupt-app-dev-dfd1a2d6425c)
- Nota: MCP (Model Context Protocol) é a peça nova aqui — vale explicar antes do grupo usar.

**Tema 7 — AI Agent Exploratory**
- Sem achado RN-specific — AppAgent/DroidBot são Android puro (leem árvore de view nativa, não
  componente RN). Grupo vai precisar tratar o app como caixa-preta Android normal aqui — **isso é
  esperado, não é lacuna do material**, é a natureza da ferramenta.

## ⚡ Performance & Segurança

**Tema 3 — Performance**
- [React Native Performance tactics: Modern strategies and tools](https://blog.sentry.io/react-native-performance-strategies-tools/) (Sentry Blog — empresa real, ferramenta real)
- [Performance Overview — React Native docs](https://reactnative.dev/docs/performance) (oficial)
- [Improve Your React Native App Performance With a Few Tricks](https://www.callstack.com/ebooks/the-ultimate-guide-to-react-native-optimization) (Callstack — consultoria RN de referência no mercado)
- Dado real: New Architecture + Hermes corta cold start em ~40% (fonte: agregado de migrações 2025-2026)

**Tema 4 — Security**
- [Securing React Native Mobile Apps with OWASP MAS](https://owasp.org/blog/2024/10/02/Securing-React-Native-Mobile-Apps-with-OWASP-MAS) (**blog oficial OWASP**, out/2024 — a melhor fonte do lote todo)
- [OWASP Mobile Top 10 for React Native Fintech Apps: Practical Implementation Checklist](https://dev.to/fasthedeveloper/owasp-mobile-top-10-for-react-native-fintech-apps-a-practical-implementation-checklist-3hle)
- [Securing React Native Applications: Minimize Security Risks](https://blog.jscrambler.com/securing-react-native-applications/) (Jscrambler — vendor mas conteúdo técnico sólido)
- Achado real: bundle JS extraível/decompilável é o ataque mais citado especificamente contra RN (diferente de Android/iOS nativo) — ponto forte pra puxar no relatório do grupo.

## 🏗️ Qualidade & Pipeline

**Tema 8 — CI/CD**
- [CI/CD pipeline for React Native apps: Fastlane + GitHub Actions — Parte 1 (conceitos)](https://medium.com/@malikchohra/ci-cd-pipeline-for-react-native-apps-use-fastlane-and-github-actions-40f9ad2036d0) e [Parte 2 (implementação)](https://medium.com/@malikchohra/ci-cd-pipeline-for-react-native-apps-use-fastlane-and-github-actions-dcf101edc423)
- [From days to minutes: Build and publish RN apps using Fastlane and GitHub Actions](https://dev.to/dvmhmdsd/from-days-to-minutes-build-and-publish-react-native-apps-using-fastlane-and-github-actions-5107) (caso real: 20+ apps white-label, resultado quantificado)
- [Setting up CI/CD for React Native (Expo) with Fastlane](https://mausic.me/blog/react-native/fastlane-to-react-native)

**Tema 11 — Mutation Testing (Stryker)**
- [stryker-mutator.io — guia oficial React/Jest](https://stryker-mutator.io/docs/stryker-js/guides/react/) (fonte primária, usar como base)
- [Mutants, Mutants everywhere! Have we "J"est the Mutants?](https://dev.to/giannispapadakis/mutants-mutants-everywhere-have-we-jest-the-mutants-ic4)
- [How to Configure Mutation Testing with Stryker](https://oneuptime.com/blog/post/2026-01-25-mutation-testing-with-stryker/view) (jan/2026, recente)

## 🔍 Manual, Exploratório & Acessibilidade

**Tema 10 — Accessibility**
- [Accessibility — React Native docs](https://reactnative.dev/docs/accessibility) (oficial, base)
- [How to Test React Native Apps for Accessibility](https://oneuptime.com/blog/post/2026-01-15-react-native-accessibility-testing/view) (jan/2026)
- [React Native Accessibility | BrowserStack](https://www.browserstack.com/guide/react-native-accessibility)
- [aryella-lacerda/react-native-accessibility-engine](https://github.com/aryella-lacerda/react-native-accessibility-engine) — lib real pra assertar acessibilidade via React Test Renderer, plugável no Jest/RNTL que o curso já usa

**Tema 12 — Manual → Regressão Automatizada**
- [How to use test charters for effective exploratory testing](https://www.getxray.app/blog/test-charters-exploratory-testing) (Xray)
- [Test Charter Writing for Exploratory Testing: Structure, Heuristics, Session Reports](https://yrkan.com/blog/test-charter-writing/)
- [How I do Session Based Exploratory Testing (SBET)](https://www.rajsubra.com/blog/2018/06/06/sbtm) (relato prático, formato de charter real)
- Dado (BBST): sessão guiada por charter acha **40-60% mais bugs acionáveis** que exploração livre no mesmo tempo — bom dado pro relatório do grupo justificar a Parte A.

## Nota sobre qualidade geral

Diferente do lote de papers acadêmicos (onde achamos revista predatória), esse lote de
blog/tutorial é mais confiável **na prática** porque a maioria vem de: (a) doc oficial da
ferramenta (Maestro, Stryker, React Native, OWASP), (b) empresa real usando em produção (Sentry,
Callstack, Wix, Cars24, Very Good Ventures), ou (c) o próprio prof. Ainda assim, blog de terceiro
≠ paper peer-reviewed — no relatório do trabalho final, usar isso como "evidência de prática de
mercado", não como citação acadêmica (essa vem dos papers da pasta principal).
