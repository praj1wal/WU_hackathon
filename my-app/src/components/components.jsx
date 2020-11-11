import React, { useReducer } from "react";
import List from './provider tab/forexProviderList';
import SelectCurrency from './provider tab/selectCurrency';
import Location from './provider tab/location';
import { useState } from "react";
import Grid from '@material-ui/core/Grid';
import Pastgraph from "./provider tab/pastgraph";



function Component() {

    const [latitude, setLatitude]= useState('');
    const [longitude, setLongitude]= useState('');

    const [graphSource, setGraphSource] = useState('');
    const  [graphTarget, setGraphTarget] = useState('');
    return (
      <div className="App">
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <SelectCurrency setGraphSource={setGraphSource} setGraphTarget={setGraphTarget}/>
            </Grid>  
            <Grid item xs={8}>
            <List latitude={latitude} longitude={longitude}/>
            </Grid>  
          </Grid>

            <Location setLatitude={setLatitude} setLongitude={setLongitude}/>
            <Pastgraph graphSource={graphSource} graphTarget={graphTarget}/>
          
      </div>
    );
  }
  
  export default Component;
  
