import { atom } from 'recoil';

export const TabActiveKey = atom<string>({
  key: 'tabActiveKey',
  default: '',
});

// export const initActiveKey = (key: string) => ({ set }: MutableSnapshot) => {
//   set(TabActiveKey, key);
// };
