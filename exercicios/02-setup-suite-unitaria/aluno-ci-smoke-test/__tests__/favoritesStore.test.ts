import { create } from "zustand";

type FavoritesState = {
  ids: number[];
  add: (id: number) => void;
  remove: (id: number) => void;
  toggle: (id: number) => void;
  clear: () => void;
  isFavorite: (id: number) => boolean;
};

const useFavoritesStore = create<FavoritesState>((set, get) => ({
  ids: [],
  add: (id) => set((s) => ({ ids: [...s.ids, id] })),
  remove: (id) => set((s) => ({ ids: s.ids.filter((i) => i !== id) })),
  toggle: (id) => get().isFavorite(id) ? get().remove(id) : get().add(id),
  clear: () => set({ ids: [] }),
  isFavorite: (id) => get().ids.includes(id),
}));

describe("favoritesStore", () => {
  beforeEach(() => useFavoritesStore.getState().clear());

  it("inicia vazio", () => {
    expect(useFavoritesStore.getState().ids).toHaveLength(0);
  });

  it("add adiciona id", () => {
    useFavoritesStore.getState().add(42);
    expect(useFavoritesStore.getState().isFavorite(42)).toBe(true);
  });

  it("remove elimina id", () => {
    useFavoritesStore.getState().add(42);
    useFavoritesStore.getState().remove(42);
    expect(useFavoritesStore.getState().isFavorite(42)).toBe(false);
  });

  it("toggle adiciona quando ausente", () => {
    useFavoritesStore.getState().toggle(7);
    expect(useFavoritesStore.getState().isFavorite(7)).toBe(true);
  });

  it("toggle remove quando presente", () => {
    useFavoritesStore.getState().add(7);
    useFavoritesStore.getState().toggle(7);
    expect(useFavoritesStore.getState().isFavorite(7)).toBe(false);
  });

  it("clear limpa tudo", () => {
    useFavoritesStore.getState().add(1);
    useFavoritesStore.getState().add(2);
    useFavoritesStore.getState().clear();
    expect(useFavoritesStore.getState().ids).toHaveLength(0);
  });
});
