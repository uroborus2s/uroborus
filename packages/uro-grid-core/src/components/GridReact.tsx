import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';

import { RecoilRoot } from 'recoil';
import { RecoilSync } from 'recoil-sync';
import type { ReadItem } from 'recoil-sync';
import { useThemeProps } from 'sense-ui/styles';

import { useCopyAttributesToGridOptions } from '../hooks/index.js';
import { gridComponentName } from '../hooks/useUtilityClasses.js';
import type { ColumnApi } from '../interface/columnApi.js';
import type { GridApi } from '../interface/gridApi.js';
import { GridOptionsService } from '../service/gridOptionsService.js';

import type { GridProps } from './gridProps.js';
import GridReactInternal from './GridReactInternal.js';

interface Api extends GridApi, ColumnApi {}

const GridReact = forwardRef<Api, GridProps>((inProps, ref) => {
  const props = useThemeProps({
    props: inProps,
    name: gridComponentName,
  });

  const { gridOptions, ...interProps } = useCopyAttributesToGridOptions(props);

  const apiRef = useRef<GridApi>({});
  const columnApiRef = useRef<ColumnApi>({});
  const rootElementRef = useRef<HTMLElement>();

  useImperativeHandle(
    ref,
    () => ({
      ...apiRef.current,
      ...columnApiRef.current,
    }),
    [],
  );

  const readItem: ReadItem = useCallback(
    (itemKey) => {
      if (itemKey === 'gridOptions') {
        return new GridOptionsService({
          gridOptions,
          api: apiRef,
          columnApi: columnApiRef,
          rootElementRef,
        });
      }
      return '';
    },
    [gridOptions],
  );
  return (
    <RecoilRoot>
      <RecoilSync read={readItem}>
        <GridReactInternal
          {...interProps}
          ref={rootElementRef as ForwardedRef<HTMLElement>}
        />
      </RecoilSync>
    </RecoilRoot>
  );
});

GridReact.displayName = 'Uro-GridReact';

export default GridReact;
