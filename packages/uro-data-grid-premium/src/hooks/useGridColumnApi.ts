import { EventType } from '@uroborus/core';
import { GridOptionsWrapper } from '../grid';
import { GridColumnApiPremium } from '../gridApiPremium';

export default <P extends EventType>(
  gridWrapOptions: GridOptionsWrapper<P>,
): GridColumnApiPremium => {};
