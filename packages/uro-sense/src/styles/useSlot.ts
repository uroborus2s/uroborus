import type {
  CSSProperties,
  ElementType as ReactElementType,
  EventHandler,
  ForwardedRef,
  Ref,
} from 'react';

import {
  appendOwnerState,
  mergeSlotProps,
  resolveComponentProps,
} from '@mui/base';
import { useForkRef } from '@uroborus/core';
import classNames from 'classnames';

export type WithCommonProps<T> = T & {
  className?: string;
  style?: CSSProperties;
  ref?: Ref<any>;
};

type EventHandlers = Record<string, EventHandler<any>>;

type ExtractComponentProps<P> = P extends
  | infer T
  | ((ownerState: any) => infer T)
  ? T
  : never;

/**
 * 创建Uro UI组件的私有化函数
 *
 * @param {string} name: name of the slot
 * @param {object} parameters
 * @returns {[slotProps]} The slot's React component and the slot's props
 *
 * Note: the returned slot's props
 * - 不会包含prop `component`。
 * - 可能包含 `as` 属性。
 */
export default function useSlot<
  T extends string,
  ElementType extends ReactElementType,
  SlotProps,
  OwnerState extends {},
  ExternalSlotProps extends { component?: ReactElementType },
  ExternalForwardedProps extends {
    component?: ReactElementType;
    slots?: { [k in T]?: ReactElementType };
    slotProps?: {
      [k in T]?:
        | WithCommonProps<ExternalSlotProps>
        | ((ownerState: OwnerState) => WithCommonProps<ExternalSlotProps>);
    };
  },
  AdditionalProps,
  SlotOwnerState extends {},
>(
  /**
   * 插槽的名称。 所有的Uro UI组件必须有`root` 组件.
   *
   * 如果插槽名称是 `root`，则行为与其他插槽不同，
   * 例如 `externalForwardedProps` 仅被应用到 `root` 插槽，而不会到其他插槽。
   */
  name: T,
  parameters: (T extends 'root' ? { ref: ForwardedRef<any> } : {}) & {
    /**
     * 插槽的 className
     */
    className: classNames.Argument | classNames.ArgumentArray;
    /**
     * 插槽的默认样式组件
     */
    elementType: ElementType;
    /**
     * 组件的 ownerState 参数
     */
    ownerState: OwnerState;
    /**
     * 消费者组件的`other` props 属性。 包含“component”、“slots”和“slotProps”。
     * 该函数将使用这些道具来计算最终渲染的元素和返回的道具。
     *
     * 如果插槽不是“root”，则忽略其余的“externalForwardedProps”。
     */
    externalForwardedProps: ExternalForwardedProps;
    getSlotProps?: (other: EventHandlers) => WithCommonProps<SlotProps>;
    additionalProps?: WithCommonProps<AdditionalProps>;

    // Uro UI specifics
    /**
     * 用于覆盖插槽的组件 ownerState。
     * 这对于需要通过 `ownerState` 进行样式设置的某些组件是必需的。
     *
     * 它是一个函数，因为 `slotProps.{slot}` 可以是一个必须首先解析的函数。
     */
    getSlotOwnerState?: (
      mergedProps: SlotProps &
        ExternalSlotProps &
        ExtractComponentProps<
          Exclude<
            Exclude<ExternalForwardedProps['slotProps'], undefined>[T],
            undefined
          >
        >,
    ) => SlotOwnerState;
    /**
     * 仅当未提供 `slotProps..component` 时，道具才会转发到 `T`。
     * 例如
     */
    internalForwardedProps?: any;
  },
) {
  const {
    className,
    elementType: initialElementType,
    ownerState,
    externalForwardedProps,
    getSlotOwnerState,
    internalForwardedProps,
    ...useSlotPropsParams
  } = parameters;
  const {
    component: rootComponent,
    slots = { [name]: undefined },
    slotProps = { [name]: undefined },
    ...other
  } = externalForwardedProps;

  const elementType = slots[name] || initialElementType;

  // `slotProps[name]` can be a callback that receives the component's ownerState.
  // `resolvedComponentsProps` is always a plain object.
  const resolvedComponentsProps = resolveComponentProps(
    slotProps[name],
    ownerState,
  );

  const {
    props: { component: slotComponent, ...mergedProps },
    internalRef,
  } = mergeSlotProps({
    className,
    ...useSlotPropsParams,
    externalForwardedProps: name === 'root' ? other : undefined,
    externalSlotProps: resolvedComponentsProps,
  });

  const ref = useForkRef(
    internalRef,
    useForkRef(
      resolvedComponentsProps?.ref,
      name === 'root' ? (parameters as any).ref : undefined,
    ),
  ) as ((instance: any | null) => void) | null;

  const finalOwnerState = getSlotOwnerState
    ? { ...ownerState, ...getSlotOwnerState(mergedProps as any) }
    : ownerState;

  const LeafComponent = (
    name === 'root' ? slotComponent || rootComponent : slotComponent
  ) as ElementType | undefined;

  const props = appendOwnerState(
    elementType,
    {
      ...(name === 'root' &&
        !rootComponent &&
        !slots[name] &&
        internalForwardedProps),
      ...(name !== 'root' && !slots[name] && internalForwardedProps),
      ...(mergedProps as { className: string } & SlotProps &
        ExternalSlotProps &
        AdditionalProps &
        (T extends 'root' ? ExternalForwardedProps : {})),
      ...(LeafComponent && {
        as: LeafComponent,
      }),
      ref,
    },
    finalOwnerState as OwnerState & SlotOwnerState,
  );

  return [elementType, props] as [ElementType, typeof props];
}
