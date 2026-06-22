import { render, screen, fireEvent } from '@testing-library/react-native';
import { useFavoritesStore } from '@/store/favoritesStore';
import { renderApp, mockListaDeFilmes } from './_helpers';

jest.mock('@/services/api');

beforeEach(() => {
  useFavoritesStore.setState({ ids: [] });
  mockListaDeFilmes();
});

describe('Fluxo de integração — lista + favoritos (ENTREGA Parte B)', () => {
  it('1.a a lista aparece — achando pelo TEXTO (findByText)', async () => {
    render(renderApp());
    expect(await screen.findByText('Matrix')).toBeTruthy();
  });

  it('1.b a lista aparece — achando pelo ROLE (getByRole, prioridade)', async () => {
    render(renderApp());
    const botoes = await screen.findAllByRole('button', { name: 'Adicionar favorito' });
    expect(botoes).toHaveLength(2);
  });

  it('2. favoritar um filme soma no contador do topo', async () => {
    render(renderApp());
    await screen.findByText('Matrix');
    fireEvent.press(screen.getByTestId('movie-card-heart-1'));
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('1');
  });

  it('3. desfavoritar volta o contador a 0', async () => {
    render(renderApp());
    await screen.findByText('Matrix');
    fireEvent.press(screen.getByTestId('movie-card-heart-1'));
    fireEvent.press(screen.getByTestId('movie-card-heart-1'));
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('0');
  });
});
