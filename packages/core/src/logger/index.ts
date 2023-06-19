import { setCookie, getCookie } from '../util/browser.js';
import { isProduction } from '../util/invariant.js';
import merge from '../util/merge.js';

export interface Logger {
  log: (...msg: any[]) => void;
  trace: (...msg: any[]) => void;
  debug: (...msg: any[]) => void;
  info: (...msg: any[]) => void;
  warn: (...msg: any[]) => void;
  error: (...msg: any[]) => void;
}

export type LogLevel = keyof Logger;

export type LogursTypes = Record<
  'trace' | 'debug' | 'info' | 'warn' | 'error' | 'silent',
  { logLevel: number }
>;

export interface AttachedConfig extends Record<string, unknown> {
  template: string;
  levelFormatter: (level: keyof LogursTypes) => keyof LogursTypes;
  nameFormatter: (name: string) => string;
  timestampFormatter: (date: Date) => string;
  format:
    | ((level: keyof LogursTypes, name: string, date: Date) => string)
    | undefined;
  [key: string]: unknown;
}

export interface LogursOptions {
  name?: string;
  types?: Partial<LogursTypes>;
  logLevel?: keyof LogursTypes;
  attachedConfig?: AttachedConfig;
}

class Logurs implements Logger {
  private static defaultTypes = {
    trace: { logLevel: 0 },
    debug: { logLevel: 1 },
    info: { logLevel: 2 },
    warn: { logLevel: 3 },
    error: { logLevel: 4 },
    silent: { logLevel: 5 },
  };

  private static defaultConfig: AttachedConfig = {
    template: '[%t] %n->%l:',
    levelFormatter: (level) => level,
    nameFormatter: (n) => n,
    timestampFormatter: (date) =>
      date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1'),
    format: undefined,
  };

  private readonly name: string;

  private readonly types: LogursTypes;

  private defaultLevel: keyof LogursTypes;

  private readonly storageKey: string | undefined;

  private attachedConfig: AttachedConfig;

  private _levelName: keyof LogursTypes;

  constructor({
    name = 'default',
    types,
    logLevel = 'warn',
    attachedConfig = Logurs.defaultConfig,
  }: LogursOptions = {}) {
    this.name = name;
    this.types = merge(Logurs.defaultTypes, types || {}) as LogursTypes;
    this.defaultLevel = Object.keys(this.types).includes(logLevel)
      ? logLevel
      : 'warn';
    this.storageKey = typeof name === 'string' ? `loglevel:${name}` : undefined;
    this.attachedConfig = attachedConfig;
    let initialLevel = this.getPersistedLevel();
    if (!initialLevel) {
      initialLevel = this.defaultLevel;
    }
    this._levelName = initialLevel;
    this.setLevel(initialLevel, false);
  }

  get level() {
    const levelName =
      this.getPersistedLevel() || this._levelName || this.defaultLevel;
    return this.types[levelName].logLevel;
  }

  private getLevelName(levelNum: number) {
    return Object.entries(this.types).filter(
      (entry) => entry[1].logLevel === levelNum,
    )[0][0];
  }

  private persistLevelIfPossible(levelNum: number) {
    const levelName = (this.getLevelName(levelNum) || 'silent').toLowerCase();

    if (typeof window === 'undefined' || !this.storageKey) return;

    // Use localStorage if available
    try {
      window.localStorage[this.storageKey] = levelName;
      return;
    } catch (ignore) {
      /* empty */
    }

    // Use session cookie as fallback
    try {
      setCookie(encodeURIComponent(this.storageKey), levelName);
    } catch (ignore) {
      /* empty */
    }
  }

  private getPersistedLevel() {
    let storedLevel: keyof LogursTypes | undefined;

    if (typeof window !== 'undefined' && this.storageKey) {
      try {
        storedLevel = window.localStorage[this.storageKey];
      } catch (ignore) {
        /* empty */
      }

      // Fallback to cookies if local storage gives us nothing
      if (typeof storedLevel === 'undefined' && this.storageKey) {
        try {
          storedLevel = getCookie(
            encodeURIComponent(this.storageKey),
          ) as keyof LogursTypes;
        } catch (ignore) {
          /* empty */
        }
      }

      // If the stored level is not valid, treat it as if nothing was stored.
      if (
        typeof storedLevel === 'string' &&
        !Object.keys(this.types).includes(storedLevel)
      ) {
        storedLevel = undefined;
      }
    }
    return storedLevel;
  }

  enableAll(persist: boolean) {
    this.setLevel('trace', persist);
  }

  disableAll(persist: boolean) {
    this.setLevel('silent', persist);
  }

  static getLogger(options: LogursOptions = {}) {
    return new Logurs(options);
  }

  formatMsg(methodName: keyof LogursTypes, ...msg: any[]) {
    const hasTimestamp = this.attachedConfig.template.indexOf('%t') !== -1;
    const hasLevel = this.attachedConfig.template.indexOf('%l') !== -1;
    const hasName = this.attachedConfig.template.indexOf('%n') !== -1;
    let content = '';

    const args = Array(msg.length);
    for (let key = 0; key < msg.length; key += 1) {
      args[key] = msg[key];
    }

    if (this.attachedConfig.format) {
      content += this.attachedConfig.format(methodName, this.name, new Date());
    } else {
      const timestamp = this.attachedConfig.timestampFormatter(new Date());
      const level = this.attachedConfig.levelFormatter(methodName);
      const lName = this.attachedConfig.nameFormatter(this.name);
      content += this.attachedConfig.template;
      if (hasTimestamp) {
        content = content.replace(/%t/, timestamp);
      }
      if (hasLevel) content = content.replace(/%l/, level);
      if (hasName) content = content.replace(/%n/, lName);
    }

    if (args.length && typeof args[0] === 'string') {
      // concat prefix with first argument to support string substitutions
      args[0] = `${content} ${args[0]}`;
    } else {
      args.unshift(content);
    }

    return args;
  }

  _log(methodName: keyof LogursTypes, ...msg: any[]) {
    const fMsg = this.formatMsg(methodName, ...msg);
    if (isProduction()) return;
    if (
      this.level <= this.types[methodName].logLevel &&
      methodName !== 'silent'
    ) {
      if (console[methodName]) console[methodName](...fMsg);
      if (console.log) console.log(...fMsg);
    }
  }

  setLevel(levelType: keyof LogursTypes, persist: boolean) {
    let logLevel;
    if (typeof levelType === 'string' && this.types[levelType] !== undefined) {
      logLevel = this.types[levelType].logLevel;
    }

    if (typeof logLevel === 'number' && logLevel >= 0 && logLevel <= 5) {
      this._levelName = levelType;
      if (persist !== false) {
        // defaults to true
        this.persistLevelIfPossible(logLevel);
      }
      if (typeof console === 'undefined' && logLevel <= 5) {
        this.warn('No console available for logging');
      }
    }

    this.error(`log.setLevel() called with invalid level: ${levelType}`);
  }

  setDefaultLevel(level: keyof LogursTypes) {
    this.defaultLevel = Object.keys(this.types).includes(level)
      ? level
      : 'warn';
    if (!this.getPersistedLevel()) {
      this.setLevel(level, false);
    }
  }

  resetLevel() {
    this.setLevel(this.defaultLevel, false);
    this.clearPersistedLevel();
  }

  clearPersistedLevel() {
    if (typeof window === 'undefined' || !this.storageKey) return;

    // Use localStorage if available
    try {
      window.localStorage.removeItem(this.storageKey);
      return;
    } catch (ignore) {
      /* empty */
    }

    // Use session cookie as fallback
    try {
      setCookie(encodeURIComponent(this.storageKey), '', -1);
    } catch (ignore) {
      /* empty */
    }
  }

  debug(...msgs: any[]): void {
    this._log('debug', ...msgs);
  }

  error(...msgs: any[]): void {
    this._log('error', ...msgs);
  }

  info(...msgs: any[]): void {
    this._log('info', ...msgs);
  }

  trace(...msgs: any[]): void {
    this._log('trace', ...msgs);
  }

  warn(...msgs: any[]): void {
    this._log('warn', ...msgs);
  }

  log(...msgs: any[]): void {
    this.debug(...msgs);
  }
}

export default Logurs;
