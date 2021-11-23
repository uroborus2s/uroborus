import { view } from '@/domain/view/view.repository';
import { defaultRowHight } from '@ibr/ibr-grid-view/Context';
import { GridTableComponentName } from '@ibr/ibr-grid-view/GridClasses';
import styled from '@mui/material/styles/styled';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { CellDataProps } from './types';

const CellRoot = styled('div', {
  name: GridTableComponentName,
  slot: 'cell',
})({
  position: 'relative',
  height: defaultRowHight,
  overflow: 'hidden',
  borderRight: '1px solid #ccc',
  zIndex: 1,
});

const CellData: FC<CellDataProps> = ({ cellId }) => {
  const [rowId, colId] = cellId.split('/');
  console.log(cellId, rowId, colId);

  const colWidth = useRecoilValue(view.columnWidth(colId));

  return <CellRoot style={{ width: colWidth }} />;
};

export default CellData;
