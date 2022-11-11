import { FC, memo, PropsWithChildren } from 'react';
import { useRecoilValue } from 'recoil';
import { gridContext } from '@/hooks/core/useCreatContext';

const GridBodyComp: FC<PropsWithChildren> = () => {
  const {} = useRecoilValue(gridContext);
};

export default memo(GridBodyComp);
