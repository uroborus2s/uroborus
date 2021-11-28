import Typography from '@mui/material/Typography';
import { Dispatch, FC, SetStateAction } from 'react';

const SingleSelectFiled: FC<{ setParameters: Dispatch<SetStateAction<{}>> }> =
  ({ setParameters }) => {
    return (
      <div style={{ padding: '0.5rem 0' }}>
        <Typography sx={{ opacity: 0.75 }}>
          单选列表允许您从下拉列表中选择单一选项。
        </Typography>
      </div>
    );
  };

export default SingleSelectFiled;
