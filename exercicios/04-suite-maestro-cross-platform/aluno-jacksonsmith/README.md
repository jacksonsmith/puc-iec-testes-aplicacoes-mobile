# Atividade 4 — Suíte Maestro — Aluno: jacksonsmith

> **Entrega de exemplo (PR de teste do prof)** validando o autograder MVP.

## App alvo

`com.android.settings` — app pré-instalado em qualquer emulator Android. Escolhido pra exemplo do autograder porque está sempre disponível, sem precisar de install adicional.

## Flows entregues

| # | Arquivo | User journey |
|---|---------|--------------|
| 01 | `flows/01-launch-settings.yaml` | Lançar Settings e verificar tela inicial |
| 02 | `flows/02-navigate-network.yaml` | Navegar para Network & Internet |
| 03 | `flows/03-search-wifi.yaml` | Buscar "Wi-Fi" via search bar |
| 04 | `flows/04-display-settings.yaml` | Scroll até Display e abrir |
| 05 | `flows/05-about-phone.yaml` | Scroll até About e verificar Build number |

## Como executar localmente

```bash
# Subir emulator Android (Pixel 8 API 34)
emulator -avd Pixel_8_API_34 &

# Rodar todos os flows
maestro test flows/

# Rodar individual
maestro test flows/01-launch-settings.yaml
```

## Notas

- Settings em emulators reais pode variar texto exato por API level
- `optional: true` em alguns taps cobre variações entre versões
- `scrollUntilVisible` usado pra robustez em telas com tamanho variável
