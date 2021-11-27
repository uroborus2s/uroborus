import filterSearchValue from '@/core/util/filterSearchValue';
import SingleLineTextFiled from '@ibr/ibr-grid-view/addColumn/SingleLineTextFiled';
import ColumnHeaderIcon from '@ibr/ibr-icon/ColumnHeaderIcon';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import InputBase from '@mui/material/InputBase';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import styled from '@mui/material/styles/styled';
import Tooltip from '@mui/material/Tooltip';
import useAutocomplete from '@mui/material/useAutocomplete';
import { createElement, FC, useState } from 'react';

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
}> = ({ expanded, setExpanded }) => {
  const { groupedOptions, getInputProps } = useAutocomplete({
    getOptionLabel: (option) => option.lable,
    options: Object.entries(primaryText).map(([key, value]) => ({
      key: key,
      lable: value[0],
    })),
    id: 'column-list-add-type',
    filterOptions: filterSearchValue,
    freeSolo: true,
    open: true,
  });

  //当前选中的列状态
  const [type, setType] = useState('text');

  return (
    <>
      <InputBase
        placeholder="请填写列名(可选的)"
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
      {!expanded && createElement(addComment[type])}
      <ButtonGroup sx={{ justifyContent: 'end', padding: '0.5rem 0' }}>
        <Button variant="text">取消</Button>
        <Button
          variant="contained"
          sx={{
            marginLeft: '1rem',
            display: expanded ? 'none' : 'inline-flex',
          }}
        >
          创建列字段
        </Button>
      </ButtonGroup>
    </>
  );
};

export default AddColumnPopover;

const primaryText: Record<string, string[]> = {
  foreignKey: ['外键关联', '引用其他关联表的记录'],
  text: ['单行文本', '适合存放简单的文字，不支持换行'],
  multilineText: ['多行文本', '存放大段文字，可换行'],
  attachment: ['附件', '单元格支持添加各种类型的附件'],
  checkbox: ['复选框', '标记已选/未选状态'],
  select: ['单选', '在单元格中设定多个可选项，选择单个做为结果'],
  multiSelect: ['多选', '在单元格中设定多个可选项，选择单个或多个做为结果'],
  collaborator: ['成员', '选择项目成员'],
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

const addComment: Record<string, FC> = {
  text: SingleLineTextFiled,
  multilineText: SingleLineTextFiled,
  attachment: SingleLineTextFiled,
  checkbox: SingleLineTextFiled,
  select: SingleLineTextFiled,
  multiSelect: SingleLineTextFiled,
  collaborator: SingleLineTextFiled,
  date: SingleLineTextFiled,
  phone: SingleLineTextFiled,
  email: SingleLineTextFiled,
  url: SingleLineTextFiled,
  decimal: SingleLineTextFiled,
  currency: SingleLineTextFiled,
  percent: SingleLineTextFiled,
  duration: SingleLineTextFiled,
  rating: SingleLineTextFiled,
  formula: SingleLineTextFiled,
  createdTime: SingleLineTextFiled,
  lastModifiedTime: SingleLineTextFiled,
  createdBy: SingleLineTextFiled,
  lastModifiedBy: SingleLineTextFiled,
  autoNumber: SingleLineTextFiled,
};
