# Tema 12 — Testes Manuais Estruturados → Regressão Automatizada

**Trilha:** 🔍 Manual, Exploratório & Acessibilidade

## O que é

Testar o app na unha, procurando bug como um detetive — mas não "na sorte": usando uma técnica
publicada de verdade — e depois transformar cada bug achado num teste automatizado, pra ele nunca
mais voltar sem ninguém perceber.

## ⚠️ Os papers originais são pagos — resumo das técnicas aqui

Nem TQED nem o paper principal de Gamified Exploratory Testing têm PDF aberto (ver
`material-de-apoio/artigos-referencia/README.md`). Resumo pra ninguém travar no paywall:

### Opção A — TQED (Roman, Mnich, Hryszko, ICTSS 2023)

Técnica de design de teste por **4 dimensões**:
- **T (Time)** — o que muda com o tempo? (delay, timeout, ordem de eventos, sessão expirando)
- **Q (Quantity)** — o que muda com quantidade? (lista vazia, 1 item, muitos itens, número negativo)
- **E (Event)** — que eventos podem interromper/disparar algo? (rotação de tela, app em background,
  notificação chegando, perda de rede no meio de uma ação)
- **D (Data)** — que dado pode quebrar? (string vazia, caractere especial, unicode, número muito
  grande, campo nulo)

O teste é: pra cada tela/funcionalidade, cruzar combinações dessas dimensões (ex.: "lista de
busca" + Q=vazia + E=perda de rede = "buscar sem resultado e sem internet ao mesmo tempo") e
gerar ideia de teste a partir disso. O paper mostrou que essa técnica achou **significativamente
mais defeitos** que teste baseado em caso de teste tradicional.

### Opção B — Gamified Exploratory Testing (Coppola et al., IEEE TSE 2023/2024)

Aplicar elementos de jogo à sessão exploratória: **pontuação** por tela/funcionalidade coberta,
**progresso visível** (tipo barra de cobertura), **objetivo declarado antes da sessão** ("quero
descobrir X pontos explorando a tela de busca"). O estudo (144 participantes) mediu +15-25% de
cobertura/diversidade de teste comparado a exploração padrão sem esses elementos, mantendo taxa de
achado de bug parecida.

Pra aplicar sem ferramenta pronta: façam manualmente — definam pontos por tipo de interação
testada (ex.: 1pt por tela nova visitada, 2pts por fluxo alternativo testado, 3pts por bug achado)
e registrem a pontuação junto do session report.

## Como executar

**Parte A — sessão estruturada (escolher A ou B acima):**
1. Timebox de 60-90min (regra da Aula 2, SBTM).
2. Escrever o charter antes: "Explore [funcionalidade] com [técnica] pra descobrir [risco]".
3. Aplicar a técnica escolhida, documentar achados em tempo real (session report: o que testou,
   o que achou, tempo gasto).
4. Repetir por 2-3 sessões cobrindo telas diferentes do app.

**Parte B — regressão automatizada:**
1. Pra cada bug real confirmado na Parte A, escrever 1 teste automatizado (RNTL se for lógica/UI,
   Maestro se for fluxo completo) que falha no código com bug e passa depois do fix.
2. Rodar e mostrar passando.

## O que entregar

- Session reports da Parte A (charter, tempo, achados, pontuação se usou gamificação).
- ≥ 5 bugs documentados na Parte A.
- ≥ 5 testes automatizados na Parte B, 1 por bug real achado.
- Relatório: comparar a técnica escolhida com exploração livre sem estrutura — achou mais/menos?
  Mais rápido? Cite os números do paper original como referência de comparação.

## Fontes

- Roman, Mnich, Hryszko — *Empirical Verification of TQED*, ICTSS 2023 (DOI 10.1007/978-3-031-43240-8_6, paywall — resumo acima)
- Coppola et al. — *On Effectiveness and Efficiency of Gamified Exploratory GUI Testing*, IEEE TSE 2023/2024 (DOI 10.1109/TSE.2023.3348036, paywall — resumo acima)
- `material-de-apoio/artigos-referencia/garaccione-2024-gamified-gui-testing-selenium.pdf` e `coppola-2024-gamification-exploratory-unit-testing.pdf` (preprints satélite, abertos)
- [Test Charter Writing for Exploratory Testing](https://yrkan.com/blog/test-charter-writing/)
