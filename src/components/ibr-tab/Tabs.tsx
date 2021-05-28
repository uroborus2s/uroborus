import React, {
  ForwardRefRenderFunction,
  memo,
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
  TabPosition,
  TabsType,
} from './types';
import TabNavList from './TabNavList/TabNavList';
import TabPaneList from './TabPane/TabPaneList';
import classNames from 'classnames';
import warning from '@/util/warning';
import { CSSPrefixProps, getPrefixCls } from '@/util';
import TabDivider from './TabDivider';
import { useSetRecoilState } from 'recoil';
import { TabActiveKey } from '@ibr/ibr-tab/mode/key';
import {
  DragDropContext,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd';
import Icon from '@ibr/ibr-icon/Icon';
import { GrAdd, GrClose } from 'react-icons/gr';

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

const Tabs: ForwardRefRenderFunction<HTMLDivElement, TabsProps> = (
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

  useEffect(() => {
    if (!id) {
      uuid += 1;
    }
  }, []);

  const active = defaultActiveKey ?? activeKey ?? tabPanes[0].tabKey;
  const setActiveKey = useSetRecoilState(TabActiveKey);
  useEffect(() => {
    setActiveKey(String(active));
  }, [defaultActiveKey, activeKey, tabPanes]);

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
      removeIcon: addIcon ?? (
        <Icon button icon={GrClose} outline="square"></Icon>
      ),
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
      [`${prefixCls}-card`]: type !== 'line' ? true : false,
      [`${prefixCls}-centered`]: centered,
      [`${prefixCls}-${tabPosition}`]: tabPosition,
      [`${prefixCls}-rtl`]: rtl ? true : false,
    },
    className,
  );

  const handleDragEnd = (result: DropResult, provided: ResponderProvided) => {
    console.log('');
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div ref={ref} id={id} className={tabsClass} {...other} style={styleProp}>
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
          {...tabNavBarProps}
        ></TabNavList>
        {divider && <TabDivider prefixCls={prefixCls}></TabDivider>}
        <TabPaneList
          {...sharedProps}
          tabPaneAnimated={mergedAnimated.tabPane}
          className={tabPanesClassName}
        ></TabPaneList>
      </div>
    </DragDropContext>
  );
};

export default memo(React.forwardRef(Tabs));
