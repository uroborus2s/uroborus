import PopDialog, { HandleFun } from '@ibr/ibr-dialog/PopDialog';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import styled from '@mui/styles/styled';
import { Dispatch, FC, Ref, SetStateAction, useRef } from 'react';

export const getFristName = (name: string) => {
  let fristChar = '';
  if (name.length > 0) {
    if (/[\u4e00-\u9fa5]/.test(name[1])) {
      fristChar = name.substr(0, 1);
    } else {
      fristChar = name.substr(0, 2);
    }
  }
  return fristChar;
};

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
}

const NewBaseDialog: FC<NewBaseDialogProps> = ({ anchorEl, setAnchorEl }) => {
  const blankRef = useRef<HandleFun>();
  const templateRef = useRef<HandleFun>();
  const fileRef = useRef<HandleFun>();

  return (
    <>
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
          onClick={() => {
            if (blankRef.current) blankRef.current.open();
            setAnchorEl(null);
          }}
        >
          <CreateOutlinedIcon sx={{ fontSize: 18 }} />
          <BaseMenuItemText>创建新的数据副本</BaseMenuItemText>
        </BaseMenuItem>
        <BaseMenuItem
          disableRipple
          disableTouchRipple
          onClick={(e) => {
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
      <PopDialog
        ref={blankRef as Ref<HandleFun>}
        paperStyel={{
          height: 'calc(90% - 64px)',
          maxWidth: 'calc(100% - 64px)',
          borderRadius: '6px',
        }}
        allowClose
      ></PopDialog>
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
      ></PopDialog>
      <PopDialog
        disabledCloseButton
        ref={fileRef as Ref<HandleFun>}
        paperStyel={{
          width: '260px',
          borderRadius: '6px',
          padding: '1rem',
          margin: 0,
          fontWeight: 500,
          boxShadow: '0 0 0 2px rgb(0 0 0 / 10%)',
        }}
      ></PopDialog>
    </>
  );
};

export default NewBaseDialog;
