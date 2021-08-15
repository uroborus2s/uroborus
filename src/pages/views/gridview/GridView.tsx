import React, { LegacyRef, useRef, useState } from 'react';
import { CSSPrefixRequiredProps } from '@/util';
import './grid.scss';
import GridViewToolbar from '@/pages/views/gridview/GridViewToolbar';

import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import ColumnHeader from './ColumnHeader';
import { useRecoilValue } from 'recoil';
import { viewState } from '@/models/view-mode';

const GridView: React.FC<CSSPrefixRequiredProps> = ({ prefixCls }) => {
  const pref = `${prefixCls}-grid`;
  const gridRef = useRef<HTMLDivElement>();
  const [gridApi, setGridApi] = useState();
  const [columnApi, setColumnApi] = useState();
  const cols = useRecoilValue(viewState.columnsOrder);
  console.log(cols);
  const gridCols = useRecoilValue(viewState.gridColumns);
  console.log(gridCols);

  const defaultColDef = {
    editable: true,
    resizable: true,
    lockVisible: true,
  };

  const frameworkComponents = {
    colHeaderComponent: ColumnHeader,
  };

  return (
    <div className={pref} ref={gridRef as LegacyRef<HTMLDivElement>}>
      <GridViewToolbar prefixCls={pref}></GridViewToolbar>

      <div
        id="GridView"
        className="ag-theme-balham"
        style={{
          height: '100%',
          width: '100%',
          paddingLeft: '20px',
          boxSizing: 'border-box',
        }}
      >
        <AgGridReact
          /*****************Data and Row Models配置-行数据配置**********************************/
          // clientSide 客户端模式
          rowData={[]}
          /*****************Columns配置**********************************/
          // 禁止自动调整列的列大小。换句话说，双击列标题的边缘不会自动调整大小
          suppressAutoSize
          applyColumnDefOrder
          /*****************Selection配置-行选择**********************************/
          // 行选择的类型，设置为“single”或“multiple”可启用选择。“Single”将使用单行选择，当选择一行时，以前选择的任何行都会被取消选择。“多行”允许选择多行。
          rowSelection="multiple"
          // 如果为True，则单击行时不会进行行选择。当您只需要选中复选框时使用。
          suppressRowClickSelection
          // 设置为true可启用范围选择。
          enableRangeSelection
          // 设置为true可启用范围选择句柄。使用范围选择时，在最后一个单元格内设置句柄以调整当前范围的大小可能很有用。
          enableRangeHandle
          // 设置为true可启用填充句柄。使用区域选定内容时，填充手柄允许您在调整区域大小时对单元格运行操作。
          enableFillHandle
          // 设置为‘x’强制填充手柄方向为水平，或设置为‘y’强制填充手柄方向为垂直
          fillHandleDirection="y"
          // 将其设置为true可防止在填充柄缩小范围选择时清除单元格值。
          suppressClearOnFillReduction
          /*****************Row Dragging配置-行拖动配置**********************************/

          /*****************Editing配置-单元格编辑配置**********************************/
          // 设置为true可启用单元格的单击编辑，只需单击即可开始编辑。
          singleClickEdit
          // 将其设置为true可在网格失去焦点时停止单元格编辑。默认情况下，网格保持编辑状态，直到焦点移到另一个单元格上。仅适用于内联(非弹出)编辑器。
          stopEditingWhenCellsLoseFocus
          // 将这两个属性都设置为true，以使Enter键具有Excel样式的行为，即按Enter键将向下移动到下面的单元格。
          // 默认情况下，按Enter键将开始对单元格进行编辑，或停止对编辑单元格进行编辑。它不会导航到下面的单元格。
          // enterMovesDown: 设置为true时，如果不编辑，则Enter键将焦点移动到下面的单元格。默认值为Enter键开始编辑当前聚焦的单元格。
          // EnterMovesDownAfterEdit：设置为true，编辑时按Enter键后，焦点移到下面的单元格。默认情况下，编辑将停止，焦点将保持在编辑单元格上
          enterMovesDown
          enterMovesDownAfterEdit
          /*****************Row Grouping配置-行组配置**********************************/
          // 如果是分组，则默认情况下设置为要展开的级别数，例如，0表示无级别，1表示仅第一级别，依此类推。设置为-1可展开所有内容。
          groupDefaultExpanded={-1}
          // 如果为True，则启用分组时网格不会在分组列中交换。如果希望完全控制显示的组列，并且不希望网格为您生成列，即，如果列定义中已有负责显示组的列，请使用此选项/。
          groupSuppressAutoColumn
          // 设置为true可启用行动画。
          // 在过滤、排序、调整高度大小和展开/折叠行组之后，会出现行动画。
          // 默认情况下，列动画处于打开状态，行动画默认处于关闭状态。这是为了保持最常见的默认配置。
          animateRows
          frameworkComponents={frameworkComponents}
          defaultColDef={defaultColDef}
        >
          {gridCols.map((col, index) => (
            <AgGridColumn key={col.field} {...col} filter />
          ))}
        </AgGridReact>
      </div>
    </div>
  );
};

export default GridView;
