# Tema 13 — POM (Page Object Model) em Maestro

**Trilha:** 🤖 Automação & Arquitetura *(novo, 03/07/2026)*

## O que é

Separar **o que é um elemento** (o seletor — `id`, texto) de **como o teste interage com ele**
(`tapOn`, `inputText`, `assertVisible`). Hoje, os flows da Atividade 4 têm o `id` de cada
elemento espalhado direto no YAML — se o dev renomear um `testID`, é preciso caçar e trocar em
todo flow que usa aquele elemento. POM centraliza os seletores num lugar só: muda o app, muda
1 arquivo, não N flows.

É o **mesmo problema de fundo** do tema 2 (Arquitetura de Suíte), só que resolvido com o
mecanismo de scripting do próprio Maestro (`runScript`/`output`), não com um pattern emprestado
de outra ferramenta — dá pra fazer os dois temas juntos se o grupo quiser aprofundar mais.

## Como executar

Baseado no recipe oficial ([docs.maestro.dev](https://docs.maestro.dev/examples/recipes/implementing-the-page-object-model-pom)):

1. Crie uma pasta `elements/` dentro de `pratica/flows/` — 1 arquivo `.js` por tela
   (`elements/login.js`, `elements/movielist.js`), cada um exportando os seletores via `output`:
   ```javascript
   output.login = {
     email: "login-email-input",
     senha: "login-password-input",
     entrar: "login-submit-button",
   }
   ```
2. Nos flows existentes, troque o `id:` hardcoded por `runScript` carregando o arquivo + `${output...}`:
   ```yaml
   - runScript: elements/login.js
   - tapOn:
       id: ${output.login.email}
   - inputText: "aluno@puc.br"
   ```
3. Reescreva **pelo menos 2 dos 5 flows** da Atividade 4 (`01`–`05`) usando essa estrutura —
   escolha os que mais repetem seletor entre si (login aparece nos 5, é o candidato óbvio).
4. Prove o ganho: renomeie 1 `testID` no componente RN, rode os flows — sem POM, quebraria em N
   lugares; com POM, você conserta só no `elements/*.js`. Documente esse teste antes/depois.
5. Pra apps cross-platform, o recipe oficial recomenda organizar por plataforma
   (`elements/android/`, `elements/ios/`) — opcional aqui, já que o CineFav roda só Android no
   curso, mas vale citar no relatório como próximo passo.

## O que entregar

- Repo com `elements/` + pelo menos 2 flows migrados pra usar `${output...}` em vez de `id:` direto.
- Demonstração do "renomeia o testID uma vez, conserta em um lugar só" (screenshot/log antes e
  depois do rename quebrando/consertando os flows).
- Relatório: comparação de manutenibilidade (quantos lugares precisariam mudar sem POM vs com),
  quando vale a pena vs quando é over-engineering pra uma suíte pequena.
  Formato/entrega: usar o template obrigatório [`template-relatorio.md`](../../template-relatorio.md) — ver "Entrega" no enunciado principal.

## Fontes

- [Implementing the Page Object Model (POM) — Maestro Docs](https://docs.maestro.dev/examples/recipes/implementing-the-page-object-model-pom) (recipe oficial, `output`/`runScript`, estrutura de pastas)
- [Page Object Model — Maestro Docs](https://docs.maestro.dev/examples/page-object-model) (referência do padrão dentro da doc oficial)
