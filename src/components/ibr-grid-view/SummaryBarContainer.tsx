import { view } from '@/domain/view/view.repository';
import { currentViewIdState } from '@/pages/base/content/table/TableContext';
import { rowNumberWidth } from '@ibr/ibr-grid-view/Context';
import { GridTableComponentName } from '@ibr/ibr-grid-view/GridClasses';
import SummaryContent from '@ibr/ibr-grid-view/SummaryContent';
import { OwnerStateType } from '@ibr/ibr-grid-view/types';
import styled from '@mui/material/styles/styled';
import { useRecoilValue } from 'recoil';

const SummaryBarRoot = styled('div', {
  name: GridTableComponentName,
  slot: 'summaryBar',
})({
  position: 'absolute',
  height: '34px',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'hsla(0,0%,100%,0.5)',
  borderTop: '1px solid hsl(202,10%,88%)',
});

const SummaryLeftPane = styled('div', {
  name: GridTableComponentName,
  slot: 'summaryLeftPane',
})<{ ownerState: OwnerStateType }>(({ ownerState }) => ({
  position: 'absolute',
  height: '34px',
  bottom: 0,
  left: 0,
  top: 0,
  backgroundColor: 'hsla(0,0%,100%,0.5)',
  width: ownerState.columnSizes,
  borderRight: '1px solid #ccc',
  zIndex: 1,
  overflow: 'visible',
}));

const SummaryRightPane = styled('div', {
  name: GridTableComponentName,
  slot: 'summaryLeftPane',
})<{ ownerState: OwnerStateType }>(({ ownerState }) => ({
  position: 'absolute',
  bottom: 0,
  left: ownerState.columnSizes,
  top: 0,
  right: 0,
  overflow: 'visible',
  zIndex: 1,
}));

const SummaryBarContainer = () => {
  const viewId = useRecoilValue(currentViewIdState);

  const frozenColWidth = useRecoilValue(view.frozenWidth(viewId));

  const ownerState = {
    columnSizes: Math.ceil(frozenColWidth + rowNumberWidth),
  };

  return (
    <SummaryBarRoot>
      <SummaryLeftPane ownerState={ownerState}>
        <SummaryContent position="left" />
      </SummaryLeftPane>
      <SummaryRightPane ownerState={ownerState}>
        <SummaryContent position="right" />
      </SummaryRightPane>
    </SummaryBarRoot>
  );
};

export default SummaryBarContainer;