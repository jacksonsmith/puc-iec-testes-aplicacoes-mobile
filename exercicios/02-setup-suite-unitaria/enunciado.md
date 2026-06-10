# Atividade 2 — Suíte Unitária sobre App RN (10 pts)

**Disciplina:** Testes de Aplicações Mobile
**Entrega:** até **11/06/2026** (2 semanas)
**Modalidade:** individual
**Tempo estimado:** **~1-2 horas**

---

## Por que essa atividade

Aula 2 cobriu **unit testing em React Native** (Jest + funções puras + `jest.mock`). Aqui você exercita o core do QA: **escrever uma suíte de testes verde sobre código que já existe** — sem precisar implementar features.

O app-alvo é o **mesmo app TMDB da disciplina de Arquitetura** (já implementado nesta versão). Você testa as camadas `store`, `utils` e `data`.

---

## Pré-requisito (setup ~10min)

```bash
# 1. Fork do repo público no GitHub
# 2. Clone o SEU fork
git clone https://github.com/SEU-USUARIO/puc-iec-testes-aplicacoes-mobile.git
cd puc-iec-testes-aplicacoes-mobile/exercicios/02-setup-suite-unitaria/starter
npm install
npm test     # posterUrl já passa verde (3 testes). O resto é seu.
```

> **Não precisa simulador, token TMDB nem rede.** Unit test roda só com Node.

---

## Tarefa (escrever testes em `__tests__/`)

O starter já tem **1 exemplo resolvido** (`posterUrl.test.ts`) — use de modelo. Os outros arquivos têm `it.todo` marcando o que falta.

### 1. `favoritesStore.test.ts` — Zustand (6 testes)

Store em `src/store/favoritesStore.ts`. Cubra:
- `add(id)` adiciona o id
- `add(id)` **não duplica** id já existente
- `remove(id)` tira o id
- `toggle(id)` adiciona se ausente, remove se presente (2 caminhos)
- `isFavorite(id)` reflete o estado
- `clear()` esvazia

> Store é singleton — resete entre testes com `useFavoritesStore.setState({ ids: [] })` no `beforeEach` (já está no scaffold). Acesse com `useFavoritesStore.getState()`.

### 2. `MovieCard.test.tsx` — teste de tela (RNTL) ⭐

Componente em `src/components/MovieCard.tsx`. É o teste mais "cara de QA" — valida o que o usuário **vê** e **faz**:
- renderiza o **título** do filme (`screen.getByText`)
- renderiza a **nota** (`⭐ 8.7`)
- **toque no card navega** pro detalhe (`fireEvent.press` → `navigate` chamado)

> MovieCard usa `useNavigation()` — mocke o hook (não há `NavigationContainer` no teste). O scaffold já traz o mock pronto.

### 3. `counterStore.test.ts` — Zustand (3 testes)

`increment` soma 1 · `decrement` subtrai 1 · `reset` zera.

### 4. `api.test.ts` — função pura da camada data (5 testes)

`isTokenError(err)` em `src/services/api.ts`:
- `true` pra `response.status === 401`
- `true` pra `{ isTokenError: true }`
- `true` pra erro `TMDB_TOKEN_MISSING`
- `false` pra `null`
- `false` pra erro genérico (status 500)

### 5. Cobertura ≥ 70% em `src/store` e `src/utils`

```bash
npm run test:coverage
# abre coverage/lcov-report/index.html
```

---

## Critérios de avaliação

| Critério | Pontos |
|---|---|
| `npm install && npm test` roda em < 15min (eliminatório) | 2 |
| Testes `favoritesStore` (6 verdes) | 2 |
| **Teste de tela `MovieCard` (RNTL)** — render + press navega | 2 |
| Testes `isTokenError` (5 verdes) | 2 |
| Testes `counterStore` (3 verdes) | 1 |
| Cobertura ≥ 70% em `src/store` e `src/utils` | 1 |

**Total: 10 pts**

> 🎁 **Bônus** (arredondamento):
> - `popularMovies.test.ts` — `fetchPopularMovies` com `jest.mock('@/services/api')` (+1)
> - CI GitHub Actions verde no fork (workflow já vem pronto em `.github/workflows/test.yml`)
> - Testes parametrizados (`it.each`)

---

## Recomendado: use IA pra acelerar

> "Gere testes Jest pra `useFavoritesStore` (Zustand) cobrindo add/remove/toggle/isFavorite/clear, com `beforeEach` resetando o state via `setState`."

⚠️ **Valida cada teste antes de commitar.** IA alucina: import de path errado, `expect` sem matcher, mock que não bate com a assinatura real (`api.get(url, config)`). Teste que não tem `expect` infla cobertura e não testa nada.

---

## Entrega via GitHub (fork + PR)

1. Fork do repo público: <https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile>
2. Branch `entrega/atividade-2-<seu-nome>` no seu fork
3. Trabalhe direto em `exercicios/02-setup-suite-unitaria/starter/__tests__/` no SEU fork
4. Commit + push pro seu fork (**NÃO comite `node_modules/` nem `coverage/`** — `.gitignore` já cuida)
5. Submeter no Canvas com link do commit (ou PR)

**Detalhes do workflow:** ver página *"Como entregar atividades pelo GitHub"* no Canvas módulo Início.

## O que você NÃO precisa fazer

- **Não implementa feature** — o código de produção já está pronto
- **Não precisa rodar o app** (sem token/simulador) — testes (incl. RNTL) rodam só com Node
- **Não precisa E2E** (app rodando ponta a ponta) — isso é Aula 3 (Detox/Maestro)

## Material de apoio (todos no GitHub público)

- **[starter (app + scaffolds)](https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/tree/main/exercicios/02-setup-suite-unitaria/starter)** — README com tasks
- **[guia-passo-a-passo.md](https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/blob/main/exercicios/02-setup-suite-unitaria/guia-passo-a-passo.md)** — comandos + troubleshooting
- **[template-relatorio.md](https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/blob/main/exercicios/02-setup-suite-unitaria/template-relatorio.md)** — README modelo
- **[Slide aula 2](https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/blob/main/slides/aula-02/aula-02-setup-manual-unit.pdf)**
