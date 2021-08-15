import React, { HTMLAttributes, memo } from 'react';
import classNames from 'classnames';
import Icon from '@ibr/ibr-icon/Icon';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useRecoilValue } from 'recoil';
import { TabFontColor } from '@ibr/ibr-tab/mode/key';

export interface TabScrollButtonProps extends HTMLAttributes<HTMLOrSVGElement> {
  /**
   * Which direction should the button indicate?
   */
  direction: 'left' | 'right';

  /**
   * If `true`, the element will be disabled.
   */
  disabled?: boolean;
  prefixCls: string;
}

const TabScrollButton: React.FC<TabScrollButtonProps> = ({
  onClick,
  className,
  direction,
  disabled = false,
  prefixCls,
  ...other
}) => {
  const buttonClass = classNames(
    prefixCls.concat('-nav-scroll-button'),
    { [`${prefixCls}-nav-scroll-button-disabled`]: disabled },
    className,
  );
  const style = direction === 'left' ? { left: 0 } : { right: 0 };

  const iconType = direction === 'left' ? IoIosArrowBack : IoIosArrowForward;

  const color = useRecoilValue(TabFontColor);

  return (
    <Icon
      className={buttonClass}
      style={style}
      button
      outline="circle"
      icon={iconType}
      colorName={color}
      size={16}
      onClick={onClick}
      {...other}
    />
  );
};

export default memo(TabScrollButton);
