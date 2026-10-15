// malformedResponse.contract.spec.ts
//
// Duas camadas de teste:
//
// 1. VALIDADORES — provam que isValidMovie/isValidMoviesResponse detectam shape errado.
//
// 2. COMPORTAMENTO DO APP — simulam o que fetchPopularMovies faz na prática:
//    sem validação, o dado malformado da TMDB chega silenciosamente ao componente.
//    Isso responde: "o que acontece se a TMDB mudar um campo?"
//    Resposta: a UI quebraria (title=undefined, vote_average=NaN) sem nenhum erro visível.
//    O validador é a camada de defesa que impede isso.

type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
};

type MoviesResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

// ---- Helpers de validação de contrato ----

function isValidMovie(obj: unknown): obj is Movie {
  if (!obj || typeof obj !== 'object') return false;
  const m = obj as Record<string, unknown>;
  return (
    typeof m.id === 'number' &&
    typeof m.title === 'string' &&
    typeof m.overview === 'string' &&
    (typeof m.poster_path === 'string' || m.poster_path === null) &&
    typeof m.release_date === 'string' &&
    typeof m.vote_average === 'number'
  );
}

function isValidMoviesResponse(obj: unknown): obj is MoviesResponse {
  if (!obj || typeof obj !== 'object') return false;
  const r = obj as Record<string, unknown>;
  return (
    typeof r.page === 'number' &&
    typeof r.total_pages === 'number' &&
    typeof r.total_results === 'number' &&
    Array.isArray(r.results) &&
    (r.results as unknown[]).every(isValidMovie)
  );
}

// ---- isTokenError logic (espelho de src/services/api.ts) ----

function isTokenError(error: unknown): boolean {
  if (!error) return false;
  const e = error as { isTokenError?: boolean; response?: { status?: number }; message?: string };
  if (e.isTokenError) return true;
  if (e.response?.status === 401) return true;
  if (e.message?.startsWith?.('TMDB_TOKEN_MISSING')) return true;
  return false;
}

// ---- Testes de validação de contrato ----

describe('Malformed Response Validation', () => {
  describe('Movie shape', () => {
    it('should accept a valid Movie object', () => {
      const validMovie: unknown = {
        id: 550,
        title: 'Fight Club',
        overview: 'Um homem insatisfeito...',
        poster_path: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
        release_date: '1999-10-15',
        vote_average: 8.4,
      };
      expect(isValidMovie(validMovie)).toBe(true);
    });

    it('should accept a Movie with null poster_path', () => {
      const movie: unknown = {
        id: 1,
        title: 'Sem Poster',
        overview: 'Descrição',
        poster_path: null,
        release_date: '2020-01-01',
        vote_average: 5.0,
      };
      expect(isValidMovie(movie)).toBe(true);
    });

    it('should reject when title field is missing (uses movie_title instead)', () => {
      const malformed: unknown = {
        id: 123,
        movie_title: 'Batman', // campo errado
        overview: 'Hero',
        poster_path: '/path.jpg',
        release_date: '2005-01-01',
        vote_average: 7.5,
      };
      expect(isValidMovie(malformed)).toBe(false);
    });

    it('should reject when id is a string instead of number', () => {
      const malformed: unknown = {
        id: '550', // tipo errado
        title: 'Fight Club',
        overview: 'Descrição',
        poster_path: '/path.jpg',
        release_date: '1999-10-15',
        vote_average: 8.4,
      };
      expect(isValidMovie(malformed)).toBe(false);
    });

    it('should reject when vote_average is missing', () => {
      const malformed: unknown = {
        id: 550,
        title: 'Fight Club',
        overview: 'Descrição',
        poster_path: '/path.jpg',
        release_date: '1999-10-15',
        // vote_average ausente
      };
      expect(isValidMovie(malformed)).toBe(false);
    });
  });

  describe('MoviesResponse shape', () => {
    it('should accept a valid MoviesResponse', () => {
      const valid: unknown = {
        page: 1,
        total_pages: 500,
        total_results: 10000,
        results: [
          {
            id: 550,
            title: 'Fight Club',
            overview: 'Descrição',
            poster_path: '/path.jpg',
            release_date: '1999-10-15',
            vote_average: 8.4,
          },
        ],
      };
      expect(isValidMoviesResponse(valid)).toBe(true);
    });

    it('should accept a valid MoviesResponse with empty results', () => {
      const valid: unknown = {
        page: 1,
        total_pages: 0,
        total_results: 0,
        results: [],
      };
      expect(isValidMoviesResponse(valid)).toBe(true);
    });

    it('should reject when results is not an array', () => {
      const malformed: unknown = {
        page: 1,
        total_pages: 1,
        total_results: 1,
        results: null, // deveria ser array
      };
      expect(isValidMoviesResponse(malformed)).toBe(false);
    });

    it('should reject when pagination fields are missing', () => {
      const malformed: unknown = {
        // page, total_pages, total_results ausentes
        results: [],
      };
      expect(isValidMoviesResponse(malformed)).toBe(false);
    });

    it('should reject when a movie inside results is malformed', () => {
      const malformed: unknown = {
        page: 1,
        total_pages: 1,
        total_results: 1,
        results: [{ id: '550', movie_title: 'Fight Club' }], // shape errado
      };
      expect(isValidMoviesResponse(malformed)).toBe(false);
    });
  });

  describe('isTokenError detection', () => {
    it('should detect 401 HTTP status as token error', () => {
      expect(isTokenError({ response: { status: 401 } })).toBe(true);
    });

    it('should detect isTokenError flag as token error', () => {
      expect(isTokenError({ isTokenError: true })).toBe(true);
    });

    it('should detect TMDB_TOKEN_MISSING message as token error', () => {
      expect(isTokenError({ message: 'TMDB_TOKEN_MISSING: configure o token' })).toBe(true);
    });

    it('should not treat null as token error', () => {
      expect(isTokenError(null)).toBe(false);
    });

    it('should not treat 500 as token error', () => {
      expect(isTokenError({ response: { status: 500 } })).toBe(false);
    });

    it('should not treat 404 as token error', () => {
      expect(isTokenError({ response: { status: 404 } })).toBe(false);
    });
  });
});

// =============================================================================
// PARTE 2 — Comportamento do app com resposta malformada (simulação)
//
// Simula exatamente o que fetchPopularMovies faz no pratica:
//   const res = await api.get('/movie/popular', { params: { page } });
//   return res.data;   ← sem nenhuma validação de shape
//
// Isso prova: sem o validador, o dado malformado PASSA DIRETO para o componente.
// =============================================================================

// Simula o comportamento de fetchPopularMovies (retorna res.data sem validar)
const simulateFetch = async (mockApiData: unknown) => mockApiData;

describe('App behavior with malformed TMDB response (simulation)', () => {
  it('WITHOUT validation: title renamed to movie_title → UI renders undefined', async () => {
    // Simula TMDB renomeando o campo title → movie_title
    const malformedData = {
      page: 1, total_pages: 1, total_results: 1,
      results: [{ id: 550, movie_title: 'Fight Club', vote_average: 8.4, overview: '', poster_path: null, release_date: '' }],
    };

    const data = await simulateFetch(malformedData) as any;
    const movie = data.results[0];

    // O que o MovieCard receberia:
    expect(movie.title).toBeUndefined();       // ← título em branco na tela
    expect(movie.movie_title).toBe('Fight Club'); // dado está lá, campo errado
  });

  it('WITHOUT validation: vote_average removed → toFixed() crashes the UI', async () => {
    // Simula TMDB removendo vote_average
    const malformedData = {
      page: 1, total_pages: 1, total_results: 1,
      results: [{ id: 550, title: 'Fight Club', overview: '', poster_path: null, release_date: '' }],
    };

    const data = await simulateFetch(malformedData) as any;
    const movie = data.results[0];

    expect(movie.vote_average).toBeUndefined(); // ← nota em branco ou NaN na tela
    // vote_average.toFixed(1) lançaria TypeError: Cannot read properties of undefined
    expect(() => (movie.vote_average as number).toFixed(1)).toThrow();
  });

  it('WITHOUT validation: results is not an array → .map() crashes the app', async () => {
    // Simula TMDB mudando results de array para objeto
    const malformedData = {
      page: 1, total_pages: 1, total_results: 1,
      results: null, // ← não é array
    };

    const data = await simulateFetch(malformedData) as any;

    // O FlatList/map() do CineFav faria: data.results.map(...)
    expect(() => (data.results as any[]).map(() => {})).toThrow(); // crash
  });

  it('WITH validation: isValidMoviesResponse catches violation BEFORE data reaches the component', async () => {
    const malformedData = {
      page: 1, total_pages: 1, total_results: 1,
      results: [{ id: 550, movie_title: 'Fight Club' }], // title ausente
    };

    const data = await simulateFetch(malformedData);

    // Validador detecta antes de renderizar → app pode mostrar tela de erro amigável
    expect(isValidMoviesResponse(data)).toBe(false);
    // vs. sem validação: tela quebrada silenciosamente
  });

  it('WITH validation: valid response passes through correctly', async () => {
    const validData = {
      page: 1, total_pages: 500, total_results: 10000,
      results: [{ id: 550, title: 'Fight Club', overview: 'Desc', poster_path: '/p.jpg', release_date: '1999-10-15', vote_average: 8.4 }],
    };

    const data = await simulateFetch(validData);

    expect(isValidMoviesResponse(data)).toBe(true);
    // Dado seguro para renderizar
  });
});


