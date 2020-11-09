import * as React from 'react';
import axios from 'axios';

export default function DataTable() {
    let [responseData, setResponseData] = React.useState('');
    var access_key = 'dd80393c47b28f258eb19e6873d254f6';
  
    const fetchData = React.useCallback(() => {
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
    }, [])
    React.useEffect(() => {
      fetchData()
    }, [fetchData])
    return (
      <div style={{ height: 400, width: '100%' }}>
        <button type='button' onClick={fetchData}>Get my Location</button>
        {responseData.city }
      </div>
    );
  }
  