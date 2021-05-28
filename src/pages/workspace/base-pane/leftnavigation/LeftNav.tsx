import React, { FocusEvent, KeyboardEvent, memo, useRef } from 'react';
import WorkspaceList from './WorkspaceList';
import classNames from 'classnames';
import { InputAdornment, InputBase, Paper } from '@material-ui/core';
import { IoMdClose, IoMdSearch } from 'react-icons/io';
import { BaseColors, CSSPrefixRequiredProps } from '@/util';
import './left.scss';
import Icon from '@ibr/ibr-icon/Icon';

const LeftNav: React.FC<CSSPrefixRequiredProps> = ({
  prefixCls,
  className,
}) => {
  const currentPrefixCls = prefixCls.concat('-left-side');

  const [searchValue, setSearchValue] = React.useState<string>();

  const searchInputRef = useRef<HTMLInputElement>();

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleClick = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
      searchInputRef.current.focus();
    }
    setSearchValue(void 0);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSearchValue(searchInputRef.current?.value);
    }
  };

  return (
    <div className={classNames(currentPrefixCls, className)}>
      <Paper>
        <InputBase
          startAdornment={
            <InputAdornment position="start" disablePointerEvents>
              <Icon icon={IoMdSearch} size={20} />
            </InputAdornment>
          }
          endAdornment={
            searchValue && (
              <Icon
                button
                icon={IoMdClose}
                onClick={handleClick}
                colorName={BaseColors.darkGary5}
              />
            )
          }
          placeholder="查找工作空间"
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          inputRef={searchInputRef}
        ></InputBase>
      </Paper>
      <WorkspaceList
        prefixCls={currentPrefixCls}
        filter={searchValue}
      ></WorkspaceList>
    </div>
  );
};

export default memo(LeftNav);
