import { TransactionInterface_UNSTABLE } from 'recoil';
import { ServiceStatusError } from './';

export class NoTokenError extends Error {
  constructor(message?: string) {
    super(message);
  }
}

export class NullResponseError extends Error {
  constructor(message?: string) {
    super(message);
  }
}

export class ResolvingError extends Error {
  constructor(message?: string) {
    super(message);
  }
}

export function errorReducer({ set }: TransactionInterface_UNSTABLE) {
  return (error: Error) => {
    if (error instanceof NoTokenError) {
    } else if (error instanceof NullResponseError) {
    } else if (error instanceof ServiceStatusError) {
    }
  };
}
