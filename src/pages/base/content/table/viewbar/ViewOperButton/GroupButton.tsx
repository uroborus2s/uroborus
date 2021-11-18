import Button from '@mui/material/Button';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const GroupIcon = (props: SvgIconProps): JSX.Element => (
  <SvgIcon viewBox="0 0 16 16" {...props}>
    <path
      fill="currentColor"
      d="M1 3.006C1 1.898 1.897 1 3.006 1h9.988C14.102 1 15 1.897 15 3.006v9.988A2.005 2.005 0 0 1 12.994 15H3.006A2.005 2.005 0 0 1 1 12.994V3.006zm2 .99v8.009c0 .54.446.995.995.995h8.01c.54 0 .995-.446.995-.995v-8.01c0-.54-.446-.995-.995-.995h-8.01C3.455 3 3 3.446 3 3.995zM7 6c0-.552.444-1 1-1h3c.552 0 1 .444 1 1 0 .552-.444 1-1 1H8c-.552 0-1-.444-1-1zm0 4c0-.552.444-1 1-1h3c.552 0 1 .444 1 1 0 .552-.444 1-1 1H8c-.552 0-1-.444-1-1zM4 6c0-.552.444-1 1-1 .552 0 1 .444 1 1 0 .552-.444 1-1 1-.552 0-1-.444-1-1zm0 4c0-.552.444-1 1-1 .552 0 1 .444 1 1 0 .552-.444 1-1 1-.552 0-1-.444-1-1z"
    />
  </SvgIcon>
);

const GroupButton = () => {
  return <Button startIcon={<GroupIcon />}>分组</Button>;
};

export default GroupButton;
