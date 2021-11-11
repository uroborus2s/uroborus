import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const NewFileIcon = (props: SvgIconProps): JSX.Element => (
  <SvgIcon viewBox="0 0 16 16" {...props}>
    <path
      fill="currentColor"
      d="M11.791,6 L9.498,6 C9.223,6 9,5.777 9,5.502 L9,3.213 C9,2.766 9.541,2.541 9.858,2.858 L12.145,5.145 C12.461,5.461 12.237,6 11.791,6 M10.7059121,1.70591205 C10.3160476,1.31604759 9.56211865,1 8.99707067,1 L5.00591905,1 C3.89808055,1 3,1.89706013 3,3.00585866 L3,12.9941413 C3,14.1019465 3.90017617,15 4.99201702,15 L12.007983,15 C13.1081436,15 14,14.1125667 14,13.000385 L14,5.99539757 C14,5.44565467 13.6861267,4.68612671 13.2940879,4.29408795 L10.7059121,1.70591205 Z"
    />
  </SvgIcon>
);
export default NewFileIcon;