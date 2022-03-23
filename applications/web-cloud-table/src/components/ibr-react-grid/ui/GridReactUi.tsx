import { GridClasses } from './context';
import useGridStyles from './styel/useGridStyles';
import {
  forwardRef,
  ForwardRefRenderFunction,
  LegacyRef,
  memo, useImperativeHandle,
  useRef,
} from 'react';

const GridReactUi: ForwardRefRenderFunction<GridApi> = (props, ref) => {
  const classes = useGridStyles();

  const iGui = useRef<HTMLDivElement>();

  useImperativeHandle(ref, () => ({}), []);

  return (
    <div
      ref={iGui as LegacyRef<HTMLDivElement>}
      className={classes.rootWrapper}
    >
      <GridClasses.Provider value={classes}></GridClasses.Provider>
    </div>
  );
};

export default memo(forwardRef(GridReactUi));
