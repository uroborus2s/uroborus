import React from 'react';
import { ViewSchemaMode } from '@/models';
import { CSSPrefixProps, getPrefixCls } from '@/util';
import GridView from './gridview/GridView';

interface ViewPageProps extends CSSPrefixProps {
  schema: ViewSchemaMode;
}

const ViewPage: React.FC<ViewPageProps> = ({ schema, prefixCls }) => {
  const preCls = getPrefixCls('views', prefixCls);

  let node = null;
  switch (schema.type) {
    case 'calendar':
      break;
    case 'form':
      break;
    case 'gallery':
      break;
    case 'grid':
      node = <GridView prefixCls={preCls} schema={schema}></GridView>;
      break;
    case 'kanban':
      break;
    default:
      break;
  }
  return node;
};

export default ViewPage;
