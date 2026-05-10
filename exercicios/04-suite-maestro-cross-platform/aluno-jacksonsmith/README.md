# Atividade 4 — Suíte Maestro — Aluno: jacksonsmith (teste)

Entrega exemplo do prof — 5 flows Maestro contra **TestesQAMobile** (`com.apptestesmobile`), app de referência oficial da disciplina.

## App alvo

**TestesQAMobile** — instalável via Play Store / App Store. 35 exercícios em 12 categorias. Bundle: `com.apptestesmobile`.

## Flows entregues

| # | Arquivo | Categoria | User journey |
|---|---------|-----------|--------------|
| 01 | `01-launch-settings.yaml` | — | Launch + assert tela inicial |
| 02 | `02-navigate-network.yaml` | Funcional 1.1 | Cadastro de Usuário (form) |
| 03 | `03-search-wifi.yaml` | Funcional 1.2 | Calculadora (7+3=10) |
| 04 | `04-display-settings.yaml` | Funcional 1.3 | Todo List (adicionar tarefa) |
| 05 | `05-about-phone.yaml` | Usabilidade 2.1 | Onboarding (3 telas + começar) |

## Como executar localmente

```bash
# 1. Instalar app no emulator/device via Play Store
# OU baixar APK de release e instalar via adb

# 2. Subir emulator Android
emulator -avd Pixel_8_API_34 &

# 3. Rodar flows
maestro test flows/
```

## Notas

- `optional: true` em taps cobre variações de label entre versões do app
- Flow 01 tem assert genérico ("Testes QA") — deve funcionar em qualquer versão
- Flows 02-05 dependem da estrutura de menu da v1.0+
