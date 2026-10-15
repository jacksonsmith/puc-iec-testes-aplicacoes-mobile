# Atividade 1 — Análise de Cobertura — [Cristiany Helena]

> **Como usar:** copia este arquivo, renomeia pra `<seu-nome>-analise.md`, preenche os `[...]`. Apaga este aviso no fim.
> **Tamanho alvo:** 1-2 páginas. Direto ao ponto.

---

## 0. Identificação

- **Aluno:** [Cristiany Helena de Paula]
- **App escolhido:** [Wikipedia iOS]
- **Repo:** [(https://github.com/wikimedia/wikipedia-ios)]
- **Justificativa de escolha (1 frase):** [Escolhi o aplicativo da Wikipedia porque ele é um dos aplicativos mais conhecidos e utilizados do mundo. Como ele tem o código aberto e é muito bem organizado, fica mais fácil para quem está começando em testes entender como uma grande empresa cuida da qualidade do seu aplicativo, servindo como um ótimo exemplo prático para este estudo.]

---

## 1. Estratégia atual

### 1.1 Tipos de teste + ferramentas

| Tipo | Existe? | Ferramenta | Onde fica |
|---|---|---|---|
| Unit | [Sim] | [XCTest] | [WikipediaUnitTests/] |
| UI nativo | [Sim] | [ XCUITest ] | [WikipediaUITests/] |
| E2E cross-platform | [Não] | [—] | [ —] |
| Outros (snapshot, perf, a11y) | [Não] | [—] | [ —] |

### 1.2 CI / CD

| Workflow | Quando roda | O que testa |
|---|---|---|
| [arquivo.yml] | [PR ] | [unidade / UI / lint] |
| [arquivo.yml] | [noturno] | [Roda testes mais pesados e análises de código uma vez por dia, de madrugada.] |

**Observação geral (1-2 frases):** [Roda em PR? Tem matrix Android/iOS? E2E bloqueia merge?]

### 1.3 Cobertura
- [NAO ] Badge no README → [ —]
- [Os arquivos de CI não geram um relatório público de cobertura ] Workflow gera coverage → [—]
- [SIM] Não há cobertura pública

---

## 2. Gaps (2)

### Gap 1: [Ausência de Testes de Conectividade Intermitente]
- **O que falta:** [O repositório não possui testes automatizados ou cenários documentados que simulem o aplicativo funcionando em redes muito lentas ou sofrendo quedas de sinal.]
- **Risco:** [O aplicativo pode travar, fechar sozinho (crash) ou congelar a tela quando o usuário estiver lendo um artigo em movimento (como no metrô ou ônibus) e a internet oscilar.]

### Gap 2: [Falta de Automação de Testes de Acessibilidade]
- **O que falta:** [Falta uma verificação automatizada ou rotina programada para testar se os leitores de tela nativos do celular (como o VoiceOver do iOS) conseguem ler perfeitamente todos os artigos e botões.]
- **Risco:** [Atualizações no código do aplicativo podem quebrar a leitura de tela sem que a equipe perceba, impedindo que pessoas com deficiência visual consigam utilizar o aplicativo para estudar ou pesquisar.]

---

## 3. Melhorias propostas (1-2)

### Melhoria 1: [Implementação de Testes Exploratórios Manuais em Dispositivos Reais]
- **O que implementar:** [Criar roteiros simples para que pessoas testem o aplicativo na prática com o celular na mão, focando em simular situações reais do dia a dia, como alternar entre redes Wi-Fi e 4G/5G ou usar o app no modo avião.]
- **Por que primeiro:** [De acordo com a Pirâmide de Knott vista em aula, o teste manual exploratório é a parte mais importante no mundo mobile (40% do peso), pois o olho humano e o uso real pegam problemas de experiência (UX) e comportamento físico que as ferramentas automáticas de código deixam passar.]

### Melhoria 2 (opcional): [Configuração de Testes em Nuvem (Cloud Farms)]
- [O que implementar: Integrar o projeto com uma plataforma de dispositivos em nuvem (como o Firebase Test Lab), permitindo que os testes atuais rodem automaticamente em diferentes modelos de iPhone e tamanhos de tela.  
Por que primeiro: O esforço de configuração é médio e o impacto é alto, pois o ecossistema da Apple possui dezenas de modelos de telas e capacidades de chip diferentes em uso (como Dynamic Island vs telas antigas com botão Home), e testar apenas em simuladores de computador esconde falhas reais de tamanho e desempenho do aparelho.]

---

## 4. Referências

1. [Referência 1 — Matias, J. S. M. (2026). Aula 1 - Fundamentos de Testes Mobile. Material de apoio apresentado no curso de Testes de Aplicações Mobile, PUC Minas IEC.]
2. [Referência 2 — Knott, D. (2014). The Mobile Test Pyramid. Ministry of Testing.]
3. [Referência 3 — Linares-Vásquez et al. (2017). Continuous, Evolutionary and Large-Scale: A New Perspective for Automated Mobile App Testing. IEEE International Conference on Software Maintenance and Evolution (ICSME)]

---

## 🎁 Bonus (opcional, não afeta nota base)

> Preencha só se quiser ir além. Considerado em arredondamentos.

### Bonus A — Matriz impacto × esforço
| Melhoria | Impacto (1-5) | Esforço (1-5) | Score (I/E) |
|---|---|---|---|
| [Testes Exploratórios Manuais] | [5] | [2] | [2.5] |
| [Configuração de Testes em Nuvem] | [4] | [3] | [1.33] |

### Bonus B — Testes além do código
- CONTRIBUTING.md descreve QA? [Não — O arquivo é focado em como configurar o ambiente de desenvolvimento e estilo de código, deixando os detalhes de QA concentrados nos fluxos automáticos do GitHub.]
- SECURITY.md / bug bounty? [Sim — O projeto possui uma política de segurança oficial direcionando reportes de falhas para o programa de recompensas da Wikimedia Foundation (HackerOne]
- Beta program ativo? [TestFlight /  Por ser um aplicativo feito exclusivamente para o sistema da Apple (iOS), eles utilizam a plataforma oficial da empresa para testes com usuários externos.]
- Crash reporting? [Sentry /  O ecossistema possui monitoramento para capturar relatórios de erros e fechamentos inesperados do aplicativo em tempo real
- Resumo qualitativo (1 frase): [O projeto possui uma excelente estrutura automatizada de segurança e monitoramento de falhas externas, mas se beneficia fortemente se abrir mais espaço para a participação e documentação de testes feitos por pessoas da comunidade.]

### Bonus C — Referência acadêmica
- [Paper peer-reviewed citado: LINARES-VÁSQUEZ, M. et al. Continuous, Evolutionary and Large-Scale: A New Perspective for Automated Mobile App Testing. In: 2017 IEEE International Conference on Software Maintenance and Evolution (ICSME), 2017.]
