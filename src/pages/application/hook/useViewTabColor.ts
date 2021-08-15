import { useRecoilValue } from 'recoil';
import {
  BaseColors,
  getIconTypeColor,
  getInvertOfFontColor,
  transformInverseColorOfSystem,
} from '@/util';
import { useEffect, useRef } from 'react';
import { TabColorRefHandler } from '@ibr/ibr-tab';
import { baseState } from '@/models/baseState';

export default function (viewsort: string[]) {
  const appColorType = useRecoilValue(baseState.color);
  //当前颜色的类型
  const appColor = getIconTypeColor(appColorType);
  //当前颜色下文字图标的颜色类型
  const fontColor = getInvertOfFontColor(appColor);
  const backgroundColor = transformInverseColorOfSystem(appColor, 0.1);
  const activeBackgroundColor = BaseColors.lightGary4;
  const activeFontColor = getInvertOfFontColor(activeBackgroundColor);

  const tabActionRef = useRef<TabColorRefHandler>();

  useEffect(() => {
    console.log('uesEffect', appColorType, viewsort, tabActionRef.current);
    if (tabActionRef.current) {
      console.log(
        'uesEffect change colors',
        fontColor,
        activeFontColor,
        backgroundColor,
        activeBackgroundColor,
      );
      tabActionRef.current.changeColors({
        fontColor: fontColor,
        activeFontColor: activeFontColor,
        tabNodeColor: backgroundColor,
        activeTabNodeColor: activeBackgroundColor,
      });
    }
  }, [tabActionRef.current]);

  return { tabActionRef, activeFontColor, fontColor };
}
