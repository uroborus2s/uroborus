import React, {
  forwardRef,
  ForwardRefRenderFunction,
  memo,
  useEffect,
} from 'react';
import classNames from 'classnames';
import { CSSPrefixRequiredProps } from '@/util';
import Icon from '@ibr/ibr-icon/Icon';
import { HiMenu } from 'react-icons/hi';
import { useRecoilValue } from 'recoil';
import { TabFontColor } from '@ibr/ibr-tab/mode/key';

interface OperationNodeProps extends CSSPrefixRequiredProps {
  hasDropdown: boolean;
}

const OperationNode: ForwardRefRenderFunction<
  HTMLDivElement,
  OperationNodeProps
> = ({ hasDropdown, prefixCls, style, className }, ref) => {
  const color = useRecoilValue(TabFontColor);

  return (
    <div
      className={classNames(
        prefixCls.concat('-nav-operations'),
        { [`${prefixCls}-nav-operations-hidden`]: !hasDropdown },
        className,
      )}
      ref={ref}
      style={style}
    >
      <Icon icon={HiMenu} colorName={color} button />
    </div>
  );
};
export default memo(forwardRef(OperationNode));
