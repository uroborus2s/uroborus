import { getTargetElement } from '@/core/util';
import { column } from '@/domain/column/column.repository';
import { view } from '@/domain/view/view.repository';
import { currentViewIdState } from '@/pages/base/content/table/TableContext';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';
import styled from '@mui/material/styles/styled';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { FC, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

interface SummaryCellProps {
  colId: string;
}

const CellRoot = styled('div')({
  display: 'flex',
  height: '100%',
  overflow: 'hidden',
  alignItems: 'center',
});

const SummaryCell: FC<SummaryCellProps> = ({ colId }) => {
  const viewId = useRecoilValue(currentViewIdState);

  const rowIds = useRecoilValue(view.rowOrders(viewId));

  const cellWidth = useRecoilValue(view.columnWidth(colId));

  const isPrimary = useRecoilValue(column.primary(colId));

  const [isNone, setIsNone] = useState('none');

  const handleRenderTotal = (value: string) => {
    console.log(isNone, value);
    if (isNone !== value) {
      if (isNone == 'none' || value == 'none') {
        setIsNone(value);
      }
    }
    switch (value) {
      case 'none':
        return <em>总计</em>;
      case 'empty':
        return <em>空值 0</em>;
      case 'filled':
        return <em>已填写 0</em>;
      case 'unique':
        return <em>唯一值 0</em>;
      case 'percentEmpty':
        return <em>空值 33.33%</em>;
      case 'percentFilled':
        return <em>已填写 33.33%</em>;
      case 'percentUnique':
        return <em>唯一值 33.33%</em>;
      default:
        return <em>总计</em>;
    }
  };

  return (
    <CellRoot sx={{ width: cellWidth }}>
      {isPrimary && (
        <Typography
          sx={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontSize: '12px',
            flex: 'none',
            height: '100%',
            overflow: 'hidden',
            alignItems: 'center',
            display: 'flex',
            maxWidth: '120px',
          }}
        >{`${rowIds.size} 条记录`}</Typography>
      )}
      <Select
        sx={{
          flex: 'auto',
          border: 'none',
          alignSelf: 'flex-end',
          height: '100%',
          opacity: isNone !== 'none' ? 1 : 0,
          backgroundColor: isNone !== 'none' ? 'rgba(0,0,0,0.05)' : 'inherit',
          borderRadius: 0,
          '&:hover': {
            opacity: 1,
            backgroundColor: 'rgba(0,0,0,0.05)',
          },
          '& .MuiSelect-select': {
            padding: '2px 8px 4px 6px',
            alignSelf: 'flex-end',
          },
        }}
        variant="standard"
        defaultValue="none"
        renderValue={handleRenderTotal}
        disableUnderline
      >
        <MenuItem value="none">
          <em>none</em>
        </MenuItem>
        <MenuItem value="empty">空值</MenuItem>
        <MenuItem value="filled">已填写</MenuItem>
        <MenuItem value="unique">非重复唯一值</MenuItem>
        <MenuItem value="percentEmpty">空值占比</MenuItem>
        <MenuItem value="percentFilled">已填写占比</MenuItem>
        <MenuItem value="percentUnique">唯一值占比</MenuItem>
      </Select>
    </CellRoot>
  );
};
export default SummaryCell;
