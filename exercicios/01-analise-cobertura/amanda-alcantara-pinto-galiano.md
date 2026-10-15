# Atividade 1 — Análise de Cobertura — Amanda Alcantara Pinto Galiano

## 0. Identificação

- **Aluno:** Amanda Alcantara Pinto Galiano
- **App escolhido:** DuckDuckGo Android
- **Repo:** https://github.com/duckduckgo/Android
- **Justificativa de escolha:** O aplicativo foi escolhido por ser um projeto mobile open source ativo, amplamente utilizado e com estrutura pública robusta de testes e CI/CD, permitindo uma análise consistente da estratégia de qualidade mobile.

---

# 1. Estratégia atual

## 1.1 Tipos de teste + ferramentas

| Tipo | Existe? | Ferramenta | Onde fica |
|---|---|---|---|
| Unit | Sim | JUnit / Android Tests | `app/src/test` |
| UI nativo | Sim | Android Instrumentation | `app/src/androidTest` |
| E2E cross-platform | Sim | Maestro | `.maestro` |
| Performance | Sim | Benchmark + Maestro | `build-benchmarks` / `.maestro/performance` |
| Segurança e privacidade | Sim | Fluxos próprios automatizados | `security_tests` / `privacy_tests` |

---

## 1.2 CI / CD

| Workflow | Quando roda | O que testa |
|---|---|---|
| `e2e-maestro.yml` | CI | Testes E2E |
| `e2e-nightly-full-suite.yml` | Nightly | Suíte E2E completa |
| `build-benchmark-nightly.yml` | Nightly | Performance / benchmark |
| `privacy.yml` | CI | Fluxos relacionados à privacidade |
| `release_tests.yml` | Release | Testes antes de publicação |
| `test_workflow.yml` | CI | Validação de workflows |

### Observação geral

O projeto apresenta alta maturidade em CI/CD, com pipelines separados para build, testes E2E, benchmark, privacidade, releases e execuções noturnas. Também foram identificados workflows específicos para Pull Requests e automações contínuas.

---

## 1.3 Cobertura

- [ ] Badge público de cobertura identificado
- [x] Workflows automatizados de testes identificados
- [ ] Cobertura pública explícita não encontrada

Apesar de não existir evidência clara de badge público de coverage, o projeto possui ampla automação de testes integrada ao CI/CD.

---

# 2. Gaps

## Gap 1: Ausência de evidências claras de testes de acessibilidade

- **O que falta:** Não foram encontradas evidências explícitas de testes automatizados de acessibilidade, como validações de TalkBack, navegação assistiva ou verificações específicas de acessibilidade mobile.
- **Risco:** Usuários com deficiência visual ou necessidades assistivas podem enfrentar dificuldades de navegação e utilização do aplicativo, impactando acessibilidade, inclusão digital e experiência do usuário.

---

## Gap 2: Ausência de testes explícitos para conectividade degradada

- **O que falta:** Não foram identificados testes específicos para cenários de perda de conexão, modo offline, alternância de rede ou conectividade instável.
- **Risco:** Em ambientes reais de uso mobile, falhas relacionadas à conectividade podem causar travamentos, inconsistências e degradação da experiência do usuário.

---

# 3. Melhorias propostas

## Melhoria 1: Implementar testes automatizados de acessibilidade

- **O que implementar:** Adicionar validações automatizadas de acessibilidade utilizando ferramentas compatíveis com Android, como Accessibility Scanner e Espresso AccessibilityChecks.
- **Por que primeiro:** A acessibilidade possui alto impacto para inclusão digital e experiência do usuário, além de apresentar baixo esforço de integração ao pipeline já existente.

---

## Melhoria 2: Adicionar testes para conectividade degradada

- **O que implementar:** Criar cenários automatizados e exploratórios simulando redes lentas, perda de conexão, alternância entre Wi-Fi e dados móveis e uso offline.
- **Por que é importante:** Aplicações mobile operam constantemente em cenários de conectividade variável. Validar esses comportamentos reduz riscos reais em produção.

---

# 4. Referências

1. Linares-Vásquez, M.; Moran, K.; Bernal-Cárdenas, C.; Poshyvanyk, D. *Continuous, Evolutionary and Large-Scale: A New Perspective for Automated Mobile App Testing.* IEEE International Conference on Software Maintenance and Evolution (ICSME), 2017.

2. Knott, D. *The Mobile Test Pyramid.* Ministry of Testing, 2014.

3. Fowler, M. *The Practical Test Pyramid.* Martin Fowler Blog, 2018.

---

# Bonus — Matriz impacto × esforço

| Melhoria | Impacto (1-5) | Esforço (1-5) | Score (I/E) |
|---|---|---|---|
| Testes de acessibilidade | 5 | 2 | 2.5 |
| Testes de conectividade degradada | 5 | 3 | 1.6 |

---

# Bonus — Testes além do código

- Existência de pipelines E2E completos com Maestro
- Execuções nightly automatizadas
- Workflows específicos para privacidade e segurança
- Estrutura robusta de automação mobile
- Estratégia alinhada com práticas modernas de QA mobile
