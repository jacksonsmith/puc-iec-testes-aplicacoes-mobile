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
    const { result } = renderHook(() => useFavoritesStore());
    expect(result.current.ids).toEqual([]);
  });
  it('2. favoritar e desfavoritar volta a zero (toggle)', () => {
    const { result } = renderHook(() => useFavoritesStore());

    act(() => {
      result.current.add(10);
    });
    expect(result.current.ids).toEqual([10]);
    expect(result.current.isFavorite(10)).toBe(true);
  });
  it('3. sei se está favoritado depois de favoritar (isFavorite)', () => {
    const { result } = renderHook(() => useFavoritesStore());

    act(() => {
      result.current.add(10);
      result.current.remove(10);
    });

    expect(result.current.ids).toEqual([]);
    expect(result.current.isFavorite(10)).toBe(false);
  });

});
