import { view } from '@/domain/view/view.repository';
import { currentViewIdState } from '@/pages/base/content/table/TableContext';
import SummaryCell from './SummaryCell';
import { SummaryContentProps } from './types';
import styled from '@mui/material/styles/styled';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';

const ContentRoot = styled('div')({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  paddingLeft: '65px',
});

const SummaryContent: FC<SummaryContentProps> = ({ position }) => {
  const viewId = useRecoilValue(currentViewIdState);

  const colIds = [...useRecoilValue(view.columnOrders(viewId))];

  const frozenIndex = useRecoilValue(view.frozenIndex(viewId));

  return (
    <ContentRoot>
      {(position == 'left'
        ? colIds.slice(0, frozenIndex)
        : colIds.slice(frozenIndex, colIds.length)
      ).map((colId) => (
        <SummaryCell key={colId} colId={colId} />
      ))}
    </ContentRoot>
  );
};

export default SummaryContent;
