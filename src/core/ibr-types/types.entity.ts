export type ColumsTypeOptions = {
  text: undefined;
  foreignKey: {
    foreignTableId: string;
    relationship: 'many';
    symmetricColumnId: string;
    unreversed: boolean;
  };
  select: {
    choiceOrder: string[];
    choices: Record<string, { id: string; name: string; color: 'cyanDark' }>;
  };
  checkbox: {
    color: 'orange';
    icon: 'check';
  };
  date: string;
  richText: string;
  multipleAttachment: string;
  collaborator: string;
};

export type ColumnsType =
  | 'text'
  | 'foreignKey'
  | 'select'
  | 'checkbox'
  | 'date'
  | 'richText'
  | 'multipleAttachment'
  | 'collaborator';

/**************TableViewSchema*******************/
export type ViewSchemaType =
  | 'grid'
  | 'calendar'
  | 'kanban'
  | 'gallery'
  | 'form';

export type UserRecordProps = Pick<IDEntity, 'id'> &
  Pick<NameEntity, 'name' | 'desc'> & {
    workspaceIds?: string[];
    avatar: string;
  };

export interface Collaborators {
  id: string;
  avatar: string;
  nickname: string;
  role?: number;
  created_at?: string;
  updated_at?: string;
  user_id?: string;
}

export type WorkspaceRecordProps = Pick<IDEntity, 'id'> &
  Pick<NameEntity, 'name' | 'desc'> &
  Pick<OrderEntity, 'order'> &
  Pick<LogEntity, 'created_at' | 'updated_at' | 'joined_at'> &
  Pick<
    PermissionEntity,
    'create_able' | 'delete_able' | 'update_able' | 'share_able'
  > & {
    user_role: number;
    plan_id: string;
    plan_name: string;
    shared_only_bases: boolean;
    baseIds: string[];
    collaborators: Collaborators[];
  };

export type BaseRecordProps = Pick<IDEntity, 'id'> &
  Pick<NameEntity, 'name' | 'desc'> &
  Pick<OrderEntity, 'order'> &
  Pick<LogEntity, 'created_at' | 'updated_at' | 'joined_at'> &
  Pick<
    PermissionEntity,
    'create_able' | 'delete_able' | 'update_able' | 'share_able'
  > & {
    icon: IconType;
    color: ColorType;

    user_role: 0;

    workspace_id?: string;
    selected_table_id?: string;
    collaborators: Collaborators[];
    tableIds?: string[];
  };

export type TableRecordProps = Pick<IDEntity, 'id'> &
  Pick<NameEntity, 'name' | 'desc'> &
  Pick<OrderEntity, 'order'> &
  Pick<LogEntity, 'created_at' | 'updated_at' | 'joined_at'> &
  Pick<
    PermissionEntity,
    'create_able' | 'delete_able' | 'update_able' | 'share_able'
  > & {
    base_id: string;
    columnIds: string[];
    viewIds: string[];
    rowIds: string[];
    selected_view_id?: string;
    collaborators: Collaborators[] | null;
    relate_rows: Record<string, any> | null;
  };

export type ViewRecordProps = Pick<IDEntity, 'id'> &
  Pick<LogEntity, 'created_at' | 'updated_at' | 'joined_at'> &
  Pick<NameEntity, 'name' | 'desc'> &
  Pick<OrderEntity, 'order'> & {
    table_id: string;
    type: ViewSchemaType;
    view_rows: null;
    view_columns: null;
    row_colors: string;
    row_filters: string;
    hide_columns: string;
    sort_by_column: string;
    group_by_column: string;
  };

export type ColumnRecordProps = Pick<IDEntity, 'id'> &
  Pick<NameEntity, 'name' | 'desc'> &
  Pick<
    PermissionEntity,
    'create_able' | 'delete_able' | 'update_able' | 'share_able'
  > & {
    color: ColorType;
    primary: boolean;
    type: ColumnsType;
    options: ColumsTypeOptions[ColumnsType];
  };

export type RowRecordProps = Pick<IDEntity, 'id'> & Record<string, any>;

export type BaseEffectsParms = {
  workspaceId: string;
  baseId: string;
};

export const baseEntityNames = {
  id: 'base/id',
  order: 'base/order',
  name: 'base/name',
  color: 'base/color',
  icon: 'base/icon',
  desc: 'base/desc',
  created_at: 'base/createdat',
  updated_at: 'base/createdat',
  joined_at: 'base/createdat',
  user_role: 'base/createdat',
  create_able: 'base/createable',
  delete_able: 'base/deleteable',
  share_able: 'base/shareable',
  update_able: 'CurrentAppUpdateAble',
  workspace_id: 'base/workspaceid',
  selected_table_id: 'base/lastusedtableid',
  collaborators: 'base/collaborators',
  tables: 'base/tables',
};

export const tableEntityNames = {
  id: 'table/id',
  updated_at: 'table/updatedat',
  created_at: 'table/createdat',
  joined_at: 'table/joinedat',
  create_able: 'table/createable',
  delete_able: 'table/deleteable',
  share_able: 'table/shareable',
  update_able: 'table/updateable',

  name: 'tables/name',
  desc: 'tables/desc',
  order: 'tables/order',
  base_id: 'tables/base_id',
};

export type LocalKeyType = keyof typeof baseEntityNames;
