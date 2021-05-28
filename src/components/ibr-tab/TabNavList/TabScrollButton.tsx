import React, {
  forwardRef,
  ForwardRefRenderFunction,
  HTMLAttributes,
  memo,
} from 'react';
import classNames from 'classnames';
import { CSSPrefixRequiredProps } from '@/util';
import Icon from '@ibr/ibr-icon/Icon';
import useChangeFontColor from '@ibr/ibr-tab/hooks/useChangeFontColor';
import { FontColorRefHandler } from '@ibr/ibr-tab';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

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

const TabScrollButton: ForwardRefRenderFunction<
  FontColorRefHandler,
  TabScrollButtonProps
> = (
  { onClick, className, direction, disabled = false, prefixCls, ...other },
  ref,
) => {
  const buttonClass = classNames(
    prefixCls.concat('-nav-scroll-button'),
    { [`${prefixCls}-nav-scroll-button-disabled`]: disabled },
    className,
  );
  const style = direction === 'left' ? { left: 0 } : { right: 0 };

  const iconType = direction === 'left' ? IoIosArrowBack : IoIosArrowForward;

  const color = useChangeFontColor(ref);

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

export default memo(forwardRef(TabScrollButton));
