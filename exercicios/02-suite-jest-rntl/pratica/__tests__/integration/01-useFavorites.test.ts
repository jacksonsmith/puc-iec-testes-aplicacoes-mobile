// __tests__/integration/01-useFavorites.test.ts

import { renderHook, act } from '@testing-library/react-native';
import { useFavorites } from '@/hooks/useFavorites';
import { useFavoritesStore } from '@/store/favoritesStore';

beforeEach(() => useFavoritesStore.setState({ ids: [] }));

describe('useFavorites (renderHook)', () => {
  it('1. começa sem nenhum favorito (count 0)', () => {
    const { result } = renderHook(() => useFavorites());
    expect(result.current.count).toBe(0);
  });

  it('2. favoritar e desfavoritar volta a zero (toggle)', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => result.current.toggle(42));
    expect(result.current.count).toBe(1);

    act(() => result.current.toggle(42));
    expect(result.current.count).toBe(0);
  });

  it('3. sei se está favoritado depois de favoritar (isFavorite)', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => result.current.add(42));

    expect(result.current.isFavorite(42)).toBe(true);
    expect(result.current.isFavorite(99)).toBe(false);
  });
});
