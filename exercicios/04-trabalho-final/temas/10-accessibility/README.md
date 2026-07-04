# Tema 10 — Accessibility Testing Mobile

**Trilha:** 🔍 Manual, Exploratório & Acessibilidade

## O que é

Testar se o app funciona pra quem usa leitor de tela, tem baixa visão ou dificuldade motora — não
só pra quem enxerga bem e usa o dedo perfeitamente.

## Como executar

**Obrigatório — Android Accessibility Scanner (grátis, já vale nota cheia sozinho):**

1. Instalar o app "Accessibility Scanner" da Google Play no emulador/device.
2. Ativar, navegar pelo CineFav, rodar o scan em cada tela principal (login, lista, busca,
   detalhe, favoritos).
3. Catalogar os achados (contraste baixo, alvo de toque pequeno, elemento sem label).
4. Corrigir ≥ 3 achados no código-fonte (`accessibilityLabel`, `accessibilityRole`,
   `accessibilityHint` — mesma sintaxe já vista em aula).
5. Rodar o scan de novo, mostrar que o achado sumiu.

**Complementar — TalkBack manual:**
Ativar TalkBack (Configurações > Acessibilidade) e tentar navegar pelo app só ouvindo, sem olhar
a tela. Documentar onde travou.

**Bônus (só quem tem Mac) — Xcode Accessibility Inspector:**
Mesmo processo, lado iOS. Não é requisito — quem não tem Mac não perde nota por isso.

## O que entregar

- Repo/relatório com ≥ 5 achados reais (Android Scanner + TalkBack), cada um com print antes/depois.
- Fix aplicado no código pra pelo menos 3 achados.
- Testes automatizados verificando os props de acessibilidade (RNTL já suporta `getByRole`) —
  ver [react-native-accessibility-engine](https://github.com/aryella-lacerda/react-native-accessibility-engine)
  pra assertar isso de forma mais estruturada.
- Relatório: cenário real de usuário com deficiência tentando usar o app — onde ele travaria.
  Formato/entrega: usar o template obrigatório [`template-relatorio.md`](../../template-relatorio.md) — ver "Entrega" no enunciado principal.

## Fontes

- [Accessibility — React Native docs](https://reactnative.dev/docs/accessibility)
- [How to Test React Native Apps for Accessibility](https://oneuptime.com/blog/post/2026-01-15-react-native-accessibility-testing/view)
- [React Native Accessibility | BrowserStack](https://www.browserstack.com/guide/react-native-accessibility)
