import React, { CSSProperties } from 'react';
import { CSSPrefixRequiredProps } from '@/util';
import './styles/fixcol.scss';

interface FixedColumnsProps extends CSSPrefixRequiredProps {
  colNum: number;
}

const FixedColumns: React.FC<FixedColumnsProps> = ({ prefixCls }) => {
  // const tableId = useRecoilValue();

  const headStyle: CSSProperties = {
    display: 'flex',
  };

  return (
    <div className={`${prefixCls}-fix-col-wrap`}>
      <div className={`${prefixCls}-fix-col-wrap-header`} style={headStyle}>
        <div className={`${prefixCls}-row-number`}></div>
      </div>
    </div>
  );
};

export default FixedColumns;
