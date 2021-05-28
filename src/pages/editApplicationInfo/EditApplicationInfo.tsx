import React, { memo } from 'react';
import {
  CSSPrefixProps,
  getPrefixCls,
  iconColors,
  IconColorType,
} from '@/util';
import {
  Dialog,
  DialogProps,
  Input,
  MenuItem,
  MenuList,
  Typography,
} from '@material-ui/core';
import Icon from '@ibr/ibr-icon/Icon';
import { HiCheck, HiDuplicate, HiShare } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';
import './edit.scss';
import { ApplicationMode } from '@/models';

interface EditApplicationInfoProps extends CSSPrefixProps, DialogProps {
  application: ApplicationMode;
}

const EditApplicationInfo: React.FC<EditApplicationInfoProps> = ({
  open,
  onClose,
  application,
  prefixCls,
}) => {
  const prefClass = getPrefixCls('dialog-application-edit', prefixCls);

  const currentColor = application.color;
  return (
    <Dialog
      onClick={(event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        event.stopPropagation();
      }}
      open={open}
      onClose={onClose}
      maxWidth="sm"
      scroll="body"
      classes={{ paper: prefClass }}
    >
      <Input
        disableUnderline
        value={application.name}
        classes={{
          focused: `${prefClass}-input-frame-focused`,
          input: `${prefClass}-input-frame`,
          root: `${prefClass}-input`,
        }}
      />
      <div className={`${prefClass}-color-container`}>
        {Object.keys(iconColors).map((colorType, index) =>
          colorType === currentColor ? (
            <Icon
              key={index}
              colorType={colorType}
              icon={HiCheck}
              outline="square"
              margin={0}
            ></Icon>
          ) : (
            <Icon
              key={index}
              colorType={colorType as IconColorType}
              outline="square"
              margin={0}
            ></Icon>
          ),
        )}
      </div>
      <div className={`${prefClass}-icon-container`}></div>
      <MenuList className={`${prefClass}-menu-list`}>
        <MenuItem>
          <Icon size={16} icon={HiShare}></Icon>
          <Typography variant="body2">分享</Typography>
        </MenuItem>
        <MenuItem>
          <Icon size={16} icon={HiDuplicate}></Icon>
          <Typography variant="body2">复制应用数据</Typography>
        </MenuItem>
        <MenuItem>
          <Icon size={16} icon={MdDelete}></Icon>
          <Typography variant="body2">删除应用数据</Typography>
        </MenuItem>
      </MenuList>
    </Dialog>
  );
};

export default memo(EditApplicationInfo);
