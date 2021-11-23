import { view } from '@/domain/view/view.repository';
import ArrowDown from '@ibr/ibr-icon/ArrowDown';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import styled from '@mui/styles/styled';
import * as React from 'react';
import { FC, useState } from 'react';
import { useRecoilValue } from 'recoil';

interface SummaryCellProps {
  colId: string;
}

const Item = styled(MenuItem)({
  padding: '0.5rem',
});

const SummaryText: FC = ({ children }) => {
  return (
    <>
      <ArrowDown className="MuiSelect-select-text-icon" />
      <Typography className="MuiSelect-select-text">{children}</Typography>
    </>
  );
};

const SummaryCell: FC<SummaryCellProps> = ({ colId }) => {
  const cellWidth = useRecoilValue(view.columnWidth(colId));

  const [isNone, setIsNone] = useState('none');

  const handleRenderTotal = (value: string) => {
    if (isNone !== value) {
      if (isNone == 'none' || value == 'none') {
        setIsNone(value);
      }
    }
    let text = '';
    switch (value) {
      case 'none':
        text = '总计';
        break;
      case 'empty':
        text = '空值 0';
        break;
      case 'filled':
        text = '已填写 0';
        break;
      case 'unique':
        text = '唯一值 0<';
        break;
      case 'percentEmpty':
        text = '空值 33.33%';
        break;
      case 'percentFilled':
        text = '已填写 33.33%';
        break;
      case 'percentUnique':
        text = '唯一值 33.33%';
        break;
      default:
        break;
    }
    return <SummaryText>{text}</SummaryText>;
  };

  return (
    <Select
      autoWidth
      sx={{
        width: cellWidth,
        border: 'none',
        borderRadius: 0,
        flexDirection: 'row-reverse',
        overflow: 'hidden',
        cursor: 'pointer',

        '& .MuiSelect-select': {
          width: '100%',
          padding: 0,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          '& .MuiSelect-select-text-icon': {
            opacity: 0,
            fontSize: '13px',
          },
          '& .MuiSelect-select-text': {
            opacity: isNone !== 'none' ? 0.75 : 0,
            marginLeft: '4px',
          },
        },
        '& .MuiSelect-icon': {
          display: 'none',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
        zIndex: 2,
        '&:hover': {
          backgroundColor: 'rgba(0,0,0,0.05)',
        },

        '&:hover .MuiSelect-select-text-icon': {
          opacity: 0.5,
        },
        '&:hover .MuiSelect-select-text': {
          opacity: 0.75,
        },

        '& .MuiSelect-select.MuiSelect-outlined.MuiOutlinedInput-input.MuiInputBase-input':
          {
            paddingRight: '8px',
          },
      }}
      // variant="standard"
      defaultValue="none"
      renderValue={handleRenderTotal}
      disableUnderline
      MenuProps={{
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        transformOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
        sx: {
          '& .MuiMenu-list': {
            maxWidth: '140px',
            borderRadius: '3px',
            padding: 0,
          },
          '& .MuiMenu-paper': {
            minWidth: '140px',
          },
        },
      }}
    >
      <Item value="none">none</Item>
      <Item value="empty">空值</Item>
      <Item value="filled">已填写</Item>
      <Item value="unique">非重复唯一值</Item>
      <Item value="percentEmpty">空值占比</Item>
      <Item value="percentFilled">已填写占比</Item>
      <Item value="percentUnique">唯一值占比</Item>
    </Select>
  );
};
export default SummaryCell;
