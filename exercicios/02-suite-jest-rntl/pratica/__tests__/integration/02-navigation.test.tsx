// __tests__/integration/02-navigation.test.tsx

import { render, screen, fireEvent } from '@testing-library/react-native';
import { useFavoritesStore } from '@/store/favoritesStore';
import { renderApp, mockListaDeFilmes } from './_helpers';

jest.mock('@/services/api');

beforeEach(() => {
  useFavoritesStore.setState({ ids: [] });
  mockListaDeFilmes();
});

describe('Navegação (integração)', () => {
  it('1. tocar no filme abre a tela de detalhe', async () => {
    render(renderApp());

    fireEvent.press(await screen.findByText('Matrix'));

    expect(await screen.findByText('Detalhes do filme')).toBeTruthy();
    expect(screen.getByText('Matrix')).toBeTruthy();
  });
});
