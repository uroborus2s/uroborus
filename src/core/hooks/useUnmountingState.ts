import { useEffect, useRef } from 'react';

//组件是否卸载标志，当返回true时，组件已经卸载
export default function () {
  const isUnMounting = useRef(false);
  useEffect(
    () => () => {
      isUnMounting.current = true;
    },
    [],
  );

  return isUnMounting.current;
}
