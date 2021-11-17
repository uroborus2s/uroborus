import { createContext } from 'react';
import { atom } from 'recoil';

export const BaseIdContext = createContext('');

export const currentEditTableIdState = atom({
  key: 'TablePage/CurrentEditTableIdState',
  default: '',
});
