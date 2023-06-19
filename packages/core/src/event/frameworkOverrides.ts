import type { EventType, FunctionHandler } from './event.types.js';

export interface IFrameworkOverrides<P extends EventType> {
  /** 因为 Angular 使用 Zones，所以不应该使用 setTimeout 或 setInterval
   * 因为它会保持角度不断地做脏检查等所以要解决这个问题, 我们允许框架指定如何执行 setTimeout。默认是只调用浏览器 setTimeout().
   */
  setTimeout(action: FunctionHandler, timeout?: number): void;
  setInterval(action: FunctionHandler, interval?: number): Promise<number>;

  /** 同样因为 Angular 使用区域，我们允许在 Zone JS 之外添加一些事件，这样我们就不会启动 Angular 变化检测。
   * 我们只对某些事件执行此操作，而不是所有事件，仅针对经常触发的事件（例如鼠标移动），
   * 这是由 Niall 和 Sean 完成的。有问题的事件是 mouseover、mouseout、mouseenter 和 mouseleave。
   */
  addEventListener(
    element: HTMLElement,
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void;

  dispatchEvent(
    eventType: P | string,
    listener: FunctionHandler,
    global: boolean,
  ): void;
}

export class FrameworkOverrides<P extends EventType>
  implements IFrameworkOverrides<P>
{
  // for Vanilla JS, we use simple timeout
  public setTimeout(action: FunctionHandler, timeout?: number): void {
    window.setTimeout(() => action.call(this), timeout);
  }

  public setInterval(action: FunctionHandler, timeout?: any): Promise<number> {
    return new Promise((resolve) => {
      resolve(window.setInterval(() => action.call(this), timeout));
    });
  }

  // eslint-disable-next-line class-methods-use-this
  public addEventListener(
    element: HTMLElement,
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void {}

  // 对于 Vanilla JS，我们只执行监听器
  // eslint-disable-next-line class-methods-use-this
  public dispatchEvent(
    eventType: P | string,
    listener: FunctionHandler,
    global: boolean,
  ): void {}

  // static addSafePassiveEventListener<P extends EventType>(
  //   frameworkOverrides: IFrameworkOverrides<P>,
  //   eElement: HTMLElement,
  //   event: string,
  //   listener: EventListenerOrEventListenerObject,
  // ) {
  //   const isPassive = includes(PASSIVE_EVENTS, event);
  //   const options = isPassive ? { passive: true } : undefined;
  //
  //   // this check is here for certain scenarios where I believe the user must be destroying
  //   // the grid somehow but continuing for it to be used
  //   if (frameworkOverrides && frameworkOverrides.addEventListener) {
  //     frameworkOverrides.addEventListener(eElement, event, listener, options);
  //   }
  // }
}
