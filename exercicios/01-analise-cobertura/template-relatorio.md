# Atividade 1 — Análise de Cobertura — [Seu Nome]

> **Como usar:** copia este arquivo, renomeia pra `<seu-nome>-analise.md`, preenche os `[...]`. Apaga este aviso no fim.
> **Tamanho alvo:** 1-2 páginas. Direto ao ponto.

---

## 0. Identificação

- **Aluno:** [seu nome completo]
- **App escolhido:** [Immich Mobile / Bluesky / DuckDuckGo Android / Saber / Wikipedia iOS]
- **Repo:** [URL]
- **Justificativa de escolha (1 frase):** [Por quê?]

---

## 1. Estratégia atual

### 1.1 Tipos de teste + ferramentas

| Tipo | Existe? | Ferramenta | Onde fica |
|---|---|---|---|
| Unit | [Sim/Não] | [JUnit / XCTest / Jest / flutter_test] | [path] |
| UI nativo | [Sim/Não] | [Espresso / XCUITest / —] | [path ou —] |
| E2E cross-platform | [Sim/Não] | [Maestro / Detox / —] | [path ou —] |
| Outros (snapshot, perf, a11y) | [Sim/Não] | [especificar] | [path ou —] |

### 1.2 CI / CD

| Workflow | Quando roda | O que testa |
|---|---|---|
| [arquivo.yml] | [PR / push / nightly] | [unit / E2E / lint] |
| [arquivo.yml] | [...] | [...] |

**Observação geral (1-2 frases):** [Roda em PR? Tem matrix Android/iOS? E2E bloqueia merge?]

### 1.3 Cobertura
- [ ] Badge no README → [link ou —]
- [ ] Workflow gera coverage → [path]
- [ ] Não há cobertura pública

---

## 2. Gaps (2)

### Gap 1: [Título curto]
- **O que falta:** [1 frase]
- **Risco:** [o que pode dar errado em produção sem isso — 1 frase]

### Gap 2: [Título]
- **O que falta:** [...]
- **Risco:** [...]

---

## 3. Melhorias propostas (1-2)

### Melhoria 1: [Título]
- **O que implementar:** [bullet point ou 1-2 frases]
- **Por que primeiro:** [justificativa — impacto, custo, urgência]

### Melhoria 2 (opcional): [Título]
- [...]

---

## 4. Referências

1. [Referência 1 — pode ser slide aula, livro, paper, blog técnico]
2. [Referência 2]

---

## 🎁 Bonus (opcional, não afeta nota base)

> Preencha só se quiser ir além. Considerado em arredondamentos.

### Bonus A — Matriz impacto × esforço
| Melhoria | Impacto (1-5) | Esforço (1-5) | Score (I/E) |
|---|---|---|---|
| [...] | [N] | [N] | [N] |

### Bonus B — Testes além do código
- CONTRIBUTING.md descreve QA? [Sim/Não — quote]
- SECURITY.md / bug bounty? [Sim/Não — link]
- Beta program ativo? [TestFlight / Firebase / —]
- Crash reporting? [Sentry / Crashlytics / —]
- Resumo qualitativo (1 frase): [...]

### Bonus C — Referência acadêmica
- [Paper peer-reviewed citado — ex: Linares-Vásquez et al. (2017) ICSME]
