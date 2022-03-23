import { BlankIcon, iconColors, IconColorTypeArr } from '@/core/util';
import { CREATBASE, useDispath } from '@/domain';
import { OpenEditOnNewBase } from '@/pages/base/topbar/BaseTopBar';
import useUploadBaseFile from '@/pages/home/bases/detailsList/baseList/useUploadBaseFile';
import UploadFilePanel from '@ibr/ibr-upload-file/UploadFilePanel';
import PopDialog, { HandleFun } from '@ibr/ibr-dialog/PopDialog';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import styled from '@mui/styles/styled';
import { Dispatch, FC, Ref, SetStateAction, useRef } from 'react';
import { useRecoilCallback } from 'recoil';
import { history } from 'umi';

const BaseMenuItem = styled(MenuItem)({
  padding: '0.5rem',
  '&:hover': { backgroundColor: 'hsla(0,0%,100%,0.1)', textDecoration: 'none' },
});

const BaseMenuItemText = styled('div')({
  flex: 'none',
  marginLeft: '1rem',
});

interface NewBaseDialogProps {
  anchorEl: null | Element;
  setAnchorEl: Dispatch<SetStateAction<Element | null>>;
  workspaceId: string;
}

const NewBaseDialog: FC<NewBaseDialogProps> = ({
  anchorEl,
  setAnchorEl,
  workspaceId,
}) => {
  const templateRef = useRef<HandleFun>();
  const fileRef = useRef<HandleFun>();

  const { run, loading } = useDispath(CREATBASE, { manual: true });

  const handleCreatBase = useRecoilCallback(({ set }) => () => {
    run({
      data: {
        workspace_id: workspaceId,
        name: '新建数据应用',
        color: iconColors[IconColorTypeArr[Math.round(Math.random() * 20)]],
        icon: BlankIcon,
      },
    }).then((res) => {
      set(OpenEditOnNewBase, true);
      history.push(`/base/${res.response.id}`);
    });
    setAnchorEl(null);
  });

  const { loading: upLoadFileLoading, onDrop } = useUploadBaseFile(
    workspaceId,
    fileRef.current?.close,
  );

  return (
    <>
      {loading ? (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Menu
          open={!!anchorEl}
          anchorEl={anchorEl}
          onClose={() => {
            setAnchorEl(null);
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          sx={{
            '& .MuiMenu-list': {
              borderRadius: '6px',
              overflow: 'hidden',
              color: '#fff',
              backgroundColor: 'hsl(0,0%,20%)',
              width: '200px',
              padding: 0,
            },
          }}
        >
          <BaseMenuItem
            disableRipple
            disableTouchRipple
            onClick={handleCreatBase}
          >
            <CreateOutlinedIcon sx={{ fontSize: 18 }} />
            <BaseMenuItemText>新建一个空的数据副本</BaseMenuItemText>
          </BaseMenuItem>
          <BaseMenuItem
            disableRipple
            disableTouchRipple
            onClick={() => {
              if (templateRef.current) templateRef.current.open();
              setAnchorEl(null);
            }}
          >
            <AddPhotoAlternateOutlinedIcon sx={{ fontSize: 18 }} />
            <BaseMenuItemText>从模版创建</BaseMenuItemText>
          </BaseMenuItem>
          <BaseMenuItem
            disableRipple
            disableTouchRipple
            onClick={() => {
              if (fileRef.current) fileRef.current.open();
              setAnchorEl(null);
            }}
          >
            <FileUploadOutlinedIcon sx={{ fontSize: 18 }} />
            <BaseMenuItemText>从cvs或excel导入</BaseMenuItemText>
          </BaseMenuItem>
        </Menu>
      )}

      <PopDialog
        disabledCloseButton
        ref={templateRef as Ref<HandleFun>}
        paperStyel={{
          width: '260px',
          borderRadius: '6px',
          padding: '1rem',
          margin: 0,
          fontWeight: 500,
          boxShadow: '0 0 0 2px rgb(0 0 0 / 10%)',
        }}
      />
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
        <UploadFilePanel loading={upLoadFileLoading} onDrop={onDrop} />
      </PopDialog>
    </>
  );
};

export default NewBaseDialog;
