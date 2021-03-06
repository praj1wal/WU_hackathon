import React, {useReducer} from "react";
import List from './provider tab/forexProviderList';
import SelectCurrency from './provider tab/selectCurrency';
import Location from './provider tab/location';
import {useState} from "react";
import Pastgraph from "./provider tab/pastgraph";
import Calen from './provider tab/calender1'
import News1 from './provider tab/news1';
import {Button, Grid, Card, CardContent, Typography, LinearProgress, AppBar, Toolbar} from '@material-ui/core'
import ForexRate from "./provider tab/ForexRate";
import {useSelector} from "react-redux";
import Prediction from "./provider tab/ml";
import {NavLink} from 'react-router-dom';
import {withStyles, makeStyles} from "@material-ui/core/styles";
import { useMediaQuery } from 'react-responsive';

const useStyles = makeStyles({
        // this group of buttons will be aligned to the right side
        toolbarButtons: {
            marginLeft: 'auto',
        },
    }
);


function Component() {
    // console.log("Inside Component function");
    // const data=useSelector(state=>state.currencyreducer);
    // const src=data.srcCurrency;
    // const tar=data.tarCurrency;
    const classes = useStyles();
    let [graph, setGraph] = useState(false);
    let [predictGraph, setPredictGraph]= useState(false);
    const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
    return (
        <div className="App">
            <Grid container spacing={2} direction="row"  justify="flex-start" alignItems="center">
                
                <Grid item xs={12} sm={12}>
                    {(!isMobile) && <div>
                    <AppBar position="static" style={{backgroundColor: "#53bbc9"}}>
                        <Toolbar>
                            <Typography variant="h6">
                            <b><i>Amon9US FOREX AGGREGATOR</i></b>
                            </Typography>
                            <div className={classes.toolbarButtons}>
                                <NavLink to="/providers" style={{
                                    fontSize: "large",
                                    margin: "10px",
                                    color: 'inherit',
                                    textDecoration: 'inherit'
                                }}>
                                    <b><i>FOREX TRADING PLATFORM</i></b>
                                </NavLink>
                                <NavLink to="/" style={{
                                    fontSize: "large",
                                    margin: "10px",
                                    color: 'inherit',
                                    textDecoration: 'inherit'
                                }}>
                                    <b><i>HOME</i></b>
                                </NavLink>
                            </div>
                        </Toolbar>
                    </AppBar>
                    </div>}

                    {(isMobile) && <div>
                    <AppBar position="static" style={{backgroundColor: "#53bbc9", height:'80px'}}>
                        <Toolbar>
                            <Typography  variant="h6">
                            <b>AMON9US FOREX AGGREGATOR </b>
                            </Typography>
                            
                            <div className={classes.toolbarButtons}>
                                <NavLink to="/providers" style={{
                                    fontSize: "small",
                                    margin: "10px",
                                    color: 'inherit',
                                    textDecoration: 'inherit'
                                }}>
                                    
                                    <b style={{fontSize:'1rem'}}> PROVIDERS</b> 
                                </NavLink>
                                <br/>
                                <NavLink to="/" style={{
                                    fontSize: "small",
                                    margin: "10px",
                                    color: 'inherit',
                                    textDecoration: 'inherit'
                                }}>
                                    <b style={{fontSize:'1rem'}}> HOME</b>
                                </NavLink>
                            </div>
                        </Toolbar>
                    </AppBar>
                    </div>}
                </Grid>
                
                <Grid item xs={12} sm={6} style={{marginTop: "1%",  borderRightWidth:'thin'}}>
                    <Card>
                        <CardContent style={{}}>
                            {/* background:'linear-gradient(45deg, #e6fffa 10%, #b3fff0 80%)' */}
                            <SelectCurrency graph={graph} setGraph={setGraph} predictGraph={predictGraph} setPredictGraph={setPredictGraph}/>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} style={{marginTop: "1%"}}>
                    <Card>
                        <CardContent style={{}}>
                            <ForexRate/>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} style={{marginTop: "1%", borderRightWidth:'thin'}}>
                    <Card>
                        <CardContent style={{}}>
                            <List/>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} style={{}}>
                    <Card>
                        <CardContent style={{}}>
                            <Pastgraph graph={graph} setGraph={setGraph}/>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} style={{marginTop: "1%", borderRightWidth:'thin'}}>
                    <Card>
                        <CardContent>
                            <Calen/>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} style={{marginTop: "1%", borderRightWidth:'thin'}}>
                    <Card>
                        <CardContent>
                            <Prediction predictGraph={predictGraph} setPredictGraph={setPredictGraph}/>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} style={{marginTop: "1%"}}>
                    <Card>
                        <CardContent>
                            <News1/>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </div>
    );
}

export default Component;

