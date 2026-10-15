import { fireEvent, screen } from '@testing-library/react-native';

export const movieListRobot = {
  aguardarFilmeVisivel(titulo: string) {
    return screen.findByText(titulo);
  },

  async aguardarBotoesDeFavorito() {
    const botoes = await screen.findAllByRole('button', { name: 'Adicionar favorito' });
    expect(botoes).toHaveLength(2);
  },

  tocarCard(id: number) {
    fireEvent.press(screen.getByTestId(`movie-card-${id}`));
  },

  tocarFavorito(id: number) {
    fireEvent.press(screen.getByTestId(`movie-card-heart-${id}`));
  },

  verificarContadorFavoritos(quantidade: number) {
    expect(screen.getByTestId('favorites-count')).toHaveTextContent(String(quantidade));
  },
};