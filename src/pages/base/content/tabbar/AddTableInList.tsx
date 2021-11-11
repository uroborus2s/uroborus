import { usePopover } from '@/core/hooks';
import NewTableMenu from '@/pages/base/content/tabbar/NewTableMenu';
import AddIcon from '@ibr/ibr-icon/AddIcon';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import { ListItem } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import styled from '@mui/material/styles/styled';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

const ItemIcon = styled(ListItemIcon)({
  padding: '0 0.5rem',
  minWidth: '0',
  flex: 'none',
  fontSize: '16px',
});

const AddTableInList: FC = () => {
  const { anchorElem, oppenPopover, closePopover } = usePopover();

  return (
    <>
      <ListItem
        sx={{
          flex: 'none',
          opacity: 0.75,
          '&:hover': { opacity: 1 },
          cursor: 'pointer',
          padding: '0.5rem 0',
          color: 'hsl(0,0%,20%)',
        }}
        onClick={(e) => {
          e.stopPropagation();
          oppenPopover(e);
        }}
      >
        <ItemIcon>
          <AddIcon sx={{ fontSize: '16px' }} />
        </ItemIcon>
        <Typography sx={{ flex: 'auto' }}>新建一个表格</Typography>
        <ItemIcon>
          <ArrowRightRoundedIcon />
        </ItemIcon>
      </ListItem>
      <NewTableMenu anchor={anchorElem} onClose={closePopover} />
    </>
  );
};
export default AddTableInList;
