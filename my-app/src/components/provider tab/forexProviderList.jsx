import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
 
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'rate', headerName: 'Rate', width: 130 },
  { field: 'latitude', headerName: 'Latitude', width: 130 },
  { field: 'longitude', headerName: 'Longitude', width: 130 },
  { field: 'availability', headerName: 'availability', width: 130 },
  { field: 'distance', headerName: 'Distance', width: 130 },

];

const rows = [
  { id: 1, name: 'Name1', rate: 17, latitude: 12, longitude: 12, availability: 67 ,distance: 0},
  { id: 2, name: 'Name2', rate: 18, latitude: 13, longitude: 13, availability: 54 ,distance: 0},
  { id: 3, name: 'Name3', rate: 15, latitude: 11, longitude: 15, availability: 78 ,distance: 0},
  { id: 4, name: 'Name4', rate: 10, latitude: 16, longitude: 16, availability: 68 ,distance: 0},
  { id: 5, name: 'Name5', rate: 12, latitude: 65, longitude: 16, availability: 47 ,distance: 0},
  { id: 6, name: 'Name6', rate: 19, latitude: 10, longitude: 10, availability: 46 ,distance: 0},
  { id: 7, name: 'Name7', rate: 14, latitude: 15, longitude: 15, availability: 38 ,distance: 0},
  { id: 8, name: 'Name8', rate: 16, latitude: 10, longitude: 12, availability: 89 ,distance: 0},
  { id: 9, name: 'Name9', rate: 13, latitude: 19, longitude: 16, availability: 65 ,distance: 0},
];


export default function DataTable({latitude,longitude}) {
  console.log(`hi lat ${latitude} long ${longitude}`)
  const [list, setList]= useState(rows);

  list.map((props)=>{
    // console.log(props.longitude)
    // console.log(props.latitude)
    // console.log(typeof(props.distance))

    const R = 6371e3; // metres
  const φ1 = latitude * Math.PI/180; // φ, λ in radians
  const φ2 = props.latitude * Math.PI/180;
  const Δφ = (props.latitude-latitude) * Math.PI/180;
  const Δλ = (props.longitude-longitude) * Math.PI/180;
  
  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  
  const d = R * c; // in metres
    props.distance=d;
    console.log(props.distance)

  })

  
  
  return (
    <div style={{ height: 400, width: '100%' }}>
      
      <DataGrid rows={rows} columns={columns} pageSize={5}  />
    </div>
  );
}
