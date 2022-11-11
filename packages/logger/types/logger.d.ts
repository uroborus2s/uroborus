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
export declare const logLevels: {
    readonly trace: 0;
    readonly debug: 1;
    readonly info: 2;
    readonly warn: 3;
    readonly error: 4;
    readonly silent: 5;
};
export declare type LogLevel = keyof typeof logLevels;
export declare type LogName = string | symbol;
export declare const noop: (...args: any[]) => undefined;
