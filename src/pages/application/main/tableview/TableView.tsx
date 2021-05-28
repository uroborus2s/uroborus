import React, { useEffect, useLayoutEffect } from 'react';
import Tabs, { Tab } from '@ibr/ibr-tab';
import {
  BaseColors,
  cssFlex,
  cssFlexiCenter,
  CSSPrefixRequiredProps,
  getIconTypeColor,
  getInvertOfFontColor,
  getViewTypeIcon,
  transformInverseColorOfSystem,
} from '@/util';
import './view.scss';
import { useRecoilValue } from 'recoil';
import {
  LastTableIdsUsed,
  SortTiebreakerKey,
  UsedApplication,
  ViewSchemaMode,
  ViewSchemas,
} from '@/models';
import TableRightButtons from '@/pages/application/main/tableview/TableRightButtons';
import { FaCaretDown } from 'react-icons/fa';
import Icon from '@ibr/ibr-icon/Icon';
import classNames from 'classnames';
import ViewPage from '@/pages/views/ViewPage';

interface TableViewProps extends CSSPrefixRequiredProps {}

const TableView: React.FC<TableViewProps> = ({ prefixCls }) => {
  const prefix = `${prefixCls}-table-view`;
  const appId = useRecoilValue(SortTiebreakerKey);

  const tableId = useRecoilValue(LastTableIdsUsed).get(appId);
  const app = useRecoilValue(UsedApplication);
  //当前颜色的类型
  const appColor = getIconTypeColor(app.color);
  //当前颜色下文字图标的颜色类型
  const fontColor = getInvertOfFontColor(appColor);
  const backgroundColor = transformInverseColorOfSystem(appColor, 0.1);
  const activeBackgroundColor = BaseColors.lightGary5;
  const activeFontColor = getInvertOfFontColor(activeBackgroundColor);

  useLayoutEffect(() => {
    document.documentElement.style.setProperty('--tab-font-color', fontColor);
    document.documentElement.style.setProperty(
      '--tab-background-color',
      backgroundColor,
    );
    document.documentElement.style.setProperty(
      '--tab-background-color-active',
      activeBackgroundColor,
    );
    document.documentElement.style.setProperty(
      '--tab-font-color-active',
      activeFontColor,
    );
  }, [appColor]);

  const viewSchemas = useRecoilValue(ViewSchemas).getSortResultOfKey(tableId!);

  // eslint-disable-next-line react/display-name
  const viewNode = (schema: ViewSchemaMode) => (active?: boolean) => (
    <div className={classNames(cssFlex, cssFlexiCenter)}>
      <Icon
        icon={getViewTypeIcon(schema.type)}
        colorName={active ? activeFontColor : fontColor}
        size={12}
      />
      <span>{schema.name}</span>
      {active && <Icon icon={FaCaretDown} margin={0} />}
    </div>
  );

  const tabPanes: Tab[] = viewSchemas.map((schema) => ({
    tab: viewNode(schema),
    tabKey: `schema-${schema.id}`,
    paneNode: <ViewPage schema={schema}></ViewPage>,
  }));

  const extra = {
    right: (
      <TableRightButtons
        prefixCls={prefix}
        fontColor={fontColor}
      ></TableRightButtons>
    ),
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
      key={`tabviews-${tableId}`}
    ></Tabs>
  );
};

export default TableView;
