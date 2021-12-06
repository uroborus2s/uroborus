import LoadingButton from '@/components/ibr-loading/LoadingButton';
import {
  ColumnIconKey,
  ColumnTypeKey,
  columnTypeText,
} from '@/core/util/column-types';
import filterSearchValue from '@/core/util/filterSearchValue';
import { CREATCOLUMN, useDispath } from '@/domain';
import { BaseFiledType, DateFormat, TimeZone } from '@/domain/types';
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
import {
  createElement,
  FC,
  memo,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useRecoilValue } from 'recoil';
import { FiledComponentProps } from '../types';
import CheckBoxFiled from './CheckBoxFiled';
import DateFiled from './DateFiled';
import FiledInformation from './FiledInformation';
import NumberFiled from './NumberFiled';
import RatingFiled from './RatingFiled';
import SingleLineTextFiled from './SingleLineTextFiled';
import SingleSelectFiled from './SingleSelectFiled';
import TimeDurationFiled from './TimeDurationFiled';

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

const preOptions = () => ({
  //选择项目排序顺序
  choiceOrder: [],
  //是否包含颜色属性
  disableColors: false,
  //选择项目属性，字段结构：{id:string,name:string,color:string}
  choices: {},
  default: '',
  // 日期格式化方式
  dateFormat: DateFormat[0],
  // 是否显示时间
  isDateTime: false,
  // 时区
  timeZone: TimeZone[0],
  // checkbox 的勾选颜色
  color: 'green',
  // checkbox 的勾选样式
  icon: 'check',
  style: 'decimal',
  useGrouping: true,
  precision: '0',
  durationFormat: 'd',
  max: 5,
});

const postOptions = (option: BaseFiledType, type: ColumnTypeKey) => {
  let newOptions = {};
  switch (type) {
    case 'text':
      newOptions = {
        validator: option.validator,
      };
      break;
    case 'checkbox':
      newOptions = {
        color: option.color,
        icon: option.icon,
      };
      break;
    case 'select':
    case 'multiSelect':
      newOptions = {
        choiceOrder: option.choiceOrder,
        choices: option.choices,
        disableColors: option.disableColors,
      };
      break;
    case 'date':
      newOptions = {
        isDateTime: option.isDateTime,
        dateFormat: option.dateFormat,
        timeFormat: option.timeFormat,
        timeZone: option.timeZone,
      };
      break;
    case 'number':
      newOptions = {
        style: option.style,
        useGrouping: option.useGrouping,
        precision: option.precision,
        currencyDisplay: option.currencyDisplay,
        currency: option.currency,
      };
      break;
    case 'timeDuration':
      newOptions = {
        durationFormat: option.durationFormat,
      };
      break;
    case 'rating':
      newOptions = {
        color: option.color,
        icon: option.icon,
        max: option.max,
      };
      break;
    case 'formula':
      break;
    case 'multilineText':
    case 'attachment':
    case 'phone':
    default:
      break;
  }
  return { ...newOptions, default: option.default };
};

const AddColumnPopover: FC<{
  expanded: boolean;
  setExpanded: (exp: boolean) => void;
  closePopover: () => void;
}> = ({ expanded, setExpanded, closePopover }) => {
  const { groupedOptions, getInputProps } = useAutocomplete({
    getOptionLabel: (option) => option.lable,
    options: Object.entries(primaryText).map(([key, value]) => ({
      key,
      lable: value.name,
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
  const [type, setType] = useState<ColumnIconKey>('text');

  //新建列的默认参数数据，对应接口中的options 字段
  const [option, setOption] = useState(preOptions);

  const [filedName, setFiledName] = useState<string>();

  const { run, loading } = useDispath(CREATCOLUMN, { manual: true });

  const [desc, setDesc] = useState('');

  const [editDesc, setEditDesc] = useState(false);

  useEffect(() => {
    if (type == 'currency') {
      setOption((preState) => ({
        ...preState,
        style: 'currency',
        currency: 'CNY',
        currencyDisplay: 'symbol',
      }));
    } else if (type == 'decimal') {
      setOption((preState) => ({ ...preState, style: 'decimal' }));
    } else if (type == 'percent') {
      setOption((preState) => ({ ...preState, style: 'percent' }));
    } else if (type === 'rating') {
      setOption((preState) => ({ ...preState, icon: 'star' }));
    }
  }, [type]);

  //新建一个新的列字段
  const handleNewColumn = () => {
    run({
      data: {
        view_id: viewId,
        table_id: tableId,
        type: columnTypeText[primaryText[type].type],
        anchor_column_id: lastColId,
        options: JSON.stringify(postOptions(option, primaryText[type].type)),
        name: filedName ?? primaryText[type].name,
        desc,
        direction: 1,
      },
    }).finally(() => {
      closePopover();
    });
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
            <ItemText primary={primaryText[type].name} />
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
                    primary={primaryText[option.key as ColumnIconKey].name}
                    secondary={primaryText[option.key as ColumnIconKey].tip}
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
                    setType(option.key as ColumnIconKey);
                    setExpanded(false);
                  }}
                >
                  <ColumnHeaderIcon type={option.key as ColumnIconKey} />
                  <ItemText
                    primary={primaryText[option.key as ColumnIconKey].name}
                  />
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
        createElement(primaryText[type].component, {
          ...primaryText[type].props,
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
        <LoadingButton
          loading={loading}
          variant="contained"
          sx={{
            marginLeft: '1rem',
            display: expanded ? 'none' : 'inline-flex',
          }}
          onClick={handleNewColumn}
          titleNode="创建新列"
        />
      </ButtonGroup>
    </>
  );
};

export default memo(AddColumnPopover);

type ColumnUiData<T extends Record<string, unknown> = any> = {
  type: ColumnTypeKey;
  name: string;
  tip: string;
  component: FC<T & FiledComponentProps>;
  props?: T;
};

const primaryText: Record<ColumnIconKey, ColumnUiData> = {
  foreignKey: {
    type: 'foreignKey',
    name: '外键关联',
    tip: '引用其他关联表的记录',
    component: FiledInformation,
  },
  text: {
    type: 'text',
    name: '单行文本',
    tip: '适合存放简单的文字，不支持换行',
    component: SingleLineTextFiled,
  },
  multilineText: {
    type: 'multilineText',
    name: '多行文本',
    tip: '存放大段文字，可换行',
    component: FiledInformation,
    props: { text: '您可以填入多行长文本' },
  },
  attachment: {
    type: 'attachment',
    name: '附件',
    tip: '单元格支持添加各种类型的附件',
    component: FiledInformation,
    props: {
      text: '附件字段允许您添加图像、文档或其他文件，然后可以查看或下载这些文件。',
    },
  },
  checkbox: {
    type: 'checkbox',
    name: '复选框',
    tip: '标记已选/未选状态',
    component: CheckBoxFiled,
  },
  select: {
    type: 'select',
    name: '单选',
    tip: '在单元格中设定多个可选项，选择单个做为结果',
    component: SingleSelectFiled,
    props: { text: '单选列' },
  },
  multiSelect: {
    type: 'multiSelect',
    name: '多选',
    tip: '在单元格中设定多个可选项，选择单个或多个做为结果',
    component: SingleSelectFiled,
    props: { text: '多选列表允许您从预设的下拉列表中同时选择一个或多个选项。' },
  },
  // collaborator: ['协作成员', '选择项目协作成员'],
  date: {
    type: 'date',
    name: '日期',
    tip: '可以选择或者输入日期',
    component: DateFiled,
  },
  phone: {
    type: 'phone',
    name: '电话号码',
    tip: '可以添加电话号码格式的数据',
    component: FiledInformation,
    props: {
      text: '允许您输入有效的电话号码（例如：+86139000001122）',
    },
  },
  email: {
    type: 'text',
    name: '邮箱地址',
    tip: '可以添加邮箱格式的数据',
    component: FiledInformation,
    props: {
      text: '允许您输入有效的邮件地址（例如：any@example.com）',
    },
  },
  url: {
    type: 'text',
    name: '网址',
    tip: '可以添加网址',
    component: FiledInformation,
    props: {
      text: '允许您输入有效的URL地址（例如：whzhsc.com.cn）',
    },
  },
  decimal: {
    type: 'number',
    name: '数字',
    tip: '可以添加设置精度的数字',
    component: NumberFiled,
  },
  currency: {
    type: 'number',
    name: '货币',
    tip: '设置货币符号，自动填充货币符号',
    component: NumberFiled,
  },
  percent: {
    type: 'number',
    name: '百分比',
    tip: '输入数字自动转换为百分比',
    component: NumberFiled,
  },
  duration: {
    type: 'timeDuration',
    name: '持续时间',
    tip: '',
    component: TimeDurationFiled,
  },
  rating: {
    type: 'rating',
    name: '评分',
    tip: '标记评分',
    component: RatingFiled,
  },
  formula: {
    type: 'formula',
    name: '函数公式',
    tip: '',
    component: FiledInformation,
  },
  createdTime: {
    type: 'formula',
    name: '创建时间',
    tip: '显示记录的创建时间，不可更改',
    component: FiledInformation,
  },
  lastModifiedTime: {
    type: 'formula',
    name: '修改时间',
    tip: '显示记录的最后修改时间，不可更改',
    component: FiledInformation,
  },
  // createdBy: {
  //   type: 'formula',
  //   name: '创建人',
  //   tip: '显示记录的创建人，不可修改',
  //   component: FiledInformation,
  // },
  // lastModifiedBy: {
  //   type: 'formula',
  //   name: '修改人',
  //   tip: '显示记录的最后修改人，不可修改',
  //   component: FiledInformation,
  // },
  // autoNumber: {
  //   type: 'autoNumber',
  //   name: '自增序列号',
  //   tip: '为记录添加一个唯一且顺序自增的序列号',
  //   component: FiledInformation,
  // },
};
