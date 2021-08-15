import Tabs, { Tab } from '@ibr/ibr-tab';
import React from 'react';
import TopBarLeft from './TopBarLeft';
import { BaseColors, CSSPrefixProps, getPrefixCls } from '@/util';
import SettingBar from '../setting/SettingBar';
import BasePane from './basepane/BasePane';
import './index.scss';
import { RecoilRoot } from 'recoil';

const WorkSpacePage: React.FC<CSSPrefixProps> = ({ prefixCls }) => {
  const preCls = getPrefixCls('work-space', prefixCls);

  const tabPanes: Tab[] = [
    {
      tab: () => '工作空间',
      tabKey: 'bases',
      paneNode: (
        <RecoilRoot>
          <BasePane prefixCls={preCls} />
        </RecoilRoot>
      ),
    },
    { tab: () => '更多模版', tabKey: 'Templates', paneNode: <div /> },
  ];

  const topBarContent = {
    left: <TopBarLeft className={`${preCls}-top-bar-left`} />,
    right: <SettingBar color={BaseColors.gary2} />,
  };

  const tabWidthClass = `${preCls}-width`;

  return (
    <Tabs
      tabPanes={tabPanes}
      tabBarExtraContent={topBarContent}
      className={preCls}
      tabNavClassName={tabWidthClass}
      tabPanesClassName={tabWidthClass}
      tabBarGutter={20}
      divider
    />
  );
};

export default WorkSpacePage;
