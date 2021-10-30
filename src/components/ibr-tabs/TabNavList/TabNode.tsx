import {
  getTabsUtilityClass,
  TabComponentName,
  TabsClasses,
} from '@ibr/ibr-tabs/TabClasses';
import composeClasses from '@mui/core/composeClasses';
import styled from '@mui/material/styles/styled';
import React from 'react';
import { TabNodeProps, TabsState } from '../index';

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
    props.active && styles.tabActive,
  ],
})<{
  ownerState: TabsState & {
    active: boolean;
    tabBarGutter: number;
    disabled: boolean;
  };
}>(({ ownerState: { active, disabled, tabBarGutter, vertical, rtl } }) => ({
  position: 'relative',
  flex: 'none',
  fontSize: '13px',
  border: 0,
  outline: 'none',
  fontWeight: 500,
  opacity: active ? 1 : 0.75,
  [`margin${
    vertical ? 'Bottom' : rtl ? 'Right' : 'Left'
  }`]: `${tabBarGutter}px`,
  color: disabled ? 'hsl(0,0%,15%)' : 'hsl(0,0%,20%)',
  cursor: disabled ? 'not-allowed' : 'pointer',
  '&:hover': {
    color: 'hsla(0,0%,0%,0.8)',
    opacity: 0.85,
  },
}));

const TabNode: React.FC<TabNodeProps> = ({
  ownerState,
  tab,
  active,
  tabBarGutter = 0,
  disabled = false,
  ...other
}) => {
  const classes = useTabNodeClasses(ownerState.classes || {}, active, disabled);
  return (
    <TabNodeRoot
      role="tab"
      tabIndex={0}
      id={`tab-${tab.key}-${ownerState.id}`}
      aria-selected={active}
      className={classes.tabNode}
      ownerState={{ ...ownerState, tabBarGutter, disabled, active }}
      {...other}
    >
      {tab.tab}
    </TabNodeRoot>
  );
};

export default TabNode;
