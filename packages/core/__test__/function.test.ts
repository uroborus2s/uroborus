import { toHump, toLine } from '../src/index.js';

describe('测试蛇形字符转驼峰', () => {
  test('自定义分割符', () => {
    expect(toHump('border-box', '-')).toBe('borderBox');
    expect(toHump('content-box', '-')).toBe('contentBox');
    expect(toHump('device-pixel-content-box', '-')).toBe(
      'devicePixelContentBox',
    );
  });
});

describe('测试驼峰转蛇形字符', () => {
  test('自定义分割符', () => {
    expect(toLine('borderBox', '-')).toBe('border-box');
    expect(toLine('contentBox', '-')).toBe('content-box');
    expect(toLine('devicePixelContentBox', '-')).toBe(
      'device-pixel-content-box',
    );
  });
});
