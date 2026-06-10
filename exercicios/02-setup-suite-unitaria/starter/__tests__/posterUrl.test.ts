// __tests__/posterUrl.test.ts
//
// EXEMPLO RESOLVIDO — use como modelo pra escrever os outros testes.
// Função pura: entrada → saída, sem estado, sem rede. O teste mais barato e estável.

import { posterUrl } from '../src/utils/poster-url';

describe('posterUrl', () => {
  it('monta URL completa com size default w342', () => {
    expect(posterUrl('/abc.jpg')).toBe('https://image.tmdb.org/t/p/w342/abc.jpg');
  });

  it('respeita o size informado', () => {
    expect(posterUrl('/abc.jpg', 'w500')).toBe('https://image.tmdb.org/t/p/w500/abc.jpg');
  });

  it('retorna null quando path é null', () => {
    expect(posterUrl(null)).toBeNull();
  });
});
