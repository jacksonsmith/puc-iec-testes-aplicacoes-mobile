# Atividade 1 — Casos de Teste Funcionais — Ana Paula dos Santos

---

## 0. Identificação

- **Aluno:** Ana Paula dos Santos
- **App escolhido:** Bluesky social-app
- **Plataforma testada:** Android
- **Versão do app:** 1.122.0.1079
- **Feature escolhida:** Criar Post (Composer)
- **Justificativa de escolha da feature (1 frase):** Escolhi a criação de posts por ser a funcionalidade principal de engajamento da plataforma, permitindo testar diretamente a entrada de dados, limites de caracteres e o comportamento do app sob instabilidade de rede.

---

## 1. Casos de teste

| ID | Tipo | Pré-condição | Passos | Resultado esperado |
|---|---|---|---|---|
| CT-01 | Funcional | App instalado e usuário logado na Timeline principal. | 1. Fazer tap no botão (Composer) no canto inferior direito.<br/>2. Digitar o texto "Teste de software mobile".<br/>3. Fazer tap em "Post". | O post deve ser publicado com sucesso e aparecer no topo da Timeline. O Composer deve fechar automaticamente. |
| CT-02 | Funcional | App logado, acesso à galeria do dispositivo previamente permitido. | 1. Fazer tap no botão (Composer).<br/>2. Fazer tap no ícone de imagem (Galeria).<br/>3. Selecionar 1 foto da galeria do dispositivo.<br/>4. Fazer tap em "Post". | A imagem deve ser carregada no preview do Composer e publicada com sucesso junto ao post na Timeline. |
| CT-03 | Funcional | App logado, com o Composer aberto. | 1. Digitar uma URL válida (ex: `https://google.com`).<br/>2. Aguardar 2 segundos pela geração do card.<br/>3. Fazer tap em "Post". | O app deve gerar automaticamente um "Link Card" visual abaixo do texto e publicar o post contendo o card clicável. |
| CT-04 | Edge | App logado, com o Composer aberto e preenchido com texto, mas no Modo Avião (sem internet). | 1. Com o texto já digitado, fazer tap em "Post". | O app deve exibir um alerta/toast de erro de conectividade. O texto digitado **não deve sumir** do formulário e o botão deve permitir nova tentativa. |
| CT-05 | Edge | App logado, com o Composer aberto. | 1. Digitar um bloco de texto contendo exatamente 305 caracteres (o limite da plataforma é 300). | O contador de caracteres deve ficar negativo (-5) em cor vermelha e o botão "Post" deve ficar desabilitado (cinza/não clicável). |
| CT-06 | Edge | App logado, com o Composer aberto e texto digitado no campo. | 1. Minimizar o aplicativo Bluesky (pressionar botão Home do aparelho).<br/>2. Abrir o aplicativo nativo de Câmera do celular e tirar uma foto.<br/>3. Alternar de volta para o app Bluesky. | O aplicativo deve restaurar exatamente no estado anterior, mantendo o Composer aberto e o texto digitado intacto. |
| CT-07 | Usabilidade | App logado, com o Composer aberto. | 1. Fazer tap no ícone de imagem e selecionar uma foto.<br/>2. Observar a presença do botão "ALT" sobre a foto carregada.<br/>3. Fazer tap em "ALT" e digitar uma descrição de acessibilidade. | O botão "ALT" deve estar visível e com alto contraste. O app deve salvar a descrição sem fechar a imagem ou quebrar o layout. |

---

## 2. Referência

[1] BOLTON, Michael. **FEW HICCUPPS: A Heuristic for Software Consistency**. DevelopSense, 2012. Disponível em: <https://www.developsense.com/blog/2012/03/few-hiccupps/>. Acesso em: 2026.

---

## 🎁 Bonus (opcional)

### Heurística FEW HICCUPPS aplicada (escolha 1-2 dos casos edge)

| Caso | Heurística (1-2 letras) | Como aplica (1 frase) |
|---|---|---|
| CT-04 | **W** (World) + **U** (User expectations) | O modo avião ou queda de sinal simulam o mundo real; o usuário espera que seu esforço de digitação não seja deletado por uma falha de rede. |
| CT-05 | **S** (Standards) | Segue o padrão estabelecido na indústria de microblogging (como X/Twitter e Threads) onde o botão de envio trava ao estourar o limite. |

### Charter de teste exploratório (Bach SBTM)

```
Charter: Explorar a feature de Composer do app Bluesky usando a estratégia de injeção de dados inválidos e testes de estresse periférico durante 30 minutos pra descobrir riscos de perda de dados e travamento do app (crashes).

Notas:
- [Observação 1] O contador de caracteres responde em tempo real a cada caractere digitado, mudando de cor de forma fluida.
- [Bug encontrado: Não aplicável] Durante o teste exploratório simulado, o comportamento de background manteve o cache do texto perfeitamente.
- [Pergunta aberta] O limite de 300 caracteres também conta os caracteres ocultos de links formatados (URLs encurtadas)?
```
