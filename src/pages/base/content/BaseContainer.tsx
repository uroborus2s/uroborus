import { iconColors } from '@/core/util';
import { base, EDITBASE, useDispath } from '@/domain';
import { table } from '@/domain/table/table.repository';
import {
  BaseIdContext,
  currentEditTableIdState,
} from '@/pages/base/BaseContext';
import { Tab, TabHandle } from '@ibr/ibr-tabs';
import Tabs from '@ibr/ibr-tabs/Tabs';
import styled from '@mui/material/styles/styled';
import React, { FC, Ref, useContext, useRef } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import AddTableInList from './tabbar/AddTableInList';
import AddTableInTab from './tabbar/AddTableInTab';
import TabTitleNode from './tabbar/TabTitleNode';
import TablePage from './table/TablePage';

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
  '& .IuiTabs-moreButton': { color: color },
  '& .IuiTabs-scrollButtons': {
    '&.IuiTabs-scrollButton-start': {
      backgroundImage: `linear-gradient(to left, rgba(255,234,182,0), ${backgroundColor})`,
    },
    '&.IuiTabs-scrollButton-end': {
      backgroundImage: `linear-gradient(to right, rgba(255,234,182,0), ${backgroundColor})`,
    },
    '& > svg': {
      color: color,
      opacity: color === '#fff' ? 0.75 : 0.5,
      '&:hover': {
        opacity: 1,
      },
    },
  },
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

//表格页面的主内容页面
const BaseContainer: FC = () => {
  const baseId = useContext(BaseIdContext);

  const tableIds = useRecoilValue(base.tableIds(baseId));

  const allTables = useRecoilValue(table.allTables([...tableIds]));
  const color = useRecoilValue(base.color(baseId));
  const lastUsedTableId = useRecoilValue(base.lastUsedTableId(baseId));

  const isLight = Object.entries(iconColors)
    .find(([, value]) => value == color)![0]
    .trim()
    .endsWith('Light');
  const fontColor = isLight ? 'hsl(0,0%,20%)' : '#fff';
  const shareTextColor = isLight ? '#d1f7c4' : '#7c39ed';

  const { run } = useDispath(EDITBASE, { manual: true });

  const tableActiveHandle = useRef<TabHandle>();

  const activateTabAndEdit = useRecoilCallback(
    ({ set }) =>
      (id: string) => {
        if (id && tableActiveHandle.current) {
          tableActiveHandle.current.activeTab(id);
          set(currentEditTableIdState, id);
        }
      },
    [],
  );

  return (
    <Tabs
      ref={tableActiveHandle as Ref<TabHandle>}
      activeKey={lastUsedTableId}
      sx={getStyled({ backgroundColor: color, color: fontColor })}
      type="editable-card"
      tabBarGutter={3}
      tabBarExtraContent={
        <ShareButton
          ownerState={{ color: fontColor, textColor: shareTextColor }}
        />
      }
      addIcon={
        <AddTableInTab
          style={{ color: fontColor }}
          activateTabAndEditFun={activateTabAndEdit}
        />
      }
      moreAddIcon={
        <AddTableInList activateTabAndEditFun={activateTabAndEdit} />
      }
      onTabClick={(activeKey, prevActiveKey) => {
        if (activeKey !== prevActiveKey)
          run({
            path: { id: baseId },
            data: { selected_table_id: activeKey },
          }).then();
      }}
    >
      {allTables.map((tableInfo) => (
        <Tab
          key={tableInfo.id}
          tab={
            <TabTitleNode
              id={tableInfo.id}
              name={tableInfo.name}
              active
              activateTabAndEditFun={activateTabAndEdit}
            />
          }
        >
          <TablePage tableId={tableInfo.id} />
        </Tab>
      ))}
    </Tabs>
  );
};

export default BaseContainer;
