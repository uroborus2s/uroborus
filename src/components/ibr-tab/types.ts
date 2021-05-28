import React, { ReactNode } from 'react';

export interface EditableConfig {
  onEdit: (
    type: 'add' | 'remove',
    info: {
      key?: string;
      event: React.MouseEvent | React.KeyboardEvent;
    },
  ) => void;
  showAdd: boolean;
  removeIcon: React.ReactNode;
  addIcon: React.ReactNode;
}

export interface TabPaneProps {
  paneNode?: React.ReactNode;
  forceRender?: boolean;
  tabKey: React.Key;
  id?: string;
  animated: boolean;
  active: boolean;
  prefixCls: string;
}

export declare type Tab = {
  tab: (active?: boolean) => ReactNode;
  disabled?: boolean;
  tabKey: React.Key;
  paneNode?: React.ReactNode;
  forceRender?: boolean;
};

export interface AnimatedConfig {
  inkBar?: boolean;
  tabPane?: boolean;
}

export declare type TabsType = 'line' | 'card' | 'editable-card';
export declare type SizeType = 'small' | 'middle' | 'large' | undefined;

export declare type OnTabScroll = (info: {
  direction: 'left' | 'right' | 'top' | 'bottom';
}) => void;
export declare type TabPosition = 'left' | 'right' | 'top' | 'bottom';
export declare type TabBarExtraPosition = 'left' | 'right';
export declare type TabBarExtraMap = Partial<
  Record<TabBarExtraPosition, React.ReactNode>
>;
export declare type TabBarExtraContent = React.ReactNode | TabBarExtraMap;

//Reducer
export type actionType = { type: 'active'; payload: React.Key };

export interface TabSharedProps {
  tabPosition?: TabPosition;
  prefixCls: string;
  id: string;
  rtl: boolean;
}

export interface FontColorRefHandler {
  changeIconColor: (color: string) => void;
}
