import { render, screen, fireEvent } from '@testing-library/react-native';
import { useFavoritesStore } from '@/store/favoritesStore';
import { renderApp, mockListaDeFilmes } from './_helpers';
import { act } from 'react-test-renderer';

jest.mock('@/services/api');

beforeEach(() => {
  useFavoritesStore.setState({ ids: [] });
  mockListaDeFilmes();
});

describe('Navegação (integração)', () => {
  it('1. tocar no filme abre a tela de detalhe', async () => {
    render(renderApp());

    // espera a lista carregar
    await screen.findByText('Matrix');

    // interação dentro de act
    await act(async () => {
      fireEvent.press(await screen.findByText('Matrix'));
    });

    // verifica se abriu a tela de detalhe
    expect(await screen.findByText('Detalhes do filme')).toBeTruthy();
  }, 10000); // aumenta timeout
});
