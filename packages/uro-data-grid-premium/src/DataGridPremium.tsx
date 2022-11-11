import { forwardRef, ForwardRefRenderFunction, useRef } from 'react';
import { GridRoot, useCreatContext, useForkRef } from '@uroborus/grid-core';
import { RecoilRoot } from 'recoil';
import { GridProps } from './props/gridProps';
import GridRecoilSync from './components/GridRecoilSync';
import useDataGridPremiumProps from './hooks/useDataGridPremiumProps';

const DataGridPremium: ForwardRefRenderFunction<HTMLElement, GridProps> = (
  inProps,
  ref,
) => {
  const gridRootRef = useRef<HTMLElement>();

  const rootRef = useForkRef(ref, gridRootRef);

  const props = useDataGridPremiumProps(inProps);

  const { creatGridContext, gridContext, firstRender } = useCreatContext({
    gridRootRef,
    props,
  });

  return (
    <RecoilRoot initializeState={creatGridContext}>
      <GridRecoilSync gridContext={gridContext}>
        {firstRender && (
          <GridRoot
            className={props.className}
            style={props.style}
            sx={props.sx}
            ref={rootRef}
          />
        )}
      </GridRecoilSync>
    </RecoilRoot>
  );
};

export default forwardRef(DataGridPremium);
