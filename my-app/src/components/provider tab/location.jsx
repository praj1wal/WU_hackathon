import React, { useContext } from 'react';
import axios from 'axios';

export default function DataTable({setLatitude,setLongitude}) {
    let [responseData, setResponseData] = React.useState('');

    var access_key = 'dd80393c47b28f258eb19e6873d254f6';
  
    const fetchData = async() => {
      axios({
        "method": "GET",
        "url": "http://api.ipstack.com/check?access_key="+ access_key,
      })
      .then((response) => {
        setResponseData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    };
  
    return (
      <div style={{ height: 400, width: '100%' }}>
        <button type='button'onClick={() => { fetchData(); setLatitude(responseData.latitude);  setLongitude(responseData.longitude); }} >Get my Location</button>
        {responseData.city }
      </div>
    );
  }
  