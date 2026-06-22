import { fetchPopularMovies } from '@/queries/movies/get-popular-movies';
import { api } from '@/services/api';

jest.mock('@/services/api');
const mockedGet = api.get as jest.Mock;

beforeEach(() => {
  mockedGet.mockReset();
});

describe('fetchPopularMovies', () => {
  it('1. busca os filmes populares da pagina pedida (/movie/popular)', async () => {
    mockedGet.mockResolvedValue({
      data: { page: 2, results: [], total_pages: 10, total_results: 200 },
    });

    await fetchPopularMovies(2);

    expect(mockedGet).toHaveBeenCalledWith('/movie/popular', { params: { page: 2 } });
  });

  it('2. devolve os filmes recebidos da API (data)', async () => {
    const data = {
      page: 1,
      results: [
        {
          id: 42,
          title: 'Matrix',
          overview: '',
          poster_path: '/m.jpg',
          release_date: '1999-03-31',
          vote_average: 8.7,
        },
      ],
      total_pages: 1,
      total_results: 1,
    };
    mockedGet.mockResolvedValue({ data });

    await expect(fetchPopularMovies()).resolves.toEqual(data);
  });
});
