import React, {
  forwardRef,
  ForwardRefRenderFunction,
  memo,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import classNames from 'classnames';
import { BaseColors, CSSPrefixRequiredProps } from '@/util';
import Icon from '@ibr/ibr-icon/Icon';
import { HiMenu } from 'react-icons/hi';
import { FontColorRefHandler } from '@ibr/ibr-tab';
import useChangeFontColor from '@ibr/ibr-tab/hooks/useChangeFontColor';

interface OperationNodeProps extends CSSPrefixRequiredProps {
  hasDropdown: boolean;
}

const OperationNode: ForwardRefRenderFunction<
  FontColorRefHandler,
  OperationNodeProps
> = ({ hasDropdown, prefixCls, style, className }, ref) => {
  const color = useChangeFontColor(ref);

  return (
    <div
      className={classNames(
        prefixCls.concat('-nav-operations'),
        { [`${prefixCls}-nav-operations-hidden`]: !hasDropdown },
        className,
      )}
      style={style}
    >
      <Icon icon={HiMenu} colorName={color} button />
    </div>
  );
};
export default memo(forwardRef(OperationNode));
