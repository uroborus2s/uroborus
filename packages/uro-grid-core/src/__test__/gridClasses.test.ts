import { gridClasses } from '../hooks/useUtilityClasses.js';

test('测试classes', () => {
  expect(gridClasses).toMatchObject({
    root: 'uroGrid-root',
    unselectable: 'uroGrid-unselectable',
  });
});
