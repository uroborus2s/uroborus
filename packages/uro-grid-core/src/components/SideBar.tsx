import { SideBarDef, ToolPanelDef } from '../entity/props/sideBarProps';
import ColumnsToolPanel from './ColumnsToolPanel';
import FiltersToolPanel from './FiltersToolPanel';

const DEFAULT_COLUMN_COMP: ToolPanelDef = {
  id: 'columns',
  labelDefault: 'Columns',
  labelKey: 'columns',
  iconKey: 'columns',
  toolPanel: ColumnsToolPanel,
};

const DEFAULT_FILTER_COMP: ToolPanelDef = {
  id: 'filters',
  labelDefault: 'Filters',
  labelKey: 'filters',
  iconKey: 'filter',
  toolPanel: FiltersToolPanel,
};

const DEFAULT_BY_KEY: { [p: string]: ToolPanelDef } = {
  columns: DEFAULT_COLUMN_COMP,
  filters: DEFAULT_FILTER_COMP,
};

const parseComponents = (from?: (ToolPanelDef | string)[]): ToolPanelDef[] => {
  const result: ToolPanelDef[] = [];

  if (!from) {
    return result;
  }

  from.forEach((it: ToolPanelDef | string) => {
    let toAdd: ToolPanelDef | null = null;
    if (typeof it === 'string') {
      const lookupResult = DEFAULT_BY_KEY[it];
      if (!lookupResult) {
        console.warn(
          `x-grid: the key ${it} is not a valid key for specifying a tool panel, valid keys are: ${Object.keys(
            DEFAULT_BY_KEY,
          ).join(',')}`,
        );
        return;
      }

      toAdd = lookupResult;
    } else {
      toAdd = it;
    }

    result.push(toAdd);
  });

  return result;
};

export const sideBarDefParser = (
  toParse: SideBarDef | string | string[] | boolean,
): SideBarDef | null => {
  if (!toParse) {
    return null;
  }
  if (toParse === true) {
    return {
      toolPanels: [DEFAULT_COLUMN_COMP, DEFAULT_FILTER_COMP],
      defaultToolPanel: 'columns',
    };
  }

  if (typeof toParse === 'string') {
    return sideBarDefParser([toParse]);
  }

  if (Array.isArray(toParse)) {
    const comps: ToolPanelDef[] = [];
    toParse.forEach((key) => {
      const lookupResult = DEFAULT_BY_KEY[key];
      if (!lookupResult) {
        console.warn(
          `x-grid: the key ${key} is not a valid key for specifying a tool panel, valid keys are: ${Object.keys(
            DEFAULT_BY_KEY,
          ).join(',')}`,
        );
        return;
      }

      comps.push(lookupResult);
    });

    if (comps.length === 0) {
      return null;
    }

    return {
      toolPanels: comps,
      defaultToolPanel: comps[0].id,
    };
  }

  const result: SideBarDef = {
    toolPanels: parseComponents(toParse.toolPanels),
    defaultToolPanel: toParse.defaultToolPanel,
    hiddenByDefault: toParse.hiddenByDefault,
    position: toParse.position,
  };

  return result;
};
