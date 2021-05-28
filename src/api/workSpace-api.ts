import { api } from './api-path';
import { MoveWorksVO, QueryInitDataRsp, RequestBody } from '@/api/api-types';
import { request } from '@/servers';
import { RequestResponse } from 'umi-request';

//Get
export async function queryInitData(): Promise<QueryInitDataRsp> {
  return request('/initDatas');
}

//post
export async function moveWorkspace(
  userid: string,
  body: RequestBody<MoveWorksVO>,
): Promise<any> {
  return request(api.workspace.path.moveWorkspace(userid), {
    method: 'post',
    data: body,
  });
}
