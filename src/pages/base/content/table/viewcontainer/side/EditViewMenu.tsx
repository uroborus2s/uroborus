import { DELETEVIEW, DUPLIACTEVIEW, table, useDispath } from '@/domain';
import {
  currentEditViewIdState,
  currentViewIdState,
  TableIdContext,
} from '@/pages/base/content/table/TableContext';
import DeleteIcon from '@ibr/ibr-icon/DeleteIcon';
import EditIcon from '@ibr/ibr-icon/EditIcon';
import LoadingWithNumber from '@ibr/ibr-loading/LoadingWithNumber';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Backdrop from '@mui/material/Backdrop';
import ListItemButton from '@mui/material/ListItemButton';
import Menu from '@mui/material/Menu';
import styled from '@mui/styles/styled';
import { FC, useContext } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

interface EditViewMenuProps {
  anchorElem: Element | null;
  closePopover: () => void;
  viewId: string;
  gridViewNumber: number;
  viewName: string;
}

const ViewMenuItem = styled(ListItemButton)({
  padding: '0.5rem',
  opacity: 0.75,
});

const ViewMenuItemText = styled('div')({
  flex: 'none',
  marginLeft: '1rem',
});

const EditViewMenu: FC<EditViewMenuProps> = ({
  anchorElem,
  closePopover,
  viewId,
  gridViewNumber,
  viewName,
}) => {
  const updateViewEdit = useSetRecoilState(currentEditViewIdState);

  const tableId = useContext(TableIdContext);

  const { run: deleteView, loading: deleteLoading } = useDispath(DELETEVIEW, {
    manual: true,
  });

  const { run: copyView, loading: copyLoading } = useDispath(DUPLIACTEVIEW, {
    manual: true,
  });

  const viewIds = useRecoilValue(table.viewIds(tableId));

  const [currentViewId, setCurrentViewId] = useRecoilState(currentViewIdState);

  return (
    <>
      <Menu
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
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <ViewMenuItem
          disableRipple
          disableTouchRipple
          onClick={() => {
            if (closePopover) closePopover();
            updateViewEdit(viewId);
          }}
        >
          <EditIcon sx={{ fontSize: 16 }} />
          <ViewMenuItemText>重命名</ViewMenuItemText>
        </ViewMenuItem>
        <ViewMenuItem
          disableRipple
          disableTouchRipple
          onClick={(e) => {
            e.stopPropagation();
            copyView({
              path: { id: viewId },
              data: {
                view_name: viewName.concat(' 备份'),
                table_id: tableId,
              },
            }).then((res) => {
              console.log(res);
              updateViewEdit(res.request.params.viewId);
            });
            if (closePopover) closePopover();
          }}
        >
          <FileCopyIcon sx={{ fontSize: 16 }} />
          <ViewMenuItemText>拷贝</ViewMenuItemText>
        </ViewMenuItem>
        <ViewMenuItem
          disableRipple
          disableTouchRipple
          onClick={() => {
            deleteView({ path: { id: viewId, tableId: tableId } }).then(() => {
              if (!viewIds.has(currentViewId))
                setCurrentViewId([...viewIds][0]);
            });
            if (closePopover) closePopover();
          }}
          disabled={gridViewNumber <= 1}
        >
          <DeleteIcon sx={{ fontSize: 16 }} />
          <ViewMenuItemText>删除</ViewMenuItemText>
        </ViewMenuItem>
      </Menu>
      {(deleteLoading || copyLoading) && (
        <Backdrop open={deleteLoading || copyLoading}>
          {deleteLoading ? '删除视图中...' : '拷贝视图中...'}
          <LoadingWithNumber
            loading={deleteLoading || copyLoading}
            duration={1000}
          />
        </Backdrop>
      )}
    </>
  );
};

export default EditViewMenu;
