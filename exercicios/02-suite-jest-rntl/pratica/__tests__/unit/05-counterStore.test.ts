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
import { counterStoreRobot } from './robots/storeRobots';

beforeEach(() => counterStoreRobot.resetar());

// Os 3 são FÁCEIS: a ação já está escrita — complete só o expect (começam vermelhos → verde).

describe('counterStore', () => {
  it('1. incrementar soma 1 ao contador (increment)', () => {   // 🧑‍💻 aluno
    counterStoreRobot.incrementar();
    counterStoreRobot.verificarCount(1);
  });

  it('2. decrementar subtrai 1 do contador (decrement)', () => {   // 🧑‍💻 aluno
    counterStoreRobot.decrementar();
    counterStoreRobot.verificarCount(-1);
  });

  it('3. resetar volta o contador a 0 (reset)', () => {   // 🧑‍💻 aluno
    counterStoreRobot.incrementar();
    counterStoreRobot.incrementar();
    counterStoreRobot.zerar();
    counterStoreRobot.verificarCount(0);
  });
});
