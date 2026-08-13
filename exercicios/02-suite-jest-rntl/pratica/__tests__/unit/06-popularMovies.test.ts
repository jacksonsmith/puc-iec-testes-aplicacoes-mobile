// __tests__/unit/06-popularMovies.test.ts

import { fetchPopularMovies } from '@/queries/movies/get-popular-movies';
import { api } from '@/services/api';

jest.mock('@/services/api');
const mockedGet = api.get as jest.Mock;

beforeEach(() => {
  mockedGet.mockReset();
});

describe('fetchPopularMovies', () => {
  it('1. busca os filmes populares da página pedida (/movie/popular)', async () => {
    mockedGet.mockResolvedValue({
      data: { page: 3, results: [], total_pages: 1, total_results: 0 },
    });

    await fetchPopularMovies(3);

    expect(mockedGet).toHaveBeenCalledWith('/movie/popular', { params: { page: 3 } });
  });

  it('2. devolve os filmes recebidos da API (data)', async () => {
    const data = {
      page: 1,
      results: [{ id: 1, title: 'Matrix' }],
      total_pages: 1,
      total_results: 1,
    };
    mockedGet.mockResolvedValue({ data });

    await expect(fetchPopularMovies()).resolves.toEqual(data);
  });
});
