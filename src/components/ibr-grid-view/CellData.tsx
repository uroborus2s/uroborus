import { view } from '@/domain/view/view.repository';
import styled from '@mui/material/styles/styled';
import { FC, memo } from 'react';
import { useRecoilValue } from 'recoil';
import { rowHeight } from './Context';
import { GridTableComponentName } from './GridClasses';
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

export default memo(CellData);
