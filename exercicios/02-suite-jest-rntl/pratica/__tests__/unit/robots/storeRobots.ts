import { useCounterStore } from '@/store/counterStore';
import { useFavoritesStore } from '@/store/favoritesStore';

const favorites = () => useFavoritesStore.getState();
const counter = () => useCounterStore.getState();

export const favoritesStoreRobot = {
  resetar() {
    useFavoritesStore.setState({ ids: [] });
  },

  favoritar(id: number) {
    favorites().add(id);
  },

  desfavoritar(id: number) {
    favorites().remove(id);
  },

  alternar(id: number) {
    favorites().toggle(id);
  },

  limpar() {
    favorites().clear();
  },

  verificarIds(ids: number[]) {
    expect(favorites().ids).toEqual(ids);
  },

  verificarFavorito(id: number, esperado: boolean) {
    expect(favorites().isFavorite(id)).toBe(esperado);
  },
};

export const counterStoreRobot = {
  resetar() {
    useCounterStore.setState({ count: 0 });
  },

  incrementar() {
    counter().increment();
  },

  decrementar() {
    counter().decrement();
  },

  zerar() {
    counter().reset();
  },

  verificarCount(esperado: number) {
    expect(counter().count).toBe(esperado);
  },
};