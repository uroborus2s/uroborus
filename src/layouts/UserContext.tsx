import { useDispath, USERINFO } from '@/domain';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { createContext, Dispatch, FC, useState } from 'react';

interface UserState {
  account?: string;
  id?: string;
  name?: string;
  avatar?: string;
}

export const UserInfoContext = createContext<{
  user: UserState;
  updateUser: Dispatch<UserState>;
}>({
  user: {},
  updateUser: (s) => {
    console.log(s);
  },
});

const UserContext: FC = ({ children }) => {
  const [user, setUser] = useState<UserState>({});
  const { loading, error } = useDispath(USERINFO, { dispatch: setUser });

  return loading ? (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <UserInfoContext.Provider value={{ user, updateUser: setUser }}>
      {children}
    </UserInfoContext.Provider>
  );
};

export default UserContext;
