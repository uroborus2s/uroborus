import {
  ApplicationMode,
  CheckboxOptionsMode,
  CollaboratorInfoMode,
  DaterOptionsMode,
  ForeignKeyOptionsMode,
  MultiCollaboratorOptionsMode,
  MultipleAttachmentOptionsMode,
  SelectOptionsMode,
  TableSchemaMode,
  UserAccountMode,
  ViewSchemaType,
  WorkspaceMode,
} from '@/models';
import { AppIconTypes, IconColorType, IdMode, IdNameMode } from '@/util';

export type RequestBody<T extends Record<string, any>> = {
  stringifiedObjectParams: T;
  requestId: string;
  secretSocketId: string;
};

export type MoveWorksVO = {
  workspaceId: string;
  targetIndex: string;
};

export type UpdateColorVO = {
  color: string;
};

export type ReadDataVO = {
  includeDataForTableIds: string[];
  includeDataForViewIds: string | null;
  shouldIncludeSchemaChecksum: boolean;
};

export type ErrorDataType = {
  status: number;
  msg: string;
  errors: string[];
};

export type DataResponse<T extends Record<string, any>> = {
  data: T;
  msg: string;
};

/*******************UserInfo*************************/

/********************queryInitData指令的返回和参数***************************/
//request

//response
export interface QueryInitDataRsp {
  rawTables: RawTables;
  rawApplications: RawApplications;
  rawWorkspaces: RawWorkspaces;
  rawUsers: RawUsers;
  collaboratorsByWorkspaceId: CollaboratorsInfos;
  lastTableIdsUsedByApplicationId: Record<string, string>;
  sessionUserId: string;
}

export type RawTables = {
  [key: string]: TableSchemaMode;
};

export interface RawApplications {
  [key: string]: ApplicationMode & { visibleTableOrder?: string[] };
}

export interface RawWorkspaces {
  [key: string]: WorkspaceMode & { visibleApplicationOrder?: string[] };
}

export interface RawUsers {
  [key: string]: UserAccountMode & { visibleWorkspaceOrder?: string[] };
}

interface CollaboratorsInfos {
  [key: string]: CollaboratorInfoMode[];
}

/********************readAppInfo指令的返回和参数***************************/
//获取应用的数据
export interface ReadApplicationRsp extends IdNameMode {
  description: string;
  revisionHistoryEnabled: boolean;
  color: IconColorType;
  icon: AppIconTypes;
  isOverPlanLimits: boolean;
}

//获取应用下的table和view数据
//response

export interface ReadTableDataRsp {
  tableSchemas: TableSchemaRsp[];
  tableDatas: TableDataRsp;
  sortTiebreakerKey: string;
}

/********************表格的定义信息***************************/
export interface TableSchemaRsp extends IdNameMode {
  primaryColumnId: string;
  columns: TableColumnRsp[];
  viewOrder: string[];
  views: ViewRsp[];
  viewsById: { [key: string]: ViewRsp };
  viewSectionsById: Record<string, string>;
  externalTableSyncById: Record<string, string>;
  description?: string | null;
}

//表格视图定义信息
export interface ViewRsp extends IdNameMode {
  type: ViewSchemaType;
  personalForUserId: string | null | undefined;
  description: string | null;
  createdByUserId: string | null;
}

//表格列定义信息
export type TableColumnRsp = IdNameMode &
  (
    | { type: 'text' }
    | { type: 'foreignKey'; typeOptions: ForeignKeyOptionsMode }
    | { type: 'select'; typeOptions: SelectOptionsMode }
    | { type: 'checkbox'; typeOptions: CheckboxOptionsMode }
    | { type: 'multiCollaborator'; typeOptions: MultiCollaboratorOptionsMode }
    | { type: 'date'; typeOptions: DaterOptionsMode }
    | { type: 'richText' }
    | { type: 'multipleAttachment'; typeOptions: MultipleAttachmentOptionsMode }
    | { type: 'collaborator'; typeOptions: MultiCollaboratorOptionsMode }
  );

/********************表格的数据信息***************************/
export interface TableDataRsp extends IdMode {
  lastViewIdUsed: string;
  hasOnlyIncludedRowAndCellDataForIncludedViews: boolean;
  rows: RowsRsp[];
  viewDatas: ViewDataRsp[];
}

export interface RowsRsp {}

export interface ViewDataRsp {}
