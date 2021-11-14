import { ViewSchemaType } from '@/domain/types';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import styled from '@mui/styles/styled';
import { FC } from 'react';

interface ViewIconProps extends SvgIconProps {
  type: ViewSchemaType;
}

const GridIcon = styled(
  (props: SvgIconProps): JSX.Element => (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M4,3H20A2,2 0 0,1 22,5V20A2,2 0 0,1 20,22H4A2,2 0 0,1 2,20V5A2,2 0 0,1 4,3M4,7V10H8V7H4M10,7V10H14V7H10M20,10V7H16V10H20M4,12V15H8V12H4M4,20H8V17H4V20M10,12V15H14V12H10M10,20H14V17H10V20M20,20V17H16V20H20M20,12H16V15H20V12Z"
      />
    </SvgIcon>
  ),
)({
  color: '#1283da',
  fontSize: '16px',
});

const CalendarIcon = styled(
  (props: SvgIconProps): JSX.Element => (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M16.53,11.06L15.47,10L10.59,14.88L8.47,12.76L7.41,13.82L10.59,17L16.53,11.06Z"
      />
    </SvgIcon>
  ),
)({ color: '#f7653b', fontSize: '16px' });

const KanbanIcon = styled(
  (props: SvgIconProps): JSX.Element => (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M9 17H7V10H9V17M13 17H11V7H13V17M17 17H15V13H17V17Z"
      />
    </SvgIcon>
  ),
)({ color: '#11af22', fontSize: '16px' });

const GalleryIcon = styled(
  (props: SvgIconProps): JSX.Element => (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M21 3H2V16H21V3M2 17H6V21H2V17M7 17H11V21H7V17M12 17H16V21H12V17M17 17H21V21H17V17Z"
      />
    </SvgIcon>
  ),
)({ color: '#7c39ed', fontSize: '16px' });

const FormIcon = styled(
  (props: SvgIconProps): JSX.Element => (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M14,17H7V15H14M17,13H7V11H17M17,9H7V7H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"
      />
    </SvgIcon>
  ),
)({ color: '#e929ba', fontSize: '16px' });

const viewIcons = {
  grid: GridIcon,
  calendar: CalendarIcon,
  kanban: KanbanIcon,
  gallery: GalleryIcon,
  form: FormIcon,
};

const ViewIcon: FC<ViewIconProps> = ({ type, ...svgProps }) => {
  const SvgIcon = viewIcons[type];
  if (!SvgIcon) return null;
  else return <SvgIcon {...svgProps} />;
};

export default ViewIcon;
