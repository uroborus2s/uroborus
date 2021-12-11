import { view } from '@/domain/view/view.repository';
import styled from '@mui/material/styles/styled';
import { FC, memo, NamedExoticComponent, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { rowHeight } from './Context';
import { GridTableComponentName } from './GridClasses';
import { CellComponentProps, CellDataProps, ColumnTypeKey } from './types';
import { column } from '@/domain/column/column.repository';
import TextTypeCell from '@ibr/ibr-grid-view/cell/TextTypeCell';
import { row } from '@/domain/row/row.repository';
import { EDITROW, useDispath } from '@/domain';

const CellRoot = styled('div', {
  name: GridTableComponentName,
  slot: 'cell',
})({
  position: 'relative',
  overflow: 'hidden',
  borderRight: '1px solid #ccc',
  zIndex: 1,
  display: 'flex',
});

const CellData: FC<CellDataProps> = ({ cellId }) => {
  const [rowId, colId] = cellId.split('/');

  const colWidth = useRecoilValue(view.columnWidth(colId));
  const cellHeight = useRecoilValue(rowHeight);
  const columnType = useRecoilValue(column.type(colId));
  const cellValue = useRecoilValue(row.cellValue(cellId));

  const CellComponent = Cell[columnType];

  const [mode, setMode] = useState<'display' | 'edit'>('display');

  const { run, loading } = useDispath(EDITROW, { manual: true });

  const CellComponentProps = {
    type: columnType,
    cellValue,
    mode,
  };

  const hangleEditCellData = () => {
    run({ path: { id: rowId }, data: { [colId]: '2' } });
  };

  return (
    <CellRoot
      style={{ width: colWidth, height: cellHeight }}
      onClick={hangleEditCellData}
    >
      <CellComponent {...CellComponentProps} />
    </CellRoot>
  );
};

const Cell: Record<ColumnTypeKey, NamedExoticComponent<CellComponentProps>> = {
  text: TextTypeCell,
  multilineText: TextTypeCell,
  attachment: TextTypeCell,
  checkbox: TextTypeCell,
  select: TextTypeCell,
  multiSelect: TextTypeCell,
  // collaborator: 'collaborator',
  date: TextTypeCell,
  phone: TextTypeCell,
  email: TextTypeCell,
  url: TextTypeCell,
  decimal: TextTypeCell,
  currency: TextTypeCell,
  percent: TextTypeCell,
  duration: TextTypeCell,
  rating: TextTypeCell,
  formula: TextTypeCell,
  createdTime: TextTypeCell,
  lastModifiedTime: TextTypeCell,
  // autoNumber: 'autoNumber',
  // createdBy: 'createdBy',
  // lastModifiedBy: 'lastModifiedBy',
  foreignKey: TextTypeCell,
};

export default memo(CellData);
