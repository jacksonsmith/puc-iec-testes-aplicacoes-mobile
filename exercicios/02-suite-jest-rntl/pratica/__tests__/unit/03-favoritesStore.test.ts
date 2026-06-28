// __tests__/unit/03-favoritesStore.test.ts
//
// ✅ AVALIATIVO — o aluno entrega isto (conta nota). Faça TODOS os it() — todos contam.
//    Marca por it(): 🧑‍🏫 = a gente faz junto em aula · 🧑‍💻 = o aluno faz sozinho.
//
// Escreva os testes da favoritesStore.
//
// Store Zustand é singleton: precisa resetar o estado entre testes
// (senão um teste contamina o outro). Use o beforeEach abaixo.
//
// Acesse estado e actions com useFavoritesStore.getState():
//   useFavoritesStore.getState().add(1)
//   useFavoritesStore.getState().ids            // → [1]
//   useFavoritesStore.getState().isFavorite(1)  // → true

import { useFavoritesStore } from '@/store/favoritesStore';

beforeEach(() => {
  useFavoritesStore.setState({ ids: [] });
});

// Atalho pra ler estado e actions fora de componente React:
const s = () => useFavoritesStore.getState();

// Creation Method: "prepara o cenário" (Arrange) falando o domínio,
// em vez de repetir s().add(...) em cada teste.
const comFavoritos = (...ids: number[]) => ids.forEach((id) => s().add(id));

// FÁCEIS (1-4): Arrange e Act já escritos — complete SÓ o expect (começam vermelhos → verde).
// 🔴 DESAFIOS (5-6): ainda it.todo — escreva o teste inteiro a partir da dica.

describe('favoritesStore', () => {
  it('1. favoritar adiciona o filme à lista (add)', () => {
    const { add } = useFavoritesStore.getState();
    add(10);
    expect(useFavoritesStore.getState().ids).toContain(10);
  });

  it('2. desfavoritar tira o filme da lista (remove)', () => {
    const { add, remove } = useFavoritesStore.getState();
    add(10);
    remove(10);
    expect(useFavoritesStore.getState().ids).not.toContain(10);
  });

  it('3. sei se um filme está favoritado (isFavorite)', () => {
  const { add, isFavorite } = useFavoritesStore.getState();
    expect(isFavorite(10)).toBe(false);
    add(10);
    expect(isFavorite(10)).toBe(true);
  });

  it('4. limpar esvazia todos os favoritos (clear)', () => {
    const { add, clear } = useFavoritesStore.getState();
    add(1);
    add(2);
    clear();
    expect(useFavoritesStore.getState().ids).toEqual([]);
  });

  // 🔴 DESAFIO: chamar add(1) DUAS vezes não pode duplicar (ids continua [1]).
  //    Escreva Act + Assert do zero.
  it('5. favoritar o mesmo filme 2× não duplica (add)', () => {
    const { add } = useFavoritesStore.getState();
    add(7);
    add(7);
    expect(useFavoritesStore.getState().ids).toEqual([7]);
  });

  // 🔴 DESAFIO: toggle(1) na lista vazia ADICIONA; chamar toggle(1) de novo REMOVE.
  //    Faça as 2 verificações (após o 1º toggle = [1]; após o 2º = []).
  it('6. o ♥ alterna favoritar/desfavoritar (toggle)', () => {
    const { toggle, isFavorite } = useFavoritesStore.getState();
    toggle(5);
    expect(isFavorite(5)).toBe(true);
    toggle(5);
    expect(isFavorite(5)).toBe(false);  // 🧑‍💻 aluno
  });
});
