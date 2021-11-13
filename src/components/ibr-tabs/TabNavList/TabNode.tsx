import {
  getTabsUtilityClass,
  TabComponentName,
  TabsClasses,
} from '@ibr/ibr-tabs/TabClasses';
import composeClasses from '@mui/core/composeClasses';
import styled from '@mui/material/styles/styled';
import React, { cloneElement, ReactElement } from 'react';
import { TabNodeElementProps, TabNodeProps, TabsState } from '../index';

const useTabNodeClasses = (
  classes: Partial<TabsClasses>,
  active: boolean,
  disabled: boolean,
) => {
  const slots = {
    tabNode: ['tabNode', active && 'tabActive', disabled && 'tabDisabled'],
  };
  return composeClasses(slots, getTabsUtilityClass, classes);
};

const TabNodeRoot = styled('div', {
  name: TabComponentName,
  slot: 'tabNode',
  overridesResolver: (props, styles) => [
    styles.tabNode,
    props.ownerState.active && styles.tabActive,
  ],
})<{
  ownerState: TabsState & {
    active: boolean;
    tabBarGutter: number;
    disabled: boolean;
  };
}>(
  ({
    ownerState: { active, disabled, tabBarGutter, vertical, rtl, type },
  }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    flex: 'none',
    fontSize: '13px',
    border: 0,
    outline: 'none',
    fontWeight: 500,
    userSelect: 'none',
    opacity: active ? 1 : 0.75,
    [`margin${
      vertical ? 'Bottom' : rtl ? 'Right' : 'Left'
    }`]: `${tabBarGutter}px`,
    color: disabled ? 'hsl(0,0%,15%)' : 'hsl(0,0%,20%)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    '&:hover': {
      opacity: 1,
    },
    ...(type !== 'line' && {
      borderTopLeftRadius: '3px',
      borderTopRightRadius: '3px',
      padding: '0 1rem',
      backgroundColor: active ? 'var(--bg-color)' : 'inherit',
    }),
  }),
);

const TabNode: React.FC<TabNodeProps> = ({
  ownerState,
  tab,
  active,
  tabBarGutter = 0,
  disabled = false,
  ...other
}) => {
  const classes = useTabNodeClasses(ownerState.classes || {}, active, disabled);

  const tabClassName = [...new Set(classes.tabNode.split(' '))].join(' ');

  const node =
    typeof tab.tab === 'object'
      ? cloneElement(tab.tab as ReactElement<TabNodeElementProps>, {
          active: active,
        })
      : tab.tab;

  return (
    <TabNodeRoot
      role="tab"
      tabIndex={0}
      id={`tab-${tab.key}-${ownerState.id}`}
      aria-selected={active}
      className={tabClassName}
      ownerState={{ ...ownerState, tabBarGutter, disabled, active }}
      {...other}
    >
      {node}
    </TabNodeRoot>
  );
};

export default TabNode;
