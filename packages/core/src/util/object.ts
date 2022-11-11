export function iterateObject<T>(
  object: { [p: string]: T } | T[] | null | undefined,
  callback: (key: string, value: T) => void,
) {
  if (object == null) {
    return;
  }

  if (Array.isArray(object)) {
    object.forEach((value, index) => callback(`${index}`, value));
  } else {
    Object.keys(object).forEach((key) => callback(key, object[key]));
  }
}

export function exists(
  value: string | null | undefined,
  allowEmptyString?: boolean,
): value is string;
export function exists<T>(value: T): value is NonNullable<T>;
export function exists(value: any, allowEmptyString = false): boolean {
  return value != null && (value !== '' || allowEmptyString);
}

export function missing<T>(
  value: T | null | undefined,
): value is Exclude<undefined | null, T>;
export function missing(value: any): boolean {
  return !exists(value);
}

export function missingOrEmptyObject(value: any): boolean {
  return missing(value) || Object.keys(value).length === 0;
}
