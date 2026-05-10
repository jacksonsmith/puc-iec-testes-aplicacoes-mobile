# Atividade 4 — Suíte Maestro — Aluno: jacksonsmith

> Entrega de teste do prof validando autograder MVP.

## App alvo

`com.android.settings` — app pré-instalado em qualquer emulator Android.

## Flows entregues

| # | Arquivo | User journey |
|---|---------|--------------|
| 01 | `flows/01-launch-settings.yaml` | Lançar Settings |
| 02 | `flows/02-navigate-network.yaml` | Navegar Network & Internet |
| 03 | `flows/03-search-wifi.yaml` | Buscar "Wi-Fi" |
| 04 | `flows/04-display-settings.yaml` | Abrir Display |
| 05 | `flows/05-about-phone.yaml` | About + Build number |

## Como executar localmente

```bash
emulator -avd Pixel_8_API_34 &
maestro test flows/
```

## Notas

- Settings em emulators reais varia texto exato por API level
- `optional: true` cobre variações entre versões
- `scrollUntilVisible` para robustez em telas variáveis
