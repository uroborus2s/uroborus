import { EventType, FrameworkOverrides } from '@uroborus/core';
import { FC, isValidElement } from 'react';
import GroupCell from '../components/GroupCell';
import DetailCell from '../components/DetailCell';

export class ReactFrameworkOverrides<
  P extends EventType,
> extends FrameworkOverrides<P> {
  private frameworkComponents: Record<string, FC> = {
    groupCellRenderer: GroupCell,
    groupRowRenderer: GroupCell,
    detailCellRenderer: DetailCell,
  };

  public frameworkComponent(name: string): any {
    return this.frameworkComponents[name];
  }

  // eslint-disable-next-line class-methods-use-this
  public isFrameworkComponent(comp: any): boolean {
    return typeof comp === 'object' && comp !== null && isValidElement(comp);
  }
}
