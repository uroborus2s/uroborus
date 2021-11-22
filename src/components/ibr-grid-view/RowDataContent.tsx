import { row } from '@/domain/row/row.repository';
import { view } from '@/domain/view/view.repository';
import { currentViewIdState } from '@/pages/base/content/table/TableContext';
import CellData from './CellData';
import { defaultRowHight, GridStateContext } from './Context';
import { GridTableComponentName } from './GridClasses';
import RowAddButton from './RowAddButton';
import RowNumber from './RowNumber';
import { OwnerStateType, RowDataContentProps } from './types';
import styled from '@mui/material/styles/styled';
import { FC, useContext } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const RowDataContentRoot = styled('div', {
  name: GridTableComponentName,
  slot: 'rowDataContent',
})({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundImage: 'url(/grid-bg-height.png)',
});

const RowDataRoot = styled('div', {
  name: GridTableComponentName,
  slot: 'rowData',
})<{ ownerState: OwnerStateType & { hover: boolean } }>(({ ownerState }) => ({
  position: 'relative',
  height: ownerState.rowHight,
  display: 'flex',
  alignItems: 'center',
  backgroundColor: ownerState.hover ? '#f8f8f8' : 'inherit',
  width: '100%',
  borderBottom: '1px solid #ccc',
}));

const RowData: FC<{ rowId: string; sequence: number } & RowDataContentProps> =
  ({ rowId, position, sequence }) => {
    const ownerState = useContext(GridStateContext);

    const viewId = useRecoilValue(currentViewIdState);

    const frozenIndex = useRecoilValue(view.frozenIndex(viewId));

    const colOrders = [...useRecoilValue(view.columnOrders(viewId))];

    const [hover, setHover] = useRecoilState(row.rowHoverState(rowId));

    return (
      <RowDataRoot
        ownerState={{ ...ownerState, hover }}
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

  const rowIds = [...useRecoilValue(view.rowOrders(viewId))];

  const rowUiHeight = defaultRowHight * rowIds.length;

  const noFrozenColWidth = useRecoilValue(view.noFrozenColWidth(viewId));
  const frozenColWidth = useRecoilValue(view.frozenWidth(viewId));

  const width = position == 'left' ? 'auto' : noFrozenColWidth;

  return (
    <RowDataContentRoot style={{ height: rowUiHeight, width: width }}>
      {rowIds.map((rowId, index) => (
        <RowData
          key={rowId}
          rowId={rowId}
          position={position}
          sequence={index + 1}
        />
      ))}
      <RowAddButton position={position} />
    </RowDataContentRoot>
  );
};

export default RowDataContent;
