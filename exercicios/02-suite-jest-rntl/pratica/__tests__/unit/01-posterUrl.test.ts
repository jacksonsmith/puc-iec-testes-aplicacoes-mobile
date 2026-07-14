// __tests__/unit/01-posterUrl.test.ts
//
// 📘 MODELO RESOLVIDO — já vem pronto, é o molde (NÃO é entrega).
//    Leia antes de começar e use de exemplo pros próximos.
// Função pura: entrada → saída, sem estado, sem rede. O teste mais barato e estável.

import { posterUrl } from '@/utils/poster-url';

describe('posterUrl', () => {
  it('1. monta a URL completa da capa (size padrão w342)', () => {
    expect(posterUrl('/abc.jpg')).toBe('https://image.tmdb.org/t/p/w342/abc.jpg');
  });

  it('2. usa o tamanho que eu pedir (w500)', () => {
    expect(posterUrl('/abc.jpg', 'w500')).toBe('https://image.tmdb.org/t/p/w500/abc.jpg');
  });

  it('3. filme sem capa retorna null', () => {
    expect(posterUrl(null)).toBeNull();
  });
});
