// __tests__/favoritesStore.test.ts
//
// HANDS-ON / ATIVIDADE 2 — escreva os testes da favoritesStore.
//
// Store Zustand é singleton: precisa resetar o estado entre testes
// (senão um teste contamina o outro). Use o beforeEach abaixo.
//
// Acesse estado e actions com useFavoritesStore.getState():
//   useFavoritesStore.getState().add(1)
//   useFavoritesStore.getState().ids        // → [1]
//   useFavoritesStore.getState().isFavorite(1)  // → true

import { useFavoritesStore } from '../src/store/favoritesStore';

beforeEach(() => {
  useFavoritesStore.setState({ ids: [] });
});

// Atalho pra ler estado e actions fora de componente React:
const s = () => useFavoritesStore.getState();

// FÁCEIS: a preparação (Arrange) e a ação (Act) já estão escritas — você completa SÓ o expect.
//         Começam VERMELHOS; preencha o valor esperado pra virar verde.
// 🔴 DESAFIOS: ainda it.todo — escreva o teste inteiro a partir da dica.

describe('favoritesStore', () => {
  it('add(id) adiciona o id à lista', () => {
    // Act
    s().add(1);
    // Assert — complete:
    expect(s().ids).toEqual(/* TODO: qual array? */);
  });

  it('remove(id) tira o id da lista', () => {
    // Arrange
    s().add(1);
    // Act
    s().remove(1);
    // Assert — complete:
    expect(s().ids).toEqual(/* TODO */);
  });

  it('isFavorite(id) reflete o estado atual', () => {
    // Arrange
    s().add(1);
    // Assert — complete (true ou false?):
    expect(s().isFavorite(1)).toBe(/* TODO */);
    expect(s().isFavorite(99)).toBe(/* TODO */);
  });

  it('clear() esvazia a lista', () => {
    // Arrange
    s().add(1);
    s().add(2);
    // Act
    s().clear();
    // Assert — complete:
    expect(s().ids).toEqual(/* TODO */);
  });

  // 🔴 DESAFIO: chamar add(1) DUAS vezes não pode duplicar (ids continua [1]).
  //    Escreva Act + Assert do zero.
  it.todo('add(id) não duplica id já existente');

  // 🔴 DESAFIO: toggle(1) na lista vazia ADICIONA; chamar toggle(1) de novo REMOVE.
  //    Faça as 2 verificações (após o 1º toggle = [1]; após o 2º = []).
  it.todo('toggle(id) adiciona se ausente e remove se presente');
});
