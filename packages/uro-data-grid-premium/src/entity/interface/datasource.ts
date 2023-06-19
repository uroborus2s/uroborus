import { SortModelItem } from '@/hooks/useSortController';

export interface Datasource {
  /** 如果预先知道数据集中有多少行，请在此处设置。否则，将其留空。 */
  rowCount?: number;

  /** 回调您为从服务器获取行而实现的网格调用。 */
  getRows(params: GetRowsParams): void;

  /** 可选的销毁方法，如果您的数据源有需要清理的状态。 */
  destroy?(): void;
}

/** Params for the above IDatasource.getRows() */
export interface GetRowsParams {
  /** 要获取的第一行索引。 */
  startRow: number;

  /** 不获取的第一行索引。 */
  endRow: number;

  /** 成功时调用结果的回调。 */
  successCallback(rowsThisBlock: any[], lastRow?: number): void;

  /** 请求失败时调用的回调。 */
  failCallback(): void;

  /** 如果执行服务器端排序，则包含排序模型 */
  sortModel: SortModelItem[];

  /** 如果执行服务器端筛选，则包含筛选器模型 */
  filterModel: any;

  /** `gridOptions.context`上提供的上下文 */
  context: any;
}
