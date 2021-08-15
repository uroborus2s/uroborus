import React, { ForwardRefRenderFunction } from 'react';
import { CSSPrefixRequiredProps } from '@/util';

interface ColumnHeadProps extends CSSPrefixRequiredProps {}

const ColumnHead: ForwardRefRenderFunction<HTMLDivElement, ColumnHeadProps> = (
  { prefixCls },
  ref,
) => {
  return (
    <div className={prefixCls} ref={ref}>
      <div></div>
      {}
    </div>
  );
};

export default React.forwardRef(ColumnHead);
