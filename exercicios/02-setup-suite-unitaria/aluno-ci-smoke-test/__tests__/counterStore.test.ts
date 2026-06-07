import { create } from "zustand";

type CounterState = {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
  decrement: () => set((s) => ({ count: s.count - 1 })),
  reset: () => set({ count: 0 }),
}));

describe("counterStore", () => {
  beforeEach(() => useCounterStore.getState().reset());

  it("inicia com zero", () => {
    expect(useCounterStore.getState().count).toBe(0);
  });

  it("increment soma 1", () => {
    useCounterStore.getState().increment();
    expect(useCounterStore.getState().count).toBe(1);
  });

  it("decrement subtrai 1", () => {
    useCounterStore.getState().increment();
    useCounterStore.getState().decrement();
    expect(useCounterStore.getState().count).toBe(0);
  });

  it("reset volta a zero", () => {
    useCounterStore.getState().increment();
    useCounterStore.getState().increment();
    useCounterStore.getState().reset();
    expect(useCounterStore.getState().count).toBe(0);
  });
});
