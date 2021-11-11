import { CommonProps } from '@/core/ibr-types';
import { TabPosition } from '@ibr/ibr-tabs';
import {
  getTabsUtilityClass,
  TabComponentName,
  TabsClasses,
} from '@ibr/ibr-tabs/TabClasses';
import composeClasses from '@mui/core/composeClasses';
import styled from '@mui/material/styles/styled';
import classNames from 'classnames';
import * as React from 'react';
import { CSSProperties } from 'react';

export interface TabPaneProps extends CommonProps {
  tab?: React.ReactNode;
  disabled?: boolean;
  //被隐藏时是否渲染 DOM 结构
  forceRender?: boolean;
  // 自定义关闭图标，在 type="editable-card"时有效
  closable?: boolean;
  closeIcon?: React.ReactNode;
  tabKey?: string;
  id?: string;
  //是否要求有动画
  animated?: boolean;
  //当前面板是否激活
  active?: boolean;
  //是否销毁非活动的面板
  destroyInactiveTabPane?: boolean;
  tabPosition?: TabPosition;
  classes: Partial<TabsClasses>;
}

const usePaneClasses = (classes: Partial<TabsClasses>, active: boolean) => {
  const slots = {
    pane: ['pane', active && 'paneActive'],
  };
  return composeClasses(slots, getTabsUtilityClass, classes);
};

const TabPaneRoot = styled('div', {
  name: TabComponentName,
  slot: 'Pane',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [styles.pane, ownerState.active && styles.paneActive];
  },
})<{ ownerState: { tabPosition: TabPosition; active: boolean } }>(
  ({ ownerState: { tabPosition } }) => ({
    flex: 'none',
    width: '100%',
    outline: 'none',
    paddingRight: tabPosition == 'left' ? '24px' : 0,
    paddingLeft: tabPosition == 'right' ? '24px' : 0,
  }),
);

const TabPane: React.FC<TabPaneProps> = ({
  forceRender = false,
  id,
  tabKey,
  active = false,
  destroyInactiveTabPane = false,
  animated,
  children,
  tabPosition = 'top',
  classes: classesProp,
  className,
}) => {
  const classes = usePaneClasses(classesProp, active);

  const paneClassName = [...new Set(classes.pane.split(' '))].join(' ');

  const mergedStyle: CSSProperties = {};

  if (!active) {
    if (animated) {
      mergedStyle.visibility = 'hidden';
      mergedStyle.height = 0;
      mergedStyle.overflowY = 'hidden';
    } else {
      mergedStyle.display = 'none';
    }
  }

  return (
    <TabPaneRoot
      role="tabpanel"
      id={id && `${id}-panel-${tabKey}`}
      tabIndex={active ? 0 : -1}
      aria-labelledby={id && `${id}-panel-${tabKey}`}
      aria-hidden={!active}
      className={classNames(paneClassName, className)}
      ownerState={{ tabPosition, active }}
    >
      {(active || destroyInactiveTabPane || forceRender) && children}
    </TabPaneRoot>
  );
};

export default TabPane;
