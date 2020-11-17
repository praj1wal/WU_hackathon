import React, { useReducer } from "react";
import List from './provider tab/forexProviderList';
import SelectCurrency from './provider tab/selectCurrency';
import Location from './provider tab/location';
import { useState } from "react";
import Grid from '@material-ui/core/Grid';
import Pastgraph from "./provider tab/pastgraph";
import News from './provider tab/news';


function Component() {
    // console.log("Inside Component function");
    const [latitude, setLatitude]= useState(0);
    const [longitude, setLongitude]= useState(0);

    const [graphSource, setGraphSource] = useState('');
    const  [graphTarget, setGraphTarget] = useState('');
    return (
      <div className="App">
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <SelectCurrency />
            </Grid>


            <Grid item xs={8}>
            <List/>
            </Grid>
          </Grid>

            <Location />
            <Pastgraph />

      </div>
    );
  }

  export default Component;

