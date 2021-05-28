import React, { FC, memo } from 'react';
import classNames from 'classnames';
import { TabPaneProps } from '../types';

const TabPane: FC<TabPaneProps> = ({
  id,
  tabKey,
  active,
  forceRender,
  animated,
  paneNode,
  prefixCls,
}) => {
  const paneClass = classNames(`${prefixCls}-pane`, {
    [`${prefixCls}-pane-active`]: active,
  });
  const mergedStyle: { [key: string]: any } = {};
  if (!active) {
    if (animated) {
      mergedStyle.visibility = 'hidden';
      mergedStyle.height = 0;
      mergedStyle.overflowY = 'hidden';
    } else {
      mergedStyle.display = 'none';
    }
  }
  return (
    <div
      id={id && ''.concat(id, '-panel-').concat(String(tabKey))}
      role="tabpanel"
      tabIndex={active ? 0 : -1}
      className={paneClass}
      style={{ ...mergedStyle }}
    >
      {(active || forceRender) && paneNode}
    </div>
  );
};

export default memo(TabPane);
