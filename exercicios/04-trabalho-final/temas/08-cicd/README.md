# Tema 8 — CI/CD Pipeline Mobile

**Trilha:** 🏗️ Qualidade & Pipeline

## O que é

Montar a esteira automática que roda os testes, builda e prepara o app pra publicar toda vez que
alguém sobe código novo — sem precisar fazer isso na mão.

## Como executar

1. GitHub Actions: workflow que roda `jest` (unit+integração) em todo push/PR.
2. Adicionar job de build: `cd android && ./gradlew assembleDebug` (Android não precisa de conta
   paga, roda liso em CI).
3. Fastlane: configurar lane de `build`/`test` — **não configure lane de upload real pra
   TestFlight/Play Store**, isso exige conta paga (Apple US$99/ano, Google US$25 único) e não é
   esperado no escopo do trabalho. O artifact (APK) sobe como artifact do próprio GitHub Actions
   (`actions/upload-artifact`), não pra loja de verdade.
4. **Nível avançado (opcional, +profundidade):**
   - Flaky test quarantine: identificar teste instável, marcar/isolar, medir taxa de flake.
   - DORA Change Failure Rate: registrar manualmente (planilha simples) quantos dos últimos N
     PRs quebraram o build, calcular a métrica.

## O que entregar

- Repo com `.github/workflows/` funcional — rodando de verdade (print/log do Actions rodando,
  print de execução é aceito mesmo sem badge formal, já que CI não é mais obrigatório pra outros
  temas mas **aqui é o próprio tema**, então esperado que rode).
- README explicando os jobs/lanes configurados.
- Relatório: tempo de pipeline (antes de otimizar vs depois, se otimizaram cache/paralelismo).
  Formato/entrega: usar o template obrigatório [`template-relatorio.md`](../../template-relatorio.md) — ver "Entrega" no enunciado principal.

## Fontes

- [CI/CD pipeline for React Native apps: Fastlane + GitHub Actions — Parte 1](https://medium.com/@malikchohra/ci-cd-pipeline-for-react-native-apps-use-fastlane-and-github-actions-40f9ad2036d0) e [Parte 2](https://medium.com/@malikchohra/ci-cd-pipeline-for-react-native-apps-use-fastlane-and-github-actions-dcf101edc423)
- [From days to minutes: Fastlane + GitHub Actions, caso real 20+ apps](https://dev.to/dvmhmdsd/from-days-to-minutes-build-and-publish-react-native-apps-using-fastlane-and-github-actions-5107)
- [Google Testing Blog — flaky test quarantine](https://testing.googleblog.com/2016/05/)
