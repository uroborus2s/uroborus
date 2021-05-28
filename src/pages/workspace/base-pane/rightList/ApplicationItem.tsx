import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import {
  BaseColors,
  cssHoverContainer,
  cssHoverDisplay,
  CSSPrefixRequiredProps,
  getAppIcon,
  getIconTypeColor,
} from '@/util';
import Icon from '@ibr/ibr-icon/Icon';
import { AiFillCaretDown } from 'react-icons/ai';
import { history } from 'umi';
import EditApplicationInfo from '@/pages/editApplicationInfo/EditApplicationInfo';
import useDialogShow from '@/util/hooks/useDialogShow';
import classNames from 'classnames';
import { ApplicationMode } from '@/models';

interface ApplicationItemProps extends CSSPrefixRequiredProps {
  app: ApplicationMode;
}

const ApplicationItem: React.FC<ApplicationItemProps> = ({
  app,
  prefixCls,
}) => {
  const { open, handleOpen, handleClose } = useDialogShow();

  const handleGoClick = () => {
    history.push(`/application/${app.id}`);
  };

  const SVGIcon = getAppIcon(app.icon);
  const appColor = getIconTypeColor(app.color);

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
        primary={app.name}
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
        application={app}
      ></EditApplicationInfo>
    </ListItem>
  );
};

export default ApplicationItem;
