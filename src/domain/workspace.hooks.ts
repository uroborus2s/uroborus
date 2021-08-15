//新增workspace信息
import { useRecoilCallback } from 'recoil';
import { WorkspaceService } from '@/core/ibr-types';

export function useNewWorkspaceService() {
  const craetWorkspaceService = useRecoilCallback(
    ({ set }) => async () => {
      try {
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    [],
  ) as WorkspaceService;

  return craetWorkspaceService;
}
