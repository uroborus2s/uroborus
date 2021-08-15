import { Ref, useImperativeHandle } from 'react';
import { TabColorRefHandler, TabColorsOption } from '@ibr/ibr-tab';
import { useSetRecoilState } from 'recoil';
import {
  ActiveTabFontColor,
  ActiveTabNodeBackgroundColor,
  TabFontColor,
  TabNodeBackgroundColor,
} from '@ibr/ibr-tab/mode/key';

export default function (ref: Ref<TabColorRefHandler>) {
  const setFontColor = useSetRecoilState(TabFontColor);
  const setActiveFontColor = useSetRecoilState(ActiveTabFontColor);
  const setTabNodeBackgroundColor = useSetRecoilState(TabNodeBackgroundColor);
  const setActiveTabNodeBackgroundColor = useSetRecoilState(
    ActiveTabNodeBackgroundColor,
  );
  useImperativeHandle(
    ref,
    () => ({
      changeColors: ({
        activeFontColor,
        fontColor,
        activeTabNodeColor,
        tabNodeColor,
      }: TabColorsOption) => {
        if (fontColor) setFontColor(fontColor);
        if (activeFontColor) setActiveFontColor(activeFontColor);
        if (activeTabNodeColor)
          setActiveTabNodeBackgroundColor(activeTabNodeColor);
        if (tabNodeColor) setTabNodeBackgroundColor(tabNodeColor);
      },
    }),
    [],
  );
}
