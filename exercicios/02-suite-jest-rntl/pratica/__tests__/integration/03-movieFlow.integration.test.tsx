import { render, screen, fireEvent } from '@testing-library/react-native';
import { useFavoritesStore } from '@/store/favoritesStore';
import { renderApp, mockListaDeFilmes } from './_helpers';
import { act } from 'react-test-renderer';

jest.mock('@/services/api');

beforeEach(() => {
  useFavoritesStore.setState({ ids: [] });
  mockListaDeFilmes();
});

describe('Fluxo de integração — lista + favoritos (ENTREGA Parte B)', () => {
  it('1.a a lista aparece — achando pelo TEXTO (findByText)', async () => {
    render(renderApp());
    expect(await screen.findByText('Matrix')).toBeTruthy();
    expect(await screen.findByText('Inception')).toBeTruthy();
  }, 10000);

  it('1.b a lista aparece — achando pelo ROLE (getByRole, prioridade)', async () => {
    render(renderApp());
    const botoes = await screen.findAllByRole('button', { name: 'Adicionar favorito' });
    expect(botoes).toHaveLength(2);
  }, 10000);

  it('2. favoritar um filme soma no contador do topo (♥ 1)', async () => {
    render(renderApp());
    await screen.findByText('Matrix'); // espera lista

    expect(await screen.findByTestId('favorites-count')).toHaveTextContent('0');

    await act(async () => {
      fireEvent.press(await screen.findByTestId('movie-card-heart-1'));
    });

    expect(await screen.findByTestId('favorites-count')).toHaveTextContent('1');
  }, 10000);

  it('3. desfavoritar volta o contador a 0', async () => {
    render(renderApp());
    await screen.findByText('Matrix'); // espera lista

    await act(async () => {
      fireEvent.press(await screen.findByTestId('movie-card-heart-1'));
    });
    expect(await screen.findByTestId('favorites-count')).toHaveTextContent('1');

    await act(async () => {
      fireEvent.press(await screen.findByTestId('movie-card-heart-1'));
    });
    expect(await screen.findByTestId('favorites-count')).toHaveTextContent('0');
  }, 10000);
});
