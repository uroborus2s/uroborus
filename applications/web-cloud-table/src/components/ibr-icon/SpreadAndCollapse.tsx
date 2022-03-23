import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const SpreadIcon = (props: SvgIconProps): JSX.Element => (
  <SvgIcon width={24} height={24} viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M11,13H21V11H11M11,9H21V7H11M3,3V5H21V3M3,21H21V19H3M3,12L7,16V8M11,17H21V15H11V17Z"
    />
  </SvgIcon>
);

const CollapseIcon = (props: SvgIconProps): JSX.Element => (
  <SvgIcon width={24} height={24} viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M11,13H21V11H11M11,9H21V7H11M3,3V5H21V3M11,17H21V15H11M3,8V16L7,12M3,21H21V19H3V21Z"
    />
  </SvgIcon>
);

export { SpreadIcon, CollapseIcon };
