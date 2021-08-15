import React, { useState } from 'react';
import Icon from '@ibr/ibr-icon/Icon';
import { Tooltip, Typography } from '@material-ui/core';
import { RiMoreFill } from 'react-icons/ri';
import { useRecoilValue } from 'recoil';
import {
  CSSPrefixRequiredProps,
  getIconTypeColor,
  getInvertOfFontColor,
  transformColorOfSystem,
} from '@/util';
import { FcEmptyTrash, FcFullTrash } from 'react-icons/fc';
import { AiOutlineBorderlessTable } from 'react-icons/ai';
import { FaInfoCircle } from 'react-icons/fa';
import { baseState } from '@/models/baseState';

const TableTitle: React.FC<CSSPrefixRequiredProps> = ({ prefixCls }) => {
  const [isFull, setFull] = useState(false);
  const colorType = baseState.useGetBaseColor();
  const seletTableId = baseState.useLastUsedTableId();

  const tableInfo = baseState.useGetTableFromId(seletTableId);

  const tableName = useRecoilValue(tableInfo.name);
  const tabledesc = useRecoilValue(tableInfo.desc);
  //当前颜色的类型
  const appColor = getIconTypeColor(colorType);
  //当前颜色下文字图标的颜色类型
  const fontColor = getInvertOfFontColor(appColor);

  return (
    <div className={`${prefixCls}-title`}>
      <Icon icon={AiOutlineBorderlessTable} size={20} colorName={fontColor} />
      <Typography
        style={{ flex: 'auto', color: fontColor }}
        variant="h6"
        noWrap
      >
        {tableName}
        {tabledesc && (
          <Tooltip
            title={tabledesc}
            placeholder="bottom-start"
            aria-label="info"
          >
            {/*标题栏中按钮*/}
            <Icon
              icon={FaInfoCircle}
              size={16}
              button
              colorName={transformColorOfSystem(fontColor, 0.1)}
              // margin={3}
            />
          </Tooltip>
        )}
      </Typography>
      <Icon button colorName={fontColor} icon={RiMoreFill} size={22} />
      <Tooltip title="废纸篓">
        {isFull ? (
          <Icon icon={FcEmptyTrash} button colorName={fontColor} size={22} />
        ) : (
          <Icon icon={FcFullTrash} button colorName={fontColor} size={22} />
        )}
      </Tooltip>
    </div>
  );
};

export default TableTitle;
