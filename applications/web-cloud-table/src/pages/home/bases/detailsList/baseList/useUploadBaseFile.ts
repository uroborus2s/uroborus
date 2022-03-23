import { BlankIcon, IconColorTypeArr } from '@/core/util';
import { CREATBASEBYFILE, useDispath } from '@/domain';
import { history } from 'umi';
import { useCallback } from 'react';

export default function (workspaceId: string, onClose?: () => void) {
  const { run, loading } = useDispath(CREATBASEBYFILE, { manual: true });
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const fileName = acceptedFiles[0].name;
    // Do something with the files
    const flie = acceptedFiles[0];
    run({
      data: {
        baseColor: IconColorTypeArr[Math.round(Math.random() * 20)],
        workspace_id: workspaceId,
        file: flie,
        base_name: fileName.slice(0, fileName.lastIndexOf('.')),
        baseIcon: BlankIcon,
      },
    }).then((res) => {
      if (onClose) onClose();
      console.log(res);
      history.push(`/application/${res.response.data.new_base_id}`);
    });
  }, []);

  return { loading, onDrop };
}
