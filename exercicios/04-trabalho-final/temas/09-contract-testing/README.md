# Tema 9 — Mobile API Contract Testing

**Trilha:** 🤖 Automação & Arquitetura

## O que é

Garantir que o app e o backend continuam "se entendendo" — se o backend mudar um campo da API sem
avisar, o teste acusa antes de quebrar em produção.

## ⚠️ Antes de começar — ativar API real

O CineFav roda **100% mockado por padrão** (sem rede) — isso é ótimo pra E2E determinístico, mas
significa que **não tem nenhuma chamada HTTP real pra contratar**. Antes de escolher esse tema:

1. Gerar token grátis em [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api).
2. Copiar `pratica/.env.example` pra `pratica/.env` e colar o token em `EXPO_PUBLIC_TMDB_TOKEN`.
3. Confirmar que o app agora busca dado real da TMDB (não os filmes mockados fixos).

Sem esse passo, o tema não tem o que testar — **é o requisito mais fácil de esquecer**, faça
primeiro.

## Como executar

1. Instalar Pact: `npm install --save-dev @pact-foundation/pact`.
2. Escrever teste consumer-side com Jest: definir a interação esperada (ex.: `GET
   /search/movie?query=X` retorna array com `id`, `title`, `poster_path`).
3. Gerar o contrato (arquivo JSON) rodando o teste.
4. **TMDB é API pública real, sem provider próprio pra verificar o contrato do lado servidor** —
   nesse caso, documentem isso como limitação real do projeto (Pact funciona melhor quando você
   controla os 2 lados; contra API de terceiro, o valor é documentar o contrato esperado e testar
   que o app trata resposta inesperada com graça).

## O que entregar

- Repo com os testes de contrato (Pact + Jest) cobrindo ≥ 3 endpoints usados pelo app.
- Contratos gerados (JSON) commitados como evidência.
- README explicando a limitação de não ter provider próprio (TMDB é 3rd party).
- Relatório: o que aconteceria se a TMDB mudasse um campo — o app quebra com dado inesperado?
  Testar isso (mockar resposta malformada) é o insight que vale nota.
  Formato/entrega: usar o template obrigatório [`template-relatorio.md`](../../template-relatorio.md) — ver "Entrega" no enunciado principal.

## Fontes

- [Implementing a Consumer-Driven Contract for a React App with Pact and Jest](https://reflectoring.io/pact-react-consumer/)
- [Stop Breaking My API: A Practical Guide to Contract Testing with Pact](https://medium.com/@mohsenny/stop-breaking-my-api-a-practical-guide-to-contract-testing-with-pact-33858d113386)
- [docs.pact.io](https://docs.pact.io/)
