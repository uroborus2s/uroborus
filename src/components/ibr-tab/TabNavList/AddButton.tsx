import React, { memo, ReactNode } from 'react';
import Icon from '@ibr/ibr-icon/Icon';
import { GrAdd } from 'react-icons/gr';
import { CSSPrefixRequiredProps } from '@/util';
import { useRecoilValue } from 'recoil';
import { TabFontColor } from '@ibr/ibr-tab/mode/key';

export interface AddButtonProps extends CSSPrefixRequiredProps {
  addIcon?: ReactNode;
}

const AddButton: React.FC<AddButtonProps> = ({
  addIcon: AddNode,
  prefixCls,
}) => {
  const color = useRecoilValue(TabFontColor);

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

export default memo(AddButton);
