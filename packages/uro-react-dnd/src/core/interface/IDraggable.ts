import type { Position, BoxModel } from 'css-box-model';

import type { TypeId } from './GlobalType.js';
import type { DroppableId } from './IDroppable.js';
import type { Descriptor, Entry, IEntity } from './IEntry.js';
import type { Placeholder } from './IPlaceholder.js';
import type { Subscriber, Unsubscribe } from './IRegistry.js';

export type DraggableId = string;

export type DraggableIdMap = Record<DraggableId, boolean>;

export interface DraggableLocation {
  droppableId: DroppableId;
  index: number;
}

export interface DraggableRubric {
  draggableId: DraggableId;
  type: TypeId;
  source: DraggableLocation;
}

export interface DraggableDescriptor extends Descriptor<DraggableId> {
  index: number;
  // 拖放到到 Droppable
  droppableId: DroppableId;
}

export interface DraggableOptions {
  canDragInteractiveElements: boolean;
  shouldRespectForcePress: boolean;
  isEnabled: boolean;
}

export interface DraggableDimension {
  descriptor: DraggableDescriptor;
  // the placeholder for the draggable
  placeholder: Placeholder;
  // relative to the viewport when the drag started
  client: BoxModel;
  // relative to the whole page
  page: BoxModel;
  // how much displacement the draggable causes
  // this is the size of the marginBox
  displaceBy: Position;
}

export type GetDraggableDimensionFn = (
  windowScroll: Position,
) => DraggableDimension;

export interface DraggableEntry
  extends Entry<DraggableId, DraggableDescriptor> {
  options: DraggableOptions;
  getDimension: GetDraggableDimensionFn;
}

export interface IDraggable
  extends IEntity<DraggableId, DraggableDescriptor, DraggableEntry> {
  subscribe: (cb: Subscriber) => Unsubscribe;
}

export type DraggableEntryMap = Record<DraggableId, DraggableEntry>;

export type DraggableDimensionMap = Record<DraggableId, DraggableDimension>;
