import React, {
  ForwardedRef,
  ForwardRefRenderFunction,
  ReactNode,
  useEffect,
  useMemo,
} from 'react';

import './styles/tabs.scss';
import {
  AnimatedConfig,
  EditableConfig,
  SizeType,
  Tab,
  TabBarExtraContent,
  TabColorRefHandler,
  TabPosition,
  TabsType,
} from './types';
import TabNavList from './TabNavList/TabNavList';
import TabPaneList from './TabPane/TabPaneList';
import classNames from 'classnames';
import warning from '@/util/warning';
import { CSSPrefixProps, getPrefixCls } from '@/util';
import TabDivider from './TabDivider';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import { TabActiveKey, TabFontColor } from '@ibr/ibr-tab/mode/key';
import {
  DragDropContext,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd';
import Icon from '@ibr/ibr-icon/Icon';
import { GrClose } from 'react-icons/gr';
import useChangeFontColor from '@ibr/ibr-tab/hooks/useChangeFontColor';

let uuid = 0;

interface TabsProps
  extends CSSPrefixProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  id?: string;
  divider?: boolean;
  tabPanes: Tab[];
  //tab按钮可否编辑
  animated?: boolean | AnimatedConfig;
  type?: TabsType;
  size?: SizeType;
  centered?: boolean;
  hideAdd?: boolean;
  addIcon?: ReactNode;
  hasDropdown?: boolean;
  isTabDropDisabled?: boolean;
  isTabEditable?: boolean;
  onTabClick?: (e: React.MouseEvent | React.KeyboardEvent) => void;
  tabRef?: ForwardedRef<HTMLDivElement>;

  onEdit?: (
    e: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove',
  ) => void;
  activeKey?: React.Key;
  defaultActiveKey?: React.Key;
  direction?: 'ltr' | 'rtl';
  tabPosition?: TabPosition;
  tabBarGutter?: number;
  tabBarExtraContent?: TabBarExtraContent;
  tabNavClassName?: string;
  tabPanesClassName?: string;
  tabNodeClassName?: string;
  tabNodeStyle?: React.CSSProperties;

  /**
   * The label for the Tabs as a string.
   */
  'aria-label'?: string;
  /**
   * An id or list of ids separated by a space that label the Tabs.
   */
  'aria-labelledby'?: string;
}

const TabsFunction: ForwardRefRenderFunction<TabColorRefHandler, TabsProps> = (
  {
    size,
    className,
    direction,
    id,
    tabPosition = 'top',
    type = 'line',
    hideAdd,
    centered,
    onEdit: _onEdit,
    prefixCls: customizePrefixCls,
    tabPanes,
    activeKey,
    defaultActiveKey,
    tabBarGutter,
    animated,
    tabBarExtraContent,
    hasDropdown,
    isTabDropDisabled,
    onTabClick,
    tabNavClassName,
    tabPanesClassName,
    divider,
    addIcon,
    style: styleProp,
    tabNodeClassName,
    tabNodeStyle,
    tabRef,
    ...other
  },
  ref,
) => {
  const mergedId = useMemo(() => {
    return (
      id ??
      'ibr-tabs-'.concat(
        process.env.NODE_ENV === 'test' ? 'test' : String(uuid),
      )
    );
  }, [id]);

  const active = defaultActiveKey ?? activeKey ?? tabPanes[0].tabKey;
  const setActiveKey = useSetRecoilState(TabActiveKey);
  const fontColor = useRecoilValue(TabFontColor);

  useEffect(() => {
    uuid += 1;
    setActiveKey(String(active));
  }, []);

  useChangeFontColor(ref);

  if (tabPanes.length === 0) {
    warning(false, '`children` of Tab is empty. ');
    return null;
  }
  const prefixCls = getPrefixCls('tabs', customizePrefixCls);

  const rtl = direction === 'rtl';
  let mergedAnimated;
  if (animated === false) {
    mergedAnimated = {
      inkBar: false,
      tabPane: false,
    };
  } else if (animated === true) {
    mergedAnimated = {
      inkBar: true,
      tabPane: true,
    };
  } else {
    animated = typeof animated === 'object' ? animated : {};
    mergedAnimated = {
      ...{
        inkBar: true,
        tabPane: false,
      },
      ...animated,
    };
  }

  let editable: EditableConfig | undefined = undefined;

  if (type === 'editable-card') {
    editable = {
      onEdit: (editType, info) => {
        if (_onEdit) _onEdit(info.event, editType);
      },
      showAdd: hideAdd !== true,
      addIcon: addIcon,
      removeIcon: addIcon ?? <Icon button icon={GrClose} outline="square" />,
    };
  }

  const sharedProps = {
    id: mergedId,
    rtl: rtl,
    prefixCls: prefixCls,
    tabs: tabPanes,
  };

  const tabNavBarProps = {
    ...sharedProps,
    editable: editable,
    tabPosition: tabPosition,
  };

  const tabsClass = classNames(
    prefixCls,
    {
      [`${prefixCls}-${size}`]: size,
      [`${prefixCls}-card`]: type !== 'line',
      [`${prefixCls}-centered`]: centered,
      [`${prefixCls}-${tabPosition}`]: tabPosition,
      [`${prefixCls}-rtl`]: rtl,
    },
    className,
  );

  const handleDragEnd = (result: DropResult, provided: ResponderProvided) => {
    console.log('');
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div
        ref={tabRef}
        id={id}
        className={tabsClass}
        {...other}
        style={{ color: fontColor, ...styleProp }}
      >
        <TabNavList
          tabBarGutter={tabBarGutter}
          extra={tabBarExtraContent}
          inkBar={mergedAnimated.inkBar}
          hasDropdown={hasDropdown}
          isTabDropDisabled={isTabDropDisabled}
          onTabClick={onTabClick}
          className={tabNavClassName}
          tabNodeClassName={tabNodeClassName}
          tabNodeStyle={tabNodeStyle}
          type={type}
          {...tabNavBarProps}
        />
        {divider && <TabDivider prefixCls={prefixCls} />}
        <TabPaneList
          {...sharedProps}
          tabPaneAnimated={mergedAnimated.tabPane}
          className={tabPanesClassName}
        />
      </div>
    </DragDropContext>
  );
};

const Tabs = React.forwardRef(TabsFunction);

const RecoilTabs = (
  props: TabsProps,
  ref: ForwardedRef<TabColorRefHandler>,
) => {
  return (
    <RecoilRoot>
      <Tabs {...props} ref={ref} />
    </RecoilRoot>
  );
};

export default React.forwardRef(RecoilTabs);
