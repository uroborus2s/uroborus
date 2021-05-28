export interface StorageOptions<T> {
  key: string;
  default: T;
}

export type SetterStorage<T> = (valOrUpdater: ((currVal: T) => T) | T) => void;

export interface StorageState<T> {
  key: string;
  default: T;
}
