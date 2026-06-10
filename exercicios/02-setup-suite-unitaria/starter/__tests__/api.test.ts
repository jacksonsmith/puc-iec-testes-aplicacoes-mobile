// __tests__/api.test.ts
//
// HANDS-ON (camada data) — testar a lógica pura do módulo de API.
//
// isTokenError(error) classifica se um erro é de autenticação:
//   - true  se error.isTokenError === true
//   - true  se error.response.status === 401
//   - true  se error.message começa com 'TMDB_TOKEN_MISSING'
//   - false pra null/undefined/erro genérico
//
// Não precisa de rede nem mock de axios — é função pura sobre o objeto de erro.

import { isTokenError } from '../src/services/api';

// Função pura: a entrada (objeto de erro) já está montada — complete só o esperado (true/false).
// Os 5 são FÁCEIS e começam vermelhos → preencha o toBe() pra virar verde.

describe('isTokenError', () => {
  it('retorna true pra erro com response.status 401', () => {
    expect(isTokenError({ response: { status: 401 } })).toBe(/* TODO: true ou false? */);
  });

  it('retorna true pra erro com flag isTokenError', () => {
    expect(isTokenError({ isTokenError: true })).toBe(/* TODO */);
  });

  it('retorna true pra erro TMDB_TOKEN_MISSING', () => {
    expect(isTokenError(new Error('TMDB_TOKEN_MISSING: configure o token'))).toBe(/* TODO */);
  });

  it('retorna false pra null', () => {
    expect(isTokenError(null)).toBe(/* TODO */);
  });

  it('retorna false pra erro genérico (status 500)', () => {
    expect(isTokenError({ response: { status: 500 } })).toBe(/* TODO */);
  });
});
