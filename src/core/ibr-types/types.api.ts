import { IDEntity, OrderEntity } from '@/domain';
import {
  BaseRecordProps,
  Collaborators,
  ColumnsType,
  ColumsTypeOptions,
  TableRecordProps,
  UserRecordProps,
  ViewSchemaType,
  WorkspaceRecordProps,
} from './types.entity';

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
