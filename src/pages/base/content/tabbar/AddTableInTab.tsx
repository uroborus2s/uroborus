import { usePopover } from '@/core/hooks';
import NewTableMenu from '@/pages/base/content/tabbar/NewTableMenu';
import SquareAddIcon from '@ibr/ibr-icon/SquareAddIcon';
import styled from '@mui/styles/styled';
import { FC, HTMLAttributes } from 'react';

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

const AddTableInTab: FC<
  HTMLAttributes<HTMLDivElement> & {
    activateTabAndEditFun: (id: string) => void;
  }
> = ({ activateTabAndEditFun, ...props }) => {
  const { anchorElem, openPopover, closePopover } = usePopover();

  return (
    <>
      <AddRoot
        onClick={(e) => {
          e.stopPropagation();
          openPopover(e);
        }}
        {...props}
      >
        <SquareAddIcon sx={{ fontSize: '12px' }} />
      </AddRoot>
      <NewTableMenu
        anchor={anchorElem}
        onClose={closePopover}
        activateTabAndEditFun={activateTabAndEditFun}
      />
    </>
  );
};
export default AddTableInTab;
