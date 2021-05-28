import { AppIconTypes, IconColorType, IdMode, IdNameMode } from '@/util';

/*************站点信息********************/
//当前用户站点信息模版
export interface SiteMode {
  baseUrl?: string;
  publicJsPath?: string;
  browserId?: string;
  csrfToken?: string;
  codeVersion?: string;
  runEnvironment?: string;
  pageLoadId?: string;
  secretSocketId?: string;
  socketServerBaseUrl?: string;
}

/*************用户模版和用户账户模版********************/
//账户状态类型
export type AccountStateTypes = 'active' | 'suspended';
//权限类型
export type PermissionTypes = 'owner';

//当前用户偏好数据模版
export interface PrefsMode {
  shouldPutNewWorkspacesOnCreatorPlan: boolean;
  questionnaireUsingAirtableFor: 'Other';
  showHomeScreenApplicationsAsList: boolean;
}

//当前用户账号信息模版
export interface UserAccountMode extends IdNameMode {
  firstName: string;
  lastName: string;
  email: string;
  state: AccountStateTypes;
  referralCode?: string;
  profilePicUrl: string;
  creditInCents?: number;
  createdTime: string;
  prefs: PrefsMode;
}

//当前用户协作者模版信息
export interface CollaboratorInfoMode {
  type: number;
  userId: string;
  permissionLevel: PermissionTypes;
  grantedByUserId: string;
  createdTime: string;
}

//当前用户用户基本信息模版
export interface UserInfoMode {
  userId?: string;
  emailDomain?: string;
  userCreatedTime?: string;
  isPubliclyShared?: boolean;
}

//当前用户登录信息模版
export interface userLoginMode {
  isLoggedIn: boolean;
  isFirstLogin: boolean;
  sessionUserId: string;
}

/*************用户工作空间模版*******************/
//当前用户工作空间信息模版
export interface WorkspaceMode extends IdNameMode {
  billingPlanId: string;
  enterpriseAccountId?: string | null;
  isBlockDevelopmentRestrictionEnabled?: boolean;
  appSharingWorkspace?: boolean;
}

/*************用户应用信息模版********************/

export interface ApplicationMode extends IdNameMode {
  description: string;
  revisionHistoryEnabled: boolean;
  color: IconColorType;
  icon: AppIconTypes;
  isOverPlanLimits: boolean;
}

/**************TableSchema*******************/
/**************当前页面展示的表格的定义模版*******************/
export interface TableSchemaMode extends IdNameMode {
  description?: string | null;
  primaryColumnId: string;
  viewSectionsById: Record<string, string>;
  externalTableSyncById: Record<string, string>;
}

/**************Current Table*******************/
/**************当前页面展示的表格的数据模版*******************/
export type OrderType = 'ascending';

export type TableCellMode = string | ForeignRowMode[] | string[];

export interface TableRowMode extends IdMode {
  createdTime: string;
}

/**************Current Table-Cell*******************/
/**************当前页面展示单元格数据模版*******************/
export interface CellKeyType {
  rowId: string | undefined | null | number;
  colId: string | undefined | null | number;
}

/**************Current Table-ViewInfo*******************/
/**************当前页面展示的视图模版*******************/
export interface ForeignRowMode {
  foreignRowId: string;
  foreignRowDisplayName: string;
}

export interface ColumnOrderMode {
  columnId: string;
  visibility: boolean;
  width?: number;
}

export interface RowOrderMode {
  rowId: string;
  visibility: boolean;
  width?: number;
}

export interface FilterSetMode extends IdMode {
  columnId: string;
  operator: 'contains';
  value: string | null;
}

export interface FiltersMode {
  conjunction?: 'and';
  filterSet?: FilterSetMode[];
}

export interface SortSetMode extends IdMode {
  columnId: string;
  ascending: boolean;
}

export interface LastSortsAppliedMode {
  shouldAutoSort: boolean;
  appliedTime: string;
  sortSet: SortSetMode[];
}

export interface GroupLevelMode extends IdMode {
  columnId: string;
  order: OrderType;
  emptyGroupState: 'hidden';
}

export interface ColorConfigMode {
  type: 'selectColumn';
  selectColumnId: string;
  colorDefinitions: null | string;
  defaultColor: string | null;
}

export interface MetadataMode {
  grid?: { rowHeight: 'large' };
}

/**************TableColumnSchema*******************/

export type ColumnType =
  | 'text'
  | 'multilineText'
  | 'multipleAttachment'
  | 'foreignKey';

export type TableColumnMode = IdNameMode &
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

export interface ForeignKeyOptionsMode {
  foreignTableId: string;
  relationship: string;
  symmetricColumnId: string;
  unreversed: boolean;
}

export interface SelectItemOptionsMode extends IdNameMode {
  color: string;
}

export interface SelectOptionsMode {
  choiceOrder: string[];
  choices: {
    [key: string]: SelectItemOptionsMode;
  };
}

export interface CheckboxOptionsMode {
  color: string;
  icon: string;
}

export interface MultiCollaboratorOptionsMode {
  shouldNotify: boolean;
}

export interface DaterOptionsMode {
  isDateTime: boolean;
  dateFormat: 'Local';
}

export interface MultipleAttachmentOptionsMode {
  unreversed: boolean;
}

/**************TableViewSchema*******************/
export type ViewSchemaType =
  | 'grid'
  | 'calendar'
  | 'kanban'
  | 'gallery'
  | 'form';

export interface ViewSchemaMode extends IdNameMode {
  type: ViewSchemaType;
  personalForUserId: string | null | undefined;
  description: string | null;
  createdByUserId: string | null;
}
