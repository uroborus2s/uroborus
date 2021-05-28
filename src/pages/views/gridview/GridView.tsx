import React from 'react';
import { CSSPrefixRequiredProps } from '@/util';
import { ViewSchemaMode } from '@/models';
import './grid.scss';
import GridViewToolbar from '@/pages/views/gridview/GridViewToolbar';

interface GridViewProps extends CSSPrefixRequiredProps {
  schema: ViewSchemaMode;
}

const GridView: React.FC<GridViewProps> = ({ prefixCls, schema }) => {
  const pref = `${prefixCls}-grid`;
  return (
    <div className={pref}>
      <GridViewToolbar prefixCls={pref}></GridViewToolbar>
    </div>
  );
};

export default GridView;
