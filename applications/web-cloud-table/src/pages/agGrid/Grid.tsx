import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { memo, useRef } from 'react';
import 'ag-grid-enterprise';

const Grid = () => {
  const rowData = [
    {
      make: 'Toyota',
      model: 'Celica',
      price: 35000,
      日期: '2008/6/7',
      状态: 'pending',
    },
    {
      make: 'Ford',
      model: 'Mondeo',
      price: 32000,
      日期: '2008/6/7',
      状态: 'pending',
    },
    {
      make: 'Porsche',
      model: 'Boxter',
      price: 72000,
      日期: '2008/6/7',
      状态: 'pending',
    },
  ];

  const gridRef = useRef();

  const onButtonClick = (e) => {
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    const selectedDataStringPresentation = selectedData
      .map((node) => `${node.make} ${node.model} ${node.make} ${node.price}`)
      .join(', ');
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  };

  return (
    <div
      className="ag-theme-alpine"
      style={{ width: '100vw', height: '100vh' }}
    >
      <button onClick={onButtonClick}>Get selected rows</button>
      <AgGridReact rowData={rowData} rowSelection="multiple" ref={gridRef}>
        <AgGridColumn field="make" sortable filter checkboxSelection rowGroup />
        <AgGridColumn field="model" rowGroup />
        <AgGridColumn field="price" rowGroup />
        <AgGridColumn field="日期" rowGroup />
        <AgGridColumn field="状态" rowGroup />
      </AgGridReact>
    </div>
  );
};

export default memo(Grid);
