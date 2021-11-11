import { usePopover } from '@/core/hooks';
import { EDITTABLE, useDispath } from '@/domain';
import useDoubleClickToEdit from '@hooks/useDoubleClickToEdit';
import ArrowDown from '@ibr/ibr-icon/ArrowDown';
import DeleteIcon from '@ibr/ibr-icon/DeleteIcon';
import EditIcon from '@ibr/ibr-icon/EditIcon';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import InfoIcon from '@mui/icons-material/Info';
import LockIcon from '@mui/icons-material/Lock';
import { InputBase } from '@mui/material';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import Menu from '@mui/material/Menu';
import styled from '@mui/styles/styled';
import { FC, memo, SyntheticEvent } from 'react';
import { atomFamily, useRecoilState } from 'recoil';

export const getTableEditState = atomFamily<boolean, string>({
  key: 'IsEditTableName',
  default: false,
});

interface TabTitleNodeProps {
  name: string;
  active: boolean;
  id: string;
}

const TabNodeRoot = styled('div')({
  maxWidth: '32rem',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '-0.75rem',
});

const IconButton = styled('div')({
  opacity: 0.5,
  '&:hover': {
    opacity: 1,
  },
  cursor: 'pointer',
  marginLeft: '0.25rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const TableMenuItem = styled(ListItemButton)({
  padding: '0.5rem',
});

const TableMenuItemText = styled('div')({
  flex: 'none',
  marginLeft: '1rem',
});

const ShowNode: FC<TabTitleNodeProps> = ({ name, active }) => {
  const { anchorElem, oppenPopover, closePopover } = usePopover();
  return (
    <TabNodeRoot>
      <span>{name}</span>
      <IconButton
        onClick={(e) => {
          oppenPopover(e);
        }}
        style={{ visibility: active ? 'visible' : 'hidden' }}
      >
        <ArrowDown sx={{ fontSize: '12px' }} />
      </IconButton>
      <Menu
        open={!!anchorElem}
        anchorEl={anchorElem}
        onClose={closePopover}
        sx={{
          '& .MuiMenu-list': {
            borderRadius: '6px',
            overflow: 'hidden',
            width: '200px',
            padding: 0,
          },
        }}
      >
        <TableMenuItem disableRipple disableTouchRipple>
          <EditIcon sx={{ fontSize: 16 }} />
          <TableMenuItemText>重命名表格</TableMenuItemText>
        </TableMenuItem>
        <TableMenuItem disableRipple disableTouchRipple>
          <FileCopyIcon sx={{ fontSize: 16 }} />
          <TableMenuItemText>拷贝表格</TableMenuItemText>
        </TableMenuItem>
        <Divider sx={{ my: 0.5 }} />
        <TableMenuItem disableRipple disableTouchRipple>
          <InfoIcon sx={{ fontSize: 16 }} />
          <TableMenuItemText>编辑表格描述信息</TableMenuItemText>
        </TableMenuItem>
        <TableMenuItem disableRipple disableTouchRipple>
          <LockIcon sx={{ fontSize: 16 }} />
          <TableMenuItemText>设置表格权限</TableMenuItemText>
        </TableMenuItem>
        <Divider sx={{ my: 0.5 }} />
        <TableMenuItem disableRipple disableTouchRipple>
          <DeleteIcon sx={{ fontSize: 16 }} />
          <TableMenuItemText>删除</TableMenuItemText>
        </TableMenuItem>
      </Menu>
    </TabNodeRoot>
  );
};

const TabTitleNode: FC<TabTitleNodeProps> = (props) => {
  const { id, name } = props;
  const [isEditTableName, setEdit] = useRecoilState(getTableEditState(id));
  const { run, loading } = useDispath(EDITTABLE, { manual: true });

  const { handleKeyboardEnter, handleToEdit, handleDoubleClick } =
    useDoubleClickToEdit(id, name, run, isEditTableName, setEdit);

  const EditNode = () => {
    return (
      <InputBase
        autoFocus
        required
        sx={{
          marginRight: '-1rem',
          marginLeft: '-1rem',
          '& .MuiInputBase-input': {
            textAlign: 'center',
            borderColor: 'rgba(0,0,0,0.25)',
            borderWidth: '2px',
            borderStyle: 'solid',
          },
        }}
        defaultValue={name}
        onBlur={(e) => {
          handleToEdit(e as SyntheticEvent<HTMLInputElement>);
        }}
        onKeyUp={handleKeyboardEnter}
      />
    );
  };

  return (
    <div onDoubleClickCapture={handleDoubleClick}>
      {isEditTableName ? <EditNode /> : <ShowNode {...props} />}
    </div>
  );
};

export default memo(TabTitleNode);
