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

// jest.mock fica AQUI (é hoisted por arquivo) — é assim que a API vira mockada.
jest.mock('@/services/api');

beforeEach(() => {
  useFavoritesStore.setState({ ids: [] }); // store é singleton — zere entre testes
  mockListaDeFilmes();
});

describe('Fluxo de integração — lista + favoritos (ENTREGA Parte B)', () => {
  // 1.a e 1.b: MESMO objetivo (a lista renderizou), por 2 caminhos de query.
  // Em aula, compare os dois — getByRole é a 1ª escolha (slide "RNTL — queries por prioridade").

  // Dica: render(renderApp()); expect(await screen.findByText('Matrix')).toBeTruthy();
  it('1.a a lista aparece — achando pelo TEXTO (findByText)', async () => {  // 🧑‍🏫 em aula
    //arrange

    //setup
    render(renderApp());

    //assert    
    expect(await screen.findByText('Inception')).toBeTruthy();
  });  

  // Dica: o ♥ de favoritar tem accessibilityRole="button" e accessibilityLabel="Adicionar favorito".
  //   const botoes = await screen.findAllByRole('button', { name: 'Adicionar favorito' });
  //   expect(botoes).toHaveLength(2);   // 2 filmes → 2 botões = a lista renderizou
  it('1.b a lista aparece — achando pelo ROLE (getByRole, prioridade)', async  () => {  // 🧑‍🏫 em aula
     //arrange
    render(renderApp());

    //assert
    expect(await screen.findByTestId('movie-card-heart-1')).toBeTruthy();
  });   

  // após carregar, contador começa em '0'; press no heart-1 → '1'.
  it('2. favoritar um filme soma no contador do topo (♥ 1)', async () => {  // 🧑‍💻 aluno

    render(renderApp());

    // Aguarda a lista carregar
    await screen.findByText('Inception');

    // Estado inicial
    expect(screen.getByTestId('favorites-count').props.children).toBe(0);

    // Favorita o filme de id 1
    fireEvent.press(screen.getByTestId('movie-card-heart-1'));

    // Contador atualizado
    expect(screen.getByTestId('favorites-count').props.children).toBe(1);
  });   
  // favoritar e depois desfavoritar o mesmo card → contador volta a '0'.
  it('3. desfavoritar volta o contador a 0', async () => {   // 🧑‍💻 aluno
  render(renderApp());

  // Aguarda a lista carregar
  await screen.findByText('Inception');

  const heartButton = screen.getByTestId('movie-card-heart-1');

  // Favorita
  fireEvent.press(heartButton);
  expect(screen.getByTestId('favorites-count').props.children).toBe(1);

  // Desfavorita
  fireEvent.press(heartButton);
  expect(screen.getByTestId('favorites-count').props.children).toBe(0);
 }); 
});


 