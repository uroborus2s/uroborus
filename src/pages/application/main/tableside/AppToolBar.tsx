import React, { useState } from 'react';
import { BaseColors, CSSPrefixRequiredProps } from '@/util';
import Icon from '@ibr/ibr-icon/Icon';
import { RiLayoutColumnFill } from 'react-icons/ri';
import { Typography } from '@material-ui/core';

const AppToolBar: React.FC<CSSPrefixRequiredProps> = ({ prefixCls }) => {
  const [clicked, setClicked] = useState(false);

  return (
    <div className={`${prefixCls}-tool-bar`}>
      {/*<div style={{ backgroundColor: getColor(appColorType) }}></div>*/}
      <div style={{ backgroundColor: BaseColors.lightGary3 }}>
        <Icon icon={RiLayoutColumnFill} size={18}></Icon>
        <Typography variant="subtitle2">应用栏</Typography>
      </div>
    </div>
  );
};

export default AppToolBar;
