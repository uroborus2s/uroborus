import {
  FillOperationParams,
  GetChartToolbarItemsParams,
  GetGroupAggFilteringParams,
  GetGroupRowAggParams,
  GetLocaleTextParams,
  GetRowIdParams,
  GetServerSideGroupLevelParamsParams,
  InitialGroupOrderComparatorParams,
  IsApplyServerSideTransactionParams,
  IsExternalFilterPresentParams,
  IsFullWidthRowParams,
  IsGroupOpenByDefaultParams,
  IsServerSideGroupOpenByDefaultParams,
  NavigateToNextCellParams,
  NavigateToNextHeaderParams,
  PaginationNumberFormatterParams,
  PostProcessPopupParams,
  PostSortRowsParams,
  ProcessDataFromClipboardParams,
  ProcessRowParams,
  RowHeightParams,
  SendToClipboardParams,
  TabToNextCellParams,
  TabToNextHeaderParams,
} from '@/entity/interface/callBackParams';
import {
  CsvExportParams,
  ProcessCellForExportParams,
  ProcessGroupHeaderForExportParams,
  ProcessHeaderForExportParams,
} from '@/entity/interface/exportParams';
import {
  PasteEndEvent,
  PasteStartEvent,
  ToolPanelVisibleChangedEvent,
} from '@/entity/interface/enevtType';
import { ExcelExportParams, ExcelStyle } from '@/entity/interface/excelCreator';
import {
  ChartMenuOptions,
  UChartTheme,
  UChartThemeOverrides,
} from '@/entity/interface/chartOptions';
import { AggFunc } from '@/entity/cell';
import { Datasource } from '@/entity/interface/datasource';
import { ServerSideDatasource } from '@/entity/interface/serverSideDatasource';
import { ViewportDatasource } from '@/entity/interface/viewportDatasource';
import { Column } from '@/entity/column';
import { RowNode } from '@/entity/rowNode';
import { GridCommon } from '@/entity/interface/common';
import { HeaderPosition } from '@/hooks/useHeaderPosition';
import { CellPosition } from '@/hooks/useCellPosition';
import { Layout } from '@/entity/interface/domLayout';
import { SideBarDef } from '@/entity/sideBar';
import { StatusPanelDef } from './statusPanelProps';
import { ColDef, ColGroupDef } from './colunmProps';

export interface GridOptions {
  /** 指定要在状态栏中使用的状态栏组件。 */
  statusBar?: {
    statusPanels: StatusPanelDef[];
  };

  /** 指定侧栏组件。 */
  sideBar?: SideBarDef | string | string[] | boolean | null;

  /** 设置为`true`将不显示上下文菜单。如果您不想使用默认的“右键单击”上下文菜单，请使用此选项。默认值：`False`  */
  suppressContextMenu?: boolean;

  /**
   * 在使用`suppressConextMenu`时，可以使用`onCellConextMenu`函数提供自己的代码来处理单元格`contextmenu`事件。
   * 此标志有助于防止浏览器显示其默认上下文菜单。
   * Default: `false`
   */
  preventDefaultOnContextMenu?: boolean;

  /** 允许显示上下文菜单，即使在按住`Ctrl`键时也是如此。默认值：`False`  */
  allowContextMenuWithControlKey?: boolean;

  /** 设置为`true`将始终显示列菜单按钮，而不是仅在鼠标悬停在列标题上时才显示。默认值：`False` */
  suppressMenuHide?: boolean;
  /** 设置为`true`将使用浏览器的默认工具提示，而不是使用网格的工具提示组件。默认值：`False` */
  enableBrowserTooltips?: boolean;

  /**
   * 将鼠标悬停在某个元素上时，工具提示显示所需的延迟(毫秒)。
   * **Note:** 如果`enableBrowserTooltips`为`true`，则该属性无效。
   * Default: `2000`
   */
  tooltipShowDelay?: number;
  /**
   * 工具提示在显示后隐藏所需的延迟(毫秒)。
   * **Note:** 如果`enableBrowserTooltips`为`true`，则该属性无效。
   * Default: `10000`
   */
  tooltipHideDelay?: number;
  /** 设置为`true`可使工具提示在显示后跟随光标。默认值：`False` */
  tooltipMouseTrack?: boolean;
  /** 用作网格弹出窗口(上下文菜单、列菜单等)的弹出父级的DOM元素。 */
  popupParent?: HTMLElement;
  /** 如果设置为`true`，则在使用`Ctrl+C`剪贴板复制到剪贴板时也会包含标题。默认值：`False` */
  copyHeadersToClipboard?: boolean;
  /** 设置为`true`，则在使用`Ctrl+C`剪贴板复制到剪贴板时，也会包含组头。默认值：`False` */
  copyGroupHeadersToClipboard?: boolean;

  /**
   * 指定复制到剪贴板时要使用的分隔符。
   * Default: `\t`
   */
  clipboardDelimiter?: string;
  /** 设置为`true`可将单元格范围或聚焦的单元格复制到剪贴板，而不复制选定的行。默认值：`False` */
  suppressCopyRowsToClipboard?: boolean;
  /** 设置为`true`可在选择只有一个单元格的区域时复制行而不是区域。默认值：`False` */
  suppressCopySingleCellRanges?: boolean;
  /** 设置为`true`可解决Excel(Windows)的错误，该错误会在复制到剪贴板的范围末尾添加额外的空行。默认值：`False` */
  suppressLastEmptyLineOnPaste?: boolean;
  /** 设置为`true`可关闭网格内的粘贴操作。 */
  suppressClipboardPaste?: boolean;
  /** 设置为`true`可在网格被阻止时停止尝试使用剪贴板API的网格，并立即回退到解决方法。 */
  suppressClipboardApi?: boolean;

  /** Array of Column / Column Group definitions. */
  columnDefs?: (ColDef | ColGroupDef)[] | null;

  /** 默认的列定义。columnDefs中定义的参数值优先级更高。 */
  defaultColDef?: ColDef;
  /** 默认列组定义。所有列组定义都将使用这些属性。在实际列组定义中定义的项优先。 */
  defaultColGroupDef?: Partial<ColGroupDef>;
  /** 自定义列类型的对象映射，其中包含列定义可以通过在其`type`属性中引用来继承的属性组。 */
  columnTypes?: {
    [key: string]: ColDef;
  };

  /** 在更新新列定义后保持列的顺序不变。默认值：`False` */
  maintainColumnOrder?: boolean;
  /** 如果为`true`，则字段名中的点(例如`‘Address.FirstLine’`)不会被视为深度引用。允许您在字段名称中使用圆点(如果您愿意)。默认值：`False` */
  suppressFieldDotNotation?: boolean;

  /** 包含列标签标题的行的高度(px。如果不指定，则使用`Header-Height`的主题值。 */
  headerHeight?: number;
  /** 包含标题列组的行的高度(px)。如果不指定，则使用`headerHeight`。 */
  groupHeaderHeight?: number;
  /** 包含浮动滤镜的行的高度(px)。如果不指定，则使用`Header-Height`的主题值。 */
  floatingFiltersHeight?: number;
  /** 处于透视模式时包含列的行的高度(以像素为单位)。如果不指定，则使用`headerHeight`。 */
  pivotHeaderHeight?: number;

  /** 处于透视模式时包含标题列组的行的高度(以像素为单位)。如果不指定，则使用`groupHeaderHeight`。 */
  pivotGroupHeaderHeight?: number;
  /** 允许通过将列从列工具面板拖到网格来重新排序和固定列。默认值：`False` */
  allowDragFromColumnsToolPanel?: boolean;
  /** 设置为`true`将禁止列移动，即使列处于固定位置。默认值：`False` */
  suppressMovableColumns?: boolean;
  /** 如果为`true`，则在列移动时，不会将`ag-Column-moving`类添加到网格中。在默认主题中，这会导致在移动列时没有动画。默认值：`False` */
  suppressColumnMoveAnimation?: boolean;
  /** 如果为`true`，则当您将列拖出网格(例如拖到组区域)时，该列不会隐藏。默认值：`False` */
  suppressDragLeaveHidesColumns?: boolean;
  /** 如果为`true`，则将列拖动到行组面板中时，该列不会隐藏。默认值：`False` */
  suppressRowGroupHidesColumns?: boolean;
  /** 设置为`‘Shift’`，则默认的调整大小操作为Shift-Resige(与用户在调整大小时按住`Shift`相同)。 */
  colResizeDefault?: string;
  /** 禁止自动调整列的列大小。换句话说，双击列标题的边缘不会自动调整大小。默认值：`False` */
  suppressAutoSize?: boolean;
  /**
   * Number of pixels to add to a column width after the [auto-sizing](/column-sizing/#auto-size-columns) calculation.
   * 如果您想要添加额外的空间来容纳(例如)排序图标，或页眉的某些其他动态特性，请设置此选项。
   * Default: `4`
   */
  autoSizePadding?: number;
  /** 如果设置为`true`，则默认调用`autoSize`时跳过`headerName`。默认值：`False` */
  skipHeaderOnAutoSize?: boolean;

  /** A map of component names to components. */
  components?: {
    [p: string]: JSX.Element;
  };

  /** 设置为`‘FullRow’`可启用整行编辑。否则，保留为空可一次编辑一个单元格。 */
  editType?: string;
  /** 设置为`true`可启用单元格的单击式编辑，只需一次单击即可开始编辑。默认值：`False` */
  singleClickEdit?: boolean;
  /** 设置为`true`，这样无论是单击还是双击都不会开始编辑。默认值：`False` */
  suppressClickEdit?: boolean;
  /** 设置为`true`，则停止网格更新数据后进行编辑。设置后，应用程序将更新数据，例如外部不可变存储中的数据，然后将新数据集传递给网格。 */
  readOnlyEdit?: boolean;
  /**
   * 将其设置为`true`可在网格失去焦点时停止单元格编辑。
   * 默认情况下，网格保持编辑状态，直到焦点移到另一个单元格上。仅适用于内联(非弹出)编辑器。
   * Default: `false`
   */
  stopEditingWhenCellsLoseFocus?: boolean;

  /**
   * 与`enterMovesDownAfterEdit`一起设置为`true`，以使`Enter`键具有Excel样式的行为。
   * 按`Enter‘键将向下移动到下面的单元格。
   * Default: `false`
   */
  enterMovesDown?: boolean;
  /**
   * 与`enterMovesDown`一起设置为`true`，以使‘Enter’键具有Excel样式的行为。
   * 按`Enter‘键将向下移动到下面的单元格。
   * Default: `false`
   */
  enterMovesDownAfterEdit?: boolean;

  /** 设置为`true`可在编辑时启用撤消/重做。 */
  undoRedoCellEditing?: boolean;
  /** 设置撤消/重做堆栈的大小。默认：`10` */
  undoRedoCellEditingLimit?: number;

  /** 用于导出到CSV的默认配置对象。 */
  defaultCsvExportParams?: CsvExportParams;
  /** 阻止用户将网格导出为CSV。默认值：`False` */
  suppressCsvExport?: boolean;
  /** 用于导出到Excel的默认配置对象。 */
  defaultExcelExportParams?: ExcelExportParams;
  /** 防止用户将网格导出到Excel。默认值：`False` */
  suppressExcelExport?: boolean;
  /** 导出为带有样式的Excel时要使用的Excel样式的列表(数组)。 */
  excelStyles?: ExcelStyle[];

  // *** Filter *** //
  /** 使用此文本作为快速筛选器来筛选行。 */
  quickFilterText?: string;
  /** 设置为`true`表示打开快速过滤器缓存，用于在使用快速过滤器时提高性能。默认值：`False` */
  cacheQuickFilter?: boolean;
  /** 设置为`true`将覆盖默认的树数据筛选行为，从而从筛选结果中排除子节点。默认值：`False` */
  excludeChildrenWhenTreeDataFiltering?: boolean;

  // *** Integrated Charts 综合图表 *** //
  /** 设置为`true`即可启用图表。默认值：`False` */
  enableCharts?: boolean;
  /** 要使用的图表主题列表。 */
  chartThemes?: string[];
  /** 包含自定义图表主题的地图。 */
  customChartThemes?: { [name: string]: UChartTheme };
  /** Chart theme overrides applied to all themes. */
  chartThemeOverrides?: UChartThemeOverrides;

  // *** Loading Cell Renderers *** //
  /**
   * 提供您自己的加载单元格呈现器，以便在通过数据源加载数据时使用。
   */
  loadingCellRenderer?: any;
  /** 要传递给`loadingCellRenderer`组件的参数。 */
  loadingCellRendererParams?: any;
  /** 回调以选择通过数据源加载数据时要使用的加载单元格呈现器。 */
  loadingCellRendererSelector?: JSX.Element;

  // *** Localisation *** //
  // just set once
  /** 用于在网格中本地化文本的键->值对的映射。 */
  localeText?: { [key: string]: string };

  // *** Master Detail *** //
  /** 设置为`true`即可启用Master Detail。默认值：`False` */
  masterDetail?: boolean;
  /** 设置为`true‘可保留详细信息行，以备再次显示时使用。默认值：`False` */
  keepDetailRows?: boolean;
  /** 设置要保留的详细信息行数。默认：`10` */
  keepDetailRowsCount?: number;

  /**
   * 提供展开主行时使用的自定义`DetailCellRenderer`。
   */
  detailCellRenderer?: JSX.Element;

  /** 指定细节单元格渲染器要使用的参数。也可以是提供参数以启用参数的动态定义的函数。 */
  detailCellRendererParams?: any;

  /** 以像素为单位设置每个详细信息行的固定高度。 */
  detailRowHeight?: number;
  /** 设置为`true‘可使详细信息网格动态更改其高度以适应其行。 */
  detailRowAutoHeight?: boolean;

  /** 设置为`true`可使打开的组行在网格顶部可见。默认：`False`。 */
  groupRowsSticky?: boolean;

  // *** Miscellaneous *** //
  // changeable, but no immediate impact
  /** 提供一个上下文对象，该对象被提供给网格使用的不同回调。用于将附加信息传递给应用程序的回调。 */
  context?: any;
  // /** 要视为对齐的格线的格线列表。如果网格对齐，则列和水平滚动将保持同步。 */
  // alignedGrids?: { api?: GridApi | null; columnApi?: ColumnApi | null }[];
  /** 更改此值可设置应用程序中网格的tabIndex顺序。默认值：`0` */
  tabIndex?: number;
  /**
   * 在网格呈现的可视区域之外呈现的行数。
   * 有一个缓冲区意味着当用户缓慢地垂直滚动时，网格将有准备好显示的行。
   * Default: `10`
   */
  rowBuffer?: number;
  /** 如果设置为`true`，则打开值缓存。默认值：`False` */
  valueCache?: boolean;
  /** 设置为`true`可将值缓存配置为数据更新后不过期。默认值：`False` */
  valueCacheNeverExpires?: boolean;
  /** 设置为`true`以允许单元格表达式。默认值：`False` */
  enableCellExpressions?: boolean;

  /**
   * 如果为`true`，则行节点未设置其父节点。
   * 网格不使用父引用，但包含它是为了帮助客户端代码在节点树中导航(如果需要的话)，方法是提供上下双向导航。
   * 如果这是一个问题(例如，如果您需要将树转换为JSON，这不允许循环依赖)，则将其设置为`true`。
   * Default: `false`
   */
  suppressParentsInRowNodes?: boolean;
  /** 禁用触摸支持(但不会移除浏览器在触摸时模拟鼠标事件的努力)。默认值：`False` */
  suppressTouch?: boolean;
  /** 设置为`true`可在刷新后不将焦点设置回网格上。这可以避免您希望将焦点保持在浏览器的另一部分上的问题。默认值：`False` */
  suppressFocusAfterRefresh?: boolean;
  /** 网格将检查`ResizeObserver`，如果浏览器中存在，则使用它，否则将使用网格的替代实现。一些用户反映Chrome的`ResizeObserver`出现了问题。如果存在此类问题，请使用此属性始终使用网格的替代实现。
   *  Default: `false` */
  suppressBrowserResizeObserver?: boolean;
  /** 如果使用的`gridOptions`或`colDef`属性不存在，则不会在控制台中显示警告消息 ,默认false */
  suppressPropertyNamesCheck?: boolean;
  /** 禁用更改检测。 Default: `false` */
  suppressChangeDetection?: boolean;
  /** 设置为`true`即可启用来自网格和相关组件的调试信息。将导致输出额外的日志记录，但在调查问题时非常有用。 Default: `false` */
  debug?: boolean;

  // *** Overlays *** //
  /** 提供用于‘加载’覆盖的模板。 */
  overlayLoadingTemplate?: string;
  /**
   * 提供自定义加载覆盖组件。
   */
  loadingOverlayComponent?: JSX.Element;
  /** 定制提供给加载覆盖组件的参数。 */
  loadingOverlayComponentParams?: any;

  /** 禁用‘loading’覆盖。 Default: `false` */
  suppressLoadingOverlay?: boolean;

  /** 为“空表格”覆盖提供模板。 */
  overlayNoRowsTemplate?: string;

  /**
   * 提供一个自定义的表格为空自定义组件。
   */
  noRowsOverlayComponent?: JSX.Element;
  /** 自定义提供给表格为空自定义组件的参数。 */
  noRowsOverlayComponentParams?: any;

  /** 禁用“表格为空”自定义展示组件。 Default: `false` */
  suppressNoRowsOverlay?: boolean;

  // *** Pagination *** //
  /** 设置是否启用分页。 Default: `false` */
  pagination?: boolean;
  /** 每页要加载多少行。如果指定`paginationAutoPageSize`，则忽略该属性。 Default: `100` */
  paginationPageSize?: number;
  /** 设置为`true‘，这样网格会自动调整每页要加载的行数，这样每页显示的行数就足以填满为网格指定的区域。如果为`False`，则使用`PaginationPageSize`。Default: `false` */
  paginationAutoPageSize?: boolean;
  /** 设置为`true`可在使用具有Master Detail的行分组或详细信息行时让页面拆分组的子项。 Default: `false` */
  paginateChildRows?: boolean;
  /**
   * 如果为`true`，则隐藏导航的默认网格控件。
   * 如果`Pagination=true`并且您想要提供自己的分页控件，这将非常有用。
   * 否则，当`Pagination=True‘时，网格会自动在底部显示必要的控件，以便用户可以在不同的页面之间导航。
   * Default: `false`
   */
  suppressPaginationPanel?: boolean;

  // *** Pivot and Aggregation *** //
  /** 设置为`true`即可启用透视模式。 Default: `false` */
  pivotMode?: boolean;
  /** 何时在顶部显示“透视面板”(在其中拖动要透视的行)。请注意，如果`PivotMode`处于关闭状态，透视面板将永远不会显示。 Default: `never` */
  pivotPanelShow?: string;
  /** 设置后，如果网格处于透视模式，则自动计算的总计将显示在透视列组中的指定位置。 */
  pivotColumnGroupTotals?: string;
  /** 设置后，如果网格处于透视模式，则将在指定位置为每个值列显示自动计算的总计。 */
  pivotRowTotals?: string;
  /** 如果为`true`，则网格在旋转时不会在分组列中交换。如果使用服务器端行模型或视口行模型旋转，并且希望完全控制所有列(包括组列)，则此选项非常有用。 Default: `false` */
  pivotSuppressAutoColumn?: boolean;
  /** 启用后，透视列组将显示为“固定”，不能展开和折叠列组。 Default: `false` */
  suppressExpandablePivotGroups?: boolean;
  /** 如果为`true`，则行组、透视表和值聚合在图形用户界面中为只读。该网格将显示每个应用程序使用的值，但不允许用户更改选择。 Default: `false` */
  functionsReadOnly?: boolean;
  /** 自定义聚合函数的“函数名”到“函数”的映射。 */
  aggFuncs?: { [key: string]: AggFunc };
  /** 如果为`true`，则列表头不会包含`aggFunc`名称，例如`‘sum(银行余额)`’将仅为`‘银行余额’`。 Default: `false` */
  suppressAggFuncInHeader?: boolean;
  /** 如果为`true`，则不会计算网格根节点的聚合。 Default: `false` */
  suppressAggAtRootLevel?: boolean;
  /** 使用更改检测时，只会重新聚合更新后的列。 Default: `false` */
  aggregateOnlyChangedColumns?: boolean;
  /** 设置为`true`，则聚合不会受到过滤的影响。 Default: `false` */
  suppressAggFilteredOnly?: boolean;
  /** 设置为`true`可在只有一个值列时省略值列标题。 Default: `false` */
  removePivotHeaderRowWhenSingleValueColumn?: boolean;
  // *** Rendering *** //
  /** 设置为`true`即可启用行动画。 Default: `false` */
  animateRows?: boolean;
  /** 设置为`true`可使单元格在数据更改后闪烁。 Default: `false` */
  enableCellChangeFlash?: boolean;
  /**
   * 与`enableCellChangeFlash`配合使用，此配置将设置小区处于闪存状态的延迟时间，单位为毫秒。
   * Default: `500`
   */
  cellFlashDelay?: number;
  /**
   * 与`enableCellChangeFlash`配合使用，此配置将设置在`cell FlashDelay`设置的定时器结束后，闪烁状态动画淡出的延迟时间，单位为毫秒。
   * Default: `1000`
   */
  cellFadeDelay?: number;
  /** 设置为`true`可使单元格在数据更改后闪烁，即使更改是由于过滤造成的。 Default: `false` */
  allowShowChangeAfterFilter?: boolean;
  /**
   * 在布局选项之间切换：`Normal`、`AutoHeight`、`print`。
   * Default: `normal`
   */
  domLayout?: Layout;
  /** 当为`true`时，DOM中的行和列顺序与屏幕上的一致。 Default: `false` */
  ensureDomOrder?: boolean;
  /** 设置为`true`可在RTL(从右向左)模式下操作网格。 Default: `false` */
  enableRtl?: boolean;
  /** 设置为`true‘，这样网格就不会虚拟化柱。例如，如果您有100列，但由于滚动而只有10列可见，则所有100列都将始终呈现。 Default: `false` */
  suppressColumnVirtualisation?: boolean;
  /** 默认情况下，网格一次最多只能呈现500行(请记住，网格只呈现您可以看到的行，因此，除非您的显示器显示超过500行而不垂直滚动，否则这永远不会是问题)。
   * <br />**This is only relevant if you are manually setting `rowBuffer` to a high value (rendering more rows than can be seen) or if your grid height is able to display more than 500 rows at once.**
   * Default: `false`
   */
  suppressMaxRenderedRowRestriction?: boolean;
  /** 设置为`true‘，这样网格就不会虚拟化行。例如，如果您有100行，但由于滚动而只有10行可见，则所有100行都将始终呈现。 Default: `false` */
  suppressRowVirtualisation?: boolean;

  // *** Row Drag and Drop *** //
  /** 设置为`true`可启用托管行拖动。 Default: `false` */
  rowDragManaged?: boolean;
  /** 设置为`true`以禁止行拖拽。 Default: `false` */
  suppressRowDrag?: boolean;
  /** 设置为`true`可在拖动`rowDrag`华夫饼时禁止移动行。此选项高亮显示将放置行的位置，并且它只会将鼠标上的行向上移动。 Default: `false` */
  suppressMoveWhenRowDragging?: boolean;
  /** 设置为`true‘可在不需要拖动柄的情况下，在行上的任意位置进行单击和拖动。 Default: `false` */
  rowDragEntireRow?: boolean;
  /** 设置为`true`即可同时拖拽多行。 Default: `false` */
  rowDragMultiRow?: boolean;

  // *** Row Full Width *** //
  /**
   * 提供自定义的单元格呈现器组件以用于全宽行。
   */
  fullWidthCellRenderer?: JSX.Element;
  /** Customise the parameters provided to the `fullWidthCellRenderer` component. */
  fullWidthCellRendererParams?: any;

  /** 设置为`true‘可将细节网格嵌入到主网格的容器中，从而链接它们的水平滚动。 */
  embedFullWidthRows?: boolean;

  // *** Row Grouping *** //
  /**
   * 指定应如何显示行分组的结果。
   *
   *  The options are:
   *
   * - `'singleColumn'`: 由网格自动添加的单个组列。
   * - `'multipleColumns'`: 系统会自动为每个行组添加一个组列。
   * - `'groupRows'`: 自动添加分组行，而不是分组列。
   * - `'custom'`: 通知网格将提供分组列。
   */
  groupDisplayType?: RowGroupingDisplayType;
  /** 如果分组，则默认设置要扩展的级数，例如`0`表示没有级别，`1`表示只有一级，等等。设置为`-1`表示所有级别的扩展。 Default: `0` */
  groupDefaultExpanded?: number;
  /** 如果您对默认设置不满意，则允许指定组‘AUTO COLUMN’。如果是分组，则此列定义将作为网格中的第一列包括在内。如果不分组，则不包括此列。 */
  autoGroupColumnDef?: ColDef;
  /** 如果为`true`，则在对非分组列进行排序时保留当前的分组顺序。 Default: `false` */
  groupMaintainOrder?: boolean;
  /** 当为`true`时，如果选择一个组，则该组的子组也将被选中。 Default: `false` */
  groupSelectsChildren?: boolean;
  /** 设置是否对聚合组值应用筛选器。默认值：`False` */
  groupAggFiltering?: boolean | IsRowFilterable;
  /**
   * 如果是分组，则控制在展开组时是否显示组页脚。
   * 如果为`true`，则默认情况下，显示时页脚将包含聚合数据(如果有)，页眉为空。
   * 关闭时，页眉将包含聚合数据，而不考虑此设置(因为页脚无论如何都是隐藏的)。
   * 这对于“合计”行很方便，当组打开时显示在数据下方，当组关闭时显示在组旁边。
   * Default: `false`
   */
  groupIncludeFooter?: boolean;
  /** 设置为`true`以显示所有组的‘总计’组页脚。Default: `false` */
  groupIncludeTotalFooter?: boolean;
  /** 如果为`true`，并且显示页脚，则聚合数据将始终同时显示在页眉和页脚级别。这阻止了页眉细节在展开时‘跳到’页脚的可能不受欢迎的行为。 Default: `false` */
  groupSuppressBlankHeader?: boolean;
  /** 如果使用`groupSelectsChildren`，则只有通过当前过滤器的子代才会被选中。 Default: `false` */
  groupSelectsFiltered?: boolean;
  /** 在非分组行的分组列中显示打开的分组。Default: `false` */
  showOpenedGroup?: boolean;
  /** 设置为`true`可折叠只有一个子级的组。 */
  groupRemoveSingleChildren?: boolean;
  /** 设置为`true`可折叠仅有一个子级的最低级别组。 Default: `false` */
  groupRemoveLowestSingleChildren?: boolean;
  /** 设置为`true`以隐藏打开的父项。当与用于显示组的多列一起使用时，它可以提供更令人愉快的用户体验。 Default: `false` */
  groupHideOpenParents?: boolean;
  /** 何时在顶部显示“行组面板”(在其中拖动行以分组)。 Default: `never` */
  rowGroupPanelShow?: string;
  /**
   * 提供要在以下情况下使用的单元格呈现器 `groupDisplayType = 'groupRows'`.
   */
  groupRowRenderer?: JSX.Element;
  /** 定制提供给`groupRowRenderer`组件的参数。 */
  groupRowRendererParams?: any;

  /** 默认情况下，当某列取消分组时(即使用行组面板)，它将在网格中可见。此属性可在取消分组时阻止该列再次可见。 Default: `false` */
  suppressMakeColumnVisibleAfterUnGroup?: boolean;
  /** 设置为`true`以使网格能够处理树数据。还必须实现`getDataPath(Data)`回调。 */
  treeData?: boolean;

  // *** Row Pinning *** //
  /** 要在网格中显示为固定顶行的数据。 */
  pinnedTopRowData?: any[];
  /** 要在网格中显示为固定底部行的数据。 */
  pinnedBottomRowData?: any[];

  // *** Row Model *** //
  /** 设置行模型类型。 Default: `clientSide` */
  rowModelType?: 'clientSide' | 'infinite' | 'viewport' | 'serverSide';

  // *** Row Model: Client-side *** //
  // changeable with impact
  /** 设置要在网格中显示为行的数据。 */
  rowData?: any[] | null;
  /** 在执行一批异步事务之前等待的毫秒数。 */
  asyncTransactionWaitMillis?: number;
  /** 当事务只包含更新时，防止事务更改排序、筛选器、组或透视状态。 Default: `false` */
  suppressModelUpdateAfterUpdateTransaction?: boolean;

  // *** Row Model: Infinite / Server-side *** //
  /** 提供无限滚动的数据源。 */
  datasource?: Datasource;
  /**
   * 在数据集的末尾向用户显示多少额外的空白行，这将设置垂直滚动，然后允许网格请求查看更多数据行。
   * Default: `1`
   */
  cacheOverflowSize?: number;
  /**
   * 在数据集的末尾向用户显示多少额外的空白行，这将设置垂直滚动，然后允许网格请求查看更多数据行。
   * Default: `1`
   */
  infiniteInitialRowCount?: number;
  /**
   * 设置要向用户显示的根级别组的加载行数。
   * Default: `1`
   */
  serverSideInitialRowCount?: number;

  /** 设置服务器端行模型是否使用无限滚动
   * Default: `false`
   */
  serverSideInfiniteScroll?: boolean;
  /**
   * 存储中每个块的行数，即一次从服务器返回多少行。
   * Default: `100`
   */
  cacheBlockSize?: number;
  /** 要在商店里放几个街区。缺省值为无限制，因此保留每个请求的块。如果您有内存问题，则使用此选项，并且在达到限制时将清除最近查看次数最少的块。网格还将确保它具有显示当前可见内容所需的所有块，以防该属性设置为较低的值。 */
  maxBlocksInCache?: number;
  /**
   * 并发命中服务器的请求数。如果达到最大值，则请求将排队。
   * 设置为`-1`表示请求没有最大限制。
   * Default: `2`
   */
  maxConcurrentDatasourceRequests?: number;
  /** 加载块之前等待的毫秒数。在无限滚动和滚动多个无限块时非常有用，因为它防止块加载，直到滚动稳定为止。 */
  blockLoadDebounceMillis?: number;
  /** 启用时，关闭组行将删除该行的子行。下次打开该行时，将再次从数据源中读取子行。此属性仅在有行分组时才适用。 Default: `false`  */
  purgeClosedRowNodes?: boolean;
  /** 提供服务器端行模型的`serverSideDatasource`。 */
  serverSideDatasource?: ServerSideDatasource;

  /** 启用后，无论对哪一列进行排序，都会始终刷新顶级组。只有在服务器上处理行分组和排序时，此属性才适用。 Default: `false` */
  serverSideSortAllLevels?: boolean;
  /** 启用后，无论过滤了哪一列，都会始终刷新顶级组。此属性仅适用于在服务器上处理行分组和筛选的情况。 Default: `false` */
  serverSideFilterAllLevels?: boolean;
  /**
   * 启用后，将在服务器端进行排序。当serverSideInfiniteScroll=True时，不执行任何操作，
   * 因为当无限滚动处于活动状态时，分类始终是服务器端。
   * Default: `false`
   */
  serverSideSortOnServer?: boolean;
  /**
   * 启用后，将在服务器端进行过滤。当serverSideInfiniteScroll=true时, 不执行任何操作，因为当无限滚动处于活动状态时，过滤始终是服务器端。
   * Default: `false`
   */
  serverSideFilterOnServer?: boolean;

  // *** Row Model: Viewport *** //
  /** 要使用视口行模型，您需要为网格提供一个`viewportDatasource`。 */
  viewportDatasource?: ViewportDatasource;
  /** 使用视口行模型时，设置视区的页面大小。 */
  viewportRowModelPageSize?: number;
  /** 使用视口行模型时，设置视口行的缓冲区大小。 */
  viewportRowModelBufferSize?: number;

  // *** Scrolling *** //
  /** 设置为`true`将始终显示水平滚动条。 Default: `false` */
  alwaysShowHorizontalScroll?: boolean;
  /** 设置为`true`将始终显示垂直滚动条。 Default: `false` */
  alwaysShowVerticalScroll?: boolean;
  /** 设置为`true`以取消垂直滚动条。可以在速度较慢的机器上提供更流畅的滚动。 Default: `false` */
  debounceVerticalScrollbar?: boolean;
  /** 设置为`true`将永远不会显示水平滚动。如果网格与另一个网格对齐并将在其他网格滚动时滚动，则此选项非常有用。(不能与`Always sShowHorizontalScroll`配合使用。) Default: `false` */
  suppressHorizontalScroll?: boolean;
  /** 如果为`true`，则当提供新行数据时，网格不会滚动到顶部。如果您不希望每次加载新数据时都滚动到顶部的默认行为，请使用此选项。 Default: `false` */
  suppressScrollOnNewData?: boolean;
  /** 如果为`true`，则当存在弹出元素时，网格将不允许鼠标滚轮/触摸板滚动。 Default: `false` */
  suppressScrollWhenPopupsAreOpen?: boolean;
  /** 如果为`true`，则网格在滚动时绘制行时不会使用动画帧。如果栅格的工作速度足够快，不需要动画帧，并且不希望栅格闪烁，请使用此选项。 Default: `false` */
  suppressAnimationFrame?: boolean;
  /** 如果为`true`，则中键点击将导致单元格和行的`click`事件。否则浏览器会使用鼠标中键滚动网格。<br/>**备注：**并不是所有浏览器都使用鼠标中键触发`click`事件。大多数只会触发`Mousedown‘和`Mouseup`事件，这两个事件可以用来聚焦单元格，但不能调用`onCellClicked`函数。 Default: `false` */
  suppressMiddleClickScrolls?: boolean;
  /** 如果为`true`，则会将鼠标滚轮事件传递给浏览器。如果您的网格没有垂直滚动，并且您希望使用鼠标滚动浏览器页面，则此选项非常有用。 Default: `false` */
  suppressPreventDefaultOnMouseWheel?: boolean;
  /** 告诉网格滚动条的宽度(以像素为单位)，用于计算网格宽度。仅当使用非标准浏览器提供的滚动条时设置，以便网格可以在其计算中使用非标准大小。 */
  scrollbarWidth?: number;

  // *** Selection *** //
  /** 选行类型：`Single`、`Multiple`。 */
  rowSelection?: 'single' | 'multiple';
  /** 设置为`true`则允许通过一次点击选择多行。 Default: `false` */
  rowMultiSelectWithClick?: boolean;
  /** 如果为`true`，则按住`Ctrl`键并单击行或按`Space`键不会取消选中行。 Default: `false` */
  suppressRowDeselection?: boolean;
  /** 如果为`true`，则单击行时不会进行行选择。当您只需要选中复选框时使用。 Default: `false` */
  suppressRowClickSelection?: boolean;
  /** 如果为`True‘，则单元格将不可聚焦。这意味着将禁用网格单元格的键盘导航，但在网格的其他元素(如列标题、浮动筛选器、工具面板)中保持启用。 Default: `false` */
  suppressCellFocus?: boolean;
  /** 如果为`true`，则只能选择单个范围。 Default: `false` */
  suppressMultiRangeSelection?: boolean;
  /**
   * 设置为`true`可选择单元格中的文本。
   *
   * **Note:** 设置为`true`时，将关闭剪贴板服务。
   * Default: `false`
   */
  enableCellTextSelection?: boolean;
  /** 设置为`true`即可开启范围选择。 Default: `false` */
  enableRangeSelection?: boolean;
  /** 设置为`true`即可启用范围句柄。 Default: `false` */
  enableRangeHandle?: boolean;
  /** 设置为`true`以启用填充句柄。 Default: `false` */
  enableFillHandle?: boolean;
  /** 设置为`x‘’以强制填充手柄方向为水平，或设置为`‘y’‘以强制填充手柄方向为垂直。 Default: `xy` */
  fillHandleDirection?: 'x' | 'y' | 'xy';
  /** 将其设置为`true`可防止在填充句柄缩小范围选择时清除单元格值。 Default: `false` */
  suppressClearOnFillReduction?: boolean;

  // *** Sorting *** //
  /** 定义排序发生顺序的数组(如果启用了排序)。值可以是`‘asc’`、`‘desc’`或`null`。例如：`sortingOrder：[‘asc’，‘desc’]`。默认值：`[NULL，‘asc’，‘desc’]` */
  sortingOrder?: ('asc' | 'desc' | null)[];
  /** 设置为`true`以指定排序应考虑重音字符。如果打开此功能，排序速度将变慢。 Default: `false` */
  accentedSort?: boolean;
  /** 设置为`true`以显示‘无排序’图标。 Default: `false` */
  unSortIcon?: boolean;
  /** 设置为`true`可在用户按住Shift键并单击列标题时取消多重排序。 Default: `false` */
  suppressMultiSort?: boolean;
  /** 设置为`true`可在用户单击列标题时始终进行多重排序，而不考虑按键情况。 Default: `false` */
  alwaysMultiSort?: boolean;
  /** 设置为`ctrl‘`可使用`Ctrl`(或Mac的`Command⌘`)键进行多次排序。 */
  multiSortKey?: string;
  /** 设置为`true`可取消未排序数据的排序以匹配原始行数据。 Default: `false` */
  suppressMaintainUnsortedOrder?: boolean;

  // *** Styling *** //
  /** 在网格内部使用的图标，而不是网格的默认图标。 */
  icons?: { [key: string]: JSX.Element | string };

  /** 以像素为单位的默认行高。 Default: `25` */
  rowHeight?: number;
  /** 设置为`true`，则通过添加`ag-row-hover`css类不突出显示行。 Default: `false` */
  suppressRowHoverHighlight?: boolean;
  /** Uses CSS `top` instead of CSS `transform` for positioning rows. Useful if the transform function is causing issues such as used in row spanning. Default: `false` */
  suppressRowTransform?: boolean;
  /** Set to `true` to highlight columns by adding the `ag-column-hover` CSS class. Default: `false` */
  columnHoverHighlight?: boolean;

  deltaSort?: boolean;
  treeDataDisplayType?: TreeDataDisplayType;
  angularCompileRows?: boolean;
  angularCompileFilters?: boolean;
  functionsPassive?: boolean;
  enableGroupEdit?: boolean;

  // *****************************************************************************************************
  // If you change the callbacks on this interface, you must also update PropertyKeys to be consistent. *
  // *****************************************************************************************************

  // *** Accessories *** //
  /** 用于定制上下文菜单。 */
  getContextMenuItems?: GetContextMenuItems;
  /** 用于自定义主“列标题”菜单。 */
  getMainMenuItems?: GetMainMenuItems;
  /** 允许用户在创建弹出窗口后对其进行处理。例如，如果应用程序想要重新定位弹出窗口，则可以使用此功能。 */
  postProcessPopup?: (params: PostProcessPopupParams) => void;

  // *** Clipboard *** //
  /** 允许您处理剪贴板的单元格。例如，如果您有`Date`对象，并且在导入到Excel时需要具有特定的格式，则非常方便。 */
  processCellForClipboard?: (params: ProcessCellForExportParams) => any;
  /** 允许您处理剪贴板的标题值。 */
  processHeaderForClipboard?: (params: ProcessHeaderForExportParams) => any;
  /** 允许您处理剪贴板的组头标值。 */
  processGroupHeaderForClipboard?: (
    params: ProcessGroupHeaderForExportParams,
  ) => any;
  /** 允许您处理剪贴板中的单元格。例如，如果您有数字字段，并且想要阻止非数字进入网格，则很方便。 */
  processCellFromClipboard?: (params: ProcessCellForExportParams) => any;
  /** 允许您获取原本会发送到剪贴板的数据。当您想要自己控制“复制到剪贴板”操作时使用。 */
  sendToClipboard?: (params: SendToClipboardParams) => void;
  /** 允许完全控制粘贴操作，包括取消操作(因此不会发生任何操作)或用其他数据替换数据。 */
  processDataFromClipboard?: (
    params: ProcessDataFromClipboardParams,
  ) => string[][] | null;

  // *** Filtering *** //
  /** 网格调用此方法以了解是否存在外部筛选器。 */
  isExternalFilterPresent?: (params: IsExternalFilterPresentParams) => boolean;
  /** 如果外部筛选器通过，则应返回`true`，否则返回`False`。 */
  doesExternalFilterPass?: (node: RowNode) => boolean;

  // *** Integrated Charts *** //
  /** 用于自定义图表工具栏项的回调。 */
  getChartToolbarItems?: GetChartToolbarItems;
  /** 回调以启用在替代图表容器中显示图表。 */
  createChartContainer?: (params: ChartRefParams) => void;

  // *** Keyboard Navigation *** //
  /** 允许覆盖标题被聚焦时用户点击导航(箭头)键时的默认行为。返回要导航到的下一个页眉位置，或返回`null`以停留在当前页眉。 */
  navigateToNextHeader?: (
    params: NavigateToNextHeaderParams,
  ) => HeaderPosition | null;
  /** 允许覆盖标题被聚焦时用户按`Tab`键时的默认行为。返回要导航到的下一个页眉位置，或返回`null`以停留在当前页眉。 */
  tabToNextHeader?: (params: TabToNextHeaderParams) => HeaderPosition | null;
  /** 允许覆盖用户在单元格被聚焦时按导航(箭头)键的默认行为。返回要导航到的下一个单元格位置，或返回`null`以停留在当前单元格上。 */
  navigateToNextCell?: (
    params: NavigateToNextCellParams,
  ) => CellPosition | null;
  /** 允许覆盖在单元格被聚焦时用户按`Tab`键时的默认行为。返回要导航到的下一个单元格位置，或返回空以停留在当前单元格上。 */
  tabToNextCell?: (params: TabToNextCellParams) => CellPosition | null;

  // *** Localisation *** //
  getLocaleText?: (params: GetLocaleTextParams) => string;

  // *** Miscellaneous *** //
  /** 允许覆盖使用的`Document`。当前通过拖放使用(将来可能会扩展到其他地方)。当您希望网格使用不同于全局作用域上可用文档的`文档`时，请使用此选项。如果将组件对接(Electron支持的组件)，就会发生这种情况 */
  getDocument?: () => Document;

  // *** Pagination *** //
  /** 允许用户格式化分页面板中的数字，即‘行数’和‘页码’标签。这仅适用于分页面板，以格式化网格单元格中的数字(即您的数据)，然后在列定义中使用`valueFormatter`。 */
  paginationNumberFormatter?: (
    params: PaginationNumberFormatterParams,
  ) => string;

  // *** Row Grouping and Pivoting *** //
  /** 当您需要访问比当前列更多的列以进行聚合时使用的回调。 */
  getGroupRowAgg?: (params: GetGroupRowAggParams) => any;
  /** (仅限客户端行模型)允许在默认情况下打开组。 */
  isGroupOpenByDefault?: (params: IsGroupOpenByDefaultParams) => boolean;
  /** Allows default sorting of groups. */
  initialGroupOrderComparator?: (
    params: InitialGroupOrderComparatorParams,
  ) => number;
  /** 与透视一起使用的回调，以允许更改第二列定义。 */
  processPivotResultColDef?: (colDef: ColDef) => void;
  /** 与透视一起使用的回调，以允许更改第二个列组定义。 */
  processPivotResultColGroupDef?: (colGroupDef: ColGroupDef) => void;
  /** 当`treeData=true`时，在操作Tree数据时使用的回调。 */
  getDataPath?: GetDataPath;

  // *** Row Model: Server Side *** //
  /** 当`treeData=true`时，在操作Tree数据时使用的回调。 */
  getChildCount?: (dataItem: any) => number;
  /** 允许为不同级别的分组提供不同的参数。 */
  getServerSideGroupLevelParams?: (
    params: GetServerSideGroupLevelParamsParams,
  ) => ServerSideGroupLevelParams;

  /** 默认情况下允许打开组。 */
  isServerSideGroupOpenByDefault?: (
    params: IsServerSideGroupOpenByDefaultParams,
  ) => boolean;
  /** 允许取消交易。 */
  isApplyServerSideTransaction?: IsApplyServerSideTransaction;
  /** SSRM树数据：允许指定哪些行是可展开的。 */
  isServerSideGroup?: IsServerSideGroup;
  /** SSRM树数据：允许指定组密钥。 */
  getServerSideGroupKey?: GetServerSideGroupKey;

  // *** Rows *** //
  /**
   * 返回该节点的业务关键字。如果实现，DOM中的每一行都将有一个属性`row-id=‘abc’`，其中`abc`是作为业务键返回的内容。
   * 这对于自动化测试很有用，因为它为您的工具提供了一种基于唯一业务键识别行的方法。
   */
  getBusinessKeyForNode?: (node: RowNode) => string;

  /** 允许根据数据设置特定行节点的ID。 */
  getRowId?: GetRowIdFunc;
  /** 启用后，实现getRowId()回调并设置新的Row数据，网格将忽略所有以前的行，并将新的Row数据视为新数据。因此，所有行状态(如选定行、渲染行)都将被重置。  Default: `false` */
  resetRowDataOnUpdate?: boolean;
  /** 允许您在创建行之后对其进行处理，因此您可以进行最终的自定义属性添加等操作。 */
  processRowPostCreate?: (params: ProcessRowParams) => void;
  /** 用于确定哪些行是可选的回调。默认情况下，行是可选的，因此返回`False`以使行不可选。 */
  isRowSelectable?: IsRowSelectable;
  /** 与Master Detail一起使用的回调，以确定行是否应为主行。如果返回`False`，此行将不存在任何明细行。 */
  isRowMaster?: IsRowMaster;
  /** 回调来填充值，而不是简单地复制值或使用线性级数递增数值。 */
  fillOperation?: (params: FillOperationParams) => any;

  // *** Sorting *** //
  /** 用于在网格对行进行排序后执行其他排序的回调。 */
  postSortRows?: (params: PostSortRowsParams) => void;

  // *** Styling *** //
  /** `rowStyle`属性的回调版本，可以单独设置各行的样式。函数应返回CSS值的对象或无样式的未定义对象。 */
  getRowStyle?: (params: RowClassParams) => RowStyle | undefined;
  /** 回调版本的`rowClass`属性，可以分别设置各行的类。函数应返回字符串(类名)、字符串数组(类名数组)或未为任何类定义。 */
  getRowClass?: (params: RowClassParams) => string | string[] | undefined;
  /** `rowHeight`属性的回调版本，可以单独设置各行的高度。函数需要返回一个正数的像素数，或者返回`null`/`unfined`以使用默认行高。 */
  getRowHeight?: (params: RowHeightParams) => number | undefined | null;
  /** 告诉网格此行是否应呈现为全宽。 */
  isFullWidthRow?: (params: IsFullWidthRowParams) => boolean;

  // *** Accessories *** //
  /** 工具面板被隐藏或显示。使用`api.isToolPanelShowing()`获取状态。 */
  onToolPanelVisibleChanged?(event: ToolPanelVisibleChangedEvent): void;

  // *** Clipboard *** //
  /** 粘贴操作已开始。 */
  onPasteStart?(event: PasteStartEvent): void;

  /** 粘贴操作已结束。 */
  onPasteEnd?(event: PasteEndEvent): void;
}

export type RowGroupingDisplayType =
  | 'singleColumn'
  | 'multipleColumns'
  | 'groupRows'
  | 'custom';

export interface IsRowFilterable {
  (params: GetGroupAggFilteringParams): boolean;
}

export type TreeDataDisplayType = 'auto' | 'custom';

export interface GetContextMenuItems {
  (params: GetContextMenuItemsParams): (string | MenuItemDef)[];
}

export interface GetMainMenuItems {
  (params: GetMainMenuItemsParams): (string | MenuItemDef)[];
}

export interface GetMainMenuItemsParams {
  /** The column that was clicked */
  column: Column;
  /** List of the items that would be displayed by default */
  defaultItems: string[];
}

export interface GetContextMenuItemsParams {
  /** Names of the items that would be provided by default. */
  defaultItems: string[] | undefined;
  /** The column, if a cell was clicked, otherwise null. */
  column: Column | null;
  /** The row node, if a cell was clicked, otherwise null. */
  node: RowNode | null;
  /** The value, if a cell was clicked, otherwise null.  */
  value: any;
}

export interface MenuItemLeafDef {
  /** Name of the menu item */
  name: string;
  /** It the item should be enabled / disabled */
  disabled?: boolean;
  /** Shortcut (just display text, saying the shortcut here does nothing) */
  shortcut?: string;
  /** Function that gets executed when item is chosen */
  action?: () => void;
  /** Set to true to provide a check beside the option */
  checked?: boolean;
  /** The icon to display, either a DOM element or HTML string */
  icon?: HTMLElement | string;
  /** CSS classes to apply to the menu item */
  cssClasses?: string[];
  /** Tooltip for the menu item */
  tooltip?: string;
}

export interface MenuItemDef extends MenuItemLeafDef {
  /** If this item is a sub menu, contains a list of menu item definitions */
  subMenu?: (MenuItemDef | string)[];
}

export interface GetChartToolbarItems {
  (params: GetChartToolbarItemsParams): ChartMenuOptions[];
}

export interface ChartRefParams extends GridCommon, ChartRef {}

export interface ChartRef {
  /** The id of the created chart. */
  chartId: string;
  /** The chart instance that is produced by AG Charts which can be used to interact with the chart directly. */
  chart: any;
  /** The chart DOM element, which the application is responsible for placing into the DOM. */
  chartElement: HTMLElement;
  /** The application is responsible for calling this when the chart is no longer needed. */
  destroyChart: () => void;
}

export interface GetDataPath {
  (data: any): string[];
}

export type ServerSideStoreType = 'full' | 'partial';

export interface ServerSideGroupLevelParams {
  /**
   * @deprecated
   * What store type to use.
   * If missing, then defaults to grid option `serverSideStoreType`.
   * Deprecated in favor of infiniteScroll.
   * If infiniteScroll==true, then Partial Store is used.
   * If infiniteScroll==false, then Full Store is used.
   *  */
  storeType?: ServerSideStoreType;
  /**
   * Whether to have infinite scroll active or not for the level.
   */
  infiniteScroll?: boolean;
  /**
   * For Infinite Scroll only.
   * How many blocks to keep in cache.
   * If missing, defaults to grid options `maxBlocksInCache`.
   */
  maxBlocksInCache?: number;
  /**
   * For Infinite Scroll only.
   * Cache block size.
   * If missing, defaults to grid options `cacheBlockSize`.
   */
  cacheBlockSize?: number;
}

export interface IsApplyServerSideTransaction {
  (params: IsApplyServerSideTransactionParams): boolean;
}

export interface IsServerSideGroup {
  (dataItem: any): boolean;
}

export interface GetServerSideGroupKey {
  (dataItem: any): string;
}

export interface GetRowNodeIdFunc {
  (data: any): string;
}

export interface GetRowIdFunc {
  (params: GetRowIdParams): string;
}

export interface IsRowSelectable {
  (node: RowNode): boolean;
}

export interface IsRowMaster {
  (dataItem: any): boolean;
}

export interface RowClassParams extends GridCommon {
  /** The data associated with this row from rowData. Data is `undefined` for row groups. */
  data: any | undefined;
  /** The RowNode associated with this row */
  node: RowNode;
  /** The index of the row */
  rowIndex: number;
}

export interface RowStyle {
  [cssProperty: string]: string | number;
}
