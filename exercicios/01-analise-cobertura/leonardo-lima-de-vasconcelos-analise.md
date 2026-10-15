# Atividade 1 — Análise de Cobertura — Leonardo Lima de Vasconcelos

## 0. Identificação

* **Aluno:** Leonardo Lima de Vasconcelos
* **App escolhido:** Saber
* **Repo:** https://github.com/saber-notes/saber
* **Justificativa de escolha:** O Saber foi escolhido por ser um aplicativo Flutter multiplataforma, com suíte de testes organizada, testes visuais e integração contínua pública.

---

## 1. Estratégia atual

### 1.1 Tipos de teste + ferramentas

| Tipo                              | Existe?          | Ferramenta                           | Onde fica                                                  |
| --------------------------------- | ---------------- | ------------------------------------ | ---------------------------------------------------------- |
| Unit                              | Sim              | `flutter_test`                       | `test/` e `packages/onyxsdk_pen/test/`                     |
| UI nativo                         | Não identificado | —                                    | —                                                          |
| E2E cross-platform                | Não identificado | —                                    | —                                                          |
| Outros: widget e regressão visual | Sim              | `flutter_test` e `golden_screenshot` | `test/*_test.dart`, `test/goldens/` e `test/sbn_examples/` |

A pasta principal `test/` possui aproximadamente 188 arquivos, incluindo testes de lógica, widgets, navegação, editor, sincronização, importação e exportação. Também existem testes Golden, que comparam a interface renderizada com imagens de referência.

Embora a dependência `integration_test` esteja declarada no `pubspec.yaml`, não foi identificada uma pasta `integration_test/` com fluxos completos executados em dispositivo ou emulador.

### 1.2 CI / CD

| Workflow                                  | Quando roda                                                | O que testa                                              |
| ----------------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------- |
| `.github/workflows/tests.yml`             | Pull Request, push na `main` e execução manual             | Testes Flutter, cobertura, análise estática e formatação |
| `.github/workflows/onyxsdk_pen_tests.yml` | Pull Request e push com alterações no pacote `onyxsdk_pen` | Testes Flutter e análise estática do pacote              |

**Observação geral:** O workflow principal roda em Pull Requests e executa `flutter test --coverage`, além de enviar os resultados e a cobertura ao Codecov. Os testes principais são executados em Ubuntu, sem uma matriz de dispositivos Android ou simuladores iOS.

### 1.3 Cobertura

* [x] Badge no README → https://codecov.io/gh/saber-notes/saber
* [x] Workflow gera coverage → `.github/workflows/tests.yml`
* [ ] Não há cobertura pública

---

## 2. Gaps

### Gap 1: Ausência de testes E2E em dispositivo

* **O que falta:** Não foi identificada uma suíte de testes que execute fluxos completos do usuário em dispositivo, emulador ou simulador.
* **Risco:** Funcionalidades isoladas podem passar nos testes, mas fluxos reais, como criar, editar, sincronizar e exportar uma nota, podem falhar quando integrados.

### Gap 2: Falta de validação em diferentes plataformas

* **O que falta:** O CI principal executa os testes em Ubuntu, sem evidência de testes funcionais em Android, iOS, Windows, Linux e macOS.
* **Risco:** Problemas relacionados a permissões, sistema de arquivos, compartilhamento, caneta digital ou comportamento específico do sistema operacional podem chegar à produção.

---

## 3. Melhorias propostas

### Melhoria 1: Criar testes de integração para fluxos críticos

* **O que implementar:** Criar uma suíte em `integration_test/` para validar fluxos como criação de nota, edição, desfazer/refazer, salvamento, sincronização, importação e exportação.
* **Por que primeiro:** Esses fluxos representam o uso principal do aplicativo e possuem alto impacto para o usuário. Uma pequena quantidade de testes E2E bem escolhidos pode detectar falhas que testes unitários e de widget não identificam.

### Melhoria 2: Executar testes em plataformas reais ou simuladas

* **O que implementar:** Adicionar ao CI uma matriz reduzida com Android e iOS, priorizando testes de permissões, arquivos, compartilhamento e entrada por caneta.
* **Por que primeiro:** O Saber é multiplataforma e depende de recursos que variam conforme o sistema operacional. A validação em mais de um ambiente reduz o risco de regressões específicas de plataforma.

---

## 4. Referências

1. Fowler, Martin. *The Practical Test Pyramid*. 2018. https://martinfowler.com/articles/practical-test-pyramid.html
2. Flutter Documentation. *Testing Flutter apps*. https://docs.flutter.dev/testing
3. Saber. `pubspec.yaml`, `.github/workflows/tests.yml` e diretório `test/`. https://github.com/saber-notes/saber
