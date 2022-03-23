import { Bean } from '@/core/context/annotation';
import { IEvent } from '@/core/event/interface/IEvent';

@Bean('eventService')
export class EventService implements IEvent {
  private allSyncListeners = new Map<string, Set<Function>>();
  private allAsyncListeners = new Map<string, Set<Function>>();

  private globalSyncListeners = new Set<Function>();
  private globalAsyncListeners = new Set<Function>();

  private asyncFunctionsQueue: Function[] = [];
  private scheduled = false;

  // 对于我们拥有的不同事件的数量，使用一个对象比使用一个集合执行得更好
  private firedEvents: { [key: string]: boolean } = {};
}
