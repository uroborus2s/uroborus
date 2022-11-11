import { GridApi } from '@/entity/interface/gridApi';
import { ColumnApi } from '@/entity/interface/columnApi';

export interface GridCommon {
  /** The grid api. */
  api: GridApi;
  /** The column api. */
  columnApi: ColumnApi;
}
