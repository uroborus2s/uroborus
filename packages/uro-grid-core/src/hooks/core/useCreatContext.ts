import { MutableRefObject, useImperativeHandle, useMemo, useRef } from 'react';
import { atom, useRecoilTransaction_UNSTABLE } from 'recoil';
import { GridContext, GridProps, GridApi, GridColumnApi } from '@/entity';

export const gridContext = atom<GridContext | null>({
  key: '@uroborus/grid-context',
  default: null,
});

export interface CreatContextParams {
  gridRootRef: MutableRefObject<HTMLElement | undefined>;
  props: GridProps;
}

export default <Api extends GridApi, ColumnApi extends GridColumnApi>(
  options: CreatContextParams,
) => {
  const {
    gridRootRef,
    props: { gridOptions = {}, gridApiRef, columnApiRef, classes = {} },
  } = options;
  const localApiRef = useRef<Api>();
  const localColumnApiRef = useRef<ColumnApi>();

  const firstRenderRef = useRef(false);
  const firstRender = firstRenderRef.current;

  useImperativeHandle(gridApiRef, () => localApiRef.current!, []);
  useImperativeHandle(columnApiRef, () => localColumnApiRef.current!, []);

  const gridContextObject = useMemo(() => {
    return new GridContext({
      gridOptions,
      gridApiRef: localApiRef,
      gridRootRef,
      columnApiRef: localColumnApiRef,
      classes,
    });
  }, []);

  const creatGridContext = useRecoilTransaction_UNSTABLE(
    ({ set }) =>
      () => {
        firstRenderRef.current = true;
        set(gridContext, gridContextObject);
      },
    [gridContextObject],
  );

  return {
    firstRender,
    creatGridContext,
    gridContext: gridContextObject,
  };
};
