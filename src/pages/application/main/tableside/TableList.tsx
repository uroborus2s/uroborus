import React, { MouseEvent } from 'react';
import { List } from '@material-ui/core';
import { cssOverflowY, CSSPrefixRequiredProps } from '@/util';
import classNames from 'classnames';
import TableTitleItem from './TableTitleItem';
import { useRecoilState, useRecoilValue } from 'recoil';
import { baseState } from '@/models/baseState';

const TableList: React.FC<CSSPrefixRequiredProps> = ({ prefixCls }) => {
  const tables = useRecoilValue(baseState.tablesOrder);

  const [selectId, setSelect] = useRecoilState(baseState.lastUsedTableId);

  const handlerSelect = (e: MouseEvent<HTMLElement>) => {
    if (e.currentTarget.id) {
      setSelect(e.currentTarget.id);
    }
  };

  return (
    <List
      component="nav"
      classes={{ root: classNames(`${prefixCls}-table-list `, cssOverflowY) }}
    >
      {tables &&
        tables.map((tableId) => (
          <TableTitleItem
            key={tableId}
            tableId={tableId}
            prefixCls={prefixCls}
            onSelect={handlerSelect}
            selected={selectId === tableId}
          />
        ))}
    </List>
  );
};

export default TableList;
