import { EventType } from '@uroborus/core';
import { ColDef, ColGroupDef } from '@uroborus/grid-core';
import { GridOptionsWrapper } from '../grid';
import { GridApiPremium } from '../gridApiPremium';

export default <P extends EventType>(
  gridWrapOptions: GridOptionsWrapper<P>,
): GridApiPremium => {
  const setColumnDefs = (colDefs: (ColDef | ColGroupDef)[]) => {};

  const expandAll = () => {};

  const collapseAll = () => {};

  return { setColumnDefs, expandAll, collapseAll };
};
