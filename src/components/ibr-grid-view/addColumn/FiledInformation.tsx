import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { FiledComponentProps } from '../types';

const FiledInformation: FC<FiledComponentProps & { text: string }> = ({
  text,
}) => {
  return (
    <Typography sx={{ opacity: 0.7, padding: '1rem 0 0.5rem 0' }}>
      {text}
    </Typography>
  );
};

export default FiledInformation;
