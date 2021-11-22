import { GridStateContext } from '@ibr/ibr-grid-view/Context';
import RowDataContent from '@ibr/ibr-grid-view/RowDataContent';
import MoveableDivider from '@ibr/ibr-moveable-divider/MoveableDivider';
import styled from '@mui/material/styles/styled';
import { FC, useContext } from 'react';
import { GridTableComponentName } from './GridClasses';
import ColumnHeaderContent from './ColumnHeaderContent';
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
  width: ownerState.fixedColumnWidth,
  display: 'flex',
  flexDirection: 'column',
}));

const RightPaneWrapper = styled('div', {
  name: GridTableComponentName,
  slot: 'rightPaneWrapper',
})<{ ownerState: OwnerStateType }>(({ ownerState }) => ({
  right: 0,
  left: ownerState.fixedColumnWidth,
  overflow: 'visible',
  position: 'absolute',
  top: 0,
  bottom: 0,
}));

const FillHandleWrapper = styled('div', {
  name: GridTableComponentName,
  slot: 'fillHandleWrapper',
})<{ ownerState: OwnerStateType }>(({ ownerState }) => ({
  top: ownerState.columnHeaderHight,
  pointerEvents: 'none',
  position: 'absolute',
  overflow: 'hidden',
  left: 0,
  right: 0,
  bottom: 0,
}));

const HeaderLeftPane = styled('div', {
  name: GridTableComponentName,
  slot: 'headerLeftPane',
})<{ ownerState: OwnerStateType }>(({ ownerState }) => ({
  height: ownerState.columnHeaderHight,
  top: 0,
  position: 'absolute',
  overflow: 'visible',
  zIndex: 3,
  left: 0,
  right: 0,
  backgroundColor: '#f5f5f5',
  borderBottom: '1px solid hsl(0,0%,82%)',
}));

const HeaderRightPane = styled('div', {
  name: GridTableComponentName,
  slot: 'headerRightPane',
})<{ ownerState: OwnerStateType }>(({ ownerState }) => ({
  height: ownerState.columnHeaderHight,
  top: 0,
  position: 'absolute',
  overflow: 'visible',
  backgroundColor: '#f5f5f5',
  borderBottom: '1px solid hsl(0,0%,82%)',

  zIndex: 1,
  left: 0,
  right: 0,
}));

const DataLeftPane = styled('div', {
  name: GridTableComponentName,
  slot: 'dataLeftPane',
})<{ ownerState: OwnerStateType }>(({ ownerState }) => ({
  top: ownerState.columnHeaderHight,
  bottom: 0,
  position: 'absolute',
  overflow: 'visible',
  zIndex: 2,
  left: 0,
  right: 0,
  backgroundColor: 'hsl(0,0%,99%)',
}));

const DataRightPane = styled('div', {
  name: GridTableComponentName,
  slot: 'dataRightPane',
})<{ ownerState: OwnerStateType }>(({ ownerState }) => ({
  top: ownerState.columnHeaderHight,
  bottom: 0,
  position: 'absolute',
  overflow: 'hidden',
  zIndex: 0,
  left: 0,
  right: 0,
}));

const GridContainer: FC<Omit<IbrGridProps, 'sx'>> = ({ classes }) => {
  const ownerState = useContext(GridStateContext);

  return (
    <ContainerRoot>
      <LeftPaneWrapper ownerState={ownerState}>
        <HeaderLeftPane ownerState={ownerState}>
          <ColumnHeaderContent position="left" />
        </HeaderLeftPane>
        <DataLeftPane ownerState={ownerState}>
          <RowDataContent position="left" />
        </DataLeftPane>
      </LeftPaneWrapper>
      <MoveableDivider
        disabledTooltip={false}
        tooltipProps={{ title: '拖动调整固定列', placement: 'right-end' }}
        sx={{
          position: 'absolute',
          left: ownerState.fixedColumnWidth,
          zIndex: 4,
          marginLeft: '-4px',
          cursor: 'grab',
          '& .IuiMoveableDivider-press': { cursor: 'grabbing' },
        }}
      />
      <RightPaneWrapper ownerState={ownerState}>
        <HeaderRightPane ownerState={ownerState}>
          <ColumnHeaderContent position="right" />
        </HeaderRightPane>
        <DataRightPane ownerState={ownerState}>
          <RowDataContent position="right" />
        </DataRightPane>
      </RightPaneWrapper>
    </ContainerRoot>
  );
};

export default GridContainer;
