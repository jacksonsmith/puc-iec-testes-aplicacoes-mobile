import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import MovieCard from '@/components/MovieCard';

export type MovieFixture = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
};

export const movieFixture: MovieFixture = {
  id: 42,
  title: 'Matrix',
  overview: '',
  poster_path: '/m.jpg',
  release_date: '1999',
  vote_average: 8.7,
};

export const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

export const movieCardRobot = {
  render() {
    return render(<MovieCard movie={movieFixture} />);
  },

  verificarTitulo() {
    expect(screen.getByText(movieFixture.title)).toBeTruthy();
  },

  verificarNota() {
    expect(screen.getByText('⭐ 8.7')).toBeTruthy();
  },

  tocarCard() {
    fireEvent.press(screen.getByTestId(`movie-card-${movieFixture.id}`));
  },

  verificarNavegacao() {
    expect(mockNavigate).toHaveBeenCalledWith('Detail', {
      id: movieFixture.id,
      title: movieFixture.title,
    });
  },
};