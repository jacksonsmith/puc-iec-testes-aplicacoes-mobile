# Atividade 1 — Análise Rápida de Cobertura de Testes (15 pts)

**Disciplina:** Testes de Aplicações Mobile
**Entrega:** até **27/05/2026** (quarta-feira, antes da Aula 2)
**Modalidade:** individual
**Tempo estimado:** 2-3 horas

---

## Por que essa atividade

QA mobile falha por falta de estratégia consciente. Você vai escolher um app mobile open source real, descobrir **o que ele testa e o que não testa**, e propor melhoria. Treino básico de auditor.

> **Versão simplificada desta oferta** — focada em entregável de 1-2 páginas. Se quiser ir mais fundo, o `template-relatorio.md` tem seções bonus opcionais.

## Tarefa (3 passos)

### 1. Escolher 1 app

Escolha 1 dos 5 sugeridos (todos validados — não vai cair em repo abandonado):

| App | Stack | Stars | Repo |
|---|---|---|---|
| **Immich Mobile** (photo backup) | Flutter | 101k ⭐ | <https://github.com/immich-app/immich> (pasta `/mobile`) |
| **Bluesky social-app** | React Native | 18k ⭐ | <https://github.com/bluesky-social/social-app> |
| **DuckDuckGo Android** | Kotlin | 4.7k ⭐ | <https://github.com/duckduckgo/Android> |
| **Saber** (notes) | Flutter | 4.5k ⭐ | <https://github.com/saber-notes/saber> |
| **Wikipedia iOS** | Swift | 3.4k ⭐ | <https://github.com/wikimedia/wikipedia-ios> |

> Pode escolher outro app open-source se quiser (≥100 stars, com testes visíveis), mas os 5 acima estão pré-validados. **Recomendo escolher um dos 5.**

### 2. Descobrir e mapear (~1h)

Abre o repo no GitHub e responde — pode usar **IA assistida (Gemini CLI, Cursor, Claude Code, ChatGPT — opções free vistas na aula 1)** pra acelerar.

| Pergunta | Onde olhar |
|---|---|
| **Que tipos de teste existem?** (unit, UI, E2E, etc.) | Pastas `test/`, `androidTest/`, `*UITests/`, `.maestro/`, `__tests__/` |
| **Que ferramentas usam?** | `build.gradle`, `package.json`, `pubspec.yaml`, `Project.xcodeproj` |
| **Tem CI/CD?** | `.github/workflows/*.yml` — quais workflows, rodam em PR ou nightly |

Veja o **`guia-investigacao.md`** se ficar perdido — passo a passo de onde olhar.

### 3. Análise + proposta (~1h)

- Liste **2 gaps** (o que falta testar) + 1 frase de risco em cada
- Proponha **1-2 melhorias** com prioridade ("primeiro isso porque...")
- Cite **2 referências** (qualquer tipo — slide aula, livro, blog técnico, paper)

## Recomendado (não obrigatório)

**Instale o app** que vai analisar — 5min usando dá contexto pra raciocinar sobre risco e gap real:

| App | Onde baixar |
|---|---|
| Immich | iOS: <https://apps.apple.com/app/immich/id1613945652> · Android: <https://play.google.com/store/apps/details?id=app.alextran.immich> |
| Bluesky | iOS: <https://apps.apple.com/app/bluesky-social/id6444370199> · Android: <https://play.google.com/store/apps/details?id=xyz.blueskyweb.app> |
| DuckDuckGo | <https://play.google.com/store/apps/details?id=com.duckduckgo.mobile.android> |
| Saber | iOS: <https://apps.apple.com/app/saber/id1671523739> · Android: <https://play.google.com/store/apps/details?id=com.adilhanney.saber> |
| Wikipedia iOS | <https://apps.apple.com/app/wikipedia/id324715238> |

## Dica: use IA pra acelerar

```bash
git clone https://github.com/<repo-escolhido>.git
cd <repo>
# abre com Cursor / Gemini CLI / Claude Code
```

Prompts úteis:

> "Liste todos os tipos de teste neste repo. Mostre paths."

> "Que dependências de teste estão em [`pubspec.yaml`/`build.gradle`/`package.json`]?"

> "Resumo dos workflows em `.github/workflows/`: qual roda em PR, qual nightly."

> "Que 2 gaps de teste posso identificar neste repo?"

> ⚠️ **IA é ajudante, não substituto.** Valide o que ela diz abrindo o arquivo no GitHub.

## Critérios de avaliação

| Critério | Pontos |
|---|---|
| App escolhido apropriado + justificativa curta | 2 |
| Mapeamento (tipos de teste + ferramentas + CI) — direto ao ponto | 6 |
| 2 gaps identificados com risco | 4 |
| 1-2 melhorias propostas com justificativa | 2 |
| 2 referências citadas | 1 |

**Total: 15 pts**

> Bonus (não conta pra nota máxima, mas considerado em edge cases de arredondamento):
> - Matriz impacto × esforço pras melhorias
> - Análise de testes além do código (CONTRIBUTING.md, beta, bug bounty, crash reporting)
> - 3+ referências, sendo 1 acadêmica

## Entrega

- Formato: **markdown** (`.md`) ou PDF gerado de markdown
- Tamanho: **1-2 páginas** (não precisa ser longo — direto ao ponto)
- Estrutura: copiar `template-relatorio.md` e preencher
- Submeter via Canvas (módulo Atividade 1) com link do commit GitHub
- **Como entregar via GitHub:** ver página "Como entregar atividades pelo GitHub" no módulo Início

## O que você NÃO precisa fazer

- **Não precisa rodar testes** (só ler código)
- Não precisa compilar app localmente
- Não precisa ler todo código-fonte
- **Você é um auditor** — investigar a partir do que está visível
- Não precisa matriz quantitativa, paper acadêmico, ou análise exaustiva (deixar pra próximas atividades)

## Material de apoio

- `guia-investigacao.md` — passo a passo de **onde olhar** pra descobrir cada coisa
- `template-relatorio.md` — preencha esse, é sua entrega
- Material de apoio aula 1 (Fowler, Knott — disponíveis na página *Leitura Obrigatória* do módulo)
