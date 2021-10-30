import { iconColors } from '@/core/util';
import { base, workspaces } from '@/domain';
import EditBaseDialog from '@/pages/editBaseDialog/EditBaseDialog';
import NewBaseDialog, {
  getFristName,
} from '@/pages/home/bases/detailsList/baseList/NewBaseDialog';
import { middleScreen, minScreen } from '@/pages/home/types';
import AddIcon from '@ibr/ibr-icon/AddIcon';
import BaseIcon from '@ibr/ibr-icon/BaseIcon';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import styled from '@mui/material/styles/styled';
import makeStyles from '@mui/styles/makeStyles';
import classNames from 'classnames';
import { FC, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Link } from 'umi';

const useListStyel = makeStyles({
  itemRoot: {
    position: 'relative',
    padding: '0 0.5rem',
    marginBottom: '1rem',

    [`@media (min-width: ${minScreen}rem)`]: {
      width: '100%',
    },
    [`@media (min-width: ${middleScreen}rem)`]: {
      width: '50%',
    },
  },
  addButtonRoot: {
    cursor: 'pointer',
    width: '100%',
    transition: '.085s all ease-in',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '6px',
    boxShadow: '0 0 0 5px transparent',
    textDecoration: 'none',
    color: 'hsl(0,0%,20%)',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.05)',
      boxShadow: '0 0 0 10px rgb(0 0 0 / 5%)',
    },
    '&:hover >.base-item-more-button,&:active >.base-item-more-button': {
      display: 'flex',
    },
  },
  text: {
    fontSize: '1rem',
    lineHeight: 1.5,
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    flex: 'auto',
  },
  moreButton: {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    display: 'none',
    cursor: 'pointer',
    flex: 'none',
    transition: 'all 0.085s ease-in',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '0.25rem',
    marginBottom: '0.25rem',
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.25)',
    '&:hover,&:active,&:focus': {
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
  },
});

const IconRoot = styled('div')<{ backgroundColor?: string; color?: string }>(
  ({ backgroundColor, color }) => ({
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 'none',
    backgroundColor: backgroundColor,
    color: color,
    marginRight: '0.5rem',
  }),
);

const BaseItem: FC<{ baseId: string }> = ({ baseId }) => {
  const name = useRecoilValue(base.name(baseId));
  const color = useRecoilValue(base.color(baseId));
  const icon = useRecoilValue(base.icon(baseId));

  const classes = useListStyel();

  const fristChar = getFristName(name);

  const [openDialog, setOpen] = useState(false);

  return (
    <>
      <Link to={`/application/${baseId}`} className={classes.addButtonRoot}>
        <IconRoot
          backgroundColor={iconColors[color]}
          color={color.trim().endsWith('Light') ? 'hsl(0,0%,20%)' : '#fff'}
        >
          {icon == 'null' ? (
            <span>{fristChar}</span>
          ) : (
            <BaseIcon sx={{ fontSize: '20px' }} icon={icon} />
          )}
        </IconRoot>
        <div className={classes.text}>{name}</div>
        <div
          className={classNames(classes.moreButton, 'base-item-more-button')}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setOpen(true);
          }}
        >
          <ArrowDropDownIcon sx={{ fontSize: '18px' }} />
        </div>
      </Link>
      <EditBaseDialog
        open={openDialog}
        onClose={() => {
          setOpen(false);
        }}
        baseId={baseId}
      />
    </>
  );
};

const BaseSmallList: FC<{ workspaceId: string }> = ({ workspaceId }) => {
  const baseIds = useRecoilValue(workspaces.baseIds(workspaceId));
  const classes = useListStyel();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  return (
    <>
      {[...baseIds].map((id) => (
        <div key={id} className={classes.itemRoot}>
          <BaseItem baseId={id} />
        </div>
      ))}
      <div
        className={classes.itemRoot}
        onClick={(e) => {
          e.stopPropagation();
          setAnchorEl(e.currentTarget);
        }}
      >
        <div className={classes.addButtonRoot}>
          <IconRoot backgroundColor="rgba(0,0,0,0.05)">
            <AddIcon
              viewBox="0 0 16 16"
              sx={{
                height: 24,
                width: 24,
                opacity: 0.5,
                shapeRendering: 'geometricPrecision',
              }}
            />
          </IconRoot>
          <div className={classes.text}>新建数据副本</div>
        </div>
      </div>
      <NewBaseDialog anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </>
  );
};

export default BaseSmallList;
