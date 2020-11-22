import React, { useState } from 'react';
import axios from "axios";
import {DataGrid} from "@material-ui/data-grid";
import {useSelector} from "react-redux";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const columns = [
  { field: 'id', headerName: 'No', width: 60 },
  { field: 'provider', headerName: 'Forex Provider', width: 130 },
  { field: 'high', headerName: 'Best Rate', width: 130 },
  { field: 'low', headerName: 'Lowest Rate', width: 130 },
  { field: 'close', headerName: 'Closing Rate', width: 130 },
  { field: 'open', headerName: 'Opening Rate', width: 130 },
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

let rows1=[];
const defaultRow =  [
  {
    id: 1,
    provider: 'PepperStone',
    high: 0.89859,
    low: 0.89477,
    close: 0.89521,
    open: 0.89816
  },
  {
    id: 2,
    provider: 'Oanda',
    high: 0.89858,
    low: 0.89444,
    close: 0.89475,
    open: 0.89764
  },
  {
    id: 3,
    provider: 'FxPro',
    high: 0.89858,
    low: 0.89475,
    close: 0.89518,
    open: 0.89778
  },
  {
    id: 4,
    provider: 'IC-Market',
    high: 0.89858,
    low: 0.89476,
    close: 0.89521,
    open: 0.89816
  },
  {
    id: 5,
    provider: 'ICM-Trader',
    high: 0.89853,
    low: 0.89471,
    close: 0.89537,
    open: 0.89789
  },
  {
    id: 6,
    provider: 'FXPIG',
    high: 0.89851,
    low: 0.89474,
    close: 0.89592,
    open: 0.89681
  }
]



function List() {
  console.log("Inside List");
  const [list, setList]= useState(rows);
  const data=useSelector(state=>state.locationlatitude);
  const currencies=useSelector(state=>state.currencyreducer);
  console.log("Inside List component = ",currencies);
  const [listdata,setData]=useState([]);
  const [flag,setFlag]=useState(false);

  const [value, setValue] = React.useState('5');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  if(Object.keys(currencies).length!==0  && flag===false)
  {
       async function getData() {
         const response = await axios.get("http://localhost:4000/forexprovider/?IN=" + currencies.srcCurrency + "&OUT=" + currencies.tarCurrency+"&TIME="+value);
         let arr = response.data;
         rows1=arr;
         setFlag(true);
         setData(rows1);

         console.log("Rows= ", rows1);
       }

       getData();
  }



  const latitude=data.latitude;
  const longitude=data.longitude;
  const access_key = 'dd80393c47b28f258eb19e6873d254f6';
  let response;

  list.map((props)=>{
    const R = 6371e3; // metres

  const φ1 = latitude * Math.PI/180; // φ, λ in radians
  const φ2 = props.latitude * Math.PI/180;
  const Δφ = (props.latitude-latitude) * Math.PI/180;
  const Δλ = (props.longitude-longitude) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c;
    props.distance=d;
  });

  

  return (
<div style={{ height: '50vh', width: '100%' }}>      {console.log("Inside return of list component")}

<FormControl component="fieldset">
  <FormLabel component="legend"/>
  <RadioGroup aria-label="duration" style={{display:"inline-block"}} name="duration" value={value} onClick={handleChange}>
  <FormControlLabel value="5" control={<Radio />} label="Today" />
    <FormControlLabel value="7" control={<Radio />} label="Week" />
    <FormControlLabel value="30" control={<Radio />} label="Month" />
    <FormControlLabel value="365" control={<Radio />} label="Year" />
  </RadioGroup>
</FormControl>
{Object.keys(currencies).length===0 && <DataGrid rows={defaultRow} columns={columns} pageSize={5} />}
      {Object.keys(currencies).length!==0 && <DataGrid rows={listdata} columns={columns} pageSize={5} />}

      {/*   <button style={{position: "static"}} type='button' onClick={() => {*/}
      {/*  fetchData()*/}
      {/*}*/}

      {/*}>Get my Location*/}
      {/*</button>*/}

      {/*{response.data.city!==undefined && response.data.city}*/}

      {/* {latitude!==undefined && <DataGrid rows={rows1} columns={columns} pageSize={5} />} */}
    </div>
  );
}

export default List;
