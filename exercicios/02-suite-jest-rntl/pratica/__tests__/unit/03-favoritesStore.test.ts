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

import { favoritesStoreRobot } from './robots/storeRobots';

beforeEach(() => favoritesStoreRobot.resetar());

const comFavoritos = (...ids: number[]) => ids.forEach((id) => favoritesStoreRobot.favoritar(id));

// FÁCEIS (1-4): Arrange e Act já escritos — complete SÓ o expect (começam vermelhos → verde).
// 🔴 DESAFIOS (5-6): ainda it.todo — escreva o teste inteiro a partir da dica.

describe('favoritesStore', () => {
  it('1. favoritar adiciona o filme à lista (add)', () => {   // 🧑‍🏫 em aula
    favoritesStoreRobot.favoritar(1);
    favoritesStoreRobot.verificarIds([1]);
  });

  it('2. desfavoritar tira o filme da lista (remove)', () => {   // 🧑‍🏫 em aula
    comFavoritos(1);
    favoritesStoreRobot.desfavoritar(1);
    favoritesStoreRobot.verificarIds([]);
  });

  it('3. sei se um filme está favoritado (isFavorite)', () => {   // 🧑‍💻 aluno
    comFavoritos(1);
    favoritesStoreRobot.verificarFavorito(1, true);
    favoritesStoreRobot.verificarFavorito(99, false);
  });

  it('4. limpar esvazia todos os favoritos (clear)', () => {   // 🧑‍💻 aluno
    comFavoritos(1, 2);
    favoritesStoreRobot.limpar();
    favoritesStoreRobot.verificarIds([]);
  });

  // 🔴 DESAFIO: chamar add(1) DUAS vezes não pode duplicar (ids continua [1]).
  it('5. favoritar o mesmo filme 2× não duplica (add)', () => {
    favoritesStoreRobot.favoritar(1);
    favoritesStoreRobot.favoritar(1);
    favoritesStoreRobot.verificarIds([1]);
  });   // 🧑‍💻 aluno

  // 🔴 DESAFIO: toggle(1) na lista vazia ADICIONA; chamar toggle(1) de novo REMOVE.
  //    Faça as 2 verificações (após o 1º toggle = [1]; após o 2º = []).
  it('6. o ♥ alterna favoritar/desfavoritar (toggle)', () => {
    favoritesStoreRobot.alternar(1);
    favoritesStoreRobot.verificarIds([1]);

    favoritesStoreRobot.alternar(1);
    favoritesStoreRobot.verificarIds([]);
  });   // 🧑‍💻 aluno
});
