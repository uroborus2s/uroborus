import { ColDef } from '@/entity/props/colunmProps';
import { Column } from './column';
import { RowNode } from './rowNode';

export interface AggFuncParams {
  /** 要聚合的值 */
  values: any[];
  /** 聚合函数正在处理的列 */
  column: Column;
  /** 聚合列的ColDef */
  colDef: ColDef;
  /** 父级RowNode，其中将显示聚合结果 */
  rowNode: RowNode;
  /** 父行节点的数据(如果有) */
  data: any;
}

export interface AggFunc {
  (params: AggFuncParams): any;
}
