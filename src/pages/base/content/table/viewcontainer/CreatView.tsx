import { CREATVIEW, useDispath } from '@/domain';
import { ViewSchemaType, ViewType } from '@/domain/types';
import AddIcon from '@ibr/ibr-icon/AddIcon';
import ViewIcon from '@ibr/ibr-icon/ViewIcon';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import List from '@mui/material/List';
import ListItemButton, {
  ListItemButtonProps,
} from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import styled from '@mui/styles/styled';
import { FC } from 'react';

const CreatItemButton = styled(ListItemButton)({
  padding: '0.25rem 0',
  borderRadius: '4px',
});

const CreatViewItem: FC<
  ListItemButtonProps & { title: string; viewType: ViewSchemaType }
> = ({ title, viewType, ...props }) => {
  return (
    <CreatItemButton disableRipple {...props}>
      <ViewIcon type={viewType} />
      <Typography sx={{ margin: '0 0.5rem', flex: 'auto' }}>{title}</Typography>
      <AddIcon sx={{ fontSize: '13px', marginRight: '3px' }}></AddIcon>
    </CreatItemButton>
  );
};

const CreatView = () => {
  const { run } = useDispath(CREATVIEW, { manual: true });

  return (
    <Accordion
      defaultExpanded
      sx={{
        borderTopStyle: 'solid',
        borderTopWidth: '2px',
        borderTopColor: 'rgba(0,0,0,0.1)',
        boxShadow: 'none',
        backgroundColor: 'inherit',
        margin: '0 1rem 1rem',
        '&.Mui-expanded': {
          margin: '0 1rem 1rem',
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          padding: '0.5rem 10px',
          margin: '0.5rem 0',
          opacity: 0.75,
          '&.Mui-expanded': {
            minHeight: 0,
          },
          '& .MuiAccordionSummary-content,&.Mui-expanded .MuiAccordionSummary-content':
            {
              margin: 0,
            },
        }}
      >
        <Typography>创建新视图</Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          padding: '0 10px 1rem',
        }}
      >
        <List sx={{ margin: 0, padding: 0 }}>
          <CreatViewItem title="表格视图" viewType={ViewType.grid} />
          <CreatViewItem title="看板视图" viewType={ViewType.kanban} />
          <CreatViewItem title="日历视图" viewType={ViewType.calendar} />
          <CreatViewItem title="表单视图" viewType={ViewType.form} />
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default CreatView;
