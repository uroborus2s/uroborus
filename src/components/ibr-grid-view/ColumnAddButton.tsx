import AddIcon from '@ibr/ibr-icon/AddIcon';
import styled from '@mui/material/styles/styled';

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
  return (
    <ColumnAddbuttonRoot>
      <AddIcon sx={{ opacity: 0.8, fontSize: '16px' }} />
    </ColumnAddbuttonRoot>
  );
};

export default ColumnAddButton;
