import { TargetElement } from '@/core/util';
import DeleteIcon from '@ibr/ibr-icon/DeleteIcon';
import EditIcon from '@ibr/ibr-icon/EditIcon';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import InfoIcon from '@mui/icons-material/Info';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import Menu from '@mui/material/Menu';
import styled from '@mui/styles/styled';
import { FC, MouseEventHandler } from 'react';
import PrintIcon from '@mui/icons-material/Print';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

interface ViewMenuProps {
  anchorElem: TargetElement | undefined | null;
  closePopover: () => void;
  reName: MouseEventHandler<HTMLElement>;
}

const ViewMenuItem = styled(ListItemButton)({
  padding: '0.5rem',
  opacity: 0.75,
});

const ViewMenuItemText = styled('div')({
  flex: 'none',
  marginLeft: '1rem',
});

const ViewMenu: FC<ViewMenuProps> = ({ anchorElem, closePopover, reName }) => {
  return (
    <Menu
      disableEnforceFocus
      open={!!anchorElem}
      anchorEl={anchorElem as Element}
      onClose={() => {
        closePopover();
      }}
      sx={{
        '& .MuiMenu-list': {
          borderRadius: '6px',
          overflow: 'hidden',
          width: '200px',
          padding: 0,
        },
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <ViewMenuItem
        disableRipple
        disableTouchRipple
        onClick={(e) => {
          if (closePopover) closePopover();
          if (reName) reName(e);
        }}
      >
        <EditIcon sx={{ fontSize: 16 }} />
        <ViewMenuItemText>重命名</ViewMenuItemText>
      </ViewMenuItem>
      <ViewMenuItem
        disableRipple
        disableTouchRipple
        onClick={() => {
          if (closePopover) closePopover();
        }}
      >
        <InfoIcon sx={{ fontSize: 16 }} />
        <ViewMenuItemText>编辑视图描述信息</ViewMenuItemText>
      </ViewMenuItem>
      <Divider sx={{ my: 0.5 }} />
      <ViewMenuItem
        disableRipple
        disableTouchRipple
        onClick={(e) => {
          e.stopPropagation();
          if (closePopover) closePopover();
        }}
      >
        <FileCopyIcon sx={{ fontSize: 16 }} />
        <ViewMenuItemText>拷贝</ViewMenuItemText>
      </ViewMenuItem>
      <ViewMenuItem
        disabled
        disableRipple
        disableTouchRipple
        onClick={(e) => {
          e.stopPropagation();
          if (closePopover) closePopover();
        }}
      >
        <DownloadForOfflineIcon sx={{ fontSize: 16 }} />
        <ViewMenuItemText>下载CSV文件</ViewMenuItemText>
      </ViewMenuItem>
      <Divider sx={{ my: 0.5 }} />
      <ViewMenuItem
        disabled
        disableRipple
        disableTouchRipple
        onClick={(e) => {
          e.stopPropagation();
          if (closePopover) closePopover();
        }}
      >
        <PrintIcon sx={{ fontSize: 16 }} />
        <ViewMenuItemText>打印视图</ViewMenuItemText>
      </ViewMenuItem>
      <ViewMenuItem
        disableRipple
        disableTouchRipple
        onClick={() => {
          if (closePopover) closePopover();
        }}
      >
        <DeleteIcon sx={{ fontSize: 16 }} />
        <ViewMenuItemText>删除</ViewMenuItemText>
      </ViewMenuItem>
    </Menu>
  );
};

export default ViewMenu;
