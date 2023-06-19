import { DraggableId } from '../../core/index.js';

export interface DragProps {
  draggableId: DraggableId;
  index: number;

  // optional own props
  isDragDisabled?: boolean;
  disableInteractiveElementBlocking?: boolean;
  shouldRespectForcePress?: boolean;
}
