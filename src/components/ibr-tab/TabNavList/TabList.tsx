import React, {
  ForwardRefRenderFunction,
  KeyboardEventHandler,
  memo,
  RefObject,
  WheelEventHandler,
} from 'react';

import { EditableConfig, Tab, TabSharedProps } from '@ibr/ibr-tab/types';
import TabNode from '@ibr/ibr-tab/TabNavList/TabNode';
import { Droppable } from 'react-beautiful-dnd';
import mergeRefs from '@/util/hooks/useForkRef';
import { useRecoilValue } from 'recoil';
import { TabActiveKey } from '@ibr/ibr-tab/mode/key';

interface TabListProps extends TabSharedProps {
  tabBarGutter?: number;
  tabNodes: Tab[];
  editable?: EditableConfig;
  tabNodeClassName?: string;
  tabNodeStyle?: React.CSSProperties;
  scrollNum?: number;
  getBtnRef: (key: React.Key) => RefObject<HTMLDivElement>;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
  onWheel?: WheelEventHandler<HTMLDivElement>;
}

const TabList: ForwardRefRenderFunction<HTMLDivElement, TabListProps> = (
  {
    tabNodeClassName,
    editable,
    tabNodes,
    tabBarGutter,
    id,
    prefixCls,
    tabPosition,
    rtl,
    tabNodeStyle,
    scrollNum = 0,
    getBtnRef,
    onKeyDown,
    onWheel,
  },
  ref,
) => {
  const orientation = tabPosition == 'top' || tabPosition == 'bottom';
  const activeKey = useRecoilValue(TabActiveKey);

  const dragTabNode = (node: Tab, index: number) => (
    <TabNode
      tab={node}
      ref={getBtnRef(node.tabKey)}
      active={activeKey === String(node.tabKey)}
      prefixCls={prefixCls}
      id={id}
      rtl={rtl}
      tabPosition={tabPosition}
      index={index}
      key={node.tabKey}
      className={tabNodeClassName}
      tabBarGutter={tabBarGutter}
      style={tabNodeStyle}
      editable={editable}
    ></TabNode>
  );

  const trans = orientation
    ? `translateX(${scrollNum}px)`
    : `translateY(${scrollNum}px)`;
  return (
    <Droppable
      droppableId={`TabNode-List-${id}`}
      direction={orientation ? 'horizontal' : 'vertical'}
    >
      {(provided, snapshot) => {
        return (
          <div
            className={`${prefixCls}-tab-container`}
            role="tabNodeList"
            // @ts-ignore
            ref={mergeRefs(provided.innerRef, ref)}
            style={{ transform: trans, transition: 'transform 500ms ease' }}
            {...provided.droppableProps}
            onKeyDown={onKeyDown}
            onWheel={onWheel}
          >
            {tabNodes.map(dragTabNode)}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};
export default memo(React.forwardRef(TabList));
