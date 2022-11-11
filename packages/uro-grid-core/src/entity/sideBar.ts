import { FC } from 'react';

export interface ToolPanelDef {
  /** 此面板的唯一ID。在API中和其他地方用来引用面板。 */
  id: string;
  /** 用于本地化以显示标签的键。标签显示在选项卡按钮中。 */
  labelKey: string;
  /** 如果`LabelKey`缺失或未通过本地化映射到有效文本，则为默认标签。 */
  labelDefault: string;
  /** 工具面板的最小宽度。默认：`100` */
  minWidth?: number;
  /** 工具面板的最大宽度。缺省值：`undefined` */
  maxWidth?: number;
  /** 工具面板的初始宽度。 缺省值: `$side-bar-panel-width (theme variable)` */
  width?: number;
  /** 要用作侧栏中标签旁边的图形帮助的图标键。 */
  iconKey: string;

  /**
   * 用于自定义面板的工具面板组件。
   * 提供的面板使用组件`agColumnsToolPanel`和`agFiltersToolPanel`。
   * 要提供您自己的定制面板组件，请在此处引用它。
   */
  toolPanel?: FC;
  /** 自定义`ToolPanel`组件的参数。 */
  toolPanelParams?: any;
}

export interface SideBarDef {
  /**
   * 要放置在侧栏中的所有面板的列表。面板将按提供的顺序从上到下显示。
   */
  toolPanels?: (ToolPanelDef | string)[];
  /** 默认打开的面板(由ID标识)。如果未指定，则侧栏最初显示为关闭。 */
  defaultToolPanel?: string;
  /** 要默认隐藏侧边栏，请将其设置为`true`。如果未定义，则会显示侧栏。 */
  hiddenByDefault?: boolean;
  /** 设置相对于栅格的侧栏位置。 */
  position?: 'left' | 'right';
}

export class SideBarDefParser {
  static readonly DEFAULT_COLUMN_COMP: ToolPanelDef = {
    id: 'columns',
    labelDefault: 'Columns',
    labelKey: 'columns',
    iconKey: 'columns',
  };

  static readonly DEFAULT_FILTER_COMP: ToolPanelDef = {
    id: 'filters',
    labelDefault: 'Filters',
    labelKey: 'filters',
    iconKey: 'filter',
  };

  static readonly DEFAULT_BY_KEY: { [p: string]: ToolPanelDef } = {
    columns: SideBarDefParser.DEFAULT_COLUMN_COMP,
    filters: SideBarDefParser.DEFAULT_FILTER_COMP,
  };

  static parse(
    toParse: SideBarDef | string | string[] | boolean,
  ): SideBarDef | null {
    if (!toParse) {
      return null;
    }
    if (toParse === true) {
      return {
        toolPanels: [
          SideBarDefParser.DEFAULT_COLUMN_COMP,
          SideBarDefParser.DEFAULT_FILTER_COMP,
        ],
        defaultToolPanel: 'columns',
      };
    }

    if (typeof toParse === 'string') {
      return SideBarDefParser.parse([toParse]);
    }

    if (Array.isArray(toParse)) {
      const comps: ToolPanelDef[] = [];
      toParse.forEach((key) => {
        const lookupResult = SideBarDefParser.DEFAULT_BY_KEY[key];
        if (!lookupResult) {
          console.warn(
            `x-grid: the key ${key} is not a valid key for specifying a tool panel, valid keys are: ${Object.keys(
              SideBarDefParser.DEFAULT_BY_KEY,
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
      toolPanels: SideBarDefParser.parseComponents(toParse.toolPanels),
      defaultToolPanel: toParse.defaultToolPanel,
      hiddenByDefault: toParse.hiddenByDefault,
      position: toParse.position,
    };

    return result;
  }

  static parseComponents(from?: (ToolPanelDef | string)[]): ToolPanelDef[] {
    const result: ToolPanelDef[] = [];

    if (!from) {
      return result;
    }

    from.forEach((it: ToolPanelDef | string) => {
      let toAdd: ToolPanelDef | null = null;
      if (typeof it === 'string') {
        const lookupResult = SideBarDefParser.DEFAULT_BY_KEY[it];
        if (!lookupResult) {
          console.warn(
            `AG Grid: the key ${it} is not a valid key for specifying a tool panel, valid keys are: ${Object.keys(
              SideBarDefParser.DEFAULT_BY_KEY,
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
  }
}
