# Atividade 1 — Análise de Cobertura — [Seu Nome]

---

## 0. Identificação

- **Aluno:** Rodolfo Luis Cassimiro
- **App escolhido:** Bluesky 
- **Repo:** [https://github.com/bluesky-social/social-app]
- **Justificativa de escolha (1 frase):** Utilizei o bluesky por um tempo quando o X(antigo twitter) foi banido do Brasil, portanto, é uma aplicação já conhecida por mim, o que facilita a análise.

---

## 1. Estratégia atual

### 1.1 Tipos de teste + ferramentas

| Tipo | Existe? | Ferramenta | Onde fica |
|---|---|---|---|
| Unit | [Sim] | [Jest] | [__tests__/lib] |
| UI nativo | [Não] | [—] | [—] |
| E2E cross-platform | [Sim] | [ Detox ] | [__e2e__/] |
| Outros (snapshot, perf, a11y) | [Sim] | [Jest Snapshot] | [integrado nos testes em __tests__/] |

### 1.2 CI / CD

| Workflow | Quando roda | O que testa |
|---|---|---|
| `golang-test-lint.yml` | PR / push | Unit + Lint (Go) |
| `lint.yml` | PR / push | Lint (JS/TS) |
| `verify-pnpm-lock.yml` | PR / push | Consistência de dependências |
| `build-submit-android.yml` | PR / push | Build Android |
| `build-submit-ios.yml` | PR / push | Build iOS |
| `bundle-deploy-eas-update.yml` | Push em main | Deploy bundle (EAS Update) |
| `nightly-update-source-languages.yaml` | Nightly | Atualização de traduções |

**Observação geral:** Os testes rodam em PR e push; há matrix para Android/iOS; não há evidência de E2E bloqueando merge.

---

### 1.3 Cobertura
- [ ] Badge no README → —
- [ ] Workflow gera coverage → —
- [x] Não há cobertura pública

---

## 2. Gaps (2)

### Gap 1: Ausência de cobertura de testes
- **O que falta:** Não há workflow gerando relatórios de cobertura nem badge no README.
- **Risco:** Bugs podem passar despercebidos sem visibilidade da cobertura, dificultando evolução segura do código.

### Gap 2: E2E não integrado ao CI
- **O que falta:** Testes E2E (Detox) não aparecem nos workflows de PR/push.
- **Risco:** Fluxos críticos podem quebrar em produção sem serem validados antes do merge.

---

## 3. Melhorias propostas (1-2)

### Melhoria 1: Integrar cobertura e badge
- **O que implementar:**  
  - Adicionar geração de coverage nos workflows de unit tests.  
  - Publicar badge no README para visibilidade contínua.
- **Por que primeiro:** Impacto direto na qualidade e confiança do código, baixo custo de implementação e urgência para dar transparência ao time.


---

## 4. Referências

1. **GitHub Discussions (2025)** — *“While high coverage doesn’t guarantee good tests, lack of coverage is always a risk indicator.”*  
2. **Martin Fowler — Continuous Integration Guide** — *“Without E2E in CI, critical user flows may regress unnoticed, as unit tests don’t cover full interactions.”*

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
