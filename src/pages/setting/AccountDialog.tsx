import { LOGOUT, useDispath } from '@/domain';
import { UserInfoContext } from '@/layouts/UserContext';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { Dispatch, FC, SetStateAction, useContext } from 'react';
import { useRecoilValue } from 'recoil';
import { history } from 'umi';

interface AccountDialogProps {
  anchorEl: null | Element;
  setAnchorEl: Dispatch<SetStateAction<Element | null>>;
}

const AccountDialog: FC<AccountDialogProps> = ({ anchorEl, setAnchorEl }) => {
  const { user, updateUser } = useContext(UserInfoContext);

  const { run } = useDispath(LOGOUT, { manual: true, dispatch: updateUser });

  return (
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
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{
        '& .MuiMenu-list': {
          borderRadius: '6px',
          overflow: 'hidden',
          width: '240px',
          padding: '0 1rem 0.25rem',
        },
      }}
    >
      <Typography sx={{ padding: '0.5rem 0' }}>{user.name}</Typography>
      <Divider
        sx={{
          borderColor: 'rgba(0,0,0,0.1)',
          borderBottomWidth: '2px',
          margin: 0,
        }}
      />
      <MenuItem sx={{ padding: '0.5rem', marginTop: '0.25rem' }}>
        <CreateOutlinedIcon sx={{ fontSize: 16 }} />
        <Typography sx={{ paddingLeft: '0.5rem' }}>用户中心</Typography>
      </MenuItem>
      <MenuItem
        sx={{ padding: '0.5rem' }}
        onClick={() => {
          run().then(() => {
            setAnchorEl(null);
            history.push('/desktop');
          });
        }}
      >
        <LogoutTwoToneIcon sx={{ fontSize: 16 }} />
        <Typography sx={{ paddingLeft: '0.5rem' }}>退出登录</Typography>
      </MenuItem>
    </Menu>
  );
};

export default AccountDialog;
