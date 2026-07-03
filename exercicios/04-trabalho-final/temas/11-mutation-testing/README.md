# Tema 11 — Mutation Testing

**Trilha:** 🏗️ Qualidade & Pipeline

## O que é

Testar os TESTES: a ferramenta muda um pedacinho do código de propósito (um "mutante") e vê se
algum teste pega o erro. Se nenhum teste falhar, seus testes não estavam testando de verdade.

## Como executar

1. `npm install --save-dev @stryker-mutator/core @stryker-mutator/jest-runner`
2. `npx stryker init` — escolher Jest como test runner.
3. **Escopo o mutation testing num módulo de domínio isolado** (ex.: `src/stores/favoriteStore.ts`
   ou uma função de formatação/validação pura) — **não** o app RN inteiro. Metro/Babel são ponto
   de atrito não resolvido pelo StrykerJS; tentar rodar no app todo vai travar ou demorar demais.
4. `npx stryker run` — vai gerar relatório HTML com o mutation score.
5. Olhar os "mutantes sobreviventes" (mutant que nenhum teste matou) — pra cada um, **escrever um
   teste novo que mata ele**, rodar de novo, mostrar o score subindo.

## O que entregar

- Repo com config do Stryker + relatório de mutation score (antes e depois de melhorar os testes).
- README explicando o escopo escolhido e por quê (não precisa ser o app inteiro).
- Relatório: escolher 2-3 mutantes sobreviventes específicos, explicar o que eles revelam sobre
  gap na suíte de teste original (esse é o insight central do tema, não só rodar a ferramenta).
- Gate de CI com break-threshold é bônus, não obrigatório.

## Fontes

- [Stryker Mutator — guia oficial React/Jest](https://stryker-mutator.io/docs/stryker-js/guides/react/)
- [Mutants, Mutants everywhere! Have we "J"est the Mutants?](https://dev.to/giannispapadakis/mutants-mutants-everywhere-have-we-jest-the-mutants-ic4)
- [METFORD — Mutation Testing Framework for Android](https://arxiv.org/pdf/2501.02875) (`material-de-apoio/artigos-referencia/`, referência acadêmica sobre mutation testing mobile)
