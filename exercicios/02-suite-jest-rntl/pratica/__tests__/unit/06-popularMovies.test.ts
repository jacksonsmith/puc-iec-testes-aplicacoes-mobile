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
import { api } from '@/services/api';

jest.mock('@/services/api');
const mockedGet = api.get as jest.Mock;

beforeEach(() => {
  mockedGet.mockReset();
});

describe('fetchPopularMovies', () => {
  it('1. busca os filmes populares da página pedida (/movie/popular)', async () => {
    mockedGet.mockResolvedValue({ data: { page: 1, results: [], total_pages: 1, total_results: 0 } });
    await fetchPopularMovies(3);  // pode ser qualquer número, o mock ignora
    expect(mockedGet).toHaveBeenCalledWith('/movie/popular', { params: { page: 3 } });
  });   // 🧑‍💻 aluno

  it('2. devolve os filmes recebidos da API (data)', async () => {                            
    const apiResponse = {
      data: {
        page: 1,
        results: [
          { id: 1, title: 'Filme A', overview: '', poster_path: '', release_date: '', vote_average: 0 },
          { id: 2, title: 'Filme B', overview: '', poster_path: '', release_date: '', vote_average: 0 },
        ],
        total_pages: 1,
        total_results: 2,
      },
    };
    mockedGet.mockResolvedValue(apiResponse);
    const result = await fetchPopularMovies(1);
    expect(result).toEqual(apiResponse.data);
  });   // 🧑‍💻 aluno
});
