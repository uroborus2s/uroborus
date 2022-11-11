import {
  CSSProperties,
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  memo,
  RefObject,
} from 'react';
import classNames from 'classnames';
import composeClasses from '@mui/utils/composeClasses';
import {
  alpha,
  CSSInterpolation,
  darken,
  getDataGridUtilityClass,
  gridClasses,
  gridComponentName,
  lighten,
  styled,
  SxProps,
  Theme,
  ThemeProvider,
} from '@/styles';
import { GridOptions, GridProps } from '@/entity';
import useGridRoot from '@/hooks/useGridRoot';
import WatermarkComp from '@/components/WatermarkComp';
import GridBodyComp from './GridBodyComp';
import StatusBar from './StatusBar';

type OwnerState = {
  classes: GridProps['classes'];
  layoutClasses: GridOptions['domLayout'];
  isKeyboardFocus: boolean;
  isRtl: boolean;
} & CSSProperties;

const useUtilityClasses = (ownerState: OwnerState) => {
  const { classes, layoutClasses, isKeyboardFocus, isRtl } = ownerState;

  const slots = {
    root: [
      'root',
      layoutClasses,
      isKeyboardFocus && 'keyboardFocus',
      isRtl && 'rlt',
    ],
  };

  return composeClasses(
    slots,
    getDataGridUtilityClass,
    classes as Record<string, string>,
  );
};

const GridRootStyles = styled('div', {
  name: gridComponentName,
  slot: 'Root',
  overridesResolver: (props, styles) => {
    console.log('BuiDataGrid Resolver', props);
    console.log('BuiDataGrid Resolver', styles);
    return [
      { [`&.${gridClasses.autoHeight}`]: styles.autoHeight },
      styles.root,
    ];
  },
})<{ ownerState: CSSProperties }>(({ theme, ownerState }) => {
  const borderColor =
    theme.palette.mode === 'light'
      ? lighten(alpha(theme.palette.divider, 1), 0.88)
      : darken(alpha(theme.palette.divider, 1), 0.68);
  console.log(borderColor);
  const gridStyle: CSSInterpolation = {
    flex: 1,
    boxSizing: 'border-box',
    position: 'relative',
    border: `1px solid ${borderColor}`,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.text.primary,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    userSelect: ownerState.userSelect,
    cursor: ownerState.cursor,
    WebkitUserSelect: ownerState.userSelect,
  };
  return gridStyle;
});

export interface GridRootProps extends HTMLAttributes<HTMLDivElement> {
  sx: SxProps<Theme> | undefined;
}

const GridRoot = (
  { children, className, sx, style }: GridRootProps,
  ref: ForwardedRef<HTMLElement>,
) => {
  const { ownerState, eRootRef, getDocument, theme } = useGridRoot(ref);
  const classes = useUtilityClasses(ownerState);

  return (
    <ThemeProvider theme={theme}>
      <GridRootStyles
        ownerState={ownerState}
        ref={eRootRef as RefObject<HTMLDivElement>}
        className={classNames(className, classes.root)}
        role="grid"
        sx={sx as SxProps}
        style={style}
      >
        <GridBodyComp />
        <StatusBar />
        <WatermarkComp getDocument={getDocument} />
      </GridRootStyles>
    </ThemeProvider>
  );
};

export default memo(forwardRef(GridRoot));
