import { Theme } from '@mui/material/styles/createTheme';
import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';
import {
  ComponentType,
  HTMLAttributes,
  MouseEvent,
  ReactElement,
  ReactNode,
  ReactText,
  useImperativeHandle,
} from 'react';
import { TabsClasses } from './TabClasses';
import Tabs from './Tabs';

export interface TabsState {
  rtl: boolean;
  vertical: boolean;
  tabPosition: TabPosition;
  paneAnimated: boolean;
  inkAnimated: boolean;
  classes?: Partial<TabsClasses>;
  id: string;
  centered: boolean;
  type?: TabsType;
}

export interface OperationProps extends HTMLAttributes<HTMLDivElement> {
  tabs: Array<TabInProps>;
  onTabClick: (activeKey: string, e: MouseEvent<HTMLDivElement>) => void;
  addIcon?: ReactNode;
}

export interface TabsProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /* The system prop that allows defining system overrides as well as additional CSS styles.*/
  sx?: SxProps<Theme>;
  classes?: Partial<TabsClasses>;
  //方向
  direction?: 'ltr' | 'rtl';
  //当前组件的ID
  id?: string;
  //当前激活 tab 面板的 key
  activeKey?: string;
  //初始化选中面板的 key，如果没有设置 activeKey，默认第一个面板
  defaultActiveKey?: string;
  //是否使用动画切换 Tabs, 仅生效于 tabPosition="top"
  animated?: boolean | AnimatedConfig;
  //替换 TabBar，用于二次封装标签头
  renderTabBar?: RenderTabBar<TabNavListProps>;
  //tab bar 上额外的元素
  tabBarExtraContent?: TabBarExtraContent;
  //tabs 之间的间隙
  tabBarGutter?: number;
  //标签切换页位置，可选值有 top right bottom left
  tabPosition?: TabPosition;
  //pane面板页被隐藏时是否销毁 DOM 结构
  destroyInactiveTabPane?: boolean;
  // //切换面板时的回调
  // onChange?: (activeKey: string) => void;
  // tab 标签页被点击时的回调
  onTabClick?: (activeKey: string, e: KeyboardEvent | MouseEvent) => void;
  //tab 滚动时的触发回调
  onTabScroll?: OnTabScroll;
  //页签的基本样式，可选 line、card editable-card 类型
  type?: TabsType;
  // 是否隐藏加号图标，在 type="editable-card" 时有效,默认false
  hideAdd?: boolean;
  //标签是否居中展示，默认false
  centered?: boolean;
  //自定义添加按钮
  addIcon?: ReactNode;
  //更多列表项里的添加按钮
  moreAddIcon?: ReactNode;
  //新增和删除页签的回调，在 type="editable-card" 时有效
  // onEdit?: (
  //   e: React.MouseEvent | React.KeyboardEvent | string,
  //   action: 'add' | 'remove',
  // ) => void;
}

export type TabNavListProps = Pick<
  TabsProps,
  | 'hideAdd'
  | 'tabBarExtraContent'
  | 'addIcon'
  | 'tabBarGutter'
  | 'onTabClick'
  | 'onTabScroll'
  | 'moreAddIcon'
> &
  HTMLAttributes<HTMLDivElement> & {
    ownerState: TabsState;
    tabs: Array<TabInProps>;
  };

export type TabNodeProps = Omit<
  TabNavListProps,
  | 'tabs'
  | 'addIcon'
  | 'moreIcon'
  | 'tabBarExtraContent'
  | 'hideAdd'
  | 'onTabScroll'
  | 'onTabClick'
  | 'type'
> & {
  tab: TabInProps;
  active: boolean;
  disabled?: boolean;
};

export interface AnimatedConfig {
  //tab下划线动画
  inkBar?: boolean;
  //面板动画
  tabPane?: boolean;
}

//替换 TabBar，用于二次封装标签头
export type RenderTabBar<P> = (
  props: any,
  DefaultTabBar: ComponentType<P>,
) => ReactElement;

// tab bar 上额外的元素
export type TabBarExtraPosition = 'left' | 'right';

export type TabBarExtraMap = Partial<Record<TabBarExtraPosition, ReactNode>>;
export type TabBarExtraContent = ReactNode | TabBarExtraMap;

//标签切换页位置，可选值有 top right bottom left
export type TabPosition = 'left' | 'right' | 'top' | 'bottom';

//tab 滚动时的触发回调
export type OnTabScroll = (info: {
  direction: 'left' | 'right' | 'top' | 'bottom';
}) => void;

export type TabsType = 'line' | 'card' | 'editable-card';

//tabs 子项 tab的参数定义
export interface TabProps {
  tab?: TabNodeElement;
  forceRender?: boolean;
  closeIcon?: ReactNode;
  children?: ReactNode | undefined;
}

//tab 传递给子组件的参数
export interface TabInProps {
  key: string;
  tab?: TabNodeElement;
  closeIcon?: ReactNode;
}

export interface PaneInProps {
  key?: string;
  forceRender?: boolean;
  children?: ReactNode | undefined;
}

export interface TabsInProps {
  tabs: Array<TabInProps>;
  panes: Array<PaneInProps>;
}

//定义tabnode 的组件类型
export type TabNodeElement =
  | ReactElement<TabNodeElementProps>
  | ReactText
  | null
  | undefined;

export type TabNodeElementProps = { name: ReactText } & Record<string, unknown>;

export default Tabs;
export { default as Tab } from './Tab';

export type TabHandle = { activeTab: (activeKey: string) => void };
