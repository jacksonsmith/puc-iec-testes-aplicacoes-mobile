# Atividade 1 — Redigir Casos de Teste Funcionais (15 pts)

**Disciplina:** Testes de Aplicações Mobile
**Entrega:** ver Canvas
**Modalidade:** individual
**Tempo estimado:** **~1 hora**
**Dificuldade:** ⭐ Fácil — só redação de casos de teste; sem setup técnico

---

## Por que essa atividade

Aluno de QA precisa **redigir casos de teste claros** — habilidade core da profissão. Esta atividade exercita o que vimos na aula 1:

- **Tipos de teste mobile** (funcional, usabilidade, integração)
- **Casos exploratórios** (Bach SBTM) e **heurísticas FEW HICCUPPS** (Bolton)
- **Pirâmide de Knott** — 40% manual/exploratório

Você vai escolher 1 app real, identificar 1 feature, e escrever casos de teste como faria num time de QA.

---

## Tarefa (3 passos em ~1h)

### 1. Escolher 1 app + instalar (~15min)

Escolha 1 dos 5 apps abaixo. **Instale e use por 5-10min** — sem usar o app não dá pra escrever caso de teste decente.

| App | Stack | Onde baixar |
|---|---|---|
| **Immich Mobile** (photo backup) | Flutter | [iOS](https://apps.apple.com/app/immich/id1613945652) · [Android](https://play.google.com/store/apps/details?id=app.alextran.immich) |
| **Bluesky social-app** | React Native | [iOS](https://apps.apple.com/app/bluesky-social/id6444370199) · [Android](https://play.google.com/store/apps/details?id=xyz.blueskyweb.app) |
| **DuckDuckGo** | Kotlin nativo | [Android](https://play.google.com/store/apps/details?id=com.duckduckgo.mobile.android) |
| **Saber** (notes) | Flutter | [iOS](https://apps.apple.com/app/saber/id1671523739) · [Android](https://play.google.com/store/apps/details?id=com.adilhanney.saber) |
| **Wikipedia iOS** | Swift | [iOS](https://apps.apple.com/app/wikipedia/id324715238) |

### 2. Escolher 1 feature do app (~5min)

Pega **uma feature específica** do app, não o app inteiro. Exemplos:

- Immich: backup automático de fotos · upload manual · busca por álbum
- Bluesky: criar post · login com handle/senha · seguir usuário
- DuckDuckGo: busca privada · bloquear tracker · gerenciar abas
- Saber: criar nova nota · exportar como PDF · sync com Nextcloud
- Wikipedia: buscar artigo · salvar offline · trocar idioma

> **Dica:** escolha feature que você conseguiu usar de verdade ao instalar (passo 1). Mais fácil escrever caso sobre o que viu acontecer.

### 3. Redigir 5-8 casos de teste (~40min)

Pra a feature escolhida, escreva **5-8 casos de teste** em formato tabela:

| ID | Tipo | Pré-condição | Passos | Resultado esperado |
|---|---|---|---|---|
| CT-01 | Funcional (happy path) | App instalado + logado | 1. Abrir; 2. Tap em [botão]; 3. ... | [resultado observável] |
| CT-02 | Edge (sad path) | Sem conexão internet | 1. ...; 2. ... | Mensagem de erro clara |
| ... | ... | ... | ... | ... |

**Mix esperado:**
- **3-5 casos funcionais** (happy path — caminho feliz)
- **1-2 casos edge** (sad path — sem internet, dados inválidos, permissão negada, app em background)
- **1 caso de usabilidade** (feedback visual, mensagem de erro, acessibilidade)

---

## Critérios de avaliação

| Critério | Pontos |
|---|---|
| App + feature escolhidos apropriados | 2 |
| 5-8 casos de teste redigidos no formato (ID/Tipo/Pré/Passos/Esperado) | 7 |
| Mix correto: ≥3 funcionais + ≥1 edge + ≥1 usabilidade | 3 |
| Clareza dos passos (alguém de outro time consegue executar?) | 2 |
| 1 referência citada (slide aula, livro, blog) | 1 |

**Total: 15 pts**

> 🎁 **Bonus** (não conta pra nota máxima, considerado em arredondamento):
> - Aplicar 1 heurística FEW HICCUPPS por caso edge
> - Charter de teste exploratório (Bach SBTM) pra feature inteira
> - Cobrir 2 features ao invés de 1

---

## Exemplo de caso bem redigido

| ID | Tipo | Pré-condição | Passos | Resultado esperado |
|---|---|---|---|---|
| CT-01 | Funcional | App instalado, sem conta criada | 1. Abrir app Bluesky; 2. Tap "Criar conta"; 3. Preencher e-mail válido; 4. Senha forte (10+ chars); 5. Tap "Próximo" | Usuário avança pra tela de escolha de handle. Sem mensagem de erro. |
| CT-02 | Edge | App aberto na tela de criar conta, **modo avião ativo** | 1. Preencher e-mail + senha; 2. Tap "Próximo" | App mostra erro de conectividade. Dados digitados permanecem no form (não some). Botão fica habilitado pra retry. |
| CT-03 | Usabilidade | Tela de criar conta | 1. Digitar senha "abc" (3 chars); 2. Tirar foco do campo | Visualização imediata de erro "senha precisa 8+ chars". Cor vermelha, texto legível. Campo destacado. |

**O que torna bom:**
- Pré-condição clara (alguém consegue setar)
- Passos numerados e específicos (não "preencher form" — diz qual campo)
- Resultado esperado **observável** (não "funciona", mas "avança pra próxima tela")
- Inclui dados reais (e-mail válido, senha 10+ chars)

---

## Dica: como descobrir features pra testar

1. **Instale e explore por 5min** — anote o que viu
2. Use **heurística FEW HICCUPPS** (Bolton) pra pensar em ângulos:
   - **F**eatures, **H**istory, **I**mage, **C**omparable products, **C**laims, **U**ser expectations, **P**urpose, **P**roduct, **S**tandards
3. Pensa em **happy path** primeiro, depois **3-5 jeitos de quebrar** (sem internet, app em background, rotacionar device, idle 5min, etc.)

---

## Entrega

- Formato: **markdown** (`.md`) ou PDF gerado de markdown
- Tamanho: **1 página** (tabela é compacta)
- Submeter via Canvas com link do commit GitHub
- **Como entregar via GitHub:** ver página "Como entregar atividades pelo GitHub" no módulo Início

## O que você NÃO precisa fazer

- Não precisa **automatizar** os casos (vai ter atividade pra isso nas próximas)
- Não precisa **rodar testes no app real** (só **redigir** casos pra alguém executar)
- Não precisa **cobrir 100% da feature** (5-8 casos = mostra que sabe a estrutura)
- Não precisa código nenhum

## Material de apoio (todos no GitHub público)

- **[template-relatorio.md](https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/blob/main/exercicios/01-casos-de-teste-funcionais/template-relatorio.md)** — preencha esse, é sua entrega
- **[guia-redacao-casos.md](https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/blob/main/exercicios/01-casos-de-teste-funcionais/guia-redacao-casos.md)** — como redigir casos claros + FEW HICCUPPS
- **[PDFs aula 1](https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/tree/main/material-de-apoio/aula-01)** (Fowler, Knott, ISTQB)
- **[Slide aula 1](https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/blob/main/slides/aula-01/aula-01-fundamentos-mobile-testing.pdf)**
