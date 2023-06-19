import type { DroppableId } from './interface/IDroppable.js';
import { Unsubscribe } from './interface/IRegistry.js';

export class DimensionMarshal {
  constructor() {}

  updateDroppableIsEnabled(id: DroppableId, isEnabled: boolean) {}

  startPublishing() {}
}
