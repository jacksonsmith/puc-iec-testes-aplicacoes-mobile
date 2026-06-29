import { render, screen, fireEvent } from '@testing-library/react-native';
import { useFavoritesStore } from '@/store/favoritesStore';
import { renderApp, mockListaDeFilmes } from './_helpers';

jest.mock('@services/api');

beforeEach(() => {
  useFavoritesStore.getState().clearFavorites?.(); 
});

describe('03 - movieFlow Integration Test', () => {
  it('1.a - deve carregar e exibir a lista de filmes corretamente', async () => {
    renderApp();

    // Espera a lista carregar procurando por um dos filmes mockados
    const filme = await screen.findByText('Matrix');
    expect(filme).toBeTruthy();
  });

  it('1.b - deve favoritar um filme e incrementar o contador do header', async () => {
    renderApp();

    // Espera o app carregar
    await screen.findByText('Matrix');

    // Clica no botão de coração do primeiro filme (id: 1)
    const heartButton = screen.getByTestId('movie-card-heart-1');
    fireEvent.press(heartButton);

    // Verifica se o contador mudou para 1
    const counter = screen.getByTestId('favorites-count');
    expect(counter).toHaveTextContent('1');
  });

  it('2 - deve desfavoritar um filme ao clicar novamente e zerar o contador', async () => {
    renderApp();

    await screen.findByText('Matrix');

    const heartButton = screen.getByTestId('movie-card-heart-1');
    
    // Primeiro clique: Favorita
    fireEvent.press(heartButton);
    const counter = screen.getByTestId('favorites-count');
    expect(counter).toHaveTextContent('1');

    // Segundo clique: Desfavorita
    fireEvent.press(heartButton);
    expect(counter).toHaveTextContent('0');
  });
});
