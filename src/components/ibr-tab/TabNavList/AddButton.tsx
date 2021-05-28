import React, {
  forwardRef,
  ForwardRefRenderFunction,
  memo,
  ReactNode,
} from 'react';
import { FontColorRefHandler } from '@ibr/ibr-tab';
import useChangeFontColor from '@ibr/ibr-tab/hooks/useChangeFontColor';
import Icon from '@ibr/ibr-icon/Icon';
import { GrAdd } from 'react-icons/gr';
import { CSSPrefixRequiredProps } from '@/util';
import TabScrollButton from '@ibr/ibr-tab/TabNavList/TabScrollButton';

export interface AddButtonProps extends CSSPrefixRequiredProps {
  addIcon?: ReactNode;
}

const AddButton: ForwardRefRenderFunction<
  FontColorRefHandler,
  AddButtonProps
> = ({ addIcon: AddNode, prefixCls }, ref) => {
  const color = useChangeFontColor(ref);

  return AddNode ? (
    // @ts-ignore
    React.cloneElement(AddNode, {})
  ) : (
    <Icon
      button
      outline="square"
      icon={GrAdd}
      colorName={color}
      size={16}
      className={`${prefixCls}-tab-add-btn`}
    ></Icon>
  );
};

export default memo(forwardRef(AddButton));
