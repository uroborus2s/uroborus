interface EventChannel {
  on: (subscriber: string, callback: Callback<any>) => void;
  off: (subscriber: string, callback: Callback<any>) => void;
  emit: (subscriber: string, data: any) => Promise<any>;
}

type Callback<T> = (data?: T) => Promise<any>;

export class EventChannelImpl implements EventChannel {
  private subjects: Map<string, Array<Callback<any>>>;

  constructor() {
    this.subjects = new Map();
  }

  // 实现添加订阅事件
  public on(subscriber: string, callback: Callback<any>): void {
    console.log(`收到订阅信息，订阅事件：${subscriber}`);
    const events = this.subjects.get(subscriber);
    if (!events) {
      this.subjects.set(subscriber, [].push(callback));
    } else events.push(callback);
  }

  // 实现取消订阅事件
  public off(subscriber: string, callback: Callback<any>): void {
    console.log(`收到取消订阅请求，需要取消的订阅事件：${subscriber}`);
    if (!callback) {
      this.subjects.delete(subscriber);
    } else {
      const events = this.subjects.get(subscriber);
      if (events) {
        const index = events.indexOf(callback);
        index !== -1 && events.splice(index, 1);
      }
    }
  }

  // 实现发布订阅事件
  public emit(subscriber: string, data?: any): Promise<any> {
    console.log(`收到发布者信息，执行订阅事件：${subscriber}`);
    const events = this.subjects.get(subscriber);
    if (events)
      try {
        return Promise.all(events.map((event) => event(data)));
      } catch (err) {
        return Promise.reject(err);
      }
    return Promise.resolve([]);
  }
}

export const eventBus = new ConcreteEventChannel();
export const initByReadWorkspaceList = 'workspace_list';
