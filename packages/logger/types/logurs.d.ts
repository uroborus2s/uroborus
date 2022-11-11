import { Logger, LogLevel, logLevels, LogName, noop } from './logger';
export { Logger, LogLevel, logLevels, LogName, noop };
export declare class Logurs implements Logger {
    private readonly storageKey;
    private defaultLevel;
    private name;
    private currentLevel;
    private prefix;
    constructor(name: LogName, defaultLevel?: LogLevel);
    setPrefix(prefix: string): void;
    setLevel(level?: LogLevel, persist?: boolean): void;
    log(...args: any[]): void;
    trace(...args: any[]): void;
    debug(...args: any[]): void;
    error(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    private fixedParams;
    private realMethod;
    disableAll(persist?: boolean): void;
    enableAll(persist?: boolean): void;
    resetLevel(): void;
    setDefaultLevel(level: LogLevel): void;
    private getPersistedLevel;
}
