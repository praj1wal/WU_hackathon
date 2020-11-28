import React, { useState } from 'react';
import axios from 'axios';
import { Button, Card, CardContent, Typography, withStyles } from '@material-ui/core';
import { useSelector } from "react-redux";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Chart from "react-google-charts";
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import { useMediaQuery } from 'react-responsive';
const StyledButton = withStyles({
    root: {
        background: 'linear-gradient(45deg, #5893d8 30%, #90caf9 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        width: '80%',
        height: '80%',
        //padding: '0 30px',
        marginRight: "10%",
        marginLeft: "10%",
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button);

// const data4 = 
// {
// [
// ['1','0.891994921733439'],
// ['2','0.892117145351171'],
// ['3','0.892253250626027'],
// ['4','0.892397519095242'],
// ['5','0.892546276335120'],
// ['6','0.892697030274868'],
// ['7','0.892848051906526'],
// ['8','0.892998113228678'],
// ['9','0.893146331703364'],
// ['10','0.893292075014114'],
// ['11','0.893434892311394'],
// ['12','0.893574466873407'],
// ['13','0.893710586800873'],
// ['14','0.893843121910989'],
// ['15','0.893972005139887'],
// ['16','0.894097217890024'],
// ['17','0.894218778758943'],
// ['18','0.894336733395159'],
// ['19','0.894451137027740'],
// ['20','0.894562074754536'],
// ['21','0.894669624910652'],
// ['22','0.894773886682987'],
// ['23','0.894874954749941'],
// ['24','0.894972921535670'],
// ['25','0.895067883972823'],
// ['26','0.895159940121173'],
// ['27','0.895249179023504'],
// ['28','0.895335699303150'],
// ['29','0.895419579295218'],
// ['30','0.895500919313728'],
// ]
// };   


export default function Prediction({predictGraph,setPredictGraph}) {
    
    const isMobile = useMediaQuery({ query: '(max-width: 500px)' });

    let [mlData, setMlData] = useState('');
    let [predictData, setPredictData] = useState([]);
    let [diff, setDiff] = useState(1);
    let [mlState, setMlState] = useState(false);
    const [selectedDate, setSelectedDate] = React.useState(new Date() - 0);
    const currencies = useSelector(state => state.currencyreducer);
    const srcCurrency = currencies.srcCurrency;
    const tarCurrency = currencies.tarCurrency;

    const handleDateChange = (date) => {
        setSelectedDate(date - 0);
    };


    const handleClick = () => {


        const fetchData = async () => {
            const response = await axios.get("http://127.0.0.1:5000/predict/?IN=" + srcCurrency + "&OUT=" + tarCurrency);
            setMlData(response.data)
            console.log("This is our great prediction", mlData);
            setMlState(true)
        };
        fetchData()
    }
    const handleClick1 = () => {

        const fetchData = async () => {
            const response = await axios.get("http://127.0.0.1:5000/predict2/?IN=" + srcCurrency + "&OUT=" + tarCurrency);
            let arr = response.data.Array;
            let i = 1;
            let finalData = [];
             finalData[0]=['x','rate'];
            arr.map((props) => {
                if(i<=30)
                {
                let b = [];
                b[0] = i;
                b[1] = props[0];
                finalData.push(b);
                console.log("in ml ", props[0]);
                i++;
                }

            })
            setPredictData(finalData);
            setPredictGraph(true);
            // console.log("This is our great array", response.data.Array);
        };
        fetchData()
    }
    return (
        <div >
            {console.log("out",predictGraph)}
            {(!isMobile) && <div>
            {predictGraph===false && <div  style={{height:'53vh'}}>
            {/* <Card style={{ height: '20vh' }}>
            <Typography gutterBottom variant="h6" component="h3">
                       <TrendingUpIcon/> Prediction
            </Typography>
            </Card> */}
                {/* <CardContent> */}
                <Typography gutterBottom variant="h6" component="h3">
                       <TrendingUpIcon/> Prediction
            </Typography>
                {console.log("in",predictGraph)}
                    <Chart
                        width={'600'}
                        height={400}
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        
                        data={[
                            ['x','rate'],
                            [1, 72],
                            [2, 81 ],
                            [3, 37 ],
                            [4, 26 ],
                            [5, 20 ],
                            [6, 15],
                        ]}
                        options={{
                            hAxis: {
                                title: 'Days',
                            },
                            vAxis: {
                                title: 'Rates',
                            },
                            bars:'vertical'
                        }}
                        // rootProps={{ 'data-testid': '1' }}
                    />


                {/* </CardContent> */}



                {/* <CardContent>
                    
                    {mlState === false && <Typography>
                        Please Click On Predict Me To Get Prediction Of Next Day
      </Typography>}
                    <Typography>{mlState === true && mlData} {mlState === true && (mlData < 0.35 ? <h1>bearish</h1> : (mlData > 0.65 ? <h1>bullish</h1> : <h1>Cannot Determine</h1>))}</Typography>
                </CardContent> */}
            {/* </Card> */}
            </div>}
            
            

            {predictGraph===true && <div style={{height:'53vh'}}>
            {/* <Card style={{ height: '42vh' }}>
            <Typography gutterBottom variant="h5" component="h2">
                        Prediction
            </Typography> */}
                {/* <CardContent> */}
                <Typography gutterBottom variant="h6" component="h3">
                       <TrendingUpIcon/> Prediction
            </Typography>
                    <Chart
                        width={'500px'}
                        height={'400px'}
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                      
                        data={predictData}
                        options={{
                            hAxis: {
                                title: 'Time',
                            },
                            vAxis: {
                                title: 'Popularity',
                            },
                            bars:'vertical'
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />


                {/* </CardContent> */}



                {/* <CardContent>
                    
                    {mlState === false && <Typography>
                        Please Click On Predict Me To Get Prediction Of Next Day
      </Typography>}
                    <Typography>{mlState === true && mlData} {mlState === true && (mlData < 0.35 ? <h1>bearish</h1> : (mlData > 0.65 ? <h1>bullish</h1> : <h1>Cannot Determine</h1>))}</Typography>
                </CardContent> */}
            {/* </Card> */}
            </div>}
            <StyledButton onClick={handleClick1}>Predict Me</StyledButton>
            {/* <StyledButton onClick={handleClick}>Predict Me</StyledButton> */}
            </div>}

            {(isMobile) && <div>
            {predictGraph===false && <div>
            {/* <Card style={{ height: '20vh' }}>
            <Typography gutterBottom variant="h6" component="h3">
                       <TrendingUpIcon/> Prediction
            </Typography>
            </Card> */}
                {/* <CardContent> */}
                <Typography gutterBottom variant="h6" component="h3">
                       <TrendingUpIcon/> Prediction
            </Typography>
                {console.log("in",predictGraph)}
                    <Chart
                        width={'600'}
                        height={400}
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        
                        data={[
                            ['x','rate'],
                            [1, 72],
                            [2, 81 ],
                            [3, 37 ],
                            [4, 26 ],
                            [5, 20 ],
                            [6, 15],
                        ]}
                        options={{
                            hAxis: {
                                title: 'Days',
                            },
                            vAxis: {
                                title: 'Rates',
                            },
                            bars:'vertical'
                        }}
                        // rootProps={{ 'data-testid': '1' }}
                    />


                {/* </CardContent> */}



                {/* <CardContent>
                    
                    {mlState === false && <Typography>
                        Please Click On Predict Me To Get Prediction Of Next Day
      </Typography>}
                    <Typography>{mlState === true && mlData} {mlState === true && (mlData < 0.35 ? <h1>bearish</h1> : (mlData > 0.65 ? <h1>bullish</h1> : <h1>Cannot Determine</h1>))}</Typography>
                </CardContent> */}
            {/* </Card> */}
            </div>}
            
            

            {predictGraph===true && <div style={{}}>
            {/* <Card style={{ height: '42vh' }}>
            <Typography gutterBottom variant="h5" component="h2">
                        Prediction
            </Typography> */}
                {/* <CardContent> */}
                <Typography gutterBottom variant="h5" component="h2">
                        Prediction
            </Typography> 
                    <Chart
                        width={'600'}
                        height={'400px'}
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                      
                        data={predictData}
                        options={{
                            hAxis: {
                                title: 'Time',
                            },
                            vAxis: {
                                title: 'Popularity',
                            },
                            bars:'vertical'
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />


                {/* </CardContent> */}



                {/* <CardContent>
                    
                    {mlState === false && <Typography>
                        Please Click On Predict Me To Get Prediction Of Next Day
      </Typography>}
                    <Typography>{mlState === true && mlData} {mlState === true && (mlData < 0.35 ? <h1>bearish</h1> : (mlData > 0.65 ? <h1>bullish</h1> : <h1>Cannot Determine</h1>))}</Typography>
                </CardContent> */}
            {/* </Card> */}
            </div>}
            <StyledButton onClick={handleClick1}>Predict Me</StyledButton>
            {/* <StyledButton onClick={handleClick}>Predict Me</StyledButton> */}
            </div>}
        </div>


    );
}