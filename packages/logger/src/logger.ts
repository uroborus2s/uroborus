export interface Logger {
  debug: (...args: any[]) => void;
  info: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
  trace: (...args: any[]) => void;
  log: (...args: any[]) => void;
  setLevel: (level?: LogLevel, isPersist?: boolean) => void;
  setPrefix: (prefix: string) => void;
  setDefaultLevel: (level: LogLevel) => void;
  resetLevel: () => void;
  enableAll: (isPersist?: boolean) => void;
  disableAll: (isPersist?: boolean) => void;
}

export const logLevels = {
  trace: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
  silent: 5,
} as const;

export type LogLevel = keyof typeof logLevels;
export type LogName = string | symbol;

export const noop = (...args: any[]) => undefined;
