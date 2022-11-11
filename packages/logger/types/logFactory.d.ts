import { Logger, LogLevel, LogName } from './logger';
export interface LoggerFactory extends Logger {
    getLogger: (name?: LogName) => Logger;
    creatLogger: (name: string, level?: LogLevel) => Logger;
}
export declare class LogFactory implements LoggerFactory {
    private _defaultLogger;
    private readonly _loggers;
    constructor();
    debug(...args: any[]): void;
    error(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    getLogger(name?: LogName): Logger;
    log(...args: any[]): void;
    trace(...args: any[]): void;
    setDefaultLevel(level: LogLevel): void;
    setLevel(level?: LogLevel, isPersist?: boolean): void;
    setPrefix(prefix: string): void;
    disableAll(isPersist?: boolean): void;
    enableAll(isPersist?: boolean): void;
    resetLevel(): void;
    creatLogger(name: string, level?: LogLevel): Logger;
}
