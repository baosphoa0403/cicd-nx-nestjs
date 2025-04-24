// libs/global/src/lib/index.spec.ts
import { add } from '../util/calculate';

describe('global - add()', () => {
  it('should add two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });
});
