import { view } from '@/domain/view/view.repository';
import { currentViewIdState } from '@/pages/base/content/table/TableContext';
import ColumnHeader from '@ibr/ibr-grid-view/ColumnHeader';
import Checkbox from '@mui/material/Checkbox';
import styled from '@mui/material/styles/styled';
import { FC, useContext } from 'react';
import { useRecoilValue } from 'recoil';
import { GridTableComponentName } from './GridClasses';
import { GridStateContext, PaneInnerContentProps } from './types';

const PaneInnerContentRoot = styled('div', {
  name: GridTableComponentName,
  slot: 'paneInnerContent',
})({
  height: '100%',
  position: 'relative',
  display: 'flex',
});

const PaneInnerContent: FC<PaneInnerContentProps> = ({ position }) => {
  const ownerState = useContext(GridStateContext);
  const viewId = useRecoilValue(currentViewIdState);

  const columnDatas = useRecoilValue(view.columnData(viewId));

  const frozenIndex = useRecoilValue(view.frozenIndex(viewId));

  return (
    <PaneInnerContentRoot>
      {position == 'right' ? (
        <div />
      ) : (
        <Checkbox
          sx={{
            height: ownerState.columnHeaderHight,
            borderRadius: 0,
            paddingRight: '43px',
            '& svg': {
              fontSize: '12px',
            },
          }}
          disableRipple
          disableFocusRipple
          disableTouchRipple
        />
      )}
      {columnDatas.slice(0, frozenIndex).map((data) => (
        <ColumnHeader
          columnData={data}
          key={data.id}
          ownerState={{ offset: data.offset, width: data.width, ...ownerState }}
        />
      ))}
    </PaneInnerContentRoot>
  );
};

export default PaneInnerContent;
