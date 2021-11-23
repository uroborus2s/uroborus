import { row } from '@/domain/row/row.repository';
import { view } from '@/domain/view/view.repository';
import { currentViewIdState } from '@/pages/base/content/table/TableContext';
import styled from '@mui/material/styles/styled';
import { FC } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import CellData from './CellData';
import { defaultRowHight, gridScrollLeft, gridScrollTop } from './Context';
import { GridTableComponentName } from './GridClasses';
import RowAddButton from './RowAddButton';
import RowNumber from './RowNumber';
import { OwnerStateType, RowDataContentProps } from './types';

const RowDataContentRoot = styled('div', {
  name: GridTableComponentName,
  slot: 'rowDataContent',
})<{ ownerState: OwnerStateType }>(({ ownerState }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundImage: 'url(/grid-bg-height.png)',
  height: ownerState.rowSizes,
  width: ownerState.columnSizes,
  transform: ownerState.transform,
}));

const RowDataRoot = styled('div', {
  name: GridTableComponentName,
  slot: 'rowData',
})({
  position: 'relative',
  height: defaultRowHight,
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  borderBottom: '1px solid #ccc',
});

const RowData: FC<{ rowId: string; sequence: number } & RowDataContentProps> =
  ({ rowId, position, sequence }) => {
    const viewId = useRecoilValue(currentViewIdState);

    const frozenIndex = useRecoilValue(view.frozenIndex(viewId));

    const colOrders = [...useRecoilValue(view.columnOrders(viewId))];

    const [hover, setHover] = useRecoilState(row.rowHoverState(rowId));

    return (
      <RowDataRoot
        sx={{ backgroundColor: hover ? '#f8f8f8' : 'inherit' }}
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
      >
        {position === 'left' && <RowNumber rowId={rowId} sequence={sequence} />}
        {(position === 'left'
          ? colOrders.slice(0, frozenIndex)
          : colOrders.slice(frozenIndex, colOrders.length)
        ).map((colId) => (
          <CellData key={`${rowId}/${colId}`} cellId={`${rowId}/${colId}`} />
        ))}
      </RowDataRoot>
    );
  };

const RowDataContent: FC<RowDataContentProps> = ({ position }) => {
  const viewId = useRecoilValue(currentViewIdState);

  const rowsSize = useRecoilValue(view.rowsSize(viewId)) * defaultRowHight;

  const rowIds = [...useRecoilValue(view.rowOrders(viewId))];

  const noFrozenColWidth = useRecoilValue(view.noFrozenColWidth(viewId));

  const scrollLeft = useRecoilValue(gridScrollLeft);
  const scrollTop = useRecoilValue(gridScrollTop);

  const ownerState = {
    columnSizes: position == 'left' ? '100%' : noFrozenColWidth,
    rowSizes: rowsSize,
    transform:
      position == 'left'
        ? `translateY(${scrollTop}px)`
        : `translate(${scrollLeft}px,${scrollTop}px)`,
  };

  return (
    <RowDataContentRoot ownerState={ownerState}>
      {rowIds.map((rowId, index) => (
        <RowData
          key={rowId}
          rowId={rowId}
          position={position}
          sequence={index + 1}
        />
      ))}
      <RowAddButton lastRowId={rowIds.slice(-1)[0]} position={position} />
    </RowDataContentRoot>
  );
};

export default RowDataContent;
