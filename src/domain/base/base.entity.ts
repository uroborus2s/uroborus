import { atomFamily } from 'recoil';
import { ColorType, IconType } from '@ibr-types/index';
import { baseRepository } from '@/domain/base/base.repository';
import { localStorageAtomEffect } from '@ibr-class/entity';

export const baseNameEntity = atomFamily<string, string>({
  key: 'base/name',
  default: '',
  effects_UNSTABLE: (baseId: string) => [
    localStorageAtomEffect(baseId, baseRepository, 'name'),
  ],
});

export const baseColorEntity = atomFamily<ColorType, string>({
  key: 'base/color',
  default: 'blue',
  effects_UNSTABLE: (baseId: string) => [
    localStorageAtomEffect(baseId, baseRepository, 'color'),
  ],
});

export const baseIconEntity = atomFamily<IconType, string>({
  key: 'base/icon',
  default: 'blank',
  effects_UNSTABLE: (baseId: string) => [
    localStorageAtomEffect(baseId, baseRepository, 'icon'),
  ],
});

//当前数据应用的描述信息
export const baseDescEntity = atomFamily<string, string>({
  key: 'base/desc',
  default: '',
  effects_UNSTABLE: (baseId: string) => [
    localStorageAtomEffect(baseId, baseRepository, 'desc'),
  ],
});

export const lastUsedTableIdEntity = atomFamily<string, string>({
  key: 'base/lastUsedTableId',
  default: '',
  effects_UNSTABLE: (baseId: string) => [
    localStorageAtomEffect(baseId, baseRepository, 'selected_table_id'),
  ],
});

export const tableIds = atomFamily<string[], string>({
  key: 'base/tableids',
  default: [],
  effects_UNSTABLE: (baseId: string) => [
    localStorageAtomEffect(baseId, baseRepository, 'tableIds'),
  ],
});
