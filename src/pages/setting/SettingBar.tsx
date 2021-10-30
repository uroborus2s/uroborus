import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HelpIcon from '@mui/icons-material/Help';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Tooltip from '@mui/material/Tooltip';
import makeStyles from '@mui/styles/makeStyles';
import React, { memo } from 'react';

const useStyel = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    color: 'hsl(0,0%,30%)',
  },
  help: {
    opacity: 0.75,
    cursor: 'pointer',
    alignItems: 'center',
    display: 'flex',
  },
  helpText: {
    fontSize: '11px',
    marginRight: '0.5rem',
    letterSpacing: '0.1rem',
  },
  notice: {
    opacity: 0.75,
    marginRight: '1rem',
    marginLeft: '1rem',
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.5,
    },
  },
  account: {
    cursor: 'pointer',
    color: '#ff6f2c',
  },
});

const SettingBar: React.FC = () => {
  const classes = useStyel();
  return (
    <div className={classes.root}>
      <div className={classes.help}>
        <div className={classes.helpText}>HELP</div>
        <HelpIcon sx={{ fontSize: 18 }} />
      </div>
      <Tooltip
        className={classes.notice}
        title="消息"
        placeholder="bottom"
        disableFocusListener
      >
        <NotificationsIcon sx={{ fontSize: 18 }} />
      </Tooltip>
      <Tooltip
        className={classes.account}
        title="账户"
        placeholder="bottom-start"
        disableFocusListener
      >
        <AccountCircleIcon sx={{ fontSize: 28 }} />
      </Tooltip>
    </div>
  );
};

export default memo(SettingBar);
