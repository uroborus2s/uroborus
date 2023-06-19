export function isProduction() {
  return !(
    typeof process !== 'undefined' && process.env.NODE_ENV === 'development'
  );
}
/**
 * 使用 invariant() 断言您的程序假定为真的状态。
 *
 * 提供 sprintf 样式的格式（仅支持 %s）和参数以提供有关损坏的内容和您期望的内容的信息。
 *
 * 不变消息将在生产中被剥离，但不变性将保留以确保逻辑在生产中没有差异。
 */

export function invariant(condition: any, format: string, ...args: any[]) {
  if (isProduction()) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    let error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
          'for the full error message and additional helpful warnings.',
      );
    } else {
      let argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function () {
          argIndex += 1;
          return args[argIndex];
        }),
      );
      error.name = 'Invariant Violation';
    }
    (error as any).framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}
