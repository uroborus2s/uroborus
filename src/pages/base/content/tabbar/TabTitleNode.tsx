import { FC, memo } from 'react';

interface TabTitleNodeProps {
  name: string;
  active: boolean;
}

const TabTitleNode: FC<TabTitleNodeProps> = ({ name, active }) => {
  console.log(name, active);
  return <div>{name}</div>;
};

export default memo(TabTitleNode);
