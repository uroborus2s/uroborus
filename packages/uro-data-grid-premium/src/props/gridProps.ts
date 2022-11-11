import { GridOptions, GridProps as BaseGridProps } from '@uroborus/grid-core';
import { DistributiveOmit } from '../../../uro-sense';
import { Ref } from 'react';
import { GridApiPremium, GridColumnApiPremium } from '../gridApiPremium';

export interface GridPremiumOptions
  extends DistributiveOmit<GridOptions, 'gridApiRef' | 'columnApiRef'> {
  gridApiRef?: Ref<GridApiPremium>;
  columnApiRef?: Ref<GridColumnApiPremium>;
}

export type GridProps = BaseGridProps<GridPremiumOptions>;
