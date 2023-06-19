import { GridOptions } from '@/entity/props/gridOptions';
import {
  ColDefUtil,
  FRAMEWORK_PROPERTIES,
  OptionsKeys,
} from '@/entity/props/propsKsy';
import {
  EventService,
  EventType,
  exists,
  fuzzyCheckStrings,
  getScrollbarWidth,
  isTrue,
  iterateObject,
  values,
} from '@uroborus/core';
import { EVENTS } from '@/entity/eventKey';
import { SideBarDefParser } from '@/entity/sideBar';
import { Constants } from '@/constants';
import { GetLocaleTextParams } from '@/entity/types/callBackParams';
import { GridApi, GridColumnApi } from '@/entity/types';
import { MutableRefObject } from 'react';
import { GridClasses } from '@/styles';

export const getCallbackForEvent = (eventName: string): string => {
  if (!eventName || eventName.length < 2) {
    return eventName;
  }

  return `on${eventName[0].toUpperCase()}${eventName.slice(1)}`;
};

const checkProperties = (
  userProperties: string[],
  validPropertiesAndExceptions: string[],
  validProperties: string[],
  containerName: string,
) => {
  const invalidProperties: { [p: string]: string[] } = fuzzyCheckStrings(
    userProperties,
    validPropertiesAndExceptions,
    validProperties,
  );

  iterateObject<any>(invalidProperties, (key, value) => {
    console.warn(
      `x-grid: 无效的 ${containerName} property '${key}' did you mean any of these: ${value
        .slice(0, 8)
        .join(', ')}`,
    );
  });

  if (Object.keys(invalidProperties).length > 0) {
    console.warn(
      `x-grid: to see all the valid ${containerName} properties please check`,
    );
  }
};

const checkGridOptionsProperties = (gridOptions: GridOptions) => {
  const userProperties: string[] = Object.getOwnPropertyNames(gridOptions);
  const validProperties: string[] = [
    ...OptionsKeys.ALL,
    ...FRAMEWORK_PROPERTIES,
    ...values<string>(EVENTS).map((event) => getCallbackForEvent(event)),
  ];

  const validPropertiesAndExceptions: string[] = [
    ...validProperties,
    'api',
    'columnApi',
  ];

  checkProperties(
    userProperties,
    validPropertiesAndExceptions,
    validProperties,
    'gridOptions',
  );
};

const checkColumnDefProperties = (gridOptions: GridOptions) => {
  if (gridOptions.columnDefs == null) {
    return;
  }

  gridOptions.columnDefs.forEach((colDef) => {
    const userProperties: string[] = Object.getOwnPropertyNames(colDef);
    const validProperties: string[] = [
      ...ColDefUtil.ALL,
      ...FRAMEWORK_PROPERTIES,
    ];

    checkProperties(userProperties, validProperties, validProperties, 'colDef');
  });
};

const checkGridOptions = <Options extends GridOptions>(
  gridOptions: Options,
) => {
  if (gridOptions.suppressPropertyNamesCheck !== true) {
    checkGridOptionsProperties(gridOptions);
    checkColumnDefProperties(gridOptions);
  }
  // parse side bar options into correct format
  if (gridOptions.sideBar != null) {
    gridOptions.sideBar = SideBarDefParser.parse(gridOptions.sideBar);
  }
};

export class GridContext<
  Options extends GridOptions = GridOptions,
  P extends EventType = EventType,
  Api extends GridApi = GridApi,
  ColumnApi extends GridColumnApi = GridColumnApi,
> {
  private gridRootRef: MutableRefObject<HTMLElement | undefined>;

  private readonly gridOptions: Options;

  private readonly gridApiRef: MutableRefObject<Api | undefined>;

  private readonly columnApiRef: MutableRefObject<ColumnApi | undefined>;

  eventService: EventService<P>;

  classes: Partial<GridClasses>;

  constructor({
    gridOptions,
    gridApiRef,
    gridRootRef,
    columnApiRef,
    classes,
  }: {
    gridOptions: Options;
    gridRootRef: MutableRefObject<HTMLElement | undefined>;
    gridApiRef: MutableRefObject<Api | undefined>;
    columnApiRef: MutableRefObject<ColumnApi | undefined>;
    classes: Partial<GridClasses>;
  }) {
    checkGridOptions(gridOptions);
    this.gridOptions = gridOptions;
    this.gridRootRef = gridRootRef;
    this.eventService = new EventService<P>();
    this.gridApiRef = gridApiRef;
    this.columnApiRef = columnApiRef;
    this.classes = classes;
    this.postCheckOptions();
  }

  private postCheckOptions() {
    if (
      this.getProperty('groupSelectsChildren') &&
      this.getProperty('suppressParentsInRowNodes')
    ) {
      console.warn(
        "x-grid: 'groupSelectsChildren' does not work with 'suppressParentsInRowNodes', this selection method needs the part in rowNode to work",
      );
    }

    if (this.getProperty('groupSelectsChildren')) {
      if (!this.rowSelection()) {
        console.warn(
          "x-grid: rowSelection must be 'multiple' for groupSelectsChildren to make sense",
        );
      }
      if (this.isRowModelServerSide()) {
        console.warn(
          'x-grid: group selects children is NOT support for Server Side Row Model. ' +
            'This is because the rows are lazy loaded, so selecting a group is not possible as' +
            'the grid has no way of knowing what the children are.',
        );
      }
    }

    if (
      this.getProperty('groupSelectsChildren') &&
      this.getProperty('groupHideOpenParents')
    ) {
      console.warn(
        "x-grid: groupRemoveSingleChildren and groupHideOpenParents do not work with each other, you need to pick one. And don't ask us how to use these together on our support forum either, you will get the same answer!",
      );
    }

    if (this.isRowModelServerSide()) {
      const msg = (prop: string) =>
        `x-grid: '${prop}' is not supported on the Server-Side Row Model`;
      if (exists(this.gridOptions.groupDefaultExpanded)) {
        console.warn(msg('groupDefaultExpanded'));
      }
      if (exists(this.gridOptions.groupDefaultExpanded)) {
        console.warn(msg('groupIncludeFooter'));
      }
      if (exists(this.gridOptions.groupDefaultExpanded)) {
        console.warn(msg('groupIncludeTotalFooter'));
      }
    }

    if (this.getProperty('enableRangeSelection')) {
    }

    if (
      !this.getProperty('enableRangeSelection') &&
      (this.getProperty('enableRangeHandle') ||
        this.getProperty('enableFillHandle'))
    ) {
      console.warn(
        "x-grid: 'enableRangeHandle' and 'enableFillHandle' will not work unless 'enableRangeSelection' is set to true",
      );
    }

    if (
      this.getProperty('groupRowsSticky') &&
      this.getProperty('groupHideOpenParents')
    ) {
      console.warn(
        'x-grid: groupRowsSticky and groupHideOpenParents do not work with each other, you need to pick one.',
      );
    }
  }

  public getProperty<K extends keyof GridOptions>(key: K): GridOptions[K] {
    const value = this.gridOptions[key];
    if (OptionsKeys.BOOLEAN.some((bKey) => key === bKey)) {
      return isTrue(value);
    }
    return value;
  }

  public rowSelection() {
    return this.gridOptions.rowSelection === 'multiple';
  }

  public isRowModelServerSide() {
    return (
      this.gridOptions.rowModelType === Constants.ROW_MODEL_TYPE_SERVER_SIDE
    );
  }

  public scrollbarWidth(context: GridContext): number {
    const useGridOptions =
      typeof this.gridOptions.scrollbarWidth === 'number' &&
      this.gridOptions.scrollbarWidth >= 0;
    if (!useGridOptions) {
      this.gridOptions.scrollbarWidth = getScrollbarWidth();
      context.eventService.emit({
        type: EVENTS.EVENT_SCROLLBAR_WIDTH_CHANGED,
      });
    }
    return this.gridOptions.scrollbarWidth as number;
  }

  public getDocument(): Document {
    // if user is providing document, we use the users one,
    // otherwise we use the document on the global namespace.
    let result: Document | null = null;
    if (this.gridOptions.getDocument && exists(this.gridOptions.getDocument)) {
      result = this.gridOptions.getDocument();
    } else if (this.gridRootRef.current) {
      result = this.gridRootRef.current.ownerDocument;
    }

    if (result && exists(result)) {
      return result;
    }

    return document;
  }

  public getLocaleTextFunc(): (
    key: string,
    defaultValue: string,
    variableValues?: string[],
  ) => string {
    const { localeText, getLocaleText } = this.gridOptions;
    if (getLocaleText) {
      return (key: string, defaultValue: string, variableValues?: string[]) => {
        const params: GetLocaleTextParams = {
          key,
          defaultValue,
          variableValues,
          api: this.gridApiRef.current!,
          columnApi: this.columnApiRef.current!,
        };
        return getLocaleText(params);
      };
    }

    return (key: string, defaultValue: string, variableValues?: string[]) => {
      let localisedText = localeText && localeText[key];

      if (typeof localisedText === 'string') {
        const replaceText = (template: string, index: number): string => {
          // eslint-disable-next-line no-template-curly-in-string
          if (template.indexOf('${variable}') === -1) {
            return template;
          }
          if (Array.isArray(variableValues) && variableValues[index]) {
            // eslint-disable-next-line no-template-curly-in-string
            const temp = template.replace('${variable}', variableValues[index]);
            return replaceText(temp, index + 1);
          }
          return '';
        };

        localisedText = replaceText(localisedText, 0);
      }

      return localisedText ?? defaultValue;
    };
  }
}
