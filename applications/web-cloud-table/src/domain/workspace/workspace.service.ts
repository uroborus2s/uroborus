import {
  api,
  CREATWORKSPACE,
  DELETEWORKSPACE,
  EDITWORKSPACE,
  READWORKSPACELIST,
} from '@/domain/domain.command';
import { NullResponseError, ResolvingError } from '@/domain/error';
import { ServiceCodeError } from '@/domain/request/error';
import {
  BaseEntity,
  CommandOptions,
  DataResponse,
  WorkspaceEntity,
  WorkspaceListRsp,
  WorkspaceRsp,
} from '@/domain/types';
import { calcSort, cmdDispatcher, transformResponse, validator } from '../core';
import request, { ResponseCode } from '../request/request';

const readAllWorkspaceList = async function (options: CommandOptions) {
  const [err, res] = await request(api.path.workspace(), {
    cancelToken: options.token,
  });
  if (err != null) return Promise.reject(err);
  if (res) {
    const { data: rData, code } = res.data as DataResponse<WorkspaceListRsp>;
    if (code == ResponseCode.Failure)
      return Promise.reject(new ServiceCodeError(code));
    const { data, collaborators } = rData;
    if (validator(data)) {
      const wIds = calcSort(data);
      const baseArrays: BaseEntity[] = [];
      const workspaceArrays: WorkspaceEntity[] = data.map((workspce) => {
        const { bases, ...info } = workspce;
        const bIds = calcSort(bases);
        bases.forEach((base) => {
          const tIds: string[] = [];
          baseArrays.push({ ...base, tableIds: tIds });
        });
        return {
          ...info,
          collaborators: collaborators[workspce.id] ?? [],
          baseIds: bIds,
        };
      });
      const res1 = {
        ...(options.response || {}),
        bases: baseArrays,
        workspaces: workspaceArrays,
        ids: wIds,
      };
      return { ...options, response: res1 };
    } else {
      return Promise.reject(new ResolvingError());
    }
  } else {
    return Promise.reject(new NullResponseError());
  }
};

const creatWorkspace = async function (options: CommandOptions) {
  const [err, res] = await request(api.path.workspace(), {
    cancelToken: options.token,
    method: 'post',
    data: { ...options.request?.data },
  });
  if (err != null) return Promise.reject(err);
  if (res) {
    const { data, code } = res.data as DataResponse<{ id: string }>;
    if (code == ResponseCode.Failure)
      return Promise.reject(new ServiceCodeError(code));

    const [err1, res1] = await request(api.path.workspace(data.id));
    if (err1 != null) return Promise.reject(err1);
    if (res1) {
      const { data, code } = res1.data as DataResponse<WorkspaceRsp>;
      if (code == ResponseCode.Failure)
        return Promise.reject(new ServiceCodeError(code));
      const { bases, ...others } = data;
      const baseIds = bases.map((base) => base.id);
      const workspace = { ...others, baseIds: baseIds };
      return { ...options, response: { workspace: workspace, bases: bases } };
    }
  }
  return Promise.reject(new NullResponseError());
};

const editWorkspace = async function (options: CommandOptions) {
  const [err, res] = await request(
    api.path.workspace(options.request?.path?.id),
    {
      cancelToken: options.token,
      method: 'put',
      data: { ...options.request?.data },
    },
  );
  return transformResponse(options, err, res);
};

const deleteWorkspace = async function (options: CommandOptions) {
  const [err, res] = await request(
    api.path.workspace(options.request?.path?.id),
    {
      cancelToken: options.token,
      method: 'delete',
      data: { ...options.request?.data },
    },
  );
  return transformResponse(options, err, res);
};

export default cmdDispatcher({
  [READWORKSPACELIST]: readAllWorkspaceList,
  [CREATWORKSPACE]: creatWorkspace,
  [EDITWORKSPACE]: editWorkspace,
  [DELETEWORKSPACE]: deleteWorkspace,
});
