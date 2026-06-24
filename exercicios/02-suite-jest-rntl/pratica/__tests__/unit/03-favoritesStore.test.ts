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
  it('1. favoritar adiciona o filme à lista (add)', () => {   // 🧑‍🏫 em aula
    s().add(1);
    expect(s().ids).toEqual([1]);
  });

  it('2. desfavoritar tira o filme da lista (remove)', () => {   // 🧑‍🏫 em aula
    comFavoritos(1);
    s().remove(1);
    expect(s().ids).toEqual([]);
  });

  it('3. sei se um filme está favoritado (isFavorite)', () => {   // 🧑‍💻 aluno
    comFavoritos(1);
    expect(s().isFavorite(1)).toBe(true);
    expect(s().isFavorite(99)).toBe(false);
  });

  it('4. limpar esvazia todos os favoritos (clear)', () => {   // 🧑‍💻 aluno
    comFavoritos(1, 2);
    s().clear();
    expect(s().ids).toEqual([]);
  });

  // 🔴 DESAFIO: chamar add(1) DUAS vezes não pode duplicar (ids continua [1]).
  //    Escreva Act + Assert do zero.
  it('5. favoritar o mesmo filme 2× não duplica (add)', () => {
    s().add(1);
    s().add(1);

    expect(s().ids).toEqual([1]);
  });   // 🧑‍💻 aluno 

  // 🔴 DESAFIO: toggle(1) na lista vazia ADICIONA; chamar toggle(1) de novo REMOVE.
  //    Faça as 2 verificações (após o 1º toggle = [1]; após o 2º = []).
  it('6. o ♥ alterna favoritar/desfavoritar (toggle)', () => {
    s().toggle(1);
    expect(s().ids).toEqual([1]);
    s().toggle(1);
    expect(s().ids).toEqual([]);  
  });   // 🧑‍💻 aluno
});
