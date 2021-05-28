import { atom } from 'recoil';
import {
  ApplicationMode,
  CellKeyType,
  ColumnOrderMode,
  FiltersMode,
  RowOrderMode,
  TableCellMode,
  TableRowMode,
} from '../types';

export const LastViewIdUsed = atom({
  key: 'lastViewIdUsed',
  default: '',
});

export const UsedApplication = atom<ApplicationMode>({
  key: 'usedApplication',
  // @ts-ignore
  default: {},
});

//当前页面展示的表格内容
//rows:表格的所有行的内容
//viewDatas:表格的所有视图内容
//lastViewIdUsed:最后一次使用的视图ID，打开表格后当前展示的view视图
export const TableRows = atom({
  key: 'currentTable',
  default: new Map<string, TableRowMode>(),
});

//当前页面展示的表格的所有单元格的值
//key:单元格的行id和列id columnId:rowID，value:单元格的值内容
export const TableCellValues = atom({
  key: 'tableCellValues',
  default: new Map<string, TableCellMode>(),
});

//当前页面展示的表格的ViewId
export const CurrentTableViewId = atom({
  key: 'currentTableViewId',
  default: '',
});

//当前页面展示的表格的View的固定列数量
const FrozenColumnCount = atom({
  key: 'frozenColumnCount',
  default: '',
});

const DescriptionOfView = atom({
  key: 'descriptionOfView',
  default: '',
});

const ViewCreatedByUserId = atom({
  key: 'viewCreatedByUserId',
  default: '',
});

//当前页面展示的表格的View的列排列顺序
const ColumnOrderOfView = atom<ColumnOrderMode[]>({
  key: 'columnOrderOfView',
  default: [],
});

//当前页面展示的表格的View的列排列顺序
const RowOrderOfView = atom<RowOrderMode[]>({
  key: 'rowOrderOfView',
  default: [],
});

//当前页面展示的表格的View的列排列顺序
const FiltersOfView = atom<FiltersMode>({
  key: 'filtersOfView',
  default: {},
});

const LastSortsAppliedOfView = atom({
  key: 'lastSortsAppliedOfView',
  default: {},
});

const GroupLevelsOfView = atom({
  key: 'groupLevelsOfView',
  default: {},
});

const MetadataOfView = atom({
  key: 'metadataOfView',
  default: {},
});

const SharesByIdOfview = atom({
  key: 'sharesByIdOfview',
  default: {},
});

export function equalCellKey(key: CellKeyType, newKey: CellKeyType): boolean {
  if (!key.colId || !key.rowId || !newKey.rowId || !newKey.colId) {
    return false;
  } else {
    if (key.rowId === newKey.rowId && key.colId === key.colId) {
      return true;
    } else return false;
  }
}
