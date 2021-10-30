import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const AddIcon = (props: SvgIconProps): JSX.Element => (
  <SvgIcon viewBox="0 0 16 16" {...props}>
    <path
      fill="currentColor"
      d="M9,7 L9,3.5 C9,3.224 8.776,3 8.5,3 L7.5,3 C7.224,3 7,3.224 7,3.5 L7,7 L3.5,7 C3.224,7 3,7.224 3,7.5 L3,8.5 C3,8.776 3.224,9 3.5,9 L7,9 L7,12.5 C7,12.776 7.224,13 7.5,13 L8.5,13 C8.776,13 9,12.776 9,12.5 L9,9 L12.5,9 C12.776,9 13,8.776 13,8.5 L13,7.5 C13,7.224 12.776,7 12.5,7 L9,7 Z"
    />
  </SvgIcon>
);
export default AddIcon;