import { BaseIconType, icons } from '@/core/util';
import { DefaultComponentProps } from '@mui/material/OverridableComponent';
import SvgIcon, { SvgIconTypeMap } from '@mui/material/SvgIcon';

import React, { memo } from 'react';

interface SVGIconProps extends DefaultComponentProps<SvgIconTypeMap> {
  icon: Exclude<BaseIconType, 'null'>;
}

const BaseIcon: React.FC<SVGIconProps> = ({ icon, ...porps }) => {
  const pathData = icons[icon];
  return (
    <SvgIcon viewBox="0 0 24 24" {...porps}>
      <path d={pathData} />
    </SvgIcon>
  );
};

export default memo(BaseIcon);
