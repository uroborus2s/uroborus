import { Button, Theme, withStyles } from '@material-ui/core';
import Icon from '@ibr/ibr-icon/Icon';
import {
  HiDocumentAdd,
  HiFilter,
  HiOutlineSwitchVertical,
  HiShare,
} from 'react-icons/hi';
import { BiHide, BiSearchAlt } from 'react-icons/bi';
import React from 'react';
import { CSSPrefixRequiredProps } from '@/util';
import { MdFormatLineSpacing } from 'react-icons/md';

interface GridViewToolbarProps extends CSSPrefixRequiredProps {}

const GridViewToolbar: React.FC<GridViewToolbarProps> = ({ prefixCls }) => {
  return (
    <div className={`${prefixCls}-tool-bar`}>
      <ViewButton startIcon={<Icon icon={HiDocumentAdd} />}>插入行</ViewButton>
      <ViewButton startIcon={<Icon icon={BiHide} />}>隐藏列</ViewButton>
      <ViewButton startIcon={<Icon icon={HiDocumentAdd} />}>分组</ViewButton>
      <ViewButton startIcon={<Icon icon={HiFilter} />}>筛选</ViewButton>
      <ViewButton startIcon={<Icon icon={HiOutlineSwitchVertical} />}>
        排序
      </ViewButton>
      <ViewButton startIcon={<Icon icon={MdFormatLineSpacing} />}>
        行高
      </ViewButton>
      <ViewButton startIcon={<Icon icon={HiShare} />}>分享视图</ViewButton>
      <div></div>
      <Icon icon={BiSearchAlt} button size={16} />
    </div>
  );
};

export default GridViewToolbar;

const ViewButton = withStyles((theme: Theme) => ({
  root: {
    fontSize: '0.8rem',
    minWidth: 0,
    marginRight: '10px',
  },
  startIcon: {
    marginLeft: 0,
    marginRight: 0,
  },
  text: {
    padding: '0 5px 0 0',
  },
}))(Button);
