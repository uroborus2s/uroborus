import { view } from '@/domain/view/view.repository';
import { GridStateContext } from '@ibr/ibr-grid-view/Context';
import { GridTableComponentName } from '@ibr/ibr-grid-view/GridClasses';
import styled from '@mui/material/styles/styled';
import { useRecoilValue } from 'recoil';
import { CellDataProps, OwnerStateType } from './types';
import { FC, useContext } from 'react';

const CellRoot = styled('div', {
  name: GridTableComponentName,
  slot: 'cell',
})<{ ownerState: OwnerStateType & { colWidth: number } }>(({ ownerState }) => ({
  position: 'relative',
  height: ownerState.rowHight,
  overflow: 'hidden',
  borderRight: '1px solid #ccc',
  zIndex: 1,
  width: ownerState.colWidth,
}));

const CellData: FC<CellDataProps> = ({ cellId }) => {
  const [rowId, colId] = cellId.split('/');
  console.log(cellId, rowId, colId);

  const colWidth = useRecoilValue(view.columnWidth(colId));

  const ownerState = useContext(GridStateContext);

  return <CellRoot ownerState={{ ...ownerState, colWidth: colWidth }} />;
};

export default CellData;
