import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const SquareAddIcon = (props: SvgIconProps): JSX.Element => (
  <SvgIcon width={12} height={12} viewBox="0 0 12 12" {...props}>
    <path
      fill="currentColor"
      d="M0,2.0085302 C0,0.899249601 0.901950359,0 2.0085302,0 L9.9914698,0 C11.1007504,0 12,0.901950359 12,2.0085302 L12,9.9914698 C12,11.1007504 11.0980496,12 9.9914698,12 L2.0085302,12 C0.899249601,12 0,11.0980496 0,9.9914698 L0,2.0085302 Z M9.5,5 L7,5 L7,2.5 C7,2.224 6.776,2 6.5,2 L5.5,2 C5.224,2 5,2.224 5,2.5 L5,5 L2.5,5 C2.224,5 2,5.224 2,5.5 L2,6.5 C2,6.776 2.224,7 2.5,7 L5,7 L5,9.5 C5,9.776 5.224,10 5.5,10 L6.5,10 C6.776,10 7,9.776 7,9.5 L7,7 L9.5,7 C9.776,7 10,6.776 10,6.5 L10,5.5 C10,5.224 9.776,5 9.5,5 Z"
    />
  </SvgIcon>
);
export default SquareAddIcon;