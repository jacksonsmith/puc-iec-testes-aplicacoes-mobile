// __tests__/unit/06-popularMovies.test.ts
//
// ⭐ BÔNUS — opcional (pontos extras). 🧑‍💻 o aluno faz sozinho.
//
// Testar fetchPopularMovies isolando a dependência de rede.
//
// jest.mock('@/services/api') troca o módulo real por um mock automático.
// Aí você controla o que api.get retorna e verifica como foi chamado.
//
//   const mockedGet = api.get as jest.Mock;
//   mockedGet.mockResolvedValue({ data: { page: 1, results: [], total_pages: 1, total_results: 0 } });

import { fetchPopularMovies } from '@/queries/movies/get-popular-movies';
import { popularMoviesRobot } from './robots/popularMoviesRobot';

jest.mock('@/services/api');

beforeEach(() => popularMoviesRobot.resetarMock());

describe('fetchPopularMovies', () => {
  it('1. busca os filmes populares da página pedida (/movie/popular)', async () => {
    popularMoviesRobot.mockarResposta();

    await popularMoviesRobot.buscarPagina(2);

    popularMoviesRobot.verificarChamada(2);
  });   // 🧑‍💻 aluno

  it('2. devolve os filmes recebidos da API (data)', async () => {
    const resultados = [{ id: 1, title: 'Matrix' }];
    popularMoviesRobot.mockarResposta(resultados);

    const resposta = await popularMoviesRobot.buscarPagina(1);

    expect(resposta.results).toEqual(resultados);
  });   // 🧑‍💻 aluno
});
