# README — Atividade 2 Suíte Unitária RN — Brendon

> Use isso como base do README do seu fork (`exercicios/02-suite-jest-rntl/pratica/README-entrega.md` ou no PR).

## Identificação

- **Aluno:** Brendon
- **Node:** v24.14.0
- **Repo (seu fork):** https://github.com/Dyllanbr/puc-iec-testes-aplicacoes-mobile.git
- **Commit/PR de entrega:** https://github.com/Dyllanbr/puc-iec-testes-aplicacoes-mobile/commit/372d277

## Como rodar

```bash
cd exercicios/02-suite-jest-rntl/pratica
npm install
npm test
npm run test:coverage
```

## Resultado da suíte

```
[cole a saída do npm test — ex: Tests: 14 passed, 14 total]
```

## Cobertura

| Pasta | % Stmts | % Branch |
|---|---|---|
| `src/store` | [ex: 100] | [ex: 100] |
| `src/utils` | [ex: 100] | [ex: 100] |

![Cobertura](./coverage-screenshot.png)

## Testes escritos

| Arquivo | Casos | O que cobre |
|---|---|---|
| `favoritesStore.test.ts` | 6 | add / add-sem-duplicar / remove / toggle / isFavorite / clear |
| `MovieCard.test.tsx` | 3 | render título/nota · toque navega (RNTL) |
| `02-isTokenError.test.ts` | 5 | isTokenError: 401, flag, missing, null, 500 |
| `counterStore.test.ts` | 3 | increment / decrement / reset |
| `01-useFavorites.test.ts` | 3 | renderHook + toggle + isFavorite |
| `03-movieFlow.integration.test.tsx` | 3 | lista aparece / favoritar + contador / desfavoritar |

## Decisões de teste

- Como resetei o estado da store entre testes: `beforeEach + setState`
- Caso importante: o `toggle(42)` foi testado em `useFavorites` para garantir favoritar e desfavoritar volta a zero.
- Usei o setup já preparado no `__tests__/.../_helpers` e segui os testes de integração com `findByText` + `getByTestId`.

## Referência

- Jest docs

---

## 🎁 Bônus implementado (opcional)

- [ ] `popularMovies.test.ts` — mock de `@/services/api` com `jest.mock`
- [ ] CI GitHub Actions verde no fork
- [ ] Testes parametrizados (`it.each`)

[Cole prints / paths relevantes]