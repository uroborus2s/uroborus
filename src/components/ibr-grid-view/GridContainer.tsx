import { view } from '@/domain/view/view.repository';
import { currentViewIdState } from '@/pages/base/content/table/TableContext';
import {
  defaultColumnHeaderHight,
  rowNumberWidth,
} from '@ibr/ibr-grid-view/Context';
import RowDataContent from '@ibr/ibr-grid-view/RowDataContent';
import MoveableDivider from '@ibr/ibr-moveable-divider/MoveableDivider';
import styled from '@mui/material/styles/styled';
import { FC, memo } from 'react';
import { useRecoilValue } from 'recoil';
import ColumnHeaderContent from './ColumnHeaderContent';
import { GridTableComponentName } from './GridClasses';
import { IbrGridProps, OwnerStateType } from './types';

const ContainerRoot = styled('div', {
  name: GridTableComponentName,
  slot: 'gridTableContainer',
})({
  borderColor: 'inherit',
  position: 'absolute',
  top: 0,
  bottom: '34px',
  left: 0,
  right: 0,
});

const LeftPaneWrapper = styled('div', {
  name: GridTableComponentName,
  slot: 'leftPaneWrapper',
})<{ ownerState: OwnerStateType }>(({ ownerState }) => ({
  borderLeft: '1px solid #ccc',
  zIndex: 3,
  boxShadow: '3px 0 0 0 rgb(0 0 0 / 4%)',
  transition: 'border-color, box-shadow 200ms ease-in-out',
  overflow: 'visible',
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  width: ownerState.columnSizes,
  display: 'flex',
  flexDirection: 'column',
}));

const RightPaneWrapper = styled('div', {
  name: GridTableComponentName,
  slot: 'rightPaneWrapper',
})<{ ownerState: OwnerStateType }>(({ ownerState }) => ({
  right: 0,
  left: ownerState.columnSizes,
  overflow: 'visible',
  position: 'absolute',
  top: 0,
  bottom: 0,
}));

const FillHandleWrapper = styled('div', {
  name: GridTableComponentName,
  slot: 'fillHandleWrapper',
})({
  top: defaultColumnHeaderHight,
  pointerEvents: 'none',
  position: 'absolute',
  overflow: 'hidden',
  left: 0,
  right: 0,
  bottom: 0,
});

const HeaderLeftPane = styled('div', {
  name: GridTableComponentName,
  slot: 'headerLeftPane',
})({
  height: defaultColumnHeaderHight,
  top: 0,
  position: 'absolute',
  overflow: 'visible',
  zIndex: 3,
  left: 0,
  right: 0,
  backgroundColor: '#f5f5f5',
  borderBottom: '1px solid hsl(0,0%,82%)',
});

const HeaderRightPane = styled('div', {
  name: GridTableComponentName,
  slot: 'headerRightPane',
})({
  height: defaultColumnHeaderHight,
  top: 0,
  position: 'absolute',
  overflow: 'visible',
  backgroundColor: '#f5f5f5',
  borderBottom: '1px solid hsl(0,0%,82%)',
  zIndex: 1,
  left: 0,
  right: 0,
});

const DataLeftPane = styled('div', {
  name: GridTableComponentName,
  slot: 'dataLeftPane',
})({
  top: defaultColumnHeaderHight,
  bottom: 0,
  position: 'absolute',
  overflow: 'visible',
  zIndex: 2,
  left: 0,
  right: 0,
  backgroundColor: 'hsl(0,0%,99%)',
});

const DataRightPane = styled('div', {
  name: GridTableComponentName,
  slot: 'dataRightPane',
})({
  top: defaultColumnHeaderHight,
  bottom: 0,
  position: 'absolute',
  overflow: 'hidden',
  zIndex: 0,
  left: 0,
  right: 0,
});

const GridContainer: FC<Omit<IbrGridProps, 'sx'>> = () => {
  const viewId = useRecoilValue(currentViewIdState);

  const frozenColWidth = useRecoilValue(view.frozenWidth(viewId));

  const ownerState = {
    columnSizes: Math.ceil(frozenColWidth + rowNumberWidth),
  };

  return (
    <ContainerRoot>
      <LeftPaneWrapper ownerState={ownerState}>
        <HeaderLeftPane>
          <ColumnHeaderContent position="left" />
        </HeaderLeftPane>
        <DataLeftPane>
          <RowDataContent position="left" />
        </DataLeftPane>
      </LeftPaneWrapper>
      <MoveableDivider
        disabledTooltip={false}
        tooltipProps={{ title: '拖动调整固定列', placement: 'right-end' }}
        sx={{
          position: 'absolute',
          left: ownerState.columnSizes,
          zIndex: 4,
          marginLeft: '-4px',
          cursor: 'grab',
          '& .IuiMoveableDivider-press': { cursor: 'grabbing' },
        }}
      />
      <RightPaneWrapper ownerState={ownerState}>
        <HeaderRightPane>
          <ColumnHeaderContent position="right" />
        </HeaderRightPane>
        <DataRightPane>
          <RowDataContent position="right" />
        </DataRightPane>
      </RightPaneWrapper>
    </ContainerRoot>
  );
};

export default memo(GridContainer);
