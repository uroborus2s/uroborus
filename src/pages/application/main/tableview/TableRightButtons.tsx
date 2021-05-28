import React, { memo } from 'react';
import { Tooltip } from '@material-ui/core';
import Icon from '@ibr/ibr-icon/Icon';
import { TiGroup } from 'react-icons/ti';
import { RiHistoryLine, RiShareForwardBoxFill } from 'react-icons/ri';
import { CSSPrefixRequiredProps } from '@/util';

interface TableRightButtonsProps extends CSSPrefixRequiredProps {
  fontColor: string;
}

const TableRightButtons: React.FC<TableRightButtonsProps> = ({
  prefixCls,
  fontColor,
}) => {
  return (
    <div className={`${prefixCls}-nav-buttons`}>
      <Tooltip title="协作人员配置" placeholder="bottom">
        <Icon icon={TiGroup} button colorName={fontColor} size={16}></Icon>
      </Tooltip>
      <Tooltip title="历史记录" placeholder="bottom">
        <Icon
          icon={RiHistoryLine}
          button
          colorName={fontColor}
          size={16}
        ></Icon>
      </Tooltip>
      <Tooltip title="分享视图" placeholder="bottom">
        <Icon
          icon={RiShareForwardBoxFill}
          button
          colorName={fontColor}
          size={16}
        ></Icon>
      </Tooltip>
    </div>
  );
};

export default memo(TableRightButtons);
