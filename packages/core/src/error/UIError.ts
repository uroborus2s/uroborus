import formatUIErrorMessage from '@uroborus/core/src/error/formatUIErrorMessage';

const codes: Record<string, string> = {
  '1': 'Uroborus-UI: Expected valid input target. Did you use a custom `inputComponent` and forget to forward refs? See https://mui.com/r/input-component-ref-interface for more info.',
  '2': 'Uroborus-UI: The `value` prop must be an array when using the `Select` component with `multiple`.',
  '3': 'Uroborus-UI: Unsupported `%s` color.\nWe support the following formats: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla().',
  '4': 'Uroborus-UI: The color provided to augmentColor(color) is invalid.\nThe color object needs to have a `main` property or a `%s` property.',
  '5': 'Uroborus-UI: The color provided to augmentColor(color) is invalid.\n`color.main` should be a string, but `%s` was provided instead.\n\nDid you intend to use one of the following approaches?\n\nimport { green } from "@mui/material/colors";\n\nconst theme1 = createTheme({ palette: {\n  primary: green,\n} });\n\nconst theme2 = createTheme({ palette: {\n  primary: { main: green[500] },\n} });',
  '6': 'Uroborus-UI: Unsupported non-unitless line height with grid alignment.\nUse unitless line heights instead.',
  '7': 'Uroborus-UI: `capitalize(string)` expects a string argument.',
  '8': 'Uroborus-UI: Unsupported `%s` color.\nWe support the following formats: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().',
  '9': 'Uroborus-UI: Unsupported `%s` color.\nThe following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().',
  '10': 'Uroborus-UI: unsupported `%s` color space.\nThe following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.',
  '11': 'Uroborus-UI: The color%s provided to augmentColor(color) is invalid.\nThe color object needs to have a `main` property or a `%s` property.',
  '12': 'Uroborus-UI: The color%s provided to augmentColor(color) is invalid.\n`color.main` should be a string, but `%s` was provided instead.\n\nDid you intend to use one of the following approaches?\n\nimport { green } from "@mui/material/colors";\n\nconst theme1 = createTheme({ palette: {\n  primary: green,\n} });\n\nconst theme2 = createTheme({ palette: {\n  primary: { main: green[500] },\n} });',
  '13': 'Uroborus-UI not find utils in context. It looks like you forgot to wrap your component in LocalizationProvider, or pass dateAdapter prop directly.',
  '14': 'Uroborus-UI: makeStyles is no longer exported from @mui/material/styles.\nYou have to import it from @mui/styles.\nSee https://mui.com/r/migration-v4/#mui-material-styles for more details.',
  '15': 'Uroborus-UI: withStyles is no longer exported from @mui/material/styles.\nYou have to import it from @mui/styles.\nSee https://mui.com/r/migration-v4/#mui-material-styles for more details.',
  '16': 'Uroborus-UI: withTheme is no longer exported from @mui/material/styles.\nYou have to import it from @mui/styles.\nSee https://mui.com/r/migration-v4/#mui-material-styles for more details.',
  '17': 'Uroborus-UI: Expected valid input target. Did you use a custom `components.Input` and forget to forward refs? See https://mui.com/r/input-component-ref-interface for more info.',
  '19': 'Uroborus-UI: `useColorScheme` must be called under <CssVarsProvider />',
};

class UIError extends Error {
  constructor(message?: string) {
    if (typeof message === 'string') {
      const errorCode = codes[message];
      if (errorCode)
        message =
          process.env.NODE_ENV !== 'production'
            ? errorCode
            : formatUIErrorMessage(message);
    }
    super(message);
  }
}

export default UIError;
