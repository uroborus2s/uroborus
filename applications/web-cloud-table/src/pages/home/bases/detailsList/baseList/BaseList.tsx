import { workspaces } from '@/domain/workspace/workspace.repository';
import EditBaseDialog from '@/pages/editBaseDialog/EditBaseDialog';
import useBaseInfo from '@/pages/editBaseDialog/useBaseInfo';
import { maxScreen, middleScreen, minScreen } from '@/pages/home/types';
import HovweDropButton from '@ibr/ibr-hover-drop-button/HoverDropButton';
import AddIcon from '@ibr/ibr-icon/AddIcon';
import BaseIcon from '@ibr/ibr-icon/BaseIcon';
import { DefaultTheme } from '@mui/styles/defaultTheme';
import makeStyles from '@mui/styles/makeStyles';
import { FC, memo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Link } from 'umi';
import NewBaseDialog from './NewBaseDialog';

interface stytelProps {
  color?: string;
  fontColor?: string;
}

const useStytel = makeStyles<DefaultTheme, stytelProps>({
  hoverContainer: {
    position: 'relative',
    '&:hover .IuiHoverButton-hover,&:active .IuiHoverButton-hover': {
      opacity: 1,
    },
  },
  icon: {
    width: '82px',
    height: '82px',
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '0.5rem',
  },
  link: {
    width: '82px',
    height: '82px',
    borderRadius: '12px',
    fontSize: '48px',
    position: 'relative',
    cursor: 'pointer',
    transition: 'all 0.085s ease-in 0s',
    display: 'flex',
    textDecoration: 'none',
    backgroundColor: (props) => props.color,
    color: (props) => props.fontColor,
  },
  linkIcon: {
    borderRadius: '12px',
    alignItems: 'center',
    justifyContent: 'center',

    flex: 'auto',
    display: 'flex',
    '&:hover,&:active': {
      backgroundColor: 'rgba(0,0,0,0.1)',
    },
  },
  title: {
    height: '4.5em',
    maxHeight: '4.5em',
    userSelect: 'none',
    ['-webkit-user-select']: 'none',
    overflow: 'hidden',
    fontSize: '0.9rem',
    lineHeight: 1.5,
    textAlign: 'center',
    wordWrap: 'break-word',
    position: 'relative',
    display: '-webkit-box',
    ['-webkit-line-clamp']: 3,
    ['-webkit-box-orient']: 'vertical',
    textOverflow: '-o-ellipsis-lastline',
  },
});

const BaseItem: FC<{ baseId: string; rootClassName: string }> = ({
  baseId,
  rootClassName,
}) => {
  const { baseName, baseIcon, baseColor, fontColor, fristChar } =
    useBaseInfo(baseId);

  const classes = useStytel({
    color: baseColor,
    fontColor: fontColor,
  });

  const [openDialog, setOpen] = useState(false);

  return (
    <div className={rootClassName}>
      <div className={classes.hoverContainer}>
        <div className={classes.icon}>
          <Link to={`/base/${baseId}`} className={classes.link}>
            <BaseIcon
              icon={baseIcon}
              fristChar={fristChar}
              className={classes.linkIcon}
              iconProps={{ sx: { fontSize: 48 } }}
            />
          </Link>
          <HovweDropButton
            sx={{ marginBottom: '0.25rem' }}
            onClick={() => {
              setOpen(true);
            }}
          />
          <EditBaseDialog
            open={openDialog}
            onClose={() => {
              setOpen(false);
            }}
            baseId={baseId}
          />
        </div>
        <div className={classes.title}>{baseName}</div>
      </div>
    </div>
  );
};

const useStytelRoot = makeStyles({
  item: {
    position: 'relative',
    padding: '0.5rem',
    width: '33.33333%',

    [`@media (min-width: ${minScreen}rem)`]: {
      width: '25%',
    },
    [`@media (min-width: ${middleScreen}rem)`]: {
      width: '20%',
    },
    [`@media (min-width: ${maxScreen}rem)`]: {
      width: '16.66667%',
    },
  },
  col: {
    width: '100%',
    display: 'block',
  },
  text: {
    fontSize: '0.9rem',
    lineHeight: 1.5,
    textAlign: 'center',
  },
  icon: {
    width: '82px',
    height: '82px',
    borderRadius: '12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 0.5rem',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
});

const BaseList: FC<{ workspaceId: string }> = ({ workspaceId }) => {
  const baseIds = useRecoilValue(workspaces.baseIds(workspaceId));
  const classes = useStytelRoot();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  return (
    <>
      {[...baseIds].map((id) => (
        <BaseItem key={id} baseId={id} rootClassName={classes.item} />
      ))}
      <div
        className={classes.item}
        onClick={(e) => {
          e.stopPropagation();
          setAnchorEl(e.currentTarget);
        }}
      >
        <div className={classes.col}>
          <div className={classes.icon}>
            <AddIcon
              sx={{
                height: 32,
                width: 32,
                opacity: 0.5,
                shapeRendering: 'geometricPrecision',
              }}
            />
          </div>
          <div className={classes.text}>新建数据副本</div>
        </div>
      </div>
      <NewBaseDialog
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        workspaceId={workspaceId}
      />
    </>
  );
};
export default memo(BaseList);
