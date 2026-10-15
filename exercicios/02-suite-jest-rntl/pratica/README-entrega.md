# README — Atividade 2 Suíte Unitária RN — [Seu Nome]

## Identificação

- **Aluno:** Gustavo Martins Pacheco
- **Node:** v22.x
- **Repo (seu fork):** https://github.com/pachecogu/puc-iec-testes-aplicacoes-mobile.git
- **Commit/PR de entrega:** https://github.com/pachecogu/puc-iec-testes-aplicacoes-mobile.git

## Como rodar

```bash
cd exercicios/02-suite-jest-rntl/pratica
npm install
npm test
npm run test:coverage
```

## Resultado da suíte

```text
PASS  __tests__/integration/03-movieFlow.integration.test.tsx
PASS  __tests__/integration/02-navigation.test.tsx
PASS  __tests__/unit/04-MovieCard.test.tsx
PASS  __tests__/integration/01-useFavorites.test.ts
PASS  __tests__/unit/06-popularMovies.test.ts
PASS  __tests__/unit/03-favoritesStore.test.ts
PASS  __tests__/unit/05-counterStore.test.ts
PASS  __tests__/unit/01-posterUrl.test.ts
PASS  __tests__/unit/02-isTokenError.test.ts

Test Suites: 9 passed, 9 total
Tests:       30 passed, 30 total
```

## Cobertura

| Pasta | % Stmts | % Branch |
|---|---:|---:|
| src/store | 100 | 100 |
| src/utils | 100 | 100 |

> Cobertura geral gerada com npm run test:coverage.

## Testes escritos

| Arquivo | Casos | O que cobre |
|---|---|---|
| __tests__/unit/03-favoritesStore.test.ts | 6 | add / add-sem-duplicar / remove / toggle / isFavorite / clear |
| __tests__/unit/04-MovieCard.test.tsx | 3 | render do título/nota e navegação ao tocar |
| __tests__/unit/02-isTokenError.test.ts | 5 | 401, flag isTokenError, TMDB_TOKEN_MISSING, null e 500 |
| __tests__/unit/05-counterStore.test.ts | 3 | increment / decrement / reset |
| __tests__/integration/03-movieFlow.integration.test.tsx | 4 | lista aparece, favoritar e desfavoritar atualizam contador |
| __tests__/integration/01-useFavorites.test.ts | 3 | hook de favoritos com renderHook |
| __tests__/integration/02-navigation.test.tsx | 1 | navegação da lista para detalhe |
| __tests__/unit/06-popularMovies.test.ts | 2 | mock de api e retorno de dados (bônus) |

## Decisões de teste

- O estado da store Zustand foi resetado entre testes com beforeEach e useFavoritesStore.setState({ ids: [] }).
- O componente MovieCard foi testado via React Native Testing Library com mock de useNavigation.
- O fluxo de integração foi validado com mock da API e renderização do app completo.
- A implementação foi feita sem alterar a lógica de produção; apenas os testes foram adicionados.
- A IA foi utilizada, como ferramenta, de forma assistida para me apoiar no desenvolvimento dos testes automatizados, pois não tenho experiência com a linguagem. Fui implementando e validando cada etapa separadamente, utilizando a IA também para esclarecer dúvidas e compreender o que estava sendo desenvolvido.

## Referência

- Jest: https://jestjs.io/
- React Native Testing Library: https://testing-library.com/docs/react-native-testing-library/intro/
- Zustand: https://zustand.docs.pmnd.rs/
- TanStack Query: https://tanstack.com/query/latest

---

## 🎁 Bônus implementado

- [x] popularMovies.test.ts — mock de @/services/api com jest.mock
- [ ] CI GitHub Actions verde no fork
- [ ] Testes parametrizados (it.each)
