import React, {
  CSSProperties,
  ForwardRefRenderFunction,
  KeyboardEvent,
  LegacyRef,
  memo,
  Ref,
  useEffect,
  useRef,
  useState,
  WheelEvent,
} from 'react';
import classNames from 'classnames';
import {
  EditableConfig,
  Tab,
  TabBarExtraContent,
  TabBarExtraPosition,
  TabSharedProps,
  TabsType,
} from '../types';
import OperationNode from './OperationNode';
import TabScrollButton from './TabScrollButton';
import {
  CommonProps,
  cssFlexNone,
  UseForkRef,
  useRefCallback,
  useResizeObserver,
} from '@/util';
import TabList from './TabList';
import AddButton from '@ibr/ibr-tab/TabNavList/AddButton';
import useRefs from '@/util/hooks/useRefs';
import { useRecoilValue } from 'recoil';
import { TabActiveKey } from '@ibr/ibr-tab/mode/key';
import useRaf from '@/util/hooks/useRaf';

interface ExtraContentProps {
  position: TabBarExtraPosition;
  extra: TabBarExtraContent;
  prefixCls: string;
}

const ExtraContentCom: React.FC<ExtraContentProps> = ({
  position,
  extra,
  prefixCls,
}) => {
  if (!extra) return null;

  let content;
  if (position === 'left') {
    // @ts-ignore
    content = extra?.left || null;
  }

  if (position === 'right') {
    // @ts-ignore
    content = extra?.right || (!extra?.left && extra) || null;
  }

  return content ? (
    <div className={prefixCls.concat('-extra-content')}>{content}</div>
  ) : null;
};

const ExtraContent = memo(ExtraContentCom);

export interface TabNavListProps extends CommonProps, TabSharedProps {
  extra?: TabBarExtraContent;
  //tab 按钮拦的位置
  inkBar: boolean;
  tabBarGutter?: number;
  hasDropdown?: boolean;
  isTabDropDisabled?: boolean;
  onTabClick?: (e: React.MouseEvent | React.KeyboardEvent) => void;
  editable?: EditableConfig;
  tabs: Tab[];
  tabNodeClassName?: string;
  tabNodeStyle?: React.CSSProperties;
  type?: TabsType;
}

const TabNavList: ForwardRefRenderFunction<HTMLDivElement, TabNavListProps> = (
  {
    tabBarGutter,
    id,
    rtl,
    tabPosition = 'top',
    extra,
    className,
    style,
    inkBar,
    prefixCls,
    hasDropdown = false,
    isTabDropDisabled = true,
    editable,
    onTabClick,
    tabNodeClassName,
    tabNodeStyle,
    tabs,
    type,
  },
  ref,
) => {
  //蓝色条的位置信息
  const [inkStyle, setInkStyle] = useState<CSSProperties>({});
  const [scrollBtn, setScrollBtn] = useState({ start: false, end: false });
  const activeKey = useRecoilValue(TabActiveKey);
  const tabsWrapperRef = useRef<HTMLDivElement>();
  const tabListRef = useRef<HTMLDivElement>();
  const tabContainerRef = useRef<HTMLDivElement>();
  const vertical = tabPosition === 'left' || tabPosition === 'right';
  const start = vertical ? 'top' : 'left';
  const end = vertical ? 'bottom' : 'right';
  const size = vertical ? 'height' : 'width';
  const clientSize = vertical ? 'clientHeight' : 'clientWidth';
  const scrollStart = vertical ? 'scrollTop' : 'scrollLeft';

  const { clientWidth: navWidth, clientHeight: navHeight } = useResizeObserver(
    tabsWrapperRef,
  );

  const navLength = vertical ? navHeight : navWidth;

  const [scrollNum, setScrollNum] = useState(0);

  const updateScrollButtonState = useRefCallback(() => {
    const _tabContainerRef = tabContainerRef.current;
    const _tabListRef = tabListRef.current;
    if (_tabContainerRef && _tabListRef) {
      const totalLength = _tabContainerRef[clientSize];
      const currentLength = _tabListRef[clientSize];

      const showStartScroll = scrollNum > 1;
      const showEndScroll = totalLength - currentLength - scrollNum > 1;

      if (scrollBtn.start !== showStartScroll || scrollBtn.end != showEndScroll)
        setScrollBtn({
          start: showStartScroll,
          end: showEndScroll,
        });
    }
  });

  const { getRef: getBtnRef } = useRefs<HTMLDivElement>();

  const calcScrollValue = (scrollValue: number) => {
    let delta = 0;
    let total = 0;
    if (tabListRef.current && tabContainerRef.current) {
      delta = tabListRef.current[clientSize];
      total = tabContainerRef.current[clientSize];
    }
    const maxValue = total - delta;
    const minValue = 0;
    return Math.max(minValue, Math.min(scrollValue, maxValue));
  };

  const scrollSelectedIntoView = useRefCallback(() => {
    const tabNode = getBtnRef(activeKey);
    let tabNodeRect = null;
    let listRect = null;

    if (tabNode.current) tabNodeRect = tabNode.current.getBoundingClientRect();
    if (tabListRef.current)
      listRect = tabListRef.current.getBoundingClientRect();
    if (listRect && tabNodeRect) {
      const moveTop = listRect[start] - tabNodeRect[start];
      const moveBottom = listRect[end] - tabNodeRect[end];

      if (moveTop > 0)
        setScrollNum(calcScrollValue(Math.ceil(scrollNum - moveTop)));
      if (moveBottom < 0)
        setScrollNum(calcScrollValue(Math.ceil(scrollNum - moveBottom)));
    }
  });

  const handleLeftScrollClick = useRefCallback(() => {
    if (tabListRef.current) {
      // tabContainerRef.current.scrollLeft = 892;
      const delta = tabListRef.current[clientSize];
      let scrollValue = scrollNum;
      if (scrollStart == 'scrollTop') {
        scrollValue -= delta;
      } else {
        scrollValue -= delta * (rtl ? -1 : 1); // Fix for Edge
      }
      setScrollNum(calcScrollValue(Math.ceil(scrollValue)));
    }
  });

  const handleRightScrollClick = useRefCallback(() => {
    if (tabListRef.current && tabContainerRef.current) {
      // tabContainerRef.current.scrollLeft = 892;
      const delta = tabListRef.current[clientSize];
      let scrollValue = scrollNum;
      if (scrollStart == 'scrollTop') {
        scrollValue += delta;
      } else {
        scrollValue += delta * (rtl ? -1 : 1); // Fix for Edge
      }
      setScrollNum(calcScrollValue(Math.ceil(scrollValue)));
    }
  });
  //
  // const handleTabsScroll = useRaf(() => {
  //   updateScrollButtonState();
  // });
  //

  const handleWheel = useRaf((event: WheelEvent<HTMLDivElement>) => {
    const wheelNum = scrollNum + event.deltaY * 10;
    if (tabListRef.current && tabContainerRef.current) {
      setScrollNum(calcScrollValue(Math.ceil(wheelNum)));
    }
  });
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    event.preventDefault();

    if (target!.getAttribute('role') !== 'tab') return;
    let newFocusTarget;
    const previousItemKey = vertical ? 'ArrowUp' : 'ArrowLeft';
    const nextItemKey = vertical ? 'ArrowDown' : 'ArrowRight';
    if (tabContainerRef.current) {
      const containerNode = tabContainerRef.current;
      switch (event.key) {
        case previousItemKey:
          newFocusTarget =
            target!.previousElementSibling || containerNode.firstElementChild;
          break;

        case nextItemKey:
          newFocusTarget =
            target!.nextElementSibling || containerNode.lastElementChild;
          break;

        case 'Home':
          newFocusTarget = containerNode.firstElementChild;
          break;

        case 'End':
          newFocusTarget = containerNode.lastElementChild;
          break;

        default:
          break;
      }
    }
    if (newFocusTarget) {
      (newFocusTarget as HTMLElement).focus({ preventScroll: true });
    }
  };

  const navRef = useRef<HTMLDivElement>();

  const updateIndicatorState = useRefCallback(() => {
    const tabNode = getBtnRef(activeKey);
    let tabMeta = null;
    if (tabNode.current) tabMeta = tabNode.current.getBoundingClientRect();
    let startValue = 0;

    if (tabMeta && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      if (vertical) startValue = tabMeta.top - navRect.top;
      startValue = tabMeta.left - navRect.left;
      const newIndicatorStyle = {
        [start]: startValue,
        [size]: tabMeta[size],
      };
      const inkStart = inkStyle[start];
      const inkSize = inkStyle[size];
      // @ts-ignore
      if (isNaN(inkStart) || isNaN(inkSize)) {
        setInkStyle(newIndicatorStyle);
      } else {
        // @ts-ignore
        const dStart = Math.abs(inkStart - newIndicatorStyle[start]);
        // @ts-ignore
        const dSize = Math.abs(inkSize - newIndicatorStyle[size]);
        if (dStart >= 1 || dSize >= 1) {
          setInkStyle(newIndicatorStyle);
        }
      }
    }
  });

  const displayAddButton = editable ? editable.showAdd : false;
  useEffect(() => {
    updateScrollButtonState();
  }, [navLength, scrollNum]);
  //
  useEffect(() => {
    scrollSelectedIntoView();
  }, [activeKey]);

  useEffect(() => {
    updateIndicatorState();
  }, [navLength, scrollNum, activeKey]);

  return (
    <div
      // @ts-ignore
      ref={UseForkRef(navRef, ref)}
      role="tab-nav-bar"
      className={classNames(prefixCls.concat('-nav'), cssFlexNone, className)}
      style={style}
    >
      <ExtraContent position="left" extra={extra} prefixCls={prefixCls} />
      <OperationNode hasDropdown={hasDropdown} prefixCls={prefixCls} />
      <div
        className={prefixCls.concat('-nav-wrap')}
        // @ts-ignore
        ref={tabsWrapperRef}
      >
        <span
          className={classNames(prefixCls.concat('-ink-bar'), {
            [`${prefixCls}-ink-bar-animated`]: inkBar,
          })}
          style={inkStyle}
        />
        <div
          className={`${prefixCls}-nav-list`}
          ref={tabListRef as LegacyRef<HTMLDivElement>}
          role="tabList"
        >
          <TabScrollButton
            prefixCls={prefixCls}
            direction={rtl ? 'right' : 'left'}
            disabled={!scrollBtn.start}
            onClick={handleLeftScrollClick}
          />
          <TabList
            prefixCls={prefixCls}
            id={id}
            tabNodes={tabs}
            rtl={rtl}
            tabBarGutter={tabBarGutter}
            tabPosition={tabPosition}
            tabNodeClassName={tabNodeClassName}
            tabNodeStyle={tabNodeStyle}
            ref={tabContainerRef as Ref<HTMLDivElement>}
            scrollNum={-scrollNum}
            getBtnRef={getBtnRef}
            editable={editable}
            onWheel={handleWheel}
            onKeyDown={handleKeyDown}
            type={type}
            onClick={onTabClick}
          />
          <TabScrollButton
            prefixCls={prefixCls}
            direction={rtl ? 'left' : 'right'}
            disabled={!scrollBtn.end}
            onClick={handleRightScrollClick}
          />
        </div>
        {displayAddButton && (
          <AddButton addIcon={editable?.addIcon} prefixCls={prefixCls} />
        )}
      </div>
      <ExtraContent position="right" extra={extra} prefixCls={prefixCls} />
    </div>
  );
};

export default memo(React.forwardRef(TabNavList));
