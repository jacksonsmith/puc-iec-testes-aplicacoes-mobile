# Artigos de referência — Testes de Aplicações Mobile

Curadoria de artigos indicados pelo "SciFi" (ferramenta paga de busca acadêmica), verificados
manualmente (venue, editora, red flags de revista predatória) antes de entrar como referência da
disciplina. Baixados só os que são **abertos e publicamente acessíveis**.

**Legenda de credibilidade:**
- ✅ **Confiável** — venue reconhecido (ACM/IEEE/Elsevier/arXiv com afiliação de pesquisador
  identificável, simpósio acadêmico com peer review, SBC).
- ⚠️ **Preprint, ainda sem peer review** — arXiv/similar, mas não publicado formalmente ainda.
  Conteúdo pode ser bom, mas não tem selo de revisão por pares.
- 🔶 **Venue regional/pequeno** — journal real, peer review existe, mas não é indexado em bases
  de prestígio (Scopus/WoS). Use com ressalva.
- 🚩 **REVISTA PREDATÓRIA (pay-to-publish)** — sem peer review rigoroso, escopo vago demais,
  cobra do autor pra publicar. **Não citar como fonte acadêmica sem avisar o aluno.** Guardado
  aqui só pra registro/transparência — não recomendado como leitura oficial.

## Índice

| Arquivo | Título | Autor(es) | Ano | Venue | Credibilidade |
|---|---|---|---|---|---|
| `vincenzi-2025-metford-mutation-testing-android.pdf` | METFORD — Mutation tEsTing Framework fOR anDroid | Vincenzi et al. | 2025 | Journal of Systems and Software (Elsevier) + arXiv:2501.02875 | ✅ |
| `lima-2025-raven-test-request-verification.pdf` | RAVEN: Enhancing Test Request Reliability... | Rayfran Rocha Lima et al. (Sidia Institute) | 2025 | SAST — Simpósio Brasileiro de Testes de Software (SBC) | ✅ |
| `tavares-2025-cobertura-teste-mutacao.pdf` | Aumentando a Cobertura de Testes de Software através do Teste de Mutação | Jacimar Fernandes Tavares | 2025 | Caderno de Estudos em Sistemas de Informação (Uniacademia) | 🔶 |
| `parry-2025-systemic-flakiness.pdf` | Systemic Flakiness: An Empirical Analysis of Co-Occurring Flaky Test Failures | Parry, Hilton, Kapfhammer, McMinn | 2025 | arXiv:2504.16777 — **aceito no EASE 2025** | ✅ (aceito, ainda não publicado formalmente) |
| `rafi-2026-dataset-reproducible-flaky-tests.pdf` | A Dataset of Reproducible Flaky-Test Failures (ReproFlake) | Rafi, Sumon, Erfan, Khan, Shi, Lam (GMU/UT Austin) | 2026 | arXiv:2605.21677 | ⚠️ preprint |
| `_questionavel-revista-predatoria/kolla-2025-ai-driven-testing-mobile-SARCOUNCIL.pdf` | AI-Driven Testing: Revolutionizing Mobile App Deployment Reliability | Sandeep Kolla | 2025 | Sarcouncil Journal | 🚩 predatória (escopo vago, sem editorial board claro, "rapid turnaround") |
| `_questionavel-revista-predatoria/tariq-2025-mobile-performance-testing-WRPUBLISHING.pdf` | Mobile Application Performance Testing: Advanced Methodologies... | Abdullah Tariq | 2025 | International Journal of Mobile Applications and Technologies (wr-publishing.org) | 🚩 predatória (editora nova/2020, sem indexação em base séria, stats muito redondas/genéricas — padrão de texto gerado, não estudo empírico real) |
| `_questionavel-revista-predatoria/yadavali-2024-ai-performance-testing-mobile-AIRCC.pdf` | AI-Driven Performance Testing Framework for Mobile Applications | Vinaysimha Varma Yadavali | 2024 | International Journal of Software Engineering & Applications (AIRCC) | 🚩 predatória — **AIRCC Publishing Corporation está no Beall's List** de editoras predatórias |
| `wickramathilaka-2023-accessibility-seniors-mde.pdf` | Addressing Age-Related Accessibility Needs of Senior Users Through Model-Driven Engineering | Wickramathilaka, Mueller | 2023 | arXiv:2305.00695 | ⚠️ preprint — **mas tem sequência publicada**: versão evoluída saiu na Automated Software Engineering (Springer) 2025, venue sólida |
| `sodhi-2023-accessible-play-games-CHIPLAY.pdf` | Accessible Play: Towards Designing a Framework for Customizable Accessibility in Games | Sodhi, Girouard, Thue (Carleton University) | 2023 | ACM CHI PLAY 2023 (Companion Proceedings) | ✅ — venue ACM de peso em HCI, PDF via repositório institucional Carleton |
| — (não baixado) | eXtended Reality and Accessibility in Online and Distance Learning | Wild, Coughlan, Davies et al. (Open University) | 2024 | Immersive Learning Research — Academic, DOI 10.56198/U6C0WGXDZ | 🔶 venue real (Open University, journal do Immersive Learning Research Network), mas **não achei PDF aberto** — só abstract/landing page. Tema é XR/educação, tangencial a mobile testing. |

## Pendentes (achados na busca, não baixados ainda — link não confirmado ou fila de processamento)

- **"The future of ai-driven test automation"** (David M. Warburton, 2024) — só achado via
  academia.edu (upload pessoal, sem venue formal identificável). Sem PDF confiável até agora.
- **SMATA — Structured Mobile Application Testing Architecture** (S. Elsayed) — abstract e repo
  GitHub (`github.com/saher-elsayed/smata`) achados, **2 rodadas de busca sem achar PDF/venue
  formal**. Provável preprint muito recente sem página indexada ainda. Se o prof tiver o link
  exato que o SciFi mostrou (botão "PDF"), manda que eu baixo direto — busca por título não tá
  achando.
- Itens 16–30 do lote do SciFi: **processados** os relevantes a mobile/testing (SMATA, RAVEN,
  Wickramathilaka, Wild, Accessible Play). Os de XR/jogos/acessibilidade são tangenciais ao
  escopo mobile-testing da disciplina — incluídos porque conectam com o tema 10 (Accessibility
  Testing Mobile), mas avise se preferir eu manter só o que é mobile-first.

## Observação importante pro prof

Pelo menos **2 dos itens que o SciFi recomendou são de revista pay-to-publish/predatória**
(Sarcouncil, wr-publishing) — abstract com estatísticas "redondas demais" (91%, 68%, 85%, 47%, 96%)
sem journal/instituição rastreável é o padrão clássico. Vale desconfiar por padrão de qualquer
recomendação do SciFi que não tenha DOI rastreável em editora reconhecida (Elsevier, ACM, IEEE,
Springer) ou não esteja em arXiv/repositório de simpósio (SBC, USENIX etc).
