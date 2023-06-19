import { getPolyfills } from './util.js';

test('getPolyfills', () => {
  expect(getPolyfills()).toBe(4);
});
