import BasicSelect from '@/components/ibr-select/BasicSelect';
import IosSwitch from '@/components/ibr-switch/IosSwitch';
import {
  CurrencyDisplay,
  CurrencyDisplayType,
  CurrencySymbol,
  CurrencySymbolType,
  NumberOptions,
} from '@/domain/types';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import styled from '@mui/styles/styled';
import { FC } from 'react';
import { FiledComponentProps } from '../types';
import { FiledOptionRoot } from './OptionRoot';

const NegativeOptionCol = styled('div')({
  display: 'flex',
  padding: '0.5rem 0',
  alignItems: 'center',
});

const CurrencyRoot = styled('div')({
  display: 'flex',
  padding: '0.5rem 0',
  alignItems: 'center',
});

const NumberFiled: FC<FiledComponentProps<NumberOptions>> = ({
  setParameters,
  parameters,
}) => {
  console.log(parameters);

  return (
    <FiledOptionRoot>
      <NegativeOptionCol>
        <IosSwitch
          checked={parameters.useGrouping}
          onChange={(event, checked) => {
            setParameters((pstate) => ({ ...pstate, useGrouping: checked }));
            event.preventDefault();
            event.stopPropagation();
          }}
        />
        <Typography sx={{ opacity: 0.8, marginLeft: '0.25rem' }}>
          是否使用千分位分割
        </Typography>
      </NegativeOptionCol>
      {parameters.style === 'currency' && (
        <CurrencyRoot>
          <FormControl variant="standard" sx={{ paddingRight: '1rem' }}>
            <InputLabel
              sx={{ fontSize: '14px', transform: 'scale(1)' }}
              shrink
              htmlFor="currency-of-column-filed"
            >
              货币显示格式
            </InputLabel>
            <BasicSelect
              style={{ minWidth: '32px' }}
              id="currency-of-column-filed"
              value={parameters.currencyDisplay}
              onChange={(event) => {
                console.log(event.target.value);
                console.log(typeof event.target.value);
                setParameters((p) => ({
                  ...p,
                  currencyDisplay: event.target.value as CurrencyDisplayType,
                }));
              }}
            >
              {Object.entries(CurrencyDisplay).map(([t, tName], index) => (
                <MenuItem key={index} value={t}>
                  {tName}
                </MenuItem>
              ))}
            </BasicSelect>
          </FormControl>
          <FormControl variant="standard">
            <InputLabel
              sx={{ fontSize: '14px', transform: 'scale(1)' }}
              shrink
              htmlFor="currency-code-of-column-filed"
            >
              货币种类
            </InputLabel>
            <BasicSelect
              style={{ minWidth: '128px', paddingLeft: '1rem' }}
              id="currency-code-of-column-filed"
              value={parameters.currency}
              onChange={(event) => {
                console.log(event.target.value);
                console.log(typeof event.target.value);
                setParameters((p) => ({
                  ...p,
                  currency: event.target.value as CurrencySymbolType,
                }));
              }}
            >
              {Object.entries(CurrencySymbol).map(([code, name], index) => (
                <MenuItem key={index} value={code}>
                  {name}
                </MenuItem>
              ))}
            </BasicSelect>
          </FormControl>
        </CurrencyRoot>
      )}
      {parameters.style !== 'currency' && (
        <FormControl variant="standard">
          <InputLabel
            sx={{ fontSize: '14px', transform: 'scale(1)' }}
            shrink
            htmlFor="precision-numberformat-of-column-filed"
          >
            数字精度
          </InputLabel>
          <BasicSelect
            id="precision-numberformat-of-column-filed"
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
      )}
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
        placeholder="新单元格默认值"
        disableUnderline
      />
    </FiledOptionRoot>
  );
};

export default NumberFiled;

const precisionItem = [0, 1, 2, 3, 4, 5, 6];
