import { atom } from 'recoil';
import { BaseColors } from '@/util';

export const TabActiveKey = atom<string>({
  key: 'tabActiveKey',
  default: '',
});

export const TabNodeBackgroundColor = atom({
  key: 'tabNodeBackgroundColor',
  default: BaseColors.lightGary5,
});

export const ActiveTabNodeBackgroundColor = atom({
  key: 'activeTabNodeBackgroundColor',
  default: BaseColors.lightGary5,
});

export const ActiveTabFontColor = atom({
  key: 'activeTabFontColor',
  default: BaseColors.blue4,
});

export const TabFontColor = atom({
  key: 'tabFontColor',
  default: BaseColors.darkGary3,
});

// export const initActiveKey = (key: string) => ({ set }: MutableSnapshot) => {
//   set(TabActiveKey, key);
// };
