import React, { useReducer } from "react";
import List from './provider tab/forexProviderList';
import SelectCurrency from './provider tab/selectCurrency';
import Location from './provider tab/location';
import { useState } from "react";


function Component() {

    const [latitude, setLatitude]= useState('');
    const [longitude, setLongitude]= useState('');

    return (
      <div className="App">
        
            <SelectCurrency/>
            <Location setLatitude={setLatitude} setLongitude={setLongitude}/>
            <List latitude={latitude} longitude={longitude}/>
      </div>
    );
  }
  
  export default Component;
  
