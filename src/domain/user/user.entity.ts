//workspace的排序模型
import { atom } from 'recoil';
import { userRepository } from '@/domain/user/user.repository';

export const workspaceIdsEntity = atom<string[]>({
  key: 'user/workspaceIds',
  default: [],
  effects_UNSTABLE: [
    ({ setSelf }) => {
      setSelf(userRepository.workspaceIds);
    },
  ],
});
