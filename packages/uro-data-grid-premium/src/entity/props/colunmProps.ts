import { ReactElement } from 'react';
import { Column } from '@/entity/column';
import { ColumnGroup } from '@/entity/columnGroup';
import { ProvidedColumnGroup } from '@/entity/providedColumnGroup';
import { RowNode } from '@/entity/rowNode';
import { TooltipPorps } from '@/components/GridTooltip';
import { CellEditorProps } from '@/components/GridCellEditor';
import { GridCellProps } from '@/components/GridCell';
import { RowDragItem } from '@/components/GridDrag';
import { EventType } from '@uroborus/core';

export interface SuppressHeaderKeyboardEventParams {
  column: Column | ColumnGroup;
  colDef: ColDef | ColGroupDef | null;
  /** The index of the header row of the current focused header */
  headerRowIndex: number;
  /** The keyboard event the grid received */
  event: KeyboardEvent;
}

export interface HeaderValueGetterParams {
  colDef: AbstractColDef;
  /** 用于回调函数的列信息 */
  column?: Column | null;
  /** 用于回调函数的列组信息 */
  columnGroup?: ColumnGroup | ProvidedColumnGroup | null;
  /** 原始列组 */
  providedColumnGroup: ProvidedColumnGroup | null;
  /** 该列的位置 */
  location: string | null;
}

export interface HeaderValueGetterFunc {
  (params: HeaderValueGetterParams): string;
}

export interface ValueFormatterParams<TData = any, TValue = any>
  extends BaseColDefOptionalDataParams<TData> {
  /** Value for the cell. */
  value: TValue;
}

export interface KeyCreatorParams<TData = any, TValue = any>
  extends BaseColDefParams<TData> {
  /** Value for the cell. */
  value: TValue;
}

export interface ValueFormatterFunc<TData = any> {
  (params: ValueFormatterParams<TData>): string;
}

export interface BaseColDefParams<TData = any> {
  /** Row node for the given row */
  node: RowNode | null;
  /** Data associated with the node */
  data: TData;
  /** Column for this callback */
  column: Column;
  /** ColDef provided for this column */
  colDef: ColDef;
}

export interface BaseColDefOptionalDataParams<TData = any> {
  /** 给定行的行节点 */
  node: RowNode | null;
  /** 与该节点关联的数据 */
  data: TData | undefined;
  /** Column for this callback */
  column: Column;
  /** ColDef provided for this column */
  colDef: ColDef;
}

export interface ColumnFunctionCallbackParams<TData = any> {
  /** Row node for the given row */
  node: RowNode;
  /** Data associated with the node. Will be `undefined` for group rows. */
  data: TData | undefined;
  /** Column for this callback */
  column: Column;
  /** ColDef provided for this column */
  colDef: ColDef;
}

export interface ValueGetterParams<TData = any>
  extends BaseColDefOptionalDataParams<TData> {
  /** A utility method for getting other column values */
  getValue: (field: string) => any;
}

export type ColSpanParams = BaseColDefOptionalDataParams;

export type RowSpanParams = BaseColDefOptionalDataParams;

export interface ValueGetterFunc<TData = any> {
  (params: ValueGetterParams<TData>): any;
}

export type CheckboxSelectionCallbackParams<TData = any> =
  ColumnFunctionCallbackParams<TData>;

export interface CheckboxSelectionCallback<TData = any> {
  (params: CheckboxSelectionCallbackParams<TData>): boolean;
}

export type SuppressNavigableCallbackParams<TData = any> =
  ColumnFunctionCallbackParams<TData>;
export interface SuppressNavigableCallback<TData = any> {
  (params: SuppressNavigableCallbackParams<TData>): boolean;
}

export type SuppressPasteCallbackParams<TData = any> =
  ColumnFunctionCallbackParams<TData>;
export interface SuppressPasteCallback<TData = any> {
  (params: SuppressPasteCallbackParams<TData>): boolean;
}

export type EditableCallbackParams<TData = any> =
  ColumnFunctionCallbackParams<TData>;
export interface EditableCallback<TData = any> {
  (params: EditableCallbackParams<TData>): boolean;
}

export type RowDragCallbackParams = ColumnFunctionCallbackParams;
export interface RowDragCallback {
  (params: RowDragCallbackParams): boolean;
}

export interface DndSourceOnRowDragParams {
  /** Row node for the given row */
  rowNode: RowNode;
  /** The DOM event that represents a drag and drop interaction */
  dragEvent: DragEvent;
}

export type DndSourceCallbackParams = ColumnFunctionCallbackParams;

export interface DndSourceCallback {
  (params: DndSourceCallbackParams): boolean;
}

export interface HeaderCheckboxSelectionCallbackParams {
  column: Column;
  colDef: ColDef;
}
export interface HeaderCheckboxSelectionCallback {
  (params: HeaderCheckboxSelectionCallbackParams): boolean;
}

export interface NewValueParams<TData = any> extends BaseColDefParams<TData> {
  /** The value before the change */
  oldValue: any;
  /** The value after the change */
  newValue: any;
}

export type ValueSetterParams<TData = any> = NewValueParams<TData>;
export interface ValueSetterFunc<TData = any> {
  (params: ValueSetterParams<TData>): boolean;
}

export type ValueParserParams<TData = any> = NewValueParams<TData>;
export interface ValueParserFunc<TData = any, TValue = any> {
  (params: ValueParserParams<TData>): TValue;
}

export interface CellEditorSelectorResult {
  /** Equivalent of setting `colDef.cellEditor` */
  component?: any;
  /** Equivalent of setting `colDef.cellEditorParams` */
  params?: any;
  /** Equivalent of setting `colDef.cellEditorPopup` */
  popup?: boolean;
  /** Equivalent of setting `colDef.cellEditorPopupPosition` */
  popupPosition?: string;
}
export interface CellRendererSelectorResult {
  /** Equivalent of setting `colDef.cellRenderer` */
  component?: any;
  /** Equivalent of setting `colDef.cellRendererParams` */
  params?: any;
}

export interface CellRendererSelectorFunc {
  (params: GridCellProps): CellRendererSelectorResult | undefined;
}
export interface CellEditorSelectorFunc<TData = any> {
  (params: CellEditorProps): CellEditorSelectorResult | undefined;
}

export interface AggFunc {
  (params: AggFuncParams): any;
}

export interface AggFuncParams {
  /** Values to aggregate */
  values: any[];
  /** Column the aggregation function is working on */
  column: Column;
  /** ColDef of the aggregation column */
  colDef: ColDef;
  /** The parent RowNode, where the aggregation result will be shown */
  rowNode: RowNode;
  /** data (if any) of the parent RowNode */
  data: any;
}

export interface SuppressKeyboardEventParams<TData = any>
  extends ColumnFunctionCallbackParams<TData> {
  /** The keyboard event the grid received */
  event: KeyboardEvent;
  /** Whether the cell is editing or not */
  editing: boolean;
}

export interface GetQuickFilterTextParams {
  /** Value for the cell. */
  value: any;
  /** Row node for the given row */
  node: RowNode;
  /** Row data associated with the node. */
  data: any;
  /** Column for this callback */
  column: Column;
  /** ColDef provided for this column */
  colDef: ColDef;
}

export interface ColumnsMenuParams {
  /** 禁止在Grid中重新排列列时更新它们的布局 */
  suppressSyncLayoutWithGrid?: boolean;
  /** 隐藏列过滤器部分的步骤 */
  suppressColumnFilter?: boolean;
  /** 支持 Select / Un-select 所有的小部件 */
  suppressColumnSelectAll?: boolean;
  /** 支持 Expand / Collapse 所有的小部件 */
  suppressColumnExpandAll?: boolean;
  /** 默认情况下，列组开始展开。
   * 将TRUE到DEFAULT传递给契约组 */
  contractColumnSelection?: boolean;
}

export interface AbstractColDef {
  /** 要在列标题中呈现的名称。如果headerName为定义 而定义了field，则将使用field作为标头名称。 */
  headerName?: string;

  /** 函数或者表达式。 获取要在标题中显示的值。 */
  headerValueGetter?: string | HeaderValueGetterFunc;

  /** 列标题的提示信息 */
  headerTooltip?: string;

  /** 当标题被聚焦时，是否禁止Grid对相关键盘事件采取操作。 */
  suppressHeaderKeyboardEvent?: (
    params: SuppressHeaderKeyboardEventParams,
  ) => boolean;

  /** 组打开/关闭时是否显示该列。 */
  columnGroupShow?: string;

  /** 如果不希望此列或组显示在列工具面板中，请设置为`true`。默认值：`False` */
  suppressColumnsToolPanel?: boolean;

  /** 如果不希望此列(筛选器)或组(筛选器组)出现在筛选器工具面板中，请设置为`true`。默认值：`False` */
  suppressFiltersToolPanel?: boolean;

  /**
   * 为该列提供您自己的工具提示组件。
   */
  tooltipComponent?: ReactElement;

  /** 配置`TooltipComponent`时使用的参数。 */
  tooltipComponentParams?: TooltipPorps;
}

export interface ColGroupDef {
  children: (ColDef | ColGroupDef)[];

  /** 要为列提供的唯一ID。这是可选的。如果缺少，则将生成唯一ID。此ID用于标识列API中的列组。 */
  groupId?: string;
  /** 如果默认打开此组，则设置为`true`。默认值：`False` */
  openByDefault?: boolean;
  /** 设置为`true`可使此组中的列在网格中彼此并排。不允许将列移动到组外(从而破坏组)。默认值：`False` */
  marryChildren?: boolean;
  /**
   * 用于呈现组件标头的自定义标头组组件。如果未指定，则使用默认的AG网格。
   */
  headerGroupComponent?: ReactElement;

  /** 配置 `headerGroupComponent`组件的参数。 */
  headerGroupComponentParams?: any;
}

/** ROW EVENTS */
/**------------*/
interface BaseRowEvent extends EventType {
  /** The row node. */
  node: RowNode;
  /** The visible row index for the row */
  rowIndex: number | null;
  /** Either 'top', 'bottom' or null / undefined (if not set) */
  rowPinned: string | null;
  /** The context as provided on `gridOptions.context` */
  context: any;
  /** If event was due to browser event (eg click), this is the browser event */
  event?: Event | null;
}

export interface RowEvent extends BaseRowEvent {
  /** The user provided data for the row. Data is `undefined` for row groups. */
  data: any;
}

/** CELL EVENTS */
/**------------*/
export interface CellEvent extends RowEvent {
  column: Column;
  colDef: ColDef;
  /** The value for the cell if available otherwise undefined. */
  value: any;
}

export type CellClickedEvent = CellEvent;

export type CellDoubleClickedEvent = CellEvent;

export type CellContextMenuEvent = CellEvent;

export interface ColDef extends AbstractColDef {
  /** 列唯一ID，可选值。如果缺少，默认为fileid。
   * 如果同时缺少field和colId，则会生成唯一的ID。
   *  This ID is used to identify the column in the API for sorting, filtering etc. */
  colId?: string;

  /**
   * 单元格数据的行唯一标识
   * 支持通过点符号对行对象的深度引用
   */
  field?: string;

  /**
   * 逗号分隔的字符串或者字符串数组，包含可用作列模板的`ColumnType`键。
   * 当您有许多公共列属性时，这有助于减少属性的重复。
   */
  type?: string | string[];

  /** 函数或者表达式. 从数据中获取要显示的值。 */
  valueGetter?: string | ValueGetterFunc;

  /** 格式化数据的函数或者表达式, 应返回一个字符串。不用于CSV导出或复制到剪贴板，仅用于UI单元格渲染。 */
  valueFormatter?: string | ValueFormatterFunc;

  /** 提供了一个参考数据映射，用于将列值映射到映射中的相应值。 */
  refData?: { [key: string]: string };
  /**
   * 用于生成字符串关键字key的函数
   * 此字符串用于在单元格编辑器下拉菜单中进行分组、集合筛选和搜索。
   * 当过滤和搜索字符串时，字符串会向用户公开，因此请确保返回字符串是可读的值。 */
  keyCreator?: (params: KeyCreatorParams) => string;

  /**
   * 自定义值比较函数, 由渲染器使用，以了解值是否已更改。值未更改的单元格不会被刷新。
   * 默认使用`===`，适用于大多数用例
   */
  equals?: (valueA: any, valueB: any) => boolean;

  /** 应用于单元格的提示的字段。 */
  tooltipField?: string;

  /**
   * 返回用于提示的字符串的回调，tooltipField优先级更高。
   * 如果使用定制的`TooltipComponent`，则返回任何要传递给自定义Tooltip组件的自定义值。
   */
  tooltipValueGetter?: (params: TooltipPorps) => string | any;

  /** `boolean` 或者 `Function`类型. 设置为`true`(或从函数返回`true`)可在列中呈现选择复选框。默认值：`False` */
  checkboxSelection?: boolean | CheckboxSelectionCallback;
  /** 要在列中使用的图标，而不是网格的默认图标。undefined 则使用默认设置。 */
  icons?: {
    [key: string]: ReactElement | string | undefined;
  };

  /**
   * 如果此列不可导航(即无法使用Tab键进入)，则设置为`true`，否则设置为`False`。
   * 也可以是回调函数，以便判断不同的行是否可以导航。
   * Default: `false`
   */
  suppressNavigable?: boolean | SuppressNavigableCallback;

  /** 允许用户取消网格单元格中的某些键盘事件。默认值：`False` */
  suppressKeyboardEvent?: (params: SuppressKeyboardEventParams) => boolean;

  /**
   * 默认情况下，只要单元格是可编辑的，粘贴就处于打开状态(即使使用粘贴操作，也不能修改不可编辑的单元格).
   * 设置为`true‘关闭粘贴操作。
   */
  suppressPaste?: boolean | SuppressPasteCallback;
  /** 设置为TRUE可防止在属于该列的任何单元格中呈现填充句柄 */
  suppressFillHandle?: boolean;

  // *** Columns: Display *** //
  /** 若要隐藏此列，请设置为`true`。默认值：`False` */
  hide?: boolean;
  // /** Same as `hide`, except only applied when creating a new column. Not applied when updating column definitions. */
  // initialHide?: boolean;
  /** 如果设置为`true`，则会阻止通过UI显示/隐藏列(API仍然有效)。默认值：`False` */
  lockVisible?: boolean;
  /** 将要定位的列锁定到‘’向左‘’或‘’向右‘’可始终将该列显示在该位置。True被视为‘’Left‘’ */
  lockPosition?: boolean | 'left' | 'right';
  /** 如果不希望通过拖动移动此列，请设置为`true`。默认值：`False` */
  suppressMovable?: boolean;

  // *** Columns: Editing *** //
  /** 如果此列可编辑，则设置为`true`，否则设置为`False`。也可以是使不同的行可编辑的函数。默认值：`False` */
  editable?: boolean | EditableCallback;
  /** 函数或者表达式。将值设置到您的数据中以供保存。如果数据更改，则返回`true`. */
  valueSetter?: string | ValueSetterFunc;
  /** 函数或者表达式。 分析要保存的值。 */
  valueParser?: string | ValueParserFunc;

  /**
   * 自定义单元格编辑器组件适用于该列。
   */
  cellEditor?: JSX.Element;
  /** 回调以选择要对同一列中的给定行使用哪个单元格编辑器。 */
  cellEditorSelector?: CellEditorSelectorFunc;

  /** 设置为`true`可使此列下的单元格在单击后进入编辑模式。默认值：`False` */
  singleClickEdit?: boolean;

  /**
   * 设置为`true`，以使单元格编辑器出现在弹出窗口中。
   */
  cellEditorPopup?: boolean;

  /**
   * 设置弹出单元格编辑器的位置。值
   *  - `over` 弹出窗口将位于单元格上方。
   *  - `under` 弹出窗口将位于单元格下方，使单元格值可见。
   *
   * Default: `over`. */
  cellEditorPopupPosition?: string;

  // *** Columns: Events *** //

  /** 单元格的值因编辑或应用程序调用`api.setValue()`而更改后的回调。 */
  onCellValueChanged?: (event: NewValueParams) => void;
  /** 单击单元格时调用的回调。 */
  onCellClicked?: (event: CellClickedEvent) => void;
  /** 双击单元格时调用的回调。 */
  onCellDoubleClicked?: (event: CellDoubleClickedEvent) => void;
  /** 右键单击单元格时调用的回调。 */
  onCellContextMenu?: (event: CellContextMenuEvent) => void;

  /** 一个函数，用于告诉Grid，如果您不想使用缺省值(对值调用`toString`)，则对该列使用哪个快速过滤器文本。 */
  getQuickFilterText?: (params: GetQuickFilterTextParams) => string;
  /** 函数或表达式。获取用于筛选的值。 */
  filterValueGetter?: string | ValueGetterFunc;
  /** 是否显示此列的浮动筛选器。默认值：`False` */
  floatingFilter?: boolean;
  /** 如果启用，则对于列宽度而言过长的列标题名称将换行到下一行。默认`False` */
  wrapHeaderText?: boolean;
  /** 如果启用，则列标题行将自动调整高度以调整标题单元格的大小。
   * 当自定义`headerComponent`或长标头名称与`wrapHeaderText`配合使用时，这会很有用。
   * Default: `false`
   */
  autoHeaderHeight?: boolean;
  /**
   * 自定义页眉组件。如果未指定，则使用默认的页眉组件。
   */
  headerComponent?: JSX.Element;
  /** 自定义`headerComponent`的props */
  headerComponentParams?: any;

  /**
   * 设置为包含零个、一个或多个以下选项的数组: `'filterMenuTab' | 'generalMenuTab' | 'columnsMenuTab'`.
   * 菜单选项卡，以及这些选项卡的显示顺序。
   */
  menuTabs?: string[];
  /** 用于更改列菜单选项卡的行为和外观的参数。 */
  columnsMenuParams?: ColumnsMenuParams;
  /** 如果此列标题不应显示菜单，则设置为`true`。默认值：`False` */
  suppressMenu?: boolean;
  /** 如果`true`或 回调函数返回`true`，则Header中会打上‘全选’的复选框  */
  headerCheckboxSelection?: boolean | HeaderCheckboxSelectionCallback;
  /** If `true`, the header checkbox selection will only select filtered items. */
  headerCheckboxSelectionFilteredOnly?: boolean;

  // *** Columns: Integrated Charts *** //

  /** 定义应用于列的图表数据类型。 */
  chartDataType?: 'category' | 'series' | 'time' | 'excluded';

  // *** Columns: Pinned *** //

  /** 将列固定在一侧：`right`或`left`。将`true`值转换为`‘Left’`。 */
  pinned?: boolean | 'left' | 'right' | null;
  /** 与`pinned`相同，不同之处在于仅在新建列时应用。在更新列定义时不适用。 */
  initialPinned?: boolean | 'left' | 'right';
  /** 设置为TRUE以阻止用户固定列，该列只能通过定义或API固定。默认值：`False`  */
  lockPinned?: boolean;

  // *** Columns: Pivoting *** //

  /** 设置为TRUE将按此列透视。 */
  pivot?: boolean;
  /** 与`Pivot`相同，不同之处在于仅在新建列时应用。在更新列定义时不适用。 */
  initialPivot?: boolean;
  /**
   * 在要作为透视依据的列中设置此选项。
   * 如果仅按一列旋转，则将其设置为任意数字(例如 `0`).
   * 如果按多列旋转，请将其设置为您希望该列按旋转顺序排列的位置(例如，第一列为`0`，第二列为`1`，依此类推)。
   */
  pivotIndex?: number | null;
  /** 与`PivotIndex`相同，不同之处在于仅在新建列时应用。在更新列定义时不适用。 */
  initialPivotIndex?: number;
  /**
   * 在对透视表列进行排序时使用的比较器，当此列用于透视时。
   * 这些值将始终是字符串，因为透视服务将字符串用作透视组的键。
   */
  pivotComparator?: (valueA: string, valueB: string) => number;
  /** 如果希望能够通过图形用户界面按该列进行透视，请设置为`true`。这不会阻止用于实现透视的API或属性。默认：`False` */
  enablePivot?: boolean;

  /** 设置为`true`根据内容自动计算行的高度。默认值：`False` */
  autoHeight?: boolean;
  /** 设置为`true`可使文本在单元格内换行-通常与`AutoHeight`一起使用。默认值：`False` */
  wrapText?: boolean;
  /** 设置为`true‘可在更改单元格时刷新单元格。默认值：`False` */
  enableCellChangeFlash?: boolean;
  /** 设置为`true`以防止此列在更改时闪烁。仅当栅格的单元格闪烁处于打开状态时适用。默认值：`False` */
  suppressCellFlash?: boolean;

  // *** Columns: Row Dragging *** //

  /** `bollen`或`function`。设置为`true`(或从函数返回`true`)即可拖行。默认值：`False` */
  rowDrag?: boolean | RowDragCallback;
  /**
   * 拖行时显示的回调函数返回的字符串
   * 如果不设置此回调，将使用当前单元格值。
   */
  rowDragText?: (params: RowDragItem, dragItemCount: number) => string;
  /** `boolean` or `Function`. 设置为`true`(或从函数返回`true`)以允许本机拖放。默认值：`False` */
  dndSource?: boolean | DndSourceCallback;
  /** Function to allow custom drag functionality for native drag and drop. */
  dndSourceOnRowDrag?: (params: DndSourceOnRowDragParams) => void;

  // *** Columns: Row Grouping *** //

  /** 设置为`true`可按此列进行行分组。默认值：`False` */
  rowGroup?: boolean;
  /** 与`rowGroup`相同，不同之处在于仅在新建列时应用。在更新列定义时不适用。 */
  initialRowGroup?: boolean;
  /**
   * 在要分组的列中设置此项。
   * 如果只按一列分组，则将其设置为任意数字(例如，‘0’)
   * 如果按多列分组，则将此列设置为您希望该列在组中的位置(例如，第一列为`0`，第二列为`1`，依此类推)。
   */
  rowGroupIndex?: number | null;
  /** 与`rowGroupIndex`相同，不同之处在于仅在新建列时应用。在更新列定义时不适用。 */
  initialRowGroupIndex?: number;
  /**
   * 如果希望能够通过图形用户界面按该列分组，请设置为`true`。
   * 这不会阻止用于实现行分组的API或属性。
   * Default: `false`
   */
  enableRowGroup?: boolean;
  /**
   * 如果您希望能够通过图形用户界面按该列进行聚合，则设置为`true`。
   * 这不会阻止用于实现聚合的API或属性。
   * Default: `false`
   */
  enableValue?: boolean;
  /** 用于聚合的函数的名称。您还可以提供自己的AGG功能。 */
  aggFunc?: string | AggFunc | null;
  /** 与`aggFunc`相同，不同之处在于仅在新建列时应用。在更新列定义时不适用。 */
  initialAggFunc?: string | AggFunc;
  /**
   * 通过图形用户界面启用该列时要用于该列的聚合函数的名称。
   * 请注意，这不会立即应用像`aggFunc`这样的聚合函数
   * Default: `sum`
   */
  defaultAggFunc?: string;
  /**
   * 此列允许使用聚合函数，例如`[‘sum’，‘avg’]`。
   * 如果缺少，则允许所有已安装的功能。
   * 这只会限制图形用户界面允许用户选择的内容，不会影响您通过API设置函数。 */
  allowedAggFuncs?: string[];

  /** 设置为True可使网格将组的值放入单元格，或将已分组列的名称仅显示该组。 */
  showRowGroup?: string | boolean;

  // *** Columns: Sort *** //
  /** 设置为`true`以允许对此列进行排序。默认值：`False` */
  sortable?: boolean;
  /** 如果默认排序，请在此处设置。设置为`asc`或`des`。 */
  sort?: 'asc' | 'desc' | null;
  /** 与`sort`相同，不同之处在于仅在新建列时应用。在更新列定义时不适用。 */
  initialSort?: 'asc' | 'desc' | null;
  /** 如果默认情况下对多个列进行排序，则指定应用排序的顺序。 */
  sortIndex?: number | null;
  /** 与`sortIndex`相同，不同之处在于仅在新建列时应用。在更新列定义时不适用。 */
  initialSortIndex?: number;
  /**  Array defining the order in which sorting occurs (if sorting is enabled). An array with any of the following in any order `['asc','desc',null]` */
  sortingOrder?: ('asc' | 'desc' | null)[];
  /** Comparator function for custom sorting. */
  comparator?: (
    valueA: any,
    valueB: any,
    nodeA: RowNode,
    nodeB: RowNode,
    isDescending: boolean,
  ) => number;
  /** 如果希望在未对此列应用排序时显示未排序图标，请设置为`true`。默认值：`False` */
  unSortIcon?: boolean;

  // *** Columns: Spanning *** //

  /** By default, each cell will take up the width of one column. You can change this behaviour to allow cells to span multiple columns. */
  colSpan?: (params: ColSpanParams) => number;
  /** By default, each cell will take up the height of one row. You can change this behaviour to allow cells to span multiple rows. */
  rowSpan?: (params: RowSpanParams) => number;

  // *** Columns: Widths *** //

  /** 单元格的初始宽度(px)。 */
  width?: number;
  /** 与`width`相同，不同之处在于仅在新建列时应用。在更新列定义时不适用。 */
  initialWidth?: number;
  /** 单元格的最小宽度(px)。 */
  minWidth?: number;
  /** 单元格的最大宽度(px)。 */
  maxWidth?: number;
  /** 当目标是填充网格的剩余空白空间时，用来代替`Width`。 */
  flex?: number;
  /** 与`fle`相同，不同之处在于仅在新建列时应用。在更新列定义时不适用。 */
  initialFlex?: number;
  /** 设置为`true`以允许调整此列的大小。默认值：`False` */
  resizable?: boolean;
  /** 如果您希望在“Size to Fit”操作期间固定此列的宽度，请设置为“True”。默认值：`False` */
  suppressSizeToFit?: boolean;
  /** 如果不希望通过双击该列的边缘自动调整其大小，请设置为`true`。默认值：`False` */
  suppressAutoSize?: boolean;

  /** 切勿设置此选项，它由网格在网格内旋转时在内部使用 */
  pivotValueColumn?: Column | null;
  /** 切勿设置此选项，它由网格在网格内旋转时在内部使用 */
  pivotTotalColumnIds?: string[];
}
