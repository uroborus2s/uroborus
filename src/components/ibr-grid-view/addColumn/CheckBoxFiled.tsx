import { CheckboxOptions } from '@/domain/types';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { FiledComponentProps } from '../types';
import { CheckBoxFiledIcon, FiledOptionRoot, iColors } from './OptionRoot';

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
        {Object.entries(iColors).map(([colorKey, colorHex], i1) =>
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
