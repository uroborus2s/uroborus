import Button from '@mui/material/Button';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const SortIcon = (props: SvgIconProps): JSX.Element => (
  <SvgIcon viewBox="0 0 16 16" {...props}>
    <path
      fill="currentColor"
      d="M11.61 3.3l2.28 2.933c.335.43.161.784-.392.784H12v5.997a.994.994 0 0 1-1 1.003c-.556 0-1-.449-1-1.003V7.017H8.502c-.555 0-.73-.35-.392-.784l2.28-2.932c.335-.43.883-.433 1.22 0zm-6 9.416c-.337.433-.885.43-1.22 0L2.11 9.784C1.773 9.35 1.947 9 2.502 9H4V3.003A.999.999 0 0 1 5 2c.552 0 1 .438 1 1.003V9h1.498c.553 0 .727.353.392.784l-2.28 2.932z"
    />
  </SvgIcon>
);

const SortButton = () => {
  return <Button startIcon={<SortIcon />}>排序</Button>;
};

export default SortButton;
