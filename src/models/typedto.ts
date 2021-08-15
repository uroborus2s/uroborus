import {
  CellValueType,
  ColorType,
  ColumnsType,
  ColumsTypeOptions,
  IconType,
  ViewSchemaType,
} from './types';

export interface UserDataDTO {
  data: WorkspaceRSPDTO[];
  collaborators: Record<string, CollaboratorsDTO[]>;
}

/***********工作空间**************/
export interface WorkspaceRSPDTO {
  id: string;
  name: string;
  user_role: number;
  order: number;
  plan_id: string;
  plan_name: string;
  joined_at: string;
  updated_at: string;
  created_at: string;

  shared_only_bases: boolean;
  create_able: boolean;
  share_able: boolean;
  update_able: boolean;
  delete_able: boolean;
  bases: ApplicationDTO[];
}

export interface WorkspaceDTO extends WorkspaceRSPDTO {
  collaborator: CollaboratorsDTO[];
}

/***********应用base**************/
export interface ApplicationDTO {
  id: string;
  order: number;
  name: string;
  icon: IconType;
  color: ColorType;
  created_at: string;
  updated_at: string;
  joined_at?: string;

  user_role: 0;

  create_able: boolean;
  delete_able: boolean;
  share_able: boolean;
  update_able: boolean;
  desc?: string;
  workspace_id?: string;
  selected_table_id?: string;
  collaborators: CollaboratorsDTO[];
  tables: TableInfoDTO[];
}

/***********表格数据**************/
export type TableInfoDTO = {
  id: string;
  updated_at: string;
  created_at: string;
  joined_at: string;
  create_able: boolean;
  delete_able: boolean;
  share_able: boolean;
  update_able: boolean;

  name: string;
  desc: string;
  order: number;
  base_id: string;
  selected_view_id: string;

  columns: ColumnsListDTO[] | null;
  views: ViewListDTO[] | null;
  collaborator: CollaboratorsDTO[] | null;
  rows: RowsListDTO[] | null;
  relate_rows: Record<string, any>;
};

export interface ViewRowsDTO {
  order: number;
  row_id: string;
}

export interface ViewColumnsDTO {
  column_id: string;
  frozen: number;
  order: number;
  summary_type: number;
  width?: number;
}

export interface ViewListDTO {
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
  view_rows: ViewRowsDTO[] | null;
  view_columns: ViewColumnsDTO[] | null;
}

export interface ColumnsListDTO<
  K extends keyof ColumsTypeOptions = ColumnsType
> {
  id: string;
  name: string;
  create_able: boolean;
  delete_able: boolean;
  share_able: boolean;
  update_able: boolean;
  desc: string;
  type: K;
  options: ColumsTypeOptions[K];
  color: string;
  primary: boolean;
}

export type RowsListDTO = {
  id: string;
} & CellValueType;

export interface TableDataDTO {
  id: string;
  updated_at: string;
  created_at: string;
  joined_at: string;
  create_able: boolean;
  delete_able: boolean;
  share_able: boolean;
  update_able: boolean;

  name: string;
  desc: string;
  order: number;
  base_id: string;
  columns: ColumnsListDTO[] | null;
  views: ViewListDTO[] | null;
  selected_view_id: string;
  collaborator: CollaboratorsDTO[] | null;
  rows: RowsListDTO[] | null;
  relate_rows: Record<string, any>;
}

/**************协作者******************/
export interface CollaboratorsDTO {
  id: string;
  avatar: string;
  nickname: string;
  role?: number;
  created_at?: string;
  updated_at?: string;
  user_id?: string;
}
