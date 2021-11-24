import { view } from '@/domain/view/view.repository';
import { rowHeight } from './Context';
import { GridTableComponentName } from './GridClasses';
import styled from '@mui/material/styles/styled';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { CellDataProps } from './types';

const CellRoot = styled('div', {
  name: GridTableComponentName,
  slot: 'cell',
})({
  position: 'relative',
  overflow: 'hidden',
  borderRight: '1px solid #ccc',
  zIndex: 1,
});

const CellData: FC<CellDataProps> = ({ cellId }) => {
  const [rowId, colId] = cellId.split('/');

  const colWidth = useRecoilValue(view.columnWidth(colId));
  const cellHeight = useRecoilValue(rowHeight);

  return <CellRoot style={{ width: colWidth, height: cellHeight }} />;
};

export default CellData;
