import { useFavoritesStore } from '@/store/favoritesStore';

beforeEach(() => {
  useFavoritesStore.setState({ ids: [] });
});

const s = () => useFavoritesStore.getState();
const comFavoritos = (...ids: number[]) => ids.forEach((id) => s().add(id));

describe('favoritesStore', () => {
  it('1. favoritar adiciona o filme à lista (add)', () => {
    s().add(1);
    expect(s().ids).toEqual([1]);
  });

  it('2. desfavoritar tira o filme da lista (remove)', () => {
    comFavoritos(1);
    s().remove(1);
    expect(s().ids).toEqual([]);
  });

  it('3. sei se um filme está favoritado (isFavorite)', () => {
    comFavoritos(1);
    expect(s().isFavorite(1)).toBe(true);
    expect(s().isFavorite(99)).toBe(false);
  });

  it('4. limpar esvazia todos os favoritos (clear)', () => {
    comFavoritos(1, 2);
    s().clear();
    expect(s().ids).toEqual([]);
  });

  it('5. favoritar o mesmo filme 2x não duplica (add)', () => {
    s().add(1);
    s().add(1);
    expect(s().ids).toEqual([1]);
  });

  it('6. o coracao alterna favoritar/desfavoritar (toggle)', () => {
    s().toggle(1);
    expect(s().ids).toEqual([1]);
    s().toggle(1);
    expect(s().ids).toEqual([]);
  });
});
