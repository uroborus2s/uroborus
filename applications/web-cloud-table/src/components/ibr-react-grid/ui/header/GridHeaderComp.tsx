import { memo, useRef } from 'react';

const GridHeaderComp = () => {
  const eRoot = useRef<HTMLDivElement>(null);

  return <div ref={eRoot}></div>;
};

export default memo(GridHeaderComp);
