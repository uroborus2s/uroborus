import AddIcon from '@ibr/ibr-icon/AddIcon';
import Input from '@mui/material/Input';
import InputBase from '@mui/material/InputBase';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import Popover from '@mui/material/Popover';
import styled from '@mui/material/styles/styled';
import { useState } from 'react';

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

  return (
    <>
      <ColumnAddbuttonRoot
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
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
            minWidth: '360px',
          },
        }}
      >
        <InputBase
          placeholder="请填写表格列名(可选的)"
          sx={{
            width: '100%',
            '& .MuiInputBase-input': {
              borderStyle: 'solid',
              borderWidth: '2px',
              appearance: 'none',
              borderRadius: '6px',
              fontSize: '0.9rem',
              backgroundColor: 'rgba(0,0,0,0.05)',
              padding: '0.5rem',
              marginTop: '0.5rem',
              borderColor: '#cccecf',
              '&:focus': {
                backgroundColor: '#fff',
                borderColor: '#2d7ff9',
              },
            },
          }}
        />
        <List
          subheader={
            <ListSubheader component="div">
              <Input />
            </ListSubheader>
          }
        ></List>
      </Popover>
    </>
  );
};

export default ColumnAddButton;
