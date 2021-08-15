import { atomFamily, DefaultValue } from 'recoil';
import { workspaceRepository } from '@/domain/workspace/workspace.repository';
import { localStorageAtomEffect } from '@ibr-class/entity';

export const workspaceNameEntity = atomFamily({
  key: 'workspace/name',
  default: '',
  effects_UNSTABLE: (workspaceId: string) => [
    localStorageAtomEffect(workspaceId, workspaceRepository, 'name'),
  ],
});

export const workspacePlanEntity = atomFamily({
  key: 'workspace/planId',
  default: '',
  effects_UNSTABLE: (workspaceId: string) => [
    localStorageAtomEffect(workspaceId, workspaceRepository, 'plan_id'),
  ],
});

export const workspaceEditStateEntity = atomFamily<boolean, string>({
  key: 'workspace/editstate',
  default: false,
});

//工作空间下的base 排序Id数组
export const baseIdsEntity = atomFamily<string[], string>({
  key: 'workspace/baseIds',
  default: [],
  effects_UNSTABLE: (workspaceId) => [
    localStorageAtomEffect(workspaceId, workspaceRepository, 'baseIds'),
  ],
});
