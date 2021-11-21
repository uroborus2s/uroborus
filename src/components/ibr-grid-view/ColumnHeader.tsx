import { conversionColTypeToIconType } from '@/core/util/column-types';
import { GridTableComponentName } from '@ibr/ibr-grid-view/GridClasses';
import { ColumnHeaderProps, OwnerStateType } from '@ibr/ibr-grid-view/types';
import ArrowDown from '@ibr/ibr-icon/ArrowDown';
import ColumnHeaderIcon from '@ibr/ibr-icon/ColumnHeaderIcon';
import styled from '@mui/material/styles/styled';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

const HeaderRoot = styled('div', {
  name: GridTableComponentName,
  slot: 'columnHeader',
})<{ ownerState: OwnerStateType & { offset: number; width: number } }>(
  ({ ownerState }) => ({
    position: 'absolute',
    borderLeft: 'none',
    backgroundColor: '#f5f5f5',
    top: 0,
    left: ownerState.offset,
    width: ownerState.width,
    height: ownerState.columnHeaderHight,
    borderRight: '1px solid #ccc',
    display: 'flex',
    alignItems: 'center',
  }),
);

const HeaderContent = styled('div', {
  name: GridTableComponentName,
  slot: 'headerContent',
})({
  cursor: 'default',
  color: '#333333',
  flex: 'auto',
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  overflow: 'hidden',
  width: '100%',
});

const DropButton = styled('div', {
  name: GridTableComponentName,
  slot: 'dropButton',
})({
  flex: 'none',
  display: 'flex',
  alignItems: 'center',
  padding: '0 0.5rem',
  cursor: 'pointer',
  opacity: 0.5,
  '&:hover,&:active,&:focus': {
    opacity: 1,
  },
});

const ResizeHandle = styled('div', {
  name: GridTableComponentName,
  slot: 'resizeHandle',
})({
  cursor: 'ew-resize',
  flex: 'none',
  height: '100%',
  width: '16px',
  marginRight: '-8px',
  zIndex: 2,
  display: 'flex',
  justifyContent: 'center',
  '&:hover > div': {
    opacity: 1,
  },
});

const DraggingLine = styled('div')({
  cursor: 'ew-resize',
  flex: 'none',
  height: '100%',
  width: '3px',
  zIndex: 2,
  backgroundColor: '#2d7ff9',
  borderRadius: '2px',
  opacity: 0,
});

const ColumnHeader: FC<ColumnHeaderProps> = ({ ownerState, columnData }) => {
  return (
    <HeaderRoot ownerState={ownerState}>
      <HeaderContent>
        <ColumnHeaderIcon
          sx={{ fontSize: '16px' }}
          type={conversionColTypeToIconType(columnData.type, columnData.option)}
        />
        <Typography
          sx={{
            marginLeft: '0.25rem',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            lineHeight: 1.5,
            fontSize: '14px',
            fontWeight: 400,
            letterSpacing: '3px',
          }}
        >
          {columnData.name}
        </Typography>
      </HeaderContent>
      <DropButton>
        <ArrowDown sx={{ fontSize: '16px' }} />
      </DropButton>
      <ResizeHandle>
        <DraggingLine />
      </ResizeHandle>
    </HeaderRoot>
  );
};

export default ColumnHeader;
