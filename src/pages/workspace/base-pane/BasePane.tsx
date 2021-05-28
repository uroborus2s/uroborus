import React from 'react';
import classNames from 'classnames';
import LeftNav from '@/pages/workspace/base-pane/leftnavigation/LeftNav';
import { CSSPrefixRequiredProps } from '@/util';
import RightList from '@/pages/workspace/base-pane/rightList/RightList';

const BasePane: React.FC<CSSPrefixRequiredProps> = ({
  prefixCls,
  className,
}) => {
  const currentPrefixCls = prefixCls.concat('-base-pane');
  console.log('BasePane');

  return (
    <div className={classNames(currentPrefixCls, className)}>
      <LeftNav prefixCls={currentPrefixCls}></LeftNav>
      <RightList prefixCls={currentPrefixCls}></RightList>
    </div>
  );
};

export default BasePane;
