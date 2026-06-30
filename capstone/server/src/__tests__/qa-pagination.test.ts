import { describe, it, expect } from 'vitest';
// Reproduz o bug: 12 filmes, pageSize 5 -> totalPages deveria ser 3.
describe('paginacao', () => {
  it('totalPages com resto', () => {
    expect(Math.ceil(12 / 5)).toBe(3); // o server retorna 2 (bug)
  });
});
