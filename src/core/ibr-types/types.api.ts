import {
  BaseRecordProps,
  Collaborators,
  ColorType,
  ColumnsType,
  ColumsTypeOptions,
  IconType,
  IDEntity,
  OrderEntity,
  TableRecordProps,
  UserRecordProps,
  ViewSchemaType,
  WorkspaceRecordProps,
} from './types.entity';

export const CodeMessage: { [key: number]: string } = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

export enum ResponseCode {
  Success,
  Failure,
}

export type Empty = Record<string, never>;

export type DataResponse<T extends Record<string, any> = Empty> = {
  code: number;
  data: T;
  message: string;
  trace_id: string;
};

export type CellValueType = Record<string, string | boolean | string[]>;

export type DataRsep = Pick<IDEntity, 'id'> & Pick<OrderEntity, 'order'>;

export type UserRsp = Omit<UserRecordProps, 'workspaceIds' | 'desc'>;

export type WorkspaceRsp = Omit<
  WorkspaceRecordProps,
  'baseIds' | 'collaborators'
> & {
  bases: BaseRsp[];
};

export type BaseRsp = Omit<BaseRecordProps, 'tableIds'> & {
  tables?: TableRsp[];
};

export type TableRsp = Omit<
  TableRecordProps,
  'columnIds' | 'viewIds' | 'rowIds'
> & {
  columns: [];
  rows: null;
  views: null;
};

export interface WorkspaceListRsp {
  data: WorkspaceRsp[];
  collaborators: Record<string, Collaborators[]>;
}

export type RowsListRsp = {
  id: string;
} & CellValueType;

export interface ColumnsListRsp {
  id: string;
  name: string;
  create_able: boolean;
  delete_able: boolean;
  share_able: boolean;
  update_able: boolean;
  desc: string;
  type: ColumnsType;
  options: ColumsTypeOptions[ColumnsType];
  color: string;
  primary: boolean;
}

export interface ViewListRsp {
  created_at: string;
  desc: string;
  group_by_column: string;
  hide_columns: string[];
  id: string;
  joined_at: string;
  name: string;
  order: number;
  row_colors: string;
  row_filters: string;
  sort_by_column: string;
  table_id: string;
  type: ViewSchemaType;
  updated_at: string;
  view_rows: ViewRowsRsp[] | null;
  view_columns: ViewColumnsRsp[] | null;
}

export interface ViewRowsRsp {
  order: number;
  row_id: string;
}

export interface ViewColumnsRsp {
  column_id: string;
  frozen: number;
  order: number;
  summary_type: number;
  width?: number;
}

/***************Request模版***********************/
export interface EditWorkspaceReq {
  name?: string;
  plan_id?: string;
}

export interface EditBaseReq {
  name?: string;
  color?: ColorType;
  desc?: string;
  icon?: IconType;
}
