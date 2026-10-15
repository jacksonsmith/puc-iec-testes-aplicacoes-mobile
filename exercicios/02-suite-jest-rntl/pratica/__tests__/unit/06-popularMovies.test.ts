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
    mockedGet.mockResolvedValueOnce({ data: { results: [] } });

    await fetchPopularMovies({ pageParam: 2 });

    expect(mockedGet).toHaveBeenCalledTimes(1);
    expect(mockedGet.mock.calls[0][0]).toContain('/movie/popular');
  });
  it('2. devolve os filmes recebidos da API (data)', async () => {
    const data = { page: 1, results: [{ id: 10, title: 'Matrix' }] };
    mockedGet.mockResolvedValueOnce({ data });

    const result = await fetchPopularMovies({ pageParam: 1 });

    expect(result).toEqual(data);
  });
});
