import { createContext } from 'react';
import { atom } from 'recoil';

export const TableIdContext = createContext('');

export const ViewSiderToggleState = atom({
  key: 'view/siderToggleState',
  default: true,
});

export const currentViewIdState = atom({
  key: 'TablePage/CurrentViewId',
  default: '',
});

export const currentEditViewIdState = atom({
  key: 'ViewListPage/currentEditViewIdState',
  default: '',
});
