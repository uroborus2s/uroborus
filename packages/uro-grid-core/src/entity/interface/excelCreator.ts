import { ExportParams } from './exportParams';
import { Column } from '../column';

// Excel Styles
export interface ExcelStyle {
  /** Excel样式的id，它应该与一个css单元格类匹配。 */
  id: string;
  /** 使用此属性可自定义单元格对齐属性。 */
  alignment?: ExcelAlignment;
  /** 使用此属性可自定义单元格边框。 */
  borders?: ExcelBorders;
  /** 使用此属性可指定要导出的数据类型。 */
  dataType?: ExcelDataType;
  /** 使用此属性可自定义单元格中使用的字体。 */
  font?: ExcelFont;
  /** 使用此属性可自定义单元格背景。 */
  interior?: ExcelInterior;
  /** 使用此属性可将单元格值自定义为格式化数字。 */
  numberFormat?: ExcelNumberFormat;
  /** 使用此属性可设置单元格保护。 */
  protection?: ExcelProtection;
  /**
   * @deprecated Legacy property
   */
  name?: string;
}

export interface ExcelAlignment {
  /**
   * 使用此属性可更改单元格的水平对齐方式。
   * Default: `Automatic`
   */
  horizontal?:
    | 'Automatic'
    | 'Left'
    | 'Center'
    | 'Right'
    | 'Fill'
    | 'Justify'
    | 'CenterAcrossSelection'
    | 'Distributed'
    | 'JustifyDistributed';
  /**
   * 使用此属性可更改单元格中的缩进级别。
   * Default: 0
   */
  indent?: number;
  /**
   * 使用此属性可更改单元格读取顺序。
   * Default: `LeftToRight`
   */
  readingOrder?: 'RightToLeft' | 'LeftToRight' | 'Context';
  /**
   * 旋转文本的度数，介于0和359之间。
   * Default: `0`
   */
  rotate?: number;
  /**
   * 如果设置为`true`，单元格的字体大小将自动更改，以强制文本适应单元格。
   * Default: `false`
   */
  shrinkToFit?: boolean;
  /**
   * 使用此属性更改单元格的垂直对齐方式。
   * Default: `Automatic`
   */
  vertical?:
    | 'Automatic'
    | 'Top'
    | 'Bottom'
    | 'Center'
    | 'Justify'
    | 'Distributed'
    | 'JustifyDistributed';
  /**
   * 如果设置为`true`，则多行文本将在Excel中显示为多行。
   * Default: `false`
   */
  wrapText?: boolean;
}

export interface ExcelBorders {
  /** 用于设置单元格的下边框。 */
  borderBottom?: ExcelBorder;
  /** 用于设置单元格的左边框。 */
  borderLeft?: ExcelBorder;
  /** 用于设置单元格的右边框。 */
  borderRight?: ExcelBorder;
  /** 用于设置单元格的上边框。 */
  borderTop?: ExcelBorder;
}

export interface ExcelBorder {
  /**
   * 边框颜色
   * Default: `black`
   */
  color?: string;
  /**
   * 边框样式
   * Default: `None`
   */
  lineStyle?:
    | 'None'
    | 'Continuous'
    | 'Dash'
    | 'Dot'
    | 'DashDot'
    | 'DashDotDot'
    | 'SlantDashDot'
    | 'Double';
  /**
   * 边框的厚度从0(细)到3(粗)。
   * Default: `0`
   */
  weight?: 0 | 1 | 2 | 3;
}

export interface ExcelInterior {
  /** 使用此属性可设置背景色图案。 */
  pattern:
    | 'None'
    | 'Solid'
    | 'Gray75'
    | 'Gray50'
    | 'Gray25'
    | 'Gray125'
    | 'Gray0625'
    | 'HorzStripe'
    | 'VertStripe'
    | 'ReverseDiagStripe'
    | 'DiagStripe'
    | 'DiagCross'
    | 'ThickDiagCross'
    | 'ThinHorzStripe'
    | 'ThinVertStripe'
    | 'ThinReverseDiagStripe'
    | 'ThinDiagStripe'
    | 'ThinHorzCross'
    | 'ThinDiagCross';
  /** 作为与图案组合的次要颜色的颜色。 */
  color?: string;
  /** 图案颜色。 */
  patternColor?: string;
}

export interface ExcelNumberFormat {
  /** 使用此属性提供格式化数字的模式。(例如，10000美元可能变成10,000.00美元)。 */
  format: string;
}

export interface ExcelProtection {
  /**
   * 设置为`False`则禁用单元保护(锁定)
   * Default: `true`
   */
  protected: boolean;
  /**
   * 设置为`true`可在受保护的单元格中隐藏公式。
   * Default: `false`
   */
  hideFormula: boolean;
}

export type ExcelDataType =
  | 'String'
  | 'Formula'
  | 'Number'
  | 'Boolean'
  | 'DateTime'
  | 'Error';
export type ExcelOOXMLDataType =
  | 'str'
  | 's'
  | 'f'
  | 'inlineStr'
  | 'n'
  | 'b'
  | 'd'
  | 'e'
  | 'empty';

export interface ExcelData {
  /** 单元格中的数据类型。 */
  type: ExcelDataType | ExcelOOXMLDataType;
  /** 单元格的值。 */
  value: string | null;
}

export interface ExcelCell {
  /** 单元格引用。 */
  ref?: string;
  /** 要与单元格关联的ExcelStyle ID。 */
  styleId?: string;
  /** 将添加到单元格的数据。 */
  data?: ExcelData;
  /**
   * 要跨越的单元格数量(1表示跨越2列)。
   * Default: `0`
   */
  mergeAcross?: number;
  /** 可折叠范围。 */
  collapsibleRanges?: number[][];
}

export interface ExcelRow {
  /** 行索引。 */
  index?: number;
  /** 折叠状态。 */
  collapsed?: boolean;
  /** 隐藏状态。 */
  hidden?: boolean;
  /** 行的高度。 */
  height?: number;
  /** 如果当前行是行组的一部分，则为缩进级别。 */
  outlineLevel?: number;
  /** 一组ExcelCells。 */
  cells: ExcelCell[];
}

export interface ExcelImagePosition {
  /** 包含此图像的行。此属性是自动设置的，除非您知道自己在做什么，否则不要更改它 */
  row?: number;
  /**
   * 此图像将覆盖的行数。
   * Default: `1`
   *  */
  rowSpan?: number;
  /** 包含此图像的列。此属性是自动设置的，除非您知道自己在做什么，否则不要更改它。 */
  column?: number;
  /**
   * 此图像将覆盖的列数。
   * Default: `1`
   */
  colSpan?: number;
  /**
   * 图像应水平偏移的像素量。
   * Default: `0`
   */
  offsetX?: number;
  /**
   * 图像应垂直偏移的像素量。
   * Default: `0`
   */
  offsetY?: number;
}

export interface ColumnWidthCallbackParams {
  column: Column | null;
  index: number;
}

export interface RowHeightCallbackParams {
  rowIndex: number;
}

export interface ExcelExportParams extends ExportParams<ExcelRow[]> {
  /** 导出文件的作者。Default: `"uroborus"` */
  author?: string;
  /**
   * 如果设置为`true`，则会尝试将所有以`=`开头的单元格转换为公式，而不是将单元格值设置为以`=`开头的常规字符串。
   * Default: `false`
   */
  autoConvertFormulas?: boolean;
  /**
   * 定义默认列宽。如果不存在值，则每列将具有应用程序中当前设置的值，最小值为75px。还可以向此属性提供返回数字的回调函数。
   */
  columnWidth?: number | ((params: ColumnWidthCallbackParams) => number);
  /**
   * 为了向后兼容，可以将此属性设置为`xml`，这将导出与旧Office版本(早于Office 2007)兼容的Excel电子表格。不建议设置为`xml`，因为有些功能在传统模式下不起作用。
   * Default: `xlsx`
   */
  exportMode?: 'xlsx' | 'xml';
  /**
   * Excel文档的字体大小的默认值。
   * Default: `11`
   */
  fontSize?: number;
  /**
   * 标题行的高度，以像素为单位。默认为Excel默认值。还可以向此属性提供返回数字的回调函数。
   */
  headerRowHeight?: number | ((params: RowHeightCallbackParams) => number);
  /**
   * 所有行的高度，以像素为单位。默认为Excel默认值。还可以向此属性提供返回数字的回调函数。
   */
  rowHeight?: number | ((params: RowHeightCallbackParams) => number);
  /**
   * 要将网格导出到的Excel中的工作表的名称。最大限制为31个字符。
   * Default: `u-grid`
   */
  sheetName?: string;
  /** Excel文档的页边距。与打印相关。 */
  margins?: ExcelSheetMargin;
  /** 允许您设置页面方向和大小。 */
  pageSetup?: ExcelSheetPageSetup;
  /** 页眉和页脚的配置。 */
  headerFooterConfig?: ExcelHeaderFooterConfig;
  /**
   * 如果为`true`，则文本内容将使用`&amp；lt；`和`&amp；gt；`等XML字符实体编码。这仅在`exportMode=‘xml’`时才相关。
   * Default: `false`
   */
  suppressTextAsCDATA?: boolean;
  /**
   * Excel文件的MimeType。请注意，如果exportMode为`xml`，则默认为`application/vnd.ms-excel`。
   * Default: `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
   */
  mimeType?: string;
  /** 用于导出有问题的网格单元的图像。 */
  addImageToCell?: (
    rowIndex: number,
    column: Column,
    value: string,
  ) =>
    | {
        image: ExcelImage;
        value?: string;
      }
    | undefined;
}

export interface ExcelFont {
  /**
   * 设置为`true`可将单元格文本设置为粗体。
   * Default: `false`
   */
  bold?: boolean;
  /**
   * 单元格字体的颜色。
   * Default: `#000000`
   */
  color?: string;
  /**
   * 要在单元格中使用的字体系列。
   * Options: `Automatic`,`Roman`,`Swiss`,`Modern`,`Script`,`Decorative`,
   * Default: `Automatic`
   */
  family?: string;
  /**
   * 要在单元格中使用的字体的名称。
   * Default: `Calibri`
   */
  fontName?: string;
  /**
   * 设置为`true‘可将单元格字体显示为斜体。
   * Default: `false`
   */
  italic?: boolean;
  /**
   * 设置为`true`可添加文本轮廓。
   * Default: `false`
   */
  outline?: boolean;
  /**
   * 设置为`true`可添加文本阴影。
   * Default: `false`
   */
  shadow?: boolean;
  /**
   * 将此属性设置为使用默认字体大小以外的其他字体大小。
   */
  size?: number;
  /**
   * 设置为`true`可添加删除线。
   * Default: `false`
   */
  strikeThrough?: boolean;
  /**
   * 使用此属性为单元格文本加下划线。
   */
  underline?: 'Single' | 'Double';
  /** 使用此属性可更改默认字体对齐方式。注意：这与设置单元格垂直对齐不同。 */
  verticalAlign?: 'Superscript' | 'Subscript';
}

export interface ExcelImage {
  /**
   * 镜像`id`。此字段是必需的，这样就不会多次导入相同的图像。
   */
  id: string;
  /**
   * 表示要导入的图像的Base64字符串。
   */
  base64: string;
  /** 要导出的图像的类型。 */
  imageType: 'jpg' | 'png' | 'gif';
  /** 图像的Alt文本。 */
  altText?: string;
  /**
   * 如果设置为`true`，则图像将覆盖要导入到的整个单元格。
   * Default: `false`
   */
  fitCell?: boolean;
  /**
   * 设置一个介于0-100之间的值，以指示图像的透明度百分比。
   * Default: `0`
   */
  transparency?: number;
  /**
   * 设置一个介于0-359之间的值，以指示顺时针旋转图像的度数。
   * Default: `0`
   */
  rotation?: number;
  /** 设置此属性可选择更改图像外观的预设。 */
  recolor?: 'Grayscale' | 'Sepia' | 'Washout';
  /** 以像素为单位的图像宽度。如果不选择此值，`fitCell`将自动设置为TRUE。 */
  width?: number;
  /** 以像素为单位的图像高度。如果不选择此值，`fitCell`将自动设置为TRUE。 */
  height?: number;
  /** 图像的位置。 */
  position?: ExcelImagePosition;
}

export interface ExcelHeaderFooterConfig {
  /** 每页页眉和页脚的配置。 */
  all?: ExcelHeaderFooter;
  /** 页眉和页脚的配置仅限于第一页。 */
  first?: ExcelHeaderFooter;
  /** 仅在偶数页上的页眉和页脚的配置。 */
  even?: ExcelHeaderFooter;
}
export interface ExcelHeaderFooter {
  /** 最多3项(`Left`、`Center`、`Right`)的数组，包含头部配置。 */
  header?: ExcelHeaderFooterContent[];
  /** 最多包含3个项目的数组 (`Left`, `Center`, `Right`), 包含页脚配置。 */
  footer?: ExcelHeaderFooterContent[];
}

export interface ExcelHeaderFooterContent {
  /** 要包含在页眉中的文本的值。 */
  value: string;
  /**
   * 设置添加文本的位置：`Left`、`Center`或`Right`。
   * Default: `Left`
   */
  position?: 'Left' | 'Center' | 'Right';
  /** 页眉/页脚值的字体样式。 */
  font?: ExcelFont;
}

export interface ExcelSheetMargin {
  /**
   * The sheet 上边距。
   * Default: `0.75`
   */
  top?: number;
  /**
   * The sheet 右边距。
   * Default: `0.7`
   */
  right?: number;
  /**
   * The sheet 下边距。
   * Default: `0.75`
   */
  bottom?: number;
  /**
   * The sheet 左边距。
   * Default: `0.7`
   */
  left?: number;
  /**
   * The sheet 头部边距。
   * Default: `0.3`
   */
  header?: number;
  /**
   * The sheet 底部边距。
   * Default: `0.3`
   */
  footer?: number;
}

export interface ExcelSheetPageSetup {
  /**
   * 使用此属性可更改打印方向。
   * Default: `Portrait`
   */
  orientation?: 'Portrait' | 'Landscape';
  /**
   * 使用此属性可设置图纸大小。
   * Default: `Letter`
   */
  pageSize?:
    | 'Letter'
    | 'Letter Small'
    | 'Tabloid'
    | 'Ledger'
    | 'Legal'
    | 'Statement'
    | 'Executive'
    | 'A3'
    | 'A4'
    | 'A4 Small'
    | 'A5'
    | 'A6'
    | 'B4'
    | 'B5'
    | 'Folio'
    | 'Envelope'
    | 'Envelope DL'
    | 'Envelope C5'
    | 'Envelope B5'
    | 'Envelope C3'
    | 'Envelope C4'
    | 'Envelope C6'
    | 'Envelope Monarch'
    | 'Japanese Postcard'
    | 'Japanese Double Postcard';
}
