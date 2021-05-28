import Tabs, { Tab } from '@ibr/ibr-tab';
import React from 'react';
import TopBarLeft from './TopBarLeft';
import { BaseColors, CSSPrefixProps, getPrefixCls } from '@/util';
import SettingBar from '../setting/SettingBar';
import BasePane from './base-pane/BasePane';
import './index.scss';
import useSiteInitData from '@/api/hooks/useSiteInit';
import BackdropLoading from '@ibr/ibr-loading/BackdropLoading';

const WorkSpacePage: React.FC<CSSPrefixProps> = ({ prefixCls }) => {
  const preCls = getPrefixCls('work-space', prefixCls);
  const { error, loading } = useSiteInitData();

  if (error) return <div>error</div>;
  if (loading) return <BackdropLoading open={loading} />;

  const tabPanes: Tab[] = [
    {
      tab: () => '工作空间',
      tabKey: 'bases',
      paneNode: <BasePane prefixCls={preCls}></BasePane>,
    },
    { tab: () => '模版', tabKey: 'Templates', paneNode: <div></div> },
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
      divider
    ></Tabs>
  );
};

export default WorkSpacePage;
