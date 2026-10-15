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

import { render, screen, fireEvent } from '@testing-library/react-native';
import MovieCard from '@/components/MovieCard';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

const movie = {
  id: 42, title: 'Matrix', overview: '',
  poster_path: '/m.jpg', release_date: '1999', vote_average: 8.7,
};

beforeEach(() => mockNavigate.mockClear());

// 🔴 PARTE MAIS DIFÍCIL — teste de tela. Aqui você escreve o corpo INTEIRO (sem fill-in).
// O objeto `movie` e o mock de navegação já estão prontos acima. Em cada teste:
//   1) render(<MovieCard movie={movie} />)  2) consulta screen.getBy...  3) expect(...)

describe('MovieCard', () => {
  // Dica: depois do render → expect(screen.getByText('Matrix')).toBeTruthy();
  it('1. o card mostra o título do filme' , () => {
    render(<MovieCard movie={movie} />);
    expect(screen.getByText('Matrix')).toBeTruthy();
  });   // 🧑‍🏫 em aula

  // Dica: a nota aparece como '⭐ 8.7' (vote_average.toFixed(1)) → screen.getByText('⭐ 8.7').
  it('2. o card mostra a nota (⭐ 8.7)', () => {
    render(<MovieCard movie={movie} />);
    expect(screen.getByText('⭐ 8.7')).toBeTruthy();
  });   // 🧑‍🏫 em aula
  // Dica: fireEvent.press(screen.getByText('Matrix'));
  //   expect(mockNavigate).toHaveBeenCalledWith('Detail', { id: 42, title: 'Matrix' });
  it('3. tocar no card abre a tela de detalhe (navigate)', () => {
    render(<MovieCard movie={movie} />);
    fireEvent.press(screen.getByText('Matrix'));
    expect(mockNavigate).toHaveBeenCalledWith('Detail', { id: 42, title: 'Matrix' });
  });   // 🧑‍💻 aluno
});
