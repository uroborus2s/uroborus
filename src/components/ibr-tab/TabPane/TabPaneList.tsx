import React from 'react';
import classNames from 'classnames';
import TabPane from './TabPane';
import { Tab, TabSharedProps } from '../types';
import { CommonProps } from '@/util';
import { useRecoilValue } from 'recoil';
import { TabActiveKey } from '@ibr/ibr-tab/mode/key';

interface TabPanelList extends TabSharedProps, CommonProps {
  tabPaneAnimated?: boolean;
  tabs: Tab[];
}

const TabPanelList: React.FC<TabPanelList> = ({
  tabs,
  prefixCls,
  tabPaneAnimated,
  rtl,
  id,
  className,
}) => {
  const animated = tabPaneAnimated ?? false;
  const activeKey = useRecoilValue(TabActiveKey);

  const activeIndex = tabs.findIndex(function (tab) {
    return tab.tabKey === activeKey;
  });
  const contentClass = classNames(
    `${prefixCls}-content`,
    {
      [`${prefixCls}--content-animated`]: animated,
    },
    className,
  );

  const style =
    activeIndex && animated
      ? {
          [rtl ? 'marginRight' : 'marginLeft']: '-'.concat(
            String(activeIndex),
            '00%',
          ),
        }
      : null;

  return (
    <div className={contentClass} style={style ?? {}}>
      {tabs.map((tab) => (
        <TabPane
          key={tab.tabKey}
          prefixCls={prefixCls}
          id={id}
          animated={animated}
          active={String(tab.tabKey) === activeKey}
          tabKey={tab.tabKey}
          paneNode={tab.paneNode}
          forceRender={tab.forceRender}
        ></TabPane>
      ))}
    </div>
  );
};

export default TabPanelList;
