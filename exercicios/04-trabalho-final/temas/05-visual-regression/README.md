# Tema 5 — Visual Regression Testing Mobile

**Trilha:** 🤖 Automação & Arquitetura · *(era Visual AI/Applitools — trocado, ver enunciado.md)*

## O que é

Testar se a TELA do app está visualmente certa (não só se funciona) — comparar screenshot
automaticamente e pegar quando algo quebrou visualmente, tipo um botão que sumiu ou texto cortado.

## Como executar

**Caminho principal — Maestro Visual Testing (mesma ferramenta que já dominam):**

1. Ver [maestro.dev/blog/visual-testing](https://maestro.dev/blog/visual-testing) — recurso
   nativo do Maestro pra comparar screenshot com baseline.
2. Adicione asserção visual num flow existente (ex.: tela de detalhe do filme).
3. Rode uma vez pra gerar a baseline, depois mude algo de propósito (ex.: cor de um botão) e rode
   de novo — confirme que o diff é detectado.
4. Documente falso-positivo real que encontrarem (ex.: animação em andamento causando diff falso)
   — isso é achado de qualidade pro relatório.

**Caminho alternativo — React Native Owl (open source, feito específico pra RN):**
```bash
npm install --save-dev react-native-owl
```
Ver [github.com/FormidableLabs/react-native-owl](https://github.com/FormidableLabs/react-native-owl)
— funciona parecido com Maestro/Detox mas focado em screenshot diff.

## O que entregar

- Repo com ≥ 5 asserções visuais em telas diferentes do app.
- Baseline commitada + 1 caso demonstrando detecção de regressão real (quebrar algo de propósito,
  mostrar o teste pegando).
- README explicando como atualizar a baseline quando a mudança de UI é intencional (não é bug).
- Relatório: discutir falso-positivo/falso-negativo — quando visual regression engana.
  Formato/entrega: usar o template obrigatório [`template-relatorio.md`](../../template-relatorio.md) — ver "Entrega" no enunciado principal.

## Fontes

- [Introducing Visual Testing in Maestro](https://maestro.dev/blog/visual-testing)
- [React Native Owl — FormidableLabs](https://github.com/FormidableLabs/react-native-owl)
- [Screenshot Testing Storybook for React Native with Applitools](https://medium.com/@gytis.vinclovas/screenshot-testing-storybook-for-react-native-with-applitools-47ce2e4ad0d2) (referência, caminho pago se quiserem comparar)
