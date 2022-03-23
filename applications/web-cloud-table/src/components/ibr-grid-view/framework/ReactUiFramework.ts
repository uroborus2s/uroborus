import GroupCellRenderer from '../cellRenderer/GroupCellRenderer';
import { VanillaFrameworkOverrides } from '@ag-grid-community/core';

export class ReactUiFramework extends VanillaFrameworkOverrides {
  private frameworkComponents: any = {
    agGroupCellRenderer: GroupCellRenderer,
    agGroupRowRenderer: GroupCellRenderer,
    agDetailCellRenderer: GroupCellRenderer,
  };

  public frameworkComponent(name: string): any {
    return this.frameworkComponents[name];
  }
}
