import { view } from '@/domain/view/view.repository';
import { currentViewIdState } from '@/pages/base/content/table/TableContext';
import { GridStateContext } from '@ibr/ibr-grid-view/Context';
import ColumnAddButton from './ColumnAddButton';
import ColumnHeader from './ColumnHeader';
import Checkbox from '@mui/material/Checkbox';
import styled from '@mui/material/styles/styled';
import { FC, useContext } from 'react';
import { useRecoilValue } from 'recoil';
import { GridTableComponentName } from './GridClasses';
import { ColumnHeaderContentProps } from './types';

const ColumnHeaderContentRoot = styled('div', {
  name: GridTableComponentName,
  slot: 'columnHeaderContent',
})({
  height: '100%',
  width: '100%',
  position: 'relative',
  display: 'flex',
});

const ColumnHeaderContent: FC<ColumnHeaderContentProps> = ({ position }) => {
  const ownerState = useContext(GridStateContext);
  const viewId = useRecoilValue(currentViewIdState);

  const columnDatas = useRecoilValue(view.columnData(viewId));

  const frozenIndex = useRecoilValue(view.frozenIndex(viewId));

  return (
    <ColumnHeaderContentRoot>
      {position == 'left' && (
        <Checkbox
          sx={{
            height: ownerState.columnHeaderHight,
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
        ? columnDatas.slice(0, frozenIndex)
        : columnDatas.slice(frozenIndex, columnDatas.length)
      ).map((data) => (
        <ColumnHeader
          columnData={data}
          key={data.id}
          ownerState={{ width: data.width, ...ownerState }}
        />
      ))}
      {position == 'right' && <ColumnAddButton />}
    </ColumnHeaderContentRoot>
  );
};

export default ColumnHeaderContent;
