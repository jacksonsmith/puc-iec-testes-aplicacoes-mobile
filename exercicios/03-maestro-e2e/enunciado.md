# Atividade 3 — Suíte Maestro E2E (10 pts)

**Disciplina:** Testes de Aplicações Mobile
**Entrega:** até **28/06/2026**
**Modalidade:** individual
**Tempo estimado:** ~2h (flows 01–03 feitos em aula; 04–05 em casa)

---

## Contexto

Na Aula 4 você viu Maestro ao vivo. `01-launch.yaml` é o modelo resolvido. `02` e `03` você criou sozinho no Maestro Studio durante a aula. Esta entrega é finalizar os flows `04` e `05` e subir tudo via PR.

---

## Pré-requisitos (setup antes da entrega)

**Rodar verificação de setup:**
```bash
curl -L https://raw.githubusercontent.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/main/setup-maestro-check.sh | bash
```

Se der erro, seguir os passos abaixo manualmente.

### Passo 1 — Android Platform Tools (adb)

| Sistema | Comando |
|---|---|
| **macOS** | `brew install android-platform-tools` |
| **Windows** | `choco install android-platform-tools` |
| **Linux** | `sudo apt install android-tools-adb` |

Verificar: `adb --version`

### Passo 2 — Emulator rodando

**Opção A: Android Emulator** (VM local)
```bash
# Listar AVDs disponíveis
emulator -list-avds

# Iniciar emulator (ex: Medium_Phone_API_35)
emulator -avd Medium_Phone_API_35 -no-snapshot-load -no-audio
# Flags: -no-snapshot-load (boot fresh, rápido), -no-audio (economia RAM)
```

**Opção B: Dispositivo físico** (USB)
```bash
# Conectar via cabo USB
adb devices  # deve listar seu device
```

### Passo 3 — App TestesQAMobile

**Download APK (mais fácil — sem build):**
```bash
# Download from GitHub Releases
curl -L https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/releases/download/v1.0/app-debug.apk -o app-debug.apk

# Instalar no device/emulator
adb install app-debug.apk
```

**Alternativa: Play Store**
- Android: buscar "Testes QA Mobile" (free)
- Instalar normalmente

### Passo 4 — Maestro CLI

```bash
curl -Ls "https://get.maestro.mobile.dev" | bash
# Windows: iwr get.maestro.mobile.dev/windows | iex

maestro --version  # verificar: 2.6.x ou superior
```

### Passo 5 — Testar tudo junto

```bash
maestro hierarchy  # Maestro consegue enxergar o device?
# Deve mostrar XML da tela atual
```

Se tudo passou ✅ — pronto pra entrega!

---

## O app-alvo: TestesQAMobile

| Tela | testIDs disponíveis |
|---|---|
| Home | `home-category-functional`, `home-category-performance` |
| Formulário | `userform-name-input`, `userform-email-input`, `userform-submit-button` |
| Calculadora | `calculator-digit-7`, `calculator-operator-plus`, `calculator-equals`, `calculator-display` |
| Todo list | `todolist-add-button`, `todolist-item-${id}`, `todolist-item-delete-${id}` |
| Onboarding | `onboarding-next-button`, `onboarding-skip-button`, `onboarding-finish-button` |

Use `tapOn: id: "testID"` — mais estável que `tapOn: "texto"`.

---

## Critérios de avaliação

| Flow | Tela | Pts |
|---|---|---|
| `flows/01-launch.yaml` | Home aparece com categorias | 2 |
| `flows/02-userform.yaml` | Preencher formulário + submeter | 2 |
| `flows/03-calculator.yaml` | `7 + 3 =` → verificar `10` na tela | 2 |
| `flows/04-todolist.yaml` | Adicionar item + verificar que aparece | 2 |
| `flows/05-onboarding.yaml` | Completar onboarding até tela final | 2 |
| **Bônus** | `_fragments/` com fragmento + `runFlow:` em algum flow | +1 |

**Total: 10 pts** (+ 1 bônus)

Cada flow vale **2 pts**: 1pt por existir com `appId:` correto + 1pt por estar completo (sem `# TODO` + tem `assertVisible`).

`01-launch.yaml` já vem resolvido no starter — use como modelo para os outros.

---

## Rodando local

**Setup rápido com emulator automático:**
```bash
cd exercicios/03-maestro-e2e

# Inicia emulator + roda todos os flows
chmod +x ../../maestro-local.sh
../../maestro-local.sh

# Ou especificar AVD
../../maestro-local.sh "Pixel_6_API_35" test flows/
```

**Ou manual (se já tem emulator rodando):**
```bash
cd exercicios/03-maestro-e2e/pratica

# Um flow
maestro test flows/04-todolist.yaml

# Todos
maestro test flows/

# Visual editor (Maestro Studio — browser em localhost:9999)
maestro studio
```

**Troubleshooting:**
- Emulator lento? Rodar sem snapshot: `emulator -avd XXX -no-snapshot-load -no-audio`
- Device não conecta? `adb kill-server && adb start-server`
- Maestro hierarchy vazio? Restart emulator

---

## Entrega

PR no **seu fork** com os 5 flows em `exercicios/03-maestro-e2e/pratica/flows/`.

O bot comenta a nota no PR a cada commit — você sabe a nota antes do prazo.
Após aprovação do bot, cole o link do PR no Canvas (campo de entrega da Atividade 3).
