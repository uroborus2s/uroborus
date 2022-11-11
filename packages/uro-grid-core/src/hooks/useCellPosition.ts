// this is what gets pass into and out of the api, as JavaScript users
import { Column } from '@/entity/column';
import { RowPosition } from './useRowPosition';

export interface CellPosition extends RowPosition {
  /** The grid column */
  column: Column;
}
