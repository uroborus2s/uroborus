export interface UChartThemePalette {
  /** The array of fills to be used. */
  fills: string[];
  /** The array of strokes to be used. */
  strokes: string[];
}

export interface UChartThemeOverrides {
  /** 指定所有笛卡尔图表的默认值(用于条形图、柱状图、直方图、折线、散点和面积系列) */
  cartesian?: UCartesianThemeOptions;
  /** 指定柱状图的默认设置。 */
  column?: UCartesianThemeOptions<UBarSeriesOptions>;
  /** 指定条形图的默认设置。 */
  bar?: UCartesianThemeOptions<UBarSeriesOptions>;
  /** 指定折线图的默认值。 */
  line?: UCartesianThemeOptions<ULineSeriesOptions>;
  /** 指定面积图的默认设置。 */
  area?: UCartesianThemeOptions<UAreaSeriesOptions>;
  /** 指定散点图/气泡图的默认值。 */
  scatter?: UCartesianThemeOptions<UScatterSeriesOptions>;
  /** 指定直方图的默认值。 */
  histogram?: UCartesianThemeOptions<UHistogramSeriesOptions>;

  /** 指定所有极轴图表的默认值(用于饼图系列) */
  polar?: UPolarThemeOptions;
  /** 指定饼图/圆环图的默认设置。 */
  pie?: UPolarThemeOptions<UPieSeriesOptions>;

  /** 指定所有层次结构图表的默认值(用于树状图系列) */
  hierarchy?: UHierarchyThemeOptions;
  /** Specifies defaults for all treemap charts. */
  treemap?: UHierarchyThemeOptions<UHierarchySeriesOptions>;

  /** Specifies defaults for all chart types. Be careful to only use properties that apply to all chart types here. For example, don't specify `navigator` configuration here as navigators are only available in cartesian charts. */
  common?: any;
}

export interface UChartThemeOptions {
  /** 要使用的调色板。如果指定，这将替换基本主题中的调色板。 */
  palette?: UChartThemePalette;
  /** 此对象的配置将合并到基本主题中指定的默认设置上。 */
  overrides?: UChartThemeOverrides;
}

/** 此对象用于定义自定义图表主题的配置。 */
export interface UChartTheme extends UChartThemeOptions {
  /**
   * 图表的基础配置主题CartesianSeriesTheme
   * 允许您使用`overrides`配置仅覆盖您希望更改的设置(如下所示).
   */
  baseTheme?: UChartThemeName; // | ChartTheme;
}

export interface UNavigatorMaskOptions {
  /** 蒙版使用的填充颜色。 */
  fill?: CssColor;
  /** 蒙版使用的笔触颜色。 */
  stroke?: CssColor;
  /** 蒙版使用的描边宽度。 */
  strokeWidth?: PixelSize;
  /** 遮罩填充的不透明度，在`[0，1]`区间内，其中‘0’实际上是无遮罩。 */
  fillOpacity?: Opacity;
}

export interface UNavigatorHandleOptions {
  /** 手柄使用的填充颜色。 */
  fill?: CssColor;
  /** 手柄使用的笔触颜色。 */
  stroke?: CssColor;
  /** 手柄使用的描边宽度。 */
  strokeWidth?: PixelSize;
  /** 手柄的宽度。 */
  width?: PixelSize;
  /** 手柄的高度。 */
  height?: PixelSize;
  /** 手柄的夹点线之间的距离。 */
  gripLineGap?: PixelSize;
  /** 手柄的夹点线的长度。 */
  gripLineLength?: PixelSize;
}

export interface UNavigatorOptions {
  /** 是否显示导航器。 */
  enabled?: boolean;
  /** 导航器的高度。 */
  height?: PixelSize;
  /** 导航器和底轴之间的距离。 */
  margin?: PixelSize;
  /** `[0，1]`区间中可见范围的开始。 */
  min?: number;
  /** `[0，1]`区间中可见范围的末尾。 */
  max?: number;
  /** 导航器的可见范围掩码的配置。 */
  mask?: UNavigatorMaskOptions;
  /** 导航器左手柄的配置。 */
  minHandle?: UNavigatorHandleOptions;
  /** 导航器右手柄的配置。 */
  maxHandle?: UNavigatorHandleOptions;
}

export interface UCartesianThemeOptions<S = UCartesianSeriesTheme>
  extends UBaseChartOptions {
  /** Axis configurations. */
  axes?: UCartesianAxesTheme;
  /** Series configurations. */
  series?: S;
  /** 图表导航器的配置。 */
  navigator?: UNavigatorOptions;
}

export interface UPolarThemeOptions<S = UPolarSeriesTheme>
  extends UBaseChartOptions {
  /** Series configurations. */
  series?: S;
}

export interface UHierarchyThemeOptions<S = UHierarchySeriesTheme>
  extends UBaseChartOptions {
  /** Series configurations. */
  series?: S;
}

export interface UCartesianSeriesTheme {
  line?: ULineSeriesOptions;
  scatter?: UScatterSeriesOptions;
  area?: UAreaSeriesOptions;
  bar?: UBarSeriesOptions;
  column?: UBarSeriesOptions;
  histogram?: UHistogramSeriesOptions;
}

export interface UPolarSeriesTheme {
  pie?: UPieSeriesOptions;
}

export interface UHierarchySeriesTheme {
  treemap?: UTreemapSeriesOptions;
}

/** Alias to denote that a value is a data value. */
export type DataValue = any;

export interface UCrossLineOptions {
  /** 是否显示交叉线。 */
  enabled?: boolean;
  /** 要渲染的交叉线类型。 */
  type: 'line' | 'range';
  /** 线条应定位的数据值。如果CrosLine类型为`line`，则使用此属性。 */
  value?: DataValue;
  /** 用于在所需图表区域显示线条的数据的值范围。此属性仅用于CrossLine类型`range`。 */
  range?: [DataValue, DataValue];
  /** 用于范围填充的颜色。 */
  fill?: CssColor;
  /** 范围的填充的不透明度。 */
  fillOpacity?: Opacity;
  /** 线条的笔触颜色。 */
  stroke?: CssColor;
  /** 线条笔触的宽度(以像素为单位)。 */
  strokeWidth?: PixelSize;
  /** 线条笔触的不透明度。 */
  strokeOpacity?: Opacity;
  /** 定义线条笔触的呈现方式。数组中的每个数字以像素为单位指定交替的虚线和间隙的长度。例如，`[6，3]`表示长度为`6`像素的破折号，间隔为`3`像素。 */
  lineDash?: PixelSize[];
  /** CrosLine标签的配置。 */
  label?: UCrossLineLabelOptions;
}

/** Configuration for pie/doughnut series. */
export interface UPieSeriesOptions extends UBaseSeriesOptions {
  type?: 'pie';
  /** 系列标题的配置。 */
  title?: UPieTitleOptions;
  /** 用于数据段的标签的配置。 */
  label?: UPieSeriesLabelOptions;
  /** 与线段标签一起使用的标注的配置。 */
  callout?: UPieSeriesCalloutOptions;
  /** 用于从数据中检索角度值的键。 */
  angleKey?: string;
  /** 角度值的人类可读描述。如果提供，它将作为参数之一传递给工具提示渲染器。 */
  angleName?: string;
  /** 用于从数据中检索半径值的键。 */
  radiusKey?: string;
  /** 半径值的人类可读描述。如果提供，它将作为参数之一传递给工具提示渲染器。 */
  radiusName?: string;
  /** 用于从数据中检索标签值的键。 */
  labelKey?: string;
  /** 标签值的人类可读描述。如果提供，它将作为参数之一传递给工具提示渲染器。 */
  labelName?: string;
  /** 为线段填充循环切换的颜色。 */
  fills?: CssColor[];
  /** 为线段的笔触循环显示的颜色。 */
  strokes?: CssColor[];
  /** 线段的填充的不透明度。 */
  fillOpacity?: Opacity;
  /** 线段的笔划的不透明度。 */
  strokeOpacity?: Opacity;
  /** 线段的笔触宽度(以像素为单位)。 */
  strokeWidth?: PixelSize;
  /** 定义饼图扇区笔划的渲染方式。数组中的每个数字以像素为单位指定交替的虚线和间隙的长度。例如，`[6，3]`表示长度为`6`像素的破折号，间隔为`3`像素。 */
  lineDash?: PixelSize[];
  /** 虚线的初始偏移量，以像素为单位。 */
  lineDashOffset?: PixelSize;
  /** 饼图系列的旋转度数。 */
  rotation?: number;
  /** 系列外半径的偏移量(以像素为单位)。用于构建甜甜圈图表。 */
  outerRadiusOffset?: PixelSize;
  /** 系列内半径的偏移量(以像素为单位)。用于构建甜甜圈图表。如果未给出该值，或者给出的值为零，则将呈现饼图。 */
  innerRadiusOffset?: PixelSize;
  /** 覆盖数据中自动确定的最小RadiusKey值。 */
  radiusMin?: number;
  /** 覆盖数据中自动确定的最大RadiusKey值。 */
  radiusMax?: number;
  /** 图表系列后面使用的阴影的配置。 */
  shadow?: UDropShadowOptions;
  /** 系列特定的工具提示配置。 */
  tooltip?: UPieSeriesTooltip;
  formatter?: (params: UPieSeriesFormatterParams) => UPieSeriesFormat;
}

export interface UTreemapSeriesLabelOptions extends UChartLabelOptions {
  /** 为标签保留的平铺垂直空间量。 */
  padding?: number;
}

export interface UTreemapNodeDatum {
  datum: any;
  parent?: UTreemapNodeDatum;
  children?: UTreemapNodeDatum[];
  depth: number;
  colorValue: number;
  fill: CssColor;
  label: string;
  hasTitle: boolean;
}

export interface UTreemapSeriesTooltipRendererParams {
  datum: UTreemapNodeDatum;
  sizeKey: string;
  labelKey: string;
  valueKey: string;
  color: string;
}

export interface UTreemapSeriesTooltip extends USeriesTooltip {
  /** Function used to create the content for tooltips. */
  renderer?: (
    params: UTreemapSeriesTooltipRendererParams,
  ) => string | UTooltipRendererResult;
}

export interface UTreemapSeriesLabelsOptions {
  /** The label configuration for the large leaf tiles. */
  large?: UChartLabelOptions;
  /** The label configuration for the medium-sized leaf tiles. */
  medium?: UChartLabelOptions;
  /** The label configuration for the small leaf tiles. */
  small?: UChartLabelOptions;
  /** The configuration for the labels showing the value of the 'colorKey'. */
  color?: UChartLabelOptions;
}

/** Configuration for the treemap series. */
export interface UTreemapSeriesOptions extends UBaseSeriesOptions {
  type?: 'treemap';
  /** 顶层平铺的标签配置。 */
  title?: UTreemapSeriesLabelOptions;
  /** 顶级父瓷砖的子级的标签配置。 */
  subtitle?: UTreemapSeriesLabelOptions;
  /** 磁贴标签的配置。 */
  labels?: UTreemapSeriesLabelsOptions;
  /** 包含标签的节点键的名称。 */
  labelKey?: string;
  /** 包含大小值的节点键的名称。 */
  sizeKey?: string;
  /** 包含颜色值的节点键的名称。该值(与`ColorDomain`和`ColorRange`配置一起)将用于确定瓷砖的颜色。 */
  colorKey?: string;
  /** “ColorKey”值所属的域。域名可以包含两个以上的STOP，例如`[-5，0，-5]`。在这种情况下，‘ColorRange’也应该使用匹配数量的颜色。 */
  colorDomain?: number[];
  /** 要插入数值`ColorDomain`的颜色范围。例如，如果`ColorDomain`是`[-5，5]`，`ororRange`是`[‘red’，‘green’]`，则`-5`的`ColorKey`值为‘red’，`5`-‘green’，`0`为‘red’和‘green’的混合色。 */
  colorRange?: string[];
  /** 是否根据“ColorKey”将颜色分配给非叶节点。 */
  colorParents?: boolean;
  /** 系列特定的工具提示配置。 */
  tooltip?: UTreemapSeriesTooltip;
  /** 每个树状图块内部的填充量(以像素为单位)。增加`nodePadding`会为父标签预留更多空间。 */
  nodePadding?: PixelSize;
  /** 是否对树状贴图瓷砖使用渐变。 */
  gradient?: boolean;
}

export type UHierarchySeriesOptions = UTreemapSeriesOptions;

export type UCrossLineLabelPosition =
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'inside'
  | 'insideLeft'
  | 'insideRight'
  | 'insideTop'
  | 'insideBottom'
  | 'insideTopLeft'
  | 'insideBottomLeft'
  | 'insideTopRight'
  | 'insideBottomRight';

export interface UCrossLineLabelOptions {
  /** 是否显示交叉线标签。 */
  enabled?: boolean;
  /** 要在标签中显示的文本。 */
  text?: string;
  /** 用于标签的字体样式。 */
  fontStyle?: FontStyle;
  /** 用于标签的字体粗细。 */
  fontWeight?: FontWeight;
  /** 用于标签的字体大小(以像素为单位)。 */
  fontSize?: FontSize;
  /** 用于标签的字体系列。 */
  fontFamily?: FontFamily;
  /** 在标签和交叉线边缘之间填充像素。 */
  padding?: PixelSize;
  /** 标签使用的颜色。 */
  color?: CssColor;
  /** 交叉线标签的位置。 */
  position?: UCrossLineLabelPosition;
  /** 交叉线标签的旋转度数。 */
  rotation?: number;
}

export interface UAxisGridStyle {
  /** 网格线的颜色。 */
  stroke?: CssColor;
  /** 定义如何呈现网格线。数组中的每个数字以像素为单位指定交替的虚线和间隙的长度。例如，`[6，3]`表示长度为`6`像素的破折号，间隔为`3`像素。 */
  lineDash?: PixelSize[];
}

export interface UAxisLabelFormatterParams {
  readonly value: any;
  readonly index: number;
  readonly fractionDigits?: number;
  readonly formatter?: (x: any) => string;
}

export interface UAxisLabelOptions {
  /** 用于标签的字体样式。 */
  fontStyle?: FontStyle;
  /** 用于标签的字体粗细。 */
  fontWeight?: FontWeight;
  /** 用于标签的字体大小(以像素为单位)。 */
  fontSize?: FontSize;
  /** 用于标签的字体系列 */
  fontFamily?: FontFamily;
  /** 在轴标签和刻度之间填充像素。 */
  padding?: PixelSize;
  /** 用于标签的颜色 */
  color?: CssColor;
  /** 轴标签的旋转度数。注：对于综合图表，默认值为335度，除非轴显示分组或默认类别(索引)。分组类别轴中的第一行标签垂直于轴线旋转。 */
  rotation?: number;
  /** 如果指定了轴标签，并且轴标签可能会发生冲突，则会旋转这些轴标签，以便它们以提供的角度定位。默认情况下，该选项为类别启用。如果指定了`Rotation`属性，则它优先。 */
  autoRotate?: boolean;
  /** 如果启用了自动旋转，则指定激活自动旋转时要使用的旋转角度。如果未指定，则默认为335度的角度。 */
  autoRotateAngle?: number;
  // mirrored?: boolean;
  // parallel?: boolean;
  /** 呈现时间轴标签时使用的格式字符串。 */
  format?: string;
  /** 用于呈现轴标签的函数。如果`value`为数字，则还会提供`fractionDigits`，表示在刻度之间的步长中使用的小数位数；例如，刻度步长`0.0005`将`fractionDigits`设置为`4` */
  formatter?: (params: UAxisLabelFormatterParams) => string | undefined;
}

export type UCartesianAxisPosition = 'top' | 'right' | 'bottom' | 'left';

export interface UAxisLineOptions {
  /** 轴线的宽度，以像素为单位。 */
  width?: PixelSize;
  /** 轴线的颜色。 */
  color?: CssColor;
}

export interface UBaseAxisOptions {
  keys?: string[];
  /** 如果设置为非零值，则无论标签大小如何，轴都将具有指定的厚度。 */
  thickness?: PixelSize;
}

/** Configuration for axes in cartesian charts. */
export interface UBaseCartesianAxisOptions extends UBaseAxisOptions {
  /** 图表上应呈现轴的位置。 */
  position?: UCartesianAxisPosition;
  /** 轴旁边显示的标题的配置。 */
  title?: UChartCaptionOptions;
  /** 轴线的配置。 */
  line?: UAxisLineOptions;
  /** 轴标签的配置，显示在记号旁边。 */
  label?: UAxisLabelOptions;
  /** 用于在图表区中形成网格的线条的配置。 */
  gridStyle?: UAxisGridStyle[];
  /** 添加与数据值对应的交叉线或区域。 */
  crossLines?: UCrossLineOptions[];
}

export interface UAxisBaseTickOptions {
  /** 轴的宽度(以像素为单位)(以及相应的网格线)。 */
  width?: PixelSize;
  /** 轴的长度(以像素为单位)。 */
  size?: PixelSize;
  /** The colour of the axis ticks. */
  color?: CssColor;
}

export interface UAxisNumberTickOptions extends UAxisBaseTickOptions {
  /** 提示在一条轴上使用多少刻度。
   * 不保证轴完全使用此刻度数，但会尝试使用接近给定数的刻度数。
   */
  count?: number;
}

export interface UAxisTimeTickOptions extends UAxisBaseTickOptions {
  /** 提示在一条轴上使用多少刻度。
   * 不保证轴完全使用此刻度数，但会尝试使用接近给定数的刻度数。
   * 可以使用`agCharts.time`命名空间中的以下间隔：
   * `millisecond, second, minute, hour, day, sunday, monday, tuesday, wednesday, thursday, friday, saturday, month, year, utcMinute, utcHour, utcDay, utcMonth, utcYear`. */
  count?: any;
}

type UCartesianAxisThemeSpecialOptions = 'position' | 'type' | 'crossLines';
/** 这是所有类型的轴共享的配置。 */
export interface UCartesianAxisThemeOptions<T> {
  /** 具有轴主题的对象将覆盖定位在`top`轴上的对象。此处的配置与上一级别的配置相同。例如，要将标签在‘top’定位轴上旋转45度，可以使用`top：{Label：{Rotation：45}}}`。 */
  top?: Omit<T, UCartesianAxisThemeSpecialOptions>;
  /** 具有轴主题的对象将覆盖位于`right‘位置的轴。此处的配置与上一级别的配置相同。 */
  right?: Omit<T, UCartesianAxisThemeSpecialOptions>;
  /** 具有轴主题的对象将覆盖定位于`Bottom‘的轴。此处的配置与上一级别的配置相同。 */
  bottom?: Omit<T, UCartesianAxisThemeSpecialOptions>;
  /** 具有轴主题的对象将覆盖定位在`left‘中的轴。此处的配置与上一级别的配置相同。 */
  left?: Omit<T, UCartesianAxisThemeSpecialOptions>;
}

export interface UNumberAxisOptions extends UBaseCartesianAxisOptions {
  type: 'number';
  /** If 'true', the range will be rounded up to ensure nice equal spacing between the ticks. */
  nice?: boolean;
  /** User override for the automatically determined min value (based on series data). */
  min?: number;
  /** User override for the automatically determined max value (based on series data). */
  max?: number;
  /** Configuration for the axis ticks. */
  tick?: UAxisNumberTickOptions;
}

export type UCrossLineThemeOptions = Omit<UCrossLineOptions, 'type'>;

export interface UCartesianAxesCrossLineThemeOptions {
  crossLines?: UCrossLineThemeOptions;
}

export interface UGroupedCategoryAxisOptions extends UBaseCartesianAxisOptions {
  type: 'groupedCategory';
  /** Configuration for the axis ticks. */
  tick?: UAxisNumberTickOptions;
}

export interface UTimeAxisOptions extends UBaseCartesianAxisOptions {
  type: 'time';
  /** If 'true', the range will be rounded up to ensure nice equal spacing between the ticks. */
  nice?: boolean;
  /** Configuration for the axis ticks. */
  tick?: UAxisTimeTickOptions;
}

export interface ULogAxisOptions extends UBaseCartesianAxisOptions {
  type: 'log';
  /** 如果为‘True’，则范围将向上舍入，以确保刻度之间的均匀间距。 */
  nice?: boolean;
  /** 自动确定的最小值的用户覆盖(基于系列数据)。 */
  min?: number;
  /** 自动确定的最大值的用户覆盖(基于系列数据)。 */
  max?: number;
  /** 所用对数的底数。 */
  base?: number;
  /** 轴刻度的配置。 */
  tick?: UAxisNumberTickOptions;
}

export interface UCategoryAxisOptions extends UBaseCartesianAxisOptions {
  type: 'category';
  paddingInner?: number;
  paddingOuter?: number;
  /** Configuration for the axis ticks. */
  tick?: UAxisNumberTickOptions;
}

export interface UNumberAxisThemeOptions
  extends Omit<UNumberAxisOptions, 'type' | 'crossLines'>,
    UCartesianAxisThemeOptions<UNumberAxisOptions>,
    UCartesianAxesCrossLineThemeOptions {}

export interface ULogAxisThemeOptions
  extends Omit<ULogAxisOptions, 'type' | 'crossLines'>,
    UCartesianAxisThemeOptions<ULogAxisOptions>,
    UCartesianAxesCrossLineThemeOptions {}

export interface UCategoryAxisThemeOptions
  extends Omit<UCategoryAxisOptions, 'type' | 'crossLines'>,
    UCartesianAxisThemeOptions<UCategoryAxisOptions>,
    UCartesianAxesCrossLineThemeOptions {}

export interface UGroupedCategoryAxisThemeOptions
  extends Omit<UGroupedCategoryAxisOptions, 'type' | 'crossLines'>,
    UCartesianAxisThemeOptions<UGroupedCategoryAxisOptions>,
    UCartesianAxesCrossLineThemeOptions {}

export interface UTimeAxisThemeOptions
  extends Omit<UTimeAxisOptions, 'type' | 'crossLines'>,
    UCartesianAxisThemeOptions<UTimeAxisOptions>,
    UCartesianAxesCrossLineThemeOptions {}

export interface UCartesianAxesTheme {
  /** 这使用特定于数字轴的选项扩展了公用轴配置。 */
  number?: UNumberAxisThemeOptions;
  /** 这使用特定于数字轴的选项扩展了公用轴配置。 */
  log?: ULogAxisThemeOptions;
  /** 这使用特定于类别轴的选项扩展了公用轴配置。 */
  category?: UCategoryAxisThemeOptions;
  /** 这使用特定于分组类别轴的选项扩展了公共轴配置。目前，除了通用配置之外，没有其他选项。 */
  groupedCategory?: UGroupedCategoryAxisThemeOptions;
  /** 这使用特定于时间轴的选项扩展了公用轴配置。 */
  time?: UTimeAxisThemeOptions;
}

/** Configuration for line series. */
export interface ULineSeriesOptions extends UBaseSeriesOptions {
  type?: 'line';
  marker?: UCartesianSeriesMarker;
  /** 用于从数据中检索x值的键。 */
  xKey?: string;
  /** 用于从数据中检索y值的键。 */
  yKey?: string;
  /** X值的人类可读描述。如果提供，它将显示在默认工具提示中，并作为参数之一传递给工具提示渲染器。 */
  xName?: string;
  /** Y值的人类可读描述。如果提供，它将显示在默认工具提示中，并作为参数之一传递给工具提示渲染器。 */
  yName?: string;
  /** 要用于该系列的标题。如果存在则默认为`yName`，如果不存在则默认为`yKey`。 */
  title?: string;
  /** 线条的笔触颜色。 */
  stroke?: CssColor;
  /** 线条笔触的宽度(以像素为单位)。 */
  strokeWidth?: PixelSize;
  /** 线条笔触的不透明度。 */
  strokeOpacity?: Opacity;
  /** 定义线条笔触的呈现方式。数组中的每个数字以像素为单位指定交替的虚线和间隙的长度。例如，`[6，3]`表示长度为`6`像素的破折号，间隔为`3`像素。 */
  lineDash?: PixelSize[];
  /** 虚线的初始偏移量，以像素为单位。 */
  lineDashOffset?: PixelSize;
  /** 数据点顶部显示的标签的配置。 */
  label?: ULineSeriesLabelOptions;
  /** 系列特定的工具提示配置。 */
  tooltip?: ULineSeriesTooltip;
}

export type UScatterSeriesLabelOptions = UChartLabelOptions;

export interface UScatterSeriesMarker extends UCartesianSeriesMarker {
  /** If sizeKey is used, explicitly specifies the extent of the domain of it's values. */
  domain?: [number, number];
}

export interface UScatterSeriesTooltipRendererParams
  extends UCartesianSeriesTooltipRendererParams {
  readonly sizeKey?: string;
  readonly sizeName?: string;

  readonly labelKey?: string;
  readonly labelName?: string;
}

export interface UScatterSeriesTooltip extends USeriesTooltip {
  /** Function used to create the content for tooltips. */
  renderer?: (
    params: UScatterSeriesTooltipRendererParams,
  ) => string | UTooltipRendererResult;
}

/** Configuration for scatter/bubble series. */
export interface UScatterSeriesOptions extends UBaseSeriesOptions {
  /** 树状地图系列的配置。 */
  type?: 'scatter';
  /** 系列中使用的标记的配置。 */
  marker?: UScatterSeriesMarker;
  /** 数据点顶部显示的标签的配置。 */
  label?: UScatterSeriesLabelOptions;
  /** 用于从数据中检索x值的键。 */
  xKey?: string;
  /** 用于从数据中检索y值的键。 */
  yKey?: string;
  /** X值的人类可读描述。如果提供，它将显示在默认工具提示中，并作为参数之一传递给工具提示渲染器。 */
  xName?: string;
  /** Y值的人类可读描述。如果提供，它将显示在默认工具提示中，并作为参数之一传递给工具提示渲染器。 */
  yName?: string;
  /** 用于从数据中检索尺寸值的键，用于控制气泡图中标记的大小。 */
  sizeKey?: string;
  /** 大小值的人类可读描述。如果提供，它将显示在默认工具提示中，并作为参数之一传递给工具提示渲染器。 */
  sizeName?: string;
  /** 用于从数据中检索值以用作标记的标签的键。 */
  labelKey?: string;
  /** 标签值的人类可读描述。如果提供，它将显示在默认工具提示中，并作为参数之一传递给工具提示渲染器。 */
  labelName?: string;
  /** 要用于该系列的标题。如果存在则默认为`yName`，如果不存在则默认为`yKey`。 */
  title?: string;
  /** 系列特定的工具提示配置。 */
  tooltip?: UScatterSeriesTooltip;
}

export type UAreaSeriesMarker = UCartesianSeriesMarker;

export interface UDropShadowOptions {
  /** 无论阴影是否可见。 */
  enabled?: boolean;
  /** 阴影的颜色。 */
  color?: CssColor;
  /** 阴影的水平偏移(以像素为单位)。 */
  xOffset?: PixelSize;
  /** 阴影的垂直偏移(以像素为单位)。 */
  yOffset?: PixelSize;
  /** 阴影的模糊半径，以像素为单位。 */
  blur?: PixelSize;
}

export interface UAreaSeriesLabelOptions extends UChartLabelOptions {
  /** Function used to turn 'yKey' values into text to be displayed by a label. By default the values are simply stringified. */
  formatter?: (params: { value: any }) => string;
}

export interface UAreaSeriesTooltip extends USeriesTooltip {
  renderer?: (
    params: UCartesianSeriesTooltipRendererParams,
  ) => string | UTooltipRendererResult;
  format?: string;
}

/** Configuration for area series. */
export interface UAreaSeriesOptions extends UBaseSeriesOptions {
  type?: 'area';
  /** 系列中使用的标记的配置  */
  marker?: UAreaSeriesMarker;
  /** 要将区域堆叠正常化到的数字。例如，如果`NormizedTo`设置为`100`，则所有堆栈都会按比例缩放，因此它们的总高度始终为100。 */
  normalizedTo?: number;
  /** 用于从数据中检索x值的键。 */
  xKey?: string;
  /** 用于从数据中检索y值的键。 */
  yKey?: string;
  /** X值的人类可读描述。如果提供，它将显示在默认工具提示中，并作为参数之一传递给工具提示渲染器。 */
  xName?: string;
  yName?: string;
  /** 用于该区域填充的颜色。 */
  fill?: CssColor;
  /** 用于区域描边的颜色。 */
  stroke?: CssColor;
  /** 区域笔触的宽度(以像素为单位)。 */
  strokeWidth?: PixelSize;
  /** 该区域的填充的不透明度。 */
  fillOpacity?: Opacity;
  /** 区域笔划的不透明度。 */
  strokeOpacity?: Opacity;
  /** 定义区域笔划的渲染方式。数组中的每个数字以像素为单位指定交替的虚线和间隙的长度。例如，`[6，3]`表示长度为`6`像素的破折号，间隔为`3`像素。 */
  lineDash?: PixelSize[];
  /** 虚线的初始偏移量，以像素为单位。 */
  lineDashOffset?: PixelSize;
  /** 图表系列后面使用的阴影的配置。 */
  shadow?: UDropShadowOptions;
  /** 数据点顶部显示的标签的配置。 */
  label?: UAreaSeriesLabelOptions;
  /** 系列特定的工具提示配置。 */
  tooltip?: UAreaSeriesTooltip;
  stacked?: boolean;
}

export interface UBarSeriesLabelOptions extends UChartLabelOptions {
  /** 用于将‘yKey’值转换为要由标签显示的文本的函数。默认情况下，这些值只是字符串形式。 */
  formatter?: (params: { value: number }) => string;
  /** 相对于线段呈现系列标签的位置。 */
  placement?: 'inside' | 'outside';
}

export interface UBarSeriesTooltip extends USeriesTooltip {
  /** 用于创建工具提示内容的函数。 */
  renderer?: (
    params: UCartesianSeriesTooltipRendererParams,
  ) => string | UTooltipRendererResult;
}

export interface UBarSeriesFormatterParams {
  readonly datum: any;
  readonly fill?: CssColor;
  readonly stroke?: CssColor;
  readonly strokeWidth: PixelSize;
  readonly highlighted: boolean;
  readonly xKey: string;
  readonly yKey: string;
}

export interface UBarSeriesFormat {
  fill?: CssColor;
  stroke?: CssColor;
  strokeWidth?: PixelSize;
}

/** Configuration for bar/column series. */
export interface UBarSeriesOptions extends UBaseSeriesOptions {
  type?: 'bar' | 'column';
  /** 是否将不同的y值显示为单独的条形图(分组)或不显示(堆叠)。 */
  grouped?: boolean;
  stacked?: boolean;
  /** 要将堆叠正常化到的数字。当`groued`为`true`时不起作用。例如，如果`NormizedTo`设置为`100`，则条形图堆栈将全部按比例缩放，每个条形图堆栈的总和为100。 */
  normalizedTo?: number;
  /** 用于从数据中检索x值的键。 */
  xKey?: string;
  /** 用于从数据中检索y值的键。 */
  yKey?: string;
  /** X值的人类可读描述。如果提供，它将显示在默认工具提示中，并作为参数之一传递给工具提示渲染器。 */
  xName?: string;
  /** Y值的人类可读描述。如果提供，默认工具提示中将显示对应的`yName`，并将其作为参数之一传递给工具提示呈现器。 */
  yName?: string;
  flipXY?: boolean;
  /** 用于该区域填充的颜色。 */
  fill?: CssColor;
  /** 用于条的笔触的颜色。 */
  stroke?: CssColor;
  /** 条的笔触宽度(以像素为单位)。 */
  strokeWidth?: PixelSize;
  /** 栏的填充物的不透明度。 */
  fillOpacity?: Opacity;
  /** 横杆的笔划不透明。 */
  strokeOpacity?: Opacity;
  /** 定义条/列描边的呈现方式。数组中的每个数字以像素为单位指定交替的虚线和间隙的长度。例如，`[6，3]`表示长度为`6`像素的破折号，间隔为`3`像素。 */
  lineDash?: PixelSize[];
  /** 虚线的初始偏移量，以像素为单位。 */
  lineDashOffset?: PixelSize;
  /** 图表系列后面使用的阴影的配置。 */
  shadow?: UDropShadowOptions;
  /** 条形图上显示的标签的配置。 */
  label?: UBarSeriesLabelOptions;
  /** 系列特定的工具提示配置。 */
  tooltip?: UBarSeriesTooltip;
  /** 该函数用于根据给定的参数返回各个条形/列的格式。如果当前条/栏突出显示，则`Highlight ted`属性将设置为`true`；如果要区分突出显示的状态和未突出显示的状态，请确保选中此项。 */
  formatter?: (params: UBarSeriesFormatterParams) => UBarSeriesFormat;
}

export interface UHistogramSeriesLabelOptions extends UChartLabelOptions {
  /** 用于将‘yKey’值转换为要由标签显示的文本的函数。默认情况下，这些值只是字符串形式。 */
  formatter?: (params: { value: number }) => string;
}

export interface UHistogramSeriesTooltip extends USeriesTooltip {
  /** 用于创建工具提示内容的函数。 */
  renderer?: (
    params: UCartesianSeriesTooltipRendererParams,
  ) => string | UTooltipRendererResult;
}

/** Configuration for histogram series. */
export interface UHistogramSeriesOptions extends UBaseSeriesOptions {
  type?: 'histogram';
  /** 直方图条的填充颜色。 */
  fill?: CssColor;
  /** 直方图条的笔触颜色。 */
  stroke?: CssColor;
  /** 直方图条的填充的不透明度。 */
  fillOpacity?: Opacity;
  /** 直方图条的笔触的不透明度。 */
  strokeOpacity?: Opacity;
  /** 直方图条的笔划宽度(以像素为单位)。 */
  strokeWidth?: PixelSize;
  /** 定义如何呈现列笔触。数组中的每个数字以像素为单位指定交替的虚线和间隙的长度。例如，`[6，3]`表示长度为`6`像素的破折号，间隔为`3`像素。 */
  lineDash?: PixelSize[];
  /** 虚线的初始偏移量，以像素为单位。 */
  lineDashOffset?: PixelSize;
  /** 用于从数据中检索x值的键。 */
  xKey?: string;
  /** X值的人类可读描述。如果提供，它将显示在默认工具提示中，并作为参数之一传递给工具提示渲染器。 */
  xName?: string;
  /** 用于从数据中检索y值的键。 */
  yKey?: string;
  /** Y值的人类可读描述。如果提供，它将显示在默认工具提示中，并作为参数之一传递给工具提示渲染器。 */
  yName?: string;
  /** 对于可变宽度的存储箱，如果为真，则直方图将使用条形图的面积表示聚合的`yKey`值。否则，var的高度表示正常条形图中的值。这对于在使用可变宽度存储箱时保持显示不失真的曲线非常有用。 */
  areaPlot?: boolean;
  /** 明确设置垃圾箱。垃圾箱不必具有相同的宽度。与`binCount`设置冲突。 */
  bins?: [number, number][];
  /** 要尝试将x轴拆分成的箱数。与`bins`设置冲突。 */
  binCount?: number;
  /** 指示如何聚合回收箱。如果设置为‘sum’，则为垃圾箱显示的值将是yKey值的总和。如果设置为‘Mean’，它将显示垃圾箱的平均yKey值。 */
  aggregation?: 'count' | 'sum' | 'mean';
  /** 图表系列后面使用的阴影的配置。 */
  shadow?: UDropShadowOptions;
  /** 条形图上显示的标签的配置。 */
  label?: UHistogramSeriesLabelOptions;
  /** 系列特定的工具提示配置。 */
  tooltip?: UHistogramSeriesTooltip;
}

export type FontStyle = 'normal' | 'italic' | 'oblique';

export type FontWeight =
  | 'normal'
  | 'bold'
  | 'bolder'
  | 'lighter'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

export type FontFamily = string;

export type FontSize = number;

export interface UChartLabelOptions {
  /** 是否应显示标签。 */
  enabled?: boolean;
  /** 用于标签的字体样式。 */
  fontStyle?: FontStyle;
  /** 用于标签的字体粗细。 */
  fontWeight?: FontWeight;
  /** 用于标签的字体大小(以像素为单位)。 */
  fontSize?: FontSize;
  /** 用于标签的字体系列。 */
  fontFamily?: FontFamily;
  /** 标签使用的颜色。 */
  color?: CssColor;
}

export interface USeriesMarkerFormatterParams {
  datum: any;
  fill?: CssColor;
  stroke?: CssColor;
  strokeWidth: PixelSize;
  size: number;
  highlighted: boolean;
}

export interface UCartesianSeriesMarkerFormatterParams
  extends USeriesMarkerFormatterParams {
  xKey: string;
  yKey: string;
}

export interface UCartesianSeriesMarkerFormat {
  fill?: CssColor;
  stroke?: CssColor;
  strokeWidth?: PixelSize;
  size?: PixelSize;
}

export interface UTooltipRendererResult {
  title?: string;
  content?: string;
}

export interface USeriesTooltipRendererParams {
  readonly datum: any;
  readonly title?: string;
  readonly color?: CssColor;
}

export interface UCartesianSeriesTooltipRendererParams
  extends USeriesTooltipRendererParams {
  readonly xKey: string;
  readonly xValue?: any;
  readonly xName?: string;

  readonly yKey: string;
  readonly yValue?: any;
  readonly yName?: string;
}

export interface UPolarSeriesTooltipRendererParams
  extends USeriesTooltipRendererParams {
  readonly angleKey: string;
  readonly angleValue?: any;
  readonly angleName?: string;

  readonly radiusKey?: string;
  readonly radiusValue?: any;
  readonly radiusName?: string;
}

export interface UPieSeriesTooltipRendererParams
  extends UPolarSeriesTooltipRendererParams {
  labelKey?: string;
  labelName?: string;
}

export interface USeriesTooltip {
  /** 将鼠标悬停在系列上时是否显示工具提示。 */
  enabled?: boolean;
}

export interface ULineSeriesTooltip extends USeriesTooltip {
  /** 用于创建工具提示内容的函数。 */
  renderer?: (
    params: UCartesianSeriesTooltipRendererParams,
  ) => string | UTooltipRendererResult;
  format?: string;
}

export interface ULineSeriesLabelOptions extends UChartLabelOptions {
  /** 用于将‘yKey’值转换为要由标签显示的文本的函数。默认情况下，这些值只是字符串形式。 */
  formatter?: (params: { value: any }) => string;
}

export type UCartesianSeriesMarkerFormatter = (
  params: UCartesianSeriesMarkerFormatterParams,
) => UCartesianSeriesMarkerFormat | undefined;

export interface UCartesianSeriesMarker extends USeriesMarker {
  /** 用于根据提供的信息返回单个标记的格式设置的函数。如果当前标记被突出显示，则`Highlight ted`属性将被设置为`true`；如果要区分突出显示和未突出显示的状态，请确保选中此选项。 */
  formatter?: UCartesianSeriesMarkerFormatter;
}

export interface UBaseSeriesOptions {
  /** 呈现序列时要使用的数据。如果未提供此选项，则必须改为在图表上设置数据。 */
  data?: any[];
  /** 是否显示该系列。 */
  visible?: boolean;
  /** 是否将该系列包括在图例中。 */
  showInLegend?: boolean;
  /** 用于悬停区域标记的光标。此配置与css`cursor`属性相同。 */
  cursor?: string;
  /** 事件名称到事件侦听器的映射。 */
  listeners?: UBaseSeriesListeners | { [key: string]: (args: unknown) => void };
  /** 将鼠标悬停在标记/数据点或图例项上时，系列标记和系列线突出显示的配置。 */
  highlightStyle?: USeriesHighlightSeriesStyle;
}

export interface UBaseSeriesListeners {
  /** 单击系列中的节点(标记、列、条形图、平铺或饼图切片)时要调用的侦听器。 */
  nodeClick: (params: {
    type: 'nodeClick';
    series: any;
    datum: any;
    xKey: string;
    yKey: string;
  }) => any;
}

/** Alias表示值反映[0，1]范围内的Alpha不透明度。 */
export type Opacity = number;

/** Alias表示值是以像素为单位的度量值。 */
export type PixelSize = number;

export interface USeriesHighlightSeriesStyle {
  enabled?: boolean;
  /** 当通过悬停数据点或图例项来突出显示同一区域系列中的另一个图表系列或另一个堆栈级别时，整个系列(区域线、区域填充、标签和标记，如果有)的不透明度。使用`unfined`或`1`表示不调光。 */
  dimOpacity?: Opacity;
  /** 当其中一个标记被点击或悬停时，或者当显示数据点的工具提示时(即使系列标记被禁用)，面积线的描边宽度。如果不突出显示，则使用`unfined`。 */
  strokeWidth?: PixelSize;
}

export type MarkerShape =
  | 'circle'
  | 'cross'
  | 'diamond'
  | 'heart'
  | 'plus'
  | 'triangle'
  | any;

/** 别名，表示一个值必须是符合css的颜色串，如`#FFFFFF`或`rgb(255,255,255)`或`White`。 */
export type CssColor = string;

export interface USeriesMarker {
  /** 是否显示记号。 */
  enabled?: boolean;
  /** 用于标记的形状。您也可以通过提供`Marker`子类来提供自定义标记。 */
  shape?: MarkerShape;
  /** 以像素为单位的标记大小。 */
  size?: PixelSize;
  /** 对于标记的大小由数据确定的系列，这决定了标记可以以像素为单位的最大大小。 */
  maxSize?: PixelSize;
  /** 用于标记填充的颜色。如果未指定此项，则标记将从系列中获取填充。 */
  fill?: CssColor;
  /** 标记填充的不透明度。 */
  fillOpacity?: Opacity;
  /** 用于标记笔划的颜色。如果未指定此项，则标记将从系列中提取笔划。 */
  stroke?: CssColor;
  /** 标记笔触的宽度(像素)。如果未指定此项，则标记将从系列中获取其描边宽度。 */
  strokeWidth?: PixelSize;
  /** 标记笔划的不透明度。 */
  strokeOpacity?: Opacity;
}

export interface UChartPaddingOptions {
  /** 图表区域顶部的填充像素数。 */
  top?: PixelSize;
  /** 图表区域右侧填充的像素数。 */
  right?: PixelSize;
  /** 图表区域底部的填充像素数。 */
  bottom?: PixelSize;
  /** 图表区域左侧填充的像素数。 */
  left?: PixelSize;
}

export interface UChartBackground {
  /** 背景是否应该可见。 */
  visible?: boolean;
  /** 图表背景的颜色。 */
  fill?: CssColor;
}

export interface UChartCaptionOptions {
  /** 是否应显示标题。 */
  enabled?: boolean;
  /** 要在标题中显示的文本。 */
  text?: string;
  /** 用于标题的字体样式。 */
  fontStyle?: FontStyle;
  /** 用于标题的字体粗细。 */
  fontWeight?: FontWeight;
  /** 用于标题的字体大小(以像素为单位)。 */
  fontSize?: FontSize;
  /** 用于标题的字体系列。 */
  fontFamily?: FontFamily;
  /** 用于标题的颜色。 */
  color?: CssColor;
}

export interface UChartTooltipOptions {
  /** 设置为False可禁用图表中所有系列的工具提示。 */
  enabled?: boolean;
  /** 要添加到图表的工具提示元素的类名。 */
  class?: string;
  /** 如果为True，则对于带有标记的系列，工具提示将显示在最接近的标记处。 */
  tracking?: boolean;
  /** 显示工具提示的时间间隔(以毫秒为单位)。 */
  delay?: number;
}

export type UChartLegendPosition = 'top' | 'right' | 'bottom' | 'left';

export interface UChartLegendMarkerOptions {
  /** 图例中标记的大小(像素)。 */
  size?: PixelSize;
  /** 如果设置，将覆盖系列中的标记形状，图例将改为显示指定的标记形状。如果未设置，将使用与系列中的形状匹配的标记形状，如果没有，则回退到`‘正方形’‘。 */
  shape?: MarkerShape;
  /** 图例标记和相应标签之间以像素为单位的填充。 */
  padding?: PixelSize;
  /** 图例中标记的笔触宽度(以像素为单位)。 */
  strokeWidth?: PixelSize;
}

export interface UChartLegendLabelOptions {
  /** 如果标签文本超过最大长度，它将被截断，并将附加一个省略号来指示这一点。 */
  maxLength?: number;
  /** 文本的颜色。 */
  color?: CssColor;
  /** 用于图例的字体样式。 */
  fontStyle?: FontStyle;
  /** 用于图例的字体粗细。 */
  fontWeight?: FontWeight;
  /** 图例使用的字体大小(以像素为单位)。 */
  fontSize?: FontSize;
  /** 用于图例的字体系列。 */
  fontFamily?: FontFamily;
  /** 用于呈现图例标签的函数。其中`id`为系列ID，`itemId`为系列内的组件ID，如域名或条目索引。 */
  formatter?: (id: string, itemId: any, value: string) => string;
}

export interface UChartLegendItemOptions {
  /** 图例标记的配置。 */
  marker?: UChartLegendMarkerOptions;
  /** 图例标签的配置。 */
  label?: UChartLegendLabelOptions;
  /** 用于约束图例项的宽度。 */
  maxWidth?: PixelSize;
  /** 图例项之间使用的水平间距(以像素为单位)。 */
  paddingX?: PixelSize;
  /** 图例项之间使用的垂直间距(以像素为单位)。 */
  paddingY?: PixelSize;
}

export interface UChartLegendClickEvent {
  /** 图例项ID-基于系列ID。 */
  itemId: string;
  /** 图例项当前是否已启用。 */
  enabled: boolean;
}

export interface UPieTitleOptions extends UChartCaptionOptions {
  showInLegend?: boolean;
}

export interface UPieSeriesLabelOptions extends UChartLabelOptions {
  /** 标注线和标签文本之间的距离(以像素为单位)。 */
  offset?: PixelSize;
  /** 线段显示标签所需的最小角度(以度为单位)。 */
  minAngle?: number;
}

export interface UPieSeriesFormatterParams {
  readonly datum: any;
  readonly fill?: CssColor;
  readonly stroke?: CssColor;
  readonly strokeWidth: PixelSize;
  readonly highlighted: boolean;
  readonly angleKey: string;
  readonly radiusKey?: string;
}

export interface UPieSeriesFormat {
  fill?: CssColor;
  stroke?: CssColor;
  strokeWidth?: PixelSize;
}

export interface UPieSeriesTooltip extends USeriesTooltip {
  /** Function used to create the content for tooltips. */
  renderer?: (
    params: UPieSeriesTooltipRendererParams,
  ) => string | UTooltipRendererResult;
}

export interface UPieSeriesCalloutOptions {
  /** 为标注的笔触循环切换的颜色。 */
  colors?: CssColor[];
  /** 标注行的长度(以像素为单位)。 */
  length?: PixelSize;
  /** 注释线的描边宽度(以像素为单位)。 */
  strokeWidth?: PixelSize;
}

export interface UChartLegendListeners {
  /** 单击图例项时要调用的侦听器。 */
  legendItemClick?: (event: UChartLegendClickEvent) => void;
}

export interface UChartLegendOptions {
  /** 是否显示图例。 */
  enabled?: boolean;
  /** 图例应相对于图表显示的位置。 */
  position?: UChartLegendPosition;
  /** 图例外部使用的间距(以像素为单位)。 */
  spacing?: PixelSize;
  /** 由标记和标签组成的图例项的配置。 */
  item?: UChartLegendItemOptions;
  /** 特定图例相关事件的可选回调。 */
  listeners?: UChartLegendListeners;
}

export interface UBaseChartListeners {
  /** 单击任何系列中的节点(标记、列、条形图、平铺或饼图切片)时要调用的侦听器。当一个图表有多个系列时，可以通过图表的`SeresNodeClick`事件一次监听所有系列的`nodeClick`事件。 */
  seriesNodeClick: (event: {
    type: 'seriesNodeClick';
    series: any;
    datum: any;
    xKey: string;
    yKey: string;
  }) => any;
  /** Generic listeners. */
  [key: string]: (event: any) => any;
}

/** 所有图表通用的配置。 */
export interface UBaseChartOptions {
  /** 要从中呈现图表的数据。如果未指定此项，则必须改为在单个系列上进行设置。 */
  data?: any[];
  /** 要放置渲染的图表的元素。<strong>重要信息：</strong>请务必阅读`autoSize`配置说明，了解容器元素对图表大小的影响(默认情况下)。 */
  container?: HTMLElement | null;
  /** 以像素为单位的图表宽度。如果`autoSize`设置为`true`，则不起作用。 */
  width?: PixelSize;
  /** 以像素为单位的图表高度。如果`autoSize`设置为`true`，则不起作用。 */
  height?: PixelSize;
  /** 默认情况下，图表将自动调整大小以填充容器元素。将其设置为`False`以禁用此行为。如果设置了`width`或`height`，则除非显式设置为`true`，否则不会自动调整大小。<br/><strong>重要提示：</strong>如果此配置设置为`true`，请确保给图表的`tainer`元素一个明确的大小，否则会遇到容器希望根据内容调整大小，而图表希望根据容器调整大小的情况。 */
  autoSize?: boolean;
  /** 图表周围显示的填充的配置。 */
  padding?: UChartPaddingOptions;
  /** 图表后面显示的背景的配置。 */
  background?: UChartBackground;
  /** 图表顶部显示的标题的配置。 */
  title?: UChartCaptionOptions;
  /** 图表标题下方显示的副标题的配置。注意：只有当标题也存在时，才会显示副标题。 */
  subtitle?: UChartCaptionOptions;
  /** 适用于图表中所有工具提示的全局配置。 */
  tooltip?: UChartTooltipOptions;
  /** 图表图例的配置。 */
  legend?: UChartLegendOptions;
  /** 事件名称到事件侦听器的映射。 */
  listeners?: UBaseChartListeners;
  /** 用于呈现图表的主题。指定内置的主题名称，或提供一个`AgChartTheme`实例进行定制。 */
  theme?: string | UChartTheme; // | ChartTheme
}

export type UChartThemeName =
  | 'u-default'
  | 'u-default-dark'
  | 'u-material'
  | 'u-material-dark'
  | 'u-pastel'
  | 'u-pastel-dark'
  | 'u-solar'
  | 'u-solar-dark'
  | 'u-vivid'
  | 'u-vivid-dark';

export type ChartMenuOptions =
  | 'chartSettings'
  | 'chartData'
  | 'chartFormat'
  | 'chartLink'
  | 'chartUnlink'
  | 'chartDownload';
