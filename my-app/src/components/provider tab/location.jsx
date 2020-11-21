import React, {useContext} from 'react';
import axios from 'axios';
import {useDispatch} from "react-redux";
import setlocation from "../actions/setlocation";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);


export default function Location({setLatitude, setLongitude}) {
    let [responseData, setResponseData] = React.useState('');

    const access_key = 'dd80393c47b28f258eb19e6873d254f6';
    const dispatch=useDispatch();
    const fetchData = async () => {
        const response = await axios.get("http://api.ipstack.com/check?access_key=" + access_key);
        await dispatch(setlocation({payload:{latitude:response.data.latitude,longitude:response.data.longitude}}));
    };

    return (
        <div style={{height: 400, width: '100%'}}>
            <StyledButton type='button' onClick={fetchData}>Get my Location</StyledButton>
            {/*{responseData.city}*/}
        </div>
    );
}
