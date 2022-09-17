import React, { FC, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export const PetsTable: FC = () => {
  const [gridApi, setGridApi] = useState(null);
  const columns = [
    { headerName: 'Pet name', field: 'name', filter: 'agTextColumnFilter',cellRenderer: 'loading' },
    { headerName: 'Breed', field: 'breed', filter: 'agTextColumnFilter' },
    { headerName: 'Age', field: 'age', filter: 'agTextColumnFilter' },
    { headerName: 'Gender', field: 'gender', filter: 'agTextColumnFilter' },
    { headerName: 'Owner name', field: 'owner_name', filter: 'agTextColumnFilter' },
    { headerName: 'Owner email', field: 'owner_email', filter: 'agTextColumnFilter' }
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
          setTimeout(() => params.successCallback(response.animals, response.totalItems), 2000)
        })
        .catch(error => {
          console.error(error);
          params.failCallback();
        })
    }
  };

  const onGridReady = (params) => {
    setGridApi(params);
    params.api.setDatasource(datasource);
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
      <div className="ag-theme-alpine" style={{ height: 400 }}>
        <AgGridReact
          columnDefs={columns}
          rowModelType="infinite"
          onGridReady={onGridReady}
          components={components}
          defaultColDef={{ filter: true, floatingFilter: true, sortable: true }}
          cacheBlockSize={10}
        />
      </div>
    </div>
  );
};
