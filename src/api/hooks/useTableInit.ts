import { useRequest } from '@/servers';
import { readAppInfo, readCurrentApplication } from '@/api/application-api';
import { useRecoilCallback, useSetRecoilState } from 'recoil';
import {
  ColumnSchemas,
  LastTableIdsUsed,
  LastViewIdUsed,
  SortTiebreakerKey,
  TableColumnMode,
  TableRows,
  TableSchemaMode,
  TableSchemas,
  UsedApplication,
  ViewSchemaMode,
  ViewSchemas,
} from '@/models';
import { TableDataRsp, TableSchemaRsp } from '@/api';
import { SortMap } from '@/core/sortmap/sortmap';

export function useTableDetails(appId: string) {
  // const currentTableId = getStorageValue(
  //   'lastTableIdUsedByApplicationId',
  //   new Map(),
  // ).get(appId);
  const currentTableId = useRecoilCallback(({ snapshot }) => () =>
    snapshot.getLoadable(LastTableIdsUsed).getValue().get(appId),
  )();

  //string
  const setTieKey = useSetRecoilState(SortTiebreakerKey);
  //Map<string, TableSchemaMode>
  const setTableSchemas = useSetRecoilState(TableSchemas);
  //Map<string, ViewSchemaMode>
  const setViewSchemas = useSetRecoilState(ViewSchemas);
  //Map<string, TableColumnMode>
  const setColumnSchemas = useSetRecoilState(ColumnSchemas);

  let currentAppId: string;

  const { data, error, loading } = useRequest(() =>
    readAppInfo(appId, {
      stringifiedObjectParams: {
        includeDataForTableIds: [currentTableId ?? ''],
        includeDataForViewIds: null,
        shouldIncludeSchemaChecksum: false,
      },
      requestId: 'req591CRrGyLHphW3',
      secretSocketId: 'socIINJhdeE9OReDs',
    }),
  );

  if (currentTableId) {
    if (data) {
      const res = data.data;
      const msg = data.msg;
      if (res.sortTiebreakerKey) currentAppId = res.sortTiebreakerKey;
      else currentAppId = appId;

      //定义当前表格的定义
      if (res.tableSchemas) {
        const { columnSchemas, tableSchemas, viewSchemas } = parseTableSchemas(
          res.tableSchemas,
          currentAppId,
        );
        setTableSchemas(new SortMap({ arrayData: tableSchemas }));
        setColumnSchemas(new SortMap({ arrayData: columnSchemas }));
        setViewSchemas(new SortMap({ arrayData: viewSchemas }));
      }
      //获取当前表格的数据
      if (res.tableDatas) {
        const { lastViewIdUsed } = parseTableData(res.tableDatas);
      }
      setTieKey(currentAppId);
    }

    return { loading, error };
  } else return null;
}

export function useReqestApplication(appId: string) {
  const setAppInfo = useSetRecoilState(UsedApplication);

  const { data, error, loading } = useRequest(() =>
    readCurrentApplication(appId),
  );

  if (data) setAppInfo(data.data);

  return { loading, error };
}

//解析返回的值 返回值的tableSchemas字段
function parseTableSchemas(schemas: TableSchemaRsp[], currentAppId: string) {
  const tableSchemas = new Map<string, TableSchemaMode[]>();
  const columnSchemas = new Map<string, TableColumnMode[]>();
  const tSchemas: TableSchemaMode[] = [];
  const viewSchemas = new Map<string, ViewSchemaMode[]>();

  schemas.forEach((schema) => {
    const { columns, viewOrder, views, viewsById, ...tabSchemaOption } = schema;
    const { id } = tabSchemaOption;
    columnSchemas.set(id, columns);
    viewSchemas.set(id, views);
    tSchemas.push(tabSchemaOption);
  });
  tableSchemas.set(currentAppId, tSchemas);
  return { columnSchemas, tableSchemas, viewSchemas };
}

//解析当前表格的数据 tableDatas 字段
function parseTableData(tableData: TableDataRsp) {
  const lastViewIdUsed = tableData.lastViewIdUsed;
  return { lastViewIdUsed };
}
