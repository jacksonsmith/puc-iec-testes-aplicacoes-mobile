# Atividade 1 — Análise de Cobertura — [Seu Nome]


## 0. Identificação

- **Aluno:** Luiza Monroe de Pádua
- **App escolhido:** Saber - app open-source de notas manuscritas 
- **Repo:** [(https://github.com/saber-notes/saber)]
- **Justificativa de escolha (1 frase):** Escolhi o **Saber** porque e um app real, multiplataforma, passa o criterio de popularidade da atividade, tem testes visiveis e traz riscos interessantes para uma auditoria: escrita/desenho com stylus, arquivos locais, importacao/exportacao, sincronizacao via Nextcloud e comportamento visual em diferentes temas/telas.]

---

## 1. Estratégia atual

### 1.1 Tipos de teste + ferramentas

| Tipo | Evidencias no repo | Observacao |
|---|---|---|
| Unitarios / logica Dart | `test/*_test.dart`, ex.: `base64_codec_test.dart`, `quota_codec_test.dart`, `update_version_comparison_test.dart`, `sentry_filter_test.dart` | Cobrem funcoes utilitarias, codecs, versionamento, filtros de erro e regras de dominio. |
| Widget tests | `test/*_test.dart` com `testWidgets`, ex.: `stylus_test.dart`, `theme_test.dart`, `browse_navigation_test.dart`, `tools_select_test.dart` | Validam interacao de widgets e partes da UI em ambiente Flutter de teste. |
| Golden / regressao visual | `matchesGoldenFile(...)` em `login_golden_test.dart`, `screenshot_goldens_test.dart`, `sbn_test.dart`, `browse_page_test.dart`, `home_theme_test.dart` | Protegem aparencia/renderizacao de telas, temas, fontes e arquivos `.sbn`. |
| Testes de plugin/pacote interno | `packages/onyxsdk_pen/test/onyxsdk_pen_test.dart` e `onyxsdk_pen_method_channel_test.dart` | Cobrem o pacote de suporte a canetas Onyx. |
| Testes de sincronizacao simulada | `nc_upload_download_test.dart` e `nc_deletion_test.dart` | Existem testes para fluxos de Nextcloud, mas dentro de `test/`, aparentemente com mocks/fakes. |

Foram encontrados **54 arquivos Dart de teste** em `test/` e **2 arquivos de teste** em `packages/onyxsdk_pen/test/`. Nao encontrei pastas `integration_test/`, `androidTest/`, `*UITests/`, `.maestro/` ou `__tests__`.

### Ferramentas usadas

O `pubspec.yaml` declara `flutter_test`, `integration_test`, `flutter_lints`, `golden_screenshot` e `sentry_dart_plugin` em `dev_dependencies`. O projeto tambem usa `sentry_flutter`/`sentry_logging`, `nextcloud` e `abstract_sync` como dependencias de producao, o que indica preocupacao com crash reporting/logs e sincronizacao.

### 1.2 CI / CD

O repo usa GitHub Actions em `.github/workflows/`.

| Workflow | Quando roda | O que faz |
|---|---|---|
| `tests.yml` | `pull_request`, `push` em `main`, `workflow_dispatch` | Roda `flutter test --coverage`, gera resultado JSON/JUnit, envia cobertura/resultados ao Codecov, faz `flutter analyze` e checa formatacao com `dart format`. |
| `onyxsdk_pen_tests.yml` | `pull_request`/`push` quando muda `packages/onyxsdk_pen/**`, alem de manual | Roda `flutter test` no pacote `onyxsdk_pen` e analise Dart via action. |
| `android.yml`, `ios.yml`, `linux.yml`, `macos.yml`, `windows.yml` | Principalmente `push` em tags e manual | Faz builds por plataforma, como APK/App Bundle, IPA, Linux, macOS e Windows. |
| `check-flutter-submodule.yml`, `check-rust-version.yml`, `top-issues.yml` | Incluem `schedule` | Automacoes periodicas para submodulo Flutter, versao Rust e triagem/relatorio de issues. |

### 1.3 Cobertura
- [x] Badge no README -> https://codecov.io/gh/saber-notes/saber
- [x] Workflow gera coverage -> `.github/workflows/tests.yml`, comando `flutter test --coverage --no-pub --file-reporter=json:test-results.json`, arquivo enviado `coverage/lcov.info`
- [ ] Nao ha cobertura publica

## 2. Gaps (2)

1. **Falta de E2E/integration tests reais em dispositivo/emulador.**  
   Risco: bugs de fluxo completo, como criar nota, desenhar com stylus, salvar, fechar, reabrir e sincronizar, podem passar nos testes unitarios/widget e falhar no app instalado.

2. **Cobertura limitada de sincronizacao e cenarios offline/conflito.**  
   Risco: como o app promete sincronizar notas entre dispositivos, falhas em perda de rede, conflito de edicao, delecao remota ou credenciais expiradas podem causar perda de dados ou notas inconsistentes.

## 3. Melhorias propostas (1-2)

1. **Prioridade alta: adicionar 2 ou 3 testes de integracao Flutter para fluxos criticos.**  
   Primeiro isso porque cobre o maior risco percebido pelo usuario: criar uma nota, escrever/desenhar, salvar, reabrir e confirmar que o conteudo continua correto. O projeto ja declara `integration_test`, entao ha um caminho tecnico natural.

2. **Prioridade media: criar testes direcionados para sincronizacao com falhas controladas.**  
   Depois disso, eu cobriria Nextcloud/offline/conflitos com fakes ou um servidor de teste controlado no CI, porque sincronizacao e uma area de alto impacto, mas tende a exigir mais infraestrutura.

## 4. Referências

1. Flutter Docs - *Integration testing concepts*: https://docs.flutter.dev/cookbook/testing/integration/introduction/  
2. GitHub Docs - *Workflows*: https://docs.github.com/en/actions/concepts/workflows-and-actions/workflows  
3. Repository evidence - Saber GitHub repo: https://github.com/saber-notes/saber


## 🎁 Bonus (opcional, não afeta nota base)

### Matriz impacto × esforço
| Melhoria | Impacto | Esforco | Prioridade |
|---|---:|---:|---|
| Testes de integracao para fluxo criar-desenhar-salvar-reabrir | Alto | Medio | 1 |
| Testes de sincronizacao com falhas/offline/conflitos | Alto | Alto | 2 |

