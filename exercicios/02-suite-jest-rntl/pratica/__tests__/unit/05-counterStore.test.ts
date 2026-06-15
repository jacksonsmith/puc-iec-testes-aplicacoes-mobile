import { useCounterStore } from '@/store/counterStore';

beforeEach(() => { useCounterStore.setState({ count: 0 }); });
const s = () => useCounterStore.getState();

describe('counterStore', () => {
  it('1. increment soma 1', () => { s().increment(); expect(s().count).toBe(1); });
  it('2. decrement subtrai 1', () => { s().decrement(); expect(s().count).toBe(-1); });
  it('3. reset volta pra 0', () => { s().increment(); s().reset(); expect(s().count).toBe(0); });
});
