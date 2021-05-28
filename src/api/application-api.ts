import { api } from '@/api/api-path';
import {
  DataResponse,
  ReadApplicationRsp,
  ReadDataVO,
  ReadTableDataRsp,
  RequestBody,
  UpdateColorVO,
} from '@/api/api-types';
import { request } from '@/servers';

export async function updateAppColor(
  appId: string,
  body: RequestBody<UpdateColorVO>,
): Promise<any> {
  return request(api.workspace.path.updateAppColor(appId), {
    method: 'post',
    data: body,
  });
}

export async function readAppInfo(
  appId: string,
  body: RequestBody<ReadDataVO>,
): Promise<DataResponse<ReadTableDataRsp>> {
  return request(api.workspace.path.readAppInfo(appId), {
    params: body,
  });
}

export async function testError() {
  return request('/error');
}

export async function readCurrentApplication(
  appId: string,
): Promise<DataResponse<ReadApplicationRsp>> {
  return request(api.workspace.path.readCurrentApplication(appId));
}
