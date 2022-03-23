import BasicSelect from '@/components/ibr-select/BasicSelect';
import {
  DurationFormat,
  TimeDurationOptions,
  DurationFormatType,
} from '@/domain/types';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { FC } from 'react';
import { FiledComponentProps } from '../types';
import { FiledOptionRoot } from './OptionRoot';

const TimeDurationFiled: FC<FiledComponentProps<TimeDurationOptions>> = ({
  setParameters,
  parameters,
}) => {
  return (
    <FiledOptionRoot>
      <FormControl variant="standard" sx={{ paddingRight: '1rem' }}>
        <InputLabel
          sx={{ fontSize: '14px', transform: 'scale(1)' }}
          shrink
          htmlFor="durationformat-of-column-filed"
        >
          持续时间单位
        </InputLabel>
        <BasicSelect
          id="durationformat-of-column-filed"
          value={parameters.durationFormat}
          onChange={(event) => {
            setParameters((p) => ({
              ...p,
              durationFormat: event.target.value as DurationFormatType,
            }));
          }}
        >
          {Object.entries(DurationFormat).map(([d, dName], index) => (
            <MenuItem key={index} value={d}>
              {dName}
            </MenuItem>
          ))}
        </BasicSelect>
      </FormControl>
    </FiledOptionRoot>
  );
};

export default TimeDurationFiled;
