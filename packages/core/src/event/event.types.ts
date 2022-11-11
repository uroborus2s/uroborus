export interface EventType {
  /** Event identifier */
  type: string;
}

export type EventFunction<P extends EventType> = (event: P | string) => void;

export type FunctionHandler = () => void;

export interface Event<P extends EventType> {
  addEventListener(
    eventType: string,
    listener: EventFunction<P>,
    async: boolean,
  ): void;
}
