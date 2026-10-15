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

describe('MovieCard', () => {
  it('1. o card mostra o título do filme', () => {
    render(<MovieCard movie={movie} />);
    expect(screen.getByText('Matrix')).toBeTruthy();
  });

  it('2. o card mostra a nota (estrela 8.7)', () => {
    render(<MovieCard movie={movie} />);
    expect(screen.getByText('⭐ 8.7')).toBeTruthy();
  });

  it('3. tocar no card abre a tela de detalhe (navigate)', () => {
    render(<MovieCard movie={movie} />);
    fireEvent.press(screen.getByText('Matrix'));
    expect(mockNavigate).toHaveBeenCalledWith('Detail', { id: 42, title: 'Matrix' });
  });
});
