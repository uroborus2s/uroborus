import { READTABLE, useDispath } from '@/domain';
import ViewContainer from '@/pages/base/content/table/viewcontainer/ViewContainer';
import LoadingWithNumber from '@ibr/ibr-loading/LoadingWithNumber';
import styled from '@mui/styles/styled';
import { FC } from 'react';
import { TableIdContext } from './TableContext';
import ViewBar from './viewbar/ViewBar';

interface TablePageProps {
  tableId: string;
}

const TablePageRoot = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
});

const TablePage: FC<TablePageProps> = ({ tableId }) => {
  const { loading } = useDispath(READTABLE, {
    request: { path: { id: tableId } },
  });

  return loading ? (
    <LoadingWithNumber loading={loading} />
  ) : (
    <TableIdContext.Provider value={tableId}>
      <TablePageRoot id="table">
        <ViewBar id="view-bar" />
        <ViewContainer id="view-container" />
      </TablePageRoot>
    </TableIdContext.Provider>
  );
};

export default TablePage;
