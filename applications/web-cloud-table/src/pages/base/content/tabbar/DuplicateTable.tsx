import { DUPLIACTETABLE, useDispath } from '@/domain';
import { BaseIdContext } from '@/pages/base/BaseContext';
import { CancelButton, ConfimButtonGroups } from '@ibr/ibr-dialog/PopDialog';
import LoadingButton from '@ibr/ibr-loading/LoadingButton';
import IosSwitch from '@ibr/ibr-switch/IosSwitch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import { FC, useContext, useState } from 'react';

interface DupliacteDialogProps {
  onClose?: () => void;
  name: string;
  id: string;
  activateTabAndEditFun: (id: string) => void;
}

const DupliacteTable: FC<DupliacteDialogProps> = ({
  name,
  id,
  onClose,
  activateTabAndEditFun,
}) => {
  const { run, loading } = useDispath(DUPLIACTETABLE, { manual: true });

  const [shouldCopy, setShouldCopy] = useState(false);

  const baseId = useContext(BaseIdContext);
  return (
    <>
      <Typography
        sx={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 500 }}
      >
        拷贝〖 <strong>{name}</strong> 〗
      </Typography>
      <FormControlLabel
        sx={{ margin: '0 0 2rem 0' }}
        control={
          <IosSwitch
            disableRipple
            checked={shouldCopy}
            onChange={(event, checked) => {
              setShouldCopy(checked);
              event.preventDefault();
              event.stopPropagation();
            }}
          />
        }
        label="同时复制表格的所有记录"
      />
      <ConfimButtonGroups>
        <CancelButton variant="text" onClick={onClose} href="">
          取消
        </CancelButton>
        <LoadingButton
          loading={loading}
          variant="contained"
          onClick={() => {
            run({
              path: { id: id },
              data: {
                name: name.concat(' 备份'),
                should_copy_records: shouldCopy,
                base_id: baseId,
              },
            }).then((res) => {
              if (onClose) onClose();
              const id = res.request.params.tableId;
              if (id) activateTabAndEditFun(id);
            });
          }}
          titleNode="复制一份"
        />
      </ConfimButtonGroups>
    </>
  );
};

export default DupliacteTable;
