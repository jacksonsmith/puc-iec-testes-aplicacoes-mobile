import { fetchPopularMovies } from '@/queries/movies/get-popular-movies';
import { api } from '@/services/api';

const mockedGet = api.get as jest.Mock;

export const popularMoviesRobot = {
  resetarMock() {
    mockedGet.mockReset();
  },

  mockarResposta(results: unknown[] = []) {
    mockedGet.mockResolvedValue({
      data: { page: 1, results, total_pages: 1, total_results: results.length },
    });
  },

  async buscarPagina(page: number) {
    return fetchPopularMovies(page);
  },

  verificarChamada(page: number) {
    expect(mockedGet).toHaveBeenCalledWith('/movie/popular', { params: { page } });
  },
};