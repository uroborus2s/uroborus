import { iconColors } from '@/core/util';
import { base } from '@/domain';
import { table } from '@/domain/table/table.repository';
import AddTableInList from './tabbar/AddTableInList';
import AddTableInTab from './tabbar/AddTableInTab';
import { BaseIdContext } from '../BaseMainPage';
import TabTitleNode from './tabbar/TabTitleNode';
import { Tab } from '@ibr/ibr-tabs';
import Tabs from '@ibr/ibr-tabs/Tabs';
import styled from '@mui/material/styles/styled';
import React, { FC, useContext } from 'react';
import { useRecoilValue } from 'recoil';

interface StyledProps {
  backgroundColor: string;
  color: string;
}

interface ShareButtonProps {
  ownerState: { color: string; textColor: string };
}

const getStyled = ({ backgroundColor, color }: StyledProps) => ({
  flex: 'auto',
  width: '100%',
  '& .IuiTabs-tabHeader': { backgroundColor: backgroundColor },
  '& .IuiTabs-tabNav': {
    height: '30px',
  },
  '& .IuiTabs-tabNode': {
    color: color,
  },
  '& .IuiTabs-tabActive': { color: 'hsl(0,0%,20%)' },
  '& .IuiTabs-operation': { color: color },
  '& .IuiTabs-addButton': { color: color },
});

const ShareButtonRoot = styled('div')<ShareButtonProps>(({ ownerState }) => ({
  marginLeft: '12px',
  opacity: 0.75,
  '&:hover': { opacity: 1 },
  borderRadius: '9999px',
  cursor: 'pointer',
  padding: '0 1.2rem',
  fontSize: '12px',
  lineHeight: '1.5',
  letterSpacing: '0.1rem',
  fontWeight: 500,
  color: ownerState.textColor,
  backgroundColor: ownerState.color,
}));

const ShareButton: FC<ShareButtonProps> = (props) => {
  return <ShareButtonRoot {...props}>分享</ShareButtonRoot>;
};

const BaseContainer: FC = () => {
  const baseId = useContext(BaseIdContext);

  const tableIds = useRecoilValue(base.tableIds(baseId));
  const allTables = useRecoilValue(table.allTables(tableIds));
  const color = useRecoilValue(base.color(baseId));
  const isLight = Object.entries(iconColors)
    .find(([, value]) => value == color)![0]
    .trim()
    .endsWith('Light');
  const fontColor = isLight ? 'hsl(0,0%,20%)' : '#fff';
  const shareTextColor = isLight ? '#d1f7c4' : '#7c39ed';

  return (
    <Tabs
      sx={getStyled({ backgroundColor: color, color: fontColor })}
      type="editable-card"
      tabBarGutter={3}
      tabBarExtraContent={
        <ShareButton
          ownerState={{ color: fontColor, textColor: shareTextColor }}
        />
      }
      addIcon={<AddTableInTab />}
      moreAddIcon={<AddTableInList />}
    >
      {allTables.map((tableInfo) => (
        <Tab
          key={tableInfo.id}
          tab={<TabTitleNode name={tableInfo.name} active />}
        />
      ))}
    </Tabs>
  );
};

export default BaseContainer;
