# Atividade 1 — Análise de Cobertura — [Seu Nome]

---

## 0. Identificação

- **Aluno:** [Gustavo Martins Pacheco]	
- **App escolhido:** [Bluesky social-app]
- **Repo:** [https://github.com/bluesky-social/social-app]
- **Justificativa de escolha (1 frase):** [Escolhi o Bluesky por ser uma rede social open source, disponível para uso e ativa atualmente, além de utilizar React Native, tecnologia com a qual tenho interesse em ter mais contato.]

---

## 1. Estratégia atual

### 1.1 Tipos de teste + ferramentas

| Tipo | Existe? | Ferramenta | Onde fica |
|---|---|---|---|
| Unit | [Sim] | [Jest] | [`__tests__/`, `package.json`] |
| UI nativo | [Não] | [—] | [—] |
| E2E cross-platform | [Sim] | [Maestro] | [`__e2e__/flows/`, `docs/testing.md`, `package.json` scripts (`e2e:run`)] |
| Outros (snapshot, perf, a11y) | [Sim] | [Snapshot tests / Maestro / Flashlight] | [`src/**/__tests__/`, `__e2e__/`, `docs/testing.md`] |

### 1.2 CI / CD

| Workflow | Quando roda | O que testa |
|---|---|---|
| `lint.yml` | PR / push | lint, typecheck, testes unitários |
| `build-submit-android.yml` | push / release | build Android |
| `build-submit-ios.yml` | push / release | build iOS |
| `nightly-update-source-languages.yaml` | Nightly | atualização de localização (l10n) / internacionalização (i18n) |

**Observação geral (1-2 frases):** [O projeto utiliza GitHub Actions com execuções automáticas em Pull Requests e processos noturnos. Há separação entre workflows de lint, testes e builds Android/iOS, indicando uma pipeline de CI/CD estruturada.]

### 1.3 Cobertura
- [ ] Badge no README → [—]
- [X] Workflow gera coverage → [`package.json`, Jest configuration]
- [X] Não há cobertura pública

---

## 2. Gaps (2)

### Gap 1: [Ausência de testes de segurança]
- **O que falta:** [Não foram encontrados testes automatizados relacionados à segurança e autenticação.]
- **Risco:** [Falhas de autenticação ou exposição indevida de dados podem impactar usuários.]

### Gap 2: [Ausência de testes para cenários offline]
- **O que falta:** [Não há evidências claras de testes simulando perda de conexão ou instabilidade de rede.]
- **Risco:** [Falhas em carregamento de feed, login ou publicação podem ocorrer em situações reais de uso mobile.]

---

## 3. Melhorias propostas (1-2)

### Melhoria 1: [Testes automatizados de segurança]
- **O que implementar:** [Adicionar testes automatizados para autenticação, validação de sessão e tratamento seguro de dados do usuário.]
- **Por que primeiro:** [Falhas de segurança podem impactar diretamente a privacidade e a confiança dos usuários no aplicativo.]

### Melhoria 2 (opcional): [Testes de comportamento offline e rede instável]
- **O que implementar:** [Adicionar testes simulando perda de conexão, instabilidade de rede e recuperação de sessão.]
- **Por que:** [Aplicativos mobile dependem fortemente da estabilidade de rede e esses cenários ajudam a reduzir falhas em produção.]

---
## 4. Referências

1. [PUC Minas IEC — Testes de Aplicações Mobile — Aula 1: Fundamentos de Testes Mobile, MATIAS, Jackson Smith Moisés, 21/05/2026. Slides sobre os conceitos apresentados em aula, incluindo pirâmide de testes mobile (Knott), tipos de testes mobile, estratégias de CI/CD e métricas de qualidade (slides 10–12, 14, 17, 20)]

2. [VERICODE. Pirâmide de testes: como equilibrar unit, integração e E2E para alta performance. Disponível em: https://blog.vericode.com.br/piramide-de-testes/. Acesso em: 27 mai. 2026.]	

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
- [KNOTT, Daniel. Hands-On Mobile App Testing. Pearson, 2015.]
