import TabPane from '@ibr/ibr-tabs/TabPanelList/TabPane';
import styled from '@mui/material/styles/styled';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { PaneInProps, TabsState } from '../index';
import { activeTabKey, findTabIndex } from '../core';
import { TabComponentName } from '../TabClasses';

export interface TabPaneListProps {
  destroyInactiveTabPane?: boolean;
  ownerState: TabsState;
  panes: Array<PaneInProps>;
}

const posLeft = {
  order: 0,
  marginRight: '-1px',
  borderRight: '1px solid #f0f0f0',
};
const posRigth = {
  order: 1,
  marginLeft: '-1px',
  borderLeft: '1px solid #f0f0f0',
};

const Holder = styled('div', {
  name: TabComponentName,
  slot: 'Holder',
  overridesResolver: (props, styles) => styles.holder,
})<{ ownerState: TabsState }>(({ ownerState: { tabPosition, rtl } }) => ({
  flex: 'auto',
  minHeight: 0,
  minWidth: 0,
  ...(tabPosition == 'bottom' && {
    order: 0,
  }),
  ...(tabPosition == 'left' && (rtl ? posLeft : posRigth)),
  ...(tabPosition == 'right' && (rtl ? posRigth : posLeft)),
}));

const Content = styled('div', {
  name: TabComponentName,
  slot: 'FlexContent',
  overridesResolver: (props, styles) => {
    const { paneAnimated, tabPosition } = props;
    return [
      styles.flexContent,
      paneAnimated && styles.contentAnimated,
      tabPosition && styles[`content-${tabPosition}`],
    ];
  },
})<{ ownerState: TabsState & { activeIndex: number } }>(
  ({ ownerState: { paneAnimated, activeIndex, rtl } }) => ({
    display: 'flex',
    width: '100%',
    height: '100%',
    ...(paneAnimated && {
      transition: 'margin 0.3s',
    }),
    ...(activeIndex !== -1 &&
      (rtl
        ? { marginRight: `-${activeIndex}00%` }
        : { marginLeft: `-${activeIndex}00%` })),
  }),
);

const TabPaneList: React.FC<TabPaneListProps> = ({
  ownerState,
  panes,
  destroyInactiveTabPane,
}) => {
  const classes = ownerState.classes || {};
  const activekey = useRecoilValue(activeTabKey);

  const activeIndex = findTabIndex(panes, activekey);

  return (
    <Holder className={classes.holder} ownerState={ownerState}>
      <Content
        className={classes.flexContent}
        ownerState={{ ...ownerState, activeIndex }}
      >
        {panes.map((pane) => (
          <TabPane
            id={ownerState.id}
            key={pane.key}
            animated={ownerState.paneAnimated}
            tabKey={pane.key}
            destroyInactiveTabPane={destroyInactiveTabPane}
            active={activekey === pane.key}
            forceRender={pane.forceRender}
            tabPosition={ownerState.tabPosition}
            classes={classes}
          >
            {pane.children}
          </TabPane>
        ))}
      </Content>
    </Holder>
  );
};

export default TabPaneList;
