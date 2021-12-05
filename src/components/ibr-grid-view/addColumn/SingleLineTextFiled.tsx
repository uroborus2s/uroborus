import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { FiledComponentProps } from '../types';
import { FiledOptionRoot } from './OptionRoot';

const SingleLineTextFiled: FC<FiledComponentProps> = ({
  parameters,
  setParameters,
}) => {
  return (
    <FiledOptionRoot>
      <Typography sx={{ opacity: 0.75 }}>
        单行文本。您可以选择使用默认值填充单元格：
      </Typography>
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

export default SingleLineTextFiled;
