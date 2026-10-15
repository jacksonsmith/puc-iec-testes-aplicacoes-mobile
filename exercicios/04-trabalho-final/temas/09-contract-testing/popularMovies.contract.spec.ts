import { PactV3, MatchersV3 } from '@pact-foundation/pact';

describe('Popular Movies Contract', () => {
  const provider = new PactV3({
    consumer: 'CineFav',
    provider: 'TMDB',
  });

  it('should return popular movies with correct shape', async () => {
    provider.addInteraction({
      states: [{ description: 'popular movies exist' }],
      uponReceiving: 'a request for popular movies page 1',
      withRequest: {
        method: 'GET',
        path: '/movie/popular',
        query: { page: MatchersV3.string('1') },
      },
      willRespondWith: {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: {
          page: MatchersV3.integer(1),
          total_pages: MatchersV3.integer(500),
          total_results: MatchersV3.integer(10000),
          results: MatchersV3.eachLike({
            id: MatchersV3.integer(550),
            title: MatchersV3.string('Fight Club'),
            overview: MatchersV3.string('Um homem insatisfeito...'),
            poster_path: MatchersV3.string('/path.jpg'),
            release_date: MatchersV3.string('1999-10-15'),
            vote_average: MatchersV3.decimal(8.4),
          }),
        },
      },
    });

    await provider.executeTest(async (mockServer) => {
      const response = await fetch(`${mockServer.url}/movie/popular?page=1`);

      expect(response.status).toBe(200);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const body = await response.json() as any;

      // Campos obrigatórios de paginação (MoviesResponse)
      expect(typeof body.page).toBe('number');
      expect(typeof body.total_pages).toBe('number');
      expect(typeof body.total_results).toBe('number');
      expect(Array.isArray(body.results)).toBe(true);
      expect(body.results.length).toBeGreaterThan(0);

      // Shape do Movie — contrato com TMDB
      const movie = body.results[0];
      expect(typeof movie.id).toBe('number');
      expect(typeof movie.title).toBe('string');
      expect(typeof movie.overview).toBe('string');
      expect(typeof movie.poster_path).toBe('string');
      expect(typeof movie.release_date).toBe('string');
      expect(typeof movie.vote_average).toBe('number');
    });
  });

  it('should return 401 when token is invalid', async () => {
    provider.addInteraction({
      states: [{ description: 'token is invalid' }],
      uponReceiving: 'a request for popular movies with invalid token',
      withRequest: {
        method: 'GET',
        path: '/movie/popular',
      },
      willRespondWith: {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
        body: {
          success: false,
          status_code: MatchersV3.integer(7),
          status_message: MatchersV3.string('Invalid API key: You must be granted a valid key.'),
        },
      },
    });

    await provider.executeTest(async (mockServer) => {
      const response = await fetch(`${mockServer.url}/movie/popular`);

      expect(response.status).toBe(401);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const body = await response.json() as any;
      expect(body.success).toBe(false);
      expect(typeof body.status_code).toBe('number');
      expect(typeof body.status_message).toBe('string');
    });
  });
});