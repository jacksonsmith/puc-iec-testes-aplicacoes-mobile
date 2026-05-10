# Starters — Testes de Aplicações Mobile (TAM)

Templates iniciais para cada aula.

## Recursos por aula

| Aula | Tema | Setup recomendado |
|------|------|-------------------|
| 1 | Fundamentos + setup | `npx react-native@latest init MyApp` ou `expo` |
| 2 | Manual + Unit | base aula 1 + `jest` + `@testing-library/react-native` + MockK (Android) |
| 3 | Native UI | base aula 2 + Espresso (Android) + XCUITest (iOS) |
| 4 | Maestro | base aula 3 + `curl -Ls "https://get.maestro.mobile.dev" \| bash` |
| 5 | Performance + Security | base + Sentry RN + MobSF (Docker) |
| 6 | IA + CI/CD | base + Claude API + AppAgent + Fastlane |

## Recursos compartilhados

- [`../BIBLIOGRAFIA.md`](../BIBLIOGRAFIA.md) — bibliografia
- [`../exercicios/`](../exercicios/) — atividades com auto-grading

## Pré-requisitos universais

```bash
node --version           # v22+
xcodebuild -version      # 16+
adb --version            # 35+
maestro --version        # latest
```
