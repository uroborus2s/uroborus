import { AppIconTypes, IconColorType } from '@/util';
import { TableInfoDTO, ViewListDTO } from '@/models/typedto';

export type ColorType = IconColorType;

export type IconType = AppIconTypes;

export type RefreshViewFun = (view: ViewListDTO) => void;
export type RefreshTableFun = (table: TableInfoDTO) => void;

/*************用户模版和用户账户模版********************/
//账户状态类型
export type AccountStateTypes = 'active' | 'suspended';
//权限类型
export type PermissionTypes = 'owner';

export type CellValueType = Record<string, string | boolean | string[]>;

/**************TableViewSchema*******************/
export type ViewSchemaType =
  | 'grid'
  | 'calendar'
  | 'kanban'
  | 'gallery'
  | 'form';

/*************************表格的列类型************************/
export type ColumnsType =
  | 'text'
  | 'foreignKey'
  | 'select'
  | 'checkbox'
  | 'date'
  | 'richText'
  | 'multipleAttachment'
  | 'collaborator';

export type AtomType =
  | string
  | ColorType
  | IconType
  | boolean
  | number
  | bigint
  | Array<string>
  | Record<string, string | boolean | number | bigint>
  | undefined;

export type StorageType<T> =
  | string
  | ColorType
  | IconType
  | boolean
  | number
  | bigint
  | Array<T>
  | undefined;

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

export const BaseKeys = {
  id: 'base/id',
  order: 'base/tables/order',
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

export type workspaceKeysKey = keyof typeof WorkspaceKeys;

export type BaseKeysKey = keyof typeof BaseKeys;

export type TableKeysKey = keyof typeof TableKeys;

export const TableKeys = {
  id: 'table/id',
  updated_at: 'table/updatedat',
  created_at: 'table/creatat',
  joined_at: 'table/joinedat',
  create_able: 'table/creatable',
  delete_able: 'table/deleteable',
  share_able: 'table/shareable',
  update_able: 'table/updateable',

  name: 'table/name',
  desc: 'table/desc',
  order: 'table/order',
  base_id: 'table/baseid',
  selected_view_id: 'table/lastusedviewid',

  columns: 'table/columns',
  views: 'table/views',
  collaborator: 'table/collaborators',
  rows: 'table/rows',
  relate_rows: 'table/relaterows',
};
