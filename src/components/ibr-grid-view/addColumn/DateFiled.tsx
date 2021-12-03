import BasicSelect from '@/components/ibr-select/BasicSelect';
import { DateOptions } from '@/domain/types';
import { FiledComponentProps } from '@ibr/ibr-grid-view/types';
import IosSwitch from '@ibr/ibr-switch/IosSwitch';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import styled from '@mui/styles/styled';
import dayjs from 'dayjs';
import { FC, memo, useLayoutEffect } from 'react';

const Root = styled('div')({ padding: '0.5rem 0' });

const TimeSelect = styled('div')({
  marginTop: '1rem',
  display: 'flex',
  marginBottom: '1rem',
});

const DateFiled: FC<FiledComponentProps<DateOptions>> = ({
  setParameters,
  parameters,
}) => {
  useLayoutEffect(() => {
    if (!parameters.dateFormat) {
      setParameters((p) => ({ ...p, dateFormat: 'ZH', isDateTime: false }));
    }
  }, []);

  return (
    <Root>
      <Typography
        sx={{ opacity: 0.7, marginBottom: '0.5rem', fontSize: '13px' }}
      >
        输入日期(例如:2018年11月12日)或从日历中选择日期。
      </Typography>
      <FormControl variant="standard">
        <InputLabel
          sx={{ fontSize: '14px', transform: 'scale(1)' }}
          shrink
          htmlFor="data-dateformat-of-column-filed"
        >
          日期格式
        </InputLabel>
        <BasicSelect
          id="data-dateformat-of-column-filed"
          value={parameters.dateFormat ?? 'ZH'}
          onChange={(event) => {
            setParameters((p) => ({ ...p, dateFormat: event.target.value }));
          }}
        >
          <MenuItem value="ZH">
            {dayjs().locale('zh-cn').format('[年/月/日（]L[)]')}
          </MenuItem>
          <MenuItem value="ZHL">
            {dayjs().locale('zh-cn').format('[年月日（]LL[)]')}
          </MenuItem>
          <MenuItem value="US">{dayjs().format('[月/日/年（]L[)]')}</MenuItem>
          <MenuItem value="USL">
            {dayjs().format('[月 日, 年（]LL[)]')}
          </MenuItem>
          <MenuItem value="ISO">
            {dayjs().format('[年-月-日（]YYYY-MM-DD[)]')}
          </MenuItem>
        </BasicSelect>
      </FormControl>
      <TimeSelect>
        <IosSwitch
          checked={parameters.isDateTime ?? false}
          onChange={(event, checked) => {
            setParameters((pstate) => ({ ...pstate, isDateTime: checked }));
            event.preventDefault();
            event.stopPropagation();
          }}
        />
        <Typography
          sx={{ opacity: 0.8, marginLeft: '0.25rem', fontSize: '12px' }}
        >
          显示时间
        </Typography>
      </TimeSelect>
      {parameters.isDateTime && (
        <FormControl variant="standard">
          <InputLabel
            sx={{ fontSize: '14px', transform: 'scale(1)' }}
            shrink
            htmlFor="data-dateformat-of-column-filed"
          >
            时间格式
          </InputLabel>
          <BasicSelect
            id="data-dateformat-of-column-filed"
            value={parameters.timeFormat}
            defaultValue="12"
            onChange={(event) => {
              setParameters((p) => ({
                ...p,
                timeFormat: event.target.value,
                timeZone: 'UTC',
              }));
            }}
          >
            <MenuItem value="12">12小时</MenuItem>
            <MenuItem value="24">24小时</MenuItem>
          </BasicSelect>
        </FormControl>
      )}
    </Root>
  );
};

export default memo(DateFiled);
