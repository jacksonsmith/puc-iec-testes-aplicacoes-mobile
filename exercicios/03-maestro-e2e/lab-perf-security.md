# Lab ao vivo — Performance + Security no CineFav (não avaliativo)

> Demo em aula (02/07). Usa o **mesmo app CineFav** já instalado pro Maestro — sem setup extra.
> Não pontua (perf/security saiu do escopo avaliativo); é panorama executável, não slide teórico.

## Duas trilhas — roda em paralelo com o plantão de setup

Enquanto o prof ajuda quem ainda está ajustando o Android Studio/emulador, quem **já** tem
device/emulador funcionando faz este lab **sozinho e self-guided** (é copiar-colar + ler o
resultado — o prof circula quando sobra tempo do plantão). Quem **ainda não** tem device
funcionando faz a **Trilha B**.

- **Trilha A — com device/emulador rodando:** seções 1–3 completas (mede cold start/jank, acha
  + corrige + rebuilda + reinstala + reverifica o achado de segurança).
- **Trilha B — sem device ainda:** achar + editar o manifest (sem `adb`, é ler/editar arquivo) +
  **provar o achado no binário já instalado** (`aapt dump`, sem precisar buildar nada — ver seção
  2). Rebuild completo fica pra quando tiver device — builda sem poder verificar não vale a pena.

Ao reconvergir (depois do plantão), **5min de compartilhar achados** em vez de demo do zero —
a maioria já fez sozinho.

## 0. Antes de começar

**Onde rodar cada comando:**
- Comandos `adb shell ...` e `adb install` **rodam de qualquer pasta** — não dependem de estar
  dentro do repo, só precisam do device/emulador conectado.
- Comandos que mexem em arquivo do repo (`grep` no manifest, `./gradlew`, `aapt dump` no APK
  buildado) **precisam estar dentro de `exercicios/03-maestro-e2e/pratica`**, a partir da raiz
  do repo clonado. Confirma onde você está:
  ```bash
  pwd                 # deve terminar em .../exercicios/03-maestro-e2e/pratica
  ls android           # se der "No such file or directory", você não está no lugar certo
  ```

**Confirma que o device/emulador está respondendo:**
```bash
adb devices
```
Esperado:
```
List of devices attached
emulator-5554	device
```
(ou o serial do seu celular físico, se for esse o caso).

**Troubleshooting rápido — se travar aqui, resolve antes de seguir:**

| Sintoma | Causa provável | Solução |
|---|---|---|
| `adb devices` não lista nada | Emulador não bootou / cabo USB solto / Depuração USB desligada | Reabrir emulador (Android Studio → Device Manager → ▶) ou reconectar cabo + checar *Opções do desenvolvedor* |
| `adb: command not found` | `platform-tools` não está no PATH | Ver passo 1b do [`COMECE-AQUI.md`](./COMECE-AQUI.md) — precisa exportar `ANDROID_HOME` e reabrir o terminal |
| `error: more than one device/emulator` | Emulador + celular físico conectados ao mesmo tempo | `adb devices` pra ver os IDs, usar `adb -s <id> shell ...` em cada comando, ou desconectar um dos dois |
| Comando `adb shell` trava sem responder | Servidor adb travado | `adb kill-server && adb start-server`, tentar de novo |
| `aapt: command not found` | `aapt` não está no PATH (só `adb`/`emulator` costumam estar) | Usar caminho completo: `$ANDROID_HOME/build-tools/<versão>/aapt` — confira a versão instalada com `ls $ANDROID_HOME/build-tools` |

## 1. Performance — cold start e jank (Trilha A)

> **Por que importa:** esses milissegundos decidem se o usuário espera ou fecha o app antes de
> ver a primeira tela. Ref. oficial: [Android Developers — app startup best practices](https://developer.android.com/topic/performance/appstartup/best-practices).

```bash
adb shell am force-stop com.puciec.cinefav
adb shell am start -W com.puciec.cinefav/.MainActivity
```

**Resultado real** (capturado agora, emulador Pixel/API 35 — o seu vai variar):
```
Status: ok
LaunchState: COLD
Activity: com.puciec.cinefav/.MainActivity
TotalTime: 1935
WaitTime: 1942
Complete
```

**Como ler:** `TotalTime` (ms) é o número que importa — do toque no ícone até a primeira tela
desenhada. `LaunchState: COLD` confirma que foi partida fria (processo não existia). Rodamos 3x
seguidas aqui e variou **1935 → 2612 → 3521ms** — variação de quase 2x entre execuções é normal
em emulador (recursos da máquina host competindo); em device físico costuma ser mais estável.

**Pra warm/hot start, ⚠️ não é só "rodar sem o `force-stop`"** — se o app ainda está em primeiro
plano, o Android só reenvia o intent pro app já aberto e o comando devolve `TotalTime: 0` (não
mede nada, é ruído). Pra medir warm/hot start de verdade, manda o app pra **background** primeiro:
```bash
adb shell input keyevent KEYCODE_HOME
adb shell am start -W com.puciec.cinefav/.MainActivity
```
**Resultado real:**
```
LaunchState: HOT
TotalTime: 280
```
`280ms` vs `~1935-3521ms` de cold start — diferença de mais de 6x, e é exatamente por isso que
apps guardam processo em memória: reabrir é muito mais barato que iniciar do zero.

```bash
adb shell dumpsys gfxinfo com.puciec.cinefav
```

Rolar a lista de filmes no device **antes** de rodar o comando (ele mede o histórico recente):
```bash
adb shell input swipe 500 1800 500 400 200   # simula 1 scroll rápido, se não quiser rolar na mão
```

**Resultado real** (mesmo emulador, 5 scrolls simulados):
```
Total frames rendered: 67
Janky frames: 66 (98.51%)
50th percentile: 81ms
90th percentile: 150ms
```

**Como ler:** `Janky frames` é a % de frames que passaram de 16ms (o orçamento pra manter 60fps).
**98.51% aqui é um número de emulador sem aceleração de GPU real — não é o app que está ruim,
é o ambiente.** Isso não é desculpa genérica: rodamos e o número realmente veio assim. Comparem
com colega que estiver em device físico — a diferença costuma ser grande (device físico geralmente
fica bem abaixo de 20-30%). O valor do exercício é comparar **o mesmo app em ambientes diferentes**,
não validar se 98% é "bom" ou "ruim" em isolado — em emulador, quase todo app vai jankar bastante.

**Por que não tem "fix" nessa seção:** olhamos o código do CineFav — é app limpo, sem gargalo
plantado. Nem todo achado de QA tem correção de 1 linha; às vezes o valor é registrar o **baseline**
(esses números de hoje) pra virar alarme se um PR futuro piorar. É um músculo de QA diferente do
da seção 2 (achar-e-corrigir na hora): aqui é achar-e-vigiar.

### Bônus — sentir uma regressão de verdade (Trilha A, opcional)

O app não tem gargalo real pra "consertar" — mas dá pra **sentir o que uma regressão de
performance parece** de forma controlada e reversível, com número real medido (não estimado).

> **Isso é uma demo sintética/didática — não é um achado real como o `allowBackup` da seção 2.**
> Deixamos bem marcado no código (comentário `PERF-DEMO`) pra não confundir os dois.

```bash
node scripts/toggle-perf-regression.js status   # confirma que está "normal" antes de começar
node scripts/toggle-perf-regression.js          # liga um delay de 1500ms no boot do app
cd android && ./gradlew assembleDebug && cd ..
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
adb shell am force-stop com.puciec.cinefav
adb shell am start -W com.puciec.cinefav/.MainActivity
```

**Resultado real** (testamos agora, 2x seguidas, mesmo emulador):

| | Baseline (sem regressão, build debug) | Com regressão (+1500ms artificial) |
|---|---|---|
| Cold start | 4808 – 6033ms | **10477 – 19643ms** |

**Como ler — o achado mais interessante não é o número, é o formato:** a regressão adicionou
"só" 1500ms de `Thread.sleep`, mas o `TotalTime` subiu **muito mais que 1500ms** — não é soma
linear. Bloquear a **main thread** no boot atrasa tudo que depende dela em cascata (inicialização
de outros módulos, desenho da primeira tela) — o custo real de travar a thread errada é maior
que o tempo travado em si. É por isso que "não bloquear a main thread" é regra de ouro de
performance mobile, não só recomendação teórica.

**Reverter depois:**
```bash
node scripts/toggle-perf-regression.js          # roda nucleo mesmo comando, desliga se já tá ligado
cd android && ./gradlew assembleDebug && cd ..
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```
Confira com `git diff android/app/src/main/java/com/puciec/cinefav/MainApplication.kt` que
voltou limpo (sem diferença) antes de dar o app por encerrado.

## 2. Security — achado real no manifest (Trilha A e B)

> **Por que importa:** com o device na mão (sem senha, sem root), dá pra extrair os dados do app
> via `adb backup` — não é hipotético: um SDK terceiro real (EngageLab) expôs "millions of Android
> wallets" por misconfig parecido ([Microsoft Security Blog, abr/2026](https://www.microsoft.com/en-us/security/blog/2026/04/09/intent-redirection-vulnerability-third-party-sdk-android/)).

```bash
cd exercicios/03-maestro-e2e/pratica
cat android/app/src/main/AndroidManifest.xml | grep -E "allowBackup|EXTERNAL_STORAGE|SYSTEM_ALERT"
```

**Resultado real** (é o app de verdade, roda exatamente assim):
```
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
<application ... android:allowBackup="true" ...>
```

Dois achados **reais** (não plantados):

1. **`android:allowBackup="true"`** — permite extrair dados do app via `adb backup` sem root
   (OWASP Mobile M9/M2 — Insecure Data Storage). Ligado ao MASVS-STORAGE.
   > **M9 e M2 não são achados diferentes** — M9 é a numeração do Mobile Top 10 2024 (atual);
   > M2 é a numeração da lista antiga (2016). Mesma categoria (Insecure Data Storage), 2 rótulos
   > por causa da atualização do OWASP. Ref.: [OWASP MASTG](https://mas.owasp.org/MASTG/).
2. **`READ/WRITE_EXTERNAL_STORAGE` + `SYSTEM_ALERT_WINDOW`** — permissões que o app não usa
   (não salva/lê arquivo nenhum, não desenha overlay). Viola least privilege — superfície de
   ataque desnecessária.

### Provando o achado 1 — `adb backup` de verdade (Trilha A, todo SO)

Testamos e capturamos de verdade (02/07/2026, emulador Android 15, build debug):

```bash
adb backup -f cinefav.ab com.puciec.cinefav
```

**Confirma na tela do device/emulador** — aparece um diálogo "Full backup" com dois botões,
**"Do not back up"** / **"Back up my data"**. Idêntico em Windows, Linux e Mac (é o `adb`, não
o SO, que faz isso) — no emulador, clica com o mouse; no celular físico, toca na tela. **Leva uns
8-10s pra aparecer** — não cancele achando que travou.

**Resultado real:** arquivo `cinefav.ab` de **1.2MB**, sem senha (deixamos o campo em branco).

**Descompactar** (mesmo comando nos 3 sistemas — `.ab` é um header de texto + `zlib` de um
`tar`, então usamos Python, que todo mundo já tem instalado pelo curso):

```bash
python3 -c "
import zlib
with open('cinefav.ab','rb') as f:
    for _ in range(4): f.readline()   # pula o header (magic/versão/compactação/criptografia)
    data = zlib.decompress(f.read())
with open('cinefav.tar','wb') as out:
    out.write(data)
"
tar -tvf cinefav.tar   # lista o conteúdo
tar -xf cinefav.tar    # extrai de verdade
```

No Windows, roda os dois comandos `python3 -c "..."` e `tar` **no PowerShell** — `tar` já vem
built-in no Windows 10+, não precisa instalar nada.

**O que vem no tar:** `apps/com.puciec.cinefav/sp/*.xml` (SharedPreferences), `.../r/app_webview/`
(cookies e dados do WebView), o bundle JS do app — o sandbox inteiro, sem root, sem senha.

> **Não quer rodar agora?** Já capturamos um exemplo real pra vocês — baixem
> [`cinefav-backup-exemplo.ab`](./cinefav-backup-exemplo.ab) e rodem só a parte de descompactar
> acima, sem precisar de device/emulador.

**Fix:** editar `android/app/src/main/AndroidManifest.xml`:
```diff
- android:allowBackup="true"
+ android:allowBackup="false"
```
Remover as 3 permissões não usadas do topo do arquivo.

### Trilha B — provar o achado sem buildar nada

Vocês já têm o `CineFav.apk` baixado (usaram pra instalar via `adb install`, no COMECE-AQUI —
ajuste o caminho abaixo pra onde salvaram o arquivo, ex. `~/Downloads/CineFav.apk`). Dá pra
provar o achado **no binário de verdade, real, distribuído** — sem SDK de projeto, sem
`npm install`, sem device:
```bash
$ANDROID_HOME/build-tools/<sua-versão>/aapt dump xmltree CineFav.apk AndroidManifest.xml | grep -i -A1 backup
```

**Resultado real:**
```
A: android:allowBackup(0x01010280)=(type 0x12)0xffffffff
```

**Como ler — isso não é bug, é formato binário:** o manifest compilado dentro do APK não guarda
texto `"true"`/`"false"`, guarda um inteiro. **`0xffffffff` = `true`** (todos os bits ligados);
**`0x00000000` = `false`**. Se depois do fix vocês rodarem o mesmo comando e virem `0x00000000`,
o fix pegou no binário de verdade, não só no código-fonte.

`aapt` vem com o Android SDK build-tools (mesmo pacote do emulador, já instalado — ver
troubleshooting na seção 0 se `aapt` não estiver no PATH). Isso mostra que o achado não é só
teoria de código-fonte — está no binário que qualquer pessoa baixaria. Fixar e reverificar em
build novo fica pra quando tiver device (Trilha A) — builda sem poder instalar não prova nada.

### Trilha A — rebuild, reinstalar, reverificar

> **Antes de buildar:** se vocês instalaram o CineFav via APK pronto (fluxo padrão do
> COMECE-AQUI), **nunca rodaram `npm install` nessa pasta** — o rebuild vai falhar sem isso
> (`Included build '.../android/null' does not exist`). Rodem primeiro:
> ```bash
> npm install
> ```
> **Isso é pesado — reservem tempo e espaço em disco.** Testamos: ~5min no primeiro build, e o
> Gradle cria vários GB de artefato (múltiplas arquiteturas nativas). Se o disco estiver quase
> cheio, o build falha com "No space left on device" no meio — confiram espaço livre antes.

```bash
cd android && ./gradlew assembleDebug
adb install -r app/build/outputs/apk/debug/app-debug.apk
cat app/src/main/AndroidManifest.xml | grep allowBackup   # confirma na fonte
$ANDROID_HOME/build-tools/<sua-versão>/aapt dump xmltree app/build/outputs/apk/debug/app-debug.apk AndroidManifest.xml | grep -i -A1 backup
```
Depois do fix, o `aapt dump` deve mostrar `0x00000000` (era `0xffffffff` antes — ver seção
"Como ler" acima) — prova que o fix foi pro binário **recém-buildado**, não só a fonte. Comparem
com o resultado da Trilha B (`CineFav.apk` original) pra ver a diferença antes/depois lado a lado.

## Por que isso substitui a "Aula 5" original

O deck antigo (`slides-source/archive/aula-05-performance-security-observability.md`) era
panorama genérico (Applitools, Datadog RUM, SSL pinning bypass, Frida) sem conexão com o app
da disciplina. Este lab é **menor, mas real**: mede e corrige o app que a turma já tem rodando.
