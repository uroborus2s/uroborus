import { ColDef, ColGroupDef } from '../porps/gridColumnProps.js';
import { GridValidRowModel } from '../porps/gridRowProps.js';

import { GetLocaleTextParams } from './callBackParams.js';

export type DomLayoutType = 'normal' | 'autoHeight' | 'print';

export interface GridOptions<
  TData extends GridValidRowModel = GridValidRowModel,
> {
  /** ******************************************************* */
  /** ********* Column Definitions(列属性定义) *************** */
  /** ***************************************************** */
  columnDefs?: Array<ColDef<TData> | ColGroupDef<TData>>;

  /** ***************************************************** */
  /** ********* Localisation(本地化提示) ******************* */
  /** *************************************************** */
  // just set once
  /** 用于Grid内本地化文本的键->值对映射。 */
  localeText?: { [key: string]: string };
  /** 用于在Grid内获取本地化文本的回调。 */
  getLocaleText?: (params: GetLocaleTextParams<TData>) => string;

  /** 设置为“true”以在 RTL（从右到左）模式下操作网格。默认值：`false` */
  enableRtl?: boolean;

  /**
   * 在布局选项之间切换：`normal`、`autoHeight`、`print`。
   * Default: `normal`
   */
  domLayout?: DomLayoutType;

  /** ***************************************************** */
  /** ********* Miscellaneous(其他配置) ******************* */
  /** *************************************************** */
  /** 允许覆盖使用的“文档”。当前由拖放使用（将来可能扩展到其他地方）。 当您希望网格使用与全局范围内可用的文档不同的“文档”时，请使用此选项。如果停靠组件（Electron 支持的东西），就会发生这种情况 */
  getDocument?: () => Document;
}
