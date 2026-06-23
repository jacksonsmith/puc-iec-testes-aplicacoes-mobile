import { useCounterStore } from '@/store/counterStore';

beforeEach(() => {
  useCounterStore.setState({ count: 0 });
});

const s = () => useCounterStore.getState();

describe('counterStore', () => {
  it('1. incrementar soma 1 ao contador (increment)', () => {
    s().increment();
    expect(s().count).toBe(1);
  });

  it('2. decrementar subtrai 1 do contador (decrement)', () => {
    s().decrement();
    expect(s().count).toBe(-1);
  });

  it('3. resetar volta o contador a 0 (reset)', () => {
    s().increment();
    s().increment();
    s().reset();
    expect(s().count).toBe(0);
  });
});
