import { view } from '@/domain/view/view.repository';
import { currentViewIdState } from '@/pages/base/content/table/TableContext';
import {
  defaultColumnHeaderHight,
  gridScrollLeft,
} from '@ibr/ibr-grid-view/Context';
import Checkbox from '@mui/material/Checkbox';
import styled from '@mui/material/styles/styled';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import ColumnAddButton from './ColumnAddButton';
import ColumnHeader from './ColumnHeader';
import { GridTableComponentName } from './GridClasses';
import { ColumnHeaderContentProps, OwnerStateType } from './types';

const ColumnHeaderContentRoot = styled('div', {
  name: GridTableComponentName,
  slot: 'columnHeaderContent',
})<{ ownerState: OwnerStateType }>(({ ownerState }) => ({
  height: '100%',
  width: 'auto',
  position: 'relative',
  display: 'flex',
  transform: ownerState.transform,
}));

const ColumnHeaderContent: FC<ColumnHeaderContentProps> = ({ position }) => {
  const viewId = useRecoilValue(currentViewIdState);

  const scrollLeft = useRecoilValue(gridScrollLeft);

  const ownerState = {
    transform: position === 'left' ? 'none' : `translateX(${-scrollLeft}px)`,
  };

  const columnIds = [...useRecoilValue(view.columnOrders(viewId))];

  const frozenIndex = useRecoilValue(view.frozenIndex(viewId));

  return (
    <ColumnHeaderContentRoot ownerState={ownerState}>
      {position == 'left' && (
        <Checkbox
          sx={{
            height: defaultColumnHeaderHight,
            borderRadius: 0,
            paddingLeft: '12px',
            paddingRight: '41px',
            '& svg': {
              fontSize: '12px',
            },
          }}
          disableRipple
          disableFocusRipple
          disableTouchRipple
        />
      )}
      {(position == 'left'
        ? columnIds.slice(0, frozenIndex)
        : columnIds.slice(frozenIndex, columnIds.length)
      ).map((colId) => (
        <ColumnHeader colId={colId} key={colId} />
      ))}
      {position == 'right' && <ColumnAddButton />}
    </ColumnHeaderContentRoot>
  );
};

export default ColumnHeaderContent;
