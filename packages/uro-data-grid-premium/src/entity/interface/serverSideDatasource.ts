import { SortModelItem } from '@/hooks/useSortController';
import { RowNode } from '../rowNode';
import { LoadSuccessParams } from './rowNodeBlock';

export interface ColumnVO {
  id: string;
  displayName: string;
  field?: string;
  aggFunc?: string;
}

export interface ServerSideGetRowsRequest {
  /** 为所有行请求或未定义第一行。 */
  startRow: number | undefined;
  /** 为所有行请求或未定义的最后一行。 */
  endRow: number | undefined;
  /** 当前按行分组的列。 */
  rowGroupCols: ColumnVO[];
  /** 具有聚合的列。 */
  valueCols: ColumnVO[];
  /** 其上有枢轴的列。 */
  pivotCols: ColumnVO[];
  /** 定义轴心点模式是启用还是禁用。 */
  pivotMode: boolean;
  /** 用户正在查看的组。 */
  groupKeys: string[];
  /** 如果进行过滤，则过滤器的型号是什么。 */
  filterModel: any;
  /** 如果是排序，则排序模型是什么。 */
  sortModel: SortModelItem[];
}

export interface ServerSideGetRowsParams {
  /**
   * 请求的详细信息。可以转换为JSON的简单对象。
   */
  request: ServerSideGetRowsRequest;

  /**
   * The parent row node. The RootNode (level -1) if request is top level.
   * This is NOT part fo the request as it cannot be serialised to JSON (a rowNode has methods).
   */
  parentNode: RowNode;

  /**
   * @deprecated Use `success` method instead and return result as a `LoadSuccessParams` object.
   */
  successCallback(rowsThisPage: any[], lastRow: number): void;
  /**
   * Success callback, pass the rows back to the grid that were requested.
   */
  success(params: LoadSuccessParams): void;
  /**
   * 失败回调，告诉网格调用失败，这样它就可以调整它的状态。
   */
  fail(): void;
}

// datasource for Server Side Row Model
export interface ServerSideDatasource {
  /**
   * Grid calls `getRows` when it requires more rows as specified in the params.
   * Params object contains callbacks for responding to the request.
   */
  getRows(params: ServerSideGetRowsParams): void;
  /** Optional method, if your datasource has state it needs to clean up. */
  destroy?(): void;
}
