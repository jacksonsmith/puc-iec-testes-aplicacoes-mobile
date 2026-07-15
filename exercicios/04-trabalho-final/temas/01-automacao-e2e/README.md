# Tema 1 — Automação Mobile End-to-End

**Trilha:** 🤖 Automação & Arquitetura

## O que é

Testar o app inteiro como um usuário testaria — abrir, navegar, tocar em botão — só que
automatizado, rodando sozinho em vários celulares/emuladores. Vocês já fazem isso na Atividade 4
(5 flows Maestro); aqui é aprofundar: mais flows, matriz de dispositivos, execução em cloud farm.

## Como executar

1. Parta da suíte da Atividade 4 (`exercicios/03-maestro-e2e/pratica/flows/`) — não comece do
   zero, evolua o que já existe.
2. Adicione flows cobrindo cenários que a Atividade 4 não cobriu: erro de login, busca sem
   resultado, offline, rotação de tela.
3. Organize os flows em pastas por funcionalidade (`flows/login/`, `flows/favoritos/`, etc.) e
   use `runFlow:` pra reaproveitar fragmentos (login, navegação comum).
4. **Cloud device é diferencial, não obrigação.** Se quiser tentar:
   - Firebase Test Lab: plano Spark (grátis) não pede cartão pra quota básica — confirme isso
     direto no console do Firebase antes de se comprometer com o tema.
   - BrowserStack App Live: costuma ser trial por tempo limitado, não free permanente — não deixe
     pra rodar a suíte inteira só no fim do prazo, pode ter expirado.
5. Se cloud não rolar, **rodar 100% local/emulador com matriz de comparação (ex.: 2 versões de
   Android, 1 físico + 1 emulador) já vale nota cheia.**

## O que entregar

- Repo com suíte Maestro ampliada (≥ 5 flows além dos da Atividade 4, ou os mesmos 5 com mais
  profundidade/edge cases).
- README explicando como rodar em máquina limpa.
- Print/log/vídeo mostrando os flows passando.
- Relatório: comparar execução local vs cloud (se tentaram) — o que mudou, o que foi mais confiável.
  Formato/entrega: usar o template obrigatório [`template-relatorio.md`](../../template-relatorio.md) — ver "Entrega" no enunciado principal.

## Fontes

- [docs.maestro.dev — React Native support](https://docs.maestro.dev/platform-support/react-native)
- [E2E Testing React Native with Maestro: A Practical Guide](https://dev.to/peakiqofficial/e2e-testing-react-native-with-maestro-a-practical-guide-1g79)
- [End-to-End Testing in React Native with Maestro — Part 2](https://medium.com/@3jacksonsmith/end-to-end-testing-in-react-native-with-maestro-a-comprehensive-guide-part-2-e32045e5a9ad) (prof)
