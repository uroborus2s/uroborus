import React, { MouseEvent } from 'react';
import { List } from '@material-ui/core';
import { cssOverflowY, CSSPrefixRequiredProps } from '@/util';
import classNames from 'classnames';
import TableTitleItem from './TableTitleItem';
import { useRecoilState, useRecoilValue } from 'recoil';
import { LastTableIdsUsed, SortTiebreakerKey, TableSchemas } from '@/models';

const TableList: React.FC<CSSPrefixRequiredProps> = ({ prefixCls }) => {
  const appId = useRecoilValue(SortTiebreakerKey);
  const tables = useRecoilValue(TableSchemas).getSortResultOfKey(appId);

  const [lastUsedTable, setLastUseTable] = useRecoilState(LastTableIdsUsed);

  const selectId = lastUsedTable.get(appId);
  const handlerSelect = (e: MouseEvent<HTMLElement>) => {
    if (e.currentTarget.id) {
      lastUsedTable.set(appId, e.currentTarget.id);
      setLastUseTable(new Map([...lastUsedTable]));
    }
  };

  return (
    <List
      component="nav"
      classes={{ root: classNames(`${prefixCls}-table-list `, cssOverflowY) }}
    >
      {tables &&
        tables.map((table) => (
          <TableTitleItem
            key={table.id}
            table={table}
            prefixCls={prefixCls}
            onSelect={handlerSelect}
            selected={selectId!}
          ></TableTitleItem>
        ))}
    </List>
  );
};

export default TableList;
