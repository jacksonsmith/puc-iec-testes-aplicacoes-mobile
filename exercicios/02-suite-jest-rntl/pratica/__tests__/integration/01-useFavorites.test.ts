// __tests__/integration/01-useFavorites.test.ts
//
// 🔵 PRÁTICA — NÃO conta nota (aquecimento pra pegar o jeito do renderHook).
//    Marca por it(): 🧑‍🏫 = a gente faz junto em aula · 🧑‍💻 = o aluno faz sozinho.
//
// `renderHook` roda um hook no ambiente React SEM renderizar tela.
// Aqui o hook é `useFavorites` (fina camada sobre o store de favoritos).
//
// Setup já pronto abaixo. Complete os it.todo:
//   const { result } = renderHook(() => useFavorites());
//   act(() => { result.current.toggle(42); });     // muta estado → dentro de act()
//   expect(result.current.isFavorite(42)).toBe(true);

import { renderHook, act } from '@testing-library/react-native';
import { useFavorites } from '@/hooks/useFavorites';
import { useFavoritesStore } from '@/store/favoritesStore';

// Store é singleton — zere entre testes pra não vazar estado.
beforeEach(() => useFavoritesStore.setState({ ids: [] }));

describe('useFavorites (renderHook)', () => {
  it('1. começa sem nenhum favorito (count 0)', () => {
    const { result } = renderHook(() => useFavorites());
    expect(result.current.count).toBe(0);
  });

  it('2. favoritar e desfavoritar volta a zero (toggle)', () => {
    const { result } = renderHook(() => useFavorites());
    act(() => { result.current.toggle(42); });
    act(() => { result.current.toggle(42); });
    expect(result.current.count).toBe(0);
  });

  it('3. sei se está favoritado depois de favoritar (isFavorite)', () => {
    const { result } = renderHook(() => useFavorites());
    act(() => { result.current.toggle(42); });
    expect(result.current.isFavorite(42)).toBe(true);
  });
});
