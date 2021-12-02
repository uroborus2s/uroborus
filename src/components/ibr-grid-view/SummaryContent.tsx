import { view } from '@/domain/view/view.repository';
import { currentViewIdState } from '@/pages/base/content/table/TableContext';
import { GridScrollLeft } from '@ibr/ibr-grid-view/Context';
import SummaryCell from './SummaryCell';
import { OwnerStateType, SummaryContentProps } from './types';
import styled from '@mui/material/styles/styled';
import Typography from '@mui/material/Typography';
import { FC, memo, useContext } from 'react';
import { useRecoilValue } from 'recoil';

const ContentRoot = styled('div')<{
  ownerState: OwnerStateType;
}>(({ ownerState }) => ({
  display: 'flex',
  width: ownerState.columnSizes,
  height: '24px',
  paddingLeft: ownerState.position == 'left' ? '65px' : '0',
  transform: ownerState.transform,
}));

const SummaryContent: FC<SummaryContentProps> = ({ position }) => {
  const viewId = useRecoilValue(currentViewIdState);

  const colIds = [...useRecoilValue(view.columnOrders(viewId))];

  const frozenIndex = useRecoilValue(view.frozenIndex(viewId));

  const rowIds = useRecoilValue(view.rowOrders(viewId));

  const scrollLeft = useContext(GridScrollLeft);

  const ownerState = {
    position: position,
    columnSizes: position == 'left' ? '100%' : 'auto',
    transform: position === 'left' ? 'none' : `translateX(${-scrollLeft}px)`,
  };

  return (
    <ContentRoot ownerState={ownerState}>
      {position == 'left' && (
        <Typography
          sx={{
            padding: '3px 8px',
            position: 'absolute',
            top: 0,
            height: '24px',
            left: '36px',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontSize: '12px',
            overflow: 'hidden',
            alignItems: 'center',
            display: 'inline-block',
            maxWidth: '80px',
            zIndex: 3,
          }}
        >{`${rowIds.size} 条记录`}</Typography>
      )}
      {(position == 'left'
        ? colIds.slice(0, frozenIndex)
        : colIds.slice(frozenIndex, colIds.length)
      ).map((colId) => (
        <SummaryCell key={colId} colId={colId} />
      ))}
    </ContentRoot>
  );
};

export default memo(SummaryContent);
