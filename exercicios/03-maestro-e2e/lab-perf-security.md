# Lab ao vivo — Performance + Security no CineFav (não avaliativo)

> Demo em aula (02/07). Usa o **mesmo app CineFav** já instalado pro Maestro — sem setup extra.
> Não pontua (perf/security saiu do escopo avaliativo); é panorama executável, não slide teórico.

## Duas trilhas — roda em paralelo com o plantão de setup

Enquanto o prof ajuda quem ainda está travado no Android Studio/emulador, quem **já** tem
device/emulador funcionando faz este lab **sozinho e self-guided** (é copiar-colar + ler o
resultado — o prof não está livre pra demonstrar ao vivo nesse momento, circula quando sobra
tempo do plantão). Quem **ainda não** tem device faz a **Trilha B**.

- **Trilha A — com device/emulador rodando:** seções 1–3 completas (mede cold start/jank, acha
  + corrige + rebuilda + reinstala + reverifica o achado de segurança).
- **Trilha B — sem device ainda:** só a seção 2 (achar no manifest — sem `adb`, é ler/editar
  arquivo). Rebuild (seção 2) dá pra fazer mesmo sem emulador se o SDK já estiver instalado
  (não precisa instalar/reverificar até ter um device).

Ao reconvergir (depois do plantão), **5min de compartilhar achados** em vez de demo do zero —
a maioria já fez sozinho.

## 1. Performance — cold start e jank (Trilha A)

```bash
adb shell am force-stop com.puciec.cinefav
adb shell am start -W com.puciec.cinefav/.MainActivity
```

Olhar a linha **`TotalTime`** (ms). Rodar 3x, comparar variação. Depois rodar **sem** o
`force-stop` antes (warm start) e comparar — mesma app, número bem menor.

```bash
adb shell dumpsys gfxinfo com.puciec.cinefav
```

Rolar a lista de filmes no device **antes** de rodar o comando (ele mede o histórico recente).
Olhar `Janky frames` (% de frames que estouraram 16ms/60fps). Comparar com colega — variação
normal entre emulador/device físico.

## 2. Security — achado real no manifest (Trilha A e B)

```bash
cd exercicios/03-maestro-e2e/pratica
cat android/app/src/main/AndroidManifest.xml | grep -E "allowBackup|EXTERNAL_STORAGE|SYSTEM_ALERT"
```

Dois achados **reais** (não plantados — são o app de verdade):

1. **`android:allowBackup="true"`** — permite extrair dados do app via `adb backup` sem root
   (OWASP Mobile M9/M2 — Insecure Data Storage). Ligado ao MASVS-STORAGE.
2. **`READ/WRITE_EXTERNAL_STORAGE` + `SYSTEM_ALERT_WINDOW`** — permissões que o app não usa
   (não salva/lê arquivo nenhum, não desenha overlay). Viola least privilege — superfície de
   ataque desnecessária.

**Fix:** editar `android/app/src/main/AndroidManifest.xml`:
```diff
- android:allowBackup="true"
+ android:allowBackup="false"
```
Remover as 3 permissões não usadas do topo do arquivo.

**Rebuild** (Trilha A e B — só precisa do SDK, não de emulador):
```bash
cd android && ./gradlew assembleDebug
```

**Reinstalar + reverificar** (só Trilha A — precisa de device):
```bash
adb install -r app/build/outputs/apk/debug/app-debug.apk
cat app/src/main/AndroidManifest.xml | grep allowBackup   # confirma na fonte
```

> **Se sobrar tempo/curiosidade:** `aapt dump xmltree app-debug.apk AndroidManifest.xml | grep -i backup`
> mostra o manifest **compilado** de dentro do APK (prova que o fix foi pro binário, não só a fonte).
> `aapt` vem com o Android SDK build-tools (já instalado — mesmo pacote do emulador).

## Por que isso substitui a "Aula 5" original

O deck antigo (`slides-source/archive/aula-05-performance-security-observability.md`) era
panorama genérico (Applitools, Datadog RUM, SSL pinning bypass, Frida) sem conexão com o app
da disciplina. Este lab é **menor, mas real**: mede e corrige o app que a turma já tem rodando.
