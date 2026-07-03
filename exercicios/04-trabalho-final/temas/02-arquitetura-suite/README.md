# Tema 2 — Arquitetura de Suíte de Teste

**Trilha:** 🤖 Automação & Arquitetura · *(era Native UI Testing — trocado, ver enunciado.md)*

## O que é

Organizar os testes que vocês já escrevem de um jeito mais limpo e reutilizável — separar "o que
testar" de "como testar", pra suíte não virar bagunça conforme cresce. Isso é engenharia de teste,
não achar bug — o produto final é a arquitetura em si, não o bug que ela encontra.

## Como executar

**Caminho principal — Robot Pattern sobre RNTL (recomendado):**

1. Pegue os testes RNTL da Atividade 2/3 (`exercicios/02-suite-jest-rntl/pratica/`).
2. Pra cada tela testada, crie um "robot" — um objeto/módulo JS que expõe ações
   (`loginRobot.preencherEmail()`, `loginRobot.tocarEntrar()`) e verificações
   (`loginRobot.verificarErro()`), escondendo os `getByTestId`/`fireEvent` por dentro.
3. Reescreva 1 teste existente usando os robots — compare antes/depois: teste fica mais legível?
4. Referência: [Jake Wharton, "Testing Robots"](https://jakewharton.com/testing-robots/) — a ideia
   original (nasceu pra Espresso, mas o princípio "separar what do how" é ferramenta-agnóstico).

**Caminho secundário — organizar `runFlow` do Maestro (mais simples, menos "puro"):**

1. Extraia ações repetidas dos flows Maestro (login, navegação) em `flows/_fragments/*.yaml`.
2. Componha os flows principais chamando `runFlow: _fragments/login.yaml`.
3. **Atenção:** isso não é Screenplay Pattern "de livro" (que tem actor/ability/interaction como
   classes) — é uma inspiração no espírito do padrão, aplicada ao que o Maestro permite. Deixe
   isso claro no relatório, não inflar a alegação.

## O que entregar

- Repo com a suíte refatorada (RNTL com robots e/ou Maestro com fragments organizados).
- README comparando a suíte antes/depois — quantas linhas duplicadas sumiram, o que ficou mais
  fácil de adicionar (ex.: novo teste de tela reaproveitando robot existente).
- Relatório: por que esse padrão, quais trade-offs (robot demais também pode virar over-engineering).

## Fontes

- [Jake Wharton — Testing Robots](https://jakewharton.com/testing-robots/)
- [Screenplay Pattern — Serenity/JS handbook](https://serenity-js.org/handbook/design/screenplay-pattern/) (referência conceitual, não é pra Maestro)
- [Mastering Detox for React Native — Robot Pattern](https://medium.com/@3jacksonsmith/mastering-detox-for-react-native-step-by-step-guide-to-e2e-testing-webview-logins-with-robot-97f7a9898a17) (prof — exemplo com Detox, adaptar ideia pra RNTL/Maestro)
