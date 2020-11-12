import React, {useContext} from 'react';
import axios from 'axios';
import {useDispatch} from "react-redux";
import setlocation from "../actions/setlocation";

export default function Location({setLatitude, setLongitude}) {
    let [responseData, setResponseData] = React.useState('');

    const access_key = 'dd80393c47b28f258eb19e6873d254f6';
    const dispatch=useDispatch();
    const fetchData = async () => {
        // axios({
        //   "method": "GET",
        //   "url": "http://api.ipstack.com/check?access_key="+ access_key,
        // })
        // .then((response) => {
        //   setResponseData(response.data)
        // })
        // .catch((error) => {
        //   console.log(error)
        // })
        const response = await axios.get("http://api.ipstack.com/check?access_key=" + access_key);
        // console.log("Location component = ", response.data.latitude);
        // await setResponseData(response.data);
        // await setLatitude(responseData.latitude);
        // await setLongitude(responseData.longitude);
        await dispatch(setlocation({payload:{latitude:response.data.latitude,longitude:response.data.longitude}}));
    };

    return (
        <div style={{height: 400, width: '100%'}}>
            <button type='button' onClick={fetchData}>Get my Location</button>
            {responseData.city}
        </div>
    );
}
