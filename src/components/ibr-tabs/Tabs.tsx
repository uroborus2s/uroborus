import composeClasses from '@mui/core/composeClasses';
import styled from '@mui/material/styles/styled';
import useThemeProps from '@mui/material/styles/useThemeProps';
import classNames from 'classnames';
import React, { ForwardRefRenderFunction, useMemo } from 'react';
import {
  DragDropContext,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd';
import { MutableSnapshot, RecoilRoot } from 'recoil';
import { activeTabKey } from './core';
import {
  PaneInProps,
  Tab,
  TabInProps,
  TabProps,
  TabsInProps,
  TabsProps,
  TabsState,
} from './index';
import { getTabsUtilityClass, TabComponentName } from './TabClasses';
import TabNavList from './TabNavList';
import TabPaneList from './TabPanelList';

function parseTabList(children: any): TabsInProps {
  const tabs: TabInProps[] = [];
  const panes: PaneInProps[] = [];
  if (children) {
    React.Children.forEach(children, (node, index) => {
      if (React.isValidElement<TabProps>(node) && node.type === Tab) {
        const key = node.key !== undefined ? String(node.key) : String(index);
        const tab = {
          key: key,
          tab: node.props.tab,
          closeIcon: node.props.closeIcon,
        };
        const pane = {
          key: key,
          forceRender: node.props.forceRender,
          children: node.props.children,
        };
        tabs.push(tab);
        panes.push(pane);
      }
    });

    return { tabs, panes };
  }
  return { tabs: [], panes: [] };
}

const useUtilityClasses = (ownerState: TabsState) => {
  const { vertical, classes, paneAnimated, tabPosition, centered } = ownerState;
  const slots = {
    root: ['root', vertical && 'vertical'],
    holder: ['holder'],
    flexContent: [
      'flexContent',
      paneAnimated && 'contentAnimated',
      tabPosition && `content-${tabPosition}`,
    ],
    tabNav: ['tabNav'],
    tabHeader: ['tabHeader'],
    extra: ['extra'],
    navWrap: ['navWrap', centered && 'centered'],
    scroller: ['scroller'],
    tabContainer: ['tabContainer'],
    scrollButtons: ['scrollButtons'],
    inkBar: ['inkBar', vertical && 'verticalInkBar'],
    tabActive: ['tabActive'],
    tabDisabled: ['tabDisabled'],
    tabNode: ['tabNode'],
  };
  return composeClasses(slots, getTabsUtilityClass, classes);
};

const TabRoot = styled('div', {
  name: TabComponentName,
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [styles.root, ownerState.vertical && styles.vertical];
  },
})<{ ownerState: TabsState }>(({ ownerState: { rtl, vertical } }) => ({
  display: 'flex',
  overflow: 'hidden',
  WebkitOverflowScrolling: 'touch',
  boxSizing: 'border-box',
  minHeight: 48,
  fontSize: '0.9rem',
  fontWeight: 500,
  fontVariant: 'tabular-nums',
  fontFeatureSettings: 'tnum',
  ...(rtl && {
    direction: 'rtl',
  }),
  ...(!vertical && {
    flexDirection: 'column',
  }),
}));

let uuid = 0;

const ForwardTabs: ForwardRefRenderFunction<
  HTMLDivElement,
  Omit<
    TabsProps,
    | 'children'
    | 'activeKey'
    | 'defaultActiveKey'
    | 'direction'
    | 'tabPosition'
    | 'animated'
    | 'classes'
    | 'id'
    | 'centered'
  > &
    TabsInProps & { ownerState: TabsState }
> = (
  {
    className,
    destroyInactiveTabPane = false,
    tabs,
    panes,
    ownerState,
    onTabClick,
    onTabScroll,
    renderTabBar,
    tabBarExtraContent,
    tabBarGutter,
    moreIcon,
    type = 'line',
    hideAdd = false,
    addIcon,
    ...other
  },
  ref,
) => {
  const handleDragEnd = (result: DropResult, provided: ResponderProvided) => {
    console.log(result, provided);
  };

  let TabNav: React.ReactElement;
  const tabNavProps = {
    ownerState: ownerState,
    tabBarExtraContent: tabBarExtraContent,
    tabs: tabs,
    hideAdd: hideAdd,
    addIcon: addIcon,
    moreIcon: moreIcon,
    type: type,
    onTabClick: onTabClick,
    onTabScroll: onTabScroll,
    tabBarGutter: tabBarGutter,
  };
  if (renderTabBar) {
    TabNav = renderTabBar(tabNavProps, TabNavList);
  } else TabNav = <TabNavList {...tabNavProps} />;

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <TabRoot
        className={classNames(ownerState.classes?.root, className)}
        ownerState={ownerState}
        ref={ref}
        {...other}
      >
        {TabNav}
        <TabPaneList
          panes={panes}
          ownerState={ownerState}
          destroyInactiveTabPane={destroyInactiveTabPane}
        />
      </TabRoot>
    </DragDropContext>
  );
};

const Tabs = React.forwardRef(ForwardTabs);

const RecoilTabs: ForwardRefRenderFunction<HTMLDivElement, TabsProps> = (
  inProps,
  ref,
) => {
  const props = useThemeProps({
    props: inProps,
    name: TabComponentName,
  });

  const {
    children,
    defaultActiveKey,
    activeKey,
    classes,
    animated,
    direction,
    tabPosition = 'top',
    id,
    centered = false,
    ...tabsProps
  } = props;

  const { tabs, panes } = parseTabList(children);

  let paneAnimated = false;
  let inkAnimated = true;

  if (animated == true) {
    paneAnimated = true;
    inkAnimated = true;
  } else if (animated == false) {
    paneAnimated = false;
    inkAnimated = false;
  } else if (typeof animated === 'object') {
    paneAnimated = animated.tabPane == undefined ? true : animated.tabPane;
    inkAnimated = animated.inkBar == undefined ? true : animated.inkBar;
  }

  const mergedId = useMemo(() => {
    if (!id) {
      return TabComponentName.concat(
        process.env.NODE_ENV === 'test' ? 'test' : String(uuid++),
      );
    } else return id;
  }, [id]);

  const rtl = direction === 'rtl';
  const vertical = tabPosition == 'left' || tabPosition == 'right';

  let ownerState: TabsState = {
    vertical,
    rtl,
    tabPosition,
    paneAnimated,
    inkAnimated,
    classes,
    id: mergedId,
    centered,
  };
  const inClasses = useUtilityClasses(ownerState);

  ownerState = { ...ownerState, classes: inClasses };

  const initActiveKey = ({ set }: MutableSnapshot) => {
    let newActiveKey = activeKey ?? defaultActiveKey;
    const activeIndex = tabs.findIndex((tab) => tab.key == newActiveKey);
    if (activeIndex == -1) {
      newActiveKey = tabs[0]?.key;
    }
    set(activeTabKey, newActiveKey);
  };

  if (tabs.length == 0) return null;
  return (
    <RecoilRoot initializeState={initActiveKey}>
      <Tabs
        ref={ref}
        tabs={tabs}
        panes={panes}
        ownerState={ownerState}
        {...tabsProps}
      />
    </RecoilRoot>
  );
};

export default React.forwardRef(RecoilTabs);