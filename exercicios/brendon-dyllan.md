# Atividade 1 — Análise de Cobertura — Brendon Dyllan Neves Alves

---

## 0. Identificação

* **Aluno:** Brendon Dyllan Neves Alves
* **App escolhido:** DuckDuckGo Android
* **Repo:** [https://github.com/duckduckgo/Android](https://github.com/duckduckgo/Android)
* **Justificativa de escolha:** Escolhi o DuckDuckGo por ser um navegador focado estritamente em privacidade. O app manipula componentes críticos de baixo nível (como instâncias customizadas de `WebView`, criptografia em banco de dados local e interceptação de tráfego de rede), o que exige uma estratégia de testes robusta para evitar o vazamento de dados dos usuários.

---

## 1. Estratégia Atual

### 1.1 Tipos de teste + ferramentas

| Tipo de Teste | Existe? | Ferramenta | Onde fica |
| :--- | :--- | :--- | :--- |
| **Unit** | Sim | JUnit 4/5, MockK, Robolectric, Turbine | `*/src/test/java/` e `*/src/test/kotlin/` |
| **UI nativo** | Sim | Espresso, AndroidX Test Runner | `*/src/androidTest/java/` |
| **E2E cross-platform** | Não | Nenhum framework agnóstico detectado | — |
| **Outros (Arquitetura)**| Sim | ArchUnit | `*/src/test/java/.../architecture/` |

### 1.2 CI / CD

| Workflow | Quando roda | O que testa |
| :--- | :--- | :--- |
| `ci.yml` | Em todo `pull_request` e `push` na branch principal | Compilação (`assembleDebug`), análise estática (`detekt`, `ktlint`) e a suíte completa de **Unit Tests** locais. |
| `nightly.yml` | Agendado (via `schedule` cron), executado uma vez por noite | Execução de testes instrumentados mais pesados (**UI Tests** via emuladores ou Firebase Test Lab) e geração de builds internas. |

> **Observação geral:** O pipeline de CI está bem maduro para o bloqueio de PRs usando testes unitários rápidos e checagens de arquitetura com o `ArchUnit`. No entanto, a suite instrumentada de UI fica isolada no fluxo *nightly*, o que significa que regressões visuais ou de integração de interface podem passar para a branch principal e ser detectadas apenas no dia seguinte.

### 1.3 Cobertura

* ❌ **Badge no README →** Não há badge de cobertura pública exposta no arquivo principal do repositório.
* ⚠️ **Workflow gera coverage →** Existem configurações do Jacoco/Kover em submódulos do Gradle, mas o artefato de cobertura não é enviado para ferramentas externas públicas (como Codecov ou Coveralls) no fluxo padrão de PR.
* ✅ **Não há cobertura pública** (analisada em nível de métricas abertas para a comunidade).

---

## 2. Gaps (2)

### Gap 1: Ausência de Testes de Regressão Visual (Snapshot Testing)
* **O que falta:** O aplicativo atualiza elementos de interface gráfica com frequência para destacar novos recursos de privacidade, mas não possui ferramentas de Snapshot automatizadas (como *Paparazzi* ou *Showkase*) integradas ao fluxo de desenvolvimento.
* **Risco:** Sem testes de snapshot, quebras de layout causadas por mudanças globais de estilos ou internacionalização longa podem passar batido, resultando em botões sobrepostos ou componentes de limpeza de dados (como o Fire Button) desalinhados em dispositivos com densidades de tela específicas.

### Gap 2: Falta de Testes de Regressão de Performance Automatizados (Benchmarks)
* **O que falta:** O repositório não possui rotinas automatizadas no CI utilizando bibliotecas como o `Macrobenchmark` para auditar métricas de *Cold Start* (tempo de inicialização) ou perdas de taxa de quadros (*jank* / queda de FPS) ao renderizar páginas pesadas.
* **Risco:** Sem testes de performance no pipeline, otimizações inadequadas ou injeções de dependência complexas na inicialização do app podem degradar a experiência do usuário de forma silenciosa, gerando travamentos de tela (*ANRs*) em dispositivos mais antigos ou de entrada.

---

## 3. Melhorias Propostas (1-2)

### Melhoria 1: Implementação de Smoke Tests End-to-End com Maestro
* **O que implementar:** Criar um conjunto básico de fluxos em arquivos `.yaml` usando o Maestro para cobrir a jornada mais crítica do usuário: *Abrir o app pela primeira vez -> Realizar uma pesquisa na barra de endereços -> Clicar no botão de limpar dados (Fire Button)*.
* **Por que primeiro:** O Maestro opera diretamente sobre o APK compilado, tem baixíssimo custo de manutenção e sintaxe simples. Implementá-lo primeiro garante uma rede de segurança contra quebras catastróficas na jornada principal do usuário, sem adicionar flakiness ou complexidade ao código atual de desenvolvimento.

---

## 4. Referências

1. **FOWLER, Martin.** *The Practical Test Pyramid*. martinfowler.com, 2018. (Utilizado para fundamentar o isolamento e velocidade dos testes unitários no fluxo de PR).
2. **KNOTT, Daniel.** *The Mobile Test Pyramid*. Ministry of Testing, 2014. (Base teórica utilizada para diagnosticar a ausência de fluxos E2E puros e orientar a priorização do Maestro).
3. **LINARES-VÁSQUEZ, M. et al.** *Continuous, Evolutionary and Large-Scale: A New Perspective for Automated Mobile App Testing*. IEEE International Conference on Software Maintenance and Evolution (ICSME), 2017. (Referência científica para validar a importância da automação de testes mobile em escala e o impacto da fragmentação).

---

## 🎁 Bônus (Opcional)

### Bonus A — Matriz impacto × esforço

| Melhoria | Impacto (1-5) | Esforço (1-5) | Score (I / E) | Prioridade |
| :--- | :---: | :---: | :---: | :---: |
| **Smoke Tests com Maestro** | 5 | 2 | 2.50 | 🥇 Alta |
| **Matriz Android no Firebase Test Lab** | 4 | 2 | 2.00 | 🥈 Média |
| **Métricas de Macrobenchmark no CI** | 4 | 4 | 1.00 | 🥉 Baixa |

### Bonus B — Testes além do código

* **CONTRIBUTING.md descreve QA?** Sim. O arquivo orienta a garantir que novos recursos venham acompanhados de testes unitários equivalentes e especifica as regras de estilo de código para aprovação no pipeline de PR.
* **SECURITY.md / bug bounty?** Sim. O repositório possui uma política clara redirecionando vulnerabilidades encontradas diretamente para o programa de recompensas da HackerOne (`https://hackerone.com/duckduckgo`).
* **Beta program ativo?** Sim, distribuído de forma contínua através das faixas abertas e internas da Google Play Store.
* **Crash reporting?** Sim, integrado através de telemetria de produção (com indícios de Sentry/Crashlytics nas dependências) para monitoramento e triagem de falhas críticas diretamente pela engenharia.

> **Resumo qualitativo:** O DuckDuckGo demonstra uma excelente maturidade em processos de segurança de comunidade (Bug Bounty) e feedback de produção, contudo, a sua estratégia automatizada de testes pré-release ganharia robustez com a adoção de testes caixas-preta dinâmicos.

### Bonus C — Referência acadêmica

> LINARES-VÁSQUEZ, M.; BAVOTA, G.; Tufano, M.; Lanza, M.; Di Penta, M.; POSHYVANYK, D. **Continuous, Evolutionary and Large-Scale: A New Perspective for Automated Mobile App Testing.** *In: 2017 IEEE International Conference on Software Maintenance and Evolution (ICSME)*, Shanghai, China, 2017. 
> 
> *Aplica-se a esta auditoria ao demonstrar que testes instrumentados clássicos falham em cobrir anomalias sistêmicas geradas pela fragmentação de SO e interações externas em tempo real.*