# Starter — Testes de Aplicações Mobile · Aula 2

App Expo + TypeScript **já implementado e funcionando**. Mesmo app que a turma de Arquitetura constrói — aqui o foco é o oposto: **escrever a suíte de testes unitários** sobre código que já existe.

> Hands-on da Aula 2 (escrevemos testes juntos) + Atividade 2 (entrega **11/06**, 10pts — você escreve a suíte e atinge cobertura ≥ 70%).

**Você NÃO implementa features.** Stores, services e utils já estão prontos. Sua entrega são os testes em `__tests__/`.

---

## O que está pronto pra você testar

| Arquivo | O que tem | Tipo de teste |
|---|---|---|
| Arquivo | O que tem | Tipo de teste |
|---|---|---|
| `src/components/MovieCard.tsx` | card de filme (título, nota, toque) | **teste de tela (RNTL)** ⭐ |
| `src/store/favoritesStore.ts` | Zustand: `add/remove/toggle/clear/isFavorite` | store (Jest) |
| `src/services/api.ts` | `isTokenError(err)` — classifica erro de auth | função pura (Jest) |
| `src/store/counterStore.ts` | Zustand: `increment/decrement/reset` | store (Jest) |
| `src/utils/poster-url.ts` | `posterUrl(path, size)` — monta URL do poster | função pura (Jest) — modelo |
| `src/queries/movies/get-popular-movies.ts` | `fetchPopularMovies(page)` | mock de dependência — **bônus** |

```
src/
├── components/MovieCard.tsx  ← teste de tela (RNTL) ⭐
├── store/                    ← Zustand (favorites, counter)
├── services/api.ts           ← isTokenError
├── queries/movies/           ← TanStack Query (bônus)
└── utils/poster-url.ts       ← função pura — modelo resolvido

__tests__/                    ← SUA ENTREGA (Jest + RNTL)
├── posterUrl.test.ts          ← EXEMPLO RESOLVIDO (modelo)
├── MovieCard.test.tsx         ← it.todo — teste de tela ⭐
├── favoritesStore.test.ts     ← it.todo
├── counterStore.test.ts       ← it.todo
├── api.test.ts                ← it.todo
└── popularMovies.test.ts      ← it.todo — bônus (mock da api)
```

---

## Setup

```bash
git clone https://github.com/SEU-USUARIO/puc-iec-testes-aplicacoes-mobile.git
cd puc-iec-testes-aplicacoes-mobile/exercicios/02-setup-suite-unitaria/starter
npm install
npm test          # 3 verdes (posterUrl) + alguns vermelhos (complete o expect) + desafios (todo)
```

> **Os testes (incl. RNTL de tela) não precisam de simulador, token nem rede.** Rodam só com Node.
> O app só roda de verdade (`npx expo start`) se você gerar um token TMDB — opcional pra esta atividade.
> **Stack:** Expo SDK 52 (RN 0.76 + React 18.3). O `.npmrc` do projeto já aponta pro **npm público** — não precisa de registry de empresa.

```bash
npm test               # roda a suíte
npm run test:watch     # watch mode (re-roda ao salvar)
npm run test:coverage  # relatório de cobertura (abre coverage/lcov-report/index.html)
```

---

## Suas tasks

| # | Onde | O que fazer |
|---|---|---|
| TASK 1 | `__tests__/posterUrl.test.ts` | Leia — é o **modelo resolvido** |
| TASK 2 | `__tests__/favoritesStore.test.ts` | Escreva 6 testes (add/remove/toggle/isFavorite/clear) |
| TASK 3 ⭐ | `__tests__/MovieCard.test.tsx` | **Teste de tela (RNTL):** render título/nota + `press` navega |
| TASK 4 | `__tests__/api.test.ts` | Escreva 5 testes de `isTokenError` |
| TASK 5 | `__tests__/counterStore.test.ts` | Escreva 3 testes (increment/decrement/reset) |
| TASK 6 | — | Atinja **cobertura ≥ 70%** em `src/store` e `src/utils` |
| TASK 7 (bônus) | `__tests__/popularMovies.test.ts` | `fetchPopularMovies` com `jest.mock('@/services/api')` |

```bash
grep -rn "it.todo\|TODO \[TASK" __tests__/   # ver o que falta
```

---

## Dicas

- **Store Zustand é singleton.** Resete o estado entre testes com `useFavoritesStore.setState({ ids: [] })` no `beforeEach` (já está nos scaffolds).
- **Acesse fora de componente** com `useStore.getState()`: `useCounterStore.getState().increment()`.
- **Cobertura útil** = código *executado E verificado*. Renderizar sem `expect` infla a métrica e não testa nada.
- **IA pode ajudar** a gerar testes — mas **valide**: rode, confira asserts, cuidado com seletor/mock alucinado.

---

## Referências

- [Jest](https://jestjs.io/docs/getting-started) · [jest-expo](https://docs.expo.dev/develop/unit-testing/)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [Zustand — testing](https://github.com/pmndrs/zustand/blob/main/docs/guides/testing.md)
- [xUnit Test Patterns (Meszaros)](http://xunitpatterns.com/)
