import { base, CREATTABLE, useDispath } from '@/domain';
import { table } from '@/domain/table/table.repository';
import { BaseIdContext } from '@/pages/base/BaseContext';
import PopDialog, { HandleFun } from '@ibr/ibr-dialog/PopDialog';
import ExeclIcon from '@ibr/ibr-icon/ExeclIcon';
import NewFileIcon from '@ibr/ibr-icon/NewFileIcon';
import UploadFilePanel from '@ibr/ibr-upload-file/UploadFilePanel';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import styled from '@mui/styles/styled';
import { FC, Ref, useContext, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import useUploadTableFile from './useUploadTableFile';

interface NewTableMenuProps {
  anchor: HTMLElement | null;
  onClose?: () => void;
  activateTabAndEditFun: (id: string) => void;
}

const Item = styled(MenuItem)({
  padding: '0.5rem 0.75rem',
});

const NewTableMenu: FC<NewTableMenuProps> = ({
  anchor,
  onClose,
  activateTabAndEditFun,
}) => {
  const { run, loading: creatTableLoading } = useDispath(CREATTABLE, {
    manual: true,
  });
  const baseId = useContext(BaseIdContext);
  const tableIds = useRecoilValue(base.tableIds(baseId));
  const tables = useRecoilValue(table.allTables([...tableIds]));

  const fileRef = useRef<HandleFun>();

  const handleClickNewTable = () => {
    let count = tables.length;
    let newName = '未命名表格 ';

    // eslint-disable-next-line no-constant-condition
    while (true) {
      count += 1;
      newName = newName.concat(String(count));
      const res = tables.findIndex((table) => table.name == newName);
      if (res == -1) break;
    }
    run({ data: { base_id: baseId, name: newName } }).then((res) => {
      const id = res.request.params.tableId;
      if (onClose) onClose();
      if (activateTabAndEditFun) activateTabAndEditFun(id);
    });
  };

  const { loading, onDrop } = useUploadTableFile(baseId, () => {
    if (fileRef.current) fileRef.current?.close();
    if (onClose) onClose();
  });

  return (
    <>
      <Menu
        anchorEl={anchor}
        onClose={onClose}
        open={!!anchor}
        id="creat-new-table-menu"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{ padding: '0.25rem 0' }}
      >
        <Item onClick={handleClickNewTable}>
          <NewFileIcon sx={{ fontSize: 13, marginRight: '0.5rem' }} />

          <Typography>新建一个空白表格</Typography>
        </Item>
        <Item
          onClick={() => {
            if (fileRef.current) fileRef.current.open();
            if (onClose) onClose();
          }}
        >
          <ExeclIcon sx={{ fontSize: 13, marginRight: '0.5rem' }} />
          <Typography>从Excel/CSV导入</Typography>
        </Item>
      </Menu>
      <PopDialog
        ref={fileRef as Ref<HandleFun>}
        paperStyel={{
          borderRadius: '6px',
          padding: '1rem',
          margin: 0,
          fontWeight: 500,
          width: '480px',
          height: '360px',
          boxShadow: '0 0 0 2px rgb(0 0 0 / 10%)',
        }}
      >
        <UploadFilePanel loading={loading} onDrop={onDrop} />
      </PopDialog>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={creatTableLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default NewTableMenu;
