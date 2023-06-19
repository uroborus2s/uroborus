import { AsapQueue } from './AsapQueue.js';
import { TaskFactory } from './TaskFactory.js';
import type { TaskFn } from './types.js';

const asapQueue = new AsapQueue();
const taskFactory = new TaskFactory(asapQueue.registerPendingError);

/**
 * 返回后尽快调用任务，在它自己的事件中，优先于其他事件，如动画、回流和重绘。
 * 事件抛出的错误不会中断，甚至不会显着减慢其他事件的处理速度，而是会推迟到优先级较低的事件。
 * @param {{call}} task A callable object, 通常是一个不带参数的函数。
 */
export function asap(task: TaskFn) {
  asapQueue.enqueueTask(taskFactory.create(task));
}
