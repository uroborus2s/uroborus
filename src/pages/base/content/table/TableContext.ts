import { createContext } from 'react';
import { atom } from 'recoil';

export const TableIdContext = createContext('');

export const ViewSiderToggleState = atom({
  key: 'view/siderToggleState',
  default: true,
});
