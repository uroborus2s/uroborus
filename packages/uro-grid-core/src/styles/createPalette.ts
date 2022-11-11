import {
  blue,
  purple,
  Color,
  red,
  common,
  ColorKey,
  green,
  lightBlue,
  orange,
} from '@uroborus/core';
import { deepmerge } from '@mui/utils';
import { darken, getContrastRatio, lighten } from '@mui/system';

export interface CommonColors {
  black: string;
  white: string;
}
export type PaletteMode = 'light' | 'dark';

export interface PaletteColor {
  light: string;
  main: string;
  dark: string;
  contrastText: string;
}

export interface SimplePaletteColorOptions {
  light?: string;
  main: string;
  dark?: string;
  contrastText?: string;
}

export interface TypeText {
  primary: string;
  secondary: string;
  disabled: string;
}

export type TypeDivider = string;

export type PaletteTonalOffset =
  | number
  | {
      light: number;
      dark: number;
    };

export interface TypeAction {
  active: string;
  hover: string;
  hoverOpacity: number;
  selected: string;
  selectedOpacity: number;
  disabled: string;
  disabledOpacity: number;
  disabledBackground: string;
  focus: string;
  focusOpacity: number;
  activatedOpacity: number;
}

export interface TypeBackground {
  default: string;
  paper: string;
}

export type ColorPartial = Partial<Color>;

export type PaletteColorOptions = SimplePaletteColorOptions & ColorPartial;

export interface PaletteAugmentColorOptions {
  color: PaletteColorOptions;
  mainShade?: ColorKey;
  lightShade?: ColorKey;
  darkShade?: ColorKey;
  name?: number | string;
}

export interface Palette {
  common: CommonColors;
  mode: PaletteMode;
  contrastThreshold: number;
  tonalOffset: PaletteTonalOffset;
  primary: PaletteColor;
  secondary: PaletteColor;
  error: PaletteColor;
  warning: PaletteColor;
  info: PaletteColor;
  success: PaletteColor;
  text: TypeText;
  divider: TypeDivider;
  action: TypeAction;
  background: TypeBackground;
  getContrastText: (background: string) => string;
  augmentColor: (options: PaletteAugmentColorOptions) => PaletteColor;
}

export interface PaletteOptions {
  common?: Partial<CommonColors>;
  mode?: PaletteMode;
  contrastThreshold?: number;
  tonalOffset?: PaletteTonalOffset;
  primary?: PaletteColorOptions;
  secondary?: PaletteColorOptions;
  error?: PaletteColorOptions;
  warning?: PaletteColorOptions;
  info?: PaletteColorOptions;
  success?: PaletteColorOptions;
  text?: Partial<TypeText>;
  divider?: string;
  action?: Partial<TypeAction>;
  background?: Partial<TypeBackground>;
  getContrastText?: (background: string) => string;
}

function getDefaultPrimary(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: blue[200],
      light: blue[50],
      dark: blue[400],
    };
  }
  return {
    main: blue[700],
    light: blue[400],
    dark: blue[800],
  };
}

function getDefaultSecondary(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: purple[200],
      light: purple[50],
      dark: purple[400],
    };
  }
  return {
    main: purple[500],
    light: purple[300],
    dark: purple[700],
  };
}

function getDefaultError(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: red[500],
      light: red[300],
      dark: red[700],
    };
  }
  return {
    main: red[700],
    light: red[400],
    dark: red[800],
  };
}

function getDefaultInfo(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: lightBlue[400],
      light: lightBlue[300],
      dark: lightBlue[700],
    };
  }
  return {
    main: lightBlue[700],
    light: lightBlue[500],
    dark: lightBlue[900],
  };
}

function getDefaultSuccess(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: green[400],
      light: green[300],
      dark: green[700],
    };
  }
  return {
    main: green[800],
    light: green[500],
    dark: green[900],
  };
}

function getDefaultWarning(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: orange[400],
      light: orange[300],
      dark: orange[700],
    };
  }
  return {
    main: '#ed6c02', // closest to orange[800] that pass 3:1.
    light: orange[500],
    dark: orange[900],
  };
}

function addLightOrDark(
  intent: PaletteColorOptions,
  direction: PaletteMode,
  shade: ColorKey,
  tonalOffset: PaletteTonalOffset,
) {
  const tonalOffsetLight =
    typeof tonalOffset === 'number' ? tonalOffset : tonalOffset.light;
  const tonalOffsetDark =
    typeof tonalOffset === 'number' ? tonalOffset * 1.5 : tonalOffset.dark;

  const newIntent = intent;
  if (!intent[direction]) {
    if (Object.prototype.hasOwnProperty.call(intent, shade)) {
      newIntent[direction] = intent[shade];
    } else if (direction === 'light') {
      newIntent.light = lighten(intent.main, tonalOffsetLight);
    } else if (direction === 'dark') {
      newIntent.dark = darken(intent.main, tonalOffsetDark);
    }
  }
}

export const light = {
  // The colors used to style the text.
  text: {
    // The most important text.
    primary: 'rgba(0, 0, 0, 0.87)',
    // Secondary text.
    secondary: 'rgba(0, 0, 0, 0.6)',
    // Disabled text have even lower visual prominence.
    disabled: 'rgba(0, 0, 0, 0.38)',
  },
  // The color used to divide different elements.
  divider: 'rgba(0, 0, 0, 0.12)',
  // The background colors used to style the surfaces.
  // Consistency between these values is important.
  background: {
    paper: common.white,
    default: common.white,
  },
  // The colors used to style the action elements.
  action: {
    // The color of an active action like an icon button.
    active: 'rgba(0, 0, 0, 0.54)',
    // The color of an hovered action.
    hover: 'rgba(0, 0, 0, 0.04)',
    hoverOpacity: 0.04,
    // The color of a selected action.
    selected: 'rgba(0, 0, 0, 0.08)',
    selectedOpacity: 0.08,
    // The color of a disabled action.
    disabled: 'rgba(0, 0, 0, 0.26)',
    // The background color of a disabled action.
    disabledBackground: 'rgba(0, 0, 0, 0.12)',
    disabledOpacity: 0.38,
    focus: 'rgba(0, 0, 0, 0.12)',
    focusOpacity: 0.12,
    activatedOpacity: 0.12,
  },
};

export const dark = {
  text: {
    primary: common.white,
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)',
    icon: 'rgba(255, 255, 255, 0.5)',
  },
  divider: 'rgba(255, 255, 255, 0.12)',
  background: {
    paper: '#121212',
    default: '#121212',
  },
  action: {
    active: common.white,
    hover: 'rgba(255, 255, 255, 0.08)',
    hoverOpacity: 0.08,
    selected: 'rgba(255, 255, 255, 0.16)',
    selectedOpacity: 0.16,
    disabled: 'rgba(255, 255, 255, 0.3)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
    disabledOpacity: 0.38,
    focus: 'rgba(255, 255, 255, 0.12)',
    focusOpacity: 0.12,
    activatedOpacity: 0.24,
  },
};

export default function createPalette(palette: PaletteOptions): Palette {
  const {
    mode = 'light',
    contrastThreshold = 3,
    tonalOffset = 0.2,
    ...other
  } = palette;

  const primary = palette.primary || getDefaultPrimary(mode);
  const secondary = palette.secondary || getDefaultSecondary(mode);
  const error = palette.error || getDefaultError(mode);
  const info = palette.info || getDefaultInfo(mode);
  const success = palette.success || getDefaultSuccess(mode);
  const warning = palette.warning || getDefaultWarning(mode);

  function getContrastText(background: string) {
    const contrastText =
      getContrastRatio(background, dark.text.primary) >= contrastThreshold
        ? dark.text.primary
        : light.text.primary;

    if (process.env.NODE_ENV !== 'production') {
      const contrast = getContrastRatio(background, contrastText);
      if (contrast < 3) {
        console.error(
          [
            `MUI: The contrast ratio of ${contrast}:1 for ${contrastText} on ${background}`,
            'falls below the WCAG recommended absolute minimum contrast ratio of 3:1.',
            'https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast',
          ].join('\n'),
        );
      }
    }

    return contrastText;
  }

  const augmentColor = ({
    color,
    name,
    mainShade = 500,
    lightShade = 300,
    darkShade = 700,
  }: PaletteAugmentColorOptions) => {
    const newColor = { ...color };
    if (!newColor.main && newColor[mainShade]) {
      newColor.main = newColor[mainShade]!;
    }

    if (!Object.prototype.hasOwnProperty.call(newColor, 'main')) {
      console.error(
        `Bui: augmentColor(color) 无效的颜色参数值${name}。'color.main:${mainShade}'值必须存在！`,
      );
    }

    if (typeof newColor.main !== 'string') {
      console.error(
        `Bui: augmentColor(color) 无效的颜色参数值${name}。'color.main:${JSON.stringify(
          color.main,
        )}'值必须是字符串！`,
      );
    }

    addLightOrDark(newColor, 'light', lightShade, tonalOffset);
    addLightOrDark(newColor, 'dark', darkShade, tonalOffset);
    if (!newColor.contrastText) {
      newColor.contrastText = getContrastText(newColor.main);
    }

    return newColor as PaletteColor;
  };

  return deepmerge(
    {
      common,
      mode,
      primary: augmentColor({ color: primary, name: 'primary' }),
      secondary: augmentColor({
        color: secondary,
        name: 'secondary',
        mainShade: 'A400',
        lightShade: 'A200',
        darkShade: 'A700',
      }),
      error: augmentColor({ color: error, name: 'error' }),
      warning: augmentColor({ color: warning, name: 'warning' }),
      info: augmentColor({ color: info, name: 'info' }),
      success: augmentColor({ color: success, name: 'success' }),
      contrastThreshold,
      getContrastText,
      augmentColor,
      tonalOffset,
      ...(mode === 'light' ? light : dark),
    },
    other,
    {
      clone: false,
    },
  );
}
