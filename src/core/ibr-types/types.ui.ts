import { Theme } from '@mui/material/styles';
import { SvgIconClasses } from '@mui/material/SvgIcon/svgIconClasses';
import { SxProps } from '@mui/system';
import React from 'react';

export interface CommonProps {
  className?: string;
  style?: React.CSSProperties;
}

export type StyeldProps = {
  classes?: Partial<SvgIconClasses>;
  sx?: SxProps<Theme>;
};
