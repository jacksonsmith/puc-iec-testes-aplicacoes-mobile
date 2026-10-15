// __tests__/integration/03-movieFlow.integration.test.tsx
//
// ✅ AVALIATIVO — ENTREGA da Parte B (conta nota). Faça TODOS os it() — todos contam.
//    É ESTE o arquivo da Parte B; os outros 2 da pasta são prática (não contam).
//    Marca por it(): 🧑‍🏫 = a gente faz junto em aula · 🧑‍💻 = o aluno faz sozinho.
//
// Testa o FLUXO entre componentes (src/integration/): a lista busca dados (API
// mockada) e favoritar um card reflete no contador do header. Sem simulador.
//
// O setup (renderApp + mock + fixture) está em ./_helpers — leia pra entender;
// aqui você escreve só os 3 it() de comportamento.
//
// Pontos de teste expostos pela tela:
//   testID="favorites-count"        → contador do header (texto "♥ N")
//   testID="movie-card-heart-1"     → botão de favoritar do filme id 1
//
// Dicas de query:
//   await screen.findByText('Matrix')                 // espera a lista carregar (async)
//   fireEvent.press(screen.getByTestId('movie-card-heart-1'))
//   expect(screen.getByTestId('favorites-count')).toHaveTextContent('1')
import { render, screen, fireEvent } from '@testing-library/react-native';
import { useFavoritesStore } from '@/store/favoritesStore';
import { renderApp, mockListaDeFilmes } from './_helpers';

jest.mock('@/services/api');

beforeEach(() => {
  useFavoritesStore.setState({ ids: [] });
  mockListaDeFilmes();
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
