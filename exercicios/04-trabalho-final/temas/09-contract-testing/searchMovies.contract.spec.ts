import { PactV3, MatchersV3 } from '@pact-foundation/pact';

describe('Search Movies Contract', () => {
  const provider = new PactV3({
    consumer: 'CineFav',
    provider: 'TMDB',
  });

  it('should return search results with correct shape', async () => {
    provider.addInteraction({
      states: [{ description: 'movies matching Batman exist' }],
      uponReceiving: 'a movie search for Batman',
      withRequest: {
        method: 'GET',
        path: '/search/movie',
        query: {
          query: MatchersV3.string('Batman'),
        },
      },
      willRespondWith: {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: {
          page: MatchersV3.integer(1),
          total_pages: MatchersV3.integer(10),
          total_results: MatchersV3.integer(200),
          results: MatchersV3.eachLike({
            id: MatchersV3.integer(272),
            title: MatchersV3.string('Batman Begins'),
            overview: MatchersV3.string('Após treinar com...'),
            poster_path: MatchersV3.string('/path.jpg'),
            release_date: MatchersV3.string('2005-06-15'),
            vote_average: MatchersV3.decimal(7.7),
          }),
        },
      },
    });

    await provider.executeTest(async (mockServer) => {
      const response = await fetch(
        `${mockServer.url}/search/movie?query=Batman`
      );

      expect(response.status).toBe(200);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const body = await response.json() as any;

      // Campos obrigatórios de paginação (MoviesResponse)
      expect(typeof body.page).toBe('number');
      expect(typeof body.total_pages).toBe('number');
      expect(typeof body.total_results).toBe('number');
      expect(Array.isArray(body.results)).toBe(true);
      expect(body.results.length).toBeGreaterThan(0);

      // Shape do Movie nos resultados — contrato com TMDB
      const movie = body.results[0];
      expect(typeof movie.id).toBe('number');
      expect(typeof movie.title).toBe('string');
      expect(typeof movie.overview).toBe('string');
      expect(typeof movie.poster_path).toBe('string');
      expect(typeof movie.release_date).toBe('string');
      expect(typeof movie.vote_average).toBe('number');
    });
  });

  it('should return empty results when no movies match', async () => {
    provider.addInteraction({
      states: [{ description: 'no movies match the query' }],
      uponReceiving: 'a movie search with no results',
      withRequest: {
        method: 'GET',
        path: '/search/movie',
        query: {
          query: MatchersV3.string('xyzabcqwerty123'),
        },
      },
      willRespondWith: {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: {
          page: MatchersV3.integer(1),
          total_pages: MatchersV3.integer(0),
          total_results: MatchersV3.integer(0),
          results: [],
        },
      },
    });

    await provider.executeTest(async (mockServer) => {
      const response = await fetch(
        `${mockServer.url}/search/movie?query=xyzabcqwerty123`
      );

      expect(response.status).toBe(200);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const body = await response.json() as any;
      expect(Array.isArray(body.results)).toBe(true);
      expect(body.results).toHaveLength(0);
      expect(body.total_results).toBe(0);
    });
  });
});