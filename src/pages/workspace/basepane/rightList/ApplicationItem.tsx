import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import {
  AppIconTypes,
  BaseColors,
  cssHoverContainer,
  cssHoverDisplay,
  CSSPrefixRequiredProps,
  getAppIcon,
  getIconTypeColor,
  IconColorType,
} from '@/util';
import Icon from '@ibr/ibr-icon/Icon';
import { AiFillCaretDown } from 'react-icons/ai';
import { history } from 'umi';
import EditApplicationInfo from '@/pages/editbaseinfo/EditBaseDialogPage';
import useDialogShow from '@/util/hooks/useDialogShow';
import classNames from 'classnames';
import { useRecoilValue } from 'recoil';
import {
  baseColorEntity,
  baseIconEntity,
  baseNameEntity,
} from '@/domain/workspace/workspace.entity';

interface ApplicationItemProps extends CSSPrefixRequiredProps {
  appId: string;
  workspaceId: string;
}

const ApplicationItem: React.FC<ApplicationItemProps> = ({
  appId,
  prefixCls,
  workspaceId,
}) => {
  const { open, handleOpen, handleClose } = useDialogShow();

  const handleGoClick = () => {
    history.push(`/application/${appId}`);
  };
  const icon = useRecoilValue(
    baseIconEntity({ workspaceId: workspaceId, baseId: appId }),
  );
  const color = useRecoilValue(
    baseColorEntity({ workspaceId: workspaceId, baseId: appId }),
  );
  const name = useRecoilValue(
    baseNameEntity({ workspaceId: workspaceId, baseId: appId }),
  );

  const SVGIcon = getAppIcon(icon as AppIconTypes);
  const appColor = getIconTypeColor(color as IconColorType);

  return (
    <ListItem
      button
      className={classNames(`${prefixCls}-item`, cssHoverContainer)}
      disableRipple
      onContextMenu={handleOpen}
      onClick={handleGoClick}
    >
      <Icon icon={SVGIcon} size={40} colorName={appColor} outline="square" />
      <ListItemText
        primary={name}
        primaryTypographyProps={{
          variant: 'body1',
          noWrap: true,
        }}
      />
      <Icon
        className={cssHoverDisplay}
        button
        icon={AiFillCaretDown}
        size={16}
        colorName={BaseColors.gary5}
        outline="circle"
        onClick={handleOpen}
      />
      <EditApplicationInfo
        open={open}
        onClose={handleClose}
        workspaceId={workspaceId}
        baseId={appId}
      />
    </ListItem>
  );
};

export default ApplicationItem;
