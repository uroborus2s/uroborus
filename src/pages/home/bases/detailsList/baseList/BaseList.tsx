import { iconColors } from '@/core/util';
import { base } from '@/domain/base/base.repository';
import { workspaces } from '@/domain/workspace/workspace.repository';
import EditBaseDialog from '@/pages/editBaseDialog/EditBaseDialog';
import NewBaseDialog, { getFristName } from './NewBaseDialog';
import { maxScreen, middleScreen, minScreen } from '@/pages/home/types';
import AddIcon from '@ibr/ibr-icon/AddIcon';
import BaseIcon from '@ibr/ibr-icon/BaseIcon';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { DefaultTheme } from '@mui/styles/defaultTheme';
import makeStyles from '@mui/styles/makeStyles';
import classNames from 'classnames';
import { FC, memo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Link } from 'umi';

interface stytelProps {
  color?: string;
  fontColor?: string;
}

const useStytel = makeStyles<DefaultTheme, stytelProps>({
  hoverContainer: {
    position: 'relative',
    '&:hover .base-item-more-button,&:active .base-item-more-button': {
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
  moreButton: {
    width: '16px',
    height: '16px',
    opacity: 0,
    borderRadius: '50%',
    position: 'absolute',
    bottom: 0,
    right: 0,
    cursor: 'pointer',
    transition: 'all 0.085s ease-in',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '0.25rem',
    marginBottom: '0.25rem',
    color: '#fff',
    '&:hover,&:active,&:focus': {
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
  const name = useRecoilValue(base.name(baseId));
  const color = useRecoilValue(base.color(baseId));
  const icon = useRecoilValue(base.icon(baseId));

  const classes = useStytel({
    color: iconColors[color],
    fontColor: color.trim().endsWith('Light') ? 'hsl(0,0%,20%)' : '#fff',
  });

  const fristChar = getFristName(name);

  const [openDialog, setOpen] = useState(false);

  return (
    <div className={rootClassName}>
      <div className={classes.hoverContainer}>
        <div className={classes.icon}>
          <Link to={`/application/${baseId}`} className={classes.link}>
            <div className={classes.linkIcon}>
              {icon == 'null' ? (
                <span>{fristChar}</span>
              ) : (
                <BaseIcon sx={{ fontSize: '48px' }} icon={icon} />
              )}
            </div>
          </Link>
          <div
            className={classNames(classes.moreButton, 'base-item-more-button')}
            onClick={() => {
              setOpen(true);
            }}
          >
            <ArrowDropDownIcon sx={{ fontSize: '16px' }} />
          </div>
          <EditBaseDialog
            open={openDialog}
            onClose={() => {
              setOpen(false);
            }}
            baseId={baseId}
          />
        </div>
        <div className={classes.title}>{name}</div>
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
      <NewBaseDialog anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </>
  );
};
export default memo(BaseList);
