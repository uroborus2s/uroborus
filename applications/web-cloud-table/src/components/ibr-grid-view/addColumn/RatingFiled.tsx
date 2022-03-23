import BasicSelect from '@/components/ibr-select/BasicSelect';
import { RatingOptions } from '@/domain/types';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import SvgIcon from '@mui/material/SvgIcon';
import { FC } from 'react';
import { FiledComponentProps } from '../types';
import { CheckBoxFiledIcon, FiledOptionRoot, iColors } from './OptionRoot';

const RatingFiled: FC<FiledComponentProps<RatingOptions>> = ({
  parameters,
  setParameters,
}) => {
  const { color, icon } = parameters;

  return (
    <FiledOptionRoot className="flex">
      <FormControl variant="standard" sx={{ paddingRight: '3rem' }}>
        <InputLabel
          sx={{ fontSize: '14px', transform: 'scale(1)' }}
          shrink
          htmlFor="style-rating-of-column-filed"
        >
          样式
        </InputLabel>
        <BasicSelect
          style={{ minWidth: '24px' }}
          id="style-rating-of-column-filed"
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
            sx: {
              '& .MuiMenu-list': {
                width: '180px',
                borderRadius: '3px',
                padding: 0,
                display: 'grid',
                gridTemplateColumns: 'repeat(4,36px)',
                gridTemplateRows: 'repeat(10,36px)',
                alignItems: 'center',
                justifyItems: 'center',
              },
              '& .MuiMenu-paper': {
                width: '144px',
              },
            },
          }}
          value={`${color}:${icon}`}
          onChange={(e) => {
            e.stopPropagation;
            const [newColor, newIcon] = (e.target.value as string).split(
              ':',
              2,
            );
            setParameters((p) => ({ ...p, color: newColor, icon: newIcon }));
          }}
        >
          {Object.entries(iColors).map(([colorKey, colorHex], i1) =>
            Object.entries(CheckBoxFiledIcon)
              .slice(0, 4)
              .map(([iconKey, iconHex], i2) => (
                <MenuItem
                  disableRipple
                  disableTouchRipple
                  data-color={colorKey}
                  data-icon={iconKey}
                  key={`${i1}_${i2}`}
                  value={`${colorKey}:${iconKey}`}
                  sx={{
                    padding: 0,
                    width: '36px',
                    height: '36px',
                    justifyContent: 'center',
                  }}
                >
                  <SvgIcon viewBox="0 0 24 24" sx={{ fontSize: '16px' }}>
                    <path d={iconHex} fill={colorHex} />
                  </SvgIcon>
                </MenuItem>
              )),
          )}
        </BasicSelect>
      </FormControl>
      <FormControl variant="standard">
        <InputLabel
          sx={{ fontSize: '14px', transform: 'scale(1)' }}
          shrink
          htmlFor="rating-maxnumber-of-column-filed"
        >
          最大值
        </InputLabel>
        <BasicSelect
          style={{ minWidth: '24px', paddingLeft: '1rem' }}
          id="rating-maxnumber-of-column-filed"
          value={parameters.max}
          onChange={(event) => {
            setParameters((p) => ({
              ...p,
              max: event.target.value as number,
            }));
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num, index) => (
            <MenuItem key={index} value={num}>
              {num}
            </MenuItem>
          ))}
        </BasicSelect>
      </FormControl>
    </FiledOptionRoot>
  );
};

export default RatingFiled;
