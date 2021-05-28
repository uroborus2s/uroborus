import React, { memo } from 'react';
import {
  Fade,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { BaseColors, CSSPrefixRequiredProps } from '@/util';
import Icon from '@ibr/ibr-icon/Icon';
import { RiAddFill } from 'react-icons/ri';
import { CgFile, CgImport, CgTemplate } from 'react-icons/cg';

interface AddItemProps extends CSSPrefixRequiredProps {
  workspaceId: string;
}

const AddItem: React.FC<AddItemProps> = ({ prefixCls }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const textStyle = { fontSize: '14px', marginLeft: '5px' };

  return (
    <>
      <ListItem
        button
        className={`${prefixCls}-item`}
        onClick={handleClick}
        disableRipple
      >
        <Icon
          icon={RiAddFill}
          size={40}
          colorName={BaseColors.lightGary1}
          outline="square"
        />
        <ListItemText
          primary="新建应用"
          primaryTypographyProps={{
            variant: 'button',
            noWrap: true,
          }}
        />
      </ListItem>
      <Menu
        id="add-application"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>
          <Icon icon={CgTemplate} size={20} />
          <span style={textStyle}>从模版创建</span>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Icon icon={CgImport} size={20} />
          <span style={textStyle}>导入数据</span>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Icon icon={CgFile} size={20} />
          <span style={textStyle}>从空白文档创建</span>
        </MenuItem>
      </Menu>
    </>
  );
};

export default memo(AddItem);
