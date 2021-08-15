import React from 'react';
import classNames from 'classnames';
import { cssFlexNone, CSSPrefixRequiredProps } from '@/util';

const TabDivider: React.FC<CSSPrefixRequiredProps> = ({
  prefixCls,
  className,
}) => {
  const classes = classNames(
    prefixCls.concat('-divider'),
    cssFlexNone,
    className,
  );
  return <div className={classes}></div>;
};

export default TabDivider;
