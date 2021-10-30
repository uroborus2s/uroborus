import React from 'react';

const SearchBaseList: React.FC<{ leftOffset: number }> = ({ leftOffset }) => {
  return (
    <div
      style={{
        boxSizing: 'border-box',
        position: 'absolute',
        paddingLeft: leftOffset,
        top: '32px',
      }}
    >
      查找结果未空！
    </div>
  );
};

export default SearchBaseList;
