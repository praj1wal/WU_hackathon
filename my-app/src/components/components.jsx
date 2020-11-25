import React, { useReducer } from "react";
import List from './provider tab/forexProviderList';
import SelectCurrency from './provider tab/selectCurrency';
import Location from './provider tab/location';
import { useState } from "react";
import Pastgraph from "./provider tab/pastgraph";
import Calen from './provider tab/calender1'
import News1 from './provider tab/news1';
import { Button, Grid, Card, CardContent, Typography, LinearProgress, AppBar, Toolbar } from '@material-ui/core'
import ForexRate from "./provider tab/ForexRate";
import { useSelector } from "react-redux";
import Prediction from "./provider tab/ml";


function Component() {
  // console.log("Inside Component function");
  // const data=useSelector(state=>state.currencyreducer);
  // const src=data.srcCurrency;
  // const tar=data.tarCurrency;
  let [graph,setGraph]= useState(false);
  return (
    <div className="App">
      <Grid container >
        <Grid item xs={12} sm={12}>
          <AppBar position="static" style={{ backgroundColor: "#53bbc9" }}>
            <Toolbar>
              <Typography variant="h6">
                Amon9US Forex Aggregator
                            </Typography>
              {/* <div className={classes.toolbarButtons}> */}
              {/* <NavLink to="/tracker" style={{ fontSize: "large", margin: "10px", color: 'inherit', textDecoration: 'inherit' }}>
                            ASSET TRACKER
                        </NavLink> */}
              {/* <NavLink to="/" style={{ fontSize: "large", margin: "10px", color: 'inherit', textDecoration: 'inherit' }}>
                            <b>HOME</b>
                        </NavLink> */}
              {/* </div> */}
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item xs={8} sm={6} style={{marginTop:"1%"}}>
          <Card>
            <CardContent style={{  }}>
              <SelectCurrency graph={graph} setGraph={setGraph}/>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} style={{marginTop:"1%"}}>
          <Card>
            <CardContent style={{  }}>
              <ForexRate />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} style={{marginTop:"1%"}}>
          <Card>
            <CardContent style={{  }}>
              <List/>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} style={{marginTop:"1%"}}>
          <Card>
            <CardContent style={{  }}>
              <Pastgraph graph={graph} setGraph={setGraph} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card>
            <CardContent>
          <Calen/>
              </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardContent>
              <Prediction />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <News1 />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

    </div>
  );
}

export default Component;

