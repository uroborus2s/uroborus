import { isLocalStorageAvailable, isIE } from '@uroborus/core';
import { Logger, LogLevel, logLevels, LogName, noop } from './logger';

export { Logger, LogLevel, logLevels, LogName, noop };

export class Logurs implements Logger {
  private readonly storageKey: string | undefined;

  private defaultLevel: LogLevel;

  private name: string | symbol;

  private currentLevel: number;

  private prefix: string | undefined;

  constructor(name: LogName, defaultLevel?: LogLevel) {
    this.storageKey = 'loglevel';
    if (typeof name === 'string') {
      this.storageKey = `${this.storageKey}:${name}`;
    } else if (typeof name === 'symbol') {
      this.storageKey = undefined;
    }
    this.defaultLevel = defaultLevel ?? 'warn';
    this.name = name;
    this.currentLevel = 3;
    const initLevel = this.getPersistedLevel() ?? this.defaultLevel;
    this.setLevel(initLevel, false);
  }

  public setPrefix(prefix: string) {
    this.prefix = prefix;
  }

  public setLevel(level?: LogLevel, persist?: boolean) {
    let levelNumber;
    if (level === undefined || level === null) {
      return;
    }
    if (typeof level === 'string' && logLevels[level] !== undefined) {
      levelNumber = logLevels[level];
    }
    if (
      typeof levelNumber === 'number' &&
      levelNumber >= 0 &&
      levelNumber <= logLevels.silent
    ) {
      this.currentLevel = levelNumber;
      if (typeof console === 'undefined' && levelNumber < logLevels.silent) {
        throw new Error('No console available for logging');
      }
      if (persist !== false) {
        // defaults to true
        if (typeof window === 'undefined' || !this.storageKey) return;
        // Use localStorage if available
        if (isLocalStorageAvailable()) {
          window.localStorage[this.storageKey] = level;
        } else {
          // Use session cookie as fallback
          try {
            window.document.cookie = `${encodeURIComponent(
              this.storageKey,
            )}=${level};`;
          } catch (ignore) {
            console.log(ignore);
          }
        }
      }
    } else {
      throw new Error(`log.setLevel() called with invalid level:${level}`);
    }
  }

  public log(...args: any[]): void {
    this.realMethod('debug')(...this.fixedParams(args));
  }

  public trace(...args: any[]): void {
    this.realMethod('trace')(...this.fixedParams(args));
  }

  public debug(...args: any[]): void {
    this.realMethod('debug')(...this.fixedParams(args));
  }

  public error(...args: any[]): void {
    this.realMethod('error')(...this.fixedParams(args));
  }

  public info(...args: any[]): void {
    this.realMethod('info')(...this.fixedParams(args));
  }

  public warn(...args: any[]): void {
    this.realMethod('warn')(...this.fixedParams(args));
  }

  private fixedParams(args: any[]): any[] {
    if (this.prefix) {
      const [message, ...other] = args;
      return [`${this.prefix}: ${this.name.toString()}-${message}`, ...other];
    }
    return args;
  }

  private realMethod(methodName: Exclude<LogLevel, 'silent'>) {
    const storedLevel = this.getPersistedLevel() ?? this.currentLevel;
    if (logLevels[methodName] < storedLevel || logLevels[methodName] >= 5)
      return noop;
    if (typeof console === 'undefined') {
      return noop; // No method possible, for now - fixed later by enableLoggingWhenConsoleArrives
    } else if (methodName === 'trace' && isIE()) {
      return (args: any) => {
        if (console.trace) {
          console.trace(args);
        } else if (console.log) {
          console.log(args);
        } else noop(args);
      };
    } else if (console[methodName] !== undefined) {
      return console[methodName];
    } else if (console.log !== undefined) {
      return console.log;
    }
    return noop;
  }

  public disableAll(persist?: boolean): void {
    this.setLevel('silent', persist);
  }

  public enableAll(persist?: boolean): void {
    this.setLevel('trace', persist);
  }

  public resetLevel(): void {
    this.setLevel(this.defaultLevel, false);
    if (typeof window === 'undefined' || !this.storageKey) return;

    // Use localStorage if available
    try {
      window.localStorage.removeItem(this.storageKey);
      return;
    } catch (ignore) {
      console.log(ignore);
    }

    // Use session cookie as fallback
    try {
      window.document.cookie = `${encodeURIComponent(
        this.storageKey,
      )}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
    } catch (ignore) {
      console.log(ignore);
    }
  }

  public setDefaultLevel(level: LogLevel): void {
    this.defaultLevel = level;
    if (!this.getPersistedLevel()) {
      this.setLevel(level, false);
    }
  }

  private getPersistedLevel() {
    let storedLevel: LogLevel | undefined;

    if (typeof window === 'undefined' || !this.storageKey) return storedLevel;

    if (isLocalStorageAvailable()) {
      try {
        storedLevel = window.localStorage[this.storageKey];
      } catch (ignore) {
        console.log(ignore);
      }
    }
    // Fallback to cookies if local storage gives us nothing
    if (typeof storedLevel === 'undefined') {
      try {
        const { cookie } = window.document;
        const location = cookie.indexOf(
          `${encodeURIComponent(this.storageKey)}=`,
        );
        if (cookie && location !== -1) {
          const c = /^([^;]+)/.exec(cookie.slice(location));
          if (c) storedLevel = c[1] as LogLevel;
        }
      } catch (ignore) {
        console.log(ignore);
      }
    }

    // If the stored level is not valid, treat it as if nothing was stored.
    if (storedLevel && logLevels[storedLevel] === undefined) {
      storedLevel = undefined;
    }

    return storedLevel;
  }
}
