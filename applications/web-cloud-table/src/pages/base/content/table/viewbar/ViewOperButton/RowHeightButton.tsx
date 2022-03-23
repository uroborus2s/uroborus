import Button from '@mui/material/Button';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const RowHeightIcon = (props: SvgIconProps): JSX.Element => (
  <SvgIcon viewBox="0 0 16 16" {...props}>
    <path
      fill="currentColor"
      d="M12.002 11.511v-7h-.626c-.3 0-.479-.37-.312-.645l1.422-1.645a.7.7 0 0 1 1.059 0l1.422 1.645c.166.276-.013.646-.312.646H14v7h.655c.3 0 .478.37.312.645l-1.417 1.677a.7.7 0 0 1-1.07 0l-1.416-1.677c-.167-.276.012-.646.312-.646h.626zM1.5 2h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5zm0 5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1 0-1zm0 3h8a.5.5 0 1 1 0 1h-8a.5.5 0 1 1 0-1zm0 3h8a.5.5 0 1 1 0 1h-8a.5.5 0 1 1 0-1z"
    />
  </SvgIcon>
);

const RowHeightButton = () => {
  return <Button startIcon={<RowHeightIcon />}>行高</Button>;
};

export default RowHeightButton;
