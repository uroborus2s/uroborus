import { CheckboxOptions } from '@/domain/types';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { FiledComponentProps } from '../types';
import { FiledOptionRoot } from './OptionRoot';

const CheckBoxFiled: FC<FiledComponentProps<CheckboxOptions>> = ({
  parameters,
  setParameters,
}) => {
  const { color, icon } = parameters;

  return (
    <FiledOptionRoot>
      <Typography sx={{ opacity: 0.75 }}>
        您可以选中或取消选中的复选框
      </Typography>
      <Typography
        sx={{
          marginTop: '0.5rem',
          marginBottom: '0.25rem',
          fontWeight: 500,
          opacity: 0.75,
        }}
      >
        勾选样式
      </Typography>
      <Select
        disableUnderline
        sx={{
          padding: 0,
          backgroundColor: '#fff',
          boxShadow: '0 0 0 2px rgb(0 0 0 / 10%)',
          borderRadius: '3px',
          '&:focus,&:hover': {
            boxShadow: '0 0 0 2px rgb(0 0 0 / 25%)',
          },
          '& .MuiSelect-icon': {
            top: 'calc(50% - 12px)',
          },
        }}
        variant="standard"
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
              gridTemplateColumns: 'repeat(5,36px)',
              gridTemplateRows: 'repeat(10,36px)',
              alignItems: 'center',
              justifyItems: 'center',
            },
            '& .MuiMenu-paper': {
              width: '180px',
            },
          },
        }}
        value={`${color}:${icon}`}
        onChange={(e) => {
          e.stopPropagation;
          const [newColor, newIcon] = e.target.value.split(':', 2);
          setParameters((p) => ({ ...p, color: newColor, icon: newIcon }));
        }}
      >
        {Object.entries(iColors)
          .slice(0, 11)
          .map(([colorKey, colorHex], i1) =>
            Object.entries(CheckBoxFiledIcon).map(([iconKey, iconHex], i2) => (
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
      </Select>
    </FiledOptionRoot>
  );
};

export default CheckBoxFiled;

const CheckBoxFiledIcon = {
  check:
    'M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z',
  star: 'M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z',
  heart:
    'M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z',
  thumbsUp:
    'M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z',
  flag: 'M14.4,6L14,4H5V21H7V14H12.6L13,16H20V6H14.4Z',
};

export const iColors: Record<string, string> = {
  green: 'rgb(32, 201, 51)', //红色
  teal: 'rgb(32, 217, 210)', //橙色
  cyan: 'rgb(24, 191, 255)', //黄色
  blue: 'rgb(45, 127, 249)', //绿色
  purple: 'rgb(139, 70, 255)', //蓝绿色
  pink: 'rgb(255, 8, 194)', //青色
  red: 'rgb(248, 43, 96)', //蓝色
  orange: 'rgb(255, 111, 44)', //粉色
  yellow: 'rgb(252, 180, 0)', //紫色
  gray: 'rgb(102, 102, 102)', //灰色
};
