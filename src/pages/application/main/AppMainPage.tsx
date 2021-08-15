import { CSSPrefixRequiredProps } from '@/util';
import React from 'react';
import TableSideBar from './tableside/TableSideBar';
import './main.scss';
import TableView from '@/pages/application/main/tableview/TableView';

const AppMainPage: React.FC<CSSPrefixRequiredProps> = ({ prefixCls }) => {
  const prefix = `${prefixCls}-main`;

  const handlerContext = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className={prefix} onContextMenuCapture={handlerContext}>
      <TableSideBar prefixCls={prefix} />
      <TableView prefixCls={prefix} />
    </div>
  );
};

export default AppMainPage;
