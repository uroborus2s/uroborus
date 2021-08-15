import React, {
  ForwardRefRenderFunction,
  LegacyRef,
  Ref,
  useEffect,
  useRef,
  useState,
} from 'react';
import ColumnHead from '@ibr/ibr-table/ColumnHead';
import FixedColumns from '@ibr/ibr-table/FixedColumns';
import TableCells from '@ibr/ibr-table/TableCells';
import { CSSPrefixProps, getPrefixCls } from '@/util';
import './styles/index.scss';
import classNames from 'classnames';
import useForkRef from '@/util/hooks/useForkRef';

interface TableGridProps extends CSSPrefixProps {
  maxHeight?: number;
}

const TableGrid: ForwardRefRenderFunction<HTMLDivElement, TableGridProps> = (
  { prefixCls, className, maxHeight },
  ref,
) => {
  const preClass = getPrefixCls('table', prefixCls);
  const [fixColNum, setFixColNum] = useState(0);
  const tableRef = useRef<HTMLDivElement>();
  const colHeadRef = useRef<HTMLDivElement>();

  const [scrollOverStyle, setScrollOverStyle] = useState({
    height: 0,
    top: 0,
    width: 0,
    left: 0,
  });

  useEffect(() => {
    if (tableRef.current && colHeadRef.current) {
      const colHeadRect = colHeadRef.current.getBoundingClientRect();
      const tableRect = tableRef.current.getBoundingClientRect();
      const height = maxHeight ?? tableRect.height;
      setScrollOverStyle({
        height: height - colHeadRect.height,
        top: tableRef.current.offsetTop + colHeadRect.height,
        width: tableRect.width,
        left: tableRef.current.offsetLeft,
      });
    }
  }, [maxHeight]);

  return (
    <>
      <div
        className={classNames(preClass, className)}
        ref={useForkRef(ref, tableRef) as LegacyRef<HTMLDivElement>}
      >
        <FixedColumns prefixCls={preClass} colNum={fixColNum}></FixedColumns>
        <ColumnHead
          prefixCls={`${preClass} - col - head`}
          ref={colHeadRef as Ref<HTMLDivElement>}
        ></ColumnHead>
        <TableCells></TableCells>
      </div>
      <div className={`${preClass} - scroll`} style={scrollOverStyle}>
        <div
          style={{
            width: '2806px',
            height: '1870px',
          }}
        ></div>
        <div
          style={{ transform: 'translateX(0px)', width: '433px' }}
          className={classNames(
            `${preClass} - scroll - scrollbar`,
            `${preClass} - scroll - scrollbar - horizontal`,
          )}
        ></div>
        <div
          style={{ transform: 'translateY(0px)', height: '433px' }}
          className={classNames(
            `${preClass} - scroll - scrollbar`,
            `${preClass} - scroll - scrollbar - vertical`,
          )}
        ></div>
      </div>
    </>
  );
};

export default React.forwardRef(TableGrid);
