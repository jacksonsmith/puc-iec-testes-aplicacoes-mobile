// __tests__/unit/02-isTokenError.test.ts
//
// ✅ AVALIATIVO — o aluno entrega isto (conta nota). Faça TODOS os it() — todos contam.
//    Marca por it(): 🧑‍🏫 = a gente faz junto em aula · 🧑‍💻 = o aluno faz sozinho.
//
// Testar a lógica pura da camada data (isTokenError).
//
// isTokenError(error) classifica se um erro é de autenticação:
//   - true  se error.isTokenError === true
//   - true  se error.response.status === 401
//   - true  se error.message começa com 'TMDB_TOKEN_MISSING'
//   - false pra null/undefined/erro genérico
//
// Não precisa de rede nem mock de axios — é função pura sobre o objeto de erro.
// Os 5 são FÁCEIS e começam vermelhos → preencha o toBe() pra virar verde.

import { isTokenError } from '@/services/api';

describe('isTokenError', () => {
  it('1. reconhece sessão expirada — HTTP 401 (true)', () => {   // 🧑‍🏫 em aula
    expect(isTokenError({ response: { status: 401 } })).toBe(/* TODO: true ou false? */);
  });

  it('2. reconhece a flag de erro de token (true)', () => {   // 🧑‍🏫 em aula
    expect(isTokenError({ isTokenError: true })).toBe(/* TODO */);
  });

  it('3. reconhece token ausente — TMDB_TOKEN_MISSING (true)', () => {   // 🧑‍💻 aluno
    expect(isTokenError(new Error('TMDB_TOKEN_MISSING: configure o token'))).toBe(/* TODO */);
  });

  it('4. null não é erro de token (false)', () => {   // 🧑‍💻 aluno
    expect(isTokenError(null)).toBe(/* TODO */);
  });

  it('5. erro genérico (HTTP 500) não é de token (false)', () => {   // 🧑‍💻 aluno
    expect(isTokenError({ response: { status: 500 } })).toBe(/* TODO */);
  });
});
