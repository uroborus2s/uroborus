import React, { useRef } from 'react';
import { CSSPrefixRequiredProps } from '@/util';
import Icon from '@ibr/ibr-icon/Icon';
import { Divider, InputAdornment, TextField } from '@material-ui/core';
import { IoSearch } from 'react-icons/io5';
import TableList from './TableList';
import OperatingList from './OperatingList';
import { useRecoilValue } from 'recoil';
import { AppPageSideWidth } from '../../data-mode';
import TableTitle from './TableTitle';
import { useHotkeys } from 'react-hotkeys-hook';
import AppToolBar from './AppToolBar';
import MoveDivider from '@/pages/application/main/tableside/MoveDivider';

const TableSideBar: React.FC<CSSPrefixRequiredProps> = ({ prefixCls }) => {
  const prefix = `${prefixCls}-side-container`;
  const width = useRecoilValue(AppPageSideWidth);
  const inputRef = useRef<HTMLInputElement>();

  const focusSearch = (event: KeyboardEvent) => {
    event.preventDefault();
    if (inputRef.current) inputRef.current?.focus();
    return false;
  };
  useHotkeys('command+g,ctrl+g', focusSearch, { enableOnTags: ['INPUT'] });

  const sideBar = `${prefix}-side-bar`;

  return (
    <div
      className={`${prefixCls}-side-container`}
      style={{ flexBasis: `${width}px` }}
    >
      <TableTitle prefixCls={prefix} />
      <AppToolBar prefixCls={prefix} />

      <div className={sideBar}>
        <TextField
          id="table-search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon icon={IoSearch} size={20} />
              </InputAdornment>
            ),
            inputRef: inputRef,
          }}
          placeholder="搜索⌘G"
          color="secondary"
          margin="normal"
          classes={{ root: `${sideBar}-search` }}
        />
        <TableList prefixCls={prefix} />
        <Divider classes={{ root: `${sideBar}-divider` }} />
        <OperatingList prefixCls={sideBar} />
      </div>

      <MoveDivider prefixCls={prefix} />
    </div>
  );
};

export default TableSideBar;
