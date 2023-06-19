import { Column } from '@/entity/column';
import { ColumnGroup } from '@/entity/columnGroup';

export interface HeaderPosition {
  /** A number from 0 to n, where n is the last header row the grid is rendering */
  headerRowIndex: number;
  /** The grid column or column group */
  column: Column | ColumnGroup;
}
