import { useRefFun, useSize } from '@/core/hooks';
import useEffectNomount from '@hooks/useEffectNomount';
import ScrollButtonIcon from '@ibr/ibr-icon/ScrollButtonIcon';
import {
  windowScrollBarHeight,
  windowScrollBarWidth,
} from '@ibr/ibr-scrollbar-size/ScrollbarSize';
import styled from '@mui/material/styles/styled';
import ownerWindow from '@mui/material/utils/ownerWindow';
import classNames from 'classnames';
import debounce from 'lodash.debounce';
import {
  FC,
  forwardRef,
  ForwardRefRenderFunction,
  isValidElement,
  LegacyRef,
  MouseEvent,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { useRecoilValue } from 'recoil';
import { ActiveTabKey, findTabIndex, scroll } from '../core';
import {
  TabBarExtraContent,
  TabBarExtraPosition,
  TabNavListProps,
  TabsState,
} from '../index';
import { TabComponentName, TabsClasses } from '../TabClasses';
import OperationNode from './OperationButton';
import TabNode from './TabNode';
import useMoveInkbar from './useMoveInkbar';
import useScrollButton from './useScrollButton';
import useScrollTurnPage from './useScrollTurnPage';
import useTabKeyboard from './useTabKeyboard';

const ExtraNode = styled('div', {
  name: TabComponentName,
  slot: 'Extra',
  overridesResolver: (props, styles) => styles.extra,
})({
  flex: 'none',
  alignItems: 'center',
});

const ExtraContent: FC<{
  position: 'left' | 'right';
  extra: TabBarExtraContent;
  classes?: Partial<TabsClasses>;
}> = ({ position, extra, classes }) => {
  let content: ReactNode; // Parse extra

  const assertExtra: Record<TabBarExtraPosition, ReactNode> = {
    right: null,
    left: null,
  };

  if (extra && typeof extra === 'object') {
    if (isValidElement(extra)) {
      assertExtra.right = extra;
    } else {
      assertExtra.right = (
        extra as Record<TabBarExtraPosition, ReactNode>
      ).right;
      assertExtra.left = (extra as Record<TabBarExtraPosition, ReactNode>).left;
    }
  }

  if (position === 'left') content = assertExtra.left;

  if (position === 'right') content = assertExtra.right;

  return content ? (
    <ExtraNode className={classes?.extra}>{content}</ExtraNode>
  ) : null;
};

const TabHeader = styled('div', {
  name: TabComponentName,
  slot: 'tabHeader',
  overridesResolver: (props, styles) => styles.tabHeader,
})<{ ownerState: TabsState }>(({ ownerState: { type } }) => ({
  boxShadow: type == 'line' ? 'rgb(0 0 0 / 3%) 0px 2px 0px 0px' : 'none',
  width: '100%',
  flex: 'none',
  backgroundColor: '#fff',
  paddingLeft: '1rem',
  paddingRight: '1rem',
}));

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
    return [styles.navWrap, props.ownerState.centered && styles.centered];
  },
})<{ ownerState: TabsState }>(({ ownerState: { centered, vertical } }) => ({
  position: 'relative',
  display: 'flex',
  flex: 'auto',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  height: '100%',
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
    flex: 'auto',
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

const TabsScrollerContainer = styled('div', {
  name: TabComponentName,
  slot: 'tabScrollerContainer',
  overridesResolver: (props, styles) => styles.tabContainer,
})({
  position: 'relative',
  display: 'flex',
  overflow: 'hidden',
});

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
})<{ ownerState: { display: boolean; direction?: 'start' | 'end' } }>(
  ({ ownerState }) => ({
    position: 'absolute',
    alignItems: 'center',
    display: ownerState.display ? 'flex' : 'none',
    top: 0,
    height: '100%',
    width: '60px',
    justifyContent: 'center',
    zIndex: 9999,
    ...(ownerState.direction !== 'end' ? { left: 0 } : { right: 0 }),
  }),
);

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
    tabBarGutter,
    addIcon,
    moreAddIcon,
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

  const { activeKey, setActiveKey } = useContext(ActiveTabKey);

  const activeIndex = useRef(findTabIndex(tabs, activeKey));

  const tabsRef = useRef<HTMLDivElement>();
  const tabListRef = useRef<HTMLDivElement>();

  const { updateScrollButtonState, displayScroll } = useScrollButton(
    ownerState,
    tabsRef,
    tabListRef,
  );

  const { handleStartScrollClick, handleEndScrollClick } = useScrollTurnPage(
    ownerState,
    tabsRef,
    tabListRef,
  );

  const { updateInkbarState, inkState } = useMoveInkbar(ownerState, tabListRef);

  //删除tab时，key被删除后重置索引
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
          container[scrollStart] + Math.floor(tabRect[start] - tabsRect[start]);
        scroll(nextScrollStart, container, scrollStart);
      } else if (tabsRect[end] < tabRect[end]) {
        const nextScrollStart =
          container[scrollStart] + Math.floor(tabRect[end] - tabsRect[end]);
        scroll(nextScrollStart, container, scrollStart);
      }
    }
  });

  useEffect(() => {
    if (scrollSelectedIntoView) scrollSelectedIntoView();
  }, [activeKey, scrollSelectedIntoView, tabListRef.current?.clientWidth]);

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

  const hideButton = ownerState.type !== 'editable-card' || hideAdd;
  const hideInkbar = ownerState.type !== 'line';

  return (
    <TabHeader className={classes?.tabHeader} ownerState={ownerState}>
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
            <OperationNode
              tabs={tabs}
              onTabClick={onInternalTabClick}
              addIcon={moreAddIcon}
              className={classes?.moreButton}
            />
          )}
          <TabsScrollerContainer>
            <ScrollButton
              ownerState={{ display: displayScroll.prev }}
              className={classes?.scrollButtons}
              onClick={handleStartScrollClick}
            >
              <ScrollButtonIcon />
            </ScrollButton>
            <TabsScroller
              ownerState={{ ...ownerState, scrollBarSize }}
              className={classes?.scroller}
              onScroll={handleTabsScroll}
              ref={tabsRef as LegacyRef<HTMLDivElement>}
            >
              <TabContainer
                ownerState={ownerState}
                className={classes?.tabContainer}
                ref={tabListRef as LegacyRef<HTMLDivElement>}
                onKeyDown={handleKeyDown}
                role="tablist"
              >
                {tabNodes}
              </TabContainer>
            </TabsScroller>
            <ScrollButton
              ownerState={{ display: displayScroll.next, direction: 'end' }}
              className={classes?.scrollButtons}
              onClick={handleEndScrollClick}
            >
              <ScrollButtonIcon direction="end" />
            </ScrollButton>
            {!hideInkbar && (
              <TabsInkbar
                ownerState={{ ...ownerState, ...inkState }}
                className={classes?.inkBar}
              />
            )}
          </TabsScrollerContainer>
          {!hideButton && addIcon}
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

export default forwardRef(TabNavList);
