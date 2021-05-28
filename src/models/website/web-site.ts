import { atom } from 'recoil';
import { SiteMode } from '@/models/types';

export const siteInfoState = atom<SiteMode>({
  key: 'siteInfoState',
  default: {},
});
