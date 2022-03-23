export interface IEvent {
  addEventListener(
    eventType: string,
    listener: EventListener,
    async?: boolean,
    options?: AddEventListenerOptions,
  ): void;
  removeEventListener(
    eventType: string,
    listener: EventListener,
    async?: boolean,
    options?: AddEventListenerOptions,
  ): void;
}
