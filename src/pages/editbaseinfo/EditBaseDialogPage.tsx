import React, { memo } from 'react';
import { CSSPrefixProps, CSSPrefixRequiredProps, getPrefixCls } from '@/util';
import {
  Dialog,
  DialogProps,
  MenuItem,
  MenuList,
  Typography,
} from '@material-ui/core';
import Icon from '@ibr/ibr-icon/Icon';
import { HiDuplicate, HiShare } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';
import './edit.scss';
import InputBaseName from '@/pages/editbaseinfo/InputBaseName';
import ColorContainerPage from '@/pages/editbaseinfo/ColorListPage';
import IconListPage from '@/pages/editbaseinfo/IconListPage';
import { useEditBaseService } from '@/domain/base/base.service';
import { EditBaseService } from '@/core/ibr-types';

interface EditApplicationInfoProps extends CSSPrefixProps, DialogProps {
  workspaceId?: string;
  baseId: string;
}

const EditBaseDialogPage: React.FC<EditApplicationInfoProps> = ({
  open,
  onClose,
  prefixCls,
  workspaceId,
  baseId,
}) => {
  const prefClass = getPrefixCls('dialog-application-edit', prefixCls);

  const requestService = useEditBaseService(baseId, workspaceId);

  const bProps = {
    editBaseRequest: requestService,
    prefixCls: prefClass,
  };

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
      <InputBaseName {...bProps} />
      <ColorContainerPage {...bProps} />
      <IconListPage {...bProps} />
      <MenuList className={`${prefClass}-menu-list`}>
        <MenuItem>
          <Icon size={16} icon={HiShare} />
          <Typography variant="body2">分享</Typography>
        </MenuItem>
        <MenuItem>
          <Icon size={16} icon={HiDuplicate} />
          <Typography variant="body2">复制应用数据</Typography>
        </MenuItem>
        <MenuItem>
          <Icon size={16} icon={MdDelete} />
          <Typography variant="body2">删除应用数据</Typography>
        </MenuItem>
      </MenuList>
    </Dialog>
  );
};

export default memo(EditBaseDialogPage);

export interface ModulePageProps extends CSSPrefixRequiredProps {
  editBaseRequest: EditBaseService;
}
