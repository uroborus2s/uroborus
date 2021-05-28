import {
  CSSPrefixRequiredProps,
  getAppIcon,
  getIconColor,
  getIconTypeColor,
  getInvertOfFontColor,
} from '@/util';
import React, { RefObject, useRef } from 'react';
import { Tooltip, Typography } from '@material-ui/core';
import Icon from '@ibr/ibr-icon/Icon';
import { AiFillCaretDown } from 'react-icons/ai';
import SettingBar from '@/pages/setting/SettingBar';
import EditApplicationInfo from '@/pages/editApplicationInfo/EditApplicationInfo';
import useDialogShow from '@/util/hooks/useDialogShow';
import { Link } from 'umi';
import { GiZigzagLeaf } from 'react-icons/gi';
import { UsedApplication } from '@/models';
import { useHover } from 'ahooks';
import { useRecoilValue } from 'recoil';

const AppTopBar: React.FC<CSSPrefixRequiredProps> = ({ prefixCls }) => {
  const { open, handleOpen, handleClose } = useDialogShow();
  const titleRef = useRef<HTMLDivElement>();
  const isHovering = useHover(titleRef);
  const application = useRecoilValue(UsedApplication);
  if (Object.keys(application).length === 0) {
    // @ts-ignore
    return <div ref={titleRef} />;
  }

  //当前颜色下文字图标的颜色类型
  const appColor = getIconTypeColor(application.color);
  const fontColor = getInvertOfFontColor(appColor);

  return (
    <>
      <div className={`${prefixCls}-top-bar`}>
        <div>
          <Tooltip title="Go Home" placement="right">
            <Link to="/">
              <Icon
                icon={GiZigzagLeaf}
                size={24}
                className={`${prefixCls}-top-bar-back`}
                colorName={fontColor}
              />
            </Link>
          </Tooltip>
        </div>
        <div></div>
        <div
          onClick={handleOpen}
          style={{ color: fontColor }}
          ref={titleRef as RefObject<HTMLDivElement>}
        >
          <Icon icon={getAppIcon(application.icon)} colorName={fontColor} />
          <Typography variant="h6">{application.name}</Typography>
          <Icon icon={AiFillCaretDown} colorName={fontColor} />
        </div>
        <div></div>
        <SettingBar color={fontColor} />
        <div
          style={{ backgroundColor: appColor }}
          className={`${prefixCls}-top-background`}
        />
      </div>
      <EditApplicationInfo
        open={open}
        onClose={handleClose}
        application={application}
      ></EditApplicationInfo>
    </>
  );
};

export default AppTopBar;
