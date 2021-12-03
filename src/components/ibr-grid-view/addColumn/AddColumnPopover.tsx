import filterSearchValue from '@/core/util/filterSearchValue';
import { CREATCOLUMN, useDispath } from '@/domain';
import { view } from '@/domain/view/view.repository';
import {
  currentViewIdState,
  TableIdContext,
} from '@/pages/base/content/table/TableContext';
import AddIcon from '@ibr/ibr-icon/AddIcon';
import ColumnHeaderIcon from '@ibr/ibr-icon/ColumnHeaderIcon';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import styled from '@mui/material/styles/styled';
import Tooltip from '@mui/material/Tooltip';
import useAutocomplete from '@mui/material/useAutocomplete';
import { createElement, FC, memo, useContext, useState } from 'react';
import { useRecoilValue } from 'recoil';
import CheckBoxFiled from './CheckBoxFiled';
import DateFiled from './DateFiled';
import FiledInformation from './FiledInformation';
import SingleLineTextFiled from './SingleLineTextFiled';
import SingleSelectFiled from './SingleSelectFiled';

const ItemButton = styled(ListItemButton)({
  borderRadius: '6px',
  padding: '0.5rem',
  '&:hover': {
    backgroundColor: '#d0f0fd',
  },
});

const ItemText = styled(ListItemText)({
  margin: '0 0.5rem',
  fontWeight: 500,
  flex: 'auto',
});

const AddColumnPopover: FC<{
  expanded: boolean;
  setExpanded: (exp: boolean) => void;
  closePopover: () => void;
}> = ({ expanded, setExpanded, closePopover }) => {
  const { groupedOptions, getInputProps } = useAutocomplete({
    getOptionLabel: (option) => option.lable,
    options: Object.entries(primaryText).map(([key, value]) => ({
      key,
      lable: value[0],
    })),
    id: 'column-list-add-type',
    filterOptions: filterSearchValue,
    freeSolo: true,
    open: true,
  });

  const viewId = useRecoilValue(currentViewIdState);

  const tableId = useContext(TableIdContext);

  const lastColId = [...useRecoilValue(view.columnOrders(viewId))].pop();

  //当前选中的列状态
  const [type, setType] = useState('text');

  //新建列的默认参数数据，对应接口中的options 字段
  const [option, setOption] = useState({});

  const [filedName, setFiledName] = useState<string>();

  const { run } = useDispath(CREATCOLUMN, { manual: true });

  const [desc, setDesc] = useState('');

  const [editDesc, setEditDesc] = useState(false);

  //新建一个新的列字段
  const handleNewColumn = () => {
    run({
      data: {
        view_id: viewId,
        table_id: tableId,
        type,
        anchor_column_id: lastColId,
        options: option,
        name: filedName ?? primaryText[type][0],
        desc,
      },
    }).then();
  };

  return (
    <>
      <InputBase
        placeholder="请填写列名(可选的)"
        value={filedName}
        onChange={(e) => {
          setFiledName(e.target.value);
        }}
        sx={{
          width: '100%',
          flex: 'none',
          '& .MuiInputBase-input': {
            borderStyle: 'solid',
            borderWidth: '2px',
            appearance: 'none',
            borderRadius: '6px',
            fontSize: '0.9rem',
            backgroundColor: 'rgba(0,0,0,0.05)',
            padding: '0.5rem',
            marginTop: '0.5rem',
            borderColor: '#cccecf',
            '&:focus': {
              backgroundColor: '#fff',
              borderColor: '#2d7ff9',
            },
          },
        }}
      />
      <Accordion
        expanded={expanded}
        onChange={() => {
          if (!expanded) setExpanded(true);
        }}
        onClick={(event) => {
          event.stopPropagation();
        }}
        sx={{
          flex: 'auto',
          marginTop: '0.5rem',
          '&.Mui-expanded': { marginTop: '0.5rem' },
          '&:last-of-type': { borderRadius: '6px' },
          '&::before': { display: 'none' },
        }}
      >
        <AccordionSummary
          expandIcon={!expanded && <ExpandMoreIcon />}
          aria-controls="panel1a-content"
          sx={{
            padding: '0 0.5rem',
            '&.Mui-expanded': {
              minHeight: '36px',
              '&:hover,&:focus': { boxShadow: 'none' },
              backgroundColor: '#d0f0fd',
            },
            '& .MuiAccordionSummary-content': {
              margin: 0,
              minHeight: '36px',
              alignItems: 'center',
              '&.Mui-expanded': {},
            },
            backgroundColor: '#d0f0fd',
            minHeight: '36px',
            borderRadius: '6px',
            '&:hover,&:focus': {
              boxShadow: 'inset 0 0 0 2px rgb(0 0 0 / 10%)',
            },
          }}
        >
          <InputBase
            sx={{ width: '100%', display: expanded ? 'flex' : 'none' }}
            placeholder="搜索"
            startAdornment={
              <SearchIcon sx={{ fontSize: '16px', marginRight: '0.5rem' }} />
            }
            inputProps={{ ...getInputProps() }}
          />
          <ListItem
            sx={{
              fontWeight: 500,
              display: expanded ? 'none' : 'inline-flex',
              padding: 0,
            }}
          >
            <ColumnHeaderIcon type={type} />
            <ItemText primary={primaryText[type][0]} />
          </ListItem>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 0 }}>
          <List
            sx={{
              margin: '0.25rem',
              padding: 0,
              height: '450px',
              overflow: 'auto',
            }}
            className="scrollbar"
          >
            {groupedOptions.map((option, index) => (
              <Tooltip
                key={index}
                title={
                  <ListItemText
                    sx={{ '& .MuiListItemText-secondary': { color: '#fff' } }}
                    primary={primaryText[option.key][0]}
                    secondary={primaryText[option.key][1]}
                  />
                }
                placement="left-start"
              >
                <ItemButton
                  disableRipple
                  disableTouchRipple
                  selected={option.key === type}
                  onClick={(e) => {
                    e.stopPropagation();
                    setType(option.key as string);
                    setExpanded(false);
                  }}
                >
                  <ColumnHeaderIcon type={option.key as string} />
                  <ItemText primary={primaryText[option.key][0]} />
                  {option.key === 'foreignKey' && (
                    <ArrowForwardIosRoundedIcon
                      sx={{ opacity: 0.5, fontSize: '12px' }}
                    />
                  )}
                </ItemButton>
              </Tooltip>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
      {!expanded &&
        createElement(InfoComment[type].component, {
          ...InfoComment[type].props,
          setParameters: setOption,
          parameters: option,
        })}
      {editDesc && (
        <FormControl variant="standard">
          <InputLabel shrink htmlFor="input-description-of-column-filed">
            描述信息
          </InputLabel>
          <Input
            id="input-description-of-column-filed"
            sx={{
              width: '100%',
              borderRadius: '3px',
              borderWidth: '2px',
              borderStyle: 'solid',
              borderColor: 'rgba(0,0,0,0.05)',
              padding: 0,
              '&.Mui-focused': { borderColor: 'rgba(0,0,0,0.25)' },
            }}
            value={desc}
            onChange={(event) => {
              setDesc(event.target.value);
            }}
            placeholder="列字段描述信息(可选的)"
            disableUnderline
          />
        </FormControl>
      )}
      <ButtonGroup
        sx={{
          justifyContent: 'end',
          padding: '0.5rem 0',
          alignItems: 'center',
        }}
      >
        {!editDesc && (
          <Button
            variant="text"
            sx={{ alignSelf: 'start', opacity: 0.7 }}
            startIcon={<AddIcon />}
            color="inherit"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              if (editDesc) setEditDesc(false);
              else setEditDesc(true);
            }}
          >
            添加描述信息
          </Button>
        )}
        <div style={{ flex: 'auto' }} />
        <Button
          variant="text"
          onClick={(e) => {
            e.stopPropagation();
            closePopover();
          }}
        >
          取消
        </Button>
        <Button
          variant="contained"
          sx={{
            marginLeft: '1rem',
            display: expanded ? 'none' : 'inline-flex',
          }}
          onClick={handleNewColumn}
        >
          创建列字段
        </Button>
      </ButtonGroup>
    </>
  );
};

export default memo(AddColumnPopover);

const primaryText: Record<string, string[]> = {
  foreignKey: ['外键关联', '引用其他关联表的记录'],
  text: ['单行文本', '适合存放简单的文字，不支持换行'],
  multilineText: ['多行文本', '存放大段文字，可换行'],
  attachment: ['附件', '单元格支持添加各种类型的附件'],
  checkbox: ['复选框', '标记已选/未选状态'],
  select: ['单选', '在单元格中设定多个可选项，选择单个做为结果'],
  multiSelect: ['多选', '在单元格中设定多个可选项，选择单个或多个做为结果'],
  // collaborator: ['协作成员', '选择项目协作成员'],
  date: ['日期', '可以选择或者输入日期'],
  phone: ['电话号码', '可以添加电话号码格式的数据'],
  email: ['邮箱地址', '可以添加邮箱格式的数据'],
  url: ['网址', '可以添加网址'],
  decimal: ['数字', '可以添加设置精度的数字'],
  currency: ['货币', '设置货币符号，自动填充货币符号'],
  percent: ['百分比', '输入数字自动转换为百分比'],
  duration: ['持续时间', ''],
  rating: ['评分', '标记评分'],
  formula: ['函数公式', ''],
  createdTime: ['创建时间', '显示记录的创建时间，不可更改'],
  lastModifiedTime: ['修改时间', '显示记录的最后修改时间，不可更改'],
  createdBy: ['创建人', '显示记录的创建人，不可修改'],
  lastModifiedBy: ['修改人', '显示记录的最后修改人，不可修改'],
  autoNumber: ['自增序列号', '为记录添加一个唯一且顺序自增的序列号'],
};

const InfoComment: Record<string, { component: FC<any>; props?: any }> = {
  text: { component: SingleLineTextFiled },
  multilineText: {
    component: FiledInformation,
    props: { text: '您可以填入多行长文本' },
  },
  attachment: {
    component: FiledInformation,
    props: {
      text: '附件字段允许您添加图像、文档或其他文件，然后可以查看或下载这些文件。',
    },
  },
  checkbox: { component: CheckBoxFiled },
  select: {
    component: SingleSelectFiled,
    props: { text: '单选列表允许您从预设的下拉列表中选择单一选项。' },
  },
  multiSelect: {
    component: SingleSelectFiled,
    props: { text: '多选列表允许您从预设的下拉列表中同时选择一个或多个选项。' },
  },
  date: { component: DateFiled },

  // collaborator: SingleLineTextFiled,
  phone: {
    component: FiledInformation,
    props: {
      text: '允许您输入有效的电话号码（例如：+86139000001122）',
    },
  },
  email: {
    component: FiledInformation,
    props: {
      text: '允许您输入有效的邮件地址（例如：any@example.com）',
    },
  },
  url: {
    component: FiledInformation,
    props: {
      text: '允许您输入有效的URL地址（例如：whzhsc.com.cn）',
    },
  },
  // decimal: SingleLineTextFiled,
  // currency: SingleLineTextFiled,
  // percent: SingleLineTextFiled,
  // duration: SingleLineTextFiled,
  // rating: SingleLineTextFiled,
  // formula: SingleLineTextFiled,
  // createdTime: SingleLineTextFiled,
  // lastModifiedTime: SingleLineTextFiled,
  // createdBy: SingleLineTextFiled,
  // lastModifiedBy: SingleLineTextFiled,
  // autoNumber: SingleLineTextFiled,
};
