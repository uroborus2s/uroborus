const doOnceFlags: Record<string, boolean> = {};

export const doOnce = (func: () => void, key: string) => {
  if (doOnceFlags[key]) {
    return;
  }

  func();
  doOnceFlags[key] = true;
};

export function values<T>(
  object: { [key: string]: T } | Set<T> | Map<any, T>,
): T[] {
  if (object instanceof Set || object instanceof Map) {
    const arr: T[] = [];

    object.forEach((value: T) => arr.push(value));

    return arr;
  }

  return Object.values(object);
}

export function includes<T>(array: T[], value: T): boolean {
  return array.indexOf(value) > -1;
}

export function toNumber(value: any): number | undefined {
  if (typeof value === 'number') {
    return value;
  }

  if (typeof value === 'string') {
    return Number(value);
  }

  return undefined;
}

export function toBoolean(value: any): boolean {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'string') {
    // for boolean, compare to empty String to allow attributes appearing with
    // no value to be treated as 'true'
    return value.toUpperCase() === 'TRUE' || value === '';
  }

  return false;
}

export function isTrue(value: any): boolean {
  return value === true || value === 'true';
}

export function toDecimalNumber(value: any): number | undefined {
  if (typeof value === 'number') {
    return value;
  }

  if (typeof value === 'string') {
    return parseInt(value, 10);
  }
  return undefined;
}

// 蛇形字符转换为驼峰
export function toHump(lineChar: string, sep = '_') {
  const regExp = new RegExp(`\\${sep}(\\w)`, 'g');
  return lineChar.replace(regExp, (substring, args) => args.toUpperCase());
}

export function toLine(humpChar: string, sep = '_') {
  return humpChar.replace(/([A-Z])/g, `${sep}$1`).toLowerCase();
}
