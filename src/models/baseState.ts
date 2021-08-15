import { atom, AtomEffect, atomFamily, DefaultValue } from 'recoil';
import {
  AtomType,
  BaseKeys,
  BaseKeysKey,
  ColorType,
  IconType,
  TableKeysKey,
} from './types';
import localforage from 'localforage';
import { ApplicationRsp } from '@/api';
import { TableInfoDTO } from './typedto';

export const localBaseStore = localforage.createInstance({
  name: 'localBaseStore',
});

//将从服务器获取的当前应用数据保存到localStore
export async function saveBaseDataTostore(baseInfo: ApplicationRsp) {
  try {
    const saves = Object.entries(BaseKeys)
      .map(([key, value]) => {
        const localValue = baseInfo[key];
        if (localValue) {
          return localBaseStore.setItem(value, baseInfo[key]);
        }
      })
      .filter((value) => value);
    for (const save of saves) {
      await save;
    }
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    localBaseStore
      .clear()
      .then(() => {
        console.log('本地数据库localBaseStore清理完成！');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

//从本地存储获取数据并初始化到atom 数据流图中
const baseStorageEffect = <T extends AtomType = string>(
  filed: BaseKeysKey,
  defultValue?: T,
): AtomEffect<T> => ({ setSelf }) => {
  console.log(`初始化atom数据：${filed}`);
  setSelf(
    localBaseStore.getItem<T>(BaseKeys[filed]).then((value) => {
      console.log(`写入Atom数据：${value}，key值：${filed}`);
      return value ? value : defultValue ?? new DefaultValue();
    }),
  );
};

//当前数据应用名称
export const currentBaseName = atom({
  key: BaseKeys.name,
  default: '',
  effects_UNSTABLE: [baseStorageEffect<string>('name', '')],
});

//当前数据应用的背景颜色
export const currentBaseColor = atom<ColorType>({
  key: BaseKeys.color,
  default: 'blue',
  effects_UNSTABLE: [baseStorageEffect<ColorType>('color', 'blue')],
});

//当前数据应用的图标
export const currentBaseIcon = atom<IconType>({
  key: BaseKeys.icon,
  default: 'blank',
  effects_UNSTABLE: [baseStorageEffect<IconType>('icon', 'blank')],
});

//当前数据应用的描述信息
export const currentBaseDesc = atom({
  key: BaseKeys.desc,
  default: '',
  effects_UNSTABLE: [baseStorageEffect('desc')],
});

export const lastUsedTableId = atom({
  key: BaseKeys.selected_table_id,
  default: '',
  effects_UNSTABLE: [baseStorageEffect('selected_table_id')],
});

export const tableOIds = atom<string[]>({
  key: BaseKeys.order,
  default: [],
  effects_UNSTABLE: [
    ({ setSelf }) => {
      setSelf(
        localBaseStore
          .getItem<TableInfoDTO[]>(BaseKeys['tables'])
          .then((tables) =>
            tables && Array.isArray(tables)
              ? (tables.length > 1
                  ? tables.sort((a, b) => a.order - b.order)
                  : tables
                ).map((table) => table.id)
              : [],
          ),
      );
    },
  ],
});

const tableStorageEffects = <T extends AtomType = string>(
  filed: TableKeysKey,
  defultValue?: T,
): ((param: string) => ReadonlyArray<AtomEffect<T>>) => (tableId: string) => [
  ({ setSelf }) => {
    setSelf(
      localBaseStore
        .getItem<TableInfoDTO[]>(BaseKeys['tables'])
        .then((tables) => {
          let table: TableInfoDTO | undefined = undefined;
          if (tables && Array.isArray(tables)) {
            table = tables.find((t) => t.id === tableId);
          }
          return table
            ? (table[filed] as T)
            : defultValue ?? new DefaultValue();
        }),
    );
  },
];

export const tableName = atomFamily<string, string>({
  key: `${BaseKeys.tables}/name`,
  default: '',
  effects_UNSTABLE: tableStorageEffects('name'),
});

export const tableDesc = atomFamily<string, string>({
  key: `${BaseKeys.tables}/desc`,
  default: '',
  effects_UNSTABLE: tableStorageEffects('desc'),
});
