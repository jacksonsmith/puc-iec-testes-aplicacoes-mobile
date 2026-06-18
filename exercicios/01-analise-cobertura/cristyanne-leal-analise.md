# Atividade 1 — Análise de Cobertura — Cristyanne de Souza Leal

## 0. Identificação

- **Aluno:** Cristyanne de Souza Leal
- **App escolhido:** Saber
- **Repo:** https://github.com/saber-notes/saber
- **Justificativa de escolha (1 frase):** Escolhi o repositório Saber para realizar testes mobile porque ele é um projeto real,
open source e multiplataforma desenvolvido em Flutter, permitindo analisar cenários próximos aos encontrados no mercado.

---

## 1. Estratégia atual

1.1 Tipos de teste + ferramentas
| Tipo                          | Existe?                       | Ferramenta                      | Onde fica              |
| ----------------------------- | ----------------------------- | ------------------------------- | ---------------------- |
| Unit                          | ✅ Sim                         | `flutter_test`                  | `test/`                |
| UI nativo                     | ❌ Não identificado            | —                               | —                      |
| E2E cross-platform            | ❌ Não identificado claramente | —                               | —                      |
| Outros (snapshot, perf, a11y) | ✅ Sim                         | Golden Tests / screenshot tests | `test/` e pipelines CI |

### 1.2 CI / CD
| Workflow      | Quando roda         | O que testa                                   |
| ------------- | ------------------- | --------------------------------------------- |
| `android.yml` | PR / push / release | build Android, testes automatizados           |
| `ios.yml`     | PR / push / release | build iOS, validação da aplicação             |
| `linux.yml`   | PR / push           | build Linux, testes e empacotamento           |
| `macos.yml`   | PR / push           | build macOS, validação multiplataforma        |
| `windows.yml` | PR / push           | build Windows, testes e geração de instalador |

**Observação geral (1-2 frases):** [Roda em PR? Tem matrix Android/iOS? E2E bloqueia merge?]
O projeto possui pipelines de CI/CD executados principalmente em Pull Requests e pushes, garantindo validação automática de builds e 
testes antes das alterações serem integradas. Há workflows separados por plataforma (Android, iOS, Linux, macOS e Windows), porém não 
há evidência clara de uma estratégia completa de E2E automatizado bloqueando merges.


### 1.3 Cobertura
- [ ] Badge no README → [link ou —]
- [x] Workflow gera coverage → [.github/workflows/]
- [x] Não há cobertura pública

---

## 2. Gaps (2)
### Gap 1: Testes E2E completos
* **O que falta:** Não há evidência clara de testes ponta a ponta automatizados cobrindo fluxos reais do usuário entre telas,
sincronização e exportação.
* **Risco:** Funcionalidades podem funcionar isoladamente, mas falhar durante o uso real da aplicação em produção.

### Gap 2: Testes de performance mobile
* **O que falta:** Não foram identificados testes automatizados de desempenho, consumo de memória ou stress da aplicação Flutter.
* **Risco:** A aplicação pode apresentar lentidão, travamentos ou alto consumo de bateria em dispositivos reais sem detecção prévia.

---

## 3. Melhorias propostas (1-2)
### Melhoria 1: Implementar testes E2E automatizados
* **O que implementar:** Adicionar testes ponta a ponta utilizando ferramentas compatíveis com Flutter para validar fluxos reais como criação de notas, sincronização, exportação e navegação entre telas.
* **Por que primeiro:** Essa melhoria reduz o risco de falhas críticas em produção, garantindo que funcionalidades completas funcionem corretamente em cenários reais de uso.

### Melhoria 2 (opcional): Adicionar testes de performance mobile
* **O que implementar:** Criar testes automatizados para monitorar consumo de memória, tempo de resposta e estabilidade da aplicação em dispositivos mobile.
* **Por que depois:** Isso ajuda a identificar problemas de desempenho antes da publicação, melhorando experiência do usuário e estabilidade da aplicação.

---

## 4. Referências

1. Repositório oficial do projeto Saber no GitHub: https://github.com/saber-notes/saber
2. Documentação Flutter Testing: https://docs.flutter.dev/testing

---

## 🎁 Bonus (opcional, não afeta nota base)

> Preencha só se quiser ir além. Considerado em arredondamentos.

### Bonus A — Matriz impacto × esforço
| Melhoria                               | Impacto (1-5) | Esforço (1-5) | Score (I/E) |
| -------------------------------------- | ------------- | ------------- | ----------- |
| Implementar testes E2E automatizados   | 5             | 3             | 1.67        |
| Adicionar testes de performance mobile | 4             | 3             | 1.33        |
| Adicionar security scanning no CI/CD   | 4             | 2             | 2.00        |



### Bonus B — Testes além do código
* CONTRIBUTING.md descreve QA? Não — não há seção explícita descrevendo processo formal de QA.
* SECURITY.md / bug bounty? Não identificado — https://github.com/saber-notes/saber
* Beta program ativo? —
* Crash reporting? Sentry
* Resumo qualitativo (1 frase): O projeto demonstra boa maturidade técnica em CI/CD e automação, mas possui poucas evidências públicas de
processos formais de QA colaborativo, segurança e programas beta estruturados.


### Bonus C — Referência acadêmica
* Linares-Vásquez, M., Bavota, G., Bernal-Cárdenas, C., Oliveto, R., Di Penta, M., & Poshyvanyk, D. (2017).
*Optimizing energy consumption of GUIs in Android apps: A multi-objective approach*. Proceedings of the IEEE/ACM International
Conference on Software Maintenance and Evolution (ICSME).
