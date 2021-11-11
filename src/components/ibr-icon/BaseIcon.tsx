import { BaseIconType, BlankIcon, icons } from '@/core/util';
import {
  BaseIconClasses,
  BaseIconComponentName,
  getBaseIconUtilityClass,
} from '@ibr/ibr-icon/IconClasses';
import composeClasses from '@mui/core/composeClasses';
import { DefaultComponentProps } from '@mui/material/OverridableComponent';
import { Theme } from '@mui/material/styles/createTheme';
import styled from '@mui/material/styles/styled';
import SvgIcon, { SvgIconTypeMap } from '@mui/material/SvgIcon';
import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';
import classNames from 'classnames';

import React, { memo } from 'react';

type BaseIconProps = JSX.IntrinsicElements['div'] & {
  icon: BaseIconType;
  fristChar?: string;
  iconProps?: DefaultComponentProps<SvgIconTypeMap>;
  /* The system prop that allows defining system overrides as well as additional CSS styles.*/
  sx?: SxProps<Theme>;
  as?: React.ElementType;
  classes?: Partial<BaseIconClasses>;
  disabledBlank?: boolean;
};

const useUtilityClasses = (classes?: Partial<BaseIconClasses>) => {
  const slots = {
    root: ['root'],
  };
  return composeClasses(slots, getBaseIconUtilityClass, classes);
};

const BaseIconRoot = styled('div', {
  name: BaseIconComponentName,
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})({ display: 'flex', alignItems: 'center', justifyContent: 'center' });

const BaseIcon: React.FC<BaseIconProps> = (props) => {
  const {
    icon,
    fristChar,
    iconProps,
    classes: classesProps,
    className,
    disabledBlank = false,
    ...other
  } = props;
  const classes = useUtilityClasses(classesProps);

  const pathData = icon == BlankIcon ? undefined : icons[icon];
  return (
    <BaseIconRoot className={classNames(classes?.root, className)} {...other}>
      {icon == BlankIcon ? (
        disabledBlank ? null : (
          <span>{fristChar}</span>
        )
      ) : (
        <SvgIcon viewBox="0 0 24 24" {...iconProps}>
          <path d={pathData} />
        </SvgIcon>
      )}
    </BaseIconRoot>
  );
};

export default memo(BaseIcon);
