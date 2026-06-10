// __tests__/counterStore.test.ts
//
// HANDS-ON — escreva os testes da counterStore.
//
// Mesmo padrão da favoritesStore: resete o estado entre testes.
//   useCounterStore.getState().increment()
//   useCounterStore.getState().count   // → lê o valor atual

import { useCounterStore } from '../src/store/counterStore';

beforeEach(() => {
  useCounterStore.setState({ count: 0 });
});

// Atalho (count começa em 0 por causa do beforeEach):
const s = () => useCounterStore.getState();

// Os 3 são FÁCEIS: a ação já está escrita — complete só o expect (começam vermelhos → verde).

describe('counterStore', () => {
  it('increment soma 1 ao count', () => {
    // Act
    s().increment();
    // Assert — complete:
    expect(s().count).toBe(/* TODO */);
  });

  it('decrement subtrai 1 do count', () => {
    // Act
    s().decrement();
    // Assert — complete:
    expect(s().count).toBe(/* TODO */);
  });

  it('reset volta o count pra 0', () => {
    // Arrange
    s().increment();
    s().increment();
    // Act
    s().reset();
    // Assert — complete:
    expect(s().count).toBe(/* TODO */);
  });
});
