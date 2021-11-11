import { usePopover } from '@/core/hooks';
import NewTableMenu from '@/pages/base/content/tabbar/NewTableMenu';
import SquareAddIcon from '@ibr/ibr-icon/SquareAddIcon';
import styled from '@mui/material/styles/styled';
import { FC } from 'react';

const AddRoot = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingRight: '0.5rem',
  cursor: 'pointer',
  position: 'relative',
  flex: 'none',
  marginLeft: '0.25rem',
  padding: '0.25rem',
  opacity: 0.75,
  '&:hover': {
    opacity: 1,
  },
});

const AddTableInTab: FC = () => {
  const { anchorElem, oppenPopover, closePopover } = usePopover();

  return (
    <>
      <AddRoot
        onClick={(e) => {
          e.stopPropagation();
          oppenPopover(e);
        }}
      >
        <SquareAddIcon sx={{ fontSize: '12px' }} />
      </AddRoot>
      <NewTableMenu anchor={anchorElem} onClose={closePopover} />
    </>
  );
};
export default AddTableInTab;
