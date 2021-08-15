import React, { memo } from 'react';
import { Tooltip } from '@material-ui/core';
import { IoMdHelpCircle, IoMdNotifications, IoMdPerson } from 'react-icons/io';
import { CSSPrefixProps, getPrefixCls } from '@/util';
import classNames from 'classnames';
import './index.scss';
import Icon from '@ibr/ibr-icon/Icon';

interface SettingBarProps extends CSSPrefixProps {
  color?: string;
}

const SettingBar: React.FC<SettingBarProps> = ({
  className,
  prefixCls,
  color,
}) => {
  const preCls = getPrefixCls('setting-bar', prefixCls);

  return (
    <div className={classNames(preCls, className)}>
      <Tooltip title="help" placeholder="bottom-start" aria-label="add">
        <Icon icon={IoMdHelpCircle} size={20} button colorName={color} />
      </Tooltip>
      <Tooltip title="消息" placeholder="bottom">
        <Icon icon={IoMdNotifications} button colorName={color} size={20} />
      </Tooltip>
      <Tooltip title="账户" placeholder="bottom-start">
        <Icon
          icon={IoMdPerson}
          button
          outline="circle"
          size={24}
          colorName="#ff6f2c"
        />
      </Tooltip>
    </div>
  );
};

export default memo(SettingBar);
