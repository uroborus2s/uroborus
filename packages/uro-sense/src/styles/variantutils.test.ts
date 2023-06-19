import { isVariantPalette } from './variantUtils.js';

describe('variant 测试', () => {
  test('测试Palette 为字符串', () => {
    expect(isVariantPalette('pt')).toBe(false);
  });
});
