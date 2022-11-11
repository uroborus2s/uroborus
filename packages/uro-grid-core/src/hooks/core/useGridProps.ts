import { toBoolean, toNumber, values } from '@uroborus/core';
import { GridOptions } from '@/entity/props/gridOptions';
import { GridProps } from '@/entity/props/gridProps';
import { EVENTS } from '@/entity/eventKey';
import { gridComponentName } from '@/styles';
import { ReactComponent } from '@/types';
import { useThemeProps } from '@mui/system';
import { OptionsKeys } from '@/entity/props/propsKsy';
import { getCallbackForEvent } from '@/entity/gridContext';

export const stackComponents: Record<string, ReactComponent> = {};

export const userComponents: Record<string, ReactComponent> = {};

export function copyAttributesToGridOptions(
  gridOptions: GridOptions | undefined,
  gridProps: GridProps,
) {
  let options: GridOptions;
  const props: GridOptions = gridProps || {};
  if (typeof gridOptions !== 'object') {
    options = {} as GridOptions;
  } else {
    options = gridOptions;
  }

  const keyExists = (key: string) =>
    typeof props[key as keyof GridOptions] !== 'undefined';

  // if groupAggFiltering exists and isn't a function, handle as a boolean.
  if (
    keyExists('groupAggFiltering') &&
    typeof props.groupAggFiltering !== 'function'
  ) {
    options.groupAggFiltering = toBoolean(props.groupAggFiltering);
    delete props.groupAggFiltering;
  }

  // add in all the simple properties
  [
    ...OptionsKeys.ARRAY,
    ...OptionsKeys.STRING,
    ...OptionsKeys.OBJECT,
    ...OptionsKeys.FUNCTION,
    ...values(EVENTS).map((value) => getCallbackForEvent(value)),
  ]
    .filter(keyExists)
    .forEach((key: string) => {
      options[key as keyof GridOptions] = props[key as keyof GridOptions];
      delete props[key as keyof GridOptions];
    });

  OptionsKeys.BOOLEAN.filter(keyExists).forEach((key) => {
    options[key as keyof GridOptions] = toBoolean(
      props[key as keyof GridOptions],
    );
    delete props[key as keyof GridOptions];
  });

  OptionsKeys.NUMBER.filter(keyExists).forEach((key) => {
    options[key as keyof GridOptions] = toNumber(
      props[key as keyof GridOptions],
    );
    delete props[key as keyof GridOptions];
  });

  return options;
}

export default (props: GridProps) => {
  const themedProps = useThemeProps({
    props,
    name: gridComponentName,
  }) as GridProps;
  let options: GridOptions = themedProps.gridOptions || {};
  options = copyAttributesToGridOptions(options, themedProps);
};
