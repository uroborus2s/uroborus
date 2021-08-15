import React from 'react';
import { IHeaderParams } from 'ag-grid-community';

interface ColumnHeaderProps extends IHeaderParams {}

const ColumnHeader: React.FC<ColumnHeaderProps> = ({ displayName }) => {
  return (
    <div>
      <div> {displayName}</div>
    </div>
  );
};

export default ColumnHeader;
