import { FilterProps } from './filterProps.js';

export interface AbstractColDef<TData = any> {}

export interface ColDef<TData = any>
  extends AbstractColDef<TData>,
    FilterProps {
  /** 为列提供的唯一 ID。这是可选的。如果缺少，ID 将默认为该字段。
   *  如果 field 和 colId 都缺失，将生成一个唯一的 ID。
   *  此 ID 用于标识 API 中的列以进行排序、过滤等。 */
  colId?: string;
  /**
   * 要从中获取单元格数据的行对象的字段。要从中获取单元格数据的行对象的字段。
   * 通过点符号支持对行对象的深度引用，即“address.firstLine”。
   */
  field?: string;
}

export interface ColGroupDef<TData = any> {}
