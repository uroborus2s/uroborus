import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const BoldCheckIcon = (props: SvgIconProps): JSX.Element => (
  <SvgIcon viewBox="0 0 16 16" {...props}>
    <path
      fill="currentColor"
      d="M5.944 12.305a1.031 1.031 0 0 0 1.433-.009l5.272-5.181A1.483 1.483 0 0 0 12.661 5a1.468 1.468 0 0 0-2.109.025L7.008 8.701a.465.465 0 0 1-.685-.01l-.587-.641A1.42 1.42 0 0 0 3.661 8a1.473 1.473 0 0 0 .017 2.106l2.266 2.199z"
    />
  </SvgIcon>
);
export default BoldCheckIcon;