import {
  copyAttributesToGridOptions,
  gridComponentName,
  useThemeProps,
} from '@uroborus/grid-core';
import { GridPremiumOptions, GridProps } from '../props/gridProps';

const copyAttributesToGridPremiumOptions = (
  gridOptions: GridPremiumOptions | undefined,
  gridProps: GridProps,
) => {
  return copyAttributesToGridOptions(gridOptions, gridProps);
};

const useDataGridPremiumProps = (props: GridProps) => {
  const themedProps = useThemeProps({
    props,
    name: gridComponentName,
  }) as GridProps;
  let options: GridPremiumOptions = props.gridOptions || {};
  options = copyAttributesToGridPremiumOptions(options, themedProps);
  themedProps.gridOptions = options;

  return themedProps;
};

export default useDataGridPremiumProps;
