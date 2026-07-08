# Tema 4 — Mobile Security Testing

**Trilha:** ⚡ Performance & Segurança

## O que é

Caçar falhas de segurança no app antes que um atacante ache — dado vazando, permissão
desnecessária, configuração perigosa no manifest.

## Como executar

**Obrigatório — aprofunda o lab de 02/07 (vocês já sabem fazer isso):**
```bash
cd exercicios/03-maestro-e2e/pratica
cat android/app/src/main/AndroidManifest.xml | grep -E "allowBackup|EXTERNAL_STORAGE|SYSTEM_ALERT|exported"
```
Vá além do que o lab cobriu: procure `android:exported="true"` em activities/services que não
precisam ser exportadas, verifique `usesCleartextTraffic`, confira se há segredo/API key
hardcoded no código-fonte (`grep -rE "sk-|api_key|secret" src/`).

**Mapeie cada achado no OWASP Mobile Top 10 2024** ([mas.owasp.org](https://mas.owasp.org/MASTG/))
— isso é o que dá rigor ao relatório (não é só "achei", é "achei e isso é categoria X porque Y").

**Bônus — MobSF (exige Docker, não instalado no setup do curso):**
```bash
# 1. Instalar Docker Desktop primeiro (docker.com) — reserve tempo pra isso, não é instantâneo
docker pull opensecurity/mobile-security-framework-mobsf:latest
docker run -it -p 8000:8000 opensecurity/mobile-security-framework-mobsf:latest
# 2. Abrir localhost:8000, fazer upload do .apk (gerar com: cd android && ./gradlew assembleDebug)
```
Análise **estática** (upload do APK) é viável. Análise **dinâmica** (roda o app dentro do MobSF)
exige emulador rooteado — não recomendado tentar em 2 semanas, é bônus de bônus.

## O que entregar

- Repo/relatório com **≥ 5 achados reais** mapeados no OWASP Mobile Top 10, cada um com: onde
  está (arquivo/linha), por que é risco, como corrigir.
- Fix aplicado pra pelo menos 2 achados (diff antes/depois, tipo o `allowBackup` do lab).
- Se tentou MobSF: print/relatório da análise estática.
- Relatório: framing de risco (o que um atacante faria com cada achado).
  Formato/entrega: usar o template obrigatório [`template-relatorio.md`](../../template-relatorio.md) — ver "Entrega" no enunciado principal.

## Fontes

- [OWASP MASTG](https://mas.owasp.org/MASTG/)
- [Securing React Native Mobile Apps with OWASP MAS — blog oficial OWASP](https://owasp.org/blog/2024/10/02/Securing-React-Native-Mobile-Apps-with-OWASP-MAS)
- [Microsoft Security Blog — caso real EngageLab SDK](https://www.microsoft.com/en-us/security/blog/2026/04/09/intent-redirection-vulnerability-third-party-sdk-android/)
