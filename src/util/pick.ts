export default function <T extends Document<string, any>, K extends keyof T>(
  obj: T,
  ...attr: K[]
) {
  return attr.reduce((acc: Partial<T>, key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}
