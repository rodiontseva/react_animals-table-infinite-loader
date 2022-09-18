/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { FC, useCallback, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import './PetsTable.css'

export const PetsTable: FC = () => {
  const gridRef = useRef();
  const [gridApi, setGridApi] = useState(null);
  const columns = [
    { headerName: 'Pet name', field: 'name', width: 150, suppressSizeToFit: true, cellRenderer: 'loading' },
    { headerName: 'Breed', field: 'breed', resizable: true, minWidth: 150 },
    { headerName: 'Age', field: 'age', resizable: true },
    { headerName: 'Gender', field: 'gender', resizable: true, minWidth: 150 },
    { headerName: 'Owner name', field: 'owner_name', resizable: true, minWidth: 150 },
    { headerName: 'Owner email', field: 'owner_email', resizable: true, minWidth: 150 }
  ];

  const datasource = {
    getRows (params) {
      console.log(JSON.stringify(params, null, 1));
      const { startRow, endRow, sortModel } = params;

      let url = 'https://rodiontseva-pets.herokuapp.com/api/animals/all?'

      if (sortModel.length > 0) {
        const { colId, sort } = sortModel[0]
        url += `_sort=${colId}&_order=${sort}&`
      }

      url += `_start=${startRow}&_end=${endRow}`
      fetch(url)
        .then(async httpResponse => await httpResponse.json())
        .then(response => {
          setTimeout(() => params.successCallback(response.animals, response.totalItems), 1000)
        })
        .catch(error => {
          params.failCallback();
          throw new Error(error);
        })
    }
  };

  const sizeToFit = useCallback(() => {
    gridRef.current.api.sizeColumnsToFit({
      defaultMinWidth: 100,
    });
  }, []);

  const onGridReady = (params) => {
    setGridApi(params);
    params.api.setDatasource(datasource);
    sizeToFit();
  }

  const components = {
    loading: (params) => {
      console.log(params.value);
      if (params.value !== undefined) {
        return params.value
      } else {
        return 'Loading ...'
      }
    }
  }

  return (
    <div>
      <div className="ag-theme-balham" style={{ height: '70vh' }}>
        <AgGridReact
          ref={gridRef}
          columnDefs={columns}
          rowModelType="infinite"
          onGridReady={onGridReady}
          components={components}
          defaultColDef={{ sortable: true }}
          cacheBlockSize={10}
        />
      </div>
    </div>
  );
};
