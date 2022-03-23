import { BaseIdContext } from '@/pages/base/BaseContext';
import EditBaseDialog from '@/pages/editBaseDialog/EditBaseDialog';
import useBaseInfo from '@/pages/editBaseDialog/useBaseInfo';
import SettingBar from '@/pages/setting/SettingBar';
import ArrowDown from '@ibr/ibr-icon/ArrowDown';
import BaseIcon from '@ibr/ibr-icon/BaseIcon';
import LogoIcon from '@ibr/ibr-icon/LogoIcon';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import { FC, memo, useContext, useEffect, useRef } from 'react';
import { atom, useRecoilState } from 'recoil';
import { Link } from 'umi';

const useStyel = makeStyles({
  topBar: ({
    backgroundColor,
    color,
  }: {
    backgroundColor: string;
    color: string;
  }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '48px',
    width: '100%',
    padding: '0 1rem',
    backgroundColor: backgroundColor,
    color: color,
    flex: 'none',
  }),
  logo: {
    flex: 'none',
    width: '60px',
  },
  topBarContent: {
    flex: 'auto',
    padding: '0.5rem 1rem',
    display: 'flex',
    lineHeight: 1.25,
    fontSize: '1rem',
    cursor: 'pointer',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      opacity: 0.85,
    },
  },
  topBarSetting: { flex: 'none' },
});

export const OpenEditOnNewBase = atom({
  key: 'PpenEditOnNewBase',
  default: false,
});

const BaseTopBar: FC = () => {
  const baseId = useContext(BaseIdContext);

  const { baseName, baseIcon, baseColor, fontColor } = useBaseInfo(baseId);

  const classes = useStyel({ backgroundColor: baseColor, color: fontColor });

  const [openDialog, setOpen] = useRecoilState(OpenEditOnNewBase);

  const fouceFrist = useRef(true);

  useEffect(() => {
    fouceFrist.current = false;
  }, []);

  return (
    <div className={classes.topBar}>
      <Link to="/" className={classes.logo}>
        <LogoIcon sx={{ fontSize: 24 }} />
      </Link>
      <div
        className={classes.topBarContent}
        onClick={() => {
          setOpen(true);
        }}
      >
        <BaseIcon
          disabledBlank
          icon={baseIcon}
          iconProps={{ sx: { fontSize: 16 } }}
          sx={{ marginRight: '0.5rem' }}
        />
        <Typography
          sx={{
            fontSize: '1.15rem',
            maxWidth: '24rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontWeight: 500,
          }}
        >
          {baseName}
        </Typography>
        <ArrowDown sx={{ fontSize: '12px' }} />
      </div>
      <SettingBar className={classes.topBarSetting} color={fontColor} />
      <EditBaseDialog
        autoFocus={fouceFrist.current}
        open={openDialog}
        onClose={() => {
          setOpen(false);
        }}
        baseId={baseId}
      />
    </div>
  );
};

export default memo(BaseTopBar);
