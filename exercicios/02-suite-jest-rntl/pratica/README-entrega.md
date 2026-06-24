    # README — Atividade 2 Suíte Unitária RN — [Seu Nome]

    > Use isso como base do README do seu fork (`exercicios/02-suite-jest-rntl/pratica/README-entrega.md` ou no PR).

    ## Identificação

    - **Aluno:** Lucas Rocha da Costa
    - **Node:** v26.2.0
    - **Repo (seu fork):** https://github.com/LucasPoka/puc-iec-testes-aplicacoes-mobile
    - **Commit/PR de entrega:** 

    ## Como rodar

    ```bash
    cd exercicios/02-suite-jest-rntl/pratica
    npm install
    npm test
    npm run test:coverage
    ```

    ## Resultado da suíte

    ```
    > aula-02-starter@1.0.0 test
    > jest

    PASS __tests__/unit/02-isTokenError.test.ts
    PASS __tests__/unit/03-favoritesStore.test.ts
    PASS __tests__/unit/05-counterStore.test.ts
    PASS __tests__/unit/01-posterUrl.test.ts
    PASS __tests__/integration/01-useFavorites.test.ts
    PASS __tests__/unit/06-popularMovies.test.ts
    PASS __tests__/unit/04-MovieCard.test.tsx
    PASS __tests__/integration/02-navigation.test.tsx (6.745 s)
    PASS __tests__/integration/03-movieFlow.integration.test.tsx (6.911 s)
    A worker process has failed to exit gracefully and has been force exited. This is likely caused by tests leaking due to improper teardown. Try running with --detectOpenHandles to find leaks. Active timers can also cause this, ensure that .unref() was called on them.

    Test Suites: 9 passed, 9 total
    Tests:       30 passed, 30 total
    Snapshots:   0 total
    Time:        8.857 s
    Ran all test suites.

    ```

    ## Cobertura

    > aula-02-starter@1.0.0 test:coverage
    > jest --coverage

    PASS __tests__/unit/05-counterStore.test.ts
    PASS __tests__/unit/03-favoritesStore.test.ts
    PASS __tests__/unit/06-popularMovies.test.ts
    PASS __tests__/unit/01-posterUrl.test.ts
    PASS __tests__/unit/02-isTokenError.test.ts
    PASS __tests__/integration/01-useFavorites.test.ts
    PASS __tests__/unit/04-MovieCard.test.tsx
    PASS __tests__/integration/02-navigation.test.tsx
    PASS __tests__/integration/03-movieFlow.integration.test.tsx
    A worker process has failed to exit gracefully and has been force exited. This is likely caused by tests leaking due to improper teardown. Try running with --detectOpenHandles to find leaks. Active timers can also cause this, ensure that .unref() was called on them.
    ------------------------|---------|----------|---------|---------|-------------------
    File                    | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
    ------------------------|---------|----------|---------|---------|-------------------
    All files               |   80.64 |    56.89 |   92.15 |   78.78 |              
    __tests__/integration  |     100 |      100 |     100 |     100 |              
    _helpers.tsx          |     100 |      100 |     100 |     100 |              
    src/components         |   81.81 |    66.66 |      80 |   77.77 |              
    MovieCard.tsx         |   81.81 |    66.66 |      80 |   77.77 | 46-47        
    src/hooks              |     100 |      100 |     100 |     100 |              
    useFavorites.ts       |     100 |      100 |     100 |     100 |              
    src/integration        |   96.29 |    83.33 |     100 |   95.83 |              
    AppNavigator.tsx      |     100 |      100 |     100 |     100 |              
    DetailScreen.tsx      |     100 |      100 |     100 |     100 |              
    MovieCardFav.tsx      |     100 |      100 |     100 |     100 |              
    MovieListScreen.tsx   |    90.9 |    66.66 |     100 |      90 | 28           
    src/queries/movies     |     100 |       50 |     100 |     100 |              
    get-popular-movies.ts |     100 |       50 |     100 |     100 | 20           
    src/services           |    47.5 |    33.33 |      40 |   43.75 |              
    api.ts                |    47.5 |    33.33 |      40 |   43.75 | 18-22,36-49,54-61
    src/store              |     100 |      100 |     100 |     100 |              
    counterStore.ts       |     100 |      100 |     100 |     100 |              
    favoritesStore.ts     |     100 |      100 |     100 |     100 |              
    src/utils              |     100 |      100 |     100 |     100 |              
    poster-url.ts         |     100 |      100 |     100 |     100 |              
    ------------------------|---------|----------|---------|---------|-------------------

    Test Suites: 9 passed, 9 total
    Tests:       30 passed, 30 total
    Snapshots:   0 total
    Time:        5.778 s, estimated 7 s
    Ran all test suites.


    ![Cobertura](./coverage-screenshot1.png) //coverage
    ![Cobertura](./coverage-screenshot2.png) //src/store
    ![Cobertura](./coverage-screenshot3.png) //src/utils

    ## Testes escritos

    | Arquivo | Casos | O que cobre |
    |---|---|---|
    | `favoritesStore.test.ts` | 6 | add / add-sem-duplicar / remove / toggle (2 caminhos) / isFavorite / clear |
    | `MovieCard.test.tsx` | 3 | render título · render nota ⭐ · toque navega (RNTL) |
    | `02-isTokenError.test.ts` | 5 | isTokenError: 401, flag, TMDB_TOKEN_MISSING, null, 500 |
    | `counterStore.test.ts` | 3 | increment / decrement / reset |
    | `movieFlow.integration.test.tsx` | 4 | lista aparece (texto + role) · favoritar ♥ 1 · desfavoritar ♥ 0 |

    ## Decisões de teste

    - Como resetei o estado da store entre testes? Usando `beforeEach` com `useFavoritesStore.setState({ ids: [] })` e `useCounterStore.setState({ count: 0 })`, garantindo que cada teste parte de um estado sem vazar pro próximo.
    - Algum caso que você quase esqueceu? O `toggle` nos 2 caminhos (adicionar quando ausente e remover quando presente) e o `isFavorite` verificando tanto `true` quanto `false` no mesmo teste. Acho que acabei esquecendo uns comentários/observações no código tbm.
    - Usou IA? Sim, principalmente para corrigir a parte bruta gerada do zero e me dar um guiada rápida na linguagem utilizada. O ajuste principal foi adicionar a importação `@testing-library/react-native/extend-expect` no arquivo de integração para resolver o erro de tipagem do `toHaveTextContent`, acho que fiz um comentário pontuando essa mudança no código, não lembro.

    ## Referência

    [1] Jest Documentation — https://jestjs.io/docs/getting-started

    ---

    ## 🎁 Bônus implementado (opcional)

    - [x] `popularMovies.test.ts` — mock de `@/services/api` com `jest.mock`
    - [ ] CI GitHub Actions verde no fork
    - [ ] Testes parametrizados (`it.each`)

    **`__tests__/unit/06-popularMovies.test.ts`** — 2 testes verdes:
    - busca `/movie/popular` com a página correta
    - devolve o `data` retornado pela API mockada
