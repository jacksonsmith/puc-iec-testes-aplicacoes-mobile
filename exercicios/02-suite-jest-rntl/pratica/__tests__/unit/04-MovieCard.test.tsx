// __tests__/unit/04-MovieCard.test.tsx
//
// ✅ AVALIATIVO — o aluno entrega isto (conta nota). Faça TODOS os it() — todos contam.
//    Marca por it(): 🧑‍🏫 = a gente faz junto em aula · 🧑‍💻 = o aluno faz sozinho.
//
// TESTE DE TELA (React Native Testing Library) — o coração do QA mobile.
// Testa o que o USUÁRIO vê e faz, não a implementação.
//
// MovieCard usa useNavigation() — mocke o hook (não há NavigationContainer no teste):
//
//   const mockNavigate = jest.fn();
//   jest.mock('@react-navigation/native', () => ({
//     useNavigation: () => ({ navigate: mockNavigate }),
//   }));
//
// Queries RNTL: screen.getByText(...) · fireEvent.press(...) · expect(...).toBeTruthy()

import { movieCardRobot, mockNavigate } from './robots/movieCardRobot';

beforeEach(() => mockNavigate.mockClear());

// 🔴 PARTE MAIS DIFÍCIL — teste de tela. Aqui você escreve o corpo INTEIRO (sem fill-in).
// O objeto `movie` e o mock de navegação já estão prontos acima. Em cada teste:
//   1) render(<MovieCard movie={movie} />)  2) consulta screen.getBy...  3) expect(...)

describe('MovieCard', () => {
  it('1. o card mostra o título do filme', () => {
    movieCardRobot.render();
    movieCardRobot.verificarTitulo();
  });   // 🧑‍🏫 em aula

  it('2. o card mostra a nota (⭐ 8.7)', () => {
    movieCardRobot.render();
    movieCardRobot.verificarNota();
  });   // 🧑‍💻 aluno

  it('3. tocar no card abre a tela de detalhe (navigate)', () => {
    movieCardRobot.render();
    movieCardRobot.tocarCard();
    movieCardRobot.verificarNavegacao();
  });   // 🧑‍💻 aluno
});
