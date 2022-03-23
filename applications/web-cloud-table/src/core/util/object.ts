export const objecIterate = <T>(
  obj: Record<string, T> | T[] | null | undefined,
  callback: (key: string, value: T) => void,
) => {
  if (typeof obj !== 'object') {
    return;
  }
  if (obj === undefined || obj === null) {
    return;
  }

  if (Array.isArray(obj)) {
    obj.forEach((value, index) => callback(`${index}`, value));
  } else {
    Object.keys(obj).forEach((key) => callback(key, obj[key]));
  }
};
