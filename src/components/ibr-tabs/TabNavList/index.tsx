import { useRefFun, useSize } from '@/core/hooks';
import { scroll } from '../core';
import useEffectNomount from '@hooks/useEffectNomount';
import {
  windowScrollBarHeight,
  windowScrollBarWidth,
} from '@ibr/ibr-scrollbar-size/ScrollbarSize';
import { activeTabKey, findTabIndex } from '@ibr/ibr-tabs/core';
import TabNode from '@ibr/ibr-tabs/TabNavList/TabNode';
import useMoveInkbar from '@ibr/ibr-tabs/TabNavList/useMoveInkbar';
import useScrollButton from '@ibr/ibr-tabs/TabNavList/useScrollButton';
import useScrollTurnPage from '@ibr/ibr-tabs/TabNavList/useScrollTurnPage';
import useTabKeyboard from '@ibr/ibr-tabs/TabNavList/useTabKeyboard';
import { ownerWindow } from '@mui/material';
import styled from '@mui/material/styles/styled';
import classNames from 'classnames';
import debounce from 'lodash.debounce';
import React, {
  ForwardRefRenderFunction,
  LegacyRef,
  MouseEvent,
  Ref,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  TabBarExtraContent,
  TabBarExtraPosition,
  TabNavListProps,
  TabsState,
} from '../index';
import { TabComponentName, TabsClasses } from '../TabClasses';
import AddButton from './AddButton';
import OperationNode from './OperationButton';

const ExtraNode = styled('div', {
  name: TabComponentName,
  slot: 'Extra',
  overridesResolver: (props, styles) => styles.extra,
})({
  flex: 'none',
  alignItems: 'center',
});

const ExtraContent: React.FC<{
  position: 'left' | 'right';
  extra: TabBarExtraContent;
  classes?: Partial<TabsClasses>;
}> = ({ position, extra, classes }) => {
  let content: React.ReactNode; // Parse extra

  const assertExtra: Record<TabBarExtraPosition, React.ReactNode> = {
    right: null,
    left: null,
  };

  if (extra && typeof extra === 'object') {
    if (React.isValidElement(extra)) {
      assertExtra.right = extra;
    } else {
      assertExtra.right = (
        extra as Record<TabBarExtraPosition, React.ReactNode>
      ).right;
      assertExtra.left = (
        extra as Record<TabBarExtraPosition, React.ReactNode>
      ).left;
    }
  }

  if (position === 'left') content = assertExtra.left;

  if (position === 'right') content = assertExtra.right;

  return content
    ? React.createElement(ExtraNode, { className: classes?.extra }, content)
    : null;
};

const TabHeader = styled('div', {
  name: TabComponentName,
  slot: 'tabHeader',
  overridesResolver: (props, styles) => styles.tabHeader,
})({
  boxShadow: 'rgb(0 0 0 / 3%) 0px 2px 0px 0px',
  width: '100%',
  flex: 'none',
  backgroundColor: '#fff',
  paddingLeft: '1rem',
  paddingRight: '1rem',
});

const TabNavListRoot = styled('div', {
  name: TabComponentName,
  slot: 'tabNav',
  overridesResolver: (props, styles) => styles.tabNav,
})<{ ownerState: TabsState }>(
  ({ ownerState: { vertical, tabPosition, rtl } }) => ({
    display: 'flex',
    flex: 'none',
    height: '48px',
    position: 'relative',
    alignItems: 'center',
    ...(tabPosition == 'bottom' && {
      order: 1,
    }),
    ...(tabPosition == 'top' && {
      order: 0,
    }),
    ...(vertical && {
      flexDirection: 'column',
      minWidth: '50px',
    }),
    ...(tabPosition == 'left' && (rtl ? { order: 1 } : { order: 0 })),
    ...(tabPosition == 'right' && (rtl ? { order: 0 } : { order: 1 })),
  }),
);

const TabNavWrap = styled('div', {
  name: TabComponentName,
  slot: 'navWrap',
  overridesResolver: (props, styles) => {
    return [styles.navWrap, props.centered && styles.centered];
  },
})<{ ownerState: TabsState }>(({ ownerState: { centered, vertical } }) => ({
  position: 'relative',
  display: 'flex',
  flex: 'auto',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  ...(vertical && {
    flexDirection: 'column',
  }),
  ...(centered && {
    justifyContent: 'center',
  }),
}));

type TabsScrollerProps = TabsState & {
  scrollBarSize: number;
};

const TabsScroller = styled('div', {
  name: TabComponentName,
  slot: 'scroller',
  overridesResolver: (props, styles) => styles.scroller,
})<{ ownerState: TabsScrollerProps }>(
  ({ ownerState: { vertical, rtl, scrollBarSize } }) => ({
    position: 'relative',
    display: 'flex',
    whiteSpace: 'nowrap',
    scrollbarWidth: 'none',
    [`margin${
      vertical ? (rtl ? 'Left' : 'Right') : 'Bottom'
    }`]: `-${scrollBarSize}px`,
    // Firefox
    '&::-webkit-scrollbar': {
      display: 'none', // Safari + Chrome
    },
    ...(vertical
      ? {
          flexDirection: 'column',
          overflowX: 'hidden',
          overflowY: 'auto',
        }
      : {
          overflowX: 'auto',
          overflowY: 'hidden',
        }),
  }),
);

const TabContainer = styled('div', {
  name: TabComponentName,
  slot: 'tabContainer',
  overridesResolver: (props, styles) => styles.tabContainer,
})<{ ownerState: TabsState }>(({ ownerState: { vertical } }) => ({
  display: 'flex',
  flex: 'none',
  position: 'relative',
  ...(vertical && {
    flexDirection: 'column',
  }),
}));

const ScrollButton = styled('div', {
  name: TabComponentName,
  slot: 'scrollButtons',
  overridesResolver: (props, styles) => styles.scrollButton,
})<{ ownerState: boolean }>(({ ownerState }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  opacity: ownerState ? 0 : 0.8,
}));

type TabsInkbarProps = TabsState & {
  length: number;
  top: number;
  left: number;
};

const TabsInkbar = styled('div', {
  name: TabComponentName,
  slot: 'inkBar',
  overridesResolver: (props, styles) => styles.inkBar,
})<{ ownerState: TabsInkbarProps }>(
  ({ ownerState: { vertical, inkAnimated, length, top, left }, theme }) => ({
    position: 'fixed',
    backgroundColor: 'hsl(0,0%,20%)',
    fill: 'hsl(0,0%,20%)',
    transition: inkAnimated ? theme.transitions.create('all') : 'none',
    top: top,
    left: left,
    ...(vertical
      ? {
          width: 2,
          height: length,
        }
      : { height: 2, width: length }),
  }),
);

const TabNavList: ForwardRefRenderFunction<HTMLDivElement, TabNavListProps> = (
  {
    ownerState,
    className,
    tabBarExtraContent,
    tabs,
    hideAdd,
    type,
    tabBarGutter,
    addIcon,
    moreIcon,
    onTabClick,
    onTabScroll,
    ...other
  },
  ref,
) => {
  const { classes, vertical } = ownerState;

  const scrollBarWidth = useRecoilValue(windowScrollBarWidth);
  const scrollBarHeight = useRecoilValue(windowScrollBarHeight);

  const scrollBarSize = useMemo(() => {
    return vertical ? scrollBarWidth : scrollBarHeight;
  }, [vertical, scrollBarHeight, scrollBarWidth]);

  const [activeKey, setActiveKey] = useRecoilState(activeTabKey);

  const activeIndex = useRef(findTabIndex(tabs, activeKey));

  const operationsRef = useRef<HTMLDivElement>();
  const innerAddButtonRef = useRef<HTMLDivElement>();
  const tabsRef = useRef<HTMLDivElement>();
  const tabListRef = React.useRef<HTMLDivElement>();

  const { updateScrollButtonState, displayScroll } = useScrollButton(
    ownerState,
    tabsRef,
  );

  const { handleStartScrollClick, handleEndScrollClick } = useScrollTurnPage(
    ownerState,
    tabsRef,
    tabListRef,
  );

  const { updateInkbarState, inkState } = useMoveInkbar(ownerState, tabListRef);

  useEffectNomount(() => {
    const index = findTabIndex(tabs, activeKey, activeIndex.current);
    const newActiveKey = tabs[index]?.key;
    if (newActiveKey !== activeKey) setActiveKey(newActiveKey);
    activeIndex.current = index;
    if (updateInkbarState) updateInkbarState(index);
  }, [tabs.map((tab) => tab.key).join(' '), activeKey]);

  const handleKeyDown = useTabKeyboard(ownerState, tabListRef);

  const handleTabsScroll = useMemo(
    () =>
      debounce(() => {
        if (updateScrollButtonState) updateScrollButtonState();
        if (updateInkbarState) updateInkbarState(activeIndex.current);
      }, 166),
    [updateScrollButtonState, updateInkbarState],
  );

  const scrollSelectedIntoView = useRefFun(() => {
    if (tabsRef.current && tabListRef.current) {
      const container = tabsRef.current as HTMLElement;
      const tabsList = tabListRef.current as HTMLElement;
      const start = vertical ? 'top' : 'left';
      const end = vertical ? 'bottom' : 'right';
      const scrollStart = vertical ? 'scrollTop' : 'scrollLeft';
      const currentTab = (tabsList as HTMLDivElement).children[
        activeIndex.current
      ];
      const tabsRect = container.getBoundingClientRect();
      const tabRect = currentTab.getBoundingClientRect();

      if (tabsRect[start] > tabRect[start]) {
        const nextScrollStart =
          container[scrollStart] + (tabRect[start] - tabsRect[start]);
        scroll(nextScrollStart, container, scrollStart);
      } else if (tabsRect[end] < tabRect[end]) {
        const nextScrollStart =
          container[scrollStart] + (tabRect[end] - tabsRect[end]);
        scroll(nextScrollStart, container, scrollStart);
      }
    }
  });

  useEffect(() => {
    if (scrollSelectedIntoView) scrollSelectedIntoView();
  }, [activeKey, scrollSelectedIntoView]);

  useEffect(
    () => () => {
      handleTabsScroll.cancel();
    },
    [handleTabsScroll],
  );

  useSize(
    ownerWindow(tabsRef.current as Node),
    () => {
      if (updateScrollButtonState) updateScrollButtonState();
      if (updateInkbarState) updateInkbarState(activeIndex.current);
    },
    {
      type: 'debounce',
      wait: 200,
    },
  );

  const onInternalTabClick = (
    activeKey: string,
    e: MouseEvent<HTMLDivElement>,
  ) => {
    if (onTabClick) onTabClick(activeKey, e);
    setActiveKey(activeKey);
  };

  const tabNodes = tabs.map((tab, index) => (
    <TabNode
      key={tab.key}
      tab={tab}
      onClick={(event) => {
        onInternalTabClick(tab.key, event);
      }}
      tabBarGutter={index == 0 ? 0 : tabBarGutter}
      ownerState={ownerState}
      active={tab.key === activeKey}
    />
  ));

  const hideButton = type !== 'editable-card' || hideAdd;
  const hideInkbar = type !== 'line';

  return (
    <TabHeader className={classes?.tabHeader}>
      <TabNavListRoot
        ref={ref}
        className={classNames(classes?.tabNav, className)}
        ownerState={ownerState}
        {...other}
      >
        <ExtraContent
          position="left"
          extra={tabBarExtraContent}
          classes={classes}
        />
        <TabNavWrap ownerState={ownerState} className={classes?.navWrap}>
          {!hideButton && (
            <OperationNode ref={operationsRef as Ref<HTMLDivElement>} />
          )}
          <TabsScroller
            ownerState={{ ...ownerState, scrollBarSize }}
            className={classes?.scroller}
            onScroll={handleTabsScroll}
            ref={tabsRef as LegacyRef<HTMLDivElement>}
          >
            <ScrollButton
              ownerState={displayScroll.next}
              className={classes?.scrollButtons}
              onClick={handleStartScrollClick}
            />
            <TabContainer
              ownerState={ownerState}
              className={classes?.tabContainer}
              ref={tabListRef as LegacyRef<HTMLDivElement>}
              onKeyDown={handleKeyDown}
              role="tablist"
            >
              {tabNodes}
            </TabContainer>
            <ScrollButton
              ownerState={displayScroll.next}
              className={classes?.scrollButtons}
              onClick={handleEndScrollClick}
            />
            {!hideInkbar && (
              <TabsInkbar
                ownerState={{ ...ownerState, ...inkState }}
                className={classes?.inkBar}
              />
            )}
          </TabsScroller>
          {!hideButton && (
            <AddButton ref={innerAddButtonRef as Ref<HTMLDivElement>} />
          )}
        </TabNavWrap>
        <ExtraContent
          position="right"
          extra={tabBarExtraContent}
          classes={classes}
        />
      </TabNavListRoot>
    </TabHeader>
  );
};

export default React.forwardRef(TabNavList);
