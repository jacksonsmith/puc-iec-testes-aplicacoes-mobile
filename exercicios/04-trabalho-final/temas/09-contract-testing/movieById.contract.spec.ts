import { PactV3, MatchersV3 } from '@pact-foundation/pact';

describe('Movie Details Contract', () => {
  const provider = new PactV3({
    consumer: 'CineFav',
    provider: 'TMDB',
  });

  it('should return movie details with correct shape', async () => {
    provider.addInteraction({
      states: [{ description: 'movie 550 exists' }],
      uponReceiving: 'a request for movie details of id 550',
      withRequest: {
        method: 'GET',
        path: '/movie/550',
      },
      willRespondWith: {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: {
          id: MatchersV3.integer(550),
          title: MatchersV3.string('Fight Club'),
          overview: MatchersV3.string('Um homem insatisfeito...'),
          poster_path: MatchersV3.string('/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg'),
          release_date: MatchersV3.string('1999-10-15'),
          vote_average: MatchersV3.decimal(8.4),
        },
      },
    });

    await provider.executeTest(async (mockServer) => {
      const response = await fetch(`${mockServer.url}/movie/550`);

      expect(response.status).toBe(200);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const movie = await response.json() as any;

      // Shape completo de Movie — contrato com TMDB
      expect(typeof movie.id).toBe('string'); #o tipo é number, porém mudamos para string para fazer com que falhe
      expect(typeof movie.title).toBe('string');
      expect(typeof movie.overview).toBe('string');
      expect(typeof movie.poster_path).toBe('string');
      expect(typeof movie.release_date).toBe('string');
      expect(typeof movie.vote_average).toBe('number');

      // Valores mínimos esperados
      expect(movie.title.length).toBeGreaterThan(0);
      expect(movie.vote_average).toBeGreaterThanOrEqual(0);
      expect(movie.vote_average).toBeLessThanOrEqual(10);
    });
  });

  it('should return 404 when movie does not exist', async () => {
    provider.addInteraction({
      states: [{ description: 'movie 999999 does not exist' }],
      uponReceiving: 'a request for a non-existent movie',
      withRequest: {
        method: 'GET',
        path: '/movie/999999',
      },
      willRespondWith: {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
        body: {
          success: false,
          status_code: MatchersV3.integer(34),
          status_message: MatchersV3.string('The resource you requested could not be found.'),
        },
      },
    });

    await provider.executeTest(async (mockServer) => {
      const response = await fetch(`${mockServer.url}/movie/999999`);

      expect(response.status).toBe(404);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const body = await response.json() as any;
      expect(body.success).toBe(false);
      expect(typeof body.status_message).toBe('string');
    });
  });
});
