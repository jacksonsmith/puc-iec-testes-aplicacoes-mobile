import { isTokenError } from '@/services/api';

describe('isTokenError', () => {
  it('1. reconhece sessao expirada - HTTP 401 (true)', () => {
    expect(isTokenError({ response: { status: 401 } })).toBe(true);
  });

  it('2. reconhece a flag de erro de token (true)', () => {
    expect(isTokenError({ isTokenError: true })).toBe(true);
  });

  it('3. reconhece token ausente - TMDB_TOKEN_MISSING (true)', () => {
    expect(isTokenError(new Error('TMDB_TOKEN_MISSING: configure o token'))).toBe(true);
  });

  it('4. null nao e erro de token (false)', () => {
    expect(isTokenError(null)).toBe(false);
  });

  it('5. erro generico (HTTP 500) nao e de token (false)', () => {
    expect(isTokenError({ response: { status: 500 } })).toBe(false);
  });
});
