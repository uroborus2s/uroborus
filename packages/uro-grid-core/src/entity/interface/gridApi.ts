import { ColDef, ColGroupDef } from '@/entity/props/colunmProps';

export interface GridApi {
  /** Expand all groups. */
  expandAll(): void;

  /** Collapse all groups. */
  collapseAll(): void;

  /**
   * 调用以设置新的列定义。网格将重新绘制所有列标题，然后重新绘制所有行。
   */
  setColumnDefs(colDefs: (ColDef | ColGroupDef)[]): void;
}

export interface GridColumnApi {
  /** Returns `true` if pinning left, otherwise `false`. */
  isPinningLeft(): boolean;
}
