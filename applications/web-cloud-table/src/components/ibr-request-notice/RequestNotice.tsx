import React, { useEffect, useRef } from 'react';
import { CircularProgress, Portal } from '@material-ui/core';
import { useRecoilState, useRecoilValue } from 'recoil';
import { reqError, reqLoading, reqSuccess } from '@/servers';

const RequestNotice: React.FC = () => {
  const loading = useRecoilValue(reqLoading);
  const error = useRecoilValue(reqError);
  const [success, setSuccess] = useRecoilState(reqSuccess);
  const timeId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (success) {
      timeId.current?.unref();
      timeId.current = setTimeout(() => {
        setSuccess(false);
      }, 500);
    }
    return () => {
      timeId.current?.unref();
    };
  });

  return (
    <Portal>
      {loading && (
        <span>
          保存中......
          <CircularProgress />
        </span>
      )}
      {error && <span>{error}</span>}
      {success && <span>所有更改已保存!</span>}
    </Portal>
  );
};
export default RequestNotice;
