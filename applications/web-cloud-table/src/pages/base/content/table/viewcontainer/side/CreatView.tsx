import { CREATVIEW, table, useDispath } from '@/domain';
import { ViewData, ViewSchemaType, ViewType } from '@/domain/types';
import { view } from '@/domain/view/view.repository';
import { BaseIdContext } from '@/pages/base/BaseContext';
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
import { FC, MouseEventHandler, useContext } from 'react';
import { useRecoilTransaction_UNSTABLE, useRecoilValue } from 'recoil';
import {
  currentEditViewIdState,
  currentViewIdState,
  TableIdContext,
} from '../..//TableContext';

const CreatItemButton = styled(ListItemButton)({
  padding: '0.25rem 0',
  borderRadius: '4px',
  height: '32px',
});

const CreatViewPanel = styled('div')({
  boxShadow: 'box-shadow',
  width: '400px',
  padding: '1rem',
  borderRadius: '13px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
});

const ViewTypeNames = {
  //表格视图
  grid: '网格视图',
  //  日历视图
  calendar: '日历视图',
  //看板视图
  kanban: '看板视图',
  //相册视图
  gallery: '相册视图',
  //收集表单
  form: '表单',
};

const createViewName = (type: ViewSchemaType, views: ViewData[]) => {
  const typeViews = views.filter((view) => view.type === type);
  let cont = typeViews.length + 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const newName = ViewTypeNames[type].concat(' ', String(cont));
    const res = typeViews.findIndex((value) => value.name == newName);
    if (res == -1) return newName;
    cont++;
  }
};

const CreatViewItem: FC<
  ListItemButtonProps & {
    title: string;
    viewType: ViewSchemaType;
    newView: (type: ViewSchemaType) => MouseEventHandler<HTMLElement>;
  }
> = ({ title, viewType, newView, ...props }) => {
  return (
    <CreatItemButton disableRipple {...props} onClick={newView(viewType)}>
      <ViewIcon type={viewType} />
      <Typography sx={{ margin: '0 0.5rem', flex: 'auto' }}>{title}</Typography>
      <AddIcon sx={{ fontSize: '13px', marginRight: '3px' }} />
    </CreatItemButton>
  );
};

const CreatView = () => {
  const { run } = useDispath(CREATVIEW, { manual: true });
  const baseId = useContext(BaseIdContext);
  const tableId = useContext(TableIdContext);

  const viewIds = useRecoilValue(table.viewIds(tableId));

  const views = useRecoilValue(view.views([...viewIds]));

  const makeSeletedAndEdit = useRecoilTransaction_UNSTABLE(
    ({ set }) =>
      (id: string) => {
        set(currentEditViewIdState, id);
        set(currentViewIdState, id);
      },
    [],
  );

  const hangleNewView = (type: ViewSchemaType) => () => {
    const name = createViewName(type, views);
    run({
      data: { base_id: baseId, type: type, table_id: tableId, name: name },
    }).then((res) => {
      const id = res.request.params.viewId;
      if (id) makeSeletedAndEdit(id);
    });
  };

  return (
    <>
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
          flex: 'none',
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
            <CreatViewItem
              title="网格视图"
              viewType={ViewType.grid}
              newView={hangleNewView}
            />
            <CreatViewItem
              title="看板视图"
              viewType={ViewType.kanban}
              newView={hangleNewView}
            />
            <CreatViewItem
              title="日历视图"
              viewType={ViewType.calendar}
              newView={hangleNewView}
            />
            <CreatViewItem
              title="表单视图"
              viewType={ViewType.form}
              newView={hangleNewView}
            />
          </List>
        </AccordionDetails>
      </Accordion>
      {/*<Popover*/}
      {/*  open={!!anchorElem}*/}
      {/*  anchorEl={anchorElem as Element}*/}
      {/*  onClose={closePopover}*/}
      {/*  anchorOrigin={{*/}
      {/*    vertical: 'top',*/}
      {/*    horizontal: 'right',*/}
      {/*  }}*/}
      {/*  transformOrigin={{*/}
      {/*    vertical: 'bottom',*/}
      {/*    horizontal: 'left',*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <CreatViewPanel>*/}
      {/*    <InputBase*/}
      {/*      autoFocus*/}
      {/*      sx={{*/}
      {/*        lineHeight: 1.25,*/}
      {/*        borderRadius: '6px',*/}
      {/*        fontWeight: 500,*/}
      {/*        fontSize: '15px',*/}
      {/*        backgroundColor: 'hsl(0,0%,95%)',*/}
      {/*        width: '100%',*/}
      {/*        padding: '0 0.25rem',*/}
      {/*        marginBottom: '2rem',*/}
      {/*      }}*/}
      {/*    />*/}
      {/*    <RadioGroup*/}
      {/*      defaultValue="female"*/}
      {/*      aria-label="gender"*/}
      {/*      name="customized-radios"*/}
      {/*      row*/}
      {/*    >*/}
      {/*      <FormControlLabel*/}
      {/*        value="female"*/}
      {/*        control={<Radio />}*/}
      {/*        label="Female"*/}
      {/*      />*/}
      {/*      <FormControlLabel value="male" control={<Radio />} label="Male" />*/}
      {/*      <FormControlLabel value="other" control={<Radio />} label="Other" />*/}
      {/*    </RadioGroup>*/}
      {/*    <ConfimButtonGroups sx={{ alignSelf: 'flex-end' }}>*/}
      {/*      <CancelButton*/}
      {/*        variant="text"*/}
      {/*        onClick={(e) => {*/}
      {/*          e.stopPropagation();*/}
      {/*          if (onClose) onClose();*/}
      {/*        }}*/}
      {/*        href=""*/}
      {/*      >*/}
      {/*        取消*/}
      {/*      </CancelButton>*/}
      {/*      <LoadingButton*/}
      {/*        sx={{ width: '120px', padding: '0.25rem 0.5rem' }}*/}
      {/*        loading={true}*/}
      {/*        variant="contained"*/}
      {/*        onClick={(e) => {*/}
      {/*          e.stopPropagation();*/}
      {/*        }}*/}
      {/*        titleNode="新建视图"*/}
      {/*      />*/}
      {/*    </ConfimButtonGroups>*/}
      {/*  </CreatViewPanel>*/}
      {/*</Popover>*/}
    </>
  );
};

export default CreatView;
