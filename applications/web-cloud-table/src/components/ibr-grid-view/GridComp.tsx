import { Context, GridCtrl } from '@ag-grid-community/core';
import { FC, memo, useEffect, useRef } from 'react';

interface GridCompProps {
  context: Context;
}

const GridComp: FC<GridCompProps> = ({ context }) => {
  const gridCtrlRef = useRef<GridCtrl>();
  //创建controller bean
  useEffect(() => {
    const currentController = (gridCtrlRef.current = context.createBean(
      new GridCtrl(),
    ));
    return () => {
      context.destroyBean(currentController);
      gridCtrlRef.current = undefined;
    };
  }, []);

  return <></>;
};

export default memo(GridComp);
