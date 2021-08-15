import {
  CSSPrefixRequiredProps,
  getAppIcon,
  getIconTypeColor,
  getInvertOfFontColor,
} from '@/util';
import React, { RefObject, useRef } from 'react';
import { Tooltip, Typography } from '@material-ui/core';
import Icon from '@ibr/ibr-icon/Icon';
import { AiFillCaretDown } from 'react-icons/ai';
import SettingBar from '@/pages/setting/SettingBar';
import EditApplicationInfo from '@/pages/editbaseinfo/EditBaseDialogPage';
import useDialogShow from '@/util/hooks/useDialogShow';
import { Link } from 'umi';
import { GiZigzagLeaf } from 'react-icons/gi';
import { useRecoilValue } from 'recoil';
import { currentBaseColor, currentBaseIcon, currentBaseName } from '@/models';

const AppTopBar: React.FC<CSSPrefixRequiredProps> = ({ prefixCls }) => {
  const { open, handleOpen, handleClose } = useDialogShow();
  const titleRef = useRef<HTMLDivElement>();
  console.log('render AppTopBar page');
  const appColorType = useRecoilValue(currentBaseColor);
  const appName = useRecoilValue(currentBaseName);
  const appIconType = useRecoilValue(currentBaseIcon);
  console.log(
    `读取atom数据，color：${appColorType},name:${appName},icon:${appIconType}`,
  );

  //当前颜色下文字图标的颜色类型
  const appColor = getIconTypeColor(appColorType);
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
        <div />
        <div
          onClick={handleOpen}
          style={{ color: fontColor }}
          ref={titleRef as RefObject<HTMLDivElement>}
        >
          <Icon icon={getAppIcon(appIconType)} colorName={fontColor} />
          <Typography variant="h6">{appName}</Typography>
          <Icon icon={AiFillCaretDown} colorName={fontColor} />
        </div>
        <div />
        <SettingBar color={fontColor} />
        <div
          style={{ backgroundColor: appColor }}
          className={`${prefixCls}-top-background`}
        />
      </div>
      <EditApplicationInfo
        open={open}
        onClose={handleClose}
        appId={undefined}
      />
    </>
  );
};

export default AppTopBar;
