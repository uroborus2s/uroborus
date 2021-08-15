import React from 'react';
import { CSSPrefixProps, getPrefixCls } from '@/util';
import GridView from './gridview/GridView';
import { tableState } from '@/models/tableState';

interface ViewPageProps extends CSSPrefixProps {
  viewId: string;
  loading: boolean;
}

const ViewPage: React.FC<ViewPageProps> = ({ loading, viewId, prefixCls }) => {
  const preCls = getPrefixCls('views', prefixCls);

  if (loading) return <div>loading...</div>;

  const viewInfo = tableState.getViewInfoFromId(viewId);

  let node = null;
  switch (viewInfo.type) {
    case 'calendar':
      break;
    case 'form':
      break;
    case 'gallery':
      break;
    case 'grid':
      node = <GridView prefixCls={preCls} />;
      break;
    case 'kanban':
      break;
    default:
      break;
  }
  return node;
};

export default ViewPage;
