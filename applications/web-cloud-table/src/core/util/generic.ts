export function exists(
  value: string | null | undefined,
  allowEmptyString?: boolean,
): value is string;
export function exists<T>(value: T): value is NonNullable<T>;
export function exists(value: any, allowEmptyString = false): boolean {
  return value != null && (value !== '' || allowEmptyString);
}
