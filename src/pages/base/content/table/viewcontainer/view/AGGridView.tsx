import { view } from '@/domain/view/view.repository';
import { currentViewIdState } from '@/pages/base/content/table/TableContext';
import styled from '@mui/styles/styled';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { useRecoilValue } from 'recoil';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const GridViewRoot = styled('div')({
  fontSize: '13px',
  zIndex: 4,
  borderColor: 'inherit',
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
});

const AGGridView = () => {
  const viewId = useRecoilValue(currentViewIdState);

  const rowData = useRecoilValue(view.rowData(viewId));

  const columnData = useRecoilValue(view.columnData(viewId));

  console.log(rowData, columnData);

  return (
    <GridViewRoot className="ag-theme-alpine">
      <AgGridReact rowData={rowData} reactUi>
        {columnData.map((coldata) => (
          <AgGridColumn
            key={coldata.id}
            field={coldata.id}
            colId={coldata.id}
            headerName={coldata.name}
          />
        ))}
      </AgGridReact>
    </GridViewRoot>
  );
};

export default AGGridView;
