# Atividade 1 — Análise de Cobertura — Ana Paula

## 0. Identificação

- **Aluno:** Ana Paula dos Santos
- **App escolhido:** Bluesky 
- **Repo:** https://github.com/bluesky-social/social-app
- **Justificativa de escolha:** O repositório apresenta alta atividade de desenvolvimento, grande volume de contribuições e pipelines automatizados, tornando-se um bom estudo de caso para análise de estratégias de testes mobile em aplicações open-source.

---

## 1. Estratégia atual

### 1.1 Tipos de teste + ferramentas


| Tipo | Existe? | Ferramenta | Onde fica |
|---|---|---|---|
| Unit | Sim | Jest | `__tests__/lib` |
| UI nativo | Não | — | — |
| E2E cross-platform | Sim | Maestro | `__e2e__` |
| Outros (snapshot, perf, a11y) | Não | — | — |

### 1.2 CI / CD


| Workflow | Quando roda | O que testa |
|---|---|---|
| PR Tests | PR e Push | Execução de testes unitários e de integração |
| Lint | PR e Push | Validação de qualidade de código e padronização |
| Build Android / iOS | PR e Push | Geração e validação dos builds da aplicação mobile |
| Nightly workflows | Periódico (Noturno) | Execuções automáticas para garantir estabilidade contínua |

**Observação geral:** O pipeline roda automaticamente em Pull Requests e ramificações principais, executando checagens contínuas de integridade. A estratégia inclui builds automatizados e rotinas noturnas para mitigar regressões e garantir estabilidade antes do deploy.

### 1.3 Cobertura
- [ ] Badge no README → —
- [ ] Workflow gera coverage → —
- [x] Não há cobertura pública

---

## 2. Gaps

### Gap 1: Falta de testes automatizados de acessibilidade (a11y)
- **O que falta:** Ausência de ferramentas integradas ao fluxo de desenvolvimento para validação automática de critérios de acessibilidade nas telas.
- **Risco:** Usuários com deficiências visuais ou motoras podem enfrentar barreiras críticas de uso, resultando em má experiência e descumprimento de boas práticas globais.

### Gap 2: Falta de testes automatizados de performance mobile
- **O que falta:** Inexistência de rotinas estruturadas para medir consumo de memória, uso de bateria, tempo de renderização e comportamento do feed infinito.
- **Risco:** A aplicação pode apresentar gargalos graves, lentidão ou travamentos em dispositivos intermediários e antigos, gerando avaliações negativas nas lojas.

---

## 3. Melhorias propostas

### Melhoria 1: Implementar testes automatizados de acessibilidade
- **O que implementar:** Integrar ferramentas como Appium Accessibility, Accessibility Scanner ou plugins específicos no ecossistema de testes atual para checar rótulos e contrastes.
- **Por que primeiro:** Possui alto impacto social e de usabilidade com um esforço técnico considerado médio, trazendo o melhor retorno sobre o investimento inicial.

### Melhoria 2: Adicionar testes de performance mobile
- **O que implementar:** Criar cenários de testes automatizados focados no tempo de resposta do feed, consumo de hardware e estabilidade de renderização sob estresse.
- **Por que primeiro:** É essencial para manter a retenção de usuários ativos em uma rede social de grande escala que depende do carregamento contínuo de mídia.

---

## 4. Referências

1. Repositório oficial e Workflows do Bluesky Social App. Disponível em: <https://github.com/bluesky-social/social-app>.
2. Kleppmann, Martin et al. “Bluesky and the AT Protocol: Usable Decentralized Social Media”, 2024. Disponível em: <https://arxiv.org/pdf/2402.03239>.
3. ISTQB Foundation Level — Software Testing Principles. Disponível em: <https://istqb.org>.

---