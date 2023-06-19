import { GridOptionsService } from '../service/gridOptionsService.js';

type GetLocaleTextFun = (
  key: string,
  defaultValue: string,
  variableValues?: string[],
) => string;

export default (gridConfiguration: GridOptionsService): GetLocaleTextFun => {
  const getLocaleText = gridConfiguration.get('getLocaleText');

  if (getLocaleText) {
    // key: string, defaultValue: string, variableValues?: string[]
    return (key: string, defaultValue: string, variableValues?: string[]) => {
      return getLocaleText({
        key,
        defaultValue,
        variableValues,
        api: gridConfiguration.api.current,
        columnApi: gridConfiguration.columnApi.current,
      });
    };
  }

  const localeText = gridConfiguration.get('localeText');

  return (key, defaultValue, variableValues) => {
    let localisedText = localeText && localeText[key];
    if (localisedText && variableValues && variableValues.length) {
      let found = 0;
      while (found < variableValues.length && /\$\{variable\}/.test) {
        localisedText = localisedText.replace(
          /\$\{variable\}/i,
          variableValues[found],
        );
        found += 1;
      }
    }
    return localisedText ?? defaultValue;
  };
};
