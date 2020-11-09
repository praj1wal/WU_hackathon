import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
 
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'rate', headerName: 'Rate', width: 130 },
  { field: 'latitude', headerName: 'Latitude', width: 130 },
  { field: 'longitude', headerName: 'Longitude', width: 130 },
  { field: 'availability', headerName: 'availability', width: 130 },
];

const rows = [
  { id: 1, name: 'Name1', rate: 17, latitude: 12, longitude: 12, availability: 67 },
  { id: 2, name: 'Name2', rate: 18, latitude: 13, longitude: 13, availability: 54 },
  { id: 3, name: 'Name3', rate: 15, latitude: 15, longitude: 15, availability: 78 },
  { id: 4, name: 'Name4', rate: 10, latitude: 16, longitude: 16, availability: 68 },
  { id: 5, name: 'Name5', rate: 12, latitude: 16, longitude: 16, availability: 47 },
  { id: 6, name: 'Name6', rate: 19, latitude: 10, longitude: 10, availability: 46 },
  { id: 7, name: 'Name7', rate: 14, latitude: 15, longitude: 15, availability: 38 },
  { id: 8, name: 'Name8', rate: 16, latitude: 12, longitude: 12, availability: 89 },
  { id: 9, name: 'Name9', rate: 13, latitude: 16, longitude: 16, availability: 65 },
];

export default function DataTable() {
  
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5}  />
    </div>
  );
}
