import isIE from '../window/isIE';

export interface Logger {
  debug: (...args: any[]) => void;
  info: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
  trace: (...args: any[]) => void;
  log: (...args: any[]) => void;
  setLevel: (level: LogLevel, isPersist?: boolean) => void;
  setDefaultLevel: (level: LogLevel) => void;
  resetLevel: () => void;
  enableAll: (isPersist?: boolean) => void;
  disableAll: (isPersist?: boolean) => void;
}

const logLevels = {
  trace: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
  silent: 5,
} as const;

type LogLevel = keyof typeof logLevels;
type LogName = string | symbol;

const noop = (...args: any[]) => void 0;

class Logurs2 implements Logger {
  private readonly storageKey: string | undefined;
  private defaultLevel: LogLevel;
  private name: string | symbol;
  private currentLevel: number;

  constructor(name: LogName, defaultLevel?: LogLevel) {
    this.storageKey = 'loglevel';
    if (typeof name === 'string') {
      this.storageKey += ':' + name;
    } else if (typeof name === 'symbol') {
      this.storageKey = undefined;
    }
    this.defaultLevel = defaultLevel ?? 'warn';
    this.name = name;
    this.currentLevel = 3;
    const initLevel = this.getPersistedLevel() ?? this.defaultLevel;
    this.setLevel(initLevel, false);
  }

  public setLevel(level: LogLevel, persist?: boolean) {
    let levelNumber;
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
        return 'No console available for logging';
      }
      if (persist !== false) {
        // defaults to true
        if (typeof window === 'undefined' || !this.storageKey) return;
        // Use localStorage if available
        try {
          window.localStorage[this.storageKey] = level;
          return;
        } catch (ignore) {
          console.log(ignore);
        }
        // Use session cookie as fallback
        try {
          window.document.cookie =
            encodeURIComponent(this.storageKey) + '=' + level + ';';
        } catch (ignore) {
          console.log(ignore);
        }
      }
    } else {
      throw 'log.setLevel() called with invalid level: ' + level;
    }
  }

  public log(args: any): void {
    this._realMethod('debug')(args);
  }

  public trace(args: any): void {
    this._realMethod('trace')(args);
  }

  public debug(args: any): void {
    this._realMethod('debug')(args);
  }

  public error(args: any): void {
    this._realMethod('error')(args);
  }

  public info(args: any): void {
    this._realMethod('info')(args);
  }

  public warn(args: any): void {
    this._realMethod('warn')(args);
  }

  private _realMethod(methodName: Exclude<LogLevel, 'silent'>) {
    if (logLevels[methodName] < this.currentLevel) noop();
    if (typeof console === 'undefined') {
      return noop; // No method possible, for now - fixed later by enableLoggingWhenConsoleArrives
    } else if (methodName === 'trace' && isIE) {
      return this._traceForIE;
    } else if (console[methodName] !== undefined) {
      return console[methodName];
    } else if (console.log !== undefined) {
      return console.log;
    } else {
      return noop;
    }
  }

  private _traceForIE(args: any) {
    if (console.log) {
      console.log(args);
    }
    if (console.trace) console.trace();
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
      window.document.cookie =
        encodeURIComponent(this.storageKey) +
        '=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
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

    if (typeof window === 'undefined' || !this.storageKey) return;

    try {
      storedLevel = window.localStorage[this.storageKey];
    } catch (ignore) {
      console.log(ignore);
    }

    // Fallback to cookies if local storage gives us nothing
    if (typeof storedLevel === 'undefined') {
      try {
        const cookie = window.document.cookie;
        const location = cookie.indexOf(
          encodeURIComponent(this.storageKey) + '=',
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

class logoFactory implements Logger {
  private _defaultLogger: Logurs2;
  private readonly _loggers: Record<LogName, Logger>;
  constructor() {
    this._defaultLogger = new Logurs2('default');
    this._loggers = {};
  }
  public debug(args: any): void {
    this._defaultLogger.debug(args);
  }

  public error(args: any): void {
    this._defaultLogger.error(args);
  }

  public info(args: any): void {
    this._defaultLogger.info(args);
  }

  public warn(args: any): void {
    this._defaultLogger.warn(args);
  }

  public getLogger(name: LogName) {
    if (
      (typeof name !== 'symbol' && typeof name !== 'string') ||
      name === '' ||
      name === 'default'
    ) {
      throw new TypeError('You must supply a name when creating a logger.');
    }

    let logger = this._loggers[name];
    if (!logger) {
      this._loggers[name] = logger = new Logurs2(name);
    }
    return logger;
  }

  public log(args: any): void {
    this._defaultLogger.log(args);
  }

  public trace(args: any): void {
    this._defaultLogger.trace(args);
  }

  public setDefaultLevel(level: LogLevel): void {
    this._defaultLogger.setDefaultLevel(level);
  }

  public setLevel(level: LogLevel, isPersist: boolean | undefined): void {
    this._defaultLogger.setLevel(level, isPersist);
  }

  public disableAll(isPersist: boolean | undefined): void {
    this._defaultLogger.disableAll(isPersist);
  }

  public enableAll(isPersist: boolean | undefined): void {
    this._defaultLogger.enableAll(isPersist);
  }

  public resetLevel(): void {
    this._defaultLogger.resetLevel();
  }
}

const logger = new logoFactory();

export default logger;
