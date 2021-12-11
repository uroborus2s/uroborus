import { view } from '@/domain/view/view.repository';
import { currentViewIdState } from '@/pages/base/content/table/TableContext';
import styled from '@mui/material/styles/styled';
import { FC, memo, useContext } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import CellData from './CellData';
import {
  GridScrollLeft,
  GridScrollTop,
  rowHeight,
  rowHoverState,
} from './Context';
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
}));

const RowDataRoot = styled('div', {
  name: GridTableComponentName,
  slot: 'rowData',
})({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  borderBottom: '1px solid #ccc',
});

const RowDataFC: FC<
  { rowId: string; sequence: number } & RowDataContentProps
> = ({ rowId, position, sequence }) => {
  const viewId = useRecoilValue(currentViewIdState);

  const frozenIndex = useRecoilValue(view.frozenIndex(viewId));

  const colOrders = [...useRecoilValue(view.columnOrders(viewId))];

  const [hover, setHover] = useRecoilState(rowHoverState(rowId));

  const rHeight = useRecoilValue(rowHeight);

  return (
    <RowDataRoot
      sx={{ backgroundColor: hover ? '#f8f8f8' : 'inherit', height: rHeight }}
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

const RowData = memo(RowDataFC);

const RowDataContent: FC<RowDataContentProps> = ({ position }) => {
  const viewId = useRecoilValue(currentViewIdState);

  const rHeight = useRecoilValue(rowHeight);

  const rowsSize = useRecoilValue(view.rowsSize(viewId)) * rHeight;

  const rowIds = [...useRecoilValue(view.rowOrders(viewId))];

  const noFrozenColWidth = useRecoilValue(view.noFrozenColWidth(viewId));

  const scrollLeft = useContext(GridScrollLeft);
  const scrollTop = useContext(GridScrollTop);

  const ownerState = {
    columnSizes: position == 'left' ? '100%' : noFrozenColWidth,
    rowSizes: rowsSize,
  };

  return (
    <RowDataContentRoot
      ownerState={ownerState}
      style={{
        transform:
          position == 'left'
            ? `translateY(${-scrollTop}px)`
            : `translate(${-scrollLeft}px,${-scrollTop}px)`,
      }}
    >
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

export default memo(RowDataContent);
