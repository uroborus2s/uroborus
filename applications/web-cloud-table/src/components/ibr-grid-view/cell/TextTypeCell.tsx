import { FC, memo } from 'react';
import { CellComponentProps } from '@ibr/ibr-grid-view/types';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';

const TextTypeCell: FC<CellComponentProps> = ({ type, cellValue, mode }) => {
  return mode === 'display' ? <Typography>{cellValue}</Typography> : <Input />;
};

export default memo(TextTypeCell);
