import { FC, PropsWithChildren, useCallback } from 'react';
import { GridContext, ReadItem, RecoilSync } from '@uroborus/grid-core';
import { GridPremiumOptions } from '../props/gridProps';

const getCallbackForState = (propertyKey: string) => {
  if (!propertyKey || propertyKey.length < 2) {
    return propertyKey;
  }

  return `mapping${propertyKey[0].toUpperCase()}${propertyKey.slice(1)}`;
};

const GridRecoilSync: FC<
  PropsWithChildren<{
    gridContext: GridContext;
  }>
> = ({ gridContext, children }) => {
  const readItem: ReadItem = useCallback(
    (itemKey) => {
      return gridContext.getProperty(itemKey);
    },
    [gridContext],
  );

  return <RecoilSync read={readItem}>{children}</RecoilSync>;
};

export default GridRecoilSync;
