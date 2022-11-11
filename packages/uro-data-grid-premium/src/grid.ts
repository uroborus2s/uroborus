import {
  GridContext as GridOptionsWrapperBase,
  ReactComponent,
} from '@uroborus/grid-core';
import { GridPremiumOptions } from './props/gridProps';
import GridHeaderDropZones from './components/GridHeaderDropZones';
import RowGroupDropZonePanel from './components/RowGroupDropZonePanel';

export class GridOptionsWrapper extends GridOptionsWrapperBase<GridPremiumOptions> {}

export const stackComponents: Record<string, ReactComponent> = {
  gridHeaderDropZones: GridHeaderDropZones,
  rowGroupDropZonePanel: RowGroupDropZonePanel,
};

export const userComponents: Record<string, ReactComponent> = {};
