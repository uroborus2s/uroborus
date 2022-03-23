import { usePopover } from '@/core/hooks';
import { DELETETABLE, EDITTABLE, table } from '@/domain';
import { BaseIdContext } from '@/pages/base/BaseContext';
import EditDescripton from '@ibr/edit-description/EditDescripton';
import DeleteDialog from '@ibr/ibr-dialog/DeleteDialog';
import PopDialog, { HandleFun } from '@ibr/ibr-dialog/PopDialog';
import ArrowDown from '@ibr/ibr-icon/ArrowDown';
import DeleteIcon from '@ibr/ibr-icon/DeleteIcon';
import EditIcon from '@ibr/ibr-icon/EditIcon';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import InfoIcon from '@mui/icons-material/Info';
import LockIcon from '@mui/icons-material/Lock';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import styled from '@mui/styles/styled';
import { FC, LegacyRef, Ref, useContext, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import DupliacteTable from './DuplicateTable';

export interface TabTitleNodeProps {
  name: string;
  active: boolean;
  id: string;
  activateTabAndEditFun: (id: string) => void;
}

const TableMenuItem = styled(ListItemButton)({
  padding: '0.5rem',
  opacity: 0.75,
});

const TableMenuItemText = styled('div')({
  flex: 'none',
  marginLeft: '1rem',
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

const TabNodeRoot = styled('div')({
  maxWidth: '32rem',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '-0.75rem',
});

const TabShowNode: FC<TabTitleNodeProps> = ({
  id,
  name,
  active,
  activateTabAndEditFun,
}) => {
  const { anchorElem, openPopover, closePopover } = usePopover();

  const deleteTableRef = useRef<HandleFun>();
  const duplicateTableRef = useRef<HandleFun>();

  const baseId = useContext(BaseIdContext);

  const buttonRef = useRef<HTMLDivElement>();

  const {
    anchorElem: infoElem,
    openPopover: openEditInfo,
    closePopover: closeEditInfo,
  } = usePopover(buttonRef);

  const desValue = useRecoilValue(table.desc(id));

  const tabNodeRef = useRef<HTMLDivElement>();

  return (
    <TabNodeRoot ref={tabNodeRef as LegacyRef<HTMLDivElement>}>
      <span>{name}</span>
      <Tooltip title={desValue}>
        <InfoIcon
          sx={{
            fontSize: '12px',
            opacity: 0.5,
            display: desValue ? 'inline-flex' : 'none',
            margin: '0.25rem',
            '&:hover': { opacity: 1 },
          }}
          onClick={(e) => {
            e.stopPropagation();
            // @ts-ignore
            openEditInfo(e, tabNodeRef);
          }}
        />
      </Tooltip>
      <IconButton
        ref={buttonRef as LegacyRef<HTMLDivElement>}
        onClick={(e) => {
          e.stopPropagation();
          openPopover(e);
        }}
        onDoubleClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        style={{ visibility: active ? 'visible' : 'hidden' }}
      >
        <ArrowDown sx={{ fontSize: '12px' }} />
      </IconButton>
      <Menu
        open={!!anchorElem}
        anchorEl={anchorElem as Element}
        onClose={() => {
          closePopover();
        }}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        onDoubleClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        sx={{
          '& .MuiMenu-list': {
            borderRadius: '6px',
            overflow: 'hidden',
            width: '200px',
            padding: 0,
          },
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <TableMenuItem
          disableRipple
          disableTouchRipple
          onClick={(e) => {
            e.stopPropagation();
            if (activateTabAndEditFun) activateTabAndEditFun(id);
            closePopover();
          }}
        >
          <EditIcon sx={{ fontSize: 16 }} />
          <TableMenuItemText>重命名表格</TableMenuItemText>
        </TableMenuItem>
        <TableMenuItem
          disableRipple
          disableTouchRipple
          onClick={(e) => {
            e.stopPropagation();
            closePopover();
            duplicateTableRef.current?.open();
          }}
        >
          <FileCopyIcon sx={{ fontSize: 16 }} />
          <TableMenuItemText>拷贝表格</TableMenuItemText>
        </TableMenuItem>
        <Divider sx={{ my: 0.5 }} />
        <TableMenuItem
          disableRipple
          disableTouchRipple
          onClick={(e) => {
            openEditInfo(e, tabNodeRef);
            closePopover();
          }}
        >
          <InfoIcon sx={{ fontSize: 16 }} />
          <TableMenuItemText>编辑表格描述信息</TableMenuItemText>
        </TableMenuItem>
        <TableMenuItem disableRipple disableTouchRipple>
          <LockIcon sx={{ fontSize: 16 }} />
          <TableMenuItemText>设置表格权限</TableMenuItemText>
        </TableMenuItem>
        <Divider sx={{ my: 0.5 }} />
        <TableMenuItem
          disableRipple
          disableTouchRipple
          onClick={() => {
            closePopover();
            deleteTableRef.current?.open();
          }}
        >
          <DeleteIcon sx={{ fontSize: 16 }} />
          <TableMenuItemText>删除</TableMenuItemText>
        </TableMenuItem>
      </Menu>
      <PopDialog
        disabledCloseButton
        ref={duplicateTableRef as Ref<HandleFun>}
        paperStyel={{
          width: '260px',
          borderRadius: '6px',
          padding: '1rem',
          margin: 0,
          fontWeight: 500,
          boxShadow: '0 0 0 2px rgb(0 0 0 / 10%)',
        }}
      >
        <DupliacteTable
          name={name}
          onClose={() => {
            duplicateTableRef.current?.close();
          }}
          id={id}
          activateTabAndEditFun={activateTabAndEditFun}
        />
      </PopDialog>
      <PopDialog
        disabledCloseButton
        ref={deleteTableRef as Ref<HandleFun>}
        paperStyel={{
          width: '260px',
          borderRadius: '6px',
          padding: '1rem',
          margin: 0,
          fontWeight: 500,
          boxShadow: '0 0 0 2px rgb(0 0 0 / 10%)',
        }}
      >
        <DeleteDialog
          name={name}
          path={{ id: id, baseId: baseId }}
          onClose={deleteTableRef.current?.close}
          masterTitle="的表格"
          secTitle="最近删除的表格可以从垃圾桶中恢复。"
          commandType={DELETETABLE}
        />
      </PopDialog>
      <EditDescripton
        id={id}
        name={name}
        desc={desValue}
        anchorElem={infoElem}
        closePopover={closeEditInfo}
        commandType={EDITTABLE}
      />
    </TabNodeRoot>
  );
};

export default TabShowNode;
