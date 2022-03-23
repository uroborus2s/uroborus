import AddColumnPopover from '@ibr/ibr-grid-view/addColumn/AddColumnPopover';
import AddIcon from '@ibr/ibr-icon/AddIcon';
import Popover from '@mui/material/Popover';
import styled from '@mui/material/styles/styled';
import { memo, useState } from 'react';

const ColumnAddbuttonRoot = styled('div')({
  width: '96px',
  flex: 'none',
  borderRight: '1px solid hsl(202,10%,88%)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '&:hover': {
    backgroundColor: '#f8f8f8',
  },
});

const ColumnAddButton = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };
  // 扩展面板展开/态状缩进;
  const [expanded, setIsExpanded] = useState(true);

  return (
    <>
      <ColumnAddbuttonRoot
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
          setIsExpanded(true);
        }}
      >
        <AddIcon sx={{ opacity: 0.8, fontSize: '16px' }} />
      </ColumnAddbuttonRoot>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          '& .MuiPopover-paper': {
            borderRadius: '6px',
            boxShadow: '0 0 0 2px rgb(0 0 0 / 25%)',
            padding: '0.5rem 1rem',
            width: '22rem',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
        onClick={() => {
          setIsExpanded(false);
        }}
      >
        <AddColumnPopover
          expanded={expanded}
          setExpanded={setIsExpanded}
          closePopover={handleClose}
        />
      </Popover>
    </>
  );
};

export default memo(ColumnAddButton);
