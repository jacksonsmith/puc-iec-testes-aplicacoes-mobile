# Exercícios — Testes de Aplicações Mobile (ao vivo) — INTERNO

> ⚠️ **Conteúdo privado.** Gabaritos e soluções de referência. Não publicar.

## Mapa completo de exercícios

| # | Pasta | Atividade (Canvas) | Pts | Dificuldade | Prazo | Enunciado |
|---|---|---|---|---|---|---|
| 1a | `01-analise-cobertura/` | A1 — Análise de Cobertura | 15 | ⭐⭐ Médio | 28/05 | ✅ |
| 1b | `01-casos-de-teste-funcionais/` | A1 — Casos de Teste Funcionais (alternativa) | 15 | ⭐ Fácil | 28/05 | ✅ |
| 2 | `02-suite-jest-rntl/` | A2 (Parte A, 10pts) + A3 (Parte B, 5pts) — Unit + Integração Jest/RNTL | 15 | ⭐⭐ Médio | 16/06 + 23/06 | ✅ |
| 3 | `03-maestro-e2e/` | A4 — Maestro E2E | 10 | ⭐⭐ Médio | 09/07 | ✅ |
| 4 | `04-trabalho-final/` | Trabalho Final (grupo) | 60 | ⭐⭐⭐ Difícil | 15/07 | ✅ |

**Total: 100 pts.** Fonte real = Canvas (curso 253832), sincronizado em 01/07/2026 — ver `../AVALIACAO.md`.

> Native UI (Espresso/XCUITest) e Detox **saíram do escopo** (E2E ficou só Maestro). Não existe mais
> Atividade separada de Performance/Security nem Quiz — cortados do escopo avaliativo real do curso.
> `03-hello-maestro/` é esquenta **não-avaliativo** (pré-req de setup pra Maestro).

### Escala de dificuldade

| Nível | Descrição |
|---|---|
| ⭐ Fácil | ~1h · só redação/análise · sem setup técnico |
| ⭐⭐ Médio | 2-3h · setup Node/npm ou ferramentas web · sem simulador móvel obrigatório |
| ⭐⭐⭐ Difícil | 3h+ · requer simulador iOS/Android ou tooling nativo específico |

> **Nota sobre Atividades 1a e 1b:** são alternativas — o aluno faz UMA das duas. A 1b (~1h) é recomendada pra quem não tem familiaridade com QA. A 1a (~2-3h) é mais aprofundada.

---

## Links rápidos

- 🌐 **Repo público (alunos):** https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile
- 📂 **Exercícios públicos:** https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/tree/main/exercicios
- 🤖 **Autograder MVP A4:** https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/tree/main/grader
- ⚙️ **Workflows CI:** https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/tree/main/.github/workflows

---

## Estrutura de cada pasta

```
NN-slug/
  enunciado.md          ← público (vai pro repo dos alunos)
  guia-passo-a-passo.md ← público (quando existe)
  template-relatorio.md ← público (quando existe)
  pratica/            ← público (código base pra aluno)
  gabarito/             ← INTERNO (solução de referência — nunca publicar)
  rubrica-detalhada.md  ← INTERNO (pesos por critério)
```

> **Nota:** os exercícios da Aula 1–2 (`01-*`) ainda usam os nomes antigos `starter/` e `exemplo-resolvido/`. A partir da Aula 3 (`02-suite-jest-rntl`, `03-maestro-e2e`) o padrão é `pratica/` + `gabarito/`.

---

## Política

- Nunca commitar `gabarito/` (nem o antigo `exemplo-resolvido/`) em repo público
- Backup separado antes de divulgar gabarito
- Atualizar após cada oferta com lições aprendidas
- Esta é a **1ª oferta** desta versão
