import { usePopover } from '@/core/hooks';
import { OperationProps } from '@ibr/ibr-tabs';
import TabListPopover from './TabListPopover';
import MenuIcon from '@mui/icons-material/Menu';
import Popover from '@mui/material/Popover';
import styled from '@mui/material/styles/styled';
import { FC } from 'react';

const OperationNodeRoot = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingRight: '0.5rem',
  cursor: 'pointer',
  opacity: 0.75,
  '&:hover': {
    opacity: 1,
  },
});

const OperationButton: FC<OperationProps> = ({ tabs, onTabClick, addIcon }) => {
  const { anchorElem, oppenPopover, closePopover } = usePopover();

  return (
    <>
      <OperationNodeRoot
        onClick={(e) => {
          e.stopPropagation();
          oppenPopover(e);
        }}
      >
        <MenuIcon
          sx={{
            fontSize: 18,
          }}
        />
      </OperationNodeRoot>
      {!!anchorElem && (
        <Popover
          open={!!anchorElem}
          anchorEl={anchorElem}
          onClose={() => {
            closePopover();
          }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <TabListPopover
            tabs={tabs}
            onTabClick={onTabClick}
            addIcon={addIcon}
          />
        </Popover>
      )}
    </>
  );
};

export default OperationButton;
