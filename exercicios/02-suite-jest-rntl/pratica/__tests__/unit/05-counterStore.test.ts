// __tests__/unit/05-counterStore.test.ts
//
// ✅ AVALIATIVO — o aluno entrega isto (conta nota). Faça TODOS os it() — todos contam.
//    Marca por it(): 🧑‍🏫 = a gente faz junto em aula · 🧑‍💻 = o aluno faz sozinho.
//    (esta store inteira é 🧑‍💻 — o aluno faz sozinho, mesmo padrão da favoritesStore)
//
// Escreva os testes da counterStore.
//
// Mesmo padrão da favoritesStore: resete o estado entre testes.
//   useCounterStore.getState().increment()
//   useCounterStore.getState().count   // → lê o valor atual

import { useCounterStore } from '@/store/counterStore';

beforeEach(() => {
  useCounterStore.setState({ count: 0 });
});

// Atalho (count começa em 0 por causa do beforeEach):
const s = () => useCounterStore.getState();

// Os 3 são FÁCEIS: a ação já está escrita — complete só o expect (começam vermelhos → verde).

describe('counterStore', () => {
  it('1. incrementar soma 1 ao contador (increment)', () => {
    const { increment } = useCounterStore.getState();
    increment();
    expect(useCounterStore.getState().count).toBe(1);
  });

  it('2. decrementar subtrai 1 do contador (decrement)', () => {
    const { increment, decrement } = useCounterStore.getState();
    increment();
    decrement();
    expect(useCounterStore.getState().count).toBe(0);
  });

  it('3. resetar volta o contador a 0 (reset)', () => {
  const { increment, reset } = useCounterStore.getState();
    increment();
    increment();
    reset();
    expect(useCounterStore.getState().count).toBe(0);
  });
});
