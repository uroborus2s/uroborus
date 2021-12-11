import { ViewSchemaType } from '@/domain/types';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import styled from '@mui/styles/styled';
import { FC } from 'react';

interface ViewIconProps extends SvgIconProps {
  type: ViewSchemaType;
}

const GridIcon = styled(
  (props: SvgIconProps): JSX.Element => (
    <SvgIcon viewBox="0 0 16 16" {...props}>
      <path
        fill="currentColor"
        d="M0 1.994C0 .893.895 0 1.994 0h12.012C15.107 0 16 .895 16 1.994v12.012A1.995 1.995 0 0 1 14.006 16H1.994A1.995 1.995 0 0 1 0 14.006V1.994zM2 7v1.002C2 8.557 2.452 9 3.01 9h1.98A.999.999 0 0 0 6 8.001V6.999C6 6.443 5.548 6 4.99 6H3.01A.999.999 0 0 0 2 6.999zm5 0v1.002C7 8.557 7.449 9 8.003 9h4.994A.994.994 0 0 0 14 8.001V6.999A.998.998 0 0 0 12.997 6H8.003A.994.994 0 0 0 7 6.999zM2 3c0 .556.452 1 1.01 1h1.98a1 1 0 1 0 0-2H3.01A1 1 0 0 0 2 3zm5 0c0 .556.449 1 1.003 1h4.994A.994.994 0 0 0 14 3c0-.556-.449-1-1.003-1H8.003A.994.994 0 0 0 7 3zm-5 8.999v1.002c0 .556.452.999 1.01.999h1.98A.999.999 0 0 0 6 13.001v-1.002C6 11.443 5.548 11 4.99 11H3.01a.999.999 0 0 0-1.01.999zm5 0v1.002c0 .556.449.999 1.003.999h4.994A.994.994 0 0 0 14 13.001v-1.002A.998.998 0 0 0 12.997 11H8.003A.994.994 0 0 0 7 11.999z"
      />
    </SvgIcon>
  ),
)({
  color: '#1283da',
  fontSize: '14px',
});

const CalendarIcon = styled(
  (props: SvgIconProps): JSX.Element => (
    <SvgIcon viewBox="0 0 16 16" {...props}>
      <path
        fill="currentColor"
        d="M12 2c0-.556-.448-1-1-1-.556 0-1 .448-1 1H6c0-.556-.448-1-1-1-.556 0-1 .448-1 1h-.998C2.456 2 2 2.449 2 3.002v9.996C2 13.544 2.449 14 3.002 14h9.996c.546 0 1.002-.449 1.002-1.002V3.002C14 2.456 13.551 2 12.998 2H12zm2.006-2C15.107 0 16 .895 16 1.994v12.012A1.995 1.995 0 0 1 14.006 16H1.994A1.995 1.995 0 0 1 0 14.006V1.994C0 .893.895 0 1.994 0h12.012zM7.505 4h.99c.279 0 .505.214.505.505v.99A.497.497 0 0 1 8.495 6h-.99A.497.497 0 0 1 7 5.495v-.99C7 4.226 7.214 4 7.505 4zm3 0h.99c.279 0 .505.214.505.505v.99a.497.497 0 0 1-.505.505h-.99A.497.497 0 0 1 10 5.495v-.99c0-.279.214-.505.505-.505zm-6 3h.99c.279 0 .505.214.505.505v.99A.497.497 0 0 1 5.495 9h-.99A.497.497 0 0 1 4 8.495v-.99C4 7.226 4.214 7 4.505 7zm3 0h.99c.279 0 .505.214.505.505v.99A.497.497 0 0 1 8.495 9h-.99A.497.497 0 0 1 7 8.495v-.99C7 7.226 7.214 7 7.505 7zm3 0h.99c.279 0 .505.214.505.505v.99a.497.497 0 0 1-.505.505h-.99A.497.497 0 0 1 10 8.495v-.99c0-.279.214-.505.505-.505zm-6 3h.99c.279 0 .505.214.505.505v.99a.497.497 0 0 1-.505.505h-.99A.497.497 0 0 1 4 11.495v-.99c0-.279.214-.505.505-.505zm3 0h.99c.279 0 .505.214.505.505v.99a.497.497 0 0 1-.505.505h-.99A.497.497 0 0 1 7 11.495v-.99c0-.279.214-.505.505-.505z"
      />
    </SvgIcon>
  ),
)({ color: '#f7653b', fontSize: '14px' });

const KanbanIcon = styled(
  (props: SvgIconProps): JSX.Element => (
    <SvgIcon viewBox="0 0 16 16" {...props}>
      <path
        fill="currentColor"
        d="M0 1.994C0 .893.895 0 1.994 0h12.012C15.107 0 16 .895 16 1.994v12.012A1.995 1.995 0 0 1 14.006 16H1.994A1.995 1.995 0 0 1 0 14.006V1.994zm1 1.51v4.991A1.5 1.5 0 0 0 2.5 10h1C4.32 10 5 9.326 5 8.495v-4.99A1.5 1.5 0 0 0 3.5 2h-1C1.68 2 1 2.674 1 3.505zm5-.008v9.008C6 13.32 6.672 14 7.5 14h1c.821 0 1.5-.67 1.5-1.496V3.496C10 2.68 9.328 2 8.5 2h-1C6.68 2 6 2.67 6 3.496zm5 .001v7.006A1.5 1.5 0 0 0 12.5 12h1c.821 0 1.5-.67 1.5-1.497V3.497A1.5 1.5 0 0 0 13.5 2h-1c-.821 0-1.5.67-1.5 1.497z"
      />
    </SvgIcon>
  ),
)({ color: '#11af22', fontSize: '14px' });

const GalleryIcon = styled(
  (props: SvgIconProps): JSX.Element => (
    <SvgIcon viewBox="0 0 16 16" {...props}>
      <path
        fill="currentColor"
        d="M0 1.994C0 .893.895 0 1.994 0h12.012C15.107 0 16 .895 16 1.994v12.012A1.995 1.995 0 0 1 14.006 16H1.994A1.995 1.995 0 0 1 0 14.006V1.994zM2 3.5v2C2 6.326 2.672 7 3.5 7h2C6.326 7 7 6.328 7 5.5v-2C7 2.674 6.328 2 5.5 2h-2C2.674 2 2 2.672 2 3.5zm0 7v2c0 .826.672 1.5 1.5 1.5h2c.826 0 1.5-.672 1.5-1.5v-2C7 9.674 6.328 9 5.5 9h-2C2.674 9 2 9.672 2 10.5zm7-7v2c0 .826.672 1.5 1.5 1.5h2c.826 0 1.5-.672 1.5-1.5v-2c0-.826-.672-1.5-1.5-1.5h-2C9.674 2 9 2.672 9 3.5zm0 7v2c0 .826.672 1.5 1.5 1.5h2c.826 0 1.5-.672 1.5-1.5v-2c0-.826-.672-1.5-1.5-1.5h-2C9.674 9 9 9.672 9 10.5z"
      />
    </SvgIcon>
  ),
)({ color: '#7c39ed', fontSize: '14px' });

const FormIcon = styled(
  (props: SvgIconProps): JSX.Element => (
    <SvgIcon viewBox="0 0 16 16" {...props}>
      <path
        fill="currentColor"
        d="M0 1.994C0 .893.895 0 1.994 0h12.012C15.107 0 16 .895 16 1.994v12.012A1.995 1.995 0 0 1 14.006 16H1.994A1.995 1.995 0 0 1 0 14.006V1.994zM2 2.5c0 .268.22.5.49.5h3.02c.275 0 .49-.224.49-.5a.5.5 0 0 0-.49-.5H2.49a.492.492 0 0 0-.49.5zm0 3C2 6.334 2.67 7 3.496 7h9.008C13.32 7 14 6.328 14 5.5c0-.834-.67-1.5-1.496-1.5H3.496C2.68 4 2 4.672 2 5.5zm0 7c0 .834.67 1.5 1.496 1.5h9.008C13.32 14 14 13.328 14 12.5c0-.834-.67-1.5-1.496-1.5H3.496C2.68 11 2 11.672 2 12.5zm0-3c0 .268.22.5.49.5h3.02c.275 0 .49-.224.49-.5a.5.5 0 0 0-.49-.5H2.49a.492.492 0 0 0-.49.5z"
      />
    </SvgIcon>
  ),
)({ color: '#e929ba', fontSize: '14px' });

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
