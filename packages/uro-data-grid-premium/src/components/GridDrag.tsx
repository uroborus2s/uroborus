import { DragItem } from '../entity/core/drag/drag';

export interface RowDragItem extends DragItem {
  /** The default text that would be applied to this Drag Element */
  defaultTextValue: string;
}
