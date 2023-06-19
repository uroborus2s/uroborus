import type { Event, EventFunction, EventType } from './event.types.js';
import type { IFrameworkOverrides } from './frameworkOverrides.js';
import { FrameworkOverrides } from './frameworkOverrides.js';

export class EventService<P extends EventType> implements Event<P> {
  private readonly allSyncListeners: Map<string, Set<EventFunction<P>>>;

  private readonly allAsyncListeners: Map<string, Set<EventFunction<P>>>;

  private readonly globalSyncListeners: Set<EventFunction<P>>;

  private readonly globalAsyncListeners: Set<EventFunction<P>>;

  private asyncFunctionsQueue: (() => void)[];

  private scheduled = false;

  // 对于我们拥有的不同事件的数量，使用对象比 Set 表现更好
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

  // 这在线程内部被调用，对于它想要设置异步的每个事件。
  // 理想情况下，我们会将每个事件都放在它自己的 setTimeout() 中，但我们为了性能而进行批处理。
  private emitAsync(func: () => void): void {
    // 添加到队列中以便稍后在下一个 VM 回合中执行
    this.asyncFunctionsQueue.push(func);

    // 检查是否已安排超时。在的线程轮次中第一次调用它时，这应该是假的，所以它会在第一次到达这里时安排“刷新队列”方法。
    // 然后标志设置为“true”，这样它就会知道它已经安排好进行后续调用。
    if (!this.scheduled) {
      // 如果没有安排，安排一个
      window.setTimeout(this.flushAsyncQueue.bind(this), 0);
      // 标记它已安排
      this.scheduled = true;
    }
  }

  // 这只发生在下一个 VM 回合，并清空事件队列
  private flushAsyncQueue(): void {
    // 这会导致更多的事件，这些事件可能会被添加到队列中，
    // 如此安全地获取副本，新事件将在稍后的 VM 轮次中执行，而不是在我们刷新队列时冒着更新队列的风险。
    const queueCopy = this.asyncFunctionsQueue.slice();
    this.asyncFunctionsQueue = [];

    // 执行队列
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
