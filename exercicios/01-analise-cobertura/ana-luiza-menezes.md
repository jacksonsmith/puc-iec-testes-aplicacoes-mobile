# Atividade 1 — Análise de Cobertura — Ana Luiza Milani Telles de Menezes

---

## 0. Identificação

- **Aluno:** Ana Luiza Milani Telles de Menezes
- **App escolhido:** Bluesky social-app
- **Repo:** https://github.com/bluesky-social/social-app
- **Justificativa de escolha (1 frase):** Escolhi o Bluesky por ser um aplicativo mobile moderno, multiplataforma e com grande volume de usuários, além de possuir funcionalidades complexas como autenticação federada, moderação de conteúdo e feed em tempo real, permitindo observar práticas reais de testes em um projeto ativo.

---

## 1. Estratégia atual

### 1.1 Tipos de teste + ferramentas

| Tipo                          | Existe?   | Ferramenta                                                      | Onde fica                               |
| ----------------------------- | --------- | --------------------------------------------------------------- | --------------------------------------- |
| Unit / Integração             | Sim       | Jest 29 + jest-expo + @testing-library/react-native             | `__tests__/` e co-localizados em `src/` |
| UI nativo                     | Não       | —                                                               | —                                       |
| E2E cross-platform            | Sim       | Maestro (YAML)                                                  | `__e2e__/`                              |
| Performance                   | Sim       | Maestro + Flashlight                                            | `__e2e__/perf-test.yml`                 |
| Linting estático / a11y       | Sim       | ESLint com plugins `react-native-a11y`, `react-hooks`, `lingui` | toda a base de código                   |
| Verificação de tipos          | Sim       | TypeScript 5.9 (`pnpm typecheck`)                               | toda a base de código                   |
| Lint de código nativo         | Sim       | SwiftLint (iOS) + ktlint (Android)                              | `./modules`                             |

**Notas:**
- Os testes Jest usam o preset `jest-expo/ios`, simulando o ambiente iOS por padrão.
- O `package.json` exclui explicitamente `__e2e__/` da suíte Jest via `modulePathIgnorePatterns`, indicando separação deliberada entre testes unitários e E2E.

### 1.2 CI / CD

| Workflow                            | Quando roda                   | O que testa / faz                                                   |
| ----------------------------------- | ----------------------------- | ------------------------------------------------------------------- |
| `lint.yml`                          | PR e push em `main`           | ESLint, Prettier, TypeScript — e job separado que executa pnpm test |
| `golang-test-lint.yml`              | PR e push em `main`           | Build + testes do servidor Go (`bskyweb/`)                          |
| `build-and-push-ogcard-aws.yaml`    | Push em `main` + manual       | Build e deploy de imagem Docker para AWS ECR                        |
| `pull-request-comment.yml`          | Comentários em Issues/PRs     | Automação relacionada ao fluxo de Pull Requests                     |

**Observação geral:** A análise do `lint.yml` revelou que ele contém dois jobs distintos: `linting` (ESLint, Prettier, TypeScript) e `testing`, que executa `NODE_ENV=test pnpm test --forceExit` em todo PR e push em `main`. Os testes unitários Jest, portanto, estão integrados ao CI. Os testes E2E com Maestro, por outro lado, não foram identificados nos workflows públicos analisados, sugerindo ausência de integração explícita ao CI.

### 1.3 Cobertura

- [ ] Badge no README → —
- [ ] Workflow gera coverage → — (o script `test-coverage` existe no `package.json`, mas não é executado em CI)
- [x] Não há cobertura pública

---

## 2. Gaps (2)

### Gap 1: Cobertura limitada de cenários críticos de uso

- **O que falta:** Embora existam testes automatizados, não foram identificados testes específicos para cenários como falha de rede, perda de conexão, sincronização de conteúdo e comportamento em condições adversas.
- **Risco:** Como o Bluesky depende de atualização contínua de dados e sincronização em tempo real, falhas nesses cenários podem causar inconsistências no feed, atraso de notificações ou comportamento inesperado da aplicação.

### Gap 2: Ausência de testes de acessibilidade em tempo de execução

- **O que falta:** Existe lint estático com `eslint-plugin-react-native-a11y` e a orientação no `CLAUDE.md` de sempre fornecer `label` em elementos interativos, mas não há testes automatizados que validem comportamento de acessibilidade em runtime — como navegação por VoiceOver/TalkBack, contraste de cores ou foco sequencial em modais.
- **Risco:** Componentes como `Dialog`, `Menu` e o feed com rolagem infinita podem ser inacessíveis para usuários com deficiência visual, mesmo passando no lint, podendo limitar a acessibilidade do aplicativo e reduzir a experiência de pessoas que dependem de recursos assistivos.

---

## 3. Melhorias propostas

### Melhoria 1: Expandir cobertura de testes para cenários críticos

- **O que implementar:** Adicionar testes automatizados cobrindo falhas de rede, reconexão, sincronização de conteúdo e respostas inesperadas de APIs, garantindo que esses cenários também façam parte da execução automatizada.
- **Por que primeiro:** Aplicações sociais dependem fortemente de comunicação em tempo real. Cobrir esses cenários reduz risco de regressões em funcionalidades centrais do aplicativo.

### Melhoria 2: Adicionar testes de acessibilidade em runtime nos componentes críticos

- **O que implementar:** Incluir asserções de acessibilidade com `@testing-library/react-native` nos componentes `Dialog`, `Menu` e `Button` (verificando `accessibilityLabel`, `accessibilityRole` e ordem de foco), além de um fluxo Maestro que navegue o app usando gestos de acessibilidade no Android/iOS.
- **Por que segundo:** Depois de mitigar os riscos das regras de negócio críticas e fluxos de rede, o próximo gap de maior impacto é o de acessibilidade. Como a infraestrutura parcial já existe (lint + orientação no `CLAUDE.md`), o esforço adicional em runtime é incremental sobre os componentes que já possuem as labels.

---

## 4. Referências

1. Fowler, M. (2023). *Continuous Integration*. martinfowler.com. Disponível em: https://martinfowler.com/articles/continuousIntegration.html — Fundamenta a importância de executar testes automaticamente a cada integração para garantir feedback rápido e evitar regressões.
2. Google Testing Blog (2015). *Just Say No to More End-to-End Tests*. Disponível em: https://testing.googleblog.com/2015/04/just-say-no-to-more-end-to-end-tests.html — Base para priorizar a integração de testes unitários no CI antes de expandir E2E, seguindo a pirâmide de testes.

---

## 🎁 Bonus (opcional)

### Bonus A — Matriz impacto × esforço

| Melhoria                                       | Impacto (1-5) | Esforço (1-5) | Score (I/E) |
| ---------------------------------------------- | ------------- | ------------- | ----------- |
| Coverage report gerado em CI                   | 3             | 1             | 3.0         |
| Testes de acessibilidade em runtime            | 4             | 3             | 1.33        |
| Expandir testes para cenários críticos de rede | 5             | 3             | 1.66        |

Embora a geração de coverage tenha baixo esforço de implementação, a expansão dos testes para cenários críticos continua sendo a prioridade principal devido ao impacto direto na experiência do usuário.

### Bonus B — Testes além do código

- **CONTRIBUTING.md descreve QA?** Não há `CONTRIBUTING.md` dedicado no repo; orientações de qualidade estão no `CLAUDE.md`, que instrui sobre `testID` em componentes para E2E, `accessibilityLabel` obrigatório e uso correto de TypeScript.
- **SECURITY.md / bug bounty?** Não identificado no repo público.
- **Beta program ativo?**  Sim — distribuição via EAS Build (Expo Application Services) para TestFlight (iOS) e canais beta do Google Play, evidenciado pelos scripts `build-ios` e `build-android` no `package.json`.
- **Crash reporting?** Sim — `@sentry/react-native` está nas dependências de produção, com scripts de upload de sourcemaps (`upload-native-sourcemaps`) configurados.
- **Resumo qualitativo:** O projeto apresenta maturidade operacional (Sentry, EAS, CI com testes unitários), mas ainda existem oportunidades para ampliar a cobertura automatizada em cenários E2E e condições adversas de uso. O crash reporting em produção complementa essa estratégia, porém identifica problemas apenas após chegarem aos usuários.

### Bonus C — Referência acadêmica

- Linares-Vásquez, M., Bernal-Cárdenas, C., Moran, K., & Poshyvanyk, D. (2017). *How do Developers Test Android Applications?* In 2017 IEEE International Conference on Software Maintenance and Evolution (ICSME). IEEE. — Estudo empírico sobre práticas reais de teste em apps Android open source, relevante para contextualizar os gaps encontrados no Bluesky.