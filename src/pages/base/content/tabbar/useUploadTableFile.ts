import { CREATTABLEBYFILE, useDispath } from '@/domain';
import { useCallback } from 'react';

export default function (baseId: string, onClose?: () => void) {
  const { run, loading } = useDispath(CREATTABLEBYFILE, { manual: true });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const fileName = acceptedFiles[0].name;
    // Do something with the files
    const flie = acceptedFiles[0];
    run({
      data: {
        base_id: baseId,
        file: flie,
        table_name: fileName.slice(0, fileName.lastIndexOf('.')),
      },
    }).then((res) => {
      if (onClose) onClose();
      console.log(res);
    });
  }, []);

  return { loading, onDrop };
}
