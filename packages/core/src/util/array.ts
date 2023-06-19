export function last<T>(arr: T[]): T;
export function last<T extends Node>(arr: NodeListOf<T>): T;
export function last(arr: any): any {
  if (!arr || !arr.length) {
    return undefined;
  }
  return arr[arr.length - 1];
}
