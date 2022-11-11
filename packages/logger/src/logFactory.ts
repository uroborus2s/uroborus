import { Logger, LogLevel, LogName } from './logger';
import { Logurs } from './logurs';

class LoggerFactoryImpl implements Logger {
  private _defaultLogger: Logger;

  private readonly _loggers: Record<LogName, Logger>;

  constructor() {
    this._defaultLogger = new Logurs('default');
    this._loggers = {};
  }

  public debug(...args: any[]): void {
    this._defaultLogger.debug(...args);
  }

  public error(...args: any[]): void {
    this._defaultLogger.error(...args);
  }

  public info(...args: any[]): void {
    this._defaultLogger.info(...args);
  }

  public warn(...args: any[]): void {
    this._defaultLogger.warn(...args);
  }

  public getLogger(name?: LogName) {
    if (name === undefined || name === 'default') return this;

    if ((typeof name !== 'symbol' && typeof name !== 'string') || name === '') {
      throw new TypeError('You must supply a name when creating a logger.');
    }

    let logger = this._loggers[name];
    if (!logger) {
      logger = new Logurs(name);
      this._loggers[name] = logger;
    }
    return logger;
  }

  public log(...args: any[]): void {
    this._defaultLogger.log(...args);
  }

  public trace(...args: any[]): void {
    this._defaultLogger.trace(...args);
  }

  public setDefaultLevel(level: LogLevel): void {
    this._defaultLogger.setDefaultLevel(level);
  }

  public setLevel(level?: LogLevel, isPersist?: boolean): void {
    this._defaultLogger.setLevel(level, isPersist);
  }

  public setPrefix(prefix: string) {
    this._defaultLogger.setPrefix(prefix);
  }

  public disableAll(isPersist?: boolean): void {
    this._defaultLogger.disableAll(isPersist);
  }

  public enableAll(isPersist?: boolean): void {
    this._defaultLogger.enableAll(isPersist);
  }

  public resetLevel(): void {
    this._defaultLogger.resetLevel();
  }

  public setLogger(logger: Logger): void {
    this._defaultLogger = logger;
  }

  // eslint-disable-next-line class-methods-use-this
  creatLogger(name: string, level?: LogLevel): Logger {
    return new Logurs(name, level);
  }
}

export const loggerFactory = new LoggerFactoryImpl();
