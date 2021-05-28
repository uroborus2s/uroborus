import React from 'react';
import classNames from 'classnames';
import { CSSPrefixRequiredProps } from '@/util';

const TabDivider: React.FC<CSSPrefixRequiredProps> = ({
  prefixCls,
  className,
}) => {
  const classes = classNames(prefixCls.concat('-divider'), className);
  return <div className={classes}></div>;
};

export default TabDivider;
