import type { DraggableDescriptor, DraggableEntry } from './IDraggable.js';
import type { DroppableDescriptor, DroppableEntry } from './IDroppable.js';

export interface RegistryEvent {
  type: 'ADDITION' | 'REMOVAL';
  value: DraggableEntry;
}

export type Subscriber = (event: RegistryEvent) => void;
export type Unsubscribe = () => void;

export interface Critical {
  draggable: DraggableDescriptor;
  droppable: DroppableDescriptor;
}

export interface Collection {
  critical: Critical;
  unsubscribe: Unsubscribe;
}
