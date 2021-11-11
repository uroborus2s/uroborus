import { useDispath, USERINFO } from '@/domain';
import { createContext, Dispatch, FC, useReducer, useState } from 'react';
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
  useDispath(USERINFO, { dispatch: setUser });

  return (
    <UserInfoContext.Provider value={{ user, updateUser: setUser }}>
      {children}
    </UserInfoContext.Provider>
  );
};

export default UserContext;
