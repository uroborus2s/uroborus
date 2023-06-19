import type {
  Direction,
  DroppableId,
  DroppableMode,
  TypeId,
  DraggableRubric,
  DroppableDescriptor,
} from '../../core/index.js';

export interface DefaultProps {
  mode?: DroppableMode;
  type?: TypeId;
  direction?: Direction;
  droppableId: DroppableId;
}

export interface Env {
  closestScrollable: Element;
  isFixedOnPage: boolean;
}

export interface WhileDragging {
  ref: HTMLElement;
  descriptor: DroppableDescriptor;
  env: Env;
  scrollOptions: ScrollOptions;
}

export interface DroppableProps extends DefaultProps {
  isDropDisabled?: boolean;
  isCombineEnabled?: boolean;
  ignoreContainerClipping?: boolean;
  getContainerForClone?: () => HTMLElement;
}

export interface DropContextProps extends DefaultProps {
  useClone: { dragging: DraggableRubric };
}

export interface PublisherProps extends DefaultProps {
  isDropDisabled: boolean;
  isCombineEnabled: boolean;
  ignoreContainerClipping: boolean;
  getDroppableRef?: () => HTMLElement;
}
