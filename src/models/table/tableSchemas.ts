import { atom } from 'recoil';
import { TableColumnMode, TableSchemaMode, ViewSchemaMode } from '../types';
import { SortMap } from '@/core/sortmap/sortmap';

//当前展示页面的应用Key
export const SortTiebreakerKey = atom({
  key: 'sortTiebreakerKey',
  default: '',
});

/**************当前表格基本信息定义*******************/
//当前用户下的所有表格的基本信息
//从接口数据获取的数据 tableSchemas
//key:tableId,value:表格的id，name，description和primaryColumnId
export const TableSchemas = atom({
  key: 'tableKeys',
  default: new SortMap<string, TableSchemaMode>(),
});

/**************当前表格列定义*******************/
//当前页面展示应用下的所有表格的列定义信息
// value通过接口数据的数据字段 tableSchemas[tableId].columns 获取
//key:tableID,value:表格的列定义信息
export const ColumnSchemas = atom({
  key: 'columnSchemas',
  default: new SortMap<string, TableColumnMode>(),
});

/**************当前表格视图定义*******************/
//当前页面展示应用下的所有表格的视图定义信息
//key:tableID,value:表格的视图定义信息
export const ViewSchemas = atom({
  key: 'viewSchemas',
  default: new SortMap<string, ViewSchemaMode>(),
});
