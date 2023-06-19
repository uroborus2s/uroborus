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

  removeEventListener(
    eventType: string,
    listener: EventFunction<P>,
    async: boolean,
  ): void;

  emit(event: P | string): void;

  once(event: P | string): void;
}

export type BindEventOptions = {
  passive?: boolean;
  capture?: boolean;
  // sometimes an event might only event want to be bound once
  once?: boolean;
};

export type HTMLEventBinding<K extends keyof HTMLElementEventMap> = {
  eventName: K;
  fn: (evt: HTMLElementEventMap[K]) => void;
  options?: BindEventOptions;
};

export type WINDOWEventBinding<K extends keyof WindowEventMap> = {
  eventName: K;
  fn: (evt: WindowEventMap[K]) => void;
  options?: BindEventOptions;
};
