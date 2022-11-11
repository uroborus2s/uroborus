import { Event, EventFunction, EventType } from './event.types';
import { FrameworkOverrides, IFrameworkOverrides } from './frameworkOverrides';

export class EventService<P extends EventType> implements Event<P> {
  private readonly allSyncListeners: Map<string, Set<EventFunction<P>>>;

  private readonly allAsyncListeners: Map<string, Set<EventFunction<P>>>;

  private readonly globalSyncListeners: Set<EventFunction<P>>;

  private readonly globalAsyncListeners: Set<EventFunction<P>>;

  private asyncFunctionsQueue: (() => void)[];

  private scheduled = false;

  // using an object performs better than a Set for the number of different events we have
  private firedEvents: { [key: string]: boolean } = {};

  private frameworkOverrides: IFrameworkOverrides<P>;

  constructor(
    overrides?: IFrameworkOverrides<P>,
    globalEventListener?: EventFunction<P>,
  ) {
    this.frameworkOverrides = overrides || new FrameworkOverrides();
    this.allSyncListeners = new Map();
    this.allAsyncListeners = new Map();
    this.globalAsyncListeners = new Set();
    this.globalSyncListeners = new Set();
    this.asyncFunctionsQueue = [];
    if (globalEventListener) {
      this.addGlobalListener(globalEventListener, true);
    }
  }

  // this gets called inside the grid's thread, for each event that it
  // wants to set async. the grid then batches the events into one setTimeout()
  // because setTimeout() is an expensive operation. ideally we would have
  // each event in it's own setTimeout(), but we batch for performance.
  private emitAsync(func: () => void): void {
    // add to the queue for executing later in the next VM turn
    this.asyncFunctionsQueue.push(func);

    // check if timeout is already scheduled. the first time the grid calls
    // this within it's thread turn, this should be false, so it will schedule
    // the 'flush queue' method the first time it comes here. then the flag is
    // set to 'true' so it will know it's already scheduled for subsequent calls.
    if (!this.scheduled) {
      // if not scheduled, schedule one
      window.setTimeout(this.flushAsyncQueue.bind(this), 0);
      // mark that it is scheduled
      this.scheduled = true;
    }
  }

  // this happens in the next VM turn only, and empties the queue of events
  private flushAsyncQueue(): void {
    // we take a copy, because the event listener could be using
    // the grid, which would cause more events, which would be potentially
    // added to the queue, so safe to take a copy, the new events will
    // get executed in a later VM turn rather than risk updating the
    // queue as we are flushing it.
    const queueCopy = this.asyncFunctionsQueue.slice();
    this.asyncFunctionsQueue = [];

    // execute the queue
    queueCopy.forEach((func) => func());

    this.scheduled = false;
  }

  public addEventListener(
    eventType: string,
    listener: EventFunction<P>,
    async = false,
  ): void {
    this.getListeners(eventType, async, true)!.add(listener);
  }

  private getListeners(
    eventType: string,
    async: boolean,
    autoCreateListenerCollection: boolean,
  ): Set<EventFunction<P>> | undefined {
    const listenerMap = async ? this.allAsyncListeners : this.allSyncListeners;
    let listeners = listenerMap.get(eventType);

    // 注意：添加列表时，‘AutoCreateListerCollection’应为‘true’。
    if (!listeners && autoCreateListenerCollection) {
      listeners = new Set();
      listenerMap.set(eventType, listeners);
    }

    return listeners;
  }

  public removeEventListener(
    eventType: string,
    listener: EventFunction<P>,
    async = false,
  ): void {
    const listeners = this.getListeners(eventType, async, false);
    if (!listeners) {
      return;
    }

    listeners.delete(listener);

    if (listeners.size === 0) {
      const listenerMap = async
        ? this.allAsyncListeners
        : this.allSyncListeners;
      listenerMap.delete(eventType);
    }
  }

  private dispatchToListeners(event: P | string, async: boolean) {
    let eventType: string;
    if (typeof event === 'string') {
      eventType = event;
    } else {
      eventType = event.type;
    }
    const processEventListeners = (listeners: Set<EventFunction<P>>) =>
      listeners.forEach((listener) => {
        if (async) {
          this.emitAsync(() => listener(event));
        } else {
          listener(event);
        }
      });

    const listeners = this.getListeners(eventType, async, false);
    if (listeners) {
      processEventListeners(listeners);
    }

    const globalListeners = async
      ? this.globalAsyncListeners
      : this.globalSyncListeners;

    globalListeners.forEach((listener) => {
      if (async) {
        this.emitAsync(() =>
          this.frameworkOverrides.dispatchEvent(
            eventType,
            () => listener(event),
            true,
          ),
        );
      } else {
        this.frameworkOverrides.dispatchEvent(
          event,
          () => listener(event),
          true,
        );
      }
    });
  }

  public addGlobalListener(listener: EventFunction<P>, async = false): void {
    (async ? this.globalAsyncListeners : this.globalSyncListeners).add(
      listener,
    );
  }

  public removeGlobalListener(listener: EventFunction<P>, async = false): void {
    (async ? this.globalAsyncListeners : this.globalSyncListeners).delete(
      listener,
    );
  }

  public emit(event: P | string): void {
    this.dispatchToListeners(event, true);
    this.dispatchToListeners(event, false);
    this.firedEvents[typeof event === 'string' ? event : event.type] = true;
  }

  public once(event: P | string): void {
    if (!this.firedEvents[typeof event === 'string' ? event : event.type]) {
      this.emit(event);
    }
  }
}
