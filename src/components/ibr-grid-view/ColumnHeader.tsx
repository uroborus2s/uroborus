import { column } from '@/domain/column/column.repository';
import { view } from '@/domain/view/view.repository';
import { GridTableComponentName } from '@ibr/ibr-grid-view/GridClasses';
import {
  ColumnHeaderProps,
  converColumnTypeFromService,
  OwnerStateType,
} from '@ibr/ibr-grid-view/types';
import ArrowDown from '@ibr/ibr-icon/ArrowDown';
import ColumnHeaderIcon from '@ibr/ibr-icon/ColumnHeaderIcon';
import styled from '@mui/material/styles/styled';
import Typography from '@mui/material/Typography';
import { FC, memo } from 'react';
import { useRecoilValue } from 'recoil';

const HeaderRoot = styled('div', {
  name: GridTableComponentName,
  slot: 'columnHeader',
})<{ ownerState: OwnerStateType }>(({ ownerState }) => ({
  position: 'relative',
  borderLeft: 'none',
  top: 0,
  width: ownerState.columnWidth,
  borderRight: '1px solid #ccc',
  display: 'flex',
  alignItems: 'center',
  flex: 'none',
}));

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
  paddingLeft: '0.5rem',
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
  zIndex: 5,
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
  zIndex: 5,
  backgroundColor: '#2d7ff9',
  borderRadius: '2px',
  opacity: 0,
});

const ColumnHeader: FC<ColumnHeaderProps> = ({ colId }) => {
  const columnWidth = useRecoilValue(view.columnWidth(colId));
  const columnName = useRecoilValue(column.name(colId));
  const columnType = useRecoilValue(column.type(colId));

  const ownerState = { columnWidth };
  return (
    <HeaderRoot ownerState={ownerState}>
      <HeaderContent>
        <ColumnHeaderIcon
          sx={{ fontSize: '16px' }}
          type={converColumnTypeFromService(columnType)}
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
          {columnName}
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

export default memo(ColumnHeader);
