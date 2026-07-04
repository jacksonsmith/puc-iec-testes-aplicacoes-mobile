# Tema 3 — Performance Mobile Testing

**Trilha:** ⚡ Performance & Segurança · *(stack trocada de Macrobenchmark — ver enunciado.md)*

## O que é

Medir se o app é rápido de verdade — quanto tempo demora pra abrir, se trava ao rolar a tela,
quanto de CPU/memória consome — com dado, não achismo. E depois melhorar com base no que mediram.

## Como executar

**Passo 0 — base que vocês já sabem fazer (repete o lab de 02/07):**
```bash
adb shell am force-stop com.puciec.cinefav
adb shell am start -W com.puciec.cinefav/.MainActivity   # olhar TotalTime
adb shell dumpsys gfxinfo com.puciec.cinefav              # olhar Janky frames
```
Isso já é ponto de partida válido — não é obrigatório usar ferramenta nova pra começar.

**Passo 1 — Flashlight (medição de app, cold start/FPS/CPU):**
```bash
# instalação oficial (não é npm — script próprio, ver docs.flashlight.dev/getting-started/):
curl https://get.flashlight.dev | bash          # macOS/Linux
# iwr https://get.flashlight.dev/windows -useb | iex   # Windows

# device/emulador Android conectado + app aberto, depois:
flashlight measure
flashlight test --bundleId com.puciec.cinefav --testCommand "adb shell am start com.puciec.cinefav/.MainActivity" --duration 15000
```
Roda sobre ADB, sem módulo Gradle separado, sem device rooteado. **Atenção:** Flashlight mede via
ADB — é ferramenta **Android**; não achamos suporte iOS documentado. Se o grupo quiser cobrir iOS
também, usar a técnica do Passo 0 (`xcrun simctl`/Instruments) como complemento, não substituto.
Guias oficiais RN: [docs.flashlight.dev/guides/react-native](https://docs.flashlight.dev/guides/react-native/react-native-eu/)
e [JS FPS](https://docs.flashlight.dev/guides/react-native/js-fps/).

**Passo 2 — Reassure (regressão de performance de componente, integra com o que já sabem):**
```bash
npm install --save-dev reassure
```
Escreva um "teste" de performance igual um teste RNTL normal, mas usando `measurePerformance()` da
Reassure em vez de `expect()`. Ele roda o cenário várias vezes e compara com a baseline (branch main).

**Passo 3 — comparar antes/depois de uma otimização real** (ex.: lazy-load de imagem, memoização
de lista) — meça, otimize, meça de novo, mostre o número mudando.

## O que entregar

- Repo com scripts/testes de performance (Flashlight + Reassure) rodáveis em máquina limpa.
- Baseline registrada (números do "antes") + pelo menos 1 otimização real aplicada + números do
  "depois".
- README com os comandos exatos pra reproduzir a medição.
- Relatório: interpretar os números (não só printar), citar por que a otimização ajudou.
  Formato/entrega: usar o template obrigatório [`template-relatorio.md`](../../template-relatorio.md) — ver "Entrega" no enunciado principal.

## Fontes

- [Flashlight — docs oficiais](https://docs.flashlight.dev) (setup, guias RN, referência de comandos)
- [Flashlight — GitHub (BAM)](https://github.com/bamlab/flashlight)
- [How to measure React Native performance with Flashlight](https://www.theodo.com/blog/measuring-react-native-performance-with-flashlight)
- [Reassure — Callstack](https://github.com/callstack/reassure)
- [Performance Regression Testing for React Native — Callstack blog](https://www.callstack.com/blog/performance-regression-testing-react-native)
