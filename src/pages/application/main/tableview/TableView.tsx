import React, { Ref } from 'react';
import Tabs, { Tab, TabColorRefHandler } from '@ibr/ibr-tab';
import {
  cssFlex,
  cssFlexiCenter,
  CSSPrefixRequiredProps,
  getViewTypeIcon,
} from '@/util';
import './view.scss';
import TableRightButtons from '@/pages/application/main/tableview/TableRightButtons';
import { FaCaretDown } from 'react-icons/fa';
import Icon from '@ibr/ibr-icon/Icon';
import classNames from 'classnames';
import ViewPage from '@/pages/views/ViewPage';
import useViewTabColor from '@/pages/application/hook/useViewTabColor';
import { useGetCurrentView } from '@/api/hooks/ViewService';
import { useGetCurrenTable } from '@/api';
import { tableState } from '@/models/tableState';
import { useRecoilValue } from 'recoil';
import { useFetchView, viewState } from '@/models/view-mode';

const TableView: React.FC<CSSPrefixRequiredProps> = ({ prefixCls }) => {
  const prefix = `${prefixCls}-table-view`;
  const { refreshView, loading: viewLoading, setLoading } = useFetchView();

  const { viewSort, loading: tableLoading, lastUsedViewId } = useGetCurrenTable(
    refreshView,
  );
  const cols = useRecoilValue(viewState.columnsOrder);
  console.log(cols);
  console.log('render view', lastUsedViewId, viewSort);

  const { tabActionRef, activeFontColor, fontColor } = useViewTabColor(
    viewSort,
  );
  console.log(tabActionRef);

  const handleChangeClick = useGetCurrentView(refreshView, setLoading);

  console.log(tableLoading, viewLoading);
  if (tableLoading || viewLoading) return <div>loading....</div>;

  console.log('render view succ', lastUsedViewId);

  const tabPanes: Tab[] = viewSort.map((viewId) => ({
    tab: viewNode(viewId, activeFontColor, fontColor),
    tabKey: viewId,
    paneNode: <ViewPage viewId={viewId} loading={viewLoading} />,
  }));

  const extra = {
    right: <TableRightButtons prefixCls={prefix} fontColor={fontColor} />,
  };

  if (!tabPanes || tabPanes.length == 0) {
    return null;
  }

  return (
    <Tabs
      tabPanes={tabPanes}
      className={prefix}
      tabNavClassName={`${prefix}-nav`}
      hasDropdown
      type="editable-card"
      tabBarExtraContent={extra}
      animated={false}
      tabBarGutter={2}
      key={`tabviews-${lastUsedViewId}`}
      tabPanesClassName={`${prefix}-pane`}
      ref={tabActionRef as Ref<TabColorRefHandler>}
      activeKey={lastUsedViewId}
      onTabClick={handleChangeClick}
    />
  );
};

const viewNode = (
  viewId: string,
  activeFontColor: string,
  fontColor: string,
  // eslint-disable-next-line react/display-name
) => (active?: boolean) => {
  const viewName = tableState.useViewNameFromId(viewId);
  const viewType = tableState.useViewTypeFromId(viewId);

  return (
    <div className={classNames(cssFlex, cssFlexiCenter)}>
      <Icon
        icon={getViewTypeIcon(viewType)}
        colorName={active ? activeFontColor : fontColor}
        size={12}
      />
      <span>{viewName}</span>
      {active && <Icon icon={FaCaretDown} margin={0} />}
    </div>
  );
};

export default TableView;
