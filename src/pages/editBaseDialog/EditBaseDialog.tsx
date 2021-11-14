import {
  BaseIconType,
  BlankIcon,
  ColorType,
  iconColors,
  icons,
} from '@/core/util';
import { DELETEBASE, EDITBASE, useDispath, workspaces } from '@/domain';
import useBaseInfo from '@/pages/editBaseDialog/useBaseInfo';
import DeleteDialog from '@ibr/ibr-dialog/DeleteDialog';
import PopDialog, { HandleFun } from '@ibr/ibr-dialog/PopDialog';
import SVGIcon from '@ibr/ibr-icon/BaseIcon';
import CheckIcon from '@mui/icons-material/Check';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileMoveRoundedIcon from '@mui/icons-material/DriveFileMoveRounded';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import IosShareIcon from '@mui/icons-material/IosShare';
import Dialog from '@mui/material/Dialog';
import InputBase from '@mui/material/InputBase';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import styled from '@mui/material/styles/styled';
import makeStyles from '@mui/styles/makeStyles';
import classNames from 'classnames';
import { FC, memo, Ref, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import DupliacteDialog from './DupliacteDialog';
import MoveDialog from './MoveDialog';
import ShareDialog from './ShareDialog';

interface EditBaseDialogProps {
  open: boolean;
  onClose?: () => void;
  baseId: string;
}

const useStyel = makeStyles({
  baseDialog: {
    width: '540px',
    boxShadow: '0 4px 16px 0 rgb(0 0 0 / 25%)',
    padding: '1rem',
    borderRadius: '6px',
    backgroundColor: '#fff',
    overflow: 'hidden',
    flex: 'none',
  },
  input: {
    padding: '0.5rem',
    borderRadius: '3px',
    fontSize: '21px',
    lineHeight: '18px',
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    height: 'auto',
    ['&:hover,&:focus']: {
      backgroundColor: '#eee',
    },
  },
  container: {
    display: 'flex',
    marginTop: '1rem',
    marginLeft: '0.5rem',
  },
  colorContainer: {
    width: '160px',
    height: '128px',
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridTemplateRows: 'repeat(4,1fr)',
    placeItems: 'start',
  },

  iconContainer: {
    height: '120px',
    position: 'relative',
    overflowY: 'scroll',
    flex: 'auto',
  },
  iconGridWrap: {
    display: 'grid',
    gridTemplateColumns: 'repeat(9, 40px)',
    gridAutoRows: '40px',
    placeItems: 'start end',
  },
});

const ColorItem = styled('div')<{ color: string }>(({ color }) => ({
  width: '24px',
  height: '24px',
  borderRadius: '6px',
  cursor: 'pointer',
  backgroundColor: color,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const IconItem = styled('div')<{ selected: boolean }>(({ selected }) => ({
  width: '32px',
  height: '32px',
  backgroundColor: selected ? '#8b46ff' : '#fff',
  color: selected ? '#fff' : 'hsl(0,0%,20%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '6px',
  fontSize: '15px',
  cursor: 'pointer',
}));

const allIcons: Array<BaseIconType> = Object.keys(icons) as BaseIconType[];
allIcons.unshift(BlankIcon);

const MenuText = styled('span')({
  marginLeft: '0.5rem',
});

const TextIcon = styled('span')({
  fontSize: '19px',
  fontStyle: 'normal',
});

const EditBaseDialog: FC<EditBaseDialogProps> = ({ open, onClose, baseId }) => {
  const { run } = useDispath(EDITBASE, { manual: true });

  const { baseName, baseIcon, baseColor, fontColor, fristChar } =
    useBaseInfo(baseId);

  const workspaceId = useRecoilValue(workspaces.getWorkspaceIdByBaseId(baseId));

  const newName = useRef(baseName);

  const shareBaseRef = useRef<HandleFun>();
  const duplicateBaseRef = useRef<HandleFun>();
  const moveBaseRef = useRef<HandleFun>();
  const deleteBaseRef = useRef<HandleFun>();

  const classes = useStyel();

  return (
    <>
      <Dialog
        onClose={() => {
          if (onClose) onClose();
        }}
        open={open}
      >
        <div className={classes.baseDialog}>
          <InputBase
            classes={{ input: classes.input }}
            sx={{
              width: '100%',
              lineHeight: '18px',
              fontSize: '13px',
              color: 'hsl(0,0%,30%)',
            }}
            defaultValue={baseName}
            onChange={(event) => {
              console.log(event.target.value);
              newName.current = event.target.value;
            }}
            onKeyDown={(event) => {
              event.stopPropagation();
              if (event.key == 'Enter') {
                run({
                  path: { id: baseId },
                  data: {
                    name: newName.current,
                  },
                }).then();
                if (onClose) onClose();
              }
            }}
          />
          <div className={classes.container}>
            <div className={classes.colorContainer}>
              {Object.keys(iconColors).map((colorKey, index) => (
                <ColorItem
                  key={index}
                  color={iconColors[colorKey as ColorType]}
                  data-color={iconColors[colorKey as ColorType]}
                  onClick={(e) => {
                    e.stopPropagation();
                    run({
                      path: { id: baseId },
                      data: {
                        color: (e.currentTarget as HTMLDivElement).dataset
                          .color,
                      },
                    }).then();
                  }}
                >
                  {baseColor == iconColors[colorKey as ColorType] && (
                    <CheckIcon sx={{ fontSize: '16px', color: fontColor }} />
                  )}
                </ColorItem>
              ))}
            </div>
            <div className={classNames(classes.iconContainer, 'scrollbar')}>
              <div className={classes.iconGridWrap}>
                {allIcons.map((icon, index) => (
                  <IconItem
                    key={index}
                    selected={icon == baseIcon}
                    data-icon={icon}
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log(e.currentTarget);
                      run({
                        path: { id: baseId },
                        data: {
                          icon: (e.currentTarget as HTMLDivElement).dataset
                            .icon,
                        },
                      }).then();
                    }}
                  >
                    {icon == BlankIcon ? (
                      <TextIcon>{fristChar}</TextIcon>
                    ) : (
                      <SVGIcon icon={icon} />
                    )}
                  </IconItem>
                ))}
              </div>
            </div>
          </div>
          <List sx={{ padding: 0, marginTop: '0.5rem' }}>
            <ListItemButton
              sx={{ padding: '0.5rem', borderRadius: '3px' }}
              onClick={() => {
                if (onClose) onClose();
                shareBaseRef.current?.open();
              }}
              disableRipple
            >
              <IosShareIcon sx={{ fontSize: '18px', color: 'hsl(0,0%,40%)' }} />
              <MenuText>分享数据副本</MenuText>
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                if (onClose) onClose();
                duplicateBaseRef.current?.open();
              }}
              sx={{ padding: '0.5rem', borderRadius: '3px' }}
              disableRipple
            >
              <FileCopyIcon sx={{ fontSize: '18px', color: 'hsl(0,0%,40%)' }} />
              <MenuText>拷贝数据副本</MenuText>{' '}
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                if (onClose) onClose();
                moveBaseRef.current?.open();
              }}
              sx={{ padding: '0.5rem', borderRadius: '3px' }}
              disableRipple
            >
              <DriveFileMoveRoundedIcon
                sx={{ fontSize: '18px', color: 'hsl(0,0%,40%)' }}
              />
              <MenuText>移动数据副本到</MenuText>
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                if (onClose) onClose();
                deleteBaseRef.current?.open();
              }}
              sx={{ padding: '0.5rem', borderRadius: '3px' }}
              disableRipple
            >
              <DeleteForeverIcon
                sx={{ fontSize: '18px', color: 'hsl(0,0%,40%)' }}
              />
              <MenuText>删除数据副本</MenuText>
            </ListItemButton>
          </List>
        </div>
      </Dialog>
      <PopDialog
        ref={shareBaseRef as Ref<HandleFun>}
        paperStyel={{
          height: 'calc(90% - 64px)',
          maxWidth: 'calc(100% - 64px)',
          borderRadius: '6px',
        }}
        allowClose
      >
        <ShareDialog name={baseName} />
      </PopDialog>

      <PopDialog
        ref={duplicateBaseRef as Ref<HandleFun>}
        paperStyel={{
          width: '100%',
          maxWidth: '24rem',
          borderRadius: '6px',
          padding: '2rem',
          margin: 0,
        }}
      >
        <DupliacteDialog
          name={baseName}
          baseId={baseId}
          onClose={duplicateBaseRef.current?.close}
        />
      </PopDialog>
      <PopDialog
        ref={moveBaseRef as Ref<HandleFun>}
        paperStyel={{
          width: '100%',
          maxWidth: '24rem',
          borderRadius: '6px',
          padding: '2rem',
          margin: 0,
        }}
      >
        <MoveDialog
          name={baseName}
          baseId={baseId}
          onClose={moveBaseRef.current?.close}
        />
      </PopDialog>
      <PopDialog
        disabledCloseButton
        ref={deleteBaseRef as Ref<HandleFun>}
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
          name={baseName}
          path={{ id: baseId, workspaceId: workspaceId }}
          onClose={deleteBaseRef.current?.close}
          masterTitle="数据副本"
          secTitle="最近删除的数据副本可以从垃圾桶中恢复。"
          commandType={DELETEBASE}
        />
      </PopDialog>
    </>
  );
};

export default memo(EditBaseDialog);
