import BasicSelect from '@/components/ibr-select/BasicSelect';
import IosSwitch from '@/components/ibr-switch/IosSwitch';
import { CurrencySymbol, NumberOptions } from '@/domain/types';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import styled from '@mui/styles/styled';
import { FC } from 'react';
import { useEffect } from 'react-transition-group/node_modules/@types/react';
import { FiledComponentProps } from '../types';
import { FiledOptionRoot } from './OptionRoot';

const NegativeOptionCol = styled('div')({
  display: 'flex',
  padding: '0.5rem 0',
  alignItems: 'center',
});

const NumberFiled: FC<
  FiledComponentProps<NumberOptions> & { format: string }
> = ({ setParameters, parameters, format }) => {
  useEffect(() => {
    let currency = undefined;
    if (format === 'currency') currency = CurrencySymbol[0];
    setParameters((p) => ({ ...p, format: format, symbol: currency }));
  }, []);

  return (
    <FiledOptionRoot>
      {format === 'currency' && (
        <FormControl variant="standard">
          <InputLabel
            sx={{ fontSize: '14px', transform: 'scale(1)' }}
            shrink
            htmlFor="data-dateformat-of-column-filed"
          >
            货币符号
          </InputLabel>
          <BasicSelect
            id="data-dateformat-of-column-filed"
            value={parameters.symbol ?? CurrencySymbol[0]}
            onChange={(event) => {
              console.log(event.target.value);
              console.log(typeof event.target.value);
              setParameters((p) => ({
                ...p,
                precision: event.target.value as number,
              }));
            }}
          >
            {CurrencySymbol.map((sym, index) => (
              <MenuItem key={index} value={sym}>
                {sym}
              </MenuItem>
            ))}
          </BasicSelect>
        </FormControl>
      )}
      <FormControl variant="standard">
        <InputLabel
          sx={{ fontSize: '14px', transform: 'scale(1)' }}
          shrink
          htmlFor="data-dateformat-of-column-filed"
        >
          数字精度
        </InputLabel>
        <BasicSelect
          id="data-dateformat-of-column-filed"
          value={parameters.precision}
          onChange={(event) => {
            console.log(event.target.value);
            console.log(typeof event.target.value);
            setParameters((p) => ({
              ...p,
              precision: event.target.value as number,
            }));
          }}
        >
          {precisionItem.map((prec, index) => (
            <MenuItem key={index} value={prec}>
              {prec ? '1.'.padEnd(prec + 2, '0') : '1'}
            </MenuItem>
          ))}
        </BasicSelect>
      </FormControl>
      <NegativeOptionCol>
        <IosSwitch
          checked={parameters.negative}
          onChange={(event, checked) => {
            setParameters((pstate) => ({ ...pstate, negative: checked }));
            event.preventDefault();
            event.stopPropagation();
          }}
        />
        <Typography sx={{ opacity: 0.8, marginLeft: '0.25rem' }}>
          允许负数
        </Typography>
      </NegativeOptionCol>
      <Typography
        sx={{
          marginTop: '0.5rem',
          marginBottom: '0.25rem',
          fontWeight: 500,
          opacity: 0.75,
        }}
      >
        默认值<span style={{ fontSize: '11px', opacity: 0.5 }}>(选填)</span>
      </Typography>
      <Input
        sx={{
          width: '100%',
          borderRadius: '3px',
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: 'rgba(0,0,0,0.05)',
          paddingTop: 0,
          paddingBottom: 0,
          backgroundColor: 'inherit',
          '&.Mui-focused': { borderColor: 'rgba(0,0,0,0.25)' },
        }}
        value={parameters.default ?? ''}
        onChange={(event) => {
          setParameters((p) => ({ ...p, default: event.target.value }));
        }}
        placeholder="默认值填入新单元格"
        disableUnderline
      />
    </FiledOptionRoot>
  );
};

export default NumberFiled;

const precisionItem = [0, 1, 2, 3, 4, 5, 6];
