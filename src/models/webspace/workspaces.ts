import { atom, AtomEffect, DefaultValue, MutableSnapshot } from 'recoil';
import { ApplicationMode, WorkspaceMode } from '../types';
import { SortMap } from '@/core/sortmap/sortmap';
import {
  clearStorageState,
  getStorageValue,
  setStorageState,
} from '@/core/storage/storage';

//当前用户所有的工作空间数据,可排序
// 通过接口数据的数据字段 rawWorkspaces 获取
export const Workspaces = atom({
  key: 'workspaces',
  default: new SortMap<string, WorkspaceMode>(),
});

//当前用户所有的应用信息
// 通过接口数据的数据字段 rawApplications 获取
export const Applications = atom({
  key: 'applications',
  default: new SortMap<string, ApplicationMode>(),
});

const sessionStorageEffect: AtomEffect<Map<string, string>> = ({
  node,
  onSet,
}) => {
  const key = node.key;

  onSet((newValue) => {
    console.log('执行onSet', newValue);

    if (newValue instanceof DefaultValue) {
      clearStorageState(key);
    } else {
      setStorageState(key, newValue);
    }
  });
};

export const LastTableIdsUsed = atom<Map<string, string>>({
  key: 'lastTableIdUsedByApplicationId',
  default: new Map<string, string>(),
  effects_UNSTABLE: [sessionStorageEffect],
});

export function initializeLastTableIdsUsedState({ set }: MutableSnapshot) {
  console.log('执行atom初始化');
  const savedValue = getStorageValue<Map<string, string>>(
    'lastTableIdUsedByApplicationId',
  );

  if (savedValue) {
    set(LastTableIdsUsed, savedValue);
  }
}
