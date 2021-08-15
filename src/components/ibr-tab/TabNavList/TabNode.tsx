import React, {
  CSSProperties,
  FocusEvent,
  forwardRef,
  ForwardRefRenderFunction,
  LegacyRef,
  memo,
  useState,
} from 'react';
import classNames from 'classnames';
import { EditableConfig, Tab, TabSharedProps, TabsType } from '../types';
import { InputBase } from '@material-ui/core';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  ActiveTabFontColor,
  ActiveTabNodeBackgroundColor,
  TabActiveKey,
  TabNodeBackgroundColor,
} from '@ibr/ibr-tab/mode/key';
import { Draggable } from 'react-beautiful-dnd';
import { CommonProps, UseForkRef } from '@/util';

interface TabNodeProps extends TabSharedProps, CommonProps {
  tab: Tab;
  tabBarGutter?: number;
  isTabEditable?: boolean;
  index: number;
  onClick?: (e: React.MouseEvent | React.KeyboardEvent) => void;
  onFocus?: React.FocusEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement | HTMLDivElement
  >;
  onBlur?: React.FocusEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLDivElement
  >;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  active: boolean;
  editable?: EditableConfig;
  type?: TabsType;
}

const TabNode: ForwardRefRenderFunction<HTMLElement, TabNodeProps> = (
  {
    onFocus,
    id: idProp,
    prefixCls,
    tab,
    tabPosition,
    index,
    rtl,
    tabBarGutter = 0,
    onClick,
    onBlur,
    active,
    editable,
    className,
    style,
    type,
    ...other
  },
  ref,
) => {
  const edit = editable == undefined;

  const [mode, setMode] = useState(false);
  const nodeStyle: { [key: string]: any } = {};
  if (tabPosition === 'top' || tabPosition === 'bottom') {
    nodeStyle[rtl ? 'marginLeft' : 'marginRight'] = `${tabBarGutter}px`;
  } else {
    nodeStyle.marginBottom = `${tabBarGutter}px`;
  }

  const clickActive = useSetRecoilState(TabActiveKey);
  const activeFontColor = useRecoilValue(ActiveTabFontColor);
  const tabBgColor = useRecoilValue(TabNodeBackgroundColor);
  const activeTabBgColor = useRecoilValue(ActiveTabNodeBackgroundColor);
  const disabled = tab.disabled ?? false;
  const tabKey = tab.tabKey;

  let btnStyle: CSSProperties = {};

  if (!disabled && type !== 'line') {
    if (active) {
      btnStyle = { color: activeFontColor, backgroundColor: activeTabBgColor };
    } else {
      btnStyle = { backgroundColor: tabBgColor };
    }
  }

  const onInternalClick = (e: React.MouseEvent | React.KeyboardEvent): void => {
    if (disabled) return;
    if (onClick) onClick(e);
    clickActive(String(tabKey));
  };

  const onInternalFocus = (e: FocusEvent<HTMLDivElement>) => {
    if (!mode) clickActive(String(tabKey));
    if (onFocus) onFocus(e);
  };

  const onInternalBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (mode) setMode(false);
    if (onBlur) onBlur(e);
  };

  const onDoubleClick = (e: React.MouseEvent) => {
    console.log('doubleClick');
    e.stopPropagation();
    if (edit && !mode) setMode(true);
  };

  const tabPrefix = prefixCls.concat('-tab');
  const nodeClass = classNames(
    tabPrefix,
    {
      [`${tabPrefix}-active`]: active,
      [`${tabPrefix}-disabled`]: disabled,
    },
    className,
  );

  const textNodeClass = classNames(tabPrefix, tabPrefix.concat('-text'));
  const id =
    idProp && 'draggable'.concat(idProp, '-tab-').concat(String(tabKey));

  const buttonNode = (
    <div className={tabPrefix.concat('-btn')} style={btnStyle}>
      {tab.tab(active)}
    </div>
  );

  const textFieldNode = <InputBase></InputBase>;

  return (
    <Draggable
      draggableId={id}
      index={index}
      key={id}
      disableInteractiveElementBlocking
    >
      {(dragProvided, dragSnapshot) => {
        const { style, ...dragProps } = dragProvided.draggableProps;
        return (
          <div
            ref={
              UseForkRef(
                dragProvided.innerRef,
                ref,
              ) as LegacyRef<HTMLDivElement>
            }
            style={{ ...nodeStyle, ...style }}
            className={nodeClass}
            onClick={onInternalClick}
            onDoubleClick={onDoubleClick}
            onFocus={onInternalFocus}
            onBlur={onInternalBlur}
            {...dragProps}
            {...dragProvided.dragHandleProps}
            id={String(tabKey)}
            role="tab"
          >
            {mode ? textFieldNode : buttonNode}
          </div>
        );
      }}
    </Draggable>
  );
};

export default memo(forwardRef(TabNode));
