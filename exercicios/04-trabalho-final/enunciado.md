# Trabalho Final em Grupo (60 pts)

**Disciplina:** Testes de Aplicações Mobile
**Entrega (relatório):** até **15/07/2026, 23:59**
**Modalidade:** grupo (3 a 4 alunos, auto-organizados em sala na Aula 1)
**Apresentação:** **Aula de Reposição, 16/07/2026** (apresentação + demo ao vivo + Q&A)
**Template de relatório (obrigatório):** [`template-relatorio.md`](./template-relatorio.md) · também em [PDF](./template-relatorio.pdf) e [DOCX](./template-relatorio.docx)

---

## O que é

Cada grupo escolhe **um tema** entre os disponíveis abaixo e desenvolve um **artefato técnico completo**
cobrindo esse tema — a peça que fecha a disciplina, aplicando a pirâmide de testes (unit → integração
→ E2E) e as ferramentas que vimos ao longo do curso num projeto de escopo maior e livre.

> **Atualização pós-aula (02/07/2026, à noite):** revisamos a lista revelada em aula hoje contra
> evidência real de mercado (blogs de engenharia, postmortems, docs oficiais dos últimos 3 anos) e
> contra o que a disciplina de fato ensinou hands-on. Resultado: **tema 2 mudou** (Espresso/XCUITest
> nunca foi praticado em aula — nem tem ponte real com a árvore de componentes RN — trocamos por algo
> que usa o que vocês já dominam) e **2 temas novos entraram** (11 e 12), pra cobrir perfis de QA que
> não são "automation engineer puro". Se seu grupo já tinha decidido tema 2, fala com o prof — não
> tem problema nenhum trocar.
>
> **2ª rodada de revisão (03/07/2026):** fizemos auditoria de viabilidade — pra cada tema, o grupo
> realmente tem ferramenta acessível, dado disponível e skill já ensinada pra terminar em ~2 semanas?
> 3 temas (Performance, Visual AI, AI Agent) dependiam de ferramenta pesada/frágil que o curso nunca
> ensinou (engenharia Android nativa, SaaS pago com cobertura RN fina, código de pesquisa acadêmica
> instável) — **trocamos os 3 por equivalente React Native-first**, mesma complexidade, caminho mais
> fácil. Os outros temas ganharam 1 frase de esclarecimento cada, resolvendo pegadinha que travaria o
> grupo no meio do projeto (ex.: tema 9 precisa de API real ativada, não roda no mock padrão). **Cada
> tema agora tem uma pasta própria em `temas/NN-slug/README.md`** com dica de execução passo a passo.

## ⚠️ Pré-requisito: device/emulador funcionando

**9 dos 13 temas precisam de device ou emulador Android rodando** em algum momento (temas 1, 3, 5,
6, 7, 10, 12 — precisam pra rodar de verdade; temas 4 e 8 só em parte). Se o setup da Atividade 3
(`exercicios/03-maestro-e2e/COMECE-AQUI.md`) parou de funcionar (trocou de máquina, deletou o
emulador, etc.), **resolvam isso antes de escolher o tema** — não deixe pra descobrir no meio do
prazo. Rodem `bash setup-maestro-check.sh` (raiz do repo) pra confirmar que tudo ainda funciona.

**Sem device confiável?** 4 temas rodam 100% em código/API, sem precisar abrir emulador nenhuma
vez: **tema 2** (Robot Pattern sobre RNTL — Jest puro), **tema 9** (Contract Testing — Jest+Pact),
**tema 11** (Mutation Testing — Stryker+Jest), **tema 13** (POM em Maestro — os flows não
precisam rodar de verdade pra reorganizar os seletores; roda de verdade só pra validar no final,
com device de um colega se precisar). São opção segura pra quem não tem acesso garantido a
device/emulador pelas próximas 2 semanas.
## Temas disponíveis

Organizados por **trilha de skill** — escolha pelo que seu grupo curte, não só pelo que parece "mais IA".
**Cada tema tem uma pasta própria** em [`temas/`](./temas/) com README de execução passo a passo
(o que é, como rodar, o que entregar) — a tabela abaixo é o resumo, a pasta é o guia prático.

### 🤖 Automação & Arquitetura de Teste

| # | Tema | O que é, em bom português | Stack sugerida | Por que é real |
|---|------|---------------------------|----------------|-----------------|
| 1 | **Automação Mobile End-to-End** ⭐⭐⭐ | Testar o app inteiro como um usuário testaria — abrir, navegar, tocar em botão — só que automatizado, rodando sozinho em vários celulares/emuladores. | Maestro. Cloud Devices (Firebase Test Lab/BrowserStack) é **diferencial, não obrigação** — rodar 100% local/emulador já vale nota cheia | Núcleo do curso (Atividade 4) — aqui é aprofundar: mais flows, matriz de dispositivos. Firebase Spark (free) não pede cartão pra quota básica; confirme antes de se comprometer |
| 2 | **Arquitetura de Suíte de Teste** ⭐⭐ | Organizar os testes que vocês já escrevem de um jeito mais limpo e reutilizável — separar "o que testar" de "como testar", pra suíte não virar bagunça conforme cresce. | **Robot Pattern sobre RNTL** (principal — RNTL é JS, vira função/classe normal) e/ou organizar `runFlow` do Maestro em camadas reutilizáveis inspiradas no Screenplay (adaptação, não o padrão actor/ability "de livro" — isso exigiria escrever um wrapper JS por cima do Maestro CLI, fora de escopo) | Robot Pattern (Jake Wharton, [jakewharton.com/testing-robots](https://jakewharton.com/testing-robots/)) é padrão vivo de organização de suíte, aplicável direto no RNTL que vocês já sabem, sem ferramenta nunca vista |
| 5 | **Visual Regression Testing Mobile** ⭐⭐ | Testar se a TELA do app está visualmente certa (não só se funciona) — comparar screenshot automaticamente e pegar quando algo quebrou visualmente, tipo um botão que sumiu. | **Maestro Visual Testing** (recurso nativo, mesma ferramenta que já usam) ou **React Native Owl** (open source, feito específico pra RN) | Maestro lançou testagem visual nativa ([maestro.dev/blog/visual-testing](https://maestro.dev/blog/visual-testing)) — zero SaaS pago. Alternativa 100% open source: [React Native Owl](https://github.com/FormidableLabs/react-native-owl) (FormidableLabs), iOS+Android. Troca Applitools/Percy (SaaS pago, cobertura RN fina — maioria do material deles é React web/Storybook) por caminho gratuito e nativo do ecossistema RN |
| 9 | **Mobile API Contract Testing** ⭐⭐⭐ | Garantir que o app e o backend continuam "se entendendo" — se o backend mudar um campo da API sem avisar, o teste acusa antes de quebrar em produção. | Pact + Jest (consumer-driven contracts). **Atenção:** CineFav roda 100% mockado por padrão (sem rede) — pra ter algo pra contratar, **ative o modo real** com token TMDB gratuito (`EXPO_PUBLIC_TMDB_TOKEN` no `.env`, ver `pratica/.env.example`) antes de começar | Pact com Jest é ecossistema ativo em apps React/RN que consomem API própria ([reflectoring.io/pact-react-consumer](https://reflectoring.io/pact-react-consumer/)) — TMDB é API real, pública, gratuita, dá pra contratar de verdade |
| 13 | **POM (Page Object Model) em Maestro** ⭐⭐⭐ | Separar o `id` de cada elemento de tela (login, busca, favoritos) de como o teste interage com ele — hoje o seletor tá espalhado direto nos 5 flows; POM centraliza num arquivo por tela, então renomear 1 `testID` conserta em 1 lugar, não em 5. | `runScript` + `output` do próprio Maestro (sem lib externa) — pasta `elements/` com 1 `.js` por tela, flows referenciam via `${output.tela.campo}` | Padrão oficialmente documentado pelo Maestro ([docs.maestro.dev/examples/recipes/implementing-the-page-object-model-pom](https://docs.maestro.dev/examples/recipes/implementing-the-page-object-model-pom)) — não é adaptação como o tema 2, é o recipe que a própria ferramenta recomenda. Detalhe passo a passo em `temas/13-pom-maestro/README.md` |

### 🧠 IA aplicada a testes mobile

| # | Tema | O que é, em bom português | Stack sugerida | Por que é real |
|---|------|---------------------------|----------------|-----------------|
| 6 | **Test Generation com LLM** ⭐⭐⭐ | Usar IA (tipo Claude) pra escrever testes automaticamente a partir de uma descrição em português do que o app deve fazer. | Claude API + Maestro. **Claude Code** (se algum integrante tiver acesso) via MCP é substituto válido — reduz a barreira de custo da API paga | Conteúdo da Aula 6 (prompt engineering, few-shot) — aprofundar com avaliação sistemática da taxa de acerto do LLM |
| 7 | **AI Agent para Exploratory Mobile** ⭐⭐⭐⭐ | Soltar um agente de IA pra explorar sozinho o app, tipo um usuário curioso sem roteiro, e reportar os bugs que acha por conta própria. | **Claude Code + Maestro MCP** (agentic exploration) — AppAgent/DroidBot viram bônus opcional pra quem quiser o desafio de pesquisa extra | Maestro lançou servidor MCP oficial em fev/2026 — Claude Code controla emulador direto, navega toda tela, reporta bug; app de 25 telas varre em 90s-3min ([docs.maestro.dev/get-started/maestro-mcp](https://docs.maestro.dev/get-started/maestro-mcp); [Very Good Ventures blog](https://verygood.ventures/blog/maestro-mcp-claude-mobile-ui-test-automation/)). Troca AppAgent/DroidBot (código de pesquisa acadêmica, setup historicamente frágil) por ferramenta oficial mantida |

### ⚡ Performance & Segurança

| # | Tema | O que é, em bom português | Stack sugerida | Por que é real |
|---|------|---------------------------|----------------|-----------------|
| 3 | **Performance Mobile Testing** ⭐⭐⭐ | Medir se o app é rápido de verdade — quanto tempo demora pra abrir, se trava ao rolar a tela, quanto de CPU/memória consome — com dado, não achismo. | **Flashlight** (cold start/FPS/CPU via CLI, roda sobre ADB, "Lighthouse pra mobile") + **Reassure** (Callstack — regressão de performance de render, integra com Jest/RNTL) | Aprofunda o lab de 02/07 com ferramenta dedicada. Flashlight é open source real (BAM — [theodo.com blog](https://www.theodo.com/blog/measuring-react-native-performance-with-flashlight)); Reassure é da Callstack (consultoria RN de referência), roda em CI sem device físico. Nenhum dos dois exige módulo Gradle nativo (troca o Macrobenchmark, que exigia engenharia Android avançada nunca ensinada no curso) |
| 4 | **Mobile Security Testing** ⭐⭐⭐ | Caçar falhas de segurança no app antes que um atacante ache — dado vazando, permissão desnecessária, configuração perigosa no manifest. | OWASP MASVS + achado manual de manifest (**obrigatório**, já treinado no lab) + MobSF análise estática (**bônus**, exige Docker — não instalado no setup do curso) | Aprofunda o lab de 02/07 (achado real `allowBackup`) — caso real de impacto: SDK EngageLab expôs "millions of Android wallets" por misconfig similar ([Microsoft Security Blog, abr/2026](https://www.microsoft.com/en-us/security/blog/2026/04/09/intent-redirection-vulnerability-third-party-sdk-android/)) |

### 🏗️ Qualidade & Pipeline

| # | Tema | O que é, em bom português | Stack sugerida | Por que é real |
|---|------|---------------------------|----------------|-----------------|
| 8 | **CI/CD Pipeline Mobile** ⭐⭐⭐⭐ | Montar a esteira automática que roda os testes, builda e prepara o app pra publicar toda vez que alguém sobe código novo — sem precisar fazer isso na mão. | GitHub Actions + Fastlane (**build+test lanes** — upload real pra loja é fora de escopo, exige conta paga Apple/Google) | Conteúdo da Aula 6. **Nível avançado (opcional, +profundidade):** flaky test quarantine ([Google Testing Blog](https://testing.googleblog.com/2016/05/); ~1.5% flake rate afeta ~16% dos testes) + DORA Change Failure Rate tracking |
| 11 | **Mutation Testing** ⭐⭐⭐ | Testar os TESTES: a ferramenta muda um pedacinho do código de propósito (um "mutante") e vê se algum teste pega o erro. Se nenhum teste falhar, seus testes não estavam testando de verdade. | Stryker (StrykerJS) sobre uma lib de domínio do app, com relatório de mutation score | StrykerJS documenta suporte a Jest/React ([stryker-mutator.io/docs/stryker-js/guides/react](https://stryker-mutator.io/docs/stryker-js/guides/react/)). Basta rodar e mostrar o relatório — gate de CI com break-threshold é bônus, não obrigatório. Escopo: módulo de domínio testável em Jest puro (não o app RN inteiro — Metro/Babel são ponto de atrito não resolvido pelo StrykerJS) |

### 🔍 Manual, Exploratório & Acessibilidade

| # | Tema | O que é, em bom português | Stack sugerida | Por que é real |
|---|------|---------------------------|----------------|-----------------|
| 10 | **Accessibility Testing Mobile** ⭐⭐ | Testar se o app funciona pra quem usa leitor de tela, tem baixa visão ou dificuldade motora — não só pra quem enxerga bem e usa o dedo perfeitamente. | **Android Accessibility Scanner sozinho já vale nota cheia** (grátis, roda em qualquer device/emulador Android) + auditoria manual WCAG. Xcode Accessibility Inspector é bônus pra quem tiver Mac | Conecta direto com o que vimos em aula (accessibilityRole/Label no Maestro/RNTL, 02/07) — bom tema pra quem curte pensar em usuário real, não só código |
| 12 | **Testes Manuais Estruturados → Regressão Automatizada** ⭐⭐⭐ | Testar o app na unha, procurando bug como um detetive — mas não "na sorte": usando uma técnica publicada de verdade — e depois transformar cada bug achado num teste automatizado, pra ele nunca mais voltar sem ninguém perceber. | **Parte A** — escolher **1 heurística/técnica recente** (últimos 3 anos) e aplicar num app conhecido (pode ser o CineFav ou outro app popular open-source); **Parte B** — conversão dos bugs achados em testes automatizados (RNTL/Maestro) | Duas heurísticas recentes reais pra Parte A (resumo aqui porque os papers originais são pagos — ver detalhe em `temas/12-manual-regressao/README.md`): **TQED** — organiza ideias de teste em 4 dimensões, Tempo/Quantidade/Evento/Dado, combinando-as pra gerar casos criativos (Roman, Mnich, Hryszko, ICTSS 2023); ou **Gamified Exploratory Testing** — testar com elementos de jogo (pontuação, cobertura como progresso), +15-25% de cobertura vs exploração padrão em estudo com 144 participantes (Coppola et al., IEEE TSE 2023/2024). SBTM/charter clássico (Bach, Aula 2) continua válido como baseline de comparação. |

> Pode ser sobre o app da disciplina (CineFav/TMDB) ou outro app open source — combine com o professor se for usar outro.

### Temas que avaliamos e **não entraram** (e por quê)

- **Gerenciamento de equipes de QA / test management (TestRail, Xray):** tema de processo/ferramenta,
  não gera repo+CI verde (exigência da rubrica) — não aproveita as skills técnicas do curso. Se o
  grupo tiver interesse, pode virar **1 seção extra no relatório** de qualquer tema acima, não tema
  isolado.
- **Native UI Testing puro (Espresso/XCUITest):** curso nunca praticou hands-on (só Maestro foi
  ensinado como E2E) e frameworks nativos não têm visibilidade real da árvore de componentes RN —
  gap grande demais pra 2 semanas. Virou o tema 2 revisado (Arquitetura de Suíte), que usa o que
  vocês já sabem.

## Como compor a nota (60 pts)

| Critério | Peso | Pontos |
|----------|------|--------|
| Apresentação oral + **demo ao vivo da prática funcionando** (10min + 5min Q&A) | 20% | 12 |
| Artefato técnico (repo GitHub funcional, executável — link dentro do relatório) | 35% | 21 |
| Relatório (template fixo, ver `template-relatorio.md` — 1-2 páginas + anexos) | 20% | 12 |
| Domínio conceitual demonstrado em Q&A | 15% | 9 |
| Originalidade e profundidade | 10% | 6 |

### Critérios de qualidade do artefato técnico

- **Reprodutibilidade:** README com passos exatos pra rodar em máquina limpa.
- **Execução demonstrada:** rodar os testes/flow e mostrar passando (print, log ou vídeo curto
  no README) — **não precisa estar configurado em CI**, só provar que funciona de verdade.
  CI real (GitHub Actions com badge) soma em "originalidade e profundidade", mas não é obrigatório.
- **Cobertura adequada ao tema:** ≥ 5 testes/flows, sem testes triviais. (Tema 12: ≥ 5 bugs
  documentados na Parte A + convertidos em teste automatizado na Parte B.)
- **Documentação inline:** comentários nos lugares certos (não em todo lugar).
- **Citações:** referências acadêmicas ou de engenharia real no relatório (mínimo 3, respondidas
  na pergunta obrigatória de Anexos do template) — vale usar as fontes listadas na coluna "Por que
  é real" acima como ponto de partida.

## Regras

- **Grupo de 3 a 4.** Todos os integrantes devem demonstrar domínio do projeto no Q&A — falta de
  domínio individual gera desconto de nota **individual** (não do grupo todo).
- **Participação de todos os integrantes é obrigatória** — mas **nem todos precisam apresentar
  oralmente** (o grupo decide quem fala). Se algum integrante tiver um problema que impeça sua
  participação, **avisar o professor com antecedência** pra análise caso a caso.
- **Originalidade:** ≥ 60% de código autoral (não é fork direto de um projeto pronto).
- **Ética em IA:** uso de IA é incentivado, mas declare no README qual ferramenta usou e em que medida.
  Cópia sem entendimento detectada na apresentação = zero.

## Entrega

São **2 partes**:

1. **Relatório**, usando o template obrigatório [`template-relatorio.md`](./template-relatorio.md)
   (também em [PDF](./template-relatorio.pdf)/[DOCX](./template-relatorio.docx)) — enviado como
   **anexo (upload de arquivo) na atividade do Canvas** — até 15/07, 23:59. **Não existe entrega
   separada de repo.** Se o tema gerou artefato técnico (repo, código, config), o **link do repo
   GitHub vai dentro do relatório** (seção Anexos → "Links e evidência adicional") — é ali que o
   prof confere.
2. **Apresentação ao vivo + demo da prática funcionando** (10min + 5min Q&A) — **Aula de
   Reposição, 16/07/2026**. Não é só slide: o grupo precisa **rodar o artefato de verdade** na
   frente da turma (testes passando, flow rodando, ferramenta executando).

**Ordem de apresentação:** os grupos combinam entre si a ordem (quem apresenta primeiro, segundo,
etc.) e avisam o professor com antecedência — mesma lógica do auto-organização em grupo da Aula 1.

Dúvidas: Teams da turma ou jackson.96@gmail.com.
