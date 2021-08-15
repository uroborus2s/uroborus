import { atom, atomFamily } from 'recoil';
import { baseEntityNames } from '@/core/ibr-types';
import {
  initBaseAtomByLocal,
  initTableAtomByLocal,
} from '@/domain/base/base.repository';

export const tableIdsEntity = atom({
  key: baseEntityNames.tables,
  default: '',
  effects_UNSTABLE: [initBaseAtomByLocal('selected_table_id')],
});

export const tableNameEntity = atomFamily({
  key: `${baseEntityNames.tables}/name`,
  default: '',
  effects_UNSTABLE: (tableId: string) => [
    initTableAtomByLocal('name', tableId),
  ],
});
