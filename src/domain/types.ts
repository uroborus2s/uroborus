import { BaseIconType, ColorType } from '@/core/util';
import { CancelToken } from 'axios';
import { DependencyList, Dispatch, SetStateAction } from 'react';
import { TransactionInterface_UNSTABLE } from 'recoil';

/********************************************************************/
/********          useDispath                             **********/
/******************************************************************/
export type ReduceFun = (
  inter: TransactionInterface_UNSTABLE,
  options: CommandOptions,
) => [TransactionInterface_UNSTABLE, CommandOptions];

export type PureFun = (
  inter: TransactionInterface_UNSTABLE,
  options: CommandOptions,
) => void;

export type CommandFun = (options: CommandOptions) => Promise<CommandOptions>;

export type CommandOptions<T = any> = {
  name: string;
  token?: CancelToken;
  response?: T;
  message?: string;
  dispatch?: (action: Dispatch<SetStateAction<any>>) => void;
  [key: string]: any;
} & {
  request?: CommandRunOptions;
};

export type CommandRunOptions = {
  //body参数,作为请求体被发送的数据
  // 仅适用 'PUT', 'POST', 'DELETE 和 'PATCH' 请求方法
  data?: Record<string, any>;
  //请求一起发送的 URL 参数
  params?: Record<string, any>;
  //路径参数
  path?: Record<string, any>;
};

export interface FetchResult<R> {
  loading: boolean;
  data: R | undefined;
  error: Error | undefined;
  params: CommandRunOptions;
  cancel: NoopFun;
  refresh: NoopFun;
  mutate: (data: R | undefined | ((data: R) => R)) => void;
  run: (config?: CommandRunOptions) => Promise<any>;
  unmount: NoopFun;
}

export type InitStateOptions<R> = Partial<
  Pick<FetchResult<R>, 'loading' | 'data' | 'error' | 'params'>
>;

export type DispathResult<R> = {
  reset: () => void;
} & Pick<
  FetchResult<R>,
  'loading' | 'data' | 'error' | 'params' | 'run' | 'cancel'
>;

export declare type NoopFun = (...args: any[]) => void;

export declare type DispathOptions<R extends CommandOptions> = {
  request?: CommandRunOptions;
} & {
  formatResult?: (res: CommandOptions) => R;
  refreshDeps?: DependencyList;
  //如果设置为 true，则需要手动调用 run 触发执行。
  //默认false
  manual?: boolean;
  onSuccess?: (data: R, params?: CommandRunOptions) => void;
  onError?: (e: Error, params?: CommandRunOptions) => void;
  //设置显示 loading 的延迟时间，避免闪烁
  loadingDelay?: number;
  //轮询间隔，单位为毫秒。设置后，将进入轮询模式，定时触发 run
  pollingInterval?: number;
  //如果设置为 false , 在页面隐藏时会暂时停止轮询，页面重新显示时继续上次轮询
  /**/ pollingWhenHidden?: boolean;
  paginated?: false;
  loadMore?: false;
  //在屏幕重新获取焦点或重新显示时，是否重新发起请求。默认为 false，即不会重新发起请求。
  //如果设置为 true，在屏幕重新聚焦或重新显示时，会重新发起请求。
  refreshOnWindowFocus?: boolean;
  //屏幕重新聚焦，如果每次都重新发起请求，不是很好，我们需要有一个时间间隔，在当前时间间隔内，不会重新发起请求
  //需要配和 refreshOnWindowFocus 使用。默认值5000
  focusTimespan?: number;
  //防抖间隔, 单位为毫秒，设置后，请求进入防抖模式。
  debounceInterval?: number;
  //节流间隔, 单位为毫秒，设置后，请求进入节流模式。
  throttleInterval?: number;
  initialData?: R;
  dispatch?: Dispatch<SetStateAction<any>>;
};

export declare type FetchOptions<R extends CommandOptions> = Pick<
  DispathOptions<R>,
  | 'formatResult'
  | 'onSuccess'
  | 'onError'
  | 'loadingDelay'
  | 'pollingInterval'
  | 'pollingWhenHidden'
  | 'refreshOnWindowFocus'
  | 'focusTimespan'
  | 'debounceInterval'
  | 'throttleInterval'
>;

/********************************************************************/
/********          response core                          **********/
/******************************************************************/
export type Empty = Record<string, never>;

export type DataResponse<T extends Record<string, any> = Empty> = {
  code: number;
  data: T;
  message: string;
  trace_id: string;
};

/******************************************************************/
export interface IDEntity {
  id: string;
}

export interface NameEntity {
  name: string;
  desc?: string;
}

export interface OrderEntity {
  order: number;
}

export interface PermissionEntity {
  create_able: boolean;
  delete_able: boolean;
  share_able: boolean;
  update_able: boolean;
}

export interface LogEntity {
  updated_at: string;
  created_at: string;
  joined_at: string;
}

export type DataRsep = IDEntity & OrderEntity;

/********************************************************************/
/********       collaborator response                     **********/
/******************************************************************/
export type Collaborators = IDEntity & {
  avatar: string;
  nickname: string;
  role?: number;
  created_at?: string;
  updated_at?: string;
  user_id?: string;
};

/********************************************************************/
/********          home response                     **********/
/******************************************************************/

/******************************************************************/
export interface WorkspaceListRsp {
  data: WorkspaceRsp[];
  collaborators: Record<string, Collaborators[]>;
}

export type WorkspaceRsp = IDEntity &
  NameEntity &
  OrderEntity &
  LogEntity &
  PermissionEntity & {
    user_role: number;
    plan_id: string;
    plan_name: string;
    shared_only_bases: boolean;
    bases: Omit<BaseRsp, 'tables'>[];
    collaborators: Collaborators[];
  };

export type WorkspaceEntity = Omit<WorkspaceRsp, 'bases'> & {
  baseIds: string[];
};

export type WorkspacesData = Pick<WorkspaceEntity, 'id' | 'name'> & {
  baseNumber: number;
};

/********************************************************************/
/********          base response                          **********/
/******************************************************************/

/******************************************************************/
export type BaseRsp = IDEntity &
  NameEntity &
  OrderEntity &
  LogEntity &
  PermissionEntity & {
    icon: BaseIconType;
    color: ColorType;
    user_role: 0;
    workspace_id?: string;
    selected_table_id?: string;
    collaborators: Collaborators[];
    tables: TableRsp[];
  };

export type BaseEntity = Omit<BaseRsp, 'tables'> & {
  tableIds: string[];
};

/********************************************************************/
/********          table response                         **********/
/******************************************************************/

/******************************************************************/
export type TableRsp = IDEntity &
  NameEntity &
  OrderEntity &
  LogEntity &
  PermissionEntity & {
    base_id: string;
    columnIds: string[];
    viewIds: string[];
    rowIds: string[];
    selected_view_id?: string;
    collaborators: Collaborators[] | null;
    relate_rows: Record<string, any> | null;
  };
