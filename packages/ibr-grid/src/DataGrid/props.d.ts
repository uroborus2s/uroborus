import { CommonProps } from '@uroborus/styled';
import { GridLocaleText } from '../types/localTextApi';
import { GridSlotsComponent } from '../types/component/slots';

/**
 * 具备默认缺省值的DataGrid组件参数，可通过'props'进行值覆盖
 */
export interface GridPropsWithDefaultValue {
  /**
   *如果为`true`，根据Grid中的行数自动调整行高度。
   * @default false
   */
  autoHeight: boolean;
  /**
   *如果为`true`，则根据页面高度和最大行数计算页面大小，以避免呈现垂直滚动条。
   * @default false
   */
  autoPageSize: boolean;
}

export interface GridPropsWithoutDefaultValue extends CommonProps {
  signature?: string;
}

export interface GridPropsWithDefaultValueOfPlugin {
  components: GridSlotsComponent;
  localeText: GridLocaleText;
}

/**
 *  `DataGrid` 组件的props参数
 */
export type GridProps = Omit<
  Partial<GridPropsWithDefaultValue> &
    GridPropsWithoutDefaultValue &
    GridPropsWithDefaultValueOfPlugin,
  GridForcedPropsKey
> & { pagination?: true };

export type GridForcedPropsKey = 'apiRef' | 'checkboxSelectionVisibleOnly';
