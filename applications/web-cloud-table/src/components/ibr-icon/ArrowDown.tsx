import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { memo } from 'react';

const ArrowDown = (props: SvgIconProps): JSX.Element => (
  <SvgIcon viewBox="0 0 12 12" {...props}>
    <path
      fill="currentColor"
      d="M3.6011,4.00002 L8.4011,4.00002 C8.8951,4.00002 9.1771,4.56402 8.8811,4.96002 L6.4811,8.16002 C6.2411,8.48002 5.7611,8.48002 5.5211,8.16002 L3.1211,4.96002 C2.8241,4.56402 3.1071,4.00002 3.6011,4.00002"
    />
  </SvgIcon>
);

export default memo(ArrowDown);
