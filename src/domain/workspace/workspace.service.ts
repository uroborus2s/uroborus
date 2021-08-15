import { useRecoilCallback, useSetRecoilState } from 'recoil';
import { workspaceNameEntity, workspacePlanEntity } from './workspace.entity';
import { api, request } from '@ibr-request/index';
import {
  DataResponse,
  EditWorkspaceReq,
  PromiseService,
} from '@ibr-types/index';

export function useEditWorkspaceService(workspaceId: string) {
  const setName = useSetRecoilState(workspaceNameEntity(workspaceId));
  const setPlanId = useSetRecoilState(workspacePlanEntity(workspaceId));

  return useRecoilCallback(
    () => async (data: EditWorkspaceReq) => {
      try {
        const resp = await request(api.path.workspace(workspaceId), {
          method: 'put',
          data: data,
        });
        if (data.name) setName(data.name);
        if (data.plan_id) setPlanId(data.plan_id);
        return resp.data as DataResponse;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    [],
  ) as PromiseService<[EditWorkspaceReq]>;
}
