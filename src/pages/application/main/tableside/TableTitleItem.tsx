import React, { MouseEventHandler } from 'react';
import classNames from 'classnames';
import {
  BaseColors,
  cssHoverContainer,
  cssHoverDisableDisplay,
  cssHoverDisplay,
  cssMenuContainer,
  CSSPrefixRequiredProps,
} from '@/util';
import Icon from '@ibr/ibr-icon/Icon';
import { BiCaretDown, BiCheck } from 'react-icons/bi';
import {
  Divider,
  Fade,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { CgFile, CgImport, CgTemplate } from 'react-icons/cg';
import useMenuShow from '@/util/hooks/useMenuShow';
import { TableSchemaMode } from '@/models';
import { AiOutlineBorderlessTable } from 'react-icons/ai';

interface TableTitleItemProps extends CSSPrefixRequiredProps {
  table: TableSchemaMode;
  selected: string;
  onSelect: MouseEventHandler<HTMLElement>;
}

const TableTitleItem: React.FC<TableTitleItemProps> = ({
  table,
  prefixCls,
  onSelect,
  selected,
}) => {
  const { anchorEl, handleOpen, handleClose } = useMenuShow();
  const textStyle = { fontSize: '14px', marginLeft: '5px' };

  return (
    <>
      <ListItem
        id={table!.id}
        button
        classes={{
          root: classNames(`${prefixCls}-table-item`, cssHoverContainer),
        }}
        selected={selected === table!.id}
        onClick={onSelect}
        disableRipple
        onContextMenu={handleOpen}
      >
        <Icon
          icon={AiOutlineBorderlessTable}
          size={20}
          colorName={BaseColors.forest1}
        ></Icon>

        <ListItemText
          primary={table!.name}
          primaryTypographyProps={{ variant: 'subtitle1', noWrap: true }}
        />
        <Icon
          className={cssHoverDisplay}
          button
          icon={BiCaretDown}
          size={20}
          colorName={BaseColors.gary3}
          outline="circle"
          onClick={handleOpen}
        />
        {selected === table!.id && (
          <Icon icon={BiCheck} size={20} className={cssHoverDisableDisplay} />
        )}
      </ListItem>
      <Menu
        id="edit-table-info"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        TransitionComponent={Fade}
        classes={{ paper: cssMenuContainer }}
      >
        <MenuItem onClick={handleClose}>
          <Icon icon={CgTemplate} size={20} />
          <span style={textStyle}>重命名</span>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Icon icon={CgImport} size={20} />
          <span style={textStyle}>复制</span>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <Icon icon={CgFile} size={20} />
          <span style={textStyle}>删除</span>
        </MenuItem>
      </Menu>
    </>
  );
};

export default TableTitleItem;
