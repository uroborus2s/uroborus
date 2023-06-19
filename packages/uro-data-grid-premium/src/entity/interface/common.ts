import { GridApi } from '@/entity/types/gridApi';
import { ColumnApi } from '@/entity/types/columnApi';

export interface GridCommon {
  /** The grid api. */
  api: GridApi;
  /** The column api. */
  columnApi: ColumnApi;
}
